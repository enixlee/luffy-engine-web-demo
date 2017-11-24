import {
  RpcSDKZhongBaiPOSMachineDeleteMethod
} from '../RpcSDKZhongBaiPOSMachineDelete';

export default {
  method: RpcSDKZhongBaiPOSMachineDeleteMethod,
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
    'ORIGIN_POS_MACHINE_NOT_EXIST': {
      desc: 'POS机已不存在',
      leftButtonText: '确定'
    }
  }
};
