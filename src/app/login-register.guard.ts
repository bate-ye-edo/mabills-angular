import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@core/authentication/auth.service";

export const LoginRegisterGuard: CanActivateFn = (): boolean => {
  if(inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['/expenses']).then();
    return false;
  }
  return true;
}
