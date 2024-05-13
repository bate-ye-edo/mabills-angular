import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DataFormatterService {
  static DATE_FORMAT: string = 'DD/MM/yyyy HH:mm';
  constructor() { }

  formatData(data: any): string {
    switch (typeof data) {
      case 'object':
        return this.formatObjectByType(data);
      case 'number':
        return this.formatNumber(data);
      default:
        return data;
    }
  }

  private formatObjectByType(data: any): string {
    if(data instanceof Date) {
      return this.formatDate(data);
    }
    return '';
  }

  private formatDate(data: any): string {
    return moment(data as Date).format(DataFormatterService.DATE_FORMAT);
  }

  private formatNumber(data: any): string {
    const numberData = Number(data as number);
    return numberData.toFixed(3);
  }
}