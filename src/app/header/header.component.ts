import { Component } from '@angular/core';
import {AuthService} from "@core/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userAuthenticated: boolean;
  constructor(private auth: AuthService) {
    this.subscribeAuthenticated();
  }

  subscribeAuthenticated(): void{
    this.auth.authenticatedObservable.subscribe({
        next: authenticated => this.userAuthenticated = authenticated
    });
  }
}
