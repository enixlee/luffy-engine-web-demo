/**
 * Created by Generator.
 * Author: Generator
 * description: 删除pos机器
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPOSMachineDeleteMethod = '/sdk_zhongbai/pos_machine/delete';

export const RpcSDKZhongBaiPOSMachineDeleteRpcType = 'ZBSystem';

/**
 *
 * @param posMachineNo string pos机编号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPOSMachineDelete (
  posMachineNo) {
  tc.typeCheckString(posMachineNo, 1, 32, false);
  let params = {};
  if (!lodash.isNull(posMachineNo) && !lodash.isUndefined(posMachineNo)) {
    params['posMachineNo'] = posMachineNo;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPOSMachineDeleteMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPOSMachineDeleteMethod, params);
  }
}
