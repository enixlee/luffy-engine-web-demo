import {
  RpcSDKZhongBaiStoreUnFreezeMethod
} from '../RpcSDKZhongBaiStoreUnFreeze';

export default {
  method: RpcSDKZhongBaiStoreUnFreezeMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'STORE_NOT_EXIST': {
      desc: '门店已不存在，无法操作',
      leftButtonText: '确定'
    },
    'STORE_STATUS_NOT_FREEZE': {
      desc: '门店状态异常，操作失败',
      leftButtonText: '确定'
    }
  }
};
