import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AbstractChartComponent} from "../../AbstractChartComponent";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent extends AbstractChartComponent {
  orientationFormControl: FormControl = new FormControl(this.barChartType);

  constructor() {
    super();
  }

  isVertical(): boolean {
    return this.barChartType === 'vertical';
  }

  changeOrientation() {
    this.barChartType = this.orientationFormControl.value;
  }
}
