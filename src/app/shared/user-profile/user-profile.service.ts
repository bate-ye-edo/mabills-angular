import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../../environment/environment";
import {Observable, Subject, tap} from "rxjs";
import {UserProfile} from "./user-profile.model";
import {BankAccount} from "./bank-account.model";
import {BankAccountService} from "./bank-account.service";
import {CreditCardService} from "./credit-card.service";
import {ExpenseCategoriesService} from "./expense-categories.service";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private static readonly SUCCESSFUL_UPDATE_MESSAGE: string = 'User profile updated';
  private static readonly USERS_END_POINT: string = ENVIRONMENT.SERVICE + '/users';
  userProfile: UserProfile;
  private userProfileSubject: Subject<UserProfile> = new Subject<UserProfile>();
  userProfile$: Observable<UserProfile> = this.userProfileSubject.asObservable();

  constructor(private httpService: HttpService, private bankAccountService: BankAccountService,
              private creditCardService: CreditCardService, private expenseCategoriesService: ExpenseCategoriesService) {
    this.initializeUserProfile();
    this.subscribeBankAccountsChanges();
    this.subscribeCreditCardsChanges();
    this.subscribeExpenseCategoriesChanges();
  }

  private initializeUserProfile(): void {
    if(!this.userProfile){
      this.getUserProfile().subscribe({
        next: userProfile => {
          this.userProfile = userProfile;
          this.userProfileSubject.next(userProfile);
        }
      });
    } else{
      this.userProfileSubject.next(this.userProfile);
    }
  }

  getUserProfile(): Observable<UserProfile> {
    return this.httpService
      .hideError()
      .get(UserProfileService.USERS_END_POINT)
      .pipe(
        tap((userProfile: UserProfile) => {
          this.userProfile = userProfile;
          this.userProfileSubject.next(userProfile);
        })
      );
  }

  updateUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.httpService
      .successful(UserProfileService.SUCCESSFUL_UPDATE_MESSAGE)
      .put(UserProfileService.USERS_END_POINT, userProfile);
  }

  getUserBankAccounts(): BankAccount[] {
    return this.userProfile.bankAccounts;
  }

  private subscribeBankAccountsChanges(): void {
    this.bankAccountService.bankAccounts$
      .subscribe({
        next: bankAccounts => {
          this.userProfile.bankAccounts = bankAccounts;
          this.userProfileSubject.next(this.userProfile);
        }
      });
  }

  private subscribeCreditCardsChanges(): void {
    this.creditCardService.creditCards$
      .subscribe({
        next: creditCards => {
          this.userProfile.creditCards = creditCards;
          this.userProfileSubject.next(this.userProfile);
        }
      });
  }

  private subscribeExpenseCategoriesChanges() {
    this.expenseCategoriesService.expenseCategories$
      .subscribe({
        next: expenseCategories => {
          this.userProfile.expenseCategories = expenseCategories;
          this.userProfileSubject.next(this.userProfile);
        }
      });
  }
}
