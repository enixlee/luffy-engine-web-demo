/**
 * Created by Generator.
 * Author: Generator
 * description: 添加品牌
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreBrandDeleteMethod = '/sdk_zhongbai/store/brand/delete';

export const RpcSDKZhongBaiStoreBrandDeleteRpcType = 'ZBSystem';

/**
 *
 * @param id bigint 品牌id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreBrandDelete (
  id) {
  let params = {};
  if (!lodash.isNull(id) && !lodash.isUndefined(id)) {
    params['id'] = id;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreBrandDeleteMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreBrandDeleteMethod, params);
  }
}
