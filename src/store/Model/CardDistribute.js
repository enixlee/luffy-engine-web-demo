/**
 * Auth: lijiang
 * Date: 2017/11/4
 * Description: CardDistribute
 */
import {default as ModelBase} from './ModelBase';

class CardDistribute extends ModelBase {
  constructor () {
    super('CardDistribute');
  }

  data () {
    return {
      'FABRICATION_BATCH_ID': null,
      'MERCHANT_CARDTYPE_ID': null,
      'CURRENT_RECEIVE_CARD_COUNT': 0,
      'FABRICATION_CARD_COUNT': 0,
      'CARDTYPE_NAME': null,
      'MANUFACTURED': 0,
      'REVIEW_STATUS': 0,
      'APPLY_USER_ID': null,
      'created_at': null,
      'START_PREPAIDCARD_ID': null,
      'END_PREPAIDCARD_ID': null,
      'LEFT_COUNT': 0,
      'INIT_CARD_VALUE_YUAN': 0
    };
  }

  couldOperate (operateType) {
    if (operateType === 'RECEIVE_CARD') {
      return parseInt(this.get('LEFT_COUNT')) > 0;
    }
    return false;
  }
}

export const CARD_DISTRIBUTE_PAGE_HEADER = [
  {key: 'FABRICATION_BATCH_ID', width: 20},
  {key: 'CARDTYPE_NAME', width: 10},
  {key: 'INIT_CARD_VALUE_YUAN', width: 7},
  {key: 'START_PREPAIDCARD_ID', width: 13},
  {key: 'END_PREPAIDCARD_ID', width: 13},
  {key: 'FABRICATION_CARD_COUNT', width: 9},
  {key: 'CURRENT_RECEIVE_CARD_COUNT', width: 9},
  {key: 'LEFT_COUNT', width: 9}
];

export default CardDistribute;
