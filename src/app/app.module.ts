import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TokenInterceptor} from "@core/authentication/token.interceptor";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {CoreModule} from "@core/core.module";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TwoChoicesModalComponent } from './shared/two-options-modal/two-choices-modal.component';
import { ExpenseCategoriesComponent } from './expenses-categories/expense-categories.component';
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import { ExpenseCategoryModifyFieldComponent } from './expenses-categories/expense-category-modify-field/expense-category-modify-field.component';
import { CrudComponent } from './shared/crud/crud.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TwoChoicesModalComponent,
    ExpenseCategoriesComponent,
    ExpenseCategoryModifyFieldComponent,
    CrudComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    CoreModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatTableModule,
    MatListModule,
    NgbModalModule
  ],
  providers: [TokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
