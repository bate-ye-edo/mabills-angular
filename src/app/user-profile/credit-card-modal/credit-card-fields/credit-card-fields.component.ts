import {Component, inject} from '@angular/core';
import {TwoChoicesModalOptionsSecret} from "../../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TwoChoicesModalComponent} from "../../../shared/two-options-modal/two-choices-modal.component";
import {CreditCard} from "../../../shared/user-profile/credit-card.model";
import {FormControl, Validators} from "@angular/forms";
import {UserProfileService} from "../../../shared/user-profile/user-profile.service";
import {BankAccount} from "../../../shared/user-profile/bank-account.model";
import {PATTERNS} from "../../../shared/patterns";

@Component({
  selector: 'app-credit-card-fields',
  templateUrl: './credit-card-fields.component.html',
  styleUrls: ['./credit-card-fields.component.css']
})
export class CreditCardFieldsComponent extends TwoChoicesModalComponent {
  creditCardNumberFormControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(PATTERNS.CREDIT_CARD)]);
  bankAccounts: BankAccount[] = [];
  selectBankAccountFormControl: FormControl;
  constructor(private userProfileService: UserProfileService) {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
    this.bankAccounts = this.userProfileService.getUserBankAccounts();
    this.selectBankAccountFormControl = new FormControl({value:'', disabled: this.bankAccountsEmpty()});
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
