/**
 * Created by Generator.
 * Author: Generator
 * description: 查询领取记录
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeRecordQueryMethod = '/sdk_zhongbai/prepaidcard/card_distribute/record/query';

export const RpcSDKZhongBaiPrePaidCardCardDistributeRecordQueryRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId |null string 制卡批次号
 * @param cardTypeId |null bigint 卡种ID
 * @param receiveStatus |null json 领取状态，1：已领卡2：正在领卡3:领卡后退回
 * @param pageIndex |null int 分页号
 * @param pageCount |null int 页面显示数量
 * @param sortBy |null int 排序规则0:制卡批次1：卡种2:时间
 * @param desc |null int 0：降序1:升序
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeRecordQuery (
  fabricationBatchId = null,
  cardTypeId = null,
  receiveStatus = null,
  pageIndex = 1,
  pageCount = 30,
  sortBy = 0,
  desc = 0) {
  tc.typeCheckString(fabricationBatchId, 1, 32, true);
  tc.typeCheckJsonArrayChoice(receiveStatus, [1, 2, 3], true);
  tc.typeCheckNumber(pageIndex, 1, null, true);
  tc.typeCheckNumber(pageCount, 1, 100, true);
  tc.typeCheckChoice(sortBy, [0, 1, 2], true);
  tc.typeCheckChoice(desc, [0, 1], true);
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
  if (!lodash.isNull(pageIndex) && !lodash.isUndefined(pageIndex)) {
    params['pageIndex'] = pageIndex;
  }
  if (!lodash.isNull(pageCount) && !lodash.isUndefined(pageCount)) {
    params['pageCount'] = pageCount;
  }
  if (!lodash.isNull(sortBy) && !lodash.isUndefined(sortBy)) {
    params['sortBy'] = sortBy;
  }
  if (!lodash.isNull(desc) && !lodash.isUndefined(desc)) {
    params['desc'] = desc;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeRecordQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeRecordQueryMethod, params);
  }
}
