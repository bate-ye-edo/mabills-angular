import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, DEFAULT_CHART_OPTIONS} from "../chart-options.model";
import {FormControl} from "@angular/forms";
import {ChartService} from "../chart-services/chart-service";
import {Chart} from "../chart-data.model";
import {BarChartType} from "../bar-chart-type";
import {ChartOptionsServiceWrapper} from "../chart-options-service-wrapper";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() chartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  chart: Chart;
  barChartType: BarChartType = 'vertical';
  title: string;
  chartService: ChartService;
  options: ChartOptions = DEFAULT_CHART_OPTIONS;

  orientationFormControl: FormControl = new FormControl(this.barChartType);

  constructor() {
  }

  ngOnInit(): void {
    this.chartService = this.chartOptionsServiceWrapper.chartService;
    this.options = this.chartOptionsServiceWrapper.chartOptions;
    this.title = this.options.title;
    this.barChartType = this.options.barChartType;
    if(this.chartService && !this.showChart()) {
      this.chartService.getChartData()
        .subscribe((data: Chart) => this.chart = data);
    }
  }

  isVertical(): boolean {
    return this.barChartType === 'vertical';
  }

  showChart(): boolean {
    return this.chart && this.chart.data.length > 0;
  }

  hasPadding(): string {
    if(this.showChart()) {
      return 'p-0';
    }
    return '';
  }

  changeOrientation() {
    this.barChartType = this.orientationFormControl.value;
  }
}
