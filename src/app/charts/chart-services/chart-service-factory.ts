import {ChartDataType} from "./chart-data-type";
import {Injectable} from "@angular/core";
import {ExpensesChartService} from "./expenses-chart.service";
import {IncomesChartService} from "./incomes-chart.service";
import {ChartService} from "./chart-service";

@Injectable({
    providedIn: 'root'
})
export class ChartServiceFactory {
  constructor(private expensesChartService: ExpensesChartService,
              private incomesChartService: IncomesChartService) {
  }

  createChartService(chartDataType: ChartDataType): ChartService {
    switch (chartDataType) {
        case ChartDataType.EXPENSES:
          return this.expensesChartService;
        case ChartDataType.INCOMES:
          return this.incomesChartService;
        default:
          throw new Error('Invalid chart data type');
    }
  }
}
