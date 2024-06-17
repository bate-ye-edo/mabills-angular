import {Injectable} from '@angular/core';
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Expense} from "./expense.model";
import {ENVIRONMENT} from "../../environment/environment";
import {FilterDto} from "../shared/filters/filter.dto";
import {FilterService} from "../shared/filters/filter.service";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService extends FilterService<Expense[]> {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/expenses';
  static readonly SEARCH_END_POINT: string = ENVIRONMENT.SERVICE + '/expenses/search';

  constructor(private httpService: HttpService) {
    super();
  }

  getExpenses(): Observable<Expense[]> {
    return this.httpService.get(ExpensesService.END_POINT);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.httpService.post(ExpensesService.END_POINT, expense);
  }

  deleteExpense(expense: Expense): Observable<Expense> {
    return this.httpService.delete(ExpensesService.END_POINT + '/' + expense.uuid);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.httpService.put(ExpensesService.END_POINT, expense);
  }

  applyExpenseFilters(filters: FilterDto[]): Observable<Expense[]> {
    return this.applyFiltersWithDateAsString(filters);
  }

  protected override applyFilters(filterDtos: FilterDto[]): Observable<Expense[]> {
    if(filterDtos.length === 0){
      return this.getExpenses();
    }
    return this.httpService.post(ExpensesService.SEARCH_END_POINT, filterDtos);
  }
}
