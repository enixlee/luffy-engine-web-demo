/**
 * Created by Generator.
 * Author: Generator
 * description: 售卡（领卡到子公司就截止了，所以售卡的权限应该是门店员工可以出售子公司的卡）
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardTradeSellCardMethod = '/sdk_zhongbai/prepaidcard/trade/sell_card';

export const RpcSDKZhongBaiPrePaidCardTradeSellCardRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId bigint 预付卡卡号
 * @param count |null int 数量
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardTradeSellCard (
  prePaidCardId,
  count = 1) {
  tc.typeCheckNumber(count, 1, 100, true);
  let params = {};
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardTradeSellCardMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardTradeSellCardMethod, params);
  }
}
