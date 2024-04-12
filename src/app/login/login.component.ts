import { Component } from '@angular/core';
import {AuthService} from "@core/authentication/auth.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameFormControl: FormControl = new FormControl('', [Validators.required]);
  passwordFormControl: FormControl = new FormControl('', [Validators.required]);

  constructor(private auth: AuthService) { }

  login(): void {
    this.auth.login(this.usernameFormControl.value, this.passwordFormControl.value);
  }

  inputsHaveErrors(): boolean {
    return this.usernameFormControl.status === 'INVALID' || this.passwordFormControl.status === 'INVALID';
  }
}
