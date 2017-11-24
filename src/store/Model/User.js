/**
 * Auth: lijiang
 * Date: 2017/10/27
 * Description: User
 */
import {default as ModelBase} from './ModelBase';
import RoleState from '../modules/Role';

let Vue = window.getVue();

class User extends ModelBase {
  constructor () {
    super('User');
  }

  data () {
    return {
      'USER_ID': null,
      'USER_NAME': '',
      'MEMBER_ID': null,
      'STORE_NO': null,
      'ROLES': [],
      'STATUS': Vue.constants.global.MINIPAY_STATUS_INVALID,
      'CELLPHONE': null,
      'NAME': '',
      'MEMBER_STATUS': Vue.constants.global.MINIPAY_STATUS_INVALID,
      'PERMISSION': [],
      'STORE_NAME': ''
    };
  }

  couldOperate (operateType) {
    let ret = false;
    switch (operateType) {
      case 'MODIFY':
        ret = this.checkModifyPermission();
        break;
      case 'DETAIL':
        ret = this.checkDetailPermission();
        break;
      case 'FREEZE':
        ret = this.checkFreezePermission();
        break;
      case 'RESET_PASSWORD':
        ret = this.checkResetPasswordPermission();
        break;
      case 'UNFREEZE':
        ret = this.checkUnFreezePermission();
        break;
      default:
        break;
    }
    return ret;
  }

  hasPermissions (permissions) {
    let lodash = Vue.prototype.getPlugin('lodash');
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(permissions, `permission must be an array , got ${permissions}`);
    let userPermission = this.get('PERMISSION');
    let difference = lodash.difference(userPermission, permissions);
    return !(difference.length === userPermission.length);
  }

  checkUnFreezePermission () {
    let user = Vue.prototype.getModuleGetterByName('getUser');
    return !this.isSelf() && user.hasPermissions([37]) && parseInt(this.get('STATUS')) === Vue.constants.global.MINIPAY_STATUS_FROZEN;
  }

  checkModifyPermission () {
    let user = Vue.prototype.getModuleGetterByName('getUser');
    return user.hasPermissions([34]) && parseInt(this.get('STATUS')) === Vue.constants.global.MINIPAY_STATUS_NORMAL;
  }

  checkDetailPermission () {
    return true;
  }

  checkFreezePermission () {
    let user = Vue.prototype.getModuleGetterByName('getUser');
    return !this.isSelf() && user.hasPermissions([32]) && parseInt(this.get('STATUS')) === Vue.constants.global.MINIPAY_STATUS_NORMAL;
  }

  checkResetPasswordPermission () {
    let user = Vue.prototype.getModuleGetterByName('getUser');
    return user.hasPermissions([36]) && parseInt(this.get('STATUS')) === Vue.constants.global.MINIPAY_STATUS_NORMAL;
  }

  filterKV (key) {
    if (key === 'BELONG_STORE_NAME') {
      return this.properties['STORE_NAME'];
    } else if (key === 'USER_STATUS') {
      return this.properties['STATUS'];
    }
    return null;
  }

  getUserRoles () {
    let roles = this.get('ROLES');
    let roleModels = [];
    Vue.prototype.getPlugin('lodash').map(roles, function (v) {
      let model = RoleState.getRoleByRoleId(Vue.prototype.getStoreState('Role'), v);
      if (model) {
        roleModels.push(model);
      }
    });
    return roleModels;
  }

  userRolesCn () {
    let names = '';
    this.getPlugin('lodash').map(this.getUserRoles(), function (v) {
      let model = RoleState.getRoleByRoleId(Vue.prototype.getStoreState('Role'), `${v}`);
      if (model) {
        names += `${model.get('ROLE_NAME')}、`;
      }
    });
    return names.substring(0, names.length - 1);
  }

  isSelf () {
    let user = Vue.prototype.getModuleGetterByName('getUser');
    return this.get('USER_ID') === user.get('USER_ID');
  }

  isHeadquarterUser () {
    return this.get('STORE_NO') + '' === '10001';
  }
}

export const USER_PAGE_HEADER = [
  {key: 'USER_ID', width: 6},
  {key: 'NAME', width: 8},
  {key: 'USER_NAME', width: 8},
  {key: 'CELLPHONE', width: 10},
  {key: 'BELONG_STORE_NAME', width: 15},
  {key: 'ROLES', width: 17},
  {key: 'USER_STATUS', width: 10}
];

export default User;
