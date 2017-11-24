/**
 * Created by Generator.
 * Author: Generator
 * description: 冻结
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardOperationFreezeMethod = '/sdk_zhongbai/prepaidcard/operation/freeze';

export const RpcSDKZhongBaiPrePaidCardOperationFreezeRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId bigint 预付卡卡号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardOperationFreeze (
  prePaidCardId) {
  let params = {};
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardOperationFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardOperationFreezeMethod, params);
  }
}
