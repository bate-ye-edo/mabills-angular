import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import { DataModel } from "../../shared/crud/data.model";
import {CreditCardService} from "./credit-card.service";
import {ColumnModel} from "../../shared/crud/column.model";
import {ShowModalService} from "../../shared/show-modal.service";
import {CreditCardFieldsComponent} from "./credit-card-fields/credit-card-fields.component";
import {NO_BACK_DROP_MODAL} from "../../shared/modal-options";
import {TwoChoicesModalOptions} from "../../shared/two-options-modal/two-choices-modal.options";

@Component({
  selector: 'app-credit-card-modal',
  templateUrl: './credit-card-modal.component.html',
  styleUrls: ['./credit-card-modal.component.css']
})
export class CreditCardModalComponent implements OnInit{
  title: string = 'Credit Cards';
  emptyMessage: string = 'No credit cards found';
  private dataModelSubject: Subject<DataModel> = new Subject<DataModel>();
  dataModel$: Observable<DataModel> = this.dataModelSubject.asObservable();
  dataModel: DataModel;
  constructor(private creditCardService: CreditCardService, private showModalService: ShowModalService) { }

  ngOnInit() {
    this.initDataModel();
    this.getAllCreditCards();
  }

  private getAllCreditCards(): void {
    this.creditCardService.getCreditCards()
      .subscribe({
        next: creditCards => {
          this.dataModel.data = creditCards;
          this.dataModelSubject.next(this.dataModel);
        }
      });
  }

  private initDataModel(): void {
    this.dataModel = <DataModel>{
      columns: this.getColumns(),
    }
  }

  private getColumns(): ColumnModel[] {
    return [
      {
        displayName: 'Card Number',
        fieldName: 'creditCardNumber'
      }
    ]
  }

  showAddCreditCard(): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getAddCreditCardModalOptions(), CreditCardFieldsComponent);
  }

  private getAddCreditCardModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions> {
      title: 'Add Credit Card',
      confirmText: 'Add',
      cancelText: 'Cancel',
      confirmCallback: (creditCardNumber: string) => this.addCreditCard(creditCardNumber),
    };
  }

  private addCreditCard(creditCardNumber: string) {
    this.creditCardService.addCreditCard(creditCardNumber)
      .subscribe({
        next: creditCard => {
          this.dataModel.data.push(creditCard);
          this.dataModelSubject.next(this.dataModel);
        }
      });
  }
}
