/**
 * Auth: lijiang
 * Date: 2017/11/7
 * Description: Company
 */
import {default as ModelBase} from './ModelBase';

let Vue = window.getVue();

class Company extends ModelBase {
  constructor () {
    super('Company');
  }

  data () {
    return {
      'STORE_NO': null,
      'STORE_NAME': '',
      'PARENT_STORE_NO': null,
      'BANK_NAME': '',
      'BANK_ACCOUNT': '',
      'DISTRICT': '',
      'STATUS': 0,
      'STORE_TYPE': 0,
      'CENTER_STORE_NAME': '',
      'ADDRESS_NAME': '',
      'PARENT_STORE_NAME': '',
      'ORIGIN_STORE_NO': null,
      'BRAND_NAME': ''
    };
  }

  couldOperate (operateType) {
    let ret = true;
    switch (operateType) {
      case 'MODIFY':
        ret = this.get('STORE_TYPE') === Vue.constants.logic.STORE_TYPE_NORMAL;
        break;
    }
    return ret;
  }

  get (key) {
    Vue.prototype.getPlugin('Assert').isString(key);

    if (key === 'COMPANY_NAME') {
      return this.properties['STORE_NAME'];
    }

    return this.properties[key];
  }
}

export const COMPANY_PAGE_HEADER = [
  {key: 'STORE_NO', width: 10},
  {key: 'ORIGIN_STORE_NO', width: 10},
  {key: 'COMPANY_NAME', width: 15},
  {key: 'STORE_TYPE', width: 10},
  {key: 'PARENT_STORE_NAME', width: 15},
  {key: 'BRAND_NAME', width: 15}
];

export default Company;
