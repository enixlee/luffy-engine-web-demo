/**
 * Created by Generator.
 * Author: Generator
 * description: 登录
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiAuthLoginWithVerifyCodeMethod = '/sdk_zhongbai/auth/login_with_verify_code';

export const RpcSDKZhongBaiAuthLoginWithVerifyCodeRpcType = 'ZBSystem';

/**
 *
 * @param userName string 用户名
 * @param password md5 登录密码
 * @param verifyCode string 登录验证码
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiAuthLoginWithVerifyCode (
  userName,
  password,
  verifyCode) {
  tc.typeCheckString(userName, 0, 32, false);
  tc.typeCheckMd5(password, false);
  tc.typeCheckString(verifyCode, 4, 4, false);
  let params = {};
  if (!lodash.isNull(userName) && !lodash.isUndefined(userName)) {
    params['userName'] = userName;
  }
  if (!lodash.isNull(password) && !lodash.isUndefined(password)) {
    params['password'] = password;
  }
  if (!lodash.isNull(verifyCode) && !lodash.isUndefined(verifyCode)) {
    params['verifyCode'] = verifyCode;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiAuthLoginWithVerifyCodeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiAuthLoginWithVerifyCodeMethod, params);
  }
}
