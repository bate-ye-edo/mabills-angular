import {Component, OnInit} from '@angular/core';
import {ExpenseCategoriesService} from "../shared/user-profile/expense-categories.service";
import {ExpenseCategory} from "../shared/user-profile/expense-category.model";
import {Observable, Subject} from "rxjs";
import {ShowModalService} from "../shared/show-modal.service";
import {ExpenseCategoryFieldsComponent} from "./expense-category-fields/expense-category-fields.component";
import {NO_BACK_DROP_MODAL} from "../shared/modal-options";
import {TwoChoicesModalOptions} from "../shared/two-options-modal/two-choices-modal.options";
import {ModalProviderModel} from "../shared/modal-provider.model";
import {DataModel} from "../shared/crud/data.model";

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.css']
})
export class ExpenseCategoriesComponent implements OnInit {
  public static readonly EXPENSE_CATEGORY_INPUT_NAME: string = 'EXPENSE_CATEGORY_INPUT_NAME';
  private dataModelSubject: Subject<DataModel> = new Subject<DataModel>();
  dataModel$: Observable<DataModel> = this.dataModelSubject.asObservable();
  dataModel: DataModel;
  crudTitle: string = 'Expense categories';
  crudEmptyMessage: string = 'No expense categories found';

  constructor(private expensesCategoriesService: ExpenseCategoriesService,
              private showModalService: ShowModalService) {
    this.initializeDataModel();
  }

  ngOnInit(): void {
    this.getAllExpenseCategories();
  }

  private addExpenseCategory(name: string): void {
    this.expensesCategoriesService.addNewExpenseCategory(name)
      .subscribe({
        next: expenseCategory => {
          this.dataModel.data.push(expenseCategory);
          this.dataModelSubject.next(this.dataModel);
        }
      })
  }

  private getAllExpenseCategories(): void {
    this.expensesCategoriesService.getExpensesCategories()
      .subscribe({
        next: (expenseCategories: ExpenseCategory[]) => {
          this.dataModel.data = expenseCategories;
          this.dataModelSubject.next(this.dataModel);
        }
      });
  }

  showAddExpenseCategoryModal(): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getAddNewExpenseCategoryModalOptions(), ExpenseCategoryFieldsComponent);
  }

  private getAddNewExpenseCategoryModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions>{
      title: 'Add new expense category',
      confirmText: 'Add',
      cancelText: 'Cancel',
      confirmCallback: (name: any) => this.addExpenseCategory(name),
    };
  }

  showEditExpenseCategoryModal(category: ExpenseCategory): void {
    this.showModalService.showTwoOptionsModal(
      NO_BACK_DROP_MODAL,
      this.getEditExpenseCategoryModalOptions(category),
      ExpenseCategoryFieldsComponent,
      [this.getEditExpenseCategoryModalProviders(category)]);
  }

  private getEditExpenseCategoryModalOptions(category: ExpenseCategory): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions>{
      title: 'Edit expense category',
      confirmText: 'Save',
      cancelText: 'Cancel',
      confirmCallback: (name: any) => this.editExpenseCategory(name, category),
    };
  }

  private editExpenseCategory(name: string, category: ExpenseCategory): void {
    this.expensesCategoriesService.editExpenseCategory(category, name)
      .subscribe({
        next: (expenseCategory: ExpenseCategory) => this.updateExpenseCategory(expenseCategory),
      })
  }

  private updateExpenseCategory(expenseCategory: ExpenseCategory): void {
    let indexToUpdate: number = this.getExpenseCategoryIndexByUuid(expenseCategory.uuid)
    if(indexToUpdate >= 0){
      this.dataModel.data[indexToUpdate] = expenseCategory;
      this.dataModelSubject.next(this.dataModel);
    }
  }

  private getExpenseCategoryIndexByUuid(uuid: string): number {
    return this.dataModel.data.map(exC => exC.uuid).indexOf(uuid);
  }

  private getEditExpenseCategoryModalProviders(category:ExpenseCategory): ModalProviderModel {
    return <ModalProviderModel> {
      provide: ExpenseCategoriesComponent.EXPENSE_CATEGORY_INPUT_NAME,
      useValue: category
    }
  }

  deleteExpenseCategory(category: ExpenseCategory): void {
    this.expensesCategoriesService.deleteExpenseCategory(category)
      .subscribe({
        next: () => this.removeExpenseCategory(category)
      });
  }

  private removeExpenseCategory(category: ExpenseCategory): void {
    let indexToRemove: number = this.getExpenseCategoryIndexByUuid(category.uuid);
    if(indexToRemove >= 0){
      this.dataModel.data.splice(indexToRemove, 1);
      this.dataModelSubject.next(this.dataModel);
    }
  }

  private initializeDataModel(): void {
    this.dataModel = <DataModel>{
      columns: [
        {displayName: 'Name', fieldName: 'name'},
        {displayName: 'Creation date', fieldName: 'creationDate'}
      ]
    };
  }
}
