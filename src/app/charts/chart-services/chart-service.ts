import {Chart, SeriesChart} from "../chart-data.model";
import {Observable} from "rxjs";
import {FilterDto} from "../../shared/filters/filter.dto";

export interface ChartService {
  chart$: Observable<Chart>;
  getChartData(): Observable<Chart>;
  setGroupBy(groupBy: string): void;
  applyFilters(filters: FilterDto[]): void;
  hasFilters(): boolean;
  clearFilters(): void;
  getFilters(): FilterDto[];
}

export interface SeriesChartService extends ChartService {
  seriesChart$: Observable<SeriesChart>;
  getSeriesData(): Observable<SeriesChart>;
}
