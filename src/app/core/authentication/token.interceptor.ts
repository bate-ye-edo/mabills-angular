import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "@core/authentication/auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.auth.getToken();
    if (token) {
      return next.handle(req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      }));
    }
    return next.handle(req);
  }

}
