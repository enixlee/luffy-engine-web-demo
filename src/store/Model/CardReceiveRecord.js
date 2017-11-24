/**
 * Auth: lijiang
 * Date: 2017/11/4
 * Description: CardReceiveRecord
 */
import {default as ModelBase} from './ModelBase';

class CardReceiveRecord extends ModelBase {
  constructor () {
    super('CardReceiveRecord');
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
      'CARDTYPE_NAME': '',
      'STORE_NAME': '',
      'RECEIVER': '',
      'INIT_CARD_VALUE_YUAN': 0,
      'END_PREPAIDCARD_ID': null,
      'created_at': null
    };
  }
}

export const CARD_RECEIVE_RECORD_PAGE_HEADER = [
  {key: 'ID', width: 7},
  {key: 'CARDTYPE_NAME', width: 8},
  {key: 'INIT_CARD_VALUE_YUAN', width: 7},
  {key: 'RECEIVE_COUNT', width: 7},
  {key: 'START_PREPAIDCARD_ID', width: 13},
  {key: 'STORE_NAME', width: 11},
  {key: 'RECEIVER', width: 11},
  {key: 'created_at', width: 11},
  {key: 'FABRICATION_BATCH_ID', width: 18}
];

export default CardReceiveRecord;
