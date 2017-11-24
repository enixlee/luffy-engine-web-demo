/**
 * Auth: lijiang
 * Date: 2017/11/8
 * Description: FinancialChart
 */
import {default as ModelBase} from './ModelBase';

class FinancialChart extends ModelBase {
  constructor () {
    super('FinancialChart');
  }

  data () {
    return {
      recharge: {ID: -1, CHECK_DATE: null, TRADE_COUNT: 0, TRADE_TOTAL_MONEY: 0},
      subCompanyRecharge: [],
      subCompanyConsume: [],
      subCompanyPayment: []
    };
  }

  couldOperate (operateType) {
    return operateType === 'EXPORT_DETAIL';
  }
}

export const FINANCIAL_CHART_PAGE_HEADER = [];

export default FinancialChart;
