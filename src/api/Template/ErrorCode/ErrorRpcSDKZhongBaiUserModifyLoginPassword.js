import {
  RpcSDKZhongBaiUserModifyLoginPasswordMethod
} from '../RpcSDKZhongBaiUserModifyLoginPassword';

export default {
  method: RpcSDKZhongBaiUserModifyLoginPasswordMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'CELLPHONE_NOT_EXIST': {
      desc: '用户手机号不存在，操作失败',
      leftButtonText: '确定'
    },
    'VERIFY_CODE_ERROR': {
      desc: '手机验证码错误',
      leftButtonText: '确定'
    }
  }
};
