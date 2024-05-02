import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../environment/environment";
import {ExpenseCategory} from "./expense-category.model";
import {Observable} from "rxjs";
import {UpdateExpenseCategoryDto} from "./update-expense-category.dto";

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/expense-categories';
  static readonly UPDATE_END_POINT: string = ExpenseCategoriesService.END_POINT + '/{}/name';
  constructor(private httpService: HttpService) { }

  getExpensesCategories(): Observable<ExpenseCategory[]> {
    return this.httpService.get(ExpenseCategoriesService.END_POINT);
  }

  addNewExpenseCategory(name: string): Observable<ExpenseCategory> {
    return this.httpService
      .post(ExpenseCategoriesService.END_POINT, this.buildExpenseCategoryWithName(name));
  }

  private buildExpenseCategoryWithName(name:string){
    return <ExpenseCategory> {
      name: name
    }
  }

  editExpenseCategory(category: ExpenseCategory, name: string): Observable<ExpenseCategory> {
    return this.httpService
      .put(ExpenseCategoriesService.UPDATE_END_POINT.replace('{}', category.uuid), <UpdateExpenseCategoryDto>{name: name});
  }
}
