import {Component, forwardRef} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {PATTERNS} from "../../shared/patterns";
import {AbstractFilterComponent} from "../AbstractFilterComponent";

@Component({
  selector: 'app-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['./number-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFilterComponent),
      multi: true
    }
  ]
})
export class NumberFilterComponent extends AbstractFilterComponent {
  constructor() {
    super();
    this.filterValueFormControl = new FormControl('', [Validators.pattern(PATTERNS.NUMBERS_ONLY)]);
  }
}
