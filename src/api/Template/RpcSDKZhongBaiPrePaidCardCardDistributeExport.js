/**
 * Created by Generator.
 * Author: Generator
 * description: 导出卡领取情况
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeExportMethod = '/sdk_zhongbai/prepaidcard/card_distribute/export';

export const RpcSDKZhongBaiPrePaidCardCardDistributeExportRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId |null string 制卡批次号
 * @param cardTypeId |null bigint 卡种ID
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeExport (
  fabricationBatchId = null,
  cardTypeId = null) {
  tc.typeCheckString(fabricationBatchId, 1, 32, true);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (!lodash.isNull(cardTypeId) && !lodash.isUndefined(cardTypeId)) {
    params['cardTypeId'] = cardTypeId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeExportMethod, params);
  }
}
