/**
 * Created by Generator.
 * Author: Generator
 * description: 解冻管理员
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiUserUnFreezeMethod = '/sdk_zhongbai/user/unfreeze';

export const RpcSDKZhongBaiUserUnFreezeRpcType = 'ZBSystem';

/**
 *
 * @param userId bigint 用户id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiUserUnFreeze (
  userId) {
  let params = {};
  if (!lodash.isNull(userId) && !lodash.isUndefined(userId)) {
    params['userId'] = userId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiUserUnFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiUserUnFreezeMethod, params);
  }
}
