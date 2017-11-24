/**
 * Created by Generator.
 * Author: Generator
 * description: 冻结门店
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreFreezeMethod = '/sdk_zhongbai/store/freeze';

export const RpcSDKZhongBaiStoreFreezeRpcType = 'ZBSystem';

/**
 *
 * @param storeNo bigint 门店号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreFreeze (
  storeNo) {
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreFreezeMethod, params);
  }
}
