/**
 * Created by Generator.
 * Author: Generator
 * description: 获取报表
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiReconciliationGetChartMethod = '/sdk_zhongbai/reconciliation/get_chart';

export const RpcSDKZhongBaiReconciliationGetChartRpcType = 'ZBSystem';

/**
 *
 * @param chartDate datetime 报表日期
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiReconciliationGetChart (
  chartDate) {
  tc.typeCheckDateString(chartDate, false);
  let params = {};
  if (!lodash.isNull(chartDate) && !lodash.isUndefined(chartDate)) {
    params['chartDate'] = chartDate;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiReconciliationGetChartMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiReconciliationGetChartMethod, params);
  }
}
