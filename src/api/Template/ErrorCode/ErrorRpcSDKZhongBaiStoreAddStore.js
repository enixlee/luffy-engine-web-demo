import {
  RpcSDKZhongBaiStoreAddStoreMethod
} from '../RpcSDKZhongBaiStoreAddStore';

export default {
  method: RpcSDKZhongBaiStoreAddStoreMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'STORE_NUMBER_EXIST': {
      desc: '门店编号已被使用，请修改',
      leftButtonText: '确定'
    },
    'STORE_NAME_EXIST': {
      desc: '门店名称已被使用，请修改',
      leftButtonText: '确定'
    },
    'PARENT_STORE_NOT_EXIST': {
      desc: '所属公司异常，操作失败',
      leftButtonText: '确定'
    },
    'PARENT_STORE_STATUS_INVALID': {
      desc: '所属公司异常，操作失败',
      leftButtonText: '确定'
    },
    'BRAND_NOT_EXIST': {
      desc: '该品牌已不存在，操作失败',
      leftButtonText: '确定'
    },
    'BRAND_NOT_BELONG_2_SUBCOMPANY': {
      desc: '该品牌不属于子公司，操作失败',
      leftButtonText: '确定'
    }
  }
};
