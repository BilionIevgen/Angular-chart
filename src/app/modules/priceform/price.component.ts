import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  public form = new FormGroup({
    priceName : new FormControl('', [Validators.required]),
    pricein : new FormControl('', [Validators.required,Validators.min(1)]),
    priceout : new FormControl('', [Validators.required,Validators.min(1)]),
    datein : new FormControl('', [Validators.required])
  })
  priceIndex : number;
  isCreating:boolean;
  label:string;
  id:string;
  buttonTitle:string;
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private dashboardService: DashboardService,

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      try {
        this.id = params.get('id');
        if (this.id === 'new') {
          this.isCreating = true;
        }
        this.label = this.isCreating ? "New Price" : "Edit Price";
        this.buttonTitle = this.isCreating ? "Create" : "Edit";
        if(!this.isCreating){
          const priceData = this.dashboardService.getChartData().prices.find(price => price.name === this.id);
          this.priceIndex = this.dashboardService.getChartData().prices.findIndex(price => price.name === this.id);
          this.priceNameField.patchValue(this.id)
          const priceIndex = priceData.data.findIndex(item => item != null)
          this.dateInField.patchValue(String(priceIndex))
          this.priceinField.patchValue(priceData.data[String(priceIndex)])
          this.priceoutField.patchValue(priceData.data[+priceIndex + 1])
        }
      }catch{}
    })
  }
  getErrorMessage(field) {
    if(!field)return

    if (field.errors['required'] ) {
      return 'You must enter a value';
    }
    if (field.errors['min'] ) {
      return 'You must enter more then 1';
    }
    if (field.errors['unique'] ) {
      return 'This name already exist';
    }


  }
  get priceNameField() {
    return this.form.get('priceName');
  }
  get priceinField() {
    return this.form.get('pricein');
  }
  get priceoutField() {
    return this.form.get('priceout');
  }
  get dateInField() {
    return this.form.get('datein');
  }
  onDeleteBtnClick(){
    const  prices = this.dashboardService.getChartData().prices
    this.dashboardService.setChartData(prices.filter(item => item.name !== this.id))
    this.router.navigateByUrl('/')
  }
  checkPrice(){
    const  prices = [...this.dashboardService.getChartData().prices]
    const price = prices.find(item=> item.name == this.priceNameField.value)
      if(price){
        this.priceNameField.setErrors({unique: true})
        return true;
      }
      return false;
  }
  onSubmit(e){
    e.stopPropagation();
    this.form.markAllAsTouched()

    if (this.form.status === 'INVALID') {
      return;
    }
    const  prices = [...this.dashboardService.getChartData().prices]
    if(this.isCreating){
      if(this.checkPrice()){
        return;
      }
    }else{
      if(this.id != this.priceNameField.value){
        if(this.checkPrice()){
          return;
        }
      }
    }
    let newDataArray = new Array(12).fill(null)
    newDataArray.forEach((item,i) =>{
      if(i == this.dateInField.value){
        newDataArray[i] = +this.priceinField.value
      }else if(i == +this.dateInField.value +1){
        newDataArray[i] = +this.priceoutField.value
      }
    })
    const newPrice = {
      name: this.priceNameField.value,
      data: newDataArray
    }

    if (this.isCreating) {

      const newPrices = [...prices,newPrice];

      this.dashboardService.setChartData(newPrices)
    }else{

      prices[this.priceIndex] = newPrice
      this.dashboardService.setChartData(prices)
    }
    this.router.navigateByUrl('/')
  }
}
