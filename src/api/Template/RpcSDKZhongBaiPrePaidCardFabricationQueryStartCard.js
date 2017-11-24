/**
 * Created by Generator.
 * Author: Generator
 * description: 实卡起始id
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardFabricationQueryStartCardMethod = '/sdk_zhongbai/prepaidcard/fabrication/query_start_card';

export const RpcSDKZhongBaiPrePaidCardFabricationQueryStartCardRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId string 制卡批次号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardFabricationQueryStartCard (
  fabricationBatchId) {
  tc.typeCheckString(fabricationBatchId, 1, 32, false);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardFabricationQueryStartCardMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardFabricationQueryStartCardMethod, params);
  }
}
