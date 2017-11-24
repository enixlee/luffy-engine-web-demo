/**
 * Created by Generator.
 * Author: Generator
 * description: 冻结角色
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiRoleUnFreezeMethod = '/sdk_zhongbai/role/unfreeze';

export const RpcSDKZhongBaiRoleUnFreezeRpcType = 'ZBSystem';

/**
 *
 * @param id bigint 角色id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiRoleUnFreeze (
  id) {
  let params = {};
  if (!lodash.isNull(id) && !lodash.isUndefined(id)) {
    params['id'] = id;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiRoleUnFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiRoleUnFreezeMethod, params);
  }
}
