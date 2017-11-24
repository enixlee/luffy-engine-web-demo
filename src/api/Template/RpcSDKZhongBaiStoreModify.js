/**
 * Created by Generator.
 * Author: Generator
 * description: 修改门店信息
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreModifyMethod = '/sdk_zhongbai/store/modify';

export const RpcSDKZhongBaiStoreModifyRpcType = 'ZBSystem';

/**
 *
 * @param storeNo bigint 门店号
 * @param storeName |null string 门店名称
 * @param bankName |null string 开户行
 * @param bankAccount |null string 银行账户
 * @param district |null string 所在地区
 * @param addressName |null string 地址
 * @param originStoreNo |null string 原有系统的门店号
 * @param parentStoreNo |null bigint 子公司编号
 * @param brandId |null bigint 品牌
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreModify (
  storeNo,
  storeName = null,
  bankName = null,
  bankAccount = null,
  district = null,
  addressName = null,
  originStoreNo = null,
  parentStoreNo = null,
  brandId = null) {
  tc.typeCheckString(storeName, 1, 255, true);
  tc.typeCheckString(bankName, 1, 255, true);
  tc.typeCheckString(bankAccount, 1, 32, true);
  tc.typeCheckString(district, 1, 32, true);
  tc.typeCheckString(addressName, 1, 255, true);
  tc.typeCheckString(originStoreNo, 1, 255, true);
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(storeName) && !lodash.isUndefined(storeName)) {
    params['storeName'] = storeName;
  }
  if (!lodash.isNull(bankName) && !lodash.isUndefined(bankName)) {
    params['bankName'] = bankName;
  }
  if (!lodash.isNull(bankAccount) && !lodash.isUndefined(bankAccount)) {
    params['bankAccount'] = bankAccount;
  }
  if (!lodash.isNull(district) && !lodash.isUndefined(district)) {
    params['district'] = district;
  }
  if (!lodash.isNull(addressName) && !lodash.isUndefined(addressName)) {
    params['addressName'] = addressName;
  }
  if (!lodash.isNull(originStoreNo) && !lodash.isUndefined(originStoreNo)) {
    params['originStoreNo'] = originStoreNo;
  }
  if (!lodash.isNull(parentStoreNo) && !lodash.isUndefined(parentStoreNo)) {
    params['parentStoreNo'] = parentStoreNo;
  }
  if (!lodash.isNull(brandId) && !lodash.isUndefined(brandId)) {
    params['brandId'] = brandId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreModifyMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreModifyMethod, params);
  }
}
