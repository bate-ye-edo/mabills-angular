import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../environment/environment";
import {Observable} from "rxjs";
import {User} from "@core/authentication/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private static readonly SUCCESSFUL_UPDATE_MESSAGE: string = 'User profile updated';
  private static readonly USERS_END_POINT: string = ENVIRONMENT.SERVICE + '/users';
  constructor(private httpService: HttpService) { }

  getUserProfile(): Observable<User> {
    return this.httpService
      .hideError()
      .get(UserProfileService.USERS_END_POINT);
  }

  updateUserProfile(userProfile: User): Observable<User> {
    return this.httpService
      .successful(UserProfileService.SUCCESSFUL_UPDATE_MESSAGE)
      .put(UserProfileService.USERS_END_POINT, userProfile);
  }
}
