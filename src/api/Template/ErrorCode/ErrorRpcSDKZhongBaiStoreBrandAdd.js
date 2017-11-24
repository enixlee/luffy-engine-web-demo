import {
  RpcSDKZhongBaiStoreBrandAddMethod
} from '../RpcSDKZhongBaiStoreBrandAdd';

export default {
  method: RpcSDKZhongBaiStoreBrandAddMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'BRAND_NAME_EXIST': {
      desc: '品牌已存在，无需重复添加',
      leftButtonText: '确定'
    }
  }
};
