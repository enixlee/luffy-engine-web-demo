/**
 * Created by lijiang.
 * Author: lijiang
 * File: PosMachine
 * Date: 2017/11/6
 * Time: 下午5:59
 */
import * as Subjects from '../Subjects';
import {default as PosMachineModel} from '../Model/PosMachine';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const PosMachine = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_PosMachine: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_PosMachine', state);
    },
    CLEAR_STATE_OF_PosMachine: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_PosMachine', state);
    },
    [Subjects.POS_MACHINE_QUERY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let storeName = payload.storeName || null;
      let posMachineNo = payload.posMachineNo || null;
      let status = payload.status || Vue.prototype.allStatus();
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `pos machine query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `pos machine query need page count, got ${pageCount}`);

      PosMachine.loadPosMachine(
        Subjects.POS_MACHINE_QUERY,
        commit,
        {storeName: storeName, status: status, posMachineNo: posMachineNo},
        pageIndex,
        pageCount);
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_PosMachine (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_PosMachine (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_PosMachine', {module: 'PosMachine', state: state});
    },
    INIT_FROM_REMOTE_PosMachine (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_PosMachine_INIT_FROM_REMOTE', {module: 'PosMachine', state: state});
    },
    CLEAR_STATE_OF_PosMachine (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.POS_MACHINE_QUERY] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'POS_MACHINE_TERMINAL_NO');
      Vue.prototype.eventBus.emit(Subjects.POS_MACHINE_QUERY, payload);
    }
  },

  formatPosMachineModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `stock list must be array, got ${list}`);
    let posMachine = [];
    lodash.map(list, function (v) {
      posMachine.push((new PosMachineModel()).initFromArray(v));
    });
    return posMachine;
  },

  loadPosMachine: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiPOSMachineQuery(
      params.storeNo || null,
      params.storeName || null,
      params.posMachineNo || null,
      params.posMachineMerchantNo || null,
      params.posMachineUnionPayNo || null,
      params.posMachineUnionPayMerchantNo || null,
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
          list = PosMachine.formatPosMachineModel(data.list);
        }
        commit(subject, {
          pageCount: pageCount,
          total: data.total,
          list: list,
          pageIndex: pageIndex
        });
      });
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_PosMachine');
  }
};

export default PosMachine;

