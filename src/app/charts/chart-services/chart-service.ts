import {Chart, SeriesChart} from "../chart-data.model";
import {Observable, Subject} from "rxjs";
import {FilterDto} from "../../shared/filters/filter.dto";

export interface ChartService {
  chart$: Observable<Chart>;
  clearFiltersSubject: Subject<void>;
  clearFilters$: Observable<void>;
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
  applySeriesFilters(filters: FilterDto[]): void;
}
