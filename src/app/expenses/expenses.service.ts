import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Expense} from "./expense.model";
import {ENVIRONMENT} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/expenses';
  constructor(private httpService: HttpService) {}

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
}
