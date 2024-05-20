import { Injectable } from '@angular/core';
import {BankAccount} from "../bank-account.model";
import {Observable, Subject, tap} from "rxjs";
import {ENVIRONMENT} from "../../../environment/environment";
import {HttpService} from "@core/http.service";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/bank-accounts';
  private bankAccountSubject: Subject<BankAccount[]> = new Subject <BankAccount[]>();
  bankAccounts$: Observable<BankAccount[]> = this.bankAccountSubject.asObservable();
  private bankAccounts: BankAccount[];
  constructor(private httpService: HttpService) { }

  getBankAccounts(): Observable<BankAccount[]> {
    return this.httpService.get(BankAccountService.END_POINT)
      .pipe(
        tap((bankAccounts: BankAccount[]) => {
          this.bankAccounts = bankAccounts;
          this.bankAccountSubject.next(bankAccounts);
        })
      );
  }

  addBankAccount(iban: string): Observable<BankAccount> {
    return this.httpService.post(BankAccountService.END_POINT, <BankAccount>{iban});
  }

  deleteBankAccount(bankAccount: BankAccount): Observable<any> {
    return this.httpService.delete(BankAccountService.END_POINT + '/' + bankAccount.uuid)
      .pipe(
        tap( _ => this.bankAccountSubject.next(this.bankAccounts.filter(ba => ba.uuid !== bankAccount.uuid)))
      );
  }
}
