import {
  RpcSDKZhongBaiTransactionQueryMethod
} from '../RpcSDKZhongBaiTransactionQuery';

export default {
  method: RpcSDKZhongBaiTransactionQueryMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    }
  }
};
