import {
  RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCardMethod
} from '../RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCard';

export default {
  method: RpcSDKZhongBaiPrePaidCardCardDistributeQueryReceiveFabricationStartCardMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'FABRICATION_NOT_EXIST': {
      desc: '当前领卡批次不存在',
      leftButtonText: '确定'
    },
    'FABRICATION_HAS_NONE_CARD_2_RECEIVE': {
      desc: '该批次的预付卡已领完',
      leftButtonText: '确定'
    }
  }
};
