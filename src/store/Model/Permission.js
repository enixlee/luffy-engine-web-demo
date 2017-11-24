/**
 * Auth: lijiang
 * Date: 2017/11/14
 * Description: Permission
 */
import {default as ModelBase} from './ModelBase';

class Permission extends ModelBase {
  constructor () {
    super('Permission');
  }

  data () {
    return {
      'ID': null,
      'KEY_WORD': null,
      'PERMISSION_NAME': ''
    };
  }
}

export default Permission;
