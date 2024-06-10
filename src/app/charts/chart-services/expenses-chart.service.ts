import {inject, Injectable} from '@angular/core';
import {CHART_ENDPOINT} from "./chart-endpoints";
import {ChartCategory} from "./chart-category";
import {AbstractChartService} from "./AbstractChartService";
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root'
})
export class ExpensesChartService extends AbstractChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartCategory.EXPENSES;
  constructor() {
    super(inject(HttpService));
    this.chartEndpoint = ExpensesChartService.END_POINT;
  }
}
