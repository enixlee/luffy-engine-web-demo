/**
 * Created by Generator.
 * Author: Generator
 * description: 确认收到实卡
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCardMethod = '/sdk_zhongbai/prepaidcard/fabrication/receive_entity_card';

export const RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCardRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId string 制卡批次号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCard (
  fabricationBatchId) {
  tc.typeCheckString(fabricationBatchId, 1, 32, false);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCardMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCardMethod, params);
  }
}
