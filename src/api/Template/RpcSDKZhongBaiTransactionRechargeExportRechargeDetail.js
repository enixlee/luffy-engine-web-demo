/**
 * Created by Generator.
 * Author: Generator
 * description: 导出充值记录
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiTransactionRechargeExportRechargeDetailMethod = '/sdk_zhongbai/transaction/recharge/export_recharge_detail';

export const RpcSDKZhongBaiTransactionRechargeExportRechargeDetailRpcType = 'ZBSystem';

/**
 *
 * @param tradeFlowOfPayMini |null string 流水号
 * @param storeNo |null bigint 商户号
 * @param prePaidCardId |null prePaidCardNo 预付卡号
 * @param tradeSubType |null tradeSubTypeJsonArray 子类型
 * @param tradeTimeStart |null datetime 起始交易时间
 * @param tradeTimeEnd |null datetime 交易时间上限
 * @param posTerminalId |null string pos机号
 * @param subCompanyStoreNo |null bigint 子公司门店号
 * @param tradeChannel |null json 交易渠道
 * @param tradeMethod |null json 交易方式
 * @param chartType |null int 1:在线充值2:后台充值
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiTransactionRechargeExportRechargeDetail (
  tradeFlowOfPayMini = null,
  storeNo = null,
  prePaidCardId = null,
  tradeSubType = null,
  tradeTimeStart = null,
  tradeTimeEnd = null,
  posTerminalId = null,
  subCompanyStoreNo = null,
  tradeChannel = null,
  tradeMethod = null,
  chartType = null) {
  tc.typeCheckString(tradeFlowOfPayMini, 1, 255, true);
  tc.typeCheckDateString(tradeTimeStart, true);
  tc.typeCheckDateString(tradeTimeEnd, true);
  tc.typeCheckString(posTerminalId, null, null, true);
  tc.typeCheckJsonArrayChoice(tradeChannel, [1, 2, 3, 4, 10], true);
  tc.typeCheckJsonArrayChoice(tradeMethod, [1, 2, 3, 4, 5], true);
  tc.typeCheckChoice(chartType, [1, 2], true);
  let params = {};
  if (!lodash.isNull(tradeFlowOfPayMini) && !lodash.isUndefined(tradeFlowOfPayMini)) {
    params['tradeFlowOfPayMini'] = tradeFlowOfPayMini;
  }
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (!lodash.isNull(tradeSubType) && !lodash.isUndefined(tradeSubType)) {
    params['tradeSubType'] = tradeSubType;
  }
  if (!lodash.isNull(tradeTimeStart) && !lodash.isUndefined(tradeTimeStart)) {
    params['tradeTimeStart'] = tradeTimeStart;
  }
  if (!lodash.isNull(tradeTimeEnd) && !lodash.isUndefined(tradeTimeEnd)) {
    params['tradeTimeEnd'] = tradeTimeEnd;
  }
  if (!lodash.isNull(posTerminalId) && !lodash.isUndefined(posTerminalId)) {
    params['posTerminalId'] = posTerminalId;
  }
  if (!lodash.isNull(subCompanyStoreNo) && !lodash.isUndefined(subCompanyStoreNo)) {
    params['subCompanyStoreNo'] = subCompanyStoreNo;
  }
  if (!lodash.isNull(tradeChannel) && !lodash.isUndefined(tradeChannel)) {
    params['tradeChannel'] = tradeChannel;
  }
  if (!lodash.isNull(tradeMethod) && !lodash.isUndefined(tradeMethod)) {
    params['tradeMethod'] = tradeMethod;
  }
  if (!lodash.isNull(chartType) && !lodash.isUndefined(chartType)) {
    params['chartType'] = chartType;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiTransactionRechargeExportRechargeDetailMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiTransactionRechargeExportRechargeDetailMethod, params);
  }
}
