import {
  RpcSDKZhongBaiPrePaidCardFabricationApplyMethod
} from '../RpcSDKZhongBaiPrePaidCardFabricationApply';

export default {
  method: RpcSDKZhongBaiPrePaidCardFabricationApplyMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'CARD_TYPE_NOT_EXIST': {
      desc: '卡种不存在，无法制卡',
      leftButtonText: '确定'
    },
    'CARD_TYPE_STATUS_INVALID': {
      desc: '卡种状态异常，无法制卡',
      leftButtonText: '确定'
    },
    'CARD_BIN_NOT_EXIST': {
      desc: '制卡卡种的cardbin不存在，无法制卡',
      leftButtonText: '确定'
    },
    'COUNT_NOT_ENOUGH': {
      desc: '剩余可制卡数量不足，请联系迷你付客服',
      leftButtonText: '确定'
    }
  }
};
