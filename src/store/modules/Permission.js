/**
 * Created by lijiang.
 * Author: lijiang
 * File: Permission
 * Date: 2017/11/14
 * Time: 下午4:40
 */
import {default as PermissionModel} from '../Model/Permission';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Permission = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    permissions: []
  },

  actions: {
    INIT_FROM_REMOTE_Permission: ({state, commit, rootState}, payload) => {
      // 远端初始化
      Vue.prototype.$rpc.RpcSDKZhongBaiPermissionQuery(
        null,
        null,
        1,
        320
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          commit('INIT_FROM_REMOTE_Permission', data);
        });
    },
    CLEAR_STATE_OF_Permission: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Permission', state);
    }
  },

  getters: {
    getPermissions: (state) => {
      return state.permissions;
    }
  },

  mutations: {
    DATA_MODULE_REGISTERED_Permission (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Permission (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Permission', {module: 'Permission', state: state});
    },
    INIT_FROM_REMOTE_Permission (state, payload) {
      let list = [];
      if (payload.list.length > 0) {
        list = Permission.formatPermissionModel(payload.list);
      }
      state.permissions = list;
      Vue.prototype.eventBus.emit('EVENT_Permission_INIT_FROM_REMOTE', {module: 'Permission', state: state});
    },
    CLEAR_STATE_OF_Permission (state, payload) {
      // do something
      this.permissions = [];
    }
  },

  formatPermissionModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `permission list must be array, got ${list}`);
    let permission = [];
    lodash.map(list, function (v) {
      permission.push((new PermissionModel()).initFromArray(v));
    });
    return permission;
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Permission');
  }
};

export default Permission;

