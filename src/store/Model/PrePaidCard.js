/**
 * Auth: lijiang
 * Date: 2017/11/1
 * Description: PrePaidCard
 */
import {default as ModelBase} from './ModelBase';

let Vue = window.getVue();

class PrePaidCard extends ModelBase {
  constructor () {
    super('PrePaidCard');
  }

  data () {
    return {
      'PREPAIDCARD_ID': null,
      'STORE_NO': null,
      'RECEIVE_CARD_RECORD_ID': null,
      'MERCHANT_CARDTYPE_ID': null,
      'FABRICATION_BATCH_ID': null,
      'IS_SOLD': 0,
      'STATUS': Vue.constants.global.MINIPAY_STATUS_INVALID,
      'STORE_NAME': '',
      'CARDTYPE_NAME': '',
      'IS_RECEIVED': 0,
      'BALANCE': 0,
      'ACTIVE_DATE': null,
      'EXPIRE_DATE': null
    };
  }

  couldOperate (operateType) {
    return false;
  }

  getColor (header) {
    if (this.get('SELL_CARD_RET')) {
      return parseInt(this.get('RESULT')) === 0 && header === 'SELL_CARD_RESULT' ? '#ff0000' : null;
    } else if (this.get('RECHARGE_CARD_RET')) {
      return parseInt(this.get('RESULT')) === 0 && header === 'PREPAIDCARD_RECHARGE_RESULT' ? '#ff0000' : null;
    }
    return null;
  }
  filterKV (key) {
    if (key === 'COMPANY') {
      return this.properties['STORE_NAME'];
    } else if (key === 'STATE') {
      return this.properties['STATUS'];
    }
    return null;
  }
}

/**
 * 状态选择器
 * @param type
 */
export const getPrePaidCardStatusByType = (type) => {
  let status = [];
  switch (type) {
    case 0:
      // 全部
      status = [
        Vue.constants.global.MINIPAY_STATUS_INVALID,
        Vue.constants.global.MINIPAY_STATUS_NORMAL,
        Vue.constants.global.MINIPAY_STATUS_FROZEN,
        Vue.constants.global.MINIPAY_STATUS_CANCELLATION,
        Vue.constants.global.MINIPAY_STATUS_RETURN_BACK
      ];
      break;
    case 1:
      // 正常
      status = [
        Vue.constants.global.MINIPAY_STATUS_NORMAL
      ];
      break;
    case 2:
      // 冻结
      status = [
        Vue.constants.global.MINIPAY_STATUS_FROZEN
      ];
      break;
    default:
      break;
  }

  return JSON.stringify(status);
};

/**
 * 售出状态选项卡
 * @param type
 */
export const getSellStatebyType = (type) => {
  let soldStatus = [];
  switch (type) {
    case 0:
      // 全部
      soldStatus = [0, 1];
      break;
    case 1:
      // 已售出
      soldStatus = [1];
      break;
    case 2:
      // 未售出
      soldStatus = [0];
      break;
    default:
      break;
  }

  return JSON.stringify(soldStatus);
};

/**
 * 领取状态选项卡
 * @param type
 */
export const getReceiveStatebyType = (type) => {
  let soldStatus = [];
  switch (type) {
    case 0:
      // 全部
      soldStatus = [0, 1];
      break;
    case 1:
      // 已领取
      soldStatus = [1];
      break;
    case 2:
      // 未领取
      soldStatus = [0];
      break;
    default:
      break;
  }

  return JSON.stringify(soldStatus);
};

/**
 * 卡种选项列表的表头
 * @type {[,null,null,null,null,null,null,null]}
 */
export const PREPAIDCARD_PAGE_HEADER = [
  {key: 'COMPANY', width: 14},
  {key: 'CARDTYPE_NAME', width: 14},
  {key: 'PREPAIDCARD_ID', width: 14},
  {key: 'IS_SOLD', width: 8},
  {key: 'IS_RECEIVED', width: 8},
  {key: 'STATE', width: 6},
  {key: 'BALANCE', width: 8},
  {key: 'ACTIVE_DATE', width: 14},
  {key: 'EXPIRE_DATE', width: 14}
];

export default PrePaidCard;
