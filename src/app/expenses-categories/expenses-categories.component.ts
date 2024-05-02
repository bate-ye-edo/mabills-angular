import {Component, OnInit} from '@angular/core';
import {ExpensesCategoriesService} from "./expenses-categories.service";
import {ExpenseCategory} from "./expense-category.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subject} from "rxjs";
import {ShowModalService} from "../shared/show-modal.service";
import {ExpenseCategoryModalComponent} from "./expense-category-modal/expense-category-modal.component";
import {NO_BACK_DROP_MODAL} from "../shared/ModalOptions";
import {TwoChoicesModalOptionsModel} from "../shared/two-options-modal/two-choices-modal-options.model";
import {ModalProviderModel} from "../shared/ModalProvider.model";

@Component({
  selector: 'app-expenses-categories',
  templateUrl: './expenses-categories.component.html',
  styleUrls: ['./expenses-categories.component.css']
})
export class ExpensesCategoriesComponent implements OnInit {
  public static readonly EXPENSE_CATEGORY_INPUT_NAME: string = 'EXPENSE_CATEGORY_INPUT_NAME';
  expenseCategories: ExpenseCategory[];
  hasExpenseCategory: boolean;
  private expenseCategoriesSubject: Subject<ExpenseCategory[]> = new Subject<ExpenseCategory[]>();
  expenseCategories$: Observable<ExpenseCategory[]> = this.expenseCategoriesSubject.asObservable();

  constructor(private expensesCategoriesService: ExpensesCategoriesService,
              private activeModal: NgbActiveModal,
              private showModalService: ShowModalService) {
    this.expenseCategories$.subscribe((expenseCategories: ExpenseCategory[]) => {
      this.expenseCategories = expenseCategories;
      this.hasExpenseCategory = !!this.expenseCategories && this.expenseCategories.length > 0;
    });
  }

  ngOnInit(): void {
    this.refreshExpenseCategories();
  }

  private addExpenseCategory(name: string): void {
    this.expensesCategoriesService.addNewExpenseCategory(name)
      .subscribe({
        next: isAdded => {
          if(isAdded) {
            this.refreshExpenseCategories();
          }
        }
      })
  }

  private refreshExpenseCategories(): void {
    this.expensesCategoriesService.getExpensesCategories()
      .subscribe({
        next: (expenseCategories: ExpenseCategory[]) => this.expenseCategoriesSubject.next(expenseCategories)
      });
  }

  showAddExpenseCategoryModal(): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getAddNewExpenseCategoryModalOptions(), ExpenseCategoryModalComponent);
  }

  private getAddNewExpenseCategoryModalOptions(): TwoChoicesModalOptionsModel {
    return <TwoChoicesModalOptionsModel>{
      title: 'Add new expense category',
      message: 'Enter the name of the new category',
      confirmText: 'Add',
      cancelText: 'Cancel',
      confirmCallback: (name: any) => this.addExpenseCategory(name),
    };
  }


  closeModal() {
    this.activeModal.dismiss();
  }

  showEditExpenseCategoryModal(category: ExpenseCategory): void {
    this.showModalService.showTwoOptionsModal(
      NO_BACK_DROP_MODAL,
      this.getEditExpenseCategoryModalOptions(category),
      ExpenseCategoryModalComponent,
      [this.getEditExpenseCategoryModalProviders(category)]);
  }
  private getEditExpenseCategoryModalOptions(category: ExpenseCategory): TwoChoicesModalOptionsModel {
    return <TwoChoicesModalOptionsModel>{
      title: 'Edit expense category',
      message: 'Enter the new name of the category',
      confirmText: 'Save',
      cancelText: 'Cancel',
      confirmCallback: (name: any) => this.editExpenseCategory(name, category),
    };
  }
  private editExpenseCategory(name: string, category: ExpenseCategory): void {
    console.log(name);
  }
  private getEditExpenseCategoryModalProviders(category:ExpenseCategory): ModalProviderModel {
    return <ModalProviderModel> {
      provide: ExpensesCategoriesComponent.EXPENSE_CATEGORY_INPUT_NAME,
      useValue: category
    }
  }

  deleteExpenseCategory(category: ExpenseCategory): void {
    console.log('deleteExpenseCategory');
  }
}
