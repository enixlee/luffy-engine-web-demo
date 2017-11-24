import {
  RpcSDKZhongBaiUserResetLoginPasswordMethod
} from '../RpcSDKZhongBaiUserResetLoginPassword';

export default {
  method: RpcSDKZhongBaiUserResetLoginPasswordMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'USER_NOT_EXIST': {
      desc: '用户已不存在，无法操作',
      leftButtonText: '确定'
    },
    'USER_NOT_HAS_MEMBER': {
      desc: '用户状态异常，操作失败',
      leftButtonText: '确定'
    },
    'CELLPHONE_INVALID': {
      desc: '用户手机号异常，操作失败',
      leftButtonText: '确定'
    },
    'OPERATE_TIME_NOT_EXPIRED': {
      desc: '10分钟内只能重置一次用户密码',
      leftButtonText: '确定'
    }
  }
};
