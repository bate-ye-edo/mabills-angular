import { Component } from '@angular/core';
import {AbstractChartComponent} from "../../AbstractChartComponent";
import {FormControl} from "@angular/forms";
import {ChartTitlesByGroupByOption} from "../../chart-titles-by-group-by-option";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends AbstractChartComponent {
  doughnutFormControl: FormControl = new FormControl('false');
  doughnut: boolean = false;
  groupByFormControl: FormControl;
  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.groupByFormControl = new FormControl(this.defaultGroupBy);
  }

  changePieChartType(): void {
    this.doughnut = (!!this.doughnutFormControl.value) && (this.doughnutFormControl.value === 'true');
  }

  hasGroupBy(): boolean {
    return this.groupByList.length > 0;
  }

  changeGroupBy(): void {
    this.chartService.setGroupBy(this.groupByFormControl.value);
    this.getChartData();
    this.title = ChartTitlesByGroupByOption[this.groupByFormControl.value];
  }
}
