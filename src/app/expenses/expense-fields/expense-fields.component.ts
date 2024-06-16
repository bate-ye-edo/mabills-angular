import {Component, Inject, inject, Optional} from '@angular/core';
import {TwoChoicesModalOptionsSecret} from "../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {Expense, FormOfPayment} from "../expense.model";
import {UserProfileService} from "../../shared/user-profile/user-profile.service";
import {UserProfile} from "../../shared/user-profile/user-profile.model";
import {Utils} from "../../shared/utils/utils";
import {ExpensesComponent} from "../expenses.component";
import {AbstractIncomeExpenseFieldsComponent} from "../../shared/AbstractIncomeExpenseFieldsComponent";
import {PATTERNS} from "../../shared/patterns";

@Component({
  selector: 'app-expense-fields',
  templateUrl: './expense-fields.component.html',
  styleUrls: ['./expense-fields.component.css']
})
export class ExpenseFieldsComponent extends AbstractIncomeExpenseFieldsComponent {
  formOfPayments: FormOfPayment[] = [FormOfPayment.CARD, FormOfPayment.CASH, FormOfPayment.BANK_TRANSFER];
  amountFormControl: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(PATTERNS.NUMBERS_ONLY)] );
  expenseDateFormControl: FormControl = new FormControl('', [Validators.required]);
  descriptionFormControl: FormControl = new FormControl('');
  expenseCategoryFormControl: FormControl = new FormControl('');
  formOfPaymentFormControl: FormControl = new FormControl('');

  constructor(private userProfileService: UserProfileService, @Optional() @Inject(ExpensesComponent.EXPENSE_INJECTION_NAME) private expense: Expense) {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
    this.userProfileService.userProfile$.subscribe({
      next: (userProfile: UserProfile) => this.updateSelects(userProfile)
    });
    this.userProfileService.initializeUserProfile();
  }

  override confirm(): void {
    this.activeModal.dismiss();
    this.options.confirmCallback(this.buildExpense());
  }

  private buildExpense(): Expense {
    return <Expense> {
      amount: parseFloat(this.amountFormControl.value),
      expenseDate: Utils.getNullIfEmpty(this.expenseDateFormControl.value),
      description: Utils.getNullIfEmpty(this.descriptionFormControl.value),
      expenseCategory: Utils.getNullIfEmpty(this.expenseCategoryFormControl.value),
      formOfPayment: Utils.getNullIfEmpty(this.buildFormOfPayment()),
      creditCard: Utils.getNullIfEmpty(this.creditCardFormControl.value),
      bankAccount: Utils.getNullIfEmpty(this.bankAccountFormControl.value),
      uuid: this.expense ? this.expense.uuid : null
    }
  }

  private buildFormOfPayment(): FormOfPayment {
    let fop: string = Utils.getNameOfEnumValue(FormOfPayment, this.formOfPaymentFormControl.value);
    return Utils.getNullIfEmpty(fop);
  }

  fieldsHaveError(): boolean {
    return this.amountFormControl.invalid || this.expenseDateFormControl.invalid;
  }

  override initializeModel(): void {
    if(this.expense) {
      this.amountFormControl.setValue(this.expense.amount);
      this.expenseDateFormControl.setValue(this.expense.expenseDate);
      this.descriptionFormControl.setValue(this.expense.description);
      this.expenseCategoryFormControl.setValue(this.expenseCategories.find(ec => this.expense.expenseCategory && ec.uuid === this.expense.expenseCategory.uuid));
      this.formOfPaymentFormControl.setValue(this.expense.formOfPayment);
      this.creditCardFormControl.setValue(this.creditCards.find(cc => this.expense.creditCard && cc.uuid === this.expense.creditCard.uuid));
      this.bankAccountFormControl.setValue(this.bankAccounts.find(ba => this.expense.bankAccount && ba.uuid === this.expense.bankAccount.uuid));
    }
  }

  private isExpenseCategoryListEmpty(): boolean {
    return this.expenseCategories.length === 0;
  }

  private isCreditCardListEmpty(): boolean {
    return this.creditCards.length === 0;
  }

  override canSelectBankAccounts(): boolean {
    return this.formOfPaymentFormControl.value !== FormOfPayment.CASH
      && !this.isBankAccountListEmpty()
      && !this.creditCardSelectHasValue();
  }

  override canSelectCreditCards(): boolean {
    return this.formOfPaymentFormControl.value === FormOfPayment.CARD && !this.isCreditCardListEmpty();
  }

  private isBankAccountListEmpty(): boolean {
    return this.bankAccounts.length === 0;
  }

  override updateSelectFormControls(): void {
    this.enableOrDisableCreditCard();
    this.enableOrDisableBankAccount();
    this.enableExpenseCategory();
  }

  private enableExpenseCategory(): void {
    if(this.isExpenseCategoryListEmpty()) {
      this.expenseCategoryFormControl.disable();
    } else {
      this.expenseCategoryFormControl.enable();
    }
  }


  onFormOfPaymentChanged(): void {
    this.creditCards = this.allCreditCards;
    this.enableOrDisableCreditCard();
    this.enableOrDisableBankAccount();
  }
}
