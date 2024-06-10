import {ChartOptions} from "./chart-options.model";
import {ChartService, SeriesChartService} from "./chart-services/chart-service";

export interface ChartOptionsServiceWrapper {
  chartOptions: ChartOptions;
  chartService: ChartService;
  seriesChartService: SeriesChartService;
  groupBy?: string;
  generateColor?: boolean;
}
