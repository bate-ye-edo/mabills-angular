import {Component, Input, OnInit} from "@angular/core";
import {ChartOptionsServiceWrapper} from "./chart-options-service-wrapper";
import {Chart, ChartData} from "./chart-data.model";
import {BarChartType} from "./bar-chart-type";
import {ChartService} from "./chart-services/chart-service";
import {ChartOptions, DEFAULT_CHART_OPTIONS} from "./chart-options.model";
import {Color} from "@swimlane/ngx-charts";
import {MaterialColorGenerator} from "./MaterialColorGenerator";
import {ChartGroupByLabel} from "./chart-group-by-label";

@Component({
  template: ''
})
export class AbstractChartComponent implements OnInit {

  @Input() chartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  @Input() groupByList: string[] = [];
  @Input() defaultGroupBy: string = '';

  chart: Chart;
  barChartType: BarChartType = 'vertical';
  title: string;
  chartService: ChartService;
  options: ChartOptions = DEFAULT_CHART_OPTIONS;

  protected constructor() {
  }

  ngOnInit(): void {
    this.chartService = this.chartOptionsServiceWrapper.chartService;
    this.options = this.chartOptionsServiceWrapper.chartOptions;
    this.title = this.options.title;
    this.barChartType = this.options.barChartType;
    if(this.defaultGroupBy) {
      this.chartService.setGroupBy(this.defaultGroupBy);
    }
    this.getChartData();
  }

  protected getChartData() {
    if(this.chartService) {
      this.chartService.getChartData()
        .subscribe((data: Chart) => {
          if(this.chartOptionsServiceWrapper.generateColor) {
            this.generateColors(data.data);
          }
          this.chart = data;
        });
    }
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

  getGroupByLabel(groupBy: string) {
    return ChartGroupByLabel[groupBy];
  }

  private generateColors(data: ChartData[]): void {
    let domain: string[] = data.map((dataItem: ChartData) => this.generateColorFromString(dataItem.name));
    this.options.scheme = <Color> {
      domain: domain
    };
  }

  private generateColorFromString(str: string): string {
    let materialColorGenerator: MaterialColorGenerator = new MaterialColorGenerator();
    return materialColorGenerator.convertStringToMaterialColor(str);
  }

}
