import {
  RpcSDKZhongBaiRoleModifyMethod
} from '../RpcSDKZhongBaiRoleModify';

export default {
  method: RpcSDKZhongBaiRoleModifyMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'ROLE_NOT_EXIST': {
      desc: '角色权限不存在，无法修改',
      leftButtonText: '确定'
    },
    'CONFIG_ROLE_CON_NOT_MODIFY': {
      desc: '系统默认角色不能修改',
      leftButtonText: '确定'
    }
  }
};
