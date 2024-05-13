import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./auth.guard";
import {BillsComponent} from "./bills/bills.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'bills', component: BillsComponent, canActivate: [authGuard] },
  {path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] },
  {path: '**', redirectTo:'bills'},
  {path: '', pathMatch: 'full', redirectTo: 'bills'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
