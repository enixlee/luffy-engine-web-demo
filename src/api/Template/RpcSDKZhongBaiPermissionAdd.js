/**
 * Created by Generator.
 * Author: Generator
 * description: 添加权限
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPermissionAddMethod = '/sdk_zhongbai/permission/add';

export const RpcSDKZhongBaiPermissionAddRpcType = 'ZBSystem';

/**
 *
 * @param keyWord string 关键字
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPermissionAdd (
  keyWord) {
  tc.typeCheckString(keyWord, 1, 64, false);
  let params = {};
  if (!lodash.isNull(keyWord) && !lodash.isUndefined(keyWord)) {
    params['keyWord'] = keyWord;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPermissionAddMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPermissionAddMethod, params);
  }
}
