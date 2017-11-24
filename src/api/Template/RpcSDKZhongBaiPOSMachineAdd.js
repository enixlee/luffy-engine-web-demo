/**
 * Created by Generator.
 * Author: Generator
 * description: 添加pos机器
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPOSMachineAddMethod = '/sdk_zhongbai/pos_machine/add';

export const RpcSDKZhongBaiPOSMachineAddRpcType = 'ZBSystem';

/**
 *
 * @param storeNo bigint 门店号
 * @param posMachineNo string pos机编号
 * @param posMerchantNo |null string pos机商户编号
 * @param posMachineUnionPayNo |null string pos机银联编号
 * @param posMachineUnionPayMerchantNo |null string pos机银联商户号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPOSMachineAdd (
  storeNo,
  posMachineNo,
  posMerchantNo = null,
  posMachineUnionPayNo = null,
  posMachineUnionPayMerchantNo = null) {
  tc.typeCheckString(posMachineNo, 1, 32, false);
  tc.typeCheckString(posMerchantNo, 1, 32, true);
  tc.typeCheckString(posMachineUnionPayNo, 1, 32, true);
  tc.typeCheckString(posMachineUnionPayMerchantNo, 1, 32, true);
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(posMachineNo) && !lodash.isUndefined(posMachineNo)) {
    params['posMachineNo'] = posMachineNo;
  }
  if (!lodash.isNull(posMerchantNo) && !lodash.isUndefined(posMerchantNo)) {
    params['posMerchantNo'] = posMerchantNo;
  }
  if (!lodash.isNull(posMachineUnionPayNo) && !lodash.isUndefined(posMachineUnionPayNo)) {
    params['posMachineUnionPayNo'] = posMachineUnionPayNo;
  }
  if (!lodash.isNull(posMachineUnionPayMerchantNo) && !lodash.isUndefined(posMachineUnionPayMerchantNo)) {
    params['posMachineUnionPayMerchantNo'] = posMachineUnionPayMerchantNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPOSMachineAddMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPOSMachineAddMethod, params);
  }
}
