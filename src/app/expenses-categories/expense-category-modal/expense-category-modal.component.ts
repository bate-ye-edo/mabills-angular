import {Component, Inject, Optional} from '@angular/core';
import {TwoChoicesModalComponent} from "../../shared/two-options-modal/two-choices-modal.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {
  TwoChoicesModalOptionsModel,
  TwoChoicesModalOptionsName
} from "../../shared/two-options-modal/two-choices-modal-options.model";
import {FormControl} from "@angular/forms";
import {ExpenseCategory} from "../expense-category.model";
import {ExpenseCategoriesComponent} from "../expense-categories.component";

@Component({
  selector: 'app-expense-category-modal',
  templateUrl: './expense-category-modal.component.html',
  styleUrls: ['./expense-category-modal.component.css']
})
export class ExpenseCategoryModalComponent extends TwoChoicesModalComponent {
  nameFormControl: FormControl = new FormControl('', []);

  constructor(@Inject(TwoChoicesModalOptionsName) options: TwoChoicesModalOptionsModel, protected override activeModal: NgbActiveModal,
              @Optional() @Inject(ExpenseCategoriesComponent.EXPENSE_CATEGORY_INPUT_NAME) private expenseCategory: ExpenseCategory) {
    super(options, activeModal);
    if(this.expenseCategory) {
      this.nameFormControl.setValue(this.expenseCategory.name);
    }
  }

  override confirm(): void {
    this.activeModal.dismiss();
    this.options.confirmCallback(this.nameFormControl.value);
  }
}
