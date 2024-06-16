import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterOptions} from "./filter-options";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FilterDto} from "../shared/filters/filter.dto";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  static readonly FILTER_PER_ROW = 2;
  @Input() isCollapsed: boolean = true;
  @Input() filters: FilterOptions[] = [];

  @Output() applyFilters: EventEmitter<FilterDto[]> = new EventEmitter();
  protected splitFilters: FilterOptions[][] = [];
  protected filterClasses: string = "col-lg-6 col-md-12 col-sm-12";
  protected biggerFilterClass: string = "col-lg-6 col-md-12 col-sm-12";
  private filterFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createSplitFilters();
    this.buildFormGroup();
  }

  private createSplitFilters(): void {
    for(let i: number = 0; i < this.filters.length; i+=FiltersComponent.FILTER_PER_ROW) {
      const arr: FilterOptions[] = this.filters.slice(i, i+FiltersComponent.FILTER_PER_ROW);
      this.splitFilters.push(arr);
    }
  }

  isNumberFilter(filter: FilterOptions): boolean {
    return filter.filterDataType === 'number';
  }

  isTextFilter(filter: FilterOptions): boolean {
    return filter.filterDataType === 'string';
  }

  isDateFilter(filter: FilterOptions): boolean {
    return filter.filterDataType === 'Date';
  }

  canApplyFilters(): boolean {
    return this.filterFormGroup.status === 'VALID';
  }

  getFormControl(formControlName:string): FormControl {
    if(this.filterFormGroup.get(formControlName)){
      return this.filterFormGroup.get(formControlName) as FormControl;
    }
    return new FormControl();
  }

  private buildFormGroup(): void {
    this.filterFormGroup = this.formBuilder.group({});
    this.filters.forEach((filter: FilterOptions) => {
      this.filterFormGroup.addControl(filter.filterName, new FormControl())
    });
  }

  protected apply(): void {
    this.applyFilters.emit(this.buildFilterDtoListFromFormGroup());
  }

  private buildFilterDtoListFromFormGroup(): FilterDto[] {
    const filterDtos: FilterDto[] = [];
    Object.keys(this.filterFormGroup.controls).forEach(key => {
      const filterFormControl = this.filterFormGroup.get(key)?.value;
      if(filterFormControl) {
        filterDtos.push(filterFormControl);
      }
    });
    return filterDtos;
  }
}
