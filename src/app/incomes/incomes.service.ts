import {Injectable} from '@angular/core';
import {ENVIRONMENT} from "../../environment/environment";
import {HttpService} from "@core/http.service";
import {Observable} from "rxjs";
import {Income} from "./income.model";
import {FilterService} from "../shared/filters/filter.service";
import {FilterDto} from "../shared/filters/filter.dto";

@Injectable({
  providedIn: 'root'
})
export class IncomesService extends FilterService<Income[]>{
  static readonly END_POINT = ENVIRONMENT.SERVICE+'/incomes';
  static readonly SEARCH_END_POINT = ENVIRONMENT.SERVICE+'/incomes/search';
  constructor(private httpService: HttpService) {
    super();
  }

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

  applyIncomeFilters(filters: FilterDto[]): Observable<Income[]> {
    return this.applyFiltersWithDateAsString(filters);
  }

  protected override applyFilters(filters: FilterDto[]): Observable<Income[]> {
    if(filters.length === 0){
      return this.getIncomes();
    }
    return this.httpService.post(IncomesService.SEARCH_END_POINT, filters);
  }
}
