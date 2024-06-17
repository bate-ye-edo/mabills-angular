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
  constructor() {
  }

  createChartService(chartDataType: ChartCategory): ChartService {
    switch (chartDataType) {
        case ChartCategory.EXPENSES:
          return new ExpensesChartService();
        case ChartCategory.INCOMES:
          return new IncomesChartService();
        default:
          throw new Error('Invalid chart data type');
    }
  }

  createSeriesChartService(chartDataType: ChartCategory): SeriesChartService {
    if(chartDataType === ChartCategory.EXPENSE_INCOME_SERIES) {
      return new ExpenseIncomeSeriesChartService();
    }
    throw new Error('Invalid chart data type');
  }
}
