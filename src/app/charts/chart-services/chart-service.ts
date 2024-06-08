import {Chart, SeriesChart} from "../chart-data.model";
import {Observable} from "rxjs";

export interface ChartService {
  getChartData(): Observable<Chart>;
}

export interface SeriesService {
  getSeriesData(): Observable<SeriesChart>;
}
