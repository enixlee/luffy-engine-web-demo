/**
 * Created by Generator.
 * Author: Generator
 * description: 修改充值赠送活动
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiActivityRechargeRebatemodifyMethod = '/sdk_zhongbai/activity/recharge_rebate/modify';

export const RpcSDKZhongBaiActivityRechargeRebatemodifyRpcType = 'ZBSystem';

/**
 *
 * @param id bigint 活动id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiActivityRechargeRebatemodify (
  id) {
  let params = {};
  if (!lodash.isNull(id) && !lodash.isUndefined(id)) {
    params['id'] = id;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiActivityRechargeRebatemodifyMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiActivityRechargeRebatemodifyMethod, params);
  }
}
