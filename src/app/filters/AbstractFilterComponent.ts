import {Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FilterComparisons} from "../shared/filters/filter-comparisons";
import {FilterDto} from "../shared/filters/filter.dto";
import {FilterField} from "../shared/filters/filter-field";

@Component({
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AbstractFilterComponent),
      multi: true
    }
  ]
})
export class AbstractFilterComponent implements ControlValueAccessor{
  @Input() defaultComparison: FilterComparisons;
  @Input() filterName: string;
  @Input() filterField: FilterField;
  @Input() formControl: FormControl<any> = new FormControl(null);

  protected filterValueFormControl: FormControl<any> = new FormControl<any>(null);
  protected secondFilterValueFormControl: FormControl<any> = new FormControl<any>(null);
  protected filterTypeFormControl: FormControl<any> = new FormControl<any>(null);
  protected readonly FilterComparisons = FilterComparisons;
  protected readonly AlertClasses = 'alert alert-danger position-absolute';
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.filterTypeFormControl.setValue(FilterComparisons.EQUAL);
  }

  onFilterChanged(): void {
    this.setErrors();
    if(!this.formControl.errors && this.filterValueFormControl.value) {
      this.formControl.setValue(<FilterDto>{
        filterField: this.filterField,
        filterComparison: this.filterTypeFormControl.value,
        filterValue: this.filterValueFormControl.value,
        secondFilterValue: this.secondFilterValueFormControl.value
      });
      this.formControl.setErrors(null);
    }
    if(!this.filterValueFormControl.value) {
      this.formControl.setValue(null);
    }
  }

  private setErrors(): void {
    this.formControl.setErrors(this.filterValueFormControl.errors);
    if(this.filterTypeFormControl.value === FilterComparisons.BETWEEN && this.secondFilterValueFormControl.errors){
      this.formControl.setErrors(this.secondFilterValueFormControl.errors);
    }
  }

  writeValue(obj: FilterDto): void {
    if(obj) {
      this.filterTypeFormControl.setValue(obj.filterComparison);
      this.filterValueFormControl.setValue(obj.filterValue);
      this.filterField = obj.filterField;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (!isDisabled) {
      this.filterValueFormControl.enable();
      this.filterTypeFormControl.enable();
    } else {
      this.filterValueFormControl.disable();
      this.filterTypeFormControl.disable();
    }
  }

  protected clearErrorsFilterValueFormControl(): void {
    this.filterValueFormControl.clearValidators();
    this.filterValueFormControl.setErrors(null);
    this.filterValueFormControl.updateValueAndValidity();
  }

  protected clearErrorsSecondFilterValueFormControl(): void {
    this.secondFilterValueFormControl.clearValidators();
    this.secondFilterValueFormControl.setErrors(null);
    this.secondFilterValueFormControl.updateValueAndValidity();
  }
}
