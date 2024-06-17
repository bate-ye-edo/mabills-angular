import {SeriesChartService} from "./chart-service";
import {CHART_ENDPOINT} from "./chart-endpoints";
import {ChartCategory} from "./chart-category";
import {Injectable} from "@angular/core";
import {AbstractSeriesChartService} from "./AbstractSeriesChartService";
import {FilterDto} from "../../shared/filters/filter.dto";
import {FilterChartDto} from "./filter-chart-dto";

@Injectable({
  providedIn: 'root'
})
export class ExpenseIncomeSeriesChartService extends AbstractSeriesChartService implements SeriesChartService {
  static readonly END_POINT: string = CHART_ENDPOINT + "/" + ChartCategory.EXPENSE_INCOME_SERIES;

  constructor() {
    super();
    this.chartEndpoint = ExpenseIncomeSeriesChartService.END_POINT;
  }

  override buildFilterChartDto(filters: FilterDto[]): FilterChartDto {
    const filterChartDto = super.buildFilterChartDto(filters);
    return <FilterChartDto> {
      ...filterChartDto,
      chartCategory: ChartCategory.EXPENSE_INCOME_SERIES
    }
  }
}
