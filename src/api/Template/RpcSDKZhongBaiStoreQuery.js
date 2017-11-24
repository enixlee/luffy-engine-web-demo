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

export const RpcSDKZhongBaiStoreQueryMethod = '/sdk_zhongbai/store/query';

export const RpcSDKZhongBaiStoreQueryRpcType = 'ZBSystem';

/**
 *
 * @param storeNo |null bigint 门店号
 * @param storeName |null string 门店名称
 * @param parentStoreNo |null bigint 所属公司
 * @param district |null string 所在地区
 * @param storeType |null json 0：普通门店，1：子公司，2：测试商户总公司
 * @param status |null json 状态
 * @param pageIndex |null int 分页号
 * @param pageCount |null int 页面显示数量
 * @param sortBy |null int 排序规则0:门店编号1:地区,2：parentStoreNo
 * @param desc |null int 0：降序1:升序
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiStoreQuery (
  storeNo = null,
  storeName = null,
  parentStoreNo = null,
  district = null,
  storeType = null,
  status = null,
  pageIndex = 1,
  pageCount = 30,
  sortBy = 0,
  desc = 0) {
  tc.typeCheckString(storeName, 1, 255, true);
  tc.typeCheckString(district, 1, 32, true);
  tc.typeCheckJsonArrayChoice(storeType, [0, 1, 2], true);
  tc.typeCheckJsonArrayChoice(status, [0, 1, 2, 3, 4], true);
  tc.typeCheckNumber(pageIndex, 1, null, true);
  tc.typeCheckNumber(pageCount, 1, 100, true);
  tc.typeCheckChoice(sortBy, [0, 1, 2], true);
  tc.typeCheckChoice(desc, [0, 1], true);
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
  if (!lodash.isNull(pageIndex) && !lodash.isUndefined(pageIndex)) {
    params['pageIndex'] = pageIndex;
  }
  if (!lodash.isNull(pageCount) && !lodash.isUndefined(pageCount)) {
    params['pageCount'] = pageCount;
  }
  if (!lodash.isNull(sortBy) && !lodash.isUndefined(sortBy)) {
    params['sortBy'] = sortBy;
  }
  if (!lodash.isNull(desc) && !lodash.isUndefined(desc)) {
    params['desc'] = desc;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiStoreQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiStoreQueryMethod, params);
  }
}
