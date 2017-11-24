/**
 * Created by Generator.
 * Author: Generator
 * description: 充值
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardTradeRechargeMethod = '/sdk_zhongbai/prepaidcard/trade/recharge';

export const RpcSDKZhongBaiPrePaidCardTradeRechargeRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId bigint 预付卡卡号
 * @param count int 批量充值数量
 * @param amount money_cent 充值金额
 * @param subCompanyNo bigint 子公司id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardTradeRecharge (
  prePaidCardId,
  count = 1,
  amount,
  subCompanyNo) {
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
  if (!lodash.isNull(subCompanyNo) && !lodash.isUndefined(subCompanyNo)) {
    params['subCompanyNo'] = subCompanyNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardTradeRechargeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardTradeRechargeMethod, params);
  }
}
