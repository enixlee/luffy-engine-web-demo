/**
 * Created by Generator.
 * Author: Generator
 * description: 查询门店信息
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiStoreExportMethod = '/sdk_zhongbai/store/export';

export const RpcSDKZhongBaiStoreExportRpcType = 'ZBSystem';

/**
 *
 * @param storeNo |null bigint 门店号
 * @param storeName |null string 门店名称
 * @param parentStoreNo |null bigint 所属公司
 * @param district |null string 所在地区
 * @param storeType |null json 0：普通门店，1：子公司，2：测试商户总公司
 * @param status |null json 状态
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreExport (
  storeNo = null,
  storeName = null,
  parentStoreNo = null,
  district = null,
  storeType = null,
  status = null) {
  tc.typeCheckString(storeName, 1, 255, true);
  tc.typeCheckString(district, 1, 32, true);
  tc.typeCheckJsonArrayChoice(storeType, [0, 1, 2], true);
  tc.typeCheckJsonArrayChoice(status, [0, 1, 2, 3, 4], true);
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(storeName) && !lodash.isUndefined(storeName)) {
    params['storeName'] = storeName;
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
  if (!lodash.isNull(status) && !lodash.isUndefined(status)) {
    params['status'] = status;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreExportMethod, params);
  }
}
