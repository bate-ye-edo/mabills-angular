import { Component } from '@angular/core';
import {ChartOptionsServiceWrapper} from "./chart-options-service-wrapper";
import {DEFAULT_CHART_OPTIONS} from "./chart-options.model";
import {ChartServiceFactory} from "./chart-services/chart-service-factory";
import {ChartCategory} from "./chart-services/chart-category";
import {ExpenseChartGroupBy} from "./chart-services/expense-chart-group-by";
import {ExpenseCategoriesService} from "../shared/user-profile/expense-categories.service";
import {ExpenseCategory} from "../shared/user-profile/expense-category.model";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  expensesChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  incomeChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  expenseIncomeByDateSeriesChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  expensesPieChartOptionsServiceWrapper: ChartOptionsServiceWrapper;

  private expenseCategoriesCount: number = 1;

  constructor(private chartServiceFactory: ChartServiceFactory,
              private expenseCategoriesService: ExpenseCategoriesService) {
    this.initializeExpenseChartOptionsServiceWrapper();
    this.initializeIncomeChartOptionsServiceWrapper();
    this.initializeExpenseIncomeByDateSeriesChartOptionsServiceWrapper();
    this.initializeExpensePieChartOptionsServiceWrapper();
    this.expenseCategoriesService.expenseCategories$.subscribe({
      next: (expenseCategories: ExpenseCategory[]) => {
        this.expenseCategoriesCount = expenseCategories.length;
      }
    });
  }

  private initializeExpenseChartOptionsServiceWrapper(): void {
    this.expensesChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        scheme: {
          domain: ['#DC4040']
        },
        title: 'Expenses by date',
        xAxisLabel: 'Date',
        yAxisLabel: 'Amount',
        legend: false,
        barChartType: 'vertical',
      },
      chartService: this.chartServiceFactory.createChartService(ChartCategory.EXPENSES)
    }
  }

  private initializeIncomeChartOptionsServiceWrapper(): void {
    this.incomeChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        scheme: {
          domain: ['#5AA454']
        },
        title: 'Incomes by date',
        xAxisLabel: 'Date',
        yAxisLabel: 'Amount',
        legend: false,
        barChartType: 'vertical',
      },
      chartService: this.chartServiceFactory.createChartService(ChartCategory.INCOMES)
    }
  }

  private initializeExpenseIncomeByDateSeriesChartOptionsServiceWrapper(): void {
    this.expenseIncomeByDateSeriesChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        scheme: {
          domain: ['#DC4040', '#5AA454']
        },
        title: 'Expenses and incomes by date',
        xAxisLabel: 'Date',
        yAxisLabel: 'Amount',
        legend: false,
        barChartType: 'vertical',
        groupPadding: 1
      },
      seriesChartService: this.chartServiceFactory.createSeriesChartService(ChartCategory.EXPENSE_INCOME_SERIES)
    }
  }

  private initializeExpensePieChartOptionsServiceWrapper(): void {
    this.expensesPieChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        title: 'Expenses by category',
        legend: true,
      },
      chartService: this.chartServiceFactory.createChartService(ChartCategory.EXPENSES),
      groupBy: ExpenseChartGroupBy.EXPENSE_CATEGORY,
      generateColor: true
    }
  }
}
