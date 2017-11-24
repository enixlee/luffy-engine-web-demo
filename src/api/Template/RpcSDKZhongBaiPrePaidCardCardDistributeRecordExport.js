/**
 * Created by Generator.
 * Author: Generator
 * description: 导出领取记录
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportMethod = '/sdk_zhongbai/prepaidcard/card_distribute/record/export';

export const RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId |null string 制卡批次号
 * @param cardTypeId |null bigint 卡种ID
 * @param receiveStatus |null json 领取状态，1：已领卡2：正在领卡3:领卡后退回
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeRecordExport (
  fabricationBatchId = null,
  cardTypeId = null,
  receiveStatus = null) {
  tc.typeCheckString(fabricationBatchId, 1, 32, true);
  tc.typeCheckJsonArrayChoice(receiveStatus, [1, 2, 3], true);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (!lodash.isNull(cardTypeId) && !lodash.isUndefined(cardTypeId)) {
    params['cardTypeId'] = cardTypeId;
  }
  if (!lodash.isNull(receiveStatus) && !lodash.isUndefined(receiveStatus)) {
    params['receiveStatus'] = receiveStatus;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportMethod, params);
  }
}
