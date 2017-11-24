/**
 * Created by lijiang.
 * Author: lijiang
 * File: CardReceiveRecord
 * Date: 2017/11/4
 * Time: 上午10:42
 */
import * as Subjects from '../Subjects';
import {default as CardReceiveModel} from '../Model/CardReceiveRecord';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const CardReceiveRecord = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_CardReceiveRecord: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_CardReceiveRecord', state);
    },
    CLEAR_STATE_OF_CardReceiveRecord: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_CardReceiveRecord', state);
    },
    [Subjects.QUERY_CARD_RECEIVE_RECORD]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `card receive query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `card receive query need page count, got ${pageCount}`);

      CardReceiveRecord.loadCardReceiveRecord(
        Subjects.QUERY_CARD_RECEIVE_RECORD,
        commit,
        payload,
        pageIndex,
        pageCount);
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_CardReceiveRecord (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_CardReceiveRecord (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_CardReceiveRecord', {module: 'CardReceiveRecord', state: state});
    },
    INIT_FROM_REMOTE_CardReceiveRecord (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_CardReceiveRecord_INIT_FROM_REMOTE', {
        module: 'CardReceiveRecord',
        state: state
      });
    },
    CLEAR_STATE_OF_CardReceiveRecord (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.QUERY_CARD_RECEIVE_RECORD] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'ID');
      Vue.prototype.eventBus.emit(Subjects.QUERY_CARD_RECEIVE_RECORD, payload);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_CardReceiveRecord');
  },

  formatCardReceiveModel: (list) => {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `card receive list must be array, got ${list}`);
    let receive = [];
    lodash.map(list, function (v) {
      receive.push((new CardReceiveModel()).initFromArray(v));
    });
    return receive;
  },

  loadCardReceiveRecord: (subject, commit, params, pageIndex, pageCount, sortBy = 2, desc = 0) => {
    Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardCardDistributeRecordQuery(
      params.fabricationBatchId,
      params.cardTypeId,
      JSON.stringify([1, 2, 3]),
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
          list = CardReceiveRecord.formatCardReceiveModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default CardReceiveRecord;

