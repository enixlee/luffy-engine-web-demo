import {
  RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetailMethod
} from '../RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetail';

export default {
  method: RpcSDKZhongBaiPrePaidCardCardDistributeRecordExportCardDetailMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'RECEIVE_FLOW_NOT_EXIST': {
      desc: '当前领卡批次不存在',
      leftButtonText: '确定'
    },
    'RECEIVE_NOT_COMPLETE': {
      desc: '还未完全领卡，请稍后再试',
      leftButtonText: '确定'
    },
    'RECEIVE_STORE_NOT_EXIST': {
      desc: '领卡子公司不存在，领卡失败',
      leftButtonText: '确定'
    }
  }
};
