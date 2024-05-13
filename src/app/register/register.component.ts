import {Component, OnInit} from '@angular/core';
import {AuthService} from "@core/authentication/auth.service";
import {User} from "@core/authentication/user.model";
import {UserFormControls} from "../shared/user-form.controls";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userFormControls: UserFormControls;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.userFormControls = new UserFormControls().build();
  }

  inputsHaveErrors(): boolean {
    return this.userFormControls.inputsHaveErrors();
  }

  register(): void {
    this.auth.register(<User>{
      username: this.userFormControls.getUsernameFormControlValue(),
      password: this.userFormControls.getPasswordFormControlValue(),
      email: this.userFormControls.getEmailFormControlValue(),
      mobile: this.userFormControls.getMobileFormControlValue()
    });
  }
}
