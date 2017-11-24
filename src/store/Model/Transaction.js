/**
 * Auth: lijiang
 * Date: 2017/11/8
 * Description: Transaction
 */
import {default as ModelBase} from './ModelBase';

class Transaction extends ModelBase {
  constructor () {
    super('Transaction');
  }

  data () {
    return {
      'TRADE_FLOW_OF_PAYMINI': null,
      'PREPAIDCARD_ID': null,
      'TRADE_SOURCE_PREPAIDCARD_ID': null,
      'TRADE_TIME': null,
      'TRADE_TYPE': null,
      'TRADE_SUBTYPE': null,
      'TRADE_MONEY': 0,
      'TRADE_CASH_MONEY': 0,
      'TRADE_VIRTUAL_MONEY': 0,
      'TRADE_ORIGIN_MONEY': 0,
      'DISCOUNT_RATE': 10000,
      'TERMINAL_ID': null,
      'PREPAIDCARD_TOTAL_BALANCE': 0,
      'PREPAIDCARD_CASH_BALANCE': 0,
      'PREPAIDCARD_VIRTUAL_BALANCE': 0,
      'MERCHANT_POINTS': 0,
      'MINIPAY_POINTS': 0,
      'ORIGIN_TRADE_FLOW_OF_PAYMINI': null,
      'IS_REDRAW': 0,
      'QUOTA_AMOUNT': 0,
      'CARD_CASH': 0,
      'CARD_VIRTUAL': 0,
      'CARD_BALANCE': 0,
      'TRADE_CHANNEL': 0,
      'TRADE_METHOD': 0,
      'PRESENT_CASH_MONEY': 0,
      'PRESENT_VIRTUAL_MONEY': 0,
      'STORE_NAME': '',
      'CARDTYPE_NAME': '',
      'STORE_NO': null,
      'OPERATE_USER_ID': null,
      'PARENT_STORE_NAME': '',
      'BALANCE': 0,
      'OPERATOR': ''
    };
  }

  couldOperate (operateType) {
    return operateType === 'DETAIL';
  }

  filterKV (key) {
    if (key === 'TRANSACTION_STORE') {
      return this.properties['STORE_NAME'] === '' ? '--' : this.properties['STORE_NAME'];
    } else if (key === 'SUBSIDIARY_NAME') {
      return this.properties['PARENT_STORE_NAME'] === '' ? '--' : this.properties['PARENT_STORE_NAME'];
    } else if (key === 'PARENT_STORE_NAME' || key === 'STORE_NAME' || key === 'OPERATOR') {
      let value = this.properties[key];
      return value === '' ? '--' : value;
    }
    return null;
  }
}

export const TRANSACTION_PAGE_HEADER = [
  {key: 'TRADE_TIME', width: 10},
  {key: 'TRANSACTION_STORE', width: 10},
  {key: 'SUBSIDIARY_NAME', width: 10},
  {key: 'CARDTYPE_NAME', width: 10},
  {key: 'PREPAIDCARD_ID', width: 10},
  {key: 'TRADE_TYPE', width: 9},
  {key: 'TRADE_MONEY', width: 9},
  {key: 'BALANCE', width: 9},
  {key: 'TERMINAL_ID', width: 9}
];

export default Transaction;
