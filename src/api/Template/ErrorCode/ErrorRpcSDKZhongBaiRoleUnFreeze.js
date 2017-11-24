import {
  RpcSDKZhongBaiRoleUnFreezeMethod
} from '../RpcSDKZhongBaiRoleUnFreeze';

export default {
  method: RpcSDKZhongBaiRoleUnFreezeMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'ROLE_NOT_EXIST': {
      desc: '用户权限已不存在',
      leftButtonText: '确定'
    },
    'ROLE_STATUS_NOT_FREEZE': {
      desc: '用户权限状态异常，操作失败',
      leftButtonText: '确定'
    }
  }
};
