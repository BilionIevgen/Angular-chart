import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  prices = [
    {
      name: "PriceOne",
      data: [null, null, null,null, null, null, 1, 2,null, null, null, null],
    },
    {
      name: "PriceTwo",
      data: [null, null, null,3, 7, null, null, null, null, null, null, null],
    }

  ];
  constructor() {}

  getChartData() {
    return {
      prices: this.prices,
      month: this.month,
    };
  }
  setChartData(data: Array<{name:string,data:  Array<number>}>) {
    this.prices = data
  }
}
