/**
 * Created by Generator.
 * Author: Generator
 * description: 导出pos机器
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPOSMachineExportMethod = '/sdk_zhongbai/pos_machine/export';

export const RpcSDKZhongBaiPOSMachineExportRpcType = 'ZBSystem';

/**
 *
 * @param storeNo |null bigint 门店号
 * @param posMachineNo |null string pos机编号
 * @param status |null json 状态
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPOSMachineExport (
  storeNo = null,
  posMachineNo = null,
  status = null) {
  tc.typeCheckString(posMachineNo, 1, 32, true);
  tc.typeCheckJsonArrayChoice(status, [0, 1, 2, 3, 4], true);
  let params = {};
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(posMachineNo) && !lodash.isUndefined(posMachineNo)) {
    params['posMachineNo'] = posMachineNo;
  }
  if (!lodash.isNull(status) && !lodash.isUndefined(status)) {
    params['status'] = status;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPOSMachineExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPOSMachineExportMethod, params);
  }
}
