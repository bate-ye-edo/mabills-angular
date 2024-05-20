import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataModel} from "./data.model";
import {DataFormatterService} from "./data-formatter.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  @Input() title: string;
  @Input() emptyMessage: string;
  @Input() isModal: boolean = false;
  @Input() addAction: boolean = true;
  @Input() updateAction: boolean = true;
  @Input() deleteAction: boolean = true;

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  dataSource: DataModel;
  hasData: boolean = false;
  colSpan: number = 0;

  constructor(private dataFormatter: DataFormatterService, private ngbActiveModal: NgbActiveModal) {
  }

  @Input()
  set data(data: Observable<DataModel>) {
    data.subscribe({
      next: dataValue => {
        this.dataSource = dataValue;
        this.hasData = this.dataSource.data.length > 0;
        this.colSpan = this.dataSource.columns.length + 1;
      }
    });
  }

  add(): void {
    this.create.emit()
  }

  edit(item: any): void {
    this.update.emit(item)
  }

  remove(item: any): void {
    this.delete.emit(item)
  }

  getDataFormatted(itemElement: any): string {
    return this.dataFormatter.formatData(itemElement);
  }

  closeModal() {
    this.ngbActiveModal.close();
  }

  hasActions(): boolean {
    return this.updateAction || this.deleteAction;
  }

  getColSpanNumber(): number {
    return this.hasActions() ? this.colSpan + 1 : this.colSpan;
  }

  getNestedItemValue(item: any, fieldName: string): any {
    const fieldNames: string[] = fieldName.split('.');
    if(fieldNames.length === 1) {
      return item[fieldName];
    }
    let value: any = item;
    for(let i: number = 0; i < fieldNames.length; i++) {
      if(value === null || value === undefined) {
        return '';
      }
      value = value[fieldNames[i]];
    }
    return value;
  }

}
