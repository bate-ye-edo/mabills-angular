import {inject, Injectable} from '@angular/core';
import {AbstractChartService} from "./AbstractChartService";
import {ChartCategory} from "./chart-category";
import {CHART_ENDPOINT} from "./chart-endpoints";
import {HttpService} from "@core/http.service";
import {FilterDto} from "../../shared/filters/filter.dto";
import {FilterChartDto} from "./filter-chart-dto";

@Injectable({
  providedIn: 'root'
})
export class IncomesChartService extends AbstractChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartCategory.INCOMES;
  constructor() {
    super(inject(HttpService));
    this.chartEndpoint = IncomesChartService.END_POINT;
  }

  override buildFilterChartDto(filters: FilterDto[]): FilterChartDto {
    const filterChartDto = super.buildFilterChartDto(filters);
    return <FilterChartDto> {
      ...filterChartDto,
      chartCategory: ChartCategory.INCOMES
    }
  }
}
