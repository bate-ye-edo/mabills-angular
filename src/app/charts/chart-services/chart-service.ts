import {Chart, SeriesChart} from "../chart-data.model";
import {Observable} from "rxjs";

export interface ChartService {
  getChartData(): Observable<Chart>;
  addGroupBy(groupBy: string): void;
}

export interface SeriesChartService {
  getSeriesData(): Observable<SeriesChart>;

  addGroupBy(groupBy: string): void;
}
