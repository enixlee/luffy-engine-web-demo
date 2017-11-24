import {
  RpcSDKZhongBaiPrePaidCardOperationUnFreezeMethod
} from '../RpcSDKZhongBaiPrePaidCardOperationUnFreeze';

export default {
  method: RpcSDKZhongBaiPrePaidCardOperationUnFreezeMethod,
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
    'PREPAIDCARD_NOT_BEEN_FROZEN': {
      desc: '预付卡状态异常，操作失败',
      leftButtonText: '确定'
    },
    'ORIGIN_PREPAIDCARD_NOT_EXIST': {
      desc: '卡号不存在',
      leftButtonText: '确定'
    },
    'ORIGIN_PREPAIDCARD_NOT_BEEN_FROZEN': {
      desc: '预付卡状态异常，操作失败',
      leftButtonText: '确定'
    }
  }
};
