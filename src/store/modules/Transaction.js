/**
 * Created by lijiang.
 * Author: lijiang
 * File: Transaction
 * Date: 2017/11/8
 * Time: 下午4:00
 */
import * as Subjects from '../Subjects';
import {default as TransactionModel} from '../Model/Transaction';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Transaction = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_Transaction: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_Transaction', state);
    },
    CLEAR_STATE_OF_Transaction: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Transaction', state);
    },
    [Subjects.TRANSACTION_QUERY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let prePaidCardId = payload.prePaidCardId || null;
      let count = payload.count || null;
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `transaction query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `transaction query need page count, got ${pageCount}`);

      Transaction.loadTransaction(
        Subjects.TRANSACTION_QUERY,
        commit,
        {prePaidCardId: prePaidCardId, count: count},
        pageIndex,
        pageCount);
    },
    [Subjects.EXPORT_RECHARGE_TRANSACTION]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      Vue.prototype.$rpc.RpcSDKZhongBaiTransactionRechargeExportRechargeDetail(
        payload.tradeFlowOfPayMini,
        payload.storeNo,
        payload.prePaidCardId,
        payload.tradeSubType,
        payload.tradeTimeStart,
        payload.tradeTimeEnd,
        payload.posTerminalId,
        payload.subCompanyStoreNo,
        payload.tradeChannel,
        payload.tradeMethod,
        payload.chartType
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.EXPORT_CONSUME_TRANSACTION, data);
        });
    },
    [Subjects.EXPORT_CONSUME_TRANSACTION]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      Vue.prototype.$rpc.RpcSDKZhongBaiTransactionConsumeExportConsumeDetail(
        payload.tradeFlowOfPayMini,
        payload.storeNo,
        payload.prePaidCardId,
        payload.tradeSubType,
        payload.tradeTimeStart,
        payload.tradeTimeEnd,
        payload.posTerminalId,
        payload.subCompanyStoreNo,
        payload.tradeChannel,
        payload.tradeMethod
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.EXPORT_CONSUME_TRANSACTION, data);
        });
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_Transaction (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Transaction (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Transaction', {module: 'Transaction', state: state});
    },
    INIT_FROM_REMOTE_Transaction (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_Transaction_INIT_FROM_REMOTE', {module: 'Transaction', state: state});
    },
    CLEAR_STATE_OF_Transaction (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.TRANSACTION_QUERY] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'TRADE_FLOW_OF_PAYMINI');
      Vue.prototype.eventBus.emit(Subjects.TRANSACTION_QUERY, payload);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Transaction');
  },

  formatTransactionModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `Transaction list must be array, got ${list}`);
    let transaction = [];
    lodash.map(list, function (v) {
      transaction.push((new TransactionModel()).initFromArray(v));
    });
    return transaction;
  },

  loadTransaction: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiTransactionQuery(
      params.tradeFlowOfPayMini,
      params.tradeType,
      params.storeNo,
      params.prePaidCardId,
      params.count,
      params.tradeSubType,
      params.tradeTimeStart,
      params.tradeTimeEnd,
      params.posTerminalId,
      params.isReDrew,
      pageIndex,
      pageCount,
      sortBy,
      desc
    )
      .then((rpcResult) => {
        if (!rpcResult || !rpcResult.isSucc()) {
          return;
        }

        let data = rpcResult.getData();
        let list = [];
        if (data.list.length > 0) {
          list = Transaction.formatTransactionModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default Transaction;

