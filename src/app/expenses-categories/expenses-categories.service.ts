import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../environment/environment";
import {ExpenseCategory} from "./expense-category.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExpensesCategoriesService {
  static readonly END_POINT = ENVIRONMENT.SERVICE + '/expense-categories';
  constructor(private httpService: HttpService) { }

  getExpensesCategories(): Observable<ExpenseCategory[]> {
    return this.httpService.get(ExpensesCategoriesService.END_POINT);
  }

  addNewExpenseCategory(name: string): Observable<boolean> {
    return this.httpService
      .hideError()
      .post(ExpensesCategoriesService.END_POINT, this.buildExpenseCategoryWithName(name))
      .pipe(
        map(expenseCategory => !!expenseCategory)
      );
  }

  private buildExpenseCategoryWithName(name:string){
    return <ExpenseCategory> {
      name: name
    }
  }
}
