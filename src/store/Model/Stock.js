/**
 * Auth: lijiang
 * Date: 2017/11/6
 * Description: Stock
 */
import {default as ModelBase} from './ModelBase';

class Stock extends ModelBase {
  constructor () {
    super('Stock');
  }

  data () {
    return {
      'ID': null,
      'FABRICATION_BATCH_ID': null,
      'MERCHANT_CARDTYPE_ID': null,
      'STORE_NO': null,
      'RECEIVE_COUNT': 0,
      'START_PREPAIDCARD_ID': null,
      'RECEIVE_STATUS': 0,
      'RECEIVER_USER_ID': null,
      'SOLD_COUNT': 0,
      'UNSOLD_COUNT': 0,
      'CARDTYPE_NAME': '',
      'STORE_NAME': '',
      'RECEIVER': '',
      'INIT_CARD_VALUE_YUAN': 0,
      'END_PREPAIDCARD_ID': null,
      'created_at': null
    };
  }
  filterKV (key) {
    if (key === 'FABRICATION_CARD_BATCH') {
      return this.properties['FABRICATION_BATCH_ID'];
    } else if (key === 'REMAIN_COUNT') {
      return this.properties['UNSOLD_COUNT'];
    }
    return null;
  }
}

export const STOCK_PAGE_HEADER = [
  {key: 'CARDTYPE_NAME', width: 15, align: 'left'},
  {key: 'FABRICATION_CARD_BATCH', width: 20},
  {key: 'REMAIN_COUNT', width: 20},
  {key: 'PLACE_COL', width: 15}
];

export default Stock;
