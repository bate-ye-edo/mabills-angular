import { Injectable } from '@angular/core';
import {ENVIRONMENT} from "../../../environment/environment";
import {HttpService} from "@core/http.service";
import {CreditCard} from "./credit-card.model";
import {finalize, Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  static readonly END_POINT: string = ENVIRONMENT.SERVICE + '/credit-cards';
  private creditCards: CreditCard[] = [];
  private creditCardsSubject: Subject<CreditCard[]> = new Subject<CreditCard[]>();
  creditCards$: Observable<CreditCard[]> = this.creditCardsSubject.asObservable();

  constructor(private httpService: HttpService) { }

  getCreditCards(): Observable<CreditCard[]> {
    return this.httpService.get(CreditCardService.END_POINT)
      .pipe(
        tap((creditCards: CreditCard[]) => {
          this.creditCards = creditCards;
          this.creditCardsSubject.next(creditCards);
        })
      );
  }

  addCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.httpService.post(CreditCardService.END_POINT, creditCard);
  }

  deleteCreditCard(creditCard: CreditCard): Observable<any> {
    return this.httpService.delete(CreditCardService.END_POINT + '/' + creditCard.uuid)
      .pipe(
        finalize( () => {
          this.creditCards = this.creditCards.filter(cc => cc.uuid !== creditCard.uuid);
          this.creditCardsSubject.next(this.creditCards)
        })
      );
  }
}
