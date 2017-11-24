import {
  RpcSDKZhongBaiPOSMachineAddMethod
} from '../RpcSDKZhongBaiPOSMachineAdd';

export default {
  method: RpcSDKZhongBaiPOSMachineAddMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'STORE_NOT_EXIST': {
      desc: '门店不存在，无法添加',
      leftButtonText: '确定'
    },
    'STORE_STATUS_INVALID': {
      desc: '门店状态异常，无法添加POS机',
      leftButtonText: '确定'
    },
    'POS_MACHINE_EXIST': {
      desc: 'POS机终端号已存在，无需重复添加',
      leftButtonText: '确定'
    }
  }
};
