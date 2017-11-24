/**
 * Created by Generator.
 * Author: Generator
 * description: 导出卡种
 */

let Vue = window.PMApp.Vue;
let Rpc = Vue.prototype.getPlugin('HttpRequest');
let debug = Vue.prototype.getPlugin('Debug');
let tc = Vue.prototype.getPlugin('TypeCheck');
let lodash = Vue.prototype.getPlugin('lodash');

export const RpcSDKZhongBaiPrePaidCardCardTypeExportMethod = '/sdk_zhongbai/prepaidcard/cardtype/export';

export const RpcSDKZhongBaiPrePaidCardCardTypeExportRpcType = 'ZBSystem';

/**
 *
 * @param merchantCardTypeId |null bigint 卡种id
 * @param cardTypeName |null string 卡种名称
 * @param status |null json 状态
 * @returns {*}
 * @constructor
 */
export function RpcSDKZhongBaiPrePaidCardCardTypeExport (
  merchantCardTypeId = null,
  cardTypeName = null,
  status = null) {
  tc.typeCheckString(cardTypeName, null, 128, true);
  tc.typeCheckJsonArrayChoice(status, [0, 1, 2, 3, 4], true);
  let params = {};
  if (!lodash.isNull(merchantCardTypeId) && !lodash.isUndefined(merchantCardTypeId)) {
    params['merchantCardTypeId'] = merchantCardTypeId;
  }
  if (!lodash.isNull(cardTypeName) && !lodash.isUndefined(cardTypeName)) {
    params['cardTypeName'] = cardTypeName;
  }
  if (!lodash.isNull(status) && !lodash.isUndefined(status)) {
    params['status'] = status;
  }
  if (debug.isProduction()) {
    return Rpc.post(RpcSDKZhongBaiPrePaidCardCardTypeExportMethod, params);
  } else {
    return Rpc.get(RpcSDKZhongBaiPrePaidCardCardTypeExportMethod, params);
  }
}
