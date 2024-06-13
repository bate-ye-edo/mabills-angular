import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./auth.guard";
import {ExpensesComponent} from "./expenses/expenses.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {IncomesComponent} from "./incomes/incomes.component";
import {ChartsComponent} from "./charts/charts.component";
import {LoginRegisterGuard} from "./login-register.guard";

const routes: Routes = [
  {path: 'charts', component: ChartsComponent, canActivate: [authGuard] },
  {path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard]},
  {path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
  {path: 'incomes', component: IncomesComponent, canActivate: [authGuard] },
  {path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] },
  {path: '**', redirectTo:'expenses'},
  {path: '', pathMatch: 'full', redirectTo: 'expenses'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
