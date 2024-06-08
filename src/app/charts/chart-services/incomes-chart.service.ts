import {inject, Injectable} from '@angular/core';
import {AbstractChartService} from "./AbstractChartService";
import {ChartDataType} from "./chart-data-type";
import {CHART_ENDPOINT} from "./chart-endpoints";
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root'
})
export class IncomesChartService extends AbstractChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartDataType.INCOMES;
  constructor() {
    super(inject(HttpService));
    this.chartEndpoint = IncomesChartService.END_POINT;
  }
}
