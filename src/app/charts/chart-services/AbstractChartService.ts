import {finalize, Observable} from "rxjs";
import {Chart} from "../chart-data.model";
import {ChartService} from "./chart-service";
import {HttpService} from "@core/http.service";

export abstract class AbstractChartService implements ChartService {
  private httpService: HttpService;
  protected chartEndpoint: string;
  protected groupBy: string = undefined;

  protected constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  getChartData(): Observable<Chart> {
    return this.httpService.get(this.chartEndpoint+this.getGroupByString())
      .pipe(
        finalize(() => this.groupBy = undefined)
      );
  }

  setGroupBy(groupBy: string): void {
    this.groupBy = '/' + groupBy;
  }

  private getGroupByString(): string {
    return this.groupBy ? this.groupBy : '';
  }
}
