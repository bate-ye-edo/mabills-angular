import { Injectable } from '@angular/core';
import {ENVIRONMENT} from "../../../environment/environment";
import {HttpService} from "@core/http.service";
import {CreditCard} from "../credit-card.model";
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

  addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.httpService.post(CreditCardService.END_POINT, creditCard);
  }

  deleteCreditCard(creditCard: CreditCard): Observable<any> {
    return this.httpService.delete(CreditCardService.END_POINT + '/' + creditCard.uuid);
  }
}
