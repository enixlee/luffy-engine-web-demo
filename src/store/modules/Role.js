/**
 * Created by lijiang.
 * Author: lijiang
 * File: Role
 * Date: 2017/11/14
 * Time: 下午5:04
 */
import * as Subjects from '../Subjects';
import {default as RoleModel} from '../Model/Role';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const Role = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    roles: []
  },

  actions: {
    INIT_FROM_REMOTE_Role: ({state, commit, rootState}, payload) => {
      // 远端初始化
      Role.loadRole(commit, 'INIT_FROM_REMOTE_Role');
    },
    CLEAR_STATE_OF_Role: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_Role', state);
    },
    [Subjects.ROLE_ADD]: ({state, commit, rootState}, payload) => {
      let [roleName, permissions] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiRoleAdd(
        roleName,
        JSON.stringify(permissions),
        Vue.prototype.getModuleGetterByName('getUser').get('STORE_NO')
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.ROLE_ADD, data);
        });
    },
    [Subjects.ROLE_QUERY]: ({state, commit, rootState}, payload) => {
      Role.loadRole(commit, Subjects.ROLE_QUERY);
    },
    [Subjects.ROLE_MODIFY]: ({state, commit, rootState}, payload) => {
      let [roleId, permissions] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiRoleModify(
        roleId,
        JSON.stringify(permissions)
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.ROLE_MODIFY, data);
        });
    }
  },

  getters: {
    getRoles: (state) => {
      return state.roles;
    },
    getValidRoles: (state) => {
      let roles = lodash.pickBy(state.roles, function (v) {
        return parseInt(v.get('CONFIG_ID')) !== 1;
      });

      return lodash.values(roles);
    }
  },

  mutations: {
    DATA_MODULE_REGISTERED_Role (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_Role (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_Role', {module: 'Role', state: state});
    },
    INIT_FROM_REMOTE_Role (state, payload) {
      Role.formatModel(state, payload);
      Vue.prototype.eventBus.emit('EVENT_Role_INIT_FROM_REMOTE', {module: 'Role', state: state});
    },
    CLEAR_STATE_OF_Role (state, payload) {
      // do something
      this.roles = [];
    },
    [Subjects.ROLE_QUERY] (state, payload) {
      Role.formatModel(state, payload);
      Vue.prototype.eventBus.emit(Subjects.ROLE_QUERY, state.roles);
    }
  },

  formatRoleModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `role list must be array, got ${list}`);
    let role = [];
    lodash.map(list, function (v) {
      role.push((new RoleModel()).initFromArray(v));
    });
    return role;
  },

  formatModel: function (state, payload) {
    let list = [];
    if (payload.list.length > 0) {
      list = Role.formatRoleModel(payload.list);
    }
    state.roles = list;
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_Role');
  },

  loadRole: function (commit, subject) {
    Vue.prototype.$rpc.RpcSDKZhongBaiRoleQuery(
      null,
      null,
      null,
      JSON.stringify([1]),
      1,
      100
    )
      .then((rpcResult) => {
        if (!rpcResult || !rpcResult.isSucc()) {
          return;
        }

        let data = rpcResult.getData();
        commit(subject, data);
      });
  },

  getRoleByRoleId: function (state, roleId) {
    let role = state.roles.find(function (r) {
      return parseInt(r.get('ID')) === parseInt(roleId);
    });

    return role || null;
  }

};

export default Role;

