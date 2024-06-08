export interface ChartData {
  name: string;
  value: number;
}

export interface SeriesChartData {
  name: string;
  series: ChartData[];
}

export interface SeriesChart {
  data: SeriesChartData[];
}

export interface Chart {
  data: ChartData[];
}
