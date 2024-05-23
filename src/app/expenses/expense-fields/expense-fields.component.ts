import {Component, inject} from '@angular/core';
import {TwoChoicesModalComponent} from "../../shared/two-options-modal/two-choices-modal.component";
import {TwoChoicesModalOptionsSecret} from "../../shared/two-options-modal/two-choices-modal.options";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, Validators} from "@angular/forms";
import {FormOfPayment} from "../expense.model";
import {UserProfileService} from "../../shared/user-profile/user-profile.service";
import {CreditCard} from "../../shared/user-profile/credit-card.model";
import {UserProfile} from "../../shared/user-profile/user-profile.model";
import {BankAccount} from "../../shared/user-profile/bank-account.model";
import {ExpenseCategory} from "../../shared/user-profile/expense-category.model";

@Component({
  selector: 'app-expense-fields',
  templateUrl: './expense-fields.component.html',
  styleUrls: ['./expense-fields.component.css']
})
export class ExpenseFieldsComponent extends TwoChoicesModalComponent {
  static readonly NUMBERS_ONLY_PATTERN: string = '^(0|[1-9][0-9]*)(,[0-9]+)?$';
  formOfPayments: FormOfPayment[] = [FormOfPayment.CARD, FormOfPayment.CASH, FormOfPayment.BANK_TRANSFER];
  amountFormControl: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(ExpenseFieldsComponent.NUMBERS_ONLY_PATTERN)] );
  expenseDateFormControl: FormControl = new FormControl('', Validators.required);
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
    this.amountFormControl.setValue('0');
  }

  private initializeSelects(userProfile: UserProfile): void {
    this.creditCards = userProfile.creditCards;
    this.bankAccounts = userProfile.bankAccounts;
    this.expenseCategories = userProfile.expenseCategories;
  }
}
