import {
  RpcSDKZhongBaiPrePaidCardTradeSellCardMethod
} from '../RpcSDKZhongBaiPrePaidCardTradeSellCard';

export default {
  method: RpcSDKZhongBaiPrePaidCardTradeSellCardMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'CAN_NOT_SELL_THIS_CARDTYPE': {
      desc: '预付卡不属于当前子公司，无法操作',
      leftButtonText: '确定'
    }
  }
};
