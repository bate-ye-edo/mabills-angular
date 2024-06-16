import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractFilterComponent} from "../AbstractFilterComponent";
import {NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {FilterComparisons} from "../../shared/filters/filter-comparisons";

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFilterComponent),
      multi: true
    }
  ]
})
export class TextFilterComponent extends AbstractFilterComponent implements OnInit {
  @Input() pattern: string;
  @Input() errorMessage: string;
  @Input() containsSearchPattern: string;
  constructor() {
    super();
  }

  ngOnInit(): void {
    if(this.pattern) {
      this.filterValueFormControl.setValidators(Validators.pattern(this.pattern));
    }
  }

  hasErrorMessage(): boolean {
    return !!this.pattern && !!this.errorMessage;
  }

  override onFilterChanged(): void {
    if (this.filterTypeFormControl.value === FilterComparisons.CONTAINS) {
      this.filterValueFormControl.clearValidators();
      this.filterValueFormControl.setValidators(Validators.pattern(this.containsSearchPattern));
    } else {
      this.ngOnInit();
    }
    this.filterValueFormControl.updateValueAndValidity();
    super.onFilterChanged();
  }
}
