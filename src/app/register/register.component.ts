import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "@core/authentication/auth.service";
import {User} from "@core/authentication/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  static PASSWORD_PATTERN: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,@!$%*?&])[A-Za-z0-9.,@!$%*?&]{6,}$';
  static MOBILE_PATTERN: string = '[0-9]+';
  static USERNAME_PATTERN: string = '^[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+){0,1}$';
  usernameFormControl: FormControl;
  passwordFormControl: FormControl;
  emailFormControl: FormControl;
  mobileFormControl: FormControl;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.initFormControls();
  }


  inputsHaveErrors(): boolean {
    return this.usernameFormControl.status === 'INVALID' || this.passwordFormControl.status === 'INVALID'
          || this.emailFormControl.status === 'INVALID' || this.mobileFormControl.status === 'INVALID';
  }

  register(): void {
    this.auth.register(<User>{
      username: this.usernameFormControl.value as string,
      password: this.passwordFormControl.value as string,
      email: this.emailFormControl.value as string,
      mobile: this.mobileFormControl.value as string
    });
  }

  private initFormControls(): void {
    this.initUsernameFormControl();
    this.initPasswordFormControl();
    this.initEmailFormControl();
    this.initMobileFormControl();
  }

  private initUsernameFormControl(): void {
    this.usernameFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(RegisterComponent.USERNAME_PATTERN)]);
  }

  private initPasswordFormControl(): void {
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(RegisterComponent.PASSWORD_PATTERN)]
    )
  }

  private initEmailFormControl(): void{
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email]);
  }

  private initMobileFormControl(): void {
    this.mobileFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(RegisterComponent.MOBILE_PATTERN)]);
  }
}
