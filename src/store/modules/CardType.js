/**
 * Created by lijiang.
 * Author: lijiang
 * File: CardType
 * Date: 2017/10/30
 * Time: 下午2:16
 */
import * as Subjects from '../Subjects';
import {default as CardTypeModel} from '../Model/CardType';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const CardType = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_CardType: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_CardType', state);
    },
    CLEAR_STATE_OF_CardType: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_CardType', state);
    },
    [Subjects.CARDTYPE_ADD]: ({state, commit, rootState}, payload) => {
      Vue.prototype.getPlugin('Assert').isObject(payload);
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardCardTypeAdd(
        payload.cardPrice,
        payload.sellPrice || 0,
        payload.cardTypeName,
        payload.termOfValidity,
        payload.singleRechargeLimitMin,
        payload.singleRechargeLimit,
        payload.moneyLimitMax,
        payload.moneyLimitMin
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          commit(Subjects.CARDTYPE_ADD, data);
        });
    },
    [Subjects.CARDTYPE_QUERY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let cardTypeName = payload.cardTypeName || null;
      let status = payload.status || Vue.prototype.allStatus();
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `card type query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `card type query need page count, got ${pageCount}`);

      CardType.loadCardType(
        Subjects.CARDTYPE_QUERY,
        commit,
        {cardTypeName: cardTypeName, status: status, merchantCardTypeId: null},
        pageIndex,
        pageCount);
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_CardType (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_CardType (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_CardType', {module: 'CardType', state: state});
    },
    INIT_FROM_REMOTE_CardType (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_CardType_INIT_FROM_REMOTE', {module: 'CardType', state: state});
    },
    CLEAR_STATE_OF_CardType (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.CARDTYPE_QUERY] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'MERCHANT_CARDTYPE_ID');
      Vue.prototype.eventBus.emit(Subjects.CARDTYPE_QUERY, payload);
    },
    [Subjects.CARDTYPE_ADD] (state, payload) {
      Vue.prototype.eventBus.emit(Subjects.CARDTYPE_ADD, payload);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_CardType');
  },

  formatCarTypeModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `card type list must be array, got ${list}`);
    let cardtype = [];
    lodash.map(list, function (v) {
      cardtype.push((new CardTypeModel()).initFromArray(v));
    });
    return cardtype;
  },

  loadCardType: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardCardTypeQuery(
      params.merchantCardTypeId,
      params.cardTypeName,
      params.status,
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
          list = CardType.formatCarTypeModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default CardType;

