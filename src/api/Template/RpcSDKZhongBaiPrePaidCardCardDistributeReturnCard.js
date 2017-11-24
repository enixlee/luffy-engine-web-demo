/**
 * Created by Generator.
 * Author: Generator
 * description: 退卡
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeReturnCardMethod = '/sdk_zhongbai/prepaidcard/card_distribute/return_card';

export const RpcSDKZhongBaiPrePaidCardCardDistributeReturnCardRpcType = 'ZBSystem';

/**
 *
 * @param ID bigint 领卡流水号
 * @param startPrePaidCardNo bigint 开始的卡号
 * @param count int 退卡的数量
 * @param returnUserId bigint 退卡人的用户id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeReturnCard (
  ID,
  startPrePaidCardNo,
  count,
  returnUserId) {
  tc.typeCheckNumber(count, null, null, false);
  let params = {};
  if (!lodash.isNull(ID) && !lodash.isUndefined(ID)) {
    params['ID'] = ID;
  }
  if (!lodash.isNull(startPrePaidCardNo) && !lodash.isUndefined(startPrePaidCardNo)) {
    params['startPrePaidCardNo'] = startPrePaidCardNo;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
  }
  if (!lodash.isNull(returnUserId) && !lodash.isUndefined(returnUserId)) {
    params['returnUserId'] = returnUserId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeReturnCardMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeReturnCardMethod, params);
  }
}
