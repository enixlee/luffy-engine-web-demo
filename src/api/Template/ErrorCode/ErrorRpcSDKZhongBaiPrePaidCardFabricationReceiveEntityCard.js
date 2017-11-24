import {
  RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCardMethod
} from '../RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCard';

export default {
  method: RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCardMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'FABRICATION_BATCH_ID_NOT_EXIST': {
      desc: '制卡批次无效，操作失败',
      leftButtonText: '确定'
    },
    'CARD_TYPE_NOT_FABRICATION': {
      desc: '还未完成制卡操作，操作失败',
      leftButtonText: '确定'
    },
    'HAS_RECEIVED_CARD': {
      desc: '收到实卡操作已完成，无需重复操作',
      leftButtonText: '确定'
    }
  }
};
