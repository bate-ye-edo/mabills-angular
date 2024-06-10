import { Component } from '@angular/core';
import {AbstractChartComponent} from "../../AbstractChartComponent";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends AbstractChartComponent {
  doughnutFormControl: FormControl = new FormControl('false');
  doughnut: boolean = false;
  constructor() {
    super();
  }

  changePieChartType(): void {
    this.doughnut = (!!this.doughnutFormControl.value) && (this.doughnutFormControl.value === 'true');
  }
}
