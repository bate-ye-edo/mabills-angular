import {Color} from "@swimlane/ngx-charts";
import {BarChartType} from "./bar-chart-type";

export interface ChartOptions {
  xAxis?: boolean;
  yAxis?: boolean;
  legend?: boolean;
  legendTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGridLines?: boolean;
  animations?: boolean;
  legendPosition?: string;
  showXAxisLabel?: boolean;
  showYAxisLabel?: boolean;
  barPadding?: number;
  title?: string;
  barChartType?: BarChartType;
  tooltipDisabled?: boolean;
  scheme?: string | Color;
  select?: (event: any) => void;
}

export const DEFAULT_CHART_OPTIONS: ChartOptions = {
  xAxis: true,
  yAxis: true,
  legend: true,
  legendTitle: 'Legend',
  xAxisLabel: 'X Axis',
  yAxisLabel: 'Y Axis',
  showGridLines: true,
  animations: true,
  legendPosition: 'below',
  showXAxisLabel: true,
  showYAxisLabel: true,
  barPadding: 8,
  tooltipDisabled: false,
  scheme: null,
  select: null
}

