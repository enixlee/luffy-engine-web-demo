import {
  RpcSDKZhongBaiStoreBrandDeleteMethod
} from '../RpcSDKZhongBaiStoreBrandDelete';

export default {
  method: RpcSDKZhongBaiStoreBrandDeleteMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'BRAND_NOT_EXIST': {
      desc: '该品牌已不存在',
      leftButtonText: '确定'
    }
  }
};
