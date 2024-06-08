import { Component } from '@angular/core';
import {ChartOptionsServiceWrapper} from "./chart-options-service-wrapper";
import {DEFAULT_CHART_OPTIONS} from "./chart-options.model";
import {ChartServiceFactory} from "./chart-services/chart-service-factory";
import {ChartDataType} from "./chart-services/chart-data-type";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  expensesChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  incomeChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  constructor(private chartServiceFactory: ChartServiceFactory) {
    this.initializeExpenseChartOptionsServiceWrapper();
    this.initializeIncomeChartOptionsServiceWrapper();
  }

  private initializeExpenseChartOptionsServiceWrapper(): void {
    this.expensesChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        scheme: {
          domain: ['#DC4040']
        },
        title: 'Expenses',
        xAxisLabel: 'Date',
        yAxisLabel: 'Amount',
        legend: false,
        barChartType: 'vertical',
      },
      chartService: this.chartServiceFactory.createChartService(ChartDataType.EXPENSES)
    }
  }

  private initializeIncomeChartOptionsServiceWrapper(): void {
    this.incomeChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        scheme: {
          domain: ['#5AA454']
        },
        title: 'Incomes',
        xAxisLabel: 'Date',
        yAxisLabel: 'Amount',
        legend: false,
        barChartType: 'vertical',
      },
      chartService: this.chartServiceFactory.createChartService(ChartDataType.INCOMES)
    }
  }
}
