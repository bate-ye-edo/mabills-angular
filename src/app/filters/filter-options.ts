import {FilterField} from "../shared/filters/filter-field";

export interface FilterOptions {
  filterField: FilterField;
  filterName: string;
  filterDataType: string;
  pattern?: string;
  errorMessage?: string;
  containsSearchPattern?: string;
}
