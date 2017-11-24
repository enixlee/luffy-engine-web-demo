/**
 * Created by Generator.
 * Author: Generator
 * description: 添加权限
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPermissionModifyMethod = '/sdk_zhongbai/permission/modify';

export const RpcSDKZhongBaiPermissionModifyRpcType = 'ZBSystem';

/**
 *
 * @param id bigint 关键字
 * @param keyWord string 关键字
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPermissionModify (
  id,
  keyWord) {
  tc.typeCheckString(keyWord, 1, 64, false);
  let params = {};
  if (!lodash.isNull(id) && !lodash.isUndefined(id)) {
    params['id'] = id;
  }
  if (!lodash.isNull(keyWord) && !lodash.isUndefined(keyWord)) {
    params['keyWord'] = keyWord;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPermissionModifyMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPermissionModifyMethod, params);
  }
}
