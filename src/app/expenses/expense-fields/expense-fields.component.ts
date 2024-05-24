import {Component, inject} from '@angular/core';
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

  constructor(private userProfileService: UserProfileService) {
    super(inject(TwoChoicesModalOptionsSecret), inject(NgbActiveModal));
    this.userProfileService.userProfile$.subscribe({
      next: (userProfile: UserProfile) => this.initializeSelects(userProfile)
    });
    this.userProfileService.initializeUserProfile();
  }

  private initializeSelects(userProfile: UserProfile): void {
    this.creditCards = userProfile.creditCards;
    this.bankAccounts = userProfile.bankAccounts;
    this.expenseCategories = userProfile.expenseCategories;
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
      bankAccount: Utils.getNullIfEmpty(this.bankAccountFormControl.value)
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
}
