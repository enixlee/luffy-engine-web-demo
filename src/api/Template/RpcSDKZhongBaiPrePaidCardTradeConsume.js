/**
 * Created by Generator.
 * Author: Generator
 * description: 后台消费
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardTradeConsumeMethod = '/sdk_zhongbai/prepaidcard/trade/consume';

export const RpcSDKZhongBaiPrePaidCardTradeConsumeRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId bigint 预付卡卡号
 * @param count int 批量消费数量
 * @param amount money_cent 消费金额
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardTradeConsume (
  prePaidCardId,
  count = 1,
  amount) {
  tc.typeCheckNumber(count, 1, 100, false);
  tc.typeCheckNumber(amount, null, null, false);
  let params = {};
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
  }
  if (!lodash.isNull(amount) && !lodash.isUndefined(amount)) {
    params['amount'] = amount;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardTradeConsumeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardTradeConsumeMethod, params);
  }
}
