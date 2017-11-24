/**
 * Created by Generator.
 * Author: Generator
 * description: 申请制卡
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardFabricationApplyMethod = '/sdk_zhongbai/prepaidcard/fabrication/apply';

export const RpcSDKZhongBaiPrePaidCardFabricationApplyRpcType = 'ZBSystem';

/**
 *
 * @param cardTypeId bigint 卡种ID
 * @param count int 制卡数量
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardFabricationApply (
  cardTypeId,
  count) {
  tc.typeCheckNumber(count, 1, null, false);
  let params = {};
  if (!lodash.isNull(cardTypeId) && !lodash.isUndefined(cardTypeId)) {
    params['cardTypeId'] = cardTypeId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardFabricationApplyMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardFabricationApplyMethod, params);
  }
}
