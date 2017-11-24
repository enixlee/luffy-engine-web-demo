/**
 * Created by Generator.
 * Author: Generator
 * description: 登出
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');

export const RpcSDKZhongBaiAuthLogoutMethod = '/sdk_zhongbai/auth/logout';

export const RpcSDKZhongBaiAuthLogoutRpcType = 'ZBSystem';

/**
 *

 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiAuthLogout (
) {
  let params = {};

  if (debug.isProduction()) {
    return Rpc.get(RpcSDKZhongBaiAuthLogoutMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiAuthLogoutMethod, params);
  }
}
