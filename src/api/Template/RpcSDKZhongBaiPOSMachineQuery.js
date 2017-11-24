/**
 * Created by Generator.
 * Author: Generator
 * description: 查询pos机器
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPOSMachineQueryMethod = '/sdk_zhongbai/pos_machine/query';

export const RpcSDKZhongBaiPOSMachineQueryRpcType = 'ZBSystem';

/**
 *
 * @param storeNo |null bigint 门店号
 * @param storeName |null string 门店名称
 * @param posMachineNo |null string pos机编号
 * @param posMachineMerchantNo |null string pos机编号
 * @param posMachineUnionPayNo |null string pos机银商编号
 * @param posMachineUnionPayMerchantNo |null string pos机银商商户号
 * @param status |null json 状态
 * @param pageIndex |null int 分页号
 * @param pageCount |null int 页面显示数量
 * @param sortBy |null int 排序规则0:ID1:StoreNo
 * @param desc |null int 0：降序1:升序
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPOSMachineQuery (
  storeNo = null,
  storeName = null,
  posMachineNo = null,
  posMachineMerchantNo = null,
  posMachineUnionPayNo = null,
  posMachineUnionPayMerchantNo = null,
  status = null,
  pageIndex = 1,
  pageCount = 30,
  sortBy = 0,
  desc = 0) {
  tc.typeCheckString(storeName, 1, 128, true);
  tc.typeCheckString(posMachineNo, 1, 32, true);
  tc.typeCheckString(posMachineMerchantNo, 1, 32, true);
  tc.typeCheckString(posMachineUnionPayNo, 1, 32, true);
  tc.typeCheckString(posMachineUnionPayMerchantNo, 1, 32, true);
  tc.typeCheckJsonArrayChoice(status, [0, 1, 2, 3, 4], true);
  tc.typeCheckNumber(pageIndex, 1, null, true);
  tc.typeCheckNumber(pageCount, 1, 100, true);
  tc.typeCheckChoice(sortBy, [0, 1], true);
  tc.typeCheckChoice(desc, [0, 1], true);
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(storeName) && !lodash.isUndefined(storeName)) {
    params['storeName'] = storeName;
  }
  if (!lodash.isNull(posMachineNo) && !lodash.isUndefined(posMachineNo)) {
    params['posMachineNo'] = posMachineNo;
  }
  if (!lodash.isNull(posMachineMerchantNo) && !lodash.isUndefined(posMachineMerchantNo)) {
    params['posMachineMerchantNo'] = posMachineMerchantNo;
  }
  if (!lodash.isNull(posMachineUnionPayNo) && !lodash.isUndefined(posMachineUnionPayNo)) {
    params['posMachineUnionPayNo'] = posMachineUnionPayNo;
  }
  if (!lodash.isNull(posMachineUnionPayMerchantNo) && !lodash.isUndefined(posMachineUnionPayMerchantNo)) {
    params['posMachineUnionPayMerchantNo'] = posMachineUnionPayMerchantNo;
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
    return Rpc.post(RpcSDKZhongBaiPOSMachineQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPOSMachineQueryMethod, params);
  }
}
