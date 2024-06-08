import { Observable } from "rxjs";
import { Chart } from "../chart-data.model";
import {ChartService} from "./chart-service";
import {HttpService} from "@core/http.service";

export abstract class AbstractChartService implements ChartService {
  private httpService: HttpService;
  protected chartEndpoint: string;
  protected constructor(httpService: HttpService) {
      this.httpService = httpService;
  }
  getChartData(): Observable<Chart> {
      return this.httpService.get(this.chartEndpoint);
  }

}
