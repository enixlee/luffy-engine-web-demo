/**
 * Created by Generator.
 * Author: Generator
 * description: 添加卡种
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardTypeAddMethod = '/sdk_zhongbai/prepaidcard/cardtype/add';

export const RpcSDKZhongBaiPrePaidCardCardTypeAddRpcType = 'ZBSystem';

/**
 *
 * @param cardPrice money_cent 卡初始金额,分
 * @param sellPrice money_cent 卡售价
 * @param cardTypeName string 卡种名称
 * @param termOfValidity int 有效期，月
 * @param singleRechargeLimitMin money_cent 单次充值限额(下限)
 * @param singleRechargeLimit money_cent 单次充值限额
 * @param moneyLimitMax money_cent 卡内最高金额
 * @param moneyLimitMin money_cent 卡内最低金额,默认0元，目前center不支持设置
 * @param cardTypeDiscountRate |null ratio 预付卡折扣，万分比
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardTypeAdd (
  cardPrice = 0,
  sellPrice = 0,
  cardTypeName,
  termOfValidity,
  singleRechargeLimitMin,
  singleRechargeLimit,
  moneyLimitMax,
  moneyLimitMin = 0,
  cardTypeDiscountRate = 10000) {
  tc.typeCheckNumber(cardPrice, null, null, false);
  tc.typeCheckNumber(sellPrice, null, null, false);
  tc.typeCheckString(cardTypeName, null, 128, false);
  tc.typeCheckNumber(termOfValidity, 0, null, false);
  tc.typeCheckNumber(singleRechargeLimitMin, null, null, false);
  tc.typeCheckNumber(singleRechargeLimit, null, null, false);
  tc.typeCheckNumber(moneyLimitMax, null, null, false);
  tc.typeCheckNumber(moneyLimitMin, null, null, false);
  let params = {};
  if (!lodash.isNull(cardPrice) && !lodash.isUndefined(cardPrice)) {
    params['cardPrice'] = cardPrice;
  }
  if (!lodash.isNull(sellPrice) && !lodash.isUndefined(sellPrice)) {
    params['sellPrice'] = sellPrice;
  }
  if (!lodash.isNull(cardTypeName) && !lodash.isUndefined(cardTypeName)) {
    params['cardTypeName'] = cardTypeName;
  }
  if (!lodash.isNull(termOfValidity) && !lodash.isUndefined(termOfValidity)) {
    params['termOfValidity'] = termOfValidity;
  }
  if (!lodash.isNull(singleRechargeLimitMin) && !lodash.isUndefined(singleRechargeLimitMin)) {
    params['singleRechargeLimitMin'] = singleRechargeLimitMin;
  }
  if (!lodash.isNull(singleRechargeLimit) && !lodash.isUndefined(singleRechargeLimit)) {
    params['singleRechargeLimit'] = singleRechargeLimit;
  }
  if (!lodash.isNull(moneyLimitMax) && !lodash.isUndefined(moneyLimitMax)) {
    params['moneyLimitMax'] = moneyLimitMax;
  }
  if (!lodash.isNull(moneyLimitMin) && !lodash.isUndefined(moneyLimitMin)) {
    params['moneyLimitMin'] = moneyLimitMin;
  }
  if (!lodash.isNull(cardTypeDiscountRate) && !lodash.isUndefined(cardTypeDiscountRate)) {
    params['cardTypeDiscountRate'] = cardTypeDiscountRate;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardTypeAddMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardTypeAddMethod, params);
  }
}
