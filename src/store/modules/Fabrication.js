/**
 * Created by lijiang.
 * Author: lijiang
 * File: Fabrication
 * Date: 2017/11/1
 * Time: 下午2:34
 */
import * as Subjects from '../Subjects';
import {getFabricationStatusByType, FABRICATION_STATUS_ALL, default as FabricationModel} from '../Model/Fabrication';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Fabrication = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_Fabrication: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_Fabrication', state);
    },
    CLEAR_STATE_OF_Fabrication: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Fabrication', state);
    },
    [Subjects.FABRICATION_QUERY_RECORD]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let cardTypeName = payload.cardTypeName || null;
      let manufactured = payload.manufactured || getFabricationStatusByType(FABRICATION_STATUS_ALL);
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `fabrication query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `fabrication query need page count, got ${pageCount}`);

      Fabrication.loadFabrication(
        Subjects.FABRICATION_QUERY_RECORD,
        commit,
        {cardTypeName: cardTypeName, manufactured: manufactured},
        pageIndex,
        pageCount);
    },
    [Subjects.FABRICATION_APPLY]: ({state, commit, rootState}, payload) => {
      let [cardTypeId, count] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardFabricationApply(
        cardTypeId,
        count
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.FABRICATION_APPLY, data);
        });
    },
    [Subjects.RECEIVE_ENTITY_CARD]: ({state, commit, rootState}, fabricationBatchId) => {
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardFabricationReceiveEntityCard(
        fabricationBatchId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.RECEIVE_ENTITY_CARD, data);
        });
    },
    [Subjects.EXPORT_FABRICATION_CARD_ID_FILE]: ({state, commit, rootState}, fabricationBatchId) => {
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardFabricationExportForFabricate(
        fabricationBatchId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.EXPORT_FABRICATION_CARD_ID_FILE, data);
        });
    },
    [Subjects.QUERY_ENTITY_CARD_START_ID]: ({state, commit, rootState}, fabricationBatchId) => {
      Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardFabricationQueryStartCard(
        fabricationBatchId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.QUERY_ENTITY_CARD_START_ID, data);
        });
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_Fabrication (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Fabrication (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Fabrication', {module: 'Fabrication', state: state});
    },
    INIT_FROM_REMOTE_Fabrication (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_Fabrication_INIT_FROM_REMOTE', {module: 'Fabrication', state: state});
    },
    CLEAR_STATE_OF_Fabrication (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.FABRICATION_QUERY_RECORD] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'FABRICATION_BATCH_ID');
      Vue.prototype.eventBus.emit(Subjects.FABRICATION_QUERY_RECORD, payload);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Fabrication');
  },

  formatFabricationModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `fabrication list must be array, got ${list}`);
    let fabrication = [];
    lodash.map(list, function (v) {
      fabrication.push((new FabricationModel()).initFromArray(v));
    });
    return fabrication;
  },

  loadFabrication: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardFabricationQuery(
      params.fabricationBatchId,
      params.cardTypeId,
      params.cardTypeName,
      params.manufactured,
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
          list = Fabrication.formatFabricationModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default Fabrication;

