/**
 * Auth: lijiang
 * Date: 2017/11/1
 * Description: Fabrication
 */
import {default as ModelBase} from './ModelBase';

let Vue = window.getVue();

class Fabrication extends ModelBase {
  constructor () {
    super('Fabrication');
  }

  data () {
    return {
      'FABRICATION_BATCH_ID': null,
      'MERCHANT_CARDTYPE_ID': null,
      'CURRENT_RECEIVE_CARD_COUNT': 0,
      'FABRICATION_CARD_COUNT': 0,
      'CARDTYPE_NAME': '',
      'INIT_CARD_VALUE': 0,
      'MANUFACTURED': 0,
      'REVIEW_STATUS': Vue.constants.global.REVIEW_STATUS_NOT_REVIEW,
      'created_at': null
    };
  }

  couldOperate (operateType) {
    let status = parseInt(this.get('MANUFACTURED'));
    let ret = false;
    switch (operateType) {
      case 'DOWNLOAD_FABRICATION':
        ret = (status === Vue.constants.global.MANUFACTURE_STATUS_RECEIVE_ENTITY_CARD ||
          status === Vue.constants.global.MANUFACTURE_STATUS_NEED_RECEIVE_ENTITY_CARD ||
          status === Vue.constants.global.MANUFACTURE_STATUS_FINISH);
        break;
      case 'CONFIRM_RECEIVE':
        ret = status === Vue.constants.global.MANUFACTURE_STATUS_FINISH;
        break;
      default:
        break;
    }
    return ret;
  }
}

/**
 * 全部状态
 * @type {number}
 */
export const FABRICATION_STATUS_ALL = 0;
/**
 * 未制卡
 * @type {number}
 */
export const FABRICATION_STATUS_NOT_MAKING = 1;
/**
 * 已生成卡号文件，等待卡厂制卡
 * @type {number}
 */
export const FABRICATION_STATUS_PREPARE_MAKE = 2;
/**
 * 完成制卡
 * @type {number}
 */
export const FABRICATION_STATUS_COMPLETE = 3;

/**
 * 根据类型组织制卡状态
 * @param type
 */
export const getFabricationStatusByType = (type) => {
  let status = [];
  switch (type) {
    case FABRICATION_STATUS_ALL:
      status = [
        Vue.constants.global.MANUFACTURE_STATUS_INVALID,
        Vue.constants.global.MANUFACTURE_STATUS_FINISH,
        Vue.constants.global.MANUFACTURE_STATUS_PREPARE_MAKE,
        Vue.constants.global.MANUFACTURE_STATUS_MAKING,
        Vue.constants.global.MANUFACTURE_STATUS_NEED_RECEIVE_ENTITY_CARD,
        Vue.constants.global.MANUFACTURE_STATUS_RECEIVE_ENTITY_CARD
      ];
      break;
    case FABRICATION_STATUS_NOT_MAKING:
      status = [
        Vue.constants.global.MANUFACTURE_STATUS_INVALID
      ];
      break;
    case FABRICATION_STATUS_PREPARE_MAKE:
      status = [
        Vue.constants.global.MANUFACTURE_STATUS_FINISH
      ];
      break;
    case FABRICATION_STATUS_COMPLETE:
      status = [
        Vue.constants.global.MANUFACTURE_STATUS_RECEIVE_ENTITY_CARD
      ];
      break;
    default:
      break;
  }

  return JSON.stringify(status);
};

/**
 * 制卡记录选项列表的表头
 * @type {[,null,null,null,null,null,null,null]}
 */
export const FABRICATION_PAGE_HEADER = [
  {key: 'FABRICATION_BATCH_ID', width: 15},
  {key: 'CARDTYPE_NAME', width: 10},
  {key: 'FABRICATION_CARD_COUNT', width: 10},
  {key: 'MANUFACTURED', width: 15},
  {key: 'REVIEW_STATUS', width: 15},
  {key: 'created_at', width: 15}
];

export default Fabrication;
