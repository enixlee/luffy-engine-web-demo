/**
 * Created by Generator.
 * Author: Generator
 * description: 修改登录密码
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiUserModifyLoginPasswordMethod = '/sdk_zhongbai/user/modify_login_password';

export const RpcSDKZhongBaiUserModifyLoginPasswordRpcType = 'ZBSystem';

/**
 *
 * @param newPassword md5 新登录密码
 * @param verifyCode string 短信验证码
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiUserModifyLoginPassword (
  newPassword,
  verifyCode) {
  tc.typeCheckMd5(newPassword, false);
  tc.typeCheckString(verifyCode, 6, 6, false);
  let params = {};
  if (!lodash.isNull(newPassword) && !lodash.isUndefined(newPassword)) {
    params['newPassword'] = newPassword;
  }
  if (!lodash.isNull(verifyCode) && !lodash.isUndefined(verifyCode)) {
    params['verifyCode'] = verifyCode;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiUserModifyLoginPasswordMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiUserModifyLoginPasswordMethod, params);
  }
}
