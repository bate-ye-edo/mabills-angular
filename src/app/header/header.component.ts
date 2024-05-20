import { Component } from '@angular/core';
import {AuthService} from "@core/authentication/auth.service";
import {ShowModalService} from "../shared/show-modal.service";
import {
  ExpenseCategoriesComponent
} from "../expenses-categories/expense-categories.component";
import {NO_BACK_DROP_MODAL} from "../shared/modal-options";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userAuthenticated: boolean;
  constructor(private auth: AuthService, private showModalService: ShowModalService) {
    this.subscribeAuthenticated();
  }

  subscribeAuthenticated(): void{
    this.auth.authenticatedObservable.subscribe({
        next: authenticated => this.userAuthenticated = authenticated
    });
  }

  logout(): void {
    this.auth.logout();
  }

  showExpensesCategories() {
    this.showModalService.showModal(ExpenseCategoriesComponent, NO_BACK_DROP_MODAL);
  }
}
