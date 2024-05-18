import {BankAccount} from "./bank-account.model";

export interface CreditCard {
  creditCardNumber: string;
  uuid: string;
  bankAccount?: BankAccount;
}
