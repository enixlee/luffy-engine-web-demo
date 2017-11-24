/**
 * Created by Generator.
 * Author: Generator
 * description: 添加门店
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreAddStoreMethod = '/sdk_zhongbai/store/add_store';

export const RpcSDKZhongBaiStoreAddStoreRpcType = 'ZBSystem';

/**
 *
 * @param storeName string 门店名称
 * @param bankName |null string 子公司开户行
 * @param bankAccount |null string 子公司银行账户
 * @param parentStoreNo bigint 所属公司
 * @param district |null string 所在地区
 * @param storeType int 0：普通门店，1：子公司，2：测试商户总公司
 * @param brandId |null int 品牌id
 * @param centerStoreName |null string 中心店名称
 * @param addressName |null string 地址
 * @param originStoreNo string 原有系统的门店号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreAddStore (
  storeName,
  bankName = null,
  bankAccount = null,
  parentStoreNo,
  district = null,
  storeType,
  brandId = null,
  centerStoreName = null,
  addressName = null,
  originStoreNo) {
  tc.typeCheckString(storeName, 1, 255, false);
  tc.typeCheckString(bankName, 1, 255, true);
  tc.typeCheckString(bankAccount, 1, 32, true);
  tc.typeCheckString(district, 1, 32, true);
  tc.typeCheckChoice(storeType, [0, 1, 2], false);
  tc.typeCheckNumber(brandId, 1, null, true);
  tc.typeCheckString(centerStoreName, null, null, true);
  tc.typeCheckString(addressName, 1, 255, true);
  tc.typeCheckString(originStoreNo, 1, 255, false);
  let params = {};
  if (!lodash.isNull(storeName) && !lodash.isUndefined(storeName)) {
    params['storeName'] = storeName;
  }
  if (!lodash.isNull(bankName) && !lodash.isUndefined(bankName)) {
    params['bankName'] = bankName;
  }
  if (!lodash.isNull(bankAccount) && !lodash.isUndefined(bankAccount)) {
    params['bankAccount'] = bankAccount;
  }
  if (!lodash.isNull(parentStoreNo) && !lodash.isUndefined(parentStoreNo)) {
    params['parentStoreNo'] = parentStoreNo;
  }
  if (!lodash.isNull(district) && !lodash.isUndefined(district)) {
    params['district'] = district;
  }
  if (!lodash.isNull(storeType) && !lodash.isUndefined(storeType)) {
    params['storeType'] = storeType;
  }
  if (!lodash.isNull(brandId) && !lodash.isUndefined(brandId)) {
    params['brandId'] = brandId;
  }
  if (!lodash.isNull(centerStoreName) && !lodash.isUndefined(centerStoreName)) {
    params['centerStoreName'] = centerStoreName;
  }
  if (!lodash.isNull(addressName) && !lodash.isUndefined(addressName)) {
    params['addressName'] = addressName;
  }
  if (!lodash.isNull(originStoreNo) && !lodash.isUndefined(originStoreNo)) {
    params['originStoreNo'] = originStoreNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreAddStoreMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreAddStoreMethod, params);
  }
}
