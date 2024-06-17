import {Observable} from "rxjs";
import {FilterDto} from "./filter.dto";
import {FilterField} from "./filter-field";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

export abstract class FilterService<T> {

  private isDateFilter(filter: FilterDto): boolean {
    return filter.filterField == FilterField.EXPENSE_DATE || filter.filterField == FilterField.INCOME_DATE;
  }

  protected applyFiltersWithDateAsString(filters: FilterDto[]): Observable<T> {
    return this.applyFilters(filters.map((filter: FilterDto) => {
      if(this.isDateFilter(filter)) {
        return {
          ...filter,
          filterValue: this.mapDateToString(filter.filterValue as NgbDate),
          secondFilterValue: this.mapDateToString(filter.secondFilterValue as NgbDate)
        }
      }
      return filter;
    }));
  }

  private mapDateToString(date: NgbDate): string {
    if(!date) {
      return null;
    }
    return `${date.year}-${date.month}-${date.day}`;
  }

  protected abstract applyFilters(filters: FilterDto[]): Observable<T>;
}
