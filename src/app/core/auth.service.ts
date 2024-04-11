import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../environment/environment";
import {TokenModel} from "@core/token.model";
import {Observable, Subject} from "rxjs";
import {LoginDto} from "../shared/dtos/login.dto";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static LOGIN_END_POINT = ENVIRONMENT.SERVICE+'/users/login';
  private tokenModel: TokenModel;
  private authenticatedSubject: Subject<boolean> = new Subject<boolean>();
  authenticatedObservable: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(private http: HttpService, private router: Router) { }

  login(username: string, password: string): void {
    this.http
      .post(AuthService.LOGIN_END_POINT, <LoginDto>{username, password})
      .subscribe({
        next: (token: TokenModel) => this.processSuccessLogin(token),
      });
  }

  private processSuccessLogin(token: TokenModel): void {
    this.tokenModel = token;
    this.authenticatedSubject.next(true);
    this.router.navigate(['/']);
  }

  getToken(): string {
    if(this.tokenModel){
      return this.tokenModel
        .token;
    }
    return undefined;
  }

  isAuthenticated(): boolean {
    return !!this.tokenModel;
  }
}
