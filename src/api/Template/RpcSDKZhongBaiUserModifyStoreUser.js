/**
 * Created by Generator.
 * Author: Generator
 * description: 修改门店管理员
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiUserModifyStoreUserMethod = '/sdk_zhongbai/user/modify_store_user';

export const RpcSDKZhongBaiUserModifyStoreUserRpcType = 'ZBSystem';

/**
 *
 * @param userId bigint 用户id
 * @param userName |null string 用户名
 * @param name |null string 姓名
 * @param cellphone |null cellphone 手机号
 * @param storeNo |null bigint 所属门店
 * @param role |null json 角色编号，[1,2,...]
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiUserModifyStoreUser (
  userId,
  userName = null,
  name = null,
  cellphone = null,
  storeNo = null,
  role = null) {
  tc.typeCheckString(userName, 0, 32, true);
  tc.typeCheckString(name, 0, 64, true);
  tc.typeCheckCellphone(cellphone, true);
  tc.typeCheckJsonString(role, true);
  let params = {};
  if (!lodash.isNull(userId) && !lodash.isUndefined(userId)) {
    params['userId'] = userId;
  }
  if (!lodash.isNull(userName) && !lodash.isUndefined(userName)) {
    params['userName'] = userName;
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
    return Rpc.post(RpcSDKZhongBaiUserModifyStoreUserMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiUserModifyStoreUserMethod, params);
  }
}
