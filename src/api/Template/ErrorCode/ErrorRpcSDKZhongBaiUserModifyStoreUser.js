import {
  RpcSDKZhongBaiUserModifyStoreUserMethod
} from '../RpcSDKZhongBaiUserModifyStoreUser';

export default {
  method: RpcSDKZhongBaiUserModifyStoreUserMethod,
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
    'USER_NAME_EXIST': {
      desc: '用户名已被使用，请修改',
      leftButtonText: '确定'
    },
    'STORE_NOT_EXIST': {
      desc: '门店已不存在，操作失败',
      leftButtonText: '确定'
    }
  }
};
