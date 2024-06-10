import {ChartCategory} from "./chart-category";
import {Injectable} from "@angular/core";
import {ExpensesChartService} from "./expenses-chart.service";
import {IncomesChartService} from "./incomes-chart.service";
import {ChartService, SeriesChartService} from "./chart-service";
import {ExpenseIncomeSeriesChartService} from "./expense-income-series-chart.service";

@Injectable({
    providedIn: 'root'
})
export class ChartServiceFactory {
  constructor(private expensesChartService: ExpensesChartService,
              private incomesChartService: IncomesChartService,
              private expenseIncomeByDateSeriesChartService: ExpenseIncomeSeriesChartService) {
  }

  createChartService(chartDataType: ChartCategory): ChartService {
    switch (chartDataType) {
        case ChartCategory.EXPENSES:
          return this.expensesChartService;
        case ChartCategory.INCOMES:
          return this.incomesChartService;
        default:
          throw new Error('Invalid chart data type');
    }
  }

  createSeriesChartService(chartDataType: ChartCategory): SeriesChartService {
    switch (chartDataType) {
        case ChartCategory.EXPENSE_INCOME_SERIES:
          return this.expenseIncomeByDateSeriesChartService;
        default:
          throw new Error('Invalid chart data type');
    }
  }
}
