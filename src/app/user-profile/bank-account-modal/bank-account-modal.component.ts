import {Component, OnInit} from '@angular/core';
import {DataModel} from "../../shared/crud/data.model";
import {Observable, Subject} from "rxjs";
import {ColumnModel} from "../../shared/crud/column.model";
import {ShowModalService} from "../../shared/show-modal.service";
import {BankAccountService} from "../../shared/user-profile/bank-account.service";
import {NO_BACK_DROP_MODAL} from "../../shared/modal-options";
import {BankAccountFieldsComponent} from "./bank-account-fields/bank-account-fields.component";
import {TwoChoicesModalOptions} from "../../shared/two-options-modal/two-choices-modal.options";
import {BankAccount} from "../../shared/user-profile/bank-account.model";

@Component({
  selector: 'app-bank-account-modal',
  templateUrl: './bank-account-modal.component.html',
  styleUrls: ['./bank-account-modal.component.css']
})
export class BankAccountModalComponent implements OnInit {
  private dataModelSubject: Subject<DataModel> = new Subject<DataModel>();
  dataModel$: Observable<DataModel> = this.dataModelSubject.asObservable();
  dataModel: DataModel;
  title: string = 'Bank Accounts';
  emptyMessage: string = 'No bank accounts found';

  constructor(private showModalService: ShowModalService, private bankAccountService: BankAccountService) { }

  ngOnInit(): void {
    this.initDataModel();
    this.getAllBankAccounts();
  }

  private initDataModel() {
    this.dataModel = <DataModel>{
      columns: this.getColumns(),
    }
  }

  private getAllBankAccounts(): void {
    this.bankAccountService.getBankAccounts()
      .subscribe({
        next: bankAccounts => {
          this.dataModel.data = bankAccounts;
          this.dataModelSubject.next(this.dataModel);
        }
      });
  }

  private getColumns(): ColumnModel[] {
    return [
      {
        displayName: 'IBAN',
        fieldName: 'iban'
      },
    ];
  }

  showAddBankAccountModal(): void {
    this.showModalService.showTwoOptionsModal(NO_BACK_DROP_MODAL, this.getAddBankAccountModalOptions(), BankAccountFieldsComponent);
  }

  private getAddBankAccountModalOptions(): TwoChoicesModalOptions {
    return <TwoChoicesModalOptions>{
      title: 'Add Bank Account',
      confirmText: 'Add',
      cancelText: 'Cancel',
      confirmCallback: (iban: string) => this.addBankAccount(iban)
    };
  }

  private addBankAccount(iban: string): void {
    this.bankAccountService.addBankAccount(iban)
      .subscribe({
        next: (bankAccount: BankAccount) => {
          this.dataModel.data.push(bankAccount);
          this.dataModelSubject.next(this.dataModel);
        }
      });
  }

  deleteBankAccount(bankAccount: BankAccount) {
    this.bankAccountService.deleteBankAccount(bankAccount)
      .subscribe({
        next: () => {
          this.dataModel.data = this.dataModel.data.filter(ba => ba.uuid !== bankAccount.uuid);
          this.dataModelSubject.next(this.dataModel);
        }
      });
  }
}
