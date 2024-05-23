import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../../environment/environment";
import {ExpenseCategory} from "./expense-category.model";
import {Observable, Subject, tap} from "rxjs";
import {UpdateExpenseCategoryDto} from "../../expenses-categories/update-expense-category.dto";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/expense-categories';
  static readonly UPDATE_END_POINT: string = ExpenseCategoriesService.END_POINT + '/{}/name';

  private expenseCategories: ExpenseCategory[] = [];
  private expenseCategorySubject: Subject<ExpenseCategory[]> = new Subject<ExpenseCategory[]>();
  expenseCategories$: Observable<ExpenseCategory[]> = this.expenseCategorySubject.asObservable();

  constructor(private httpService: HttpService) { }

  getExpensesCategories(): Observable<ExpenseCategory[]> {
    return this.httpService.get(ExpenseCategoriesService.END_POINT)
      .pipe(
        map((response: ExpenseCategory[]) =>{
          response.map(expenseCategory => this.mapExpenseCategory(expenseCategory));
          this.expenseCategories = response;
          this.expenseCategorySubject.next(response);
          return response;
        })
      );
  }

  private mapExpenseCategory(expenseCategory: ExpenseCategory): ExpenseCategory {
    return <ExpenseCategory> {
      ...expenseCategory,
      creationDate: new Date(expenseCategory.creationDate)
    }
  }

  addNewExpenseCategory(name: string): Observable<ExpenseCategory> {
    return this.httpService
      .post(ExpenseCategoriesService.END_POINT, this.buildExpenseCategoryWithName(name))
      .pipe(
        map((expenseCategory: ExpenseCategory) => {
          this.expenseCategorySubject.next(this.expenseCategories);
          return this.mapExpenseCategory(expenseCategory);
        })
      );
  }

  private buildExpenseCategoryWithName(name:string): ExpenseCategory{
    return <ExpenseCategory> {
      name: name
    }
  }

  editExpenseCategory(category: ExpenseCategory, name: string): Observable<ExpenseCategory> {
    return this.httpService
      .put(ExpenseCategoriesService.UPDATE_END_POINT.replace('{}', category.uuid), <UpdateExpenseCategoryDto>{name: name})
      .pipe(
        map((expenseCategory: ExpenseCategory) => {
          this.expenseCategories = this.expenseCategories.map(ec => ec.uuid === expenseCategory.uuid ? expenseCategory : ec);
          this.expenseCategorySubject.next(this.expenseCategories);
          return this.mapExpenseCategory(expenseCategory);
        })
      );
  }

  deleteExpenseCategory(category: ExpenseCategory): Observable<ExpenseCategory> {
    return this.httpService.delete(ExpenseCategoriesService.END_POINT + '/' + category.uuid)
      .pipe(
        tap( () => {
          this.expenseCategories = this.expenseCategories.filter(ec => ec.uuid !== category.uuid);
          this.expenseCategorySubject.next(this.expenseCategories);
        })
      );
  }
}
