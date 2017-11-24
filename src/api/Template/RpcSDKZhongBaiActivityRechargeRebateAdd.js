/**
 * Created by Generator.
 * Author: Generator
 * description: 添加充值赠送活动
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiActivityRechargeRebateAddMethod = '/sdk_zhongbai/activity/recharge_rebate/add';

export const RpcSDKZhongBaiActivityRechargeRebateAddRpcType = 'ZBSystem';

/**
 *
 * @param storeNo bigint 门店号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiActivityRechargeRebateAdd (
  storeNo) {
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiActivityRechargeRebateAddMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiActivityRechargeRebateAddMethod, params);
  }
}
