/**
 * Created by lijiang.
 * Author: lijiang
 * File: Stock
 * Date: 2017/11/6
 * Time: 下午5:04
 */
import * as Subjects from '../Subjects';
import {default as StockModel} from '../Model/Stock';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Stock = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1,
    sum: {}
  },

  actions: {
    INIT_FROM_REMOTE_Stock: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_Stock', state);
    },
    CLEAR_STATE_OF_Stock: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Stock', state);
    },
    [Subjects.STOCK_QUERY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let storeName = payload.storeName || null;
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `stock query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `stock query need page count, got ${pageCount}`);

      Stock.loadStock(
        Subjects.STOCK_QUERY,
        commit,
        {storeName: storeName},
        pageIndex,
        pageCount);
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_Stock (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Stock (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Stock', {module: 'Stock', state: state});
    },
    INIT_FROM_REMOTE_Stock (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_Stock_INIT_FROM_REMOTE', {module: 'Stock', state: state});
    },
    CLEAR_STATE_OF_Stock (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
      state.sum = {};
    },
    [Subjects.STOCK_QUERY] (state, payload) {
      if (payload.storeName) {
        state.sum[payload.storeName] = payload.sum;
      }
      Vue.prototype.setStoreStateList(state, payload, 'ID');
      Vue.prototype.eventBus.emit(Subjects.STOCK_QUERY, payload);
    }
  },

  formatStockModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `stock list must be array, got ${list}`);
    let stock = [];
    lodash.map(list, function (v) {
      stock.push((new StockModel()).initFromArray(v));
    });
    return stock;
  },

  loadStock: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiPrePaidCardStockQuery(
      params.cardTypeId,
      params.cardTypeName,
      params.storeNo,
      params.storeName,
      params.isSoldOut || 0,
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
          list = Stock.formatStockModel(data.list);
        }
        commit(subject, {
          pageCount: pageCount,
          total: data.total,
          list: list,
          pageIndex: pageIndex,
          sum: data.sum,
          storeName: params.storeName
        });
      });
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Stock');
  }
};

export default Stock;

