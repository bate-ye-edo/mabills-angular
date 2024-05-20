import {FormControl, ValidatorFn, Validators} from "@angular/forms";
import {Observable} from "rxjs";

export class UserFormControls {
  private static readonly PASSWORD_PATTERN: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,@!$%*?&])[A-Za-z0-9.,@!$%*?&]{4,}$';
  private static readonly MOBILE_PATTERN: string = '[0-9]+';
  private static readonly USERNAME_PATTERN: string = '^[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+){0,1}$';
  private static readonly PASSWORD_MIN_LENGTH: number = 6;
  private static readonly PASSWORD_MAX_LENGTH: number = 16;
  private static readonly USERNAME_MIN_LENGTH: number = 4;

  private isPasswordRequired: boolean = true;
  private isUsernameRequired: boolean = true;

  usernameFormControl: FormControl;
  passwordFormControl: FormControl;
  emailFormControl: FormControl;
  mobileFormControl: FormControl;

  constructor() { }

  initFormControls(): void {
    this.initUsernameFormControl();
    this.initPasswordFormControl();
    this.initEmailFormControl();
    this.initMobileFormControl();
  }

  private initUsernameFormControl(): void {
    let usernameValidators: ValidatorFn[] = [Validators.minLength(UserFormControls.USERNAME_MIN_LENGTH),
      Validators.pattern(UserFormControls.USERNAME_PATTERN)];
    if (this.isUsernameRequired) {
      usernameValidators.push(Validators.required);
    }
    this.usernameFormControl = new FormControl('', usernameValidators);
  }

  private initPasswordFormControl(): void {
    let passwordValidators: ValidatorFn[] = [Validators.minLength(UserFormControls.PASSWORD_MIN_LENGTH),
      Validators.maxLength(UserFormControls.PASSWORD_MAX_LENGTH),
      Validators.pattern(UserFormControls.PASSWORD_PATTERN)];
    if (this.isPasswordRequired) {
      passwordValidators.push(Validators.required);
    }
    this.passwordFormControl = new FormControl('', passwordValidators);
  }

  private initEmailFormControl(): void{
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email]);
  }

  private initMobileFormControl(): void {
    this.mobileFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(UserFormControls.MOBILE_PATTERN)]);
  }

  inputsHaveErrors(): boolean {
    return this.usernameFormControl.status === 'INVALID' || this.passwordFormControl.status === 'INVALID'
      || this.emailFormControl.status === 'INVALID' || this.mobileFormControl.status === 'INVALID';
  }

  getUsernameFormControlValue(): string {
    return this.usernameFormControl.value as string;
  }

  getPasswordFormControlValue(): string {
    return this.passwordFormControl.value as string;
  }

  getEmailFormControlValue(): string {
    return this.emailFormControl.value as string;
  }

  getMobileFormControlValue(): string {
    return this.mobileFormControl.value as string;
  }

  getUsernameFormControlValueObservable(): Observable<any>{
    return this.usernameFormControl.valueChanges;
  }

  getPasswordFormControlValueObservable(): Observable<any>{
    return this.passwordFormControl.valueChanges;
  }

  getEmailFormControlValueObservable(): Observable<any>{
    return this.emailFormControl.valueChanges;
  }

  getMobileFormControlValueObservable(): Observable<any>{
    return this.mobileFormControl.valueChanges;
  }

  setUsernameFormControlValue(value: string): UserFormControls {
    this.usernameFormControl.setValue(value);
    return this;
  }

  setPasswordFormControlValue(value: string): UserFormControls {
    this.passwordFormControl.setValue(value);
    return this;
  }

  setEmailFormControlValue(value: string): UserFormControls {
    this.emailFormControl.setValue(value);
    return this;
  }

  setMobileFormControlValue(value: string): UserFormControls {
    this.mobileFormControl.setValue(value);
    return this;
  }

  passwordNotRequired(): UserFormControls {
    this.isPasswordRequired = false;
    return this;
  }

  usernameNotRequired(): UserFormControls {
    this.isUsernameRequired = false;
    return this;
  }

  build(): UserFormControls {
    this.initFormControls();
    return this;
  }
}

