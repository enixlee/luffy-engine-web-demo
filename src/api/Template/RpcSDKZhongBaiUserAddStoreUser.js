/**
 * Created by Generator.
 * Author: Generator
 * description: 添加门店管理员
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiUserAddStoreUserMethod = '/sdk_zhongbai/user/add_store_user';

export const RpcSDKZhongBaiUserAddStoreUserRpcType = 'ZBSystem';

/**
 *
 * @param userName string 用户名
 * @param password md5 新登录密码
 * @param name string 姓名
 * @param cellphone cellphone 手机号
 * @param storeNo bigint 所属门店
 * @param role json 角色编号，[1,2,...]
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiUserAddStoreUser (
  userName,
  password,
  name,
  cellphone,
  storeNo,
  role) {
  tc.typeCheckString(userName, 0, 32, false);
  tc.typeCheckMd5(password, false);
  tc.typeCheckString(name, 0, 64, false);
  tc.typeCheckCellphone(cellphone, false);
  tc.typeCheckJsonString(role, false);
  let params = {};
  if (!lodash.isNull(userName) && !lodash.isUndefined(userName)) {
    params['userName'] = userName;
  }
  if (!lodash.isNull(password) && !lodash.isUndefined(password)) {
    params['password'] = password;
  }
  if (!lodash.isNull(name) && !lodash.isUndefined(name)) {
    params['name'] = name;
  }
  if (!lodash.isNull(cellphone) && !lodash.isUndefined(cellphone)) {
    params['cellphone'] = cellphone;
  }
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(role) && !lodash.isUndefined(role)) {
    params['role'] = role;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiUserAddStoreUserMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiUserAddStoreUserMethod, params);
  }
}
