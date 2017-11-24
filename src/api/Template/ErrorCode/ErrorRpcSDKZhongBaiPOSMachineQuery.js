import {
  RpcSDKZhongBaiPOSMachineQueryMethod
} from '../RpcSDKZhongBaiPOSMachineQuery';

export default {
  method: RpcSDKZhongBaiPOSMachineQueryMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限查看其它公司的POS机',
      leftButtonText: '确定'
    }
  }
};
