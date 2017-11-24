/**
 * Created by Generator.
 * Author: Generator
 * description: 导出制卡申请信息
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardFabricationExportMethod = '/sdk_zhongbai/prepaidcard/fabrication/export';

export const RpcSDKZhongBaiPrePaidCardFabricationExportRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId |null string 制卡批次号
 * @param cardTypeId |null bigint 卡种ID
 * @param cardTypeName |null string 卡种名称
 * @param complete |null json 完成状态:0未完成1正在领实卡2完成
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardFabricationExport (
  fabricationBatchId = null,
  cardTypeId = null,
  cardTypeName = null,
  complete = null) {
  tc.typeCheckString(fabricationBatchId, 1, 32, true);
  tc.typeCheckString(cardTypeName, null, null, true);
  tc.typeCheckJsonArrayChoice(complete, [0, 1, 2], true);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (!lodash.isNull(cardTypeId) && !lodash.isUndefined(cardTypeId)) {
    params['cardTypeId'] = cardTypeId;
  }
  if (!lodash.isNull(cardTypeName) && !lodash.isUndefined(cardTypeName)) {
    params['cardTypeName'] = cardTypeName;
  }
  if (!lodash.isNull(complete) && !lodash.isUndefined(complete)) {
    params['complete'] = complete;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardFabricationExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardFabricationExportMethod, params);
  }
}
