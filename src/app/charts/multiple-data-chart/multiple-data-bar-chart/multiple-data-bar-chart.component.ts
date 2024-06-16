import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AbstractSeriesChartComponent} from "../AbstractSeriesChartComponent";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-multiple-data-bar-chart',
  templateUrl: './multiple-data-bar-chart.component.html',
  styleUrls: ['./multiple-data-bar-chart.component.css']
})
export class MultipleDataBarChartComponent extends AbstractSeriesChartComponent {
  orientationFormControl: FormControl = new FormControl(this.barChartType);
  legendPosition: LegendPosition = LegendPosition.Right;

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
