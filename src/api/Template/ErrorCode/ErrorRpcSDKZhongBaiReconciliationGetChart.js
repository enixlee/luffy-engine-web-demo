import {
  RpcSDKZhongBaiReconciliationGetChartMethod
} from '../RpcSDKZhongBaiReconciliationGetChart';

export default {
  method: RpcSDKZhongBaiReconciliationGetChartMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'NO_CHARTS': {
      desc: '报表生成失败',
      leftButtonText: '确定'
    }
  }
};
