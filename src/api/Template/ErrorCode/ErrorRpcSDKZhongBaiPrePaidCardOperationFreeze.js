import {
  RpcSDKZhongBaiPrePaidCardOperationFreezeMethod
} from '../RpcSDKZhongBaiPrePaidCardOperationFreeze';

export default {
  method: RpcSDKZhongBaiPrePaidCardOperationFreezeMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'PREPAIDCARD_NOT_EXIST': {
      desc: '卡号不存在',
      leftButtonText: '确定'
    },
    'PREPAIDCARD_NOT_BELONG_2_THIS_STORE': {
      desc: '预付卡不属于当前门店，无法操作',
      leftButtonText: '确定'
    },
    'PREPAIDCARD_STATUS_NOT_NORMAL': {
      desc: '预付卡状态异常，无法操作',
      leftButtonText: '确定'
    }
  }
};
