/**
 * Created by Generator.
 * Author: Generator
 * description: 查询消费记录
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiTransactionQueryMethod = '/sdk_zhongbai/transaction/query';

export const RpcSDKZhongBaiTransactionQueryRpcType = 'ZBSystem';

/**
 *
 * @param tradeFlowOfPayMini |null string 流水号
 * @param tradeType |null tradeTypeJsonArray 数组格式,交易类型
 * @param storeNo |null merchantNo 商户号
 * @param prePaidCardId |null prePaidCardNo 预付卡号
 * @param count |null int 查询数量
 * @param tradeSubType |null tradeSubTypeJsonArray 子类型
 * @param tradeTimeStart |null datetime 起始交易时间
 * @param tradeTimeEnd |null datetime 交易时间上限
 * @param posTerminalId |null string pos机号
 * @param isReDrew |null json 是否撤销/冲正/退货0否1是
 * @param pageIndex |null int 分页号
 * @param pageCount |null int 页面显示数量
 * @param sortBy |null int 排序规则0:tradeFlowOfPayMini1:tradeType2:prePaidCardId3:posTerminalId
 * @param desc |null int 0：降序1:升序
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiTransactionQuery (
  tradeFlowOfPayMini = null,
  tradeType = null,
  storeNo = null,
  prePaidCardId = null,
  count = null,
  tradeSubType = null,
  tradeTimeStart = null,
  tradeTimeEnd = null,
  posTerminalId = null,
  isReDrew = null,
  pageIndex = 1,
  pageCount = 30,
  sortBy = 0,
  desc = 0) {
  tc.typeCheckString(tradeFlowOfPayMini, 1, 255, true);
  tc.typeCheckNumber(count, 1, 100, true);
  tc.typeCheckDateString(tradeTimeStart, true);
  tc.typeCheckDateString(tradeTimeEnd, true);
  tc.typeCheckString(posTerminalId, null, null, true);
  tc.typeCheckJsonArrayChoice(isReDrew, [0, 1], true);
  tc.typeCheckNumber(pageIndex, 1, null, true);
  tc.typeCheckNumber(pageCount, 1, 100, true);
  tc.typeCheckChoice(sortBy, [0, 1, 2, 3], true);
  tc.typeCheckChoice(desc, [0, 1], true);
  let params = {};
  if (!lodash.isNull(tradeFlowOfPayMini) && !lodash.isUndefined(tradeFlowOfPayMini)) {
    params['tradeFlowOfPayMini'] = tradeFlowOfPayMini;
  }
  if (!lodash.isNull(tradeType) && !lodash.isUndefined(tradeType)) {
    params['tradeType'] = tradeType;
  }
  if (!lodash.isNull(storeNo) && !lodash.isUndefined(storeNo)) {
    params['storeNo'] = storeNo;
  }
  if (!lodash.isNull(prePaidCardId) && !lodash.isUndefined(prePaidCardId)) {
    params['prePaidCardId'] = prePaidCardId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
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
  if (!lodash.isNull(isReDrew) && !lodash.isUndefined(isReDrew)) {
    params['isReDrew'] = isReDrew;
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
    return Rpc.post(RpcSDKZhongBaiTransactionQueryMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiTransactionQueryMethod, params);
  }
}
