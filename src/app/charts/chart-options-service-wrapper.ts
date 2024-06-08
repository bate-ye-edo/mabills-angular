import {ChartOptions} from "./chart-options.model";
import {ChartService} from "./chart-services/chart-service";

export interface ChartOptionsServiceWrapper {
  chartOptions: ChartOptions;
  chartService: ChartService;
}
