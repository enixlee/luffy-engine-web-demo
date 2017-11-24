/**
 * Auth: lijiang
 * Date: 2017/10/27
 * Description: Role
 */
import {default as ModelBase} from './ModelBase';

class Role extends ModelBase {
  constructor () {
    super('Role');
  }

  data () {
    return {
      'ID': null,
      'CONFIG_ID': 0,
      'ROLE_NAME': '',
      'PERMISSION_LIST': [],
      'STORE_NO': null,
      'STATUS': 0
    };
  }
}

export default Role;
