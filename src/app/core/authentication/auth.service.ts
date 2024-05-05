import { Injectable } from '@angular/core';
import {HttpService} from "@core/http.service";
import {ENVIRONMENT} from "../../../environment/environment";
import {TokenDto} from "@core/authentication/token.dto";
import {Observable, Subject} from "rxjs";
import {LoginDto} from "./login.dto";
import {Router} from "@angular/router";
import {User} from "@core/authentication/user.model";
import {JwtDecoderService} from "@core/authentication/jwt-decoder.service";
import {ShowModalService} from "../../shared/show-modal.service";
import {TwoChoicesModalOptionsModel} from "../../shared/two-options-modal/two-choices-modal-options.model";
import {NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {NO_BACK_DROP_MODAL} from "../../shared/modal-options";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly LOGIN_END_POINT = ENVIRONMENT.SERVICE+'/users/login';
  static readonly LOGOUT_END_POINT = ENVIRONMENT.SERVICE+'/users/logout';
  static readonly REGISTER_END_POINT = ENVIRONMENT.SERVICE+'/users/register';
  static readonly REFRESH_TOKEN_END_POINT = ENVIRONMENT.SERVICE+'/users/refresh-token';

  private tokenDto: TokenDto;
  private refreshTokenTimer: number = undefined;
  private authenticatedSubject: Subject<boolean> = new Subject<boolean>();
  authenticatedObservable: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(private http: HttpService, private router: Router, private jwtDecoder: JwtDecoderService,
              private showModalService: ShowModalService) {
  }

  login(username: string, password: string): void {
    this.http
      .post(AuthService.LOGIN_END_POINT, <LoginDto>{username, password})
      .subscribe({
        next: (token: TokenDto) => this.processSuccess(token),
      });
  }

  private processSuccess(token: TokenDto): void {
    this.setTokenAndTimer(token);
    this.authenticatedSubject.next(true);
    this.router.navigate(['/bills']);
  }

  getToken(): string {
    if(this.tokenDto){
      return this.tokenDto
        .token;
    }
    return undefined;
  }

  isAuthenticated(): boolean {
    return !!this.tokenDto;
  }

  logout(): void {
    this.http
      .post(AuthService.LOGOUT_END_POINT)
      .subscribe({
        next: () => this.processSuccessLogout()
      });
  }

  private processSuccessLogout(): void {
    this.tokenDto = undefined;
    this.authenticatedSubject.next(false);
    if(this.refreshTokenTimer){
      clearTimeout(this.refreshTokenTimer);
    }
    this.router.navigate(['/login']);
  }

  register(registerDto: User): void {
    this.http
      .post(AuthService.REGISTER_END_POINT, registerDto)
      .subscribe({
        next: (token:TokenDto) => this.processSuccess(token)
      });
  }

  private getNotBackdropModal(): NgbModalOptions{
    return {...NO_BACK_DROP_MODAL, windowClass: 'loading-modal'};
  }

  private getTwoChoicesModalOptionsModel(): TwoChoicesModalOptionsModel{
    return <TwoChoicesModalOptionsModel>{
      title: 'Refresh Token',
      message: 'Your token is about to expire. Do you want to refresh it?',
      confirmText: 'Yes',
      cancelText: 'No',
      confirmCallback: () => this.refreshToken(),
      cancelCallback: () => this.logout(),
      autoCloseOptions: {
        secondsToClose: ENVIRONMENT.SECONDS_FOR_REFRESH_TOKEN,
        closeAction: () => this.processSuccessLogout()
      }
    };
  }

  private refreshToken(): void {
    this.http
      .post(AuthService.REFRESH_TOKEN_END_POINT)
      .subscribe({
        next: (token: TokenDto) => this.setTokenAndTimer(token)
      });
  }

  private setTokenAndTimer(token: TokenDto): void {
    this.tokenDto = token;
    this.setRefreshTokenTimer();
  }

  private setRefreshTokenTimer(): void {
    this.refreshTokenTimer =
      setTimeout(() => {
        this.showModalRefreshToken();
      }, this.getRefreshTokenSeconds());
  }

  private getRefreshTokenSeconds(): number {
    return this.jwtDecoder.getExpirationDateTimestamp(this.tokenDto.token) -
      (Date.now() + ENVIRONMENT.MILLISECONDS_FOR_REFRESH_TOKEN);
  }

  private showModalRefreshToken(): void {
    this.showModalService.showTwoOptionsModal(this.getNotBackdropModal(), this.getTwoChoicesModalOptionsModel());
  }
}
