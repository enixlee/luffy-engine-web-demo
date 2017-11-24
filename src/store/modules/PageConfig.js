/**
 * Created by lijiang.
 * Author: lijiang
 * File: PageConfig
 * Date: 2017/10/30
 * Time: 下午3:02
 */
import * as Subjects from '../Subjects';
import {PAGE_COUNT_DEFAULT} from '../../constants/PMConstantsPage';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const PageConfig = {
  state: {
    doNotCache: false, // this param is necessary
    is_initiated: false, // this param is necessary
    pageCount: PAGE_COUNT_DEFAULT
  },

  actions: {
    INIT_FROM_REMOTE_PageConfig: ({state, commit, rootState}, payload) => {
      // 远端初始化
      commit('INIT_FROM_REMOTE_PageConfig', state);
    },
    CLEAR_STATE_OF_PageConfig: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_PageConfig', state);
    },
    [Subjects.SET_PAGE_COUNT]: ({state, commit, rootState}, pageCount) => {
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageCount, `page count must be a number, got ${pageCount}`);
      commit(Subjects.SET_PAGE_COUNT, pageCount);
    }
  },

  getters: {
    getCommonPageCount: (state) => {
      return state.pageCount;
    }
  },

  mutations: {
    DATA_MODULE_REGISTERED_PageConfig (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_PageConfig (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_PageConfig', {module: 'PageConfig', state: state});
    },
    INIT_FROM_REMOTE_PageConfig (state, payload) {
      Vue.prototype.eventBus.emit('EVENT_PageConfig_INIT_FROM_REMOTE', {module: 'PageConfig', state: state});
    },
    CLEAR_STATE_OF_PageConfig (state, payload) {
      // do something
      state.pageCount = PAGE_COUNT_DEFAULT;
    },
    [Subjects.SET_PAGE_COUNT] (state, payload) {
      state.pageCount = payload;
    }
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_PageConfig');
  }
};

export default PageConfig;

