/**
 * Created by lijiang.
 * Author: lijiang
 * File: Company
 * Date: 2017/11/4
 * Time: 上午11:28
 * 为什么不叫store而取名company，你懂的
 */
import * as Subjects from '../Subjects';
import {default as CompanyModel} from '../Model/Company';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Company = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    total: 0,
    list: [],
    nextPageIndex: 1,
    subCompany: []
  },

  actions: {
    INIT_FROM_REMOTE_Company: ({state, commit, rootState}, payload) => {
      // 刷新子公司
      Company.loadCompany('INIT_FROM_REMOTE_Company', commit,
        {
          storeNo: null,
          storeName: null,
          parentStoreNo: null,
          district: null,
          storeType: JSON.stringify([1]),
          status: JSON.stringify([Vue.constants.global.MINIPAY_STATUS_NORMAL])
        },
        1,
        30,
        0,
        1);
    },
    CLEAR_STATE_OF_Company: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Company', state);
    },
    [Subjects.COMPANY_QUERY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let storeName = payload.storeName || null;
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `company query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `company query need page count, got ${pageCount}`);

      Company.loadCompany(
        Subjects.COMPANY_QUERY,
        commit,
        {storeName: storeName},
        pageIndex,
        pageCount);
    },
    [Subjects.COMPANY_ADD]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      Vue.prototype.$rpc.RpcSDKZhongBaiStoreAddStore(
        payload.storeName,
        payload.bankName,
        payload.bankAccount,
        payload.parentStoreNo,
        payload.district,
        payload.storeType,
        payload.brandId,
        payload.centerStoreName,
        payload.addressName,
        payload.originStoreNo
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.COMPANY_ADD, data);
        });
    },
    [Subjects.COMPANY_MODIFY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      Vue.prototype.$rpc.RpcSDKZhongBaiStoreModify(
        payload.storeNo,
        payload.storeName,
        payload.bankName,
        payload.bankAccount,
        payload.district,
        payload.addressName,
        payload.originStoreNo,
        payload.parentStoreNo,
        payload.brandId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.COMPANY_MODIFY, data);
        });
    }
  },

  getters: {
    getSubCompany: function (state) {
      return state.subCompany;
    }
  },

  mutations: {
    DATA_MODULE_REGISTERED_Company (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Company (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Company', {module: 'Company', state: state});
    },
    INIT_FROM_REMOTE_Company (state, payload) {
      state.subCompany = payload.list;
      Vue.prototype.eventBus.emit('EVENT_Company_INIT_FROM_REMOTE', {module: 'Company', state: state});
    },
    CLEAR_STATE_OF_Company (state, payload) {
      // do something
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
      state.subCompany = [];
    },
    [Subjects.COMPANY_QUERY] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'STORE_NO');
      Vue.prototype.eventBus.emit(Subjects.COMPANY_QUERY, payload);
    }
  },

  formatCompanyModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `company list must be array, got ${list}`);
    let companies = [];
    lodash.map(list, function (v) {
      companies.push((new CompanyModel()).initFromArray(v));
    });
    return companies;
  },

  loadCompany: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    params = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiStoreQuery(
      params.storeNo,
      params.storeName,
      params.parentStoreNo,
      params.district,
      params.storeType,
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
          list = Company.formatCompanyModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
      });
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Company');
  }
};

export default Company;

