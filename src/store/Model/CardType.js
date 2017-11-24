/**
 * Auth: lijiang
 * Date: 2017/10/30
 * Description: CardType
 */
import {default as ModelBase} from './ModelBase';

let Vue = window.getVue();

class CardType extends ModelBase {
  constructor () {
    super('CardType');
  }

  data () {
    return {
      'MERCHANT_CARDTYPE_ID': null,
      'MERCHANT_NO': null,
      'CARD_BIN': null,
      'CARD_BIN_VIRTUAL': null,
      'CARD_TYPE': null,
      'CARD_PRICE': 0,
      'INIT_CARD_VALUE': 0,
      'CARDTYPE_NAME': '',
      'ACTIVE_DATE': null,
      'TERM_OF_VALIDITY': 0,
      'SINGLE_RECHARGE_LIMIT': 0,
      'SINGLE_RECHARGE_LIMIT_MIN': 0,
      'HIGHEST_MONEY_LIMIT': 0,
      'HIGHEST_VIRTUAL_MONEY_LIMIT': 0,
      'CARDTYPE_DISCOUNT_RATE': Vue.constants.global.RATE_TEN_THOUSANDTH,
      'STATUS': Vue.constants.global.MINIPAY_STATUS_INVALID,
      'REVIEW_STATUS': Vue.constants.global.REVIEW_STATUS_NOT_REVIEW
    };
  }

  couldOperate (operateType) {
    return true;
  }
}

/**
 * 卡种选项列表的表头
 * @type {[,null,null,null,null,null,null,null]}
 */
export const CARDTYPE_PAGE_HEADER = [
  {key: 'MERCHANT_CARDTYPE_ID', width: 9},
  {key: 'CARDTYPE_NAME', width: 10},
  {key: 'INIT_CARD_VALUE', width: 9},
  {key: 'SINGLE_RECHARGE_LIMIT', width: 11},
  {key: 'SINGLE_RECHARGE_LIMIT_MIN', width: 11},
  {key: 'HIGHEST_MONEY_LIMIT', width: 11},
  {key: 'TERM_OF_VALIDITY', width: 9},
  {key: 'STATUS', width: 9},
  {key: 'REVIEW_STATUS', width: 9}
];

export default CardType;
