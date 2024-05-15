import { Injectable } from '@angular/core';
import {ENVIRONMENT} from "../../../environment/environment";
import {HttpService} from "@core/http.service";
import {CreditCard} from "./credit-card.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/credit-cards';
  constructor(private httpService: HttpService) { }

  getCreditCards(): Observable<CreditCard[]> {
    return this.httpService.get(CreditCardService.END_POINT);
  }

  addCreditCard(creditCardNumber: string): Observable<CreditCard> {
    return of({creditCardNumber: creditCardNumber, uuid: '1234'});
  }
}
