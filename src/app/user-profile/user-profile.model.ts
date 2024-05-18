import {BankAccount} from "./bank-account.model";

export interface UserProfile {
  username: string;
  mobile: string;
  email: string;
  password: string;
  bankAccounts: BankAccount[];
}
