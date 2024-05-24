import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DataFormatterService {
  static readonly DATE_TIME_FORMAT: string = 'DD/MM/yyyy HH:mm';
  constructor() { }

  formatData(data: any): string {
    const dataDateCheck: Date = new Date(data as string);
    switch (typeof data) {
      case 'object':
        return this.formatObjectByType(data);
      case 'number':
        return this.formatNumber(data);
      default:
        if(dataDateCheck.toString() !== 'Invalid Date') {
          return this.formatDate(data);
        }
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
    return moment(data as Date).format(DataFormatterService.DATE_TIME_FORMAT);
  }

  private formatNumber(data: any): string {
    const numberData = Number(data as number);
    return numberData.toFixed(3);
  }
}
