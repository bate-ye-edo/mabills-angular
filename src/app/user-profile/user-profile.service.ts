import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../environment/environment";
import {Observable, tap} from "rxjs";
import {UserProfile} from "./user-profile.model";
import {BankAccount} from "./bank-account.model";
import {BankAccountService} from "./bank-account-modal/bank-account.service";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private static readonly SUCCESSFUL_UPDATE_MESSAGE: string = 'User profile updated';
  private static readonly USERS_END_POINT: string = ENVIRONMENT.SERVICE + '/users';
  userProfile: UserProfile;
  constructor(private httpService: HttpService, private bankAccountService: BankAccountService) {
    this.bankAccountService.bankAccounts$.subscribe({
      next: bankAccounts => this.userProfile.bankAccounts = bankAccounts
    });
  }

  getUserProfile(): Observable<UserProfile> {
    return this.httpService
      .hideError()
      .get(UserProfileService.USERS_END_POINT)
      .pipe(
        tap((userProfile: UserProfile) => this.userProfile = userProfile)
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


}
