import {
  RpcSDKZhongBaiPermissionAddMethod
} from '../RpcSDKZhongBaiPermissionAdd';

export default {
  method: RpcSDKZhongBaiPermissionAddMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    }
  }
};
