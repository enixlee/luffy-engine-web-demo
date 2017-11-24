/**
 * Created by Generator.
 * Author: Generator
 * description: 解除冻结
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardOperationUnFreezeMethod = '/sdk_zhongbai/prepaidcard/operation/unfreeze';

export const RpcSDKZhongBaiPrePaidCardOperationUnFreezeRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId bigint 预付卡卡号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardOperationUnFreeze (
  prePaidCardId) {
  let params = {};
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardOperationUnFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardOperationUnFreezeMethod, params);
  }
}
