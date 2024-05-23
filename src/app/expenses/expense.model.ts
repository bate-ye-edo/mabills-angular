import {ExpenseCategory} from "../shared/user-profile/expense-category.model";
import {CreditCard} from "../shared/user-profile/credit-card.model";
import {BankAccount} from "../shared/user-profile/bank-account.model";

export interface Expense {
  amount: number;
  uuid: string;
  expenseDate: Date;
  description?: string;
  expenseCategory?: ExpenseCategory;
  creditCard?: CreditCard;
  bankAccount?: BankAccount;
  formOfPayment?: FormOfPayment;
}

export const enum FormOfPayment {
  CARD = 'CARD',
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK TRANSFER'
}
