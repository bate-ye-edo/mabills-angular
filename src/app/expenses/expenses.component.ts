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
import {DateFormat} from "../shared/utils/date-format";
import {FilterOptions} from "../filters/filter-options";
import {FilterField} from "../shared/filters/filter-field";
import {PATTERNS} from "../shared/patterns";
import {FilterDto} from "../shared/filters/filter.dto";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  static readonly EXPENSE_INJECTION_NAME: string = 'expense';

  private expensesSubject: Subject<DataModel> = new Subject<DataModel>();
  private readonly expenses: DataModel;
  title: string = 'Expenses';
  emptyMessage: string = 'No expenses found';
  expenses$: Observable<DataModel> = this.expensesSubject.asObservable();
  dateFormat: string = DateFormat.WITHOUT_TIME;
  filters: FilterOptions[];

  constructor(private expensesService: ExpensesService, private showModalService: ShowModalService, private expenseCategoriesService: ExpenseCategoriesService) {
    this.expenses = this.initializeExpenses();
    this.expensesSubject.next(this.expenses);
    this.expenseCategoriesService.expenseCategories$.subscribe({
      next: expenseCategories => this.updateExpenseCategories(expenseCategories)
    });
    this.initializeFilters();
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
          expenseCategory: expenseCategories.find(ec => expense.expenseCategory && ec.uuid === expense.expenseCategory.uuid) ?? null
        }
      });
    this.expensesSubject.next(this.expenses);
  }

  deleteExpense(expense: Expense): void {
    this.expensesService.deleteExpense(expense)
      .subscribe({
        next: () => {
          this.expenses.data = this.expenses.data.filter(e => e.uuid !== expense.uuid);
          this.expensesSubject.next(this.expenses);
        }
      });
  }

  showUpdateExpenseModal(expense: Expense): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL,
      this.getUpdateExpenseModalOptions(),
      ExpenseFieldsComponent,
      [{provide: ExpensesComponent.EXPENSE_INJECTION_NAME, useValue: expense}]);
  }

  private getUpdateExpenseModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions>{
      title: 'Update expense',
      confirmText: 'Update',
      cancelText: 'Cancel',
      confirmCallback: (updatedExpense: Expense) => this.updateExpense(updatedExpense),
    };
  }

  private updateExpense(updatedExpense: Expense): void {
    this.expensesService.updateExpense(updatedExpense)
      .subscribe({
        next: (expense: Expense) => {
          let indexToUpdate: number = this.expenses.data.map(e => e.uuid).indexOf(expense.uuid);
          this.expenses.data[indexToUpdate] = expense;
          this.expensesSubject.next(this.expenses);
        }
      });
  }

  private initializeFilters(): void {
    this.filters = [
      <FilterOptions> {
        filterName: 'Amount',
        filterDataType: 'number',
        filterField: FilterField.AMOUNT
      },
      <FilterOptions> {
        filterName: 'Expense date',
        filterDataType: 'Date',
        filterField: FilterField.EXPENSE_DATE
      },
      <FilterOptions> {
        filterName: 'Description',
        filterDataType: 'string',
        filterField: FilterField.DESCRIPTION
      },
      <FilterOptions> {
        filterName: 'Expense category',
        filterDataType: 'string',
        filterField: FilterField.EXPENSE_CATEGORY
      },
      <FilterOptions> {
        filterName: 'Credit Card Number',
        filterDataType: 'string',
        filterField: FilterField.CREDIT_CARD,
        pattern: PATTERNS.CREDIT_CARD,
        errorMessage: 'Invalid credit card number, credit card should be 15,16 digits long',
        containsSearchPattern: PATTERNS.CREDIT_CARD_CONTAINS_PATTERN
      },
      <FilterOptions> {
        filterName: 'IBAN',
        filterDataType: 'string',
        filterField: FilterField.BANK_ACCOUNT,
        pattern: PATTERNS.IBAN,
        errorMessage: 'Invalid IBAN number',
        containsSearchPattern: PATTERNS.IBAN_CONTAINS_PATTERN
      },
      <FilterOptions> {
        filterName: 'Form of payment',
        filterDataType: 'string',
        filterField: FilterField.FORM_OF_PAYMENT
      }
    ]
  }

  applyFilters(filterDtos: FilterDto[]): void {
    console.log(filterDtos);
  }
}
