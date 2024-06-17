import {AbstractChartService} from "./AbstractChartService";
import {SeriesChartService} from "./chart-service";
import {inject} from "@angular/core";
import {HttpService} from "@core/http.service";
import {finalize, Observable, Subject, tap} from "rxjs";
import {SeriesChart} from "../chart-data.model";
import {FilterChartDto} from "./filter-chart-dto";
import {FilterDto} from "../../shared/filters/filter.dto";
import {CHART_FILTERS_ENDPOINT} from "./chart-endpoints";

export abstract class AbstractSeriesChartService extends AbstractChartService implements SeriesChartService {
  private seriesChartSubject: Subject<SeriesChart> = new Subject<SeriesChart>();
  seriesChart$: Observable<SeriesChart> = this.seriesChartSubject.asObservable();

  protected constructor() {
    super(inject(HttpService));
  }

  getSeriesData(): Observable<SeriesChart> {
    return this.httpService.get(this.chartEndpoint)
      .pipe(
        tap((data: SeriesChart) => this.seriesChartSubject.next(data)),
        finalize(() => this.groupBy = undefined)
      );
  }

  override getChartDataWithFilters(filters: FilterDto[]): void {
    if(filters.length == 0) {
      this.getSeriesData().subscribe();
    } else {
      const filterChartDto: FilterChartDto = this.buildFilterChartDto(filters);
      this.httpService.post(CHART_FILTERS_ENDPOINT, filterChartDto).subscribe({
          next: (data: SeriesChart) => this.seriesChartSubject.next(data),
        }
      );
    }
  }
}
