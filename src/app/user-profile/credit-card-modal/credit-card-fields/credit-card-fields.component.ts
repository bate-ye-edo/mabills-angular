import {Component, Inject, Optional} from '@angular/core';
import {
  TwoChoicesModalOptions,
  TwoChoicesModalOptionsName
} from "../../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExpenseCategoriesComponent} from "../../../expenses-categories/expense-categories.component";
import {TwoChoicesModalComponent} from "../../../shared/two-options-modal/two-choices-modal.component";
import {CreditCard} from "../../credit-card.model";
import {FormControl, Validators} from "@angular/forms";
import {UserProfileService} from "../../user-profile.service";
import {BankAccount} from "../../bank-account.model";

@Component({
  selector: 'app-credit-card-fields',
  templateUrl: './credit-card-fields.component.html',
  styleUrls: ['./credit-card-fields.component.css']
})
export class CreditCardFieldsComponent extends TwoChoicesModalComponent {
  creditCardNumberFormControl: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{15,16}$')]);
  bankAccounts: BankAccount[] = [];
  selectBankAccountFormControl: FormControl;
  constructor(@Inject(TwoChoicesModalOptionsName) options: TwoChoicesModalOptions, protected override activeModal: NgbActiveModal,
              @Optional() @Inject(ExpenseCategoriesComponent.EXPENSE_CATEGORY_INPUT_NAME) private creditCard: CreditCard,
              private userProfileService: UserProfileService) {
    super(options, activeModal);
    this.initializeFields();
    this.bankAccounts = this.userProfileService.getUserBankAccounts();
    this.selectBankAccountFormControl = new FormControl({value:'', disabled: this.bankAccountsEmpty()});
  }

  private initializeFields() {
    if(this.creditCard) {
      this.creditCardNumberFormControl.setValue(this.creditCard.creditCardNumber);
    }
  }

  override confirm(): void {
    this.activeModal.dismiss();
    this.options.confirmCallback(this.buildCreditCard());
  }

  private buildCreditCard(): CreditCard {
    return <CreditCard>{
      creditCardNumber: this.creditCardNumberFormControl.value,
      bankAccount: this.buildSelectedBankAccount()
    }
  }

  bankAccountsEmpty(): boolean {
    return this.bankAccounts.length === 0;
  }

  private buildSelectedBankAccount(): BankAccount {
    if(this.selectBankAccountFormControl.value === '' || this.selectBankAccountFormControl.value === null) {
      return null;
    }
    return <BankAccount>{
      uuid: this.selectBankAccountFormControl.value,
      iban: this.bankAccounts.find(bankAccount => bankAccount.uuid === this.selectBankAccountFormControl.value).iban
    }
  }
}
