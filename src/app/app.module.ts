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
import { ExpenseCategoryFieldsComponent } from './expenses-categories/expense-category-fields/expense-category-fields.component';
import { CrudComponent } from './shared/crud/crud.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreditCardModalComponent } from './user-profile/credit-card-modal/credit-card-modal.component';
import { CreditCardFieldsComponent } from './user-profile/credit-card-modal/credit-card-fields/credit-card-fields.component';
import {ExpensesComponent} from "./expenses/expenses.component";
import {MatSelectModule} from "@angular/material/select";
import { BankAccountModalComponent } from './user-profile/bank-account-modal/bank-account-modal.component';
import { BankAccountFieldsComponent } from './user-profile/bank-account-modal/bank-account-fields/bank-account-fields.component';
import { ExpenseFieldsComponent } from './expenses/expense-fields/expense-fields.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule, NativeDateModule} from "@angular/material/core";
import {CustomDateAdapter} from "./shared/custom-date-adapter";
import { IncomesComponent } from './incomes/incomes.component';
import { IncomeFieldsComponent } from './incomes/income-fields/income-fields.component';
import { ChartsComponent } from './charts/charts.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TwoChoicesModalComponent,
    ExpenseCategoriesComponent,
    ExpenseCategoryFieldsComponent,
    CrudComponent,
    UserProfileComponent,
    CreditCardModalComponent,
    CreditCardFieldsComponent,
    ExpensesComponent,
    BankAccountModalComponent,
    BankAccountFieldsComponent,
    ExpenseFieldsComponent,
    IncomesComponent,
    IncomeFieldsComponent,
    ChartsComponent,
    BarChartComponent
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
    NgbModalModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NativeDateModule,
    NgxChartsModule,
  ],
  providers: [TokenInterceptor,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
        },
        display: {
          dateInput: 'input',
          monthYearLabel: {year: 'numeric', month: 'short'},
          dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
          monthYearA11yLabel: {year: 'numeric', month: 'long'},
        }
      }
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
