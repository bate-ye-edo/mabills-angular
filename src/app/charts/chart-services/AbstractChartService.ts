import {finalize, Observable} from "rxjs";
import { Chart } from "../chart-data.model";
import {ChartService} from "./chart-service";
import {HttpService} from "@core/http.service";

export abstract class AbstractChartService implements ChartService {
  private httpService: HttpService;
  protected chartEndpoint: string;
  protected groupBy: string = '';

  protected constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  getChartData(): Observable<Chart> {
    return this.httpService.get(this.chartEndpoint+this.groupBy)
      .pipe(
        finalize(() => this.groupBy = '')
      );
  }

  addGroupBy(groupBy: string): void {
    this.groupBy = '/' + groupBy;
  }
}
