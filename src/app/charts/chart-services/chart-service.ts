import {Chart, SeriesChart} from "../chart-data.model";
import {Observable} from "rxjs";

export interface ChartService {
  getChartData(): Observable<Chart>;
  setGroupBy(groupBy: string): void;
}

export interface SeriesChartService extends ChartService {
  getSeriesData(): Observable<SeriesChart>;
}
