/**
 * Created by Generator.
 * Author: Generator
 * description: 预付卡库存查询
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardStockQueryMethod = '/sdk_zhongbai/prepaidcard/stock/query';

export const RpcSDKZhongBaiPrePaidCardStockQueryRpcType = 'ZBSystem';

/**
 *
 * @param cardTypeId |null bigint 卡种编号
 * @param cardTypeName |null string 卡种编号
 * @param storeNo |null bigint 门店号
 * @param storeName |null string 门店号
 * @param isSoldOut |null int 0:未售完，1:已售完,2:所有
 * @param pageIndex |null int 分页号
 * @param pageCount |null int 页面显示数量
 * @param sortBy |null int 排序规则0:领卡流水号1:门店号,2：卡种
 * @param desc |null int 0：降序1:升序
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardStockQuery (
  cardTypeId = null,
  cardTypeName = null,
  storeNo = null,
  storeName = null,
  isSoldOut = 0,
  pageIndex = 1,
  pageCount = 30,
  sortBy = 0,
  desc = 0) {
  tc.typeCheckString(cardTypeName, null, null, true);
  tc.typeCheckString(storeName, null, null, true);
  tc.typeCheckChoice(isSoldOut, [0, 1, 2], true);
  tc.typeCheckNumber(pageIndex, 1, null, true);
  tc.typeCheckNumber(pageCount, 1, 100, true);
  tc.typeCheckChoice(sortBy, [0, 1, 2], true);
  tc.typeCheckChoice(desc, [0, 1], true);
  let params = {};
  if (!lodash.isNull(cardTypeId) && !lodash.isUndefined(cardTypeId)) {
    params['cardTypeId'] = cardTypeId;
  }
  if (!lodash.isNull(cardTypeName) && !lodash.isUndefined(cardTypeName)) {
    params['cardTypeName'] = cardTypeName;
  }
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(storeName) && !lodash.isUndefined(storeName)) {
    params['storeName'] = storeName;
  }
  if (!lodash.isNull(isSoldOut) && !lodash.isUndefined(isSoldOut)) {
    params['isSoldOut'] = isSoldOut;
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
    return Rpc.post(RpcSDKZhongBaiPrePaidCardStockQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardStockQueryMethod, params);
  }
}
