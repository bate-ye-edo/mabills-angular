import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {TokenModel} from "@core/authentication/token.model";

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  static readonly SECONDS_TO_MILLISECONDS: number = 1000;
  constructor() { }

  private decodeToken(token: string): TokenModel {
    return jwtDecode(token);
  }

  getExpirationDateTimestamp(token: string): number {
    return this.decodeToken(token).exp*JwtDecoderService.SECONDS_TO_MILLISECONDS;
  }

  isNotExpired(token: string): boolean {
    return this.getExpirationDateTimestamp(token) > Date.now();
  }
}
