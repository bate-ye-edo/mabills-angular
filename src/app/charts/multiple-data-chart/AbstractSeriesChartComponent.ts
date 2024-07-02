import {Component} from "@angular/core";
import {AbstractChartComponent} from "../AbstractChartComponent";
import {SeriesChart} from "../chart-data.model";
import {SeriesChartService} from "../chart-services/chart-service";
import {Color} from "@swimlane/ngx-charts";

@Component({
    template: ''
})
export class AbstractSeriesChartComponent extends AbstractChartComponent {
  static readonly DEFAULT_COLOR: Color = <Color>{
    domain: ['#ffc107']
  }
  seriesChart: SeriesChart;
  seriesChartService: SeriesChartService;
  defaultScheme: string | Color = <Color>{
    domain: ['#DC4040', '#5AA454']
  };
  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.seriesChartService = this.chartOptionsServiceWrapper.seriesChartService;
    this.subscribeToSeriesChartChanges();
    super.ngOnInit();
  }

  override getChartData(): void {
    if(this.seriesChartService) {
      this.seriesChartService.getSeriesData()
        .subscribe();
    }
  }

  override showChart(): boolean {
    return this.seriesChart && this.seriesChart.series.length > 0;
  }

  private subscribeToSeriesChartChanges(): void {
    this.seriesChartService.seriesChart$
      .subscribe((seriesChart: SeriesChart) => {
        this.seriesChart = seriesChart;
        this.setColorScheme();
      });
  }

  private setColorScheme(): void {
    if(this.seriesChart.series.length > 0 && this.isAllSeriesOnlyOneSerie()) {
      this.options.scheme = AbstractSeriesChartComponent.DEFAULT_COLOR;
    } else {
      this.options.scheme = this.defaultScheme;
    }
  }

  private isAllSeriesOnlyOneSerie(): boolean {
    return this.seriesChart.series.filter(serie => serie.series.length > 1).length === 0;
  }
}
