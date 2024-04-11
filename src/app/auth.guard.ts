import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "@core/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  if(inject(AuthService).isAuthenticated()) {
    return true;
  }
  inject(Router).navigate(['/login']);
  return false;
}
