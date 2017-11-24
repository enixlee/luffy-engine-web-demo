/**
 * Created by Generator.
 * Author: Generator
 * description: 导出制卡信息去制卡（需要在make后）
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardFabricationExportForFabricateMethod = '/sdk_zhongbai/prepaidcard/fabrication/export_4_fabricate';

export const RpcSDKZhongBaiPrePaidCardFabricationExportForFabricateRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId string 制卡批次号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardFabricationExportForFabricate (
  fabricationBatchId) {
  tc.typeCheckString(fabricationBatchId, 1, 32, false);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardFabricationExportForFabricateMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardFabricationExportForFabricateMethod, params);
  }
}
