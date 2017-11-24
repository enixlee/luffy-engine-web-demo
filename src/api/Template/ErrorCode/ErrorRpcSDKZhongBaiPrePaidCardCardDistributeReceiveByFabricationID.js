import {
  RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationIDMethod
} from '../RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationID';

export default {
  method: RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationIDMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'FABRICATION_NOT_EXIST': {
      desc: '制卡信息不存在，领卡失败',
      leftButtonText: '确定'
    },
    'FABRICATION_NOT_COMPLETE': {
      desc: '需在制卡记录进行【确认收到实卡】操作后，放可领卡',
      leftButtonText: '确定'
    },
    'LEFT_COUNT_LESS_THAN_NEED': {
      desc: '可领卡数量不够',
      leftButtonText: '确定'
    },
    'RECEIVE_STORE_NOT_EXIST': {
      desc: '领卡子公司不存在，领卡失败',
      leftButtonText: '确定'
    },
    'RECEIVE_STORE_STATUS_INVALID': {
      desc: '领卡子公司状态异常，无法领卡',
      leftButtonText: '确定'
    },
    'RECEIVER_NOT_EXIST': {
      desc: '领卡人不存在，无法领卡',
      leftButtonText: '确定'
    },
    'RECEIVER_STATUS_INVALID': {
      desc: '领卡人状态异常，无法领卡',
      leftButtonText: '确定'
    },
    'HEADQUARTER_CAN_NOT_RECEIVE': {
      desc: '总公司不能领卡',
      leftButtonText: '确定'
    }
  }
};
