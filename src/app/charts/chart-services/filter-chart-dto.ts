import {FilterDto} from "../../shared/filters/filter.dto";

export interface FilterChartDto {
  filterDtos: FilterDto[];
  chartCategory: string;
  chartGroupByType: string;
}
