import {Component, ElementRef, forwardRef, ViewChild} from '@angular/core';
import {AbstractFilterComponent} from "../AbstractFilterComponent";
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {FilterComparisons} from "../../shared/filters/filter-comparisons";
import {PATTERNS} from "../../shared/patterns";

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFilterComponent),
      multi: true
    }
  ]
})
export class DateFilterComponent extends AbstractFilterComponent {
  hasBetween: boolean = false;
  oneDatePickerClass: string = 'col-lg-3 col-sm-4 col-md-4';
  twoDatePickerClass: string = 'col-lg-3 col-sm-5 col-md-5';
  twoDatePickerClassWithOffset: string = 'col-lg-3 col-sm-5 col-md-5  offset-md-5 offset-sm-5 offset-lg-0';
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  @ViewChild('dpFromDate') dpFromDate: ElementRef;
  @ViewChild('dpToDate') dpToDate: ElementRef;

  private readonly dateRegExp: RegExp = new RegExp(PATTERNS.DATE);

  constructor(protected formatter: NgbDateParserFormatter, protected calendar: NgbCalendar) {
    super();
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateChanged(): void {
    if(!this.dateRangeHasSomeValue() &&
      this.filterTypeFormControl.value == FilterComparisons.BETWEEN
      && (!this.filterValueFormControl.value && !this.secondFilterValueFormControl.value)) {
      this.clearErrorsFilterValueFormControl();
      this.clearErrorsSecondFilterValueFormControl();
      this.filterValueFormControl.setValue(null);
      this.secondFilterValueFormControl.setValue(null);
    }
    super.onFilterChanged();
  }

  onDateComparisonsChanged(): void {
    if(this.filterTypeFormControl.value === FilterComparisons.BETWEEN){
      this.hasBetween = true;
      this.initialiseDateRange();
    } else {
      this.hasBetween = false;
      this.secondFilterValueFormControl.setValue(null);
      this.secondFilterValueFormControl.clearValidators();
    }
    this.secondFilterValueFormControl.updateValueAndValidity();
    super.onFilterChanged();
  }

  private initialiseDateRange(): void {
    this.fromDate = this.nullIfString(this.filterValueFormControl.value) ?? this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.fromDate, 'd', 10);
    this.setFormControlsDateRangeValue();
    this.onDateChanged();
  }

  private nullIfString(value: any): NgbDate {
    if(typeof value == 'string' || value == null) {
      return null;
    }
    return value;
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date?.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.setFormControlsDateRangeValue();
    this.onDateChanged();
  }

  private setFormControlsDateRangeValue(): void {
    this.filterValueFormControl.setValue(this.fromDate);
    this.secondFilterValueFormControl.setValue(this.toDate);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed: NgbDateStruct = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ?
      NgbDate.from(parsed) : currentValue;
  }

  fromDateChanged(value: string): void {
    this.fromDate = this.validateInput(this.fromDate, value);
    this.filterValueFormControl.setValue(this.fromDate ?? value);
    if((this.toDate && !this.fromDate) || this.inputValueHasError(value)) {
      this.filterValueFormControl.setValidators([Validators.pattern(PATTERNS.DATE)]);
      this.filterValueFormControl.setErrors({pattern: true});
      this.filterValueFormControl.updateValueAndValidity();
    } else if(!this.inputValueHasError(value)) {
      this.clearAllErrors(value);
    } else {
      this.clearErrorsFilterValueFormControl();
    }
    this.onDateChanged();
  }

  toDateChanged(value: string): void {
    this.toDate = this.validateInput(this.toDate, value);
    this.secondFilterValueFormControl.setValue(this.toDate ?? value);
    if((!this.toDate && this.fromDate) || this.inputValueHasError(value)) {
      this.secondFilterValueFormControl.setValidators([Validators.pattern(PATTERNS.DATE)]);
      this.secondFilterValueFormControl.setErrors({pattern: true});
      this.secondFilterValueFormControl.updateValueAndValidity();
    } else if(!this.inputValueHasError(value)) {
      this.clearAllErrors(value);
    } else {
      this.clearErrorsSecondFilterValueFormControl();
    }
    this.onDateChanged();
  }

  private clearAllErrors(value: string): void {
    this.clearErrorsFilterValueFormControl();
    this.clearErrorsSecondFilterValueFormControl();
    this.filterValueFormControl.setValue(this.fromDate);
    this.secondFilterValueFormControl.setValue(this.toDate);
    if(value === '') {
      this.filterValueFormControl.setValue(null);
      this.secondFilterValueFormControl.setValue(null);
    }
  }

  private inputValueHasError(value: string): boolean {
    if(!this.dateRangeHasSomeValue()) {
      return false;
    }
    return !this.validDateString(value)
      || (this.dateRangeHasSomeValue() && value === '');
  }

  private dateRangeHasSomeValue(): boolean {
    return !!this.dpFromDate?.nativeElement.value || !!this.dpToDate?.nativeElement.value;
  }

  private validDateString(value: string): boolean {
    if(value === null || value === undefined) {
      return true;
    }
    return this.dateRegExp.test(value);
  }
}
