import {Component} from '@angular/core';
import {ChartOptionsServiceWrapper} from "./chart-options-service-wrapper";
import {DEFAULT_CHART_OPTIONS} from "./chart-options.model";
import {ChartServiceFactory} from "./chart-services/chart-service-factory";
import {ChartCategory} from "./chart-services/chart-category";
import {ExpenseChartGroupBy} from "./expense-chart-group-by";
import {IncomeChartGroupBy} from "./income-chart-group-by";
import {FilterOptions} from "../filters/filter-options";
import {DEFAULT_FILTERS} from "../shared/filters/default-filters";
import {FilterDto} from "../shared/filters/filter.dto";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  protected expensesChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  protected incomeChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  protected expenseIncomeByDateSeriesChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  protected expensesPieChartOptionsServiceWrapper: ChartOptionsServiceWrapper;
  protected incomesPieChartOptionsServiceWrapper: ChartOptionsServiceWrapper;

  protected readonly IncomeChartGroupBy = IncomeChartGroupBy;
  protected readonly ExpenseChartGroupBy = ExpenseChartGroupBy;
  protected filterOptions: FilterOptions[] = [];

  isCollapsed: boolean = true;

  constructor(private chartServiceFactory: ChartServiceFactory) {
    this.initializeExpenseChartOptionsServiceWrapper();
    this.initializeIncomeChartOptionsServiceWrapper();
    this.initializeExpenseIncomeByDateSeriesChartOptionsServiceWrapper();
    this.initializeExpensePieChartOptionsServiceWrapper();
    this.initializeIncomesPieChartOptionsServiceWrapper();
    this.initializeFilterOptions();
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
        title: 'Expenses by credit card',
        legend: true,
      },
      chartService: this.chartServiceFactory.createChartService(ChartCategory.EXPENSES),
      groupBy: ExpenseChartGroupBy.EXPENSE_CREDIT_CARD,
      generateColor: true
    }
  }

  private initializeIncomesPieChartOptionsServiceWrapper(): void {
    this.incomesPieChartOptionsServiceWrapper = <ChartOptionsServiceWrapper> {
      chartOptions: {
        ...DEFAULT_CHART_OPTIONS,
        title: 'Incomes by credit card',
        legend: true,
      },
      chartService: this.chartServiceFactory.createChartService(ChartCategory.INCOMES),
      groupBy: IncomeChartGroupBy.INCOME_CREDIT_CARD,
      generateColor: true
    }
  }

  private initializeFilterOptions(): void {
    this.filterOptions = [ DEFAULT_FILTERS.Amount, DEFAULT_FILTERS.ExpenseDate, DEFAULT_FILTERS.CreditCard, DEFAULT_FILTERS.IncomeDate, DEFAULT_FILTERS.IBAN, DEFAULT_FILTERS.ExpenseCategory, DEFAULT_FILTERS.FormOfPayment ];
  }

  applyFilters(filterDtos: FilterDto[]): void {
    if(filterDtos.length == 0) {
      this.expensesChartOptionsServiceWrapper.chartService.clearFilters();
      this.incomeChartOptionsServiceWrapper.chartService.clearFilters();
      this.expenseIncomeByDateSeriesChartOptionsServiceWrapper.seriesChartService.clearFilters(); // TODO: this is not working, investigate why
      this.expensesPieChartOptionsServiceWrapper.chartService.clearFilters();
      this.incomesPieChartOptionsServiceWrapper.chartService.clearFilters();
    }
    this.expensesChartOptionsServiceWrapper.chartService.applyFilters(filterDtos);
    this.incomeChartOptionsServiceWrapper.chartService.applyFilters(filterDtos);
    this.expenseIncomeByDateSeriesChartOptionsServiceWrapper.seriesChartService.applyFilters(filterDtos);
    this.expensesPieChartOptionsServiceWrapper.chartService.applyFilters(filterDtos);
    this.incomesPieChartOptionsServiceWrapper.chartService.applyFilters(filterDtos);
  }
}
