/**
 * Created by Generator.
 * Author: Generator
 * description: 查询预付卡明细
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardQueryCardMethod = '/sdk_zhongbai/prepaidcard/query_card';

export const RpcSDKZhongBaiPrePaidCardQueryCardRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId bigint 卡号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardQueryCard (
  prePaidCardId) {
  let params = {};
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardQueryCardMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardQueryCardMethod, params);
  }
}
