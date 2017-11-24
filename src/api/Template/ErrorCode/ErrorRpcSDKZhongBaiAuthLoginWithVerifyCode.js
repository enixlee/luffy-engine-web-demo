import {
  RpcSDKZhongBaiAuthLoginWithVerifyCodeMethod
} from '../RpcSDKZhongBaiAuthLoginWithVerifyCode';

export default {
  method: RpcSDKZhongBaiAuthLoginWithVerifyCodeMethod,
  codes: {
    dealSelf: false,
    'VERIFY_CODE_ERROR': {
      desc: '验证码已失效',
      leftButtonText: '重新获取'
    },
    'PASSWORD_INVALID': {
      desc: '用户名或密码错误',
      leftButtonText: '确定'
    },
    'USER_NOT_EXIST': {
      desc: '用户名或密码错误',
      leftButtonText: '确定'
    },
    'USER_STATUS_INVALID': {
      desc: '账号异常，请联系管理员',
      leftButtonText: '确定'
    }
  }
};
