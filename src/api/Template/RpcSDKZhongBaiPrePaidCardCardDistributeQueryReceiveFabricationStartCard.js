/**
 * Created by Generator.
 * Author: Generator
 * description: 查询要领卡批次的起始卡号
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCardMethod = '/sdk_zhongbai/prepaidcard/card_distribute/query_receive_fabrication_start_card';

export const RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCardRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId string 制卡批次号
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCard (
  fabricationBatchId) {
  tc.typeCheckString(fabricationBatchId, 1, 32, false);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCardMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCardMethod, params);
  }
}
