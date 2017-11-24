/**
 * Created by Generator.
 * Author: Generator
 * description: 获取登录验证码
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');

export const RpcSDKZhongBaiAuthGetLoginVerifyCodeMethod = '/sdk_zhongbai/auth/get_login_verify_code';

export const RpcSDKZhongBaiAuthGetLoginVerifyCodeRpcType = 'ZBSystem';

/**
 *

 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiAuthGetLoginVerifyCode (
) {
  let params = {};

  if (debug.isProduction()) {
    return Rpc.get(RpcSDKZhongBaiAuthGetLoginVerifyCodeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiAuthGetLoginVerifyCodeMethod, params);
  }
}
