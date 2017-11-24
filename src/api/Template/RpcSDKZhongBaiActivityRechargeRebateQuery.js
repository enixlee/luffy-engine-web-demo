/**
 * Created by Generator.
 * Author: Generator
 * description: 查询充值赠送活动
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiActivityRechargeRebateQueryMethod = '/sdk_zhongbai/activity/recharge_rebate/query';

export const RpcSDKZhongBaiActivityRechargeRebateQueryRpcType = 'ZBSystem';

/**
 *
 * @param storeNo bigint 门店号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiActivityRechargeRebateQuery (
  storeNo) {
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiActivityRechargeRebateQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiActivityRechargeRebateQueryMethod, params);
  }
}
