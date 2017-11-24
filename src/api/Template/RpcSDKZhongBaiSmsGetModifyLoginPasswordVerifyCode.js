/**
 * Created by Generator.
 * Author: Generator
 * description: 获取修改登录密码的验证码
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiSmsGetModifyLoginPasswordVerifyCodeMethod = '/sdk_zhongbai/sms/get_modify_login_password_verify_code';

export const RpcSDKZhongBaiSmsGetModifyLoginPasswordVerifyCodeRpcType = 'ZBSystem';

/**
 *
 * @param cellphone cellphone 手机号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiSmsGetModifyLoginPasswordVerifyCode (
  cellphone) {
  tc.typeCheckCellphone(cellphone, false);
  let params = {};
  if (!lodash.isNull(cellphone) && !lodash.isUndefined(cellphone)) {
    params['cellphone'] = cellphone;
  }
  if (debug.isProduction()) {
    return Rpc.get(RpcSDKZhongBaiSmsGetModifyLoginPasswordVerifyCodeMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiSmsGetModifyLoginPasswordVerifyCodeMethod, params);
  }
}
