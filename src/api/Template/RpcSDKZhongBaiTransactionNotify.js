/**
 * Created by Generator.
 * Author: Generator
 * description: 查询消费记录
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiTransactionNotifyMethod = '/sdk_zhongbai/transaction/notify';

export const RpcSDKZhongBaiTransactionNotifyRpcType = 'ZBSystem';

/**
 *
 * @param transaction json 交易流水
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiTransactionNotify (
  transaction) {
  tc.typeCheckJsonString(transaction, false);
  let params = {};
  if (!lodash.isNull(transaction) && !lodash.isUndefined(transaction)) {
    params['transaction'] = transaction;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiTransactionNotifyMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiTransactionNotifyMethod, params);
  }
}
