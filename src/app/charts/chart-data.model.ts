export interface ChartData {
  name: string;
  value: number;
}

export interface SeriesChartData {
  name: string;
  series: ChartData[];
}

export interface SeriesChart {
  series: SeriesChartData[];
}

export interface Chart {
  data: ChartData[];
}
