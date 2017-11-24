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

export const RpcSDKZhongBaiRoleModifyMethod = '/sdk_zhongbai/role/modify';

export const RpcSDKZhongBaiRoleModifyRpcType = 'ZBSystem';

/**
 *
 * @param id bigint 角色编号
 * @param permissionIds json 权限列表
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiRoleModify (
  id,
  permissionIds) {
  tc.typeCheckJsonString(permissionIds, false);
  let params = {};
  if (!lodash.isNull(id) && !lodash.isUndefined(id)) {
    params['id'] = id;
  }
  if (!lodash.isNull(permissionIds) && !lodash.isUndefined(permissionIds)) {
    params['permissionIds'] = permissionIds;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiRoleModifyMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiRoleModifyMethod, params);
  }
}
