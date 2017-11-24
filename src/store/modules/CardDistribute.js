/**
 * Created by lijiang.
 * Author: lijiang
 * File: CardDistribute
 * Date: 2017/11/2
 * Time: 下午9:24
 */
import * as Subjects from '../Subjects';
import {default as CardDistributeModel} from '../Model/CardDistribute';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const CardDistribute = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_CardDistribute: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_CardDistribute', state);
    },
    CLEAR_STATE_OF_CardDistribute: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_CardDistribute', state);
    },
    [Subjects.QUERY_CARD_CAN_RECEIVE]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `card distribute query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `card distribute query need page count, got ${pageCount}`);

      CardDistribute.loadCardTypeDistribute(
        Subjects.QUERY_CARD_CAN_RECEIVE,
        commit,
        payload,
        pageIndex,
        pageCount);
    },
    [Subjects.SUB_COMPANY_RECEIVE_CARD]: ({state, commit, rootState}, payload) => {
      payload = payload || [];
      let [fabricationBatchId, count, storeNo, userId] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardCardDistributeReceiveByFabricationID(
        fabricationBatchId,
        count,
        storeNo,
        null,
        userId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.SUB_COMPANY_RECEIVE_CARD, data);
        });
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_CardDistribute (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_CardDistribute (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_CardDistribute', {module: 'CardDistribute', state: state});
    },
    INIT_FROM_REMOTE_CardDistribute (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_CardDistribute_INIT_FROM_REMOTE', {module: 'CardDistribute', state: state});
    },
    CLEAR_STATE_OF_CardDistribute (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.QUERY_CARD_CAN_RECEIVE] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'FABRICATION_BATCH_ID');
      Vue.prototype.eventBus.emit(Subjects.QUERY_CARD_CAN_RECEIVE, payload);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_CardDistribute');
  },

  formatCardDistributeModel: (list) => {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `card distribute list must be array, got ${list}`);
    let distribute = [];
    lodash.map(list, function (v) {
      distribute.push((new CardDistributeModel()).initFromArray(v));
    });
    return distribute;
  },

  loadCardTypeDistribute: (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) => {
    Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardCardDistributeQuery(
      params.fabricationBatchId,
      params.cardTypeId,
      params.cardTypeName,
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
          list = CardDistribute.formatCardDistributeModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default CardDistribute;

