import {
  RpcSDKZhongBaiStoreModifyMethod
} from '../RpcSDKZhongBaiStoreModify';

export default {
  method: RpcSDKZhongBaiStoreModifyMethod,
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
    'STORE_NAME_EXIST': {
      desc: '门店名称已被使用，请修改',
      leftButtonText: '确定'
    }
  }
};
