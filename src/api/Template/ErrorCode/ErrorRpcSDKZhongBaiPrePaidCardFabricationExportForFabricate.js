import {
  RpcSDKZhongBaiPrePaidCardFabricationExportForFabricateMethod
} from '../RpcSDKZhongBaiPrePaidCardFabricationExportForFabricate';

export default {
  method: RpcSDKZhongBaiPrePaidCardFabricationExportForFabricateMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'FABRICATION_BATCH_NOT_EXIST': {
      desc: '制卡批次不存在，操作失败',
      leftButtonText: '确定'
    },
    'NOT_MANUFACTURE_CARD': {
      desc: '还未完成制卡，请稍后再试',
      leftButtonText: '确定'
    },
    'FABRICATION_STATUS_INVALID': {
      desc: '制卡状态异常，操作失败',
      leftButtonText: '确定'
    }
  }
};
