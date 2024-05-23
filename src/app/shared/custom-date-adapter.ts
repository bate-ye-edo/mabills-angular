import {NativeDateAdapter} from "@angular/material/core";
import * as moment from 'moment';
import {Injectable} from "@angular/core";

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            return moment(date).format('DD/MM/yyyy');
        }
        return date.toDateString();
    }
}
