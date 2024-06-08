import {inject, Injectable} from '@angular/core';
import {CHART_ENDPOINT} from "./chart-endpoints";
import {ChartDataType} from "./chart-data-type";
import {AbstractChartService} from "./AbstractChartService";
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root'
})
export class ExpensesChartService extends AbstractChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartDataType.EXPENSES;
  constructor() {
    super(inject(HttpService));
    this.chartEndpoint = ExpensesChartService.END_POINT;
  }
}
