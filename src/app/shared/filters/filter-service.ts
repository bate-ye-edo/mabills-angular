import {Observable} from "rxjs";
import {FilterDto} from "./filter.dto";

export interface FilterService {
  applyFilter(filterDtos: FilterDto[]): Observable<any>;
}
