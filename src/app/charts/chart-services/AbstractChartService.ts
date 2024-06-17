import {finalize, Observable, Subject, tap} from "rxjs";
import {Chart} from "../chart-data.model";
import {ChartService} from "./chart-service";
import {HttpService} from "@core/http.service";
import {FilterDto} from "../../shared/filters/filter.dto";
import {FilterChartDto} from "./filter-chart-dto";
import {CHART_FILTERS_ENDPOINT} from "./chart-endpoints";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FilterField} from "../../shared/filters/filter-field";

export abstract class AbstractChartService implements ChartService {
  protected httpService: HttpService;
  protected chartEndpoint: string;
  protected groupBy: string = undefined;
  protected groupByForFilter: string = undefined;
  protected filters: FilterDto[] = [];
  private chartSubject: Subject<Chart> = new Subject<Chart>();
  chart$: Observable<Chart> = this.chartSubject.asObservable();

  protected constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  applyFilters(filters: FilterDto[]): void {
    if(filters.length == 0) {
      this.getChartData().subscribe();
    } else {
      this.filters = filters;
      this.getChartDataWithFilters(filters);
    }
  }

  getChartDataWithFilters(filters: FilterDto[]): void {
    const filterChartDto: FilterChartDto = this.buildFilterChartDto(filters);
    this.httpService.post(CHART_FILTERS_ENDPOINT, filterChartDto).subscribe({
        next: (data: Chart) => this.chartSubject.next(data),
      }
    );
  }

  getChartData(): Observable<Chart> {
    return this.httpService.get(this.chartEndpoint+this.getGroupByString())
      .pipe(
        tap((data: Chart) => this.chartSubject.next(data)),
        finalize(() => this.groupBy = undefined)
      );
  }

  setGroupBy(groupBy: string): void {
    this.groupBy = '/' + groupBy;
    this.groupByForFilter = groupBy;
  }

  private getGroupByString(): string {
    return this.groupBy ? this.groupBy : '';
  }

  protected buildFilterChartDto(filters: FilterDto[]): FilterChartDto{
    const filtersWithDateAsString = filters.map((filter: FilterDto) => {
      if(this.isDateFilter(filter)) {
        return {
          ...filter,
          filterValue: this.mapDateToString(filter.filterValue as NgbDate),
          secondFilterValue: this.mapDateToString(filter.secondFilterValue as NgbDate)
        }
      }
      return filter;
    });
    return <FilterChartDto> {
      filterDtos: filtersWithDateAsString,
      chartGroupByType: this.groupByForFilter
    }
  }

  protected mapDateToString(date: NgbDate): string {
    if(!date) {
      return null;
    }
    return `${date.year}-${date.month}-${date.day}`;
  }

  private isDateFilter(filter: FilterDto): boolean {
    return filter.filterField == FilterField.EXPENSE_DATE || filter.filterField == FilterField.INCOME_DATE;
  }

  hasFilters(): boolean {
    return this.filters.length > 0;
  }

  clearFilters(): void {
    this.filters = [];
  }

  getFilters(): FilterDto[] {
    return this.filters;
  }
}
