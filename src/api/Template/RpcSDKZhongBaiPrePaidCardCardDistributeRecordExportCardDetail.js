/**
 * Created by Generator.
 * Author: Generator
 * description: 导出领取记录卡号详情
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetailMethod = '/sdk_zhongbai/prepaidcard/card_distribute/export_card_detail';

export const RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetailRpcType = 'ZBSystem';

/**
 *
 * @param ID string 领取记录id
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetail (
  ID) {
  tc.typeCheckString(ID, 1, 32, false);
  let params = {};
  if (!lodash.isNull(ID) && !lodash.isUndefined(ID)) {
    params['ID'] = ID;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetailMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetailMethod, params);
  }
}
