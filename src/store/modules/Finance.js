/**
 * Created by lijiang.
 * Author: lijiang
 * File: Finance
 * Date: 2017/11/8
 * Time: 下午5:03
 */
import * as Subjects from '../Subjects';
import {default as FinancialChartModel} from '../Model/FinancialChart';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Finance = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    charts: null
  },

  actions: {
    INIT_FROM_REMOTE_Finance: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_Finance', state);
    },
    CLEAR_STATE_OF_Finance: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Finance', state);
    },
    [Subjects.FINANCE_QUERY_CHART]: ({state, commit, rootState}, payload) => {
      let chartDate = payload || Vue.moments.milliseconds2DateStr(Vue.moments.today());
      Vue.prototype.$rpc.RpcSDKZhongBaiReconciliationGetChart(
        chartDate
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          commit(Subjects.FINANCE_QUERY_CHART, data);
        });
    }
  },

  getters: {},

  mutations: {
    DATA_MODULE_REGISTERED_Finance (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Finance (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Finance', {module: 'Finance', state: state});
    },
    INIT_FROM_REMOTE_Finance (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_Finance_INIT_FROM_REMOTE', {module: 'Finance', state: state});
    },
    CLEAR_STATE_OF_Finance (state, payload) {
      // do something
      state.charts = null;
    },
    [Subjects.FINANCE_QUERY_CHART] (state, payload) {
      let model = (new FinancialChartModel()).initFromArray(payload);
      state.charts = model;
      Vue.prototype.eventBus.emit(Subjects.FINANCE_QUERY_CHART, model);
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Finance');
  }
};

export default Finance;

