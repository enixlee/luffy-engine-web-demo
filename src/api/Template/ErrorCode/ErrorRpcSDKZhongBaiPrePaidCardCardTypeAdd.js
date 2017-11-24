import {
  RpcSDKZhongBaiPrePaidCardCardTypeAddMethod
} from '../RpcSDKZhongBaiPrePaidCardCardTypeAdd';

export default {
  method: RpcSDKZhongBaiPrePaidCardCardTypeAddMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'CARD_TYPE_NAME_EXIST': {
      desc: '卡种名称已被使用，请修改',
      leftButtonText: '确定'
    },
    'RECHARGE_LIMIT_MIN_GREATER_THAN_MAX': {
      desc: '单次充值下限不能超过单次充值上限',
      leftButtonText: '确定'
    },
    'CARD_MONEY_LIMIT_MIN_GREATER_THAN_MAX': {
      desc: '单次充值上限不能超过卡内最高余额',
      leftButtonText: '确定'
    },
    'RECHARGE_MIN_LIMIT_GREATER_THAN_MONEY_LIMIT_MAX': {
      desc: '单次充值下限不能超过卡内最高余额',
      leftButtonText: '确定'
    },
    'NOT_HAS_ENTITY_CARD_BIN': {
      desc: '没有可用的实卡cardbin，请联系迷你付客服',
      leftButtonText: '确定'
    }
  }
};
