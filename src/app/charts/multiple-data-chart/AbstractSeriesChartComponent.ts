import {Component} from "@angular/core";
import {AbstractChartComponent} from "../AbstractChartComponent";
import {SeriesChart} from "../chart-data.model";
import {SeriesChartService} from "../chart-services/chart-service";

@Component({
    template: ''
})
export class AbstractSeriesChartComponent extends AbstractChartComponent {
  seriesChart: SeriesChart;
  seriesChartService: SeriesChartService;
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

  private subscribeToSeriesChartChanges() {
    this.seriesChartService.seriesChart$
      .subscribe((seriesChart: SeriesChart) => {
        this.seriesChart = seriesChart;
      });
  }
}
