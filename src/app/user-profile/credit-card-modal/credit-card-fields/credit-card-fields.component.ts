import {Component, Inject, Optional} from '@angular/core';
import {
  TwoChoicesModalOptions,
  TwoChoicesModalOptionsName
} from "../../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExpenseCategoriesComponent} from "../../../expenses-categories/expense-categories.component";
import {TwoChoicesModalComponent} from "../../../shared/two-options-modal/two-choices-modal.component";
import {CreditCard} from "../credit-card.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-credit-card-fields',
  templateUrl: './credit-card-fields.component.html',
  styleUrls: ['./credit-card-fields.component.css']
})
export class CreditCardFieldsComponent extends TwoChoicesModalComponent {
  creditCardNumberFormControl: FormControl = new FormControl('', []);
  constructor(@Inject(TwoChoicesModalOptionsName) options: TwoChoicesModalOptions, protected override activeModal: NgbActiveModal,
              @Optional() @Inject(ExpenseCategoriesComponent.EXPENSE_CATEGORY_INPUT_NAME) private creditCard: CreditCard) {
    super(options, activeModal);
    this.initializeFileds();
  }

  private initializeFileds() {
    if(this.creditCard) {
      this.creditCardNumberFormControl.setValue(this.creditCard.creditCardNumber);
    }
  }

  override confirm(): void {
    this.activeModal.dismiss();
    this.options.confirmCallback(this.creditCardNumberFormControl.value);
  }
}
