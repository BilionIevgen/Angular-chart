import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  getChartData = {
    month :[],
    prices:{}
  };
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getChartData = this.dashboardService.getChartData();

  }

}
