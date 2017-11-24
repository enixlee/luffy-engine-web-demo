/**
 * Auth: lijiang
 * Date: 2017/11/6
 * Description: PosMachine
 */
import {default as ModelBase} from './ModelBase';

class PosMachine extends ModelBase {
  constructor () {
    super('PosMachine');
  }

  data () {
    return {
      'STORE_NO': null,
      'POS_MACHINE_TERMINAL_NO': '',
      'POS_MERCHANT_NO': '',
      'POS_UNION_PAY_TERMINAL_NO': '',
      'POS_UNION_PAY_MERCHANT_NO': '',
      'STATUS': 0,
      'STORE_NAME': ''
    };
  }

  filterKV (key) {
    if (key === 'POS_STATUS') {
      return this.get('STATUS');
    }
    if (key === 'POS_STORE_NAME') {
      return this.get('STORE_NAME');
    }
    return null;
  }
}

export const POS_MACHINE_PAGE_HEADER = [
  {key: 'POS_STORE_NAME', width: 15},
  {key: 'POS_MERCHANT_NO', width: 15},
  {key: 'POS_MACHINE_TERMINAL_NO', width: 15},
  {key: 'POS_UNION_PAY_MERCHANT_NO', width: 15},
  {key: 'POS_UNION_PAY_TERMINAL_NO', width: 15},
  {key: 'POS_STATUS', width: 15}
];

export default PosMachine;
