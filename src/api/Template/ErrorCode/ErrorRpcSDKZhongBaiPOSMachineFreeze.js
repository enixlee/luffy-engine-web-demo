import {
  RpcSDKZhongBaiPOSMachineFreezeMethod
} from '../RpcSDKZhongBaiPOSMachineFreeze';

export default {
  method: RpcSDKZhongBaiPOSMachineFreezeMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'POS_MACHINE_NOT_EXIST': {
      desc: 'POS机已不存在',
      leftButtonText: '确定'
    },
    'POS_MACHINE_STATUS_NOT_NORMAL': {
      desc: 'POS机状态异常，操作失败',
      leftButtonText: '确定'
    },
    'ORIGIN_POS_MACHINE_NOT_EXIST': {
      desc: 'POS机已不存在',
      leftButtonText: '确定'
    }
  }
};
