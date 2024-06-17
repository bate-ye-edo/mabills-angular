import {Component, OnInit} from '@angular/core';
import {DataModel} from "../shared/crud/data.model";
import {Observable, Subject} from "rxjs";
import {ColumnModel} from "../shared/crud/column.model";
import {IncomesService} from "./incomes.service";
import {Income} from "./income.model";
import {ShowModalService} from "../shared/show-modal.service";
import {NO_BACK_DROP_MODAL} from "../shared/modal-options";
import {IncomeFieldsComponent} from "./income-fields/income-fields.component";
import {TwoChoicesModalOptions} from "../shared/two-options-modal/two-choices-modal.options";
import {DateFormat} from "../shared/utils/date-format";
import {ModalProviderModel} from "../shared/modal-provider.model";
import {FilterOptions} from "../filters/filter-options";
import {FilterDto} from "../shared/filters/filter.dto";
import {DEFAULT_FILTERS} from "../shared/filters/default-filters";

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  static readonly INCOME_INJECTION_NAME: string = 'income';
  readonly title: string = 'Incomes';
  readonly emptyMessage: string = 'No incomes found';

  private dataModelSubject: Subject<DataModel> = new Subject<DataModel>();
  private readonly incomes: DataModel;
  incomes$: Observable<DataModel> = this.dataModelSubject.asObservable();
  dateFormat: string = DateFormat.WITHOUT_TIME;

  filters: FilterOptions[];

  constructor(private incomesService: IncomesService, private showModalService: ShowModalService) {
    this.incomes = this.initializeIncomes();
    this.dataModelSubject.next(this.incomes);
    this.buildFiltersOptions();
  }

  ngOnInit(): void {
    this.incomesService.getIncomes()
      .subscribe({
        next: (incomes: Income[]) => {
          this.incomes.data = incomes;
          this.dataModelSubject.next(this.incomes);
        }
      })
  }

  private initializeIncomes(): DataModel {
    return <DataModel> {
      columns: this.getColumns(),
    };
  }

  private getColumns(): ColumnModel[] {
    return [
      {
        displayName: 'Income date',
        fieldName: 'incomeDate'
      },
      {
        displayName: 'Amount',
        fieldName: 'amount'
      },
      {
        displayName: 'Description',
        fieldName: 'description'
      },
      {
        displayName: 'Credit card',
        fieldName: 'creditCard.creditCardNumber'
      },
      {
        displayName: 'Bank account',
        fieldName: 'bankAccount.iban'
      }
    ];
  }

  showAddIncomeModal(): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getAddModalOptions(), IncomeFieldsComponent);
  }

  private getAddModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions> {
      title: 'Add income',
      confirmText: 'Add',
      cancelText: 'Cancel',
      confirmCallback: (income: Income) => this.createIncome(income)
    };
  }

  private createIncome(income: Income): void {
    this.incomesService.createIncome(income)
      .subscribe({
        next: (income: Income) => {
          this.incomes.data.push(income);
          this.dataModelSubject.next(this.incomes);
        }
      })
  }

  deleteIncome(income: Income): void {
    this.incomesService.deleteIncome(income)
      .subscribe({
        next: () => {
          this.incomes.data = this.incomes.data.filter(i => i.uuid !== income.uuid);
          this.dataModelSubject.next(this.incomes);
        }
      });
  }

  showUpdateIncomeModal(income: Income): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getUpdateIncomeModalOptions(), IncomeFieldsComponent,
      this.getUpdateIncomeModalProviders(income)
      )
  }

  private getUpdateIncomeModalProviders(income: Income): ModalProviderModel[] {
    return [<ModalProviderModel>{
      provide: IncomesComponent.INCOME_INJECTION_NAME,
      useValue: income
    }];
  }

  private getUpdateIncomeModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions> {
      title: 'Update income',
      confirmText: 'Update',
      cancelText: 'Cancel',
      confirmCallback: (income: Income) => this.updateIncome(income)
    };
  }

  private updateIncome(income: Income): void {
    this.incomesService.updateIncome(income)
      .subscribe({
        next: (income: Income) => {
          let indexToUpdate: number = this.incomes.data.map(e => e.uuid).indexOf(income.uuid);
          this.incomes.data[indexToUpdate] = income;
          this.dataModelSubject.next(this.incomes);
        }
      })
  }

  private buildFiltersOptions(): void {
    this.filters = [ DEFAULT_FILTERS.Amount, DEFAULT_FILTERS.IncomeDate, DEFAULT_FILTERS.Description, DEFAULT_FILTERS.CreditCard, DEFAULT_FILTERS.IBAN ];
  }

  applyFilters(filters: FilterDto[]): void {
    this.incomesService.applyIncomeFilters(filters)
      .subscribe({
        next: (incomes: Income[]) => {
          this.incomes.data = incomes;
          this.dataModelSubject.next(this.incomes);
        }
      });
  }
}
