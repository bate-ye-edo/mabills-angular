import {SeriesChartService} from "./chart-service";
import {Observable} from "rxjs";
import {SeriesChart} from "../chart-data.model";
import {CHART_ENDPOINT} from "./chart-endpoints";
import {ChartCategory} from "./chart-category";
import {HttpService} from "@core/http.service";
import {Injectable} from "@angular/core";
import {AbstractChartService} from "./AbstractChartService";

@Injectable({
  providedIn: 'root'
})
export class ExpenseIncomeSeriesChartService extends AbstractChartService implements SeriesChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartCategory.EXPENSE_INCOME_SERIES;

  constructor(private http: HttpService) {
    super(http);
    this.chartEndpoint = ExpenseIncomeSeriesChartService.END_POINT;
  }

  getSeriesData(): Observable<SeriesChart> {
    return this.http.get(ExpenseIncomeSeriesChartService.END_POINT);
  }
}
