import {FilterComparisons} from "./filter-comparisons";
import {FilterField} from "./filter-field";

export interface FilterDto {
  filterField: FilterField;
  filterComparison: FilterComparisons;
  filterValue: any;
  secondFilterValue?: any;
}
