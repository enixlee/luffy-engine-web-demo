/**
 * Created by Generator.
 * Author: Generator
 * description: 添加品牌
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreBrandAddMethod = '/sdk_zhongbai/store/brand/add';

export const RpcSDKZhongBaiStoreBrandAddRpcType = 'ZBSystem';

/**
 *
 * @param brandName string 品牌名称
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreBrandAdd (
  brandName) {
  tc.typeCheckString(brandName, 1, 255, false);
  let params = {};
  if (!lodash.isNull(brandName) && !lodash.isUndefined(brandName)) {
    params['brandName'] = brandName;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreBrandAddMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreBrandAddMethod, params);
  }
}
