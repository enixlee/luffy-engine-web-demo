/**
 * Created by Generator.
 * Author: Generator
 * description: 预付卡库存导出
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardStockExportMethod = '/sdk_zhongbai/prepaidcard/stock/export';

export const RpcSDKZhongBaiPrePaidCardStockExportRpcType = 'ZBSystem';

/**
 *
 * @param cardTypeId |null bigint 卡种编号
 * @param storeNo |null bigint 门店号
 * @param storeName |null string 门店号
 * @param isSoldOut |null int 0:未售完，1:已售完,2:所有
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardStockExport (
  cardTypeId = null,
  storeNo = null,
  storeName = null,
  isSoldOut = 0) {
  tc.typeCheckString(storeName, null, null, true);
  tc.typeCheckChoice(isSoldOut, [0, 1, 2], true);
  let params = {};
  if (!lodash.isNull(cardTypeId) && !lodash.isUndefined(cardTypeId)) {
    params['cardTypeId'] = cardTypeId;
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
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardStockExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardStockExportMethod, params);
  }
}
