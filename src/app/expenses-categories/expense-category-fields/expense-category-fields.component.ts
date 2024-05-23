import {Component, inject, Inject, Optional} from '@angular/core';
import {TwoChoicesModalComponent} from "../../shared/two-options-modal/two-choices-modal.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {
  TwoChoicesModalOptionsSecret
} from "../../shared/two-options-modal/two-choices-modal.options";
import {FormControl} from "@angular/forms";
import {ExpenseCategory} from "../../shared/user-profile/expense-category.model";
import {ExpenseCategoriesComponent} from "../expense-categories.component";

@Component({
  selector: 'app-expense-category-fields',
  templateUrl: './expense-category-fields.component.html',
  styleUrls: ['./expense-category-fields.component.css']
})
export class ExpenseCategoryFieldsComponent extends TwoChoicesModalComponent {
  nameFormControl: FormControl = new FormControl('', []);

  constructor(@Optional() @Inject(ExpenseCategoriesComponent.EXPENSE_CATEGORY_INPUT_NAME) private expenseCategory: ExpenseCategory) {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
    if(this.expenseCategory) {
      this.nameFormControl.setValue(this.expenseCategory.name);
    }
  }

  override confirm(): void {
    this.activeModal.dismiss();
    this.options.confirmCallback(this.nameFormControl.value);
  }
}
