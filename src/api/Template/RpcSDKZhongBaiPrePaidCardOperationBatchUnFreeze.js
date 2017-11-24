/**
 * Created by Generator.
 * Author: Generator
 * description: 批量解冻
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardOperationBatchUnFreezeMethod = '/sdk_zhongbai/prepaidcard/operation/batch_unfreeze';

export const RpcSDKZhongBaiPrePaidCardOperationBatchUnFreezeRpcType = 'ZBSystem';

/**
 *
 * @param startPrePaidCardId bigint 开始预付卡卡号
 * @param count |null int 批量冻结
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardOperationBatchUnFreeze (
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
    return Rpc.post(RpcSDKZhongBaiPrePaidCardOperationBatchUnFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardOperationBatchUnFreezeMethod, params);
  }
}
