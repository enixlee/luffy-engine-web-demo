/**
 * Created by Generator.
 * Author: Generator
 * description: 批量冻结
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardOperationBatchFreezeMethod = '/sdk_zhongbai/prepaidcard/operation/batch_freeze';

export const RpcSDKZhongBaiPrePaidCardOperationBatchFreezeRpcType = 'ZBSystem';

/**
 *
 * @param startPrePaidCardId bigint 开始预付卡卡号
 * @param count |null int 批量冻结
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardOperationBatchFreeze (
  startPrePaidCardId,
  count = null) {
  tc.typeCheckNumber(count, 2, 100, true);
  let params = {};
  if (!lodash.isNull(startPrePaidCardId) && !lodash.isUndefined(startPrePaidCardId)) {
    params['startPrePaidCardId'] = startPrePaidCardId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardOperationBatchFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardOperationBatchFreezeMethod, params);
  }
}
