/**
 * Created by lijiang.
 * Author: lijiang
 * File: Brand
 * Date: 2017/11/10
 * Time: 下午5:21
 */
// import * as Subjects from '../Subjects';
import {default as BrandModel} from '../Model/Brand';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Brand = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_Brand: ({state, commit, rootState}, payload) => {
      // 远端初始化
      Brand.loadBrand('INIT_FROM_REMOTE_Brand', commit, {}, 1, 30);
    },
    CLEAR_STATE_OF_Brand: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Brand', state);
    }
  },

  getters: {
    getBrands: state => {
      return state.list;
    }
  },

  mutations: {
    DATA_MODULE_REGISTERED_Brand (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Brand (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Brand', {module: 'Brand', state: state});
    },
    INIT_FROM_REMOTE_Brand (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'ID');
      Vue.prototype.eventBus.emit('EVENT_Brand_INIT_FROM_REMOTE', {module: 'Brand', state: state});
    },
    CLEAR_STATE_OF_Brand (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Brand');
  },

  formatBrandModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `brand list must be array, got ${list}`);
    let brand = [];
    lodash.map(list, function (v) {
      brand.push((new BrandModel()).initFromArray(v));
    });
    return brand;
  },

  loadBrand: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 1) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiStoreBrandQuery(
      params.id,
      params.brandName,
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
          list = Brand.formatBrandModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  }
};

export default Brand;

