import { Injectable } from '@angular/core';
import {ENVIRONMENT} from "../../environment/environment";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Income} from "./income.model";

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  static readonly END_POINT = ENVIRONMENT.SERVICE+'/incomes';
  constructor(private httpService: HttpService) { }

  getIncomes(): Observable<Income[]> {
    return this.httpService.get(IncomesService.END_POINT);
  }

  createIncome(income: Income): Observable<Income> {
    return this.httpService.post(IncomesService.END_POINT, income);
  }

  deleteIncome(income: Income): Observable<Income> {
    return this.httpService.delete(IncomesService.END_POINT+'/'+income.uuid);
  }

  updateIncome(income: Income): Observable<Income> {
    return this.httpService.put(IncomesService.END_POINT, income);
  }
}
