import {
  RpcSDKZhongBaiRoleAddMethod
} from '../RpcSDKZhongBaiRoleAdd';

export default {
  method: RpcSDKZhongBaiRoleAddMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'ROLE_NAME_EXIST': {
      desc: '该权限角色已存在，无需重复添加',
      leftButtonText: '确定'
    }
  }
};
