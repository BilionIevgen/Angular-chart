import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";

@Component({
  selector: "app-widget-chart",
  templateUrl: "./chart.component.html",
})
export class ChartComponent implements OnInit {
  chartOptions: {};
  @Input() data:{
    month: Array<string>,
    prices: Object
  } = {
    month: [],
    prices:{}
  } ;

  Highcharts = Highcharts;

  constructor() {}

  ngOnInit() {

    this.chartOptions = {
    chart: {
      type: 'line'
    },
    title: {
        text: 'Monthly Price'
    },
    xAxis: {
        categories: this.data.month
    },
    yAxis: {
        title: {
            text: 'Price'
        }
    },
    tooltip: {
      headerFormat: '<b>Price</b><br />',
      pointFormat: '{point.y}',
  },
  plotOptions: {
    series: {
        label: {
            connectorAllowed: false
        },
    }
},
    series: this.data.prices
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
