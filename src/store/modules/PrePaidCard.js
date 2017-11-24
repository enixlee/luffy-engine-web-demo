/**
 * Created by lijiang.
 * Author: lijiang
 * File: PrePaidCard
 * Date: 2017/11/1
 * Time: 下午3:51
 */
import * as Subjects from '../Subjects';
import {default as PrePaidcardModel} from '../Model/PrePaidCard';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const PrePaidCard = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_PrePaidCard: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_PrePaidCard', state);
    },
    CLEAR_STATE_OF_PrePaidCard: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_PrePaidCard', state);
    },
    [Subjects.PREPAIDCARD_QUERY_LIST]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let startPrePaidCardId = payload.startPrePaidCardId || null;
      let count = payload.count || null;
      let isSold = payload.isSold || null;
      let isReceived = payload.isReceived || null;
      let status = payload.status || null;

      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `prepaidcard query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `prepaidcard query need page count, got ${pageCount}`);

      PrePaidCard.loadPrePaidCards(
        Subjects.PREPAIDCARD_QUERY_LIST,
        commit,
        {startPrePaidCardId: startPrePaidCardId, status: status, count: count, isSold: isSold, isReceived: isReceived},
        pageIndex,
        pageCount);
    },
    [Subjects.SELL_PREPAIDCARD]: ({state, commit, rootState}, payload) => {
      let [prePaidCard, count] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardTradeSellCard(
        prePaidCard,
        count
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.SELL_PREPAIDCARD, data);
        });
    },
    [Subjects.RECHARGE_PREPAIDCARD]: ({state, commit, rootState}, payload) => {
      let [prePaidCardId, count, amount, subCompany] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardTradeRecharge(
        prePaidCardId,
        count,
        amount,
        subCompany
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.RECHARGE_PREPAIDCARD, data);
        });
    },
    [Subjects.QUERY_CARD_DETAIL]: ({state, commit, rootState}, prePaidCardId) => {
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardQueryCard(
        prePaidCardId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.QUERY_CARD_DETAIL, data);
        });
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_PrePaidCard (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_PrePaidCard (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_PrePaidCard', {module: 'PrePaidCard', state: state});
    },
    INIT_FROM_REMOTE_PrePaidCard (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_PrePaidCard_INIT_FROM_REMOTE', {module: 'PrePaidCard', state: state});
    },
    CLEAR_STATE_OF_PrePaidCard (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.PREPAIDCARD_QUERY_LIST] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'PREPAIDCARD_ID');
      Vue.prototype.eventBus.emit(Subjects.PREPAIDCARD_QUERY_LIST, payload);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_PrePaidCard');
  },

  formatPrePaidCardModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `prepaidcard list must be array, got ${list}`);
    let cards = [];
    lodash.map(list, function (v) {
      cards.push((new PrePaidcardModel()).initFromArray(v));
    });
    return cards;
  },

  loadPrePaidCards: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardOperationQuery(
      params.prePaidCardId,
      params.storeNo,
      params.isSold,
      params.isReceived,
      params.status,
      params.startPrePaidCardId,
      params.count,
      pageIndex,
      pageCount,
      1, // 按卡号
      1 // 升序排序
    )
      .then((rpcResult) => {
        if (!rpcResult || !rpcResult.isSucc()) {
          return;
        }

        let data = rpcResult.getData();
        let list = [];
        if (data.list.length > 0) {
          list = PrePaidCard.formatPrePaidCardModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default PrePaidCard;

