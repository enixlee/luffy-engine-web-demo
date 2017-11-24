import {
  RpcSDKZhongBaiPermissionModifyMethod
} from '../RpcSDKZhongBaiPermissionModify';

export default {
  method: RpcSDKZhongBaiPermissionModifyMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'KEY_WORD_EXIST': {
      desc: '权限名称已被使用，请修改',
      leftButtonText: '确定'
    }
  }
};
