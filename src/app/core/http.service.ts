import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from "@core/error.model";
import {ShowLoadingService} from "@core/show-loading.service";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  static CONNECTION_REFUSE = 0;
  static UNAUTHORIZED = 401;

  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;
  private successfulNotification: string = undefined;
  private errorNotification: string = undefined;
  private showErrors: boolean = true;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router,
              private showLoadingService: ShowLoadingService) {
    this.resetOptions();
  }

  param(key: string, value: string): HttpService {
    if (value != null) {
      this.params = this.params.append(key, value);
    }
    return this;
  }

  paramsFrom(dto: any): HttpService {
    Object.getOwnPropertyNames(dto)
      .forEach(item => this.param(item, dto[item]));
    return this;
  }

  successful(notification: string = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  error(notification: string): HttpService {
    this.errorNotification = notification;
    return this;
  }

  hideError(): HttpService {
    this.showErrors = false;
    return this;
  }

  post(endpoint: string, body?: object): Observable<any> {
    this.showLoadingService.showLoadingPage();
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  get(endpoint: string): Observable<any> {
    this.showLoadingService.showLoadingPage();
    return this.http
      .get(endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  put(endpoint: string, body?: object): Observable<any> {
    this.showLoadingService.showLoadingPage();
    return this.http
      .put(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  patch(endpoint: string, body?: object): Observable<any> {
    this.showLoadingService.showLoadingPage();
    return this.http
      .patch(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error))
      );
  }

  delete(endpoint: string): Observable<any> {
    this.showLoadingService.showLoadingPage();
    return this.http
      .delete(endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error)));
  }

  header(key: string, value: string): HttpService {
    if (value != null) {
      this.headers = this.headers.append(key, value);
    }
    return this;
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private extractData(response: any): any {
    this.showLoadingService.hideLoadingPage();
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      return response.body;
    }
    return response;
  }

  private showError(notification: string): void {
    if(this.showErrors) {
      if (this.errorNotification) {
        this.snackBar.open(this.errorNotification, 'Error', {duration: 5000});
        this.errorNotification = undefined;
      } else {
        this.snackBar.open(notification, 'Error', {duration: 5000});
      }
    }
    this.showErrors = true;
  }

  private handleError(response: any): any {
    this.showLoadingService.hideLoadingPage();
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.showError('Unauthorized');
      this.router.navigate(['']).then();
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      this.showError('Connection Refuse');
      return EMPTY;
    } else {
      try {
        error = response.error;
        this.showError(error.error + ' (' + response.status + '): ' + error.message);
        return throwError(() => error);
      } catch (e) {
        this.showError('Not response');
        return throwError(() => response.error);
      }
    }
  }

}
