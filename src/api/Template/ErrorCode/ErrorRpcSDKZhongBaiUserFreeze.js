import {
  RpcSDKZhongBaiUserFreezeMethod
} from '../RpcSDKZhongBaiUserFreeze';

export default {
  method: RpcSDKZhongBaiUserFreezeMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'SER_STATUS_NOT_NORMAL': {
      desc: '用户状态异常，操作失败',
      leftButtonText: '确定'
    },
    'USER_NOT_EXIST': {
      desc: '用户已不存在，无法操作',
      leftButtonText: '确定'
    }
  }
};
