import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-posts',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(private dashboardService: DashboardService) { }
  displayedColumns: string[] = ['name','pricein','priceout','profit'];
  dataSource = this.dashboardService.prices;
  ngOnInit() {
  }
  generetePriceIn(el){
    const priceIndex = el.data.findIndex(item => item != null)
    return el.data[+priceIndex]

  }
  generetePriceOut(el){
    const priceIndex = el.data.findIndex(item => item != null)
    return el.data[+priceIndex+1]

  }
  genereteProfit(el){
    const priceIndex = el.data.findIndex(item => item != null)
    return el.data[+priceIndex+1] - el.data[+priceIndex];

  }
}
