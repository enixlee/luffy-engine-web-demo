/**
 * Created by Generator.
 * Author: Generator
 * description: 解冻门店
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreUnFreezeMethod = '/sdk_zhongbai/store/unfreeze';

export const RpcSDKZhongBaiStoreUnFreezeRpcType = 'ZBSystem';

/**
 *
 * @param storeNo bigint 门店号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreUnFreeze (
  storeNo) {
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreUnFreezeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreUnFreezeMethod, params);
  }
}
