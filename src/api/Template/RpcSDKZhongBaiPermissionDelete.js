/**
 * Created by Generator.
 * Author: Generator
 * description: 添加权限
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPermissionDeleteMethod = '/sdk_zhongbai/permission/delete';

export const RpcSDKZhongBaiPermissionDeleteRpcType = 'ZBSystem';

/**
 *
 * @param id bigint 关键字
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPermissionDelete (
  id) {
  let params = {};
  if (!lodash.isNull(id) && !lodash.isUndefined(id)) {
    params['id'] = id;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPermissionDeleteMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPermissionDeleteMethod, params);
  }
}
