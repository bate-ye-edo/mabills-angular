import {inject, Injectable} from '@angular/core';
import {CHART_ENDPOINT} from "./chart-endpoints";
import {ChartCategory} from "./chart-category";
import {AbstractChartService} from "./AbstractChartService";
import {HttpService} from "@core/http.service";
import { FilterDto } from 'app/shared/filters/filter.dto';
import { FilterChartDto } from './filter-chart-dto';

@Injectable({
  providedIn: 'root'
})
export class ExpensesChartService extends AbstractChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartCategory.EXPENSES;
  constructor() {
    super(inject(HttpService));
    this.chartEndpoint = ExpensesChartService.END_POINT;
  }

  override buildFilterChartDto(filters: FilterDto[]): FilterChartDto {
    const filterChartDto = super.buildFilterChartDto(filters);
    return <FilterChartDto> {
      ...filterChartDto,
      chartCategory: ChartCategory.EXPENSES
    }
  }
}
