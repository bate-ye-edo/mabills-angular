import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./auth.guard";
import {ExpensesComponent} from "./expenses/expenses.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
  {path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] },
  {path: '**', redirectTo:'expenses'},
  {path: '', pathMatch: 'full', redirectTo: 'expenses'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
