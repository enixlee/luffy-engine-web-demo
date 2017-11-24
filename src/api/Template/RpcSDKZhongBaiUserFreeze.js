/**
 * Created by Generator.
 * Author: Generator
 * description: 冻结管理员
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiUserFreezeMethod = '/sdk_zhongbai/user/freeze';

export const RpcSDKZhongBaiUserFreezeRpcType = 'ZBSystem';

/**
 *
 * @param userId bigint 用户id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiUserFreeze (
  userId) {
  let params = {};
  if (!lodash.isNull(userId) && !lodash.isUndefined(userId)) {
    params['userId'] = userId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiUserFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiUserFreezeMethod, params);
  }
}
