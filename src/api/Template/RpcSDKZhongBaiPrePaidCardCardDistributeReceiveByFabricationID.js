/**
 * Created by Generator.
 * Author: Generator
 * description: 按制卡批次领卡（领到子公司）
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationIDMethod = '/sdk_zhongbai/prepaidcard/card_distribute/receive_by_fabricationid';

export const RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationIDRpcType = 'ZBSystem';

/**
 *
 * @param fabricationBatchId string 制卡批次号
 * @param count int 领取张数
 * @param receiveStoreNo bigint 领卡门店
 * @param fromStoreNo |null bigint 卡片来源门店门店
 * @param receiveUserId bigint 领卡人
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationID (
  fabricationBatchId,
  count,
  receiveStoreNo,
  fromStoreNo = null,
  receiveUserId) {
  tc.typeCheckString(fabricationBatchId, 1, 32, false);
  tc.typeCheckNumber(count, 1, null, false);
  let params = {};
  if (!lodash.isNull(fabricationBatchId) && !lodash.isUndefined(fabricationBatchId)) {
    params['fabricationBatchId'] = fabricationBatchId;
  }
  if (!lodash.isNull(count) && !lodash.isUndefined(count)) {
    params['count'] = count;
  }
  if (!lodash.isNull(receiveStoreNo) && !lodash.isUndefined(receiveStoreNo)) {
    params['receiveStoreNo'] = receiveStoreNo;
  }
  if (!lodash.isNull(fromStoreNo) && !lodash.isUndefined(fromStoreNo)) {
    params['fromStoreNo'] = fromStoreNo;
  }
  if (!lodash.isNull(receiveUserId) && !lodash.isUndefined(receiveUserId)) {
    params['receiveUserId'] = receiveUserId;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationIDMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationIDMethod, params);
  }
}
