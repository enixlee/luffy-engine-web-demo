/**
 * Created by Generator.
 * Author: Generator
 * description: 修改登录密码，通过周几短信发送
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiUserResetLoginPasswordMethod = '/sdk_zhongbai/user/reset_login_password';

export const RpcSDKZhongBaiUserResetLoginPasswordRpcType = 'ZBSystem';

/**
 *
 * @param userId bigint 用户id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiUserResetLoginPassword (
  userId) {
  let params = {};
  if (!lodash.isNull(userId) && !lodash.isUndefined(userId)) {
    params['userId'] = userId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiUserResetLoginPasswordMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiUserResetLoginPasswordMethod, params);
  }
}
