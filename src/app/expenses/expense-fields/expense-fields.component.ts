import {Component, Inject, inject, Optional} from '@angular/core';
import {TwoChoicesModalComponent} from "../../shared/two-options-modal/two-choices-modal.component";
import {TwoChoicesModalOptionsSecret} from "../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {Expense, FormOfPayment} from "../expense.model";
import {UserProfileService} from "../../shared/user-profile/user-profile.service";
import {CreditCard} from "../../shared/user-profile/credit-card.model";
import {UserProfile} from "../../shared/user-profile/user-profile.model";
import {BankAccount} from "../../shared/user-profile/bank-account.model";
import {ExpenseCategory} from "../../shared/user-profile/expense-category.model";
import {Utils} from "../../shared/utils/utils";
import {ExpensesComponent} from "../expenses.component";

@Component({
  selector: 'app-expense-fields',
  templateUrl: './expense-fields.component.html',
  styleUrls: ['./expense-fields.component.css']
})
export class ExpenseFieldsComponent extends TwoChoicesModalComponent {
  static readonly NUMBERS_ONLY_PATTERN: string = '^(0|[1-9][0-9]*)(\\.[0-9]{1,3})?$';
  formOfPayments: FormOfPayment[] = [FormOfPayment.CARD, FormOfPayment.CASH, FormOfPayment.BANK_TRANSFER];
  amountFormControl: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(ExpenseFieldsComponent.NUMBERS_ONLY_PATTERN)] );
  expenseDateFormControl: FormControl = new FormControl('', [Validators.required]);
  descriptionFormControl: FormControl = new FormControl('');
  expenseCategoryFormControl: FormControl = new FormControl('');
  creditCardFormControl: FormControl = new FormControl('');
  bankAccountFormControl: FormControl = new FormControl('');
  formOfPaymentFormControl: FormControl = new FormControl('');
  creditCards: CreditCard[] = [];
  bankAccounts: BankAccount[] = [];
  expenseCategories: ExpenseCategory[] = [];
  private allCreditCards: CreditCard[] = [];

  constructor(private userProfileService: UserProfileService, @Optional() @Inject(ExpensesComponent.EXPENSE_INJECTION_NAME) private expense: Expense) {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
    this.userProfileService.userProfile$.subscribe({
      next: (userProfile: UserProfile) => this.updateSelects(userProfile)
    });
    this.userProfileService.initializeUserProfile();
  }

  private updateSelects(userProfile: UserProfile): void {
    this.allCreditCards = [<CreditCard>{}, ...userProfile.creditCards];
    this.creditCards = [<CreditCard>{}, ...userProfile.creditCards];
    this.bankAccounts = [<BankAccount>{}, ...userProfile.bankAccounts];
    this.expenseCategories = [<ExpenseCategory>{}, ...userProfile.expenseCategories];
    this.updateSelectFormControls();
    this.initializeExpense();
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
    return this.amountFormControl.invalid
      || this.expenseDateFormControl.invalid;
  }

  private initializeExpense(): void {
    if(this.expense) {
      this.amountFormControl.setValue(this.expense.amount);
      this.expenseDateFormControl.setValue(this.expense.expenseDate);
      this.descriptionFormControl.setValue(this.expense.description);
      this.expenseCategoryFormControl.setValue(this.expenseCategories.find(ec => ec.uuid === this.expense.expenseCategory.uuid));
      this.formOfPaymentFormControl.setValue(this.expense.formOfPayment);
      this.creditCardFormControl.setValue(this.creditCards.find(cc => cc.uuid === this.expense.creditCard.uuid));
      this.bankAccountFormControl.setValue(this.bankAccounts.find(ba => ba.uuid === this.expense.bankAccount.uuid));
    }
  }

  private isExpenseCategoryListEmpty(): boolean {
    return this.expenseCategories.length === 0;
  }

  private isCreditCardListEmpty(): boolean {
    return this.creditCards.length === 0;
  }

  private canSelectBankAccounts(): boolean {
    return this.formOfPaymentFormControl.value !== FormOfPayment.CASH
      && !this.isBankAccountListEmpty()
      && !this.creditCardSelectHasValue();
  }

  private canSelectCreditCards(): boolean {
    return this.formOfPaymentFormControl.value === FormOfPayment.CARD && !this.isCreditCardListEmpty();
  }

  private isBankAccountListEmpty(): boolean {
    return this.bankAccounts.length === 0;
  }

  private updateSelectFormControls(): void {
    this.enableCreditCard();
    this.enableBankAccount();
    this.enableExpenseCategory();
  }

  private enableCreditCard(): void {
    if(this.canSelectCreditCards()) {
      this.creditCardFormControl.enable();
      if(this.bankAccountSelectHasValue()) {
        this.updateCreditCardsOfBankAccount();
      }
    } else {
      this.disableCreditCard();
    }
  }

  private enableBankAccount(): void {
    if(this.canSelectBankAccounts()) {
      this.bankAccountFormControl.enable();
    } else {
      this.disableBankAccount();
    }
  }

  private enableExpenseCategory(): void {
    if(this.isExpenseCategoryListEmpty()) {
      this.expenseCategoryFormControl.disable();
    } else {
      this.expenseCategoryFormControl.enable();
    }
  }

  private disableCreditCard(): void {
    this.creditCardFormControl.setValue(null);
    this.creditCardFormControl.disable();
  }

  private disableBankAccount(): void {
    this.bankAccountFormControl.setValue(null);
    this.bankAccountFormControl.disable();
  }

  onCreditCardChanged(): void {
    if(this.creditCardSelectHasValue()) {
      this.disableBankAccount();
      let creditCard: CreditCard = this.creditCardFormControl.value as CreditCard;
      this.bankAccountFormControl.setValue(this.bankAccounts.find(ba => creditCard.bankAccount && ba.uuid === creditCard.bankAccount.uuid));
    }
  }

  onFormOfPaymentChanged(): void {
    this.creditCards = this.allCreditCards;
    this.enableCreditCard();
    this.enableBankAccount();
  }

  onBankAccountChanged(): void {
    this.creditCardFormControl.setValue(null);
    this.creditCards = this.allCreditCards;
    this.updateCreditCardsOfBankAccount();
    this.enableCreditCard();
  }

  private updateCreditCardsOfBankAccount(): void {
    if(this.bankAccountSelectHasValue()) {
      this.creditCards = this.allCreditCards.filter(cc => cc.bankAccount != null && cc.bankAccount.uuid === (this.bankAccountFormControl.value as BankAccount).uuid);
    }
  }

  private bankAccountSelectHasValue(): boolean {
    return this.bankAccountFormControl.value != null && (this.bankAccountFormControl.value as BankAccount).uuid != null;
  }

  private creditCardSelectHasValue(): boolean {
    return this.creditCardFormControl.value != null && (this.creditCardFormControl.value as CreditCard).uuid != null;
  }
}
