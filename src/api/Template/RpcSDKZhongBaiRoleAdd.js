/**
 * Created by Generator.
 * Author: Generator
 * description: 添加角色
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiRoleAddMethod = '/sdk_zhongbai/role/add';

export const RpcSDKZhongBaiRoleAddRpcType = 'ZBSystem';

/**
 *
 * @param roleName string 角色名字
 * @param permissionIds json 权限列表
 * @param storeNo |null bigint 默认为通用权限
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiRoleAdd (
  roleName,
  permissionIds,
  storeNo = null) {
  tc.typeCheckString(roleName, 1, 64, false);
  tc.typeCheckJsonString(permissionIds, false);
  let params = {};
  if (!lodash.isNull(roleName) && !lodash.isUndefined(roleName)) {
    params['roleName'] = roleName;
  }
  if (!lodash.isNull(permissionIds) && !lodash.isUndefined(permissionIds)) {
    params['permissionIds'] = permissionIds;
  }
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiRoleAddMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiRoleAddMethod, params);
  }
}
