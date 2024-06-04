import {CreditCard} from "../shared/user-profile/credit-card.model";
import {BankAccount} from "../shared/user-profile/bank-account.model";

export interface Income {
  uuid: string;
  incomeDate: Date;
  amount: number;
  description?: string;
  creditCard?: CreditCard;
  bankAccount?: BankAccount;
}
