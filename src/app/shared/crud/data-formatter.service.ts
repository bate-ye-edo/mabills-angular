import { Injectable } from '@angular/core';
import * as moment from "moment";
import {DateFormat} from "../utils/date-format";

@Injectable({
  providedIn: 'root'
})
export class DataFormatterService {
  constructor() { }

  formatData(data: any, dateFormat: string): string {
    const dataDateCheck: Date = new Date(data as string);
    dateFormat = this.checkAndReturnDateFormat(dateFormat);
    switch (typeof data) {
      case 'object':
        return this.formatObjectByType(data, dateFormat);
      case 'number':
        return this.formatNumber(data);
      default:
        if(dataDateCheck.toString() !== 'Invalid Date') {
          return this.formatDate(data, dateFormat);
        }
        return data;
    }
  }

  private formatObjectByType(data: any, dateFormat: string): string {
    if(data instanceof Date) {
      return this.formatDate(data, dateFormat);
    }
    return '';
  }

  private formatDate(data: any, dateFormat: string): string {
    return moment(data as Date).format(dateFormat);
  }

  private formatNumber(data: any): string {
    const numberData = Number(data as number);
    return numberData.toFixed(3);
  }

  private checkAndReturnDateFormat(dateFormat: string): string {
    const testDateString: string = '01-01-2000';
    const testDate: moment.Moment = moment(testDateString, dateFormat, true);
    if(testDate.isValid() && dateFormat.trim() !== '') {
      return dateFormat;
    }
    return DateFormat.WITH_TIME;
  }
}
