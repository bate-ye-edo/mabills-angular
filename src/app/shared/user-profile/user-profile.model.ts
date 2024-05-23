import {BankAccount} from "./bank-account.model";
import {CreditCard} from "./credit-card.model";
import {ExpenseCategory} from "./expense-category.model";

export interface UserProfile {
  username: string;
  mobile: string;
  email: string;
  password: string;
  bankAccounts: BankAccount[];
  creditCards: CreditCard[];
  expenseCategories: ExpenseCategory[];
}
