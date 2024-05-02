import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AuthService} from '@core/authentication/auth.service';
import {HttpService} from '@core/http.service';
import {TokenInterceptor} from '@core/authentication/token.interceptor';
import {LoadingComponent} from "@core/loading/loading.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NgbActiveModal
  ],
  declarations: [
    LoadingComponent
  ],
})
export class CoreModule {
}
