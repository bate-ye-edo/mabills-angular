import {UserProfile} from "./user-profile/user-profile.model";
import {CreditCard} from "./user-profile/credit-card.model";
import {BankAccount} from "./user-profile/bank-account.model";
import {ExpenseCategory} from "./user-profile/expense-category.model";
import {Component, OnInit} from "@angular/core";
import {TwoChoicesModalComponent} from "./two-options-modal/two-choices-modal.component";
import {FormControl} from "@angular/forms";

@Component({
  template: ''
})
export abstract class AbstractIncomeExpenseFieldsComponent extends TwoChoicesModalComponent implements OnInit {
  private oldUserProfile: UserProfile = <UserProfile>{creditCards: [], bankAccounts: [], expenseCategories: []};
  protected allCreditCards: CreditCard[] = [];
  creditCards: CreditCard[] = [];
  bankAccounts: BankAccount[] = [];
  expenseCategories: ExpenseCategory[] = [];
  creditCardFormControl: FormControl = new FormControl('');
  bankAccountFormControl: FormControl = new FormControl('');

  protected updateSelects(userProfile: UserProfile): void {
    this.oldUserProfile = userProfile;
    this.allCreditCards = [<CreditCard>{}, ...userProfile.creditCards];
    this.creditCards = [<CreditCard>{}, ...userProfile.creditCards];
    this.bankAccounts = [<BankAccount>{}, ...userProfile.bankAccounts];
    this.expenseCategories = [<ExpenseCategory>{}, ...userProfile.expenseCategories];
    this.updateSelectFormControls();
    this.initializeModel();
  }

  abstract updateSelectFormControls(): void;
  abstract initializeModel(): void;
  abstract canSelectCreditCards(): boolean;
  abstract canSelectBankAccounts(): boolean;

  ngOnInit(): void {
    this.updateSelects(this.oldUserProfile);
  }

  protected filterCreditCardWithBlankOption(creditCard: CreditCard, toCompareCreditCard: CreditCard): boolean {
    return toCompareCreditCard && (creditCard.uuid === toCompareCreditCard.uuid || creditCard.uuid === null);
  }

  protected filterBankAccountWithBlankOption(bankAccount: BankAccount, toCompareBankAccount: BankAccount): boolean {
    return toCompareBankAccount && (bankAccount.uuid === toCompareBankAccount.uuid || bankAccount.uuid === null);
  }

  protected updateCreditCardsOfBankAccountWithBlankOption(toCompareBankAccount: BankAccount): void {
    this.creditCards = this.allCreditCards.filter(cc => cc.uuid === undefined || (cc.bankAccount != null && cc.bankAccount.uuid === toCompareBankAccount.uuid));
  }

  protected bankAccountSelectHasValue(): boolean {
    return this.bankAccountFormControl.value != null && (this.bankAccountFormControl.value as BankAccount).uuid != null;
  }

  protected creditCardSelectHasValue(): boolean {
    return this.creditCardFormControl.value != null && (this.creditCardFormControl.value as CreditCard).uuid != null;
  }

  protected updateCreditCardsOfBankAccount(): void {
    if(this.bankAccountSelectHasValue()) {
      this.updateCreditCardsOfBankAccountWithBlankOption(this.bankAccountFormControl.value as BankAccount);
    }
  }


  protected disableCreditCard(): void {
    this.creditCardFormControl.setValue(null);
    this.creditCardFormControl.disable();
  }

  protected disableBankAccount(): void {
    this.bankAccountFormControl.setValue(null);
    this.bankAccountFormControl.disable();
  }

  protected enableOrDisableCreditCard(): void {
    if(this.canSelectCreditCards()) {
      this.creditCardFormControl.enable();
      if(this.bankAccountSelectHasValue()) {
        this.updateCreditCardsOfBankAccount();
      }
    } else {
      this.disableCreditCard();
    }
  }

  protected enableOrDisableBankAccount(): void {
    if(this.canSelectBankAccounts()) {
      this.bankAccountFormControl.enable();
    } else {
      this.disableBankAccount();
    }
  }

  onCreditCardChanged(): void {
    if(this.creditCardSelectHasValue()) {
      this.disableBankAccount();
      let creditCard: CreditCard = this.creditCardFormControl.value as CreditCard;
      this.bankAccountFormControl.setValue(this.bankAccounts.find(ba => creditCard.bankAccount && ba.uuid === creditCard.bankAccount.uuid));
    } else {
      this.bankAccountFormControl.enable();
    }
  }

  onBankAccountChanged(): void {
    this.creditCardFormControl.setValue(null);
    this.creditCards = this.allCreditCards;
    this.updateCreditCardsOfBankAccount();
    this.enableOrDisableCreditCard();
  }
}
