/**
 * Created by Generator.
 * Author: Generator
 * description: 查询
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardOperationQueryMethod = '/sdk_zhongbai/prepaidcard/operation/query';

export const RpcSDKZhongBaiPrePaidCardOperationQueryRpcType = 'ZBSystem';

/**
 *
 * @param prePaidCardId |null bigint 卡号
 * @param storeNo |null bigint 门店号
 * @param isSold |null json 是否售出
 * @param isReceived |null json 是否领取
 * @param status |null json 状态
 * @param startPrePaidCardId |null bigint 起始卡号
 * @param count |null int 张数，最大100张
 * @param pageIndex |null int 分页号
 * @param pageCount |null int 页面显示数量
 * @param sortBy |null int 排序规则0:门店号,1:卡号
 * @param desc |null int 0：降序1:升序
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardOperationQuery (
  prePaidCardId = null,
  storeNo = null,
  isSold = null,
  isReceived = null,
  status = null,
  startPrePaidCardId = null,
  count = null,
  pageIndex = 1,
  pageCount = 30,
  sortBy = 0,
  desc = 0) {
  tc.typeCheckJsonArrayChoice(isSold, [0, 1], true);
  tc.typeCheckJsonArrayChoice(isReceived, [0, 1], true);
  tc.typeCheckJsonArrayChoice(status, [0, 1, 2, 3, 4], true);
  tc.typeCheckNumber(count, 1, 100, true);
  tc.typeCheckNumber(pageIndex, 1, null, true);
  tc.typeCheckNumber(pageCount, 1, 100, true);
  tc.typeCheckChoice(sortBy, [0, 1], true);
  tc.typeCheckChoice(desc, [0, 1], true);
  let params = {};
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(isSold) && !lodash.isUndefined(isSold)) {
    params['isSold'] = isSold;
  }
  if (!lodash.isNull(isReceived) && !lodash.isUndefined(isReceived)) {
    params['isReceived'] = isReceived;
  }
  if (!lodash.isNull(status) && !lodash.isUndefined(status)) {
    params['status'] = status;
  }
  if (!lodash.isNull(startPrePaidCardId) && !lodash.isUndefined(startPrePaidCardId)) {
    params['startPrePaidCardId'] = startPrePaidCardId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
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
    return Rpc.post(RpcSDKZhongBaiPrePaidCardOperationQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardOperationQueryMethod, params);
  }
}
