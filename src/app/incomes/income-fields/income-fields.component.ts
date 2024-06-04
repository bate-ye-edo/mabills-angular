import {Component, inject, Inject, Optional} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserProfileService} from "../../shared/user-profile/user-profile.service";
import {TwoChoicesModalOptionsSecret} from "../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserProfile} from "../../shared/user-profile/user-profile.model";
import {Utils} from "../../shared/utils/utils";
import {IncomesComponent} from "../incomes.component";
import {Income} from "../income.model";
import {AbstractIncomeExpenseFieldsComponent} from "../../shared/AbstractIncomeExpenseFieldsComponent";

@Component({
  selector: 'app-income-fields',
  templateUrl: './income-fields.component.html',
  styleUrls: ['./income-fields.component.css']
})
export class IncomeFieldsComponent extends AbstractIncomeExpenseFieldsComponent {
  amountFormControl: FormControl = new FormControl('', [Validators.required]);
  incomeDateFormControl: FormControl = new FormControl('', [Validators.required]);
  descriptionFormControl: FormControl = new FormControl('');

  constructor(private userProfileService: UserProfileService, @Optional() @Inject(IncomesComponent.INCOME_INJECTION_NAME) private income: Income) {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
    this.userProfileService.userProfile$.subscribe({
      next: (userProfile: UserProfile) => this.updateSelects(userProfile)
    });
    this.userProfileService.initializeUserProfile();
  }

  override confirm(): void {
    this.activeModal.dismiss();
    this.options.confirmCallback(this.buildIncome());
  }

  private buildIncome(): Income {
    return <Income> {
      amount: parseFloat(this.amountFormControl.value),
      incomeDate: Utils.getNullIfEmpty(this.incomeDateFormControl.value),
      description: Utils.getNullIfEmpty(this.descriptionFormControl.value),
      creditCard: Utils.getNullIfEmpty(this.creditCardFormControl.value),
      bankAccount: Utils.getNullIfEmpty(this.bankAccountFormControl.value),
      uuid: this.income ? this.income.uuid : null
    }
  }

  fieldsHaveError(): boolean {
    return this.amountFormControl.invalid || this.incomeDateFormControl.invalid;
  }

  override initializeModel(): void {
    if(this.income) {
      this.amountFormControl.setValue(this.income.amount);
      this.incomeDateFormControl.setValue(this.income.incomeDate);
      this.descriptionFormControl.setValue(this.income.description);
      this.creditCardFormControl.setValue(this.creditCards.find(cc => this.filterCreditCardWithBlankOption(cc, this.income.creditCard)));
      this.bankAccountFormControl.setValue(this.bankAccounts.find(ba => this.filterBankAccountWithBlankOption(ba, this.income.bankAccount)));
    }
  }

  private isCreditCardListEmpty(): boolean {
    return this.creditCards.length === 0;
  }

  override canSelectBankAccounts(): boolean {
    return !this.isBankAccountListEmpty() && !this.creditCardSelectHasValue();
  }

  override canSelectCreditCards(): boolean {
    return !this.isCreditCardListEmpty();
  }

  private isBankAccountListEmpty(): boolean {
    return this.bankAccounts.length === 0;
  }

  override updateSelectFormControls(): void {
    this.enableOrDisableCreditCard();
    this.enableOrDisableBankAccount();
  }

}
