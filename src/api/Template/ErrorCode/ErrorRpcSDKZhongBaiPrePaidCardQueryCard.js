import {
  RpcSDKZhongBaiPrePaidCardQueryCardMethod
} from '../RpcSDKZhongBaiPrePaidCardQueryCard';

export default {
  method: RpcSDKZhongBaiPrePaidCardQueryCardMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'PREPAIDCARD_NOT_EXIST': {
      desc: '预付卡不存在',
      leftButtonText: '确定'
    }
  }
};
