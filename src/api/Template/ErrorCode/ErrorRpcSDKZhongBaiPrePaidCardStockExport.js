import {
  RpcSDKZhongBaiPrePaidCardStockExportMethod
} from '../RpcSDKZhongBaiPrePaidCardStockExport';

export default {
  method: RpcSDKZhongBaiPrePaidCardStockExportMethod,
  codes: {
    dealSelf: false,
    'PERMISSION_DENIED': {
      desc: '抱歉,您没有权限进行该项操作',
      leftButtonText: '确定'
    },
    'CARDTYPE_NOT_EXIST': {
      desc: '卡种不存在，导出失败',
      leftButtonText: '确定'
    },
    'STORE_NOT_EXIST': {
      desc: '子公司状态异常，导出失败',
      leftButtonText: '确定'
    }
  }
};
