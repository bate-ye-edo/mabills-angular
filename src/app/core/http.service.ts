import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, finalize, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Error} from "@core/error.model";
import {ShowLoadingService} from "@core/show-loading.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TOKEN_KEY} from "@core/authentication/token-key";

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  static readonly CONNECTION_REFUSE = 0;
  static readonly UNAUTHORIZED = 401;

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

  successful(notification: string = 'Successful'): this {
    this.successfulNotification = notification;
    return this;
  }

  error(notification: string): this {
    this.errorNotification = notification;
    return this;
  }

  hideError(): this {
    this.showErrors = false;
    return this;
  }

  post(endpoint: string, body?: object): Observable<any> {
    let modalRef: NgbModalRef = this.showLoadingService.showLoadingPage();
    return this.http
      .post(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error)),
        finalize(() => this.showLoadingService.hideLoadingPage(modalRef))
      );
  }

  get(endpoint: string): Observable<any> {
    let modalRef: NgbModalRef = this.showLoadingService.showLoadingPage();
    return this.http
      .get(endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error)),
        finalize(() => this.showLoadingService.hideLoadingPage(modalRef))
      );
  }

  put(endpoint: string, body?: object): Observable<any> {
    let modalRef: NgbModalRef = this.showLoadingService.showLoadingPage();
    return this.http
      .put(endpoint, body, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error)),
        finalize(() => this.showLoadingService.hideLoadingPage(modalRef))
      );
  }

  delete(endpoint: string): Observable<any> {
    let modalRef: NgbModalRef = this.showLoadingService.showLoadingPage();
    return this.http
      .delete(endpoint, this.createOptions())
      .pipe(
        map(response => this.extractData(response)),
        catchError(error => this.handleError(error)),
        finalize(() => this.showLoadingService.hideLoadingPage(modalRef))
      );
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
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    this.showErrors = true;
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
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.showError('Unauthorized');
      localStorage.removeItem(TOKEN_KEY);
      this.router.navigate(['']).then();
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      this.showError('Connection Refuse');
      return EMPTY;
    } else {
      try {
        error = response.error;
        this.showError(error.message);
        return throwError(() => error);
      } catch (e) {
        this.showError('Not response');
        return throwError(() => response.error);
      }
    }
  }

}
