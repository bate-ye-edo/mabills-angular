import {Component, OnInit} from '@angular/core';
import {ExpensesService} from "./expenses.service";
import {Observable, Subject} from "rxjs";
import {DataModel} from "../shared/crud/data.model";
import {ColumnModel} from "../shared/crud/column.model";
import {ShowModalService} from "../shared/show-modal.service";
import {NO_BACK_DROP_MODAL} from "../shared/modal-options";
import {ExpenseFieldsComponent} from "./expense-fields/expense-fields.component";
import {TwoChoicesModalOptions} from "../shared/two-options-modal/two-choices-modal.options";
import {Expense} from "./expense.model";
import {ExpenseCategoriesService} from "../shared/user-profile/expense-categories.service";
import {ExpenseCategory} from "../shared/user-profile/expense-category.model";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  private expensesSubject: Subject<DataModel> = new Subject<DataModel>();
  private readonly expenses: DataModel;
  title: string = 'Expenses';
  emptyMessage: string = 'No expenses found';
  expenses$: Observable<DataModel> = this.expensesSubject.asObservable();

  constructor(private expensesService: ExpensesService, private showModalService: ShowModalService, private expenseCategoriesService: ExpenseCategoriesService) {
    this.expenses = this.initializeExpenses();
    this.expensesSubject.next(this.expenses);
    this.expenseCategoriesService.expenseCategories$.subscribe({
      next: expenseCategories => this.updateExpenseCategories(expenseCategories)
    });
  }

  ngOnInit(): void {
    this.expensesService.getExpenses()
      .subscribe({
        next: expenses => {
          this.expenses.data = expenses;
          this.expensesSubject.next(this.expenses);
        }
      })
  }

  private getColumns(): ColumnModel[] {
    return [
      {
        displayName: 'Expense date',
        fieldName: 'expenseDate'
      },
      {
        displayName: 'Amount',
        fieldName: 'amount'
      },
      {
        displayName: 'Description',
        fieldName: 'description'
      },
      {
        displayName: 'Category',
        fieldName: 'expenseCategory.name'
      },
      {
        displayName: 'Credit card',
        fieldName: 'creditCard.creditCardNumber'
      },
      {
        displayName: 'Bank account',
        fieldName: 'bankAccount.iban'
      },
      {
        displayName: 'Form of payment',
        fieldName: 'formOfPayment'
      }
    ];
  }

  private initializeExpenses():DataModel {
    return <DataModel>{
      columns: this.getColumns(),
      data: []
    };
  }

  showAddExpenseModal(): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getAddExpenseModalOptions(), ExpenseFieldsComponent);
  }

  private getAddExpenseModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions>{
      title: 'Add expense',
      confirmText: 'Add',
      cancelText: 'Cancel',
      confirmCallback: (expense) => this.createExpense(expense)
    };
  }

  private createExpense(expense: Expense): void {
    this.expensesService.createExpense(expense)
      .subscribe({
        next: (newExpense: Expense) => {
          this.expenses.data.push(newExpense);
          this.expensesSubject.next(this.expenses);
        }
      });
  }

  private updateExpenseCategories(expenseCategories: ExpenseCategory[]): void {
    this.expenses.data = this.expenses.data
      .map(expense => {
        return <Expense>{
          ...expense,
          expenseCategory: expenseCategories.find(ec => ec.uuid === expense.expenseCategory.uuid) ?? null
        }
      });
    this.expensesSubject.next(this.expenses);
  }
}
