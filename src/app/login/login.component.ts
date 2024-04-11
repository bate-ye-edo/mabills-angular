import { Component } from '@angular/core';
import {AuthService} from "@core/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private auth: AuthService) { }

  login(): void {

    this.auth.login(this.username, this.password);
  }

}
