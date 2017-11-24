/**
 * Created by lijiang.
 * Author: lijiang
 * File: User
 * Date: 2017/10/23
 * Time: 下午8:21
 */
import * as Subjects from '../Subjects';
import {default as UserModel} from '../Model/User';

let Vue = window.PMApp.Vue;
let lodash = Vue.prototype.getPlugin('lodash');

const User = {
  state: {
    doNotCache: true, // this param is necessary
    is_initiated: false, // this param is necessary
    user: null,
    total: 0,
    list: [],
    nextPageIndex: 1
  },

  actions: {
    INIT_FROM_REMOTE_User: ({state, commit, rootState}, payload) => {
      // 远端初始化
      User.loadUserInfo('INIT_FROM_REMOTE_User', commit, {
        userId: Vue.prototype.getModuleGetterByName('userId'),
        pageIndex: 1,
        pageCount: 1
      });
    },
    CLEAR_STATE_OF_User: ({state, commit, rootState}, payload) => {
      // 清空缓存
      commit('CLEAR_STATE_OF_User', state);
    },
    [Subjects.REQUEST_MODIFY_LOGIN_PWD_SMS]: ({state, commit, rootState}, cellphone) => {
      let typeCheck = Vue.prototype.getPlugin('TypeCheck');
      typeCheck.isCellphone(cellphone);

      Vue.prototype.$rpc.RpcSDKZhongBaiSmsGetModifyLoginPasswordVerifyCode(cellphone);
    },
    [Subjects.MODIFY_LOGIN_PASSWORD]: ({state, commit, rootState}, payload) => {
      let [newPassword, verifyCode] = payload;
      Vue.prototype.$rpc.RpcSDKZhongBaiUserModifyLoginPassword(
        newPassword,
        verifyCode
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.MODIFY_LOGIN_PASSWORD, data);
        });
    },
    [Subjects.RESET_USER_LOGIN_PASSWORD]: ({state, commit, rootState}, userId) => {
      Vue.prototype.getPlugin('Assert').isNotNil(userId);
      Vue.prototype.$rpc.RpcSDKZhongBaiUserResetLoginPassword(userId).then((rpcResult) => {
        if (!rpcResult || !rpcResult.isSucc()) {
          return;
        }

        let data = rpcResult.getData();
        Vue.prototype.eventBus.emit(Subjects.RESET_USER_LOGIN_PASSWORD, {ret: data, userId: userId});
      });
    },
    [Subjects.USER_QUERY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      let name = payload.name || null;
      let userName = payload.userName || null;
      let pageCount = payload.pageCount;
      let pageIndex = payload.pageIndex;
      let Assert = Vue.prototype.getPlugin('Assert');
      Assert.isNumber(pageIndex, `user query need page index, got ${pageIndex}`);
      Assert.isNumber(pageCount, `user query need page count, got ${pageCount}`);

      User.loadUserInfo(
        Subjects.USER_QUERY,
        commit,
        {name: name, userName: userName},
        pageIndex,
        pageCount);
    },
    [Subjects.USER_ADD]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      Vue.prototype.$rpc.RpcSDKZhongBaiUserAddStoreUser(
        payload.userName,
        payload.password, // md5
        payload.name,
        payload.cellphone,
        payload.storeNo,
        payload.role
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.USER_ADD, data);
        });
    },
    [Subjects.USER_MODIFY]: ({state, commit, rootState}, payload) => {
      payload = payload || {};
      Vue.prototype.$rpc.RpcSDKZhongBaiUserModifyStoreUser(
        payload.userId,
        payload.userName,
        payload.name,
        payload.cellphone,
        payload.storeNo,
        payload.role
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.USER_MODIFY, data);
        });
    },
    [Subjects.USER_FREEZE]: ({state, commit, rootState}, userId) => {
      Vue.prototype.$rpc.RpcSDKZhongBaiUserFreeze(
        userId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.USER_FREEZE, data);
        });
    },
    [Subjects.USER_UNFREEZE]: ({state, commit, rootState}, userId) => {
      Vue.prototype.$rpc.RpcSDKZhongBaiUserUnFreeze(
        userId
      )
        .then((rpcResult) => {
          if (!rpcResult || !rpcResult.isSucc()) {
            return;
          }

          let data = rpcResult.getData();
          Vue.prototype.eventBus.emit(Subjects.USER_UNFREEZE, data);
        });
    }
  },

  getters: {
    getUser: (state) => {
      return state.user || new UserModel();
    }
  },

  mutations: {
    DATA_MODULE_REGISTERED_User (state, payload) {
      lodash.forEach(payload, function (v, k) {
        state[k] = v;
      });
      state.is_initiated = false;
    },
    MODULE_INITIATED_User (state) {
      state.is_initiated = true;
      Vue.prototype.eventBus.emit('MODULE_INITIATED_User', {module: 'User', state: state});
    },
    INIT_FROM_REMOTE_User (state, payload) {
      let user = payload.list[0];
      Vue.prototype.getPlugin('Assert').isObject(user);
      state.user = user;
      Vue.prototype.eventBus.emit('EVENT_User_INIT_FROM_REMOTE', {module: 'User', state: state});
    },
    CLEAR_STATE_OF_User (state, payload) {
      // do something
      this.user = null;
      state.total = 0;
      state.list = [];
      state.nextPageIndex = 1;
    },
    [Subjects.USER_QUERY] (state, payload) {
      Vue.prototype.setStoreStateList(state, payload, 'USER_ID');
      Vue.prototype.eventBus.emit(Subjects.USER_QUERY, payload);
    }
  },

  formatUserModel: function (list) {
    let Assert = Vue.prototype.getPlugin('Assert');
    Assert.isArray(list, `card type list must be array, got ${list}`);
    let users = [];
    lodash.map(list, function (v) {
      users.push((new UserModel()).initFromArray(v));
    });
    return users;
  },

  loadUserInfo: function (subject, commit, params, pageIndex, pageCount, sortBy = 0, desc = 0) {
    let query = params || {};
    Vue.prototype.$rpc.RpcSDKZhongBaiUserQuery(
      query.userId,
      query.userName,
      query.name,
      query.cellphone,
      query.storeNo,
      query.status,
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
          list = User.formatUserModel(data.list);
        }
        commit(subject, {pageCount: pageCount, total: data.total, list: list, pageIndex: pageIndex});
        // commit('INIT_FROM_REMOTE_User', data);
      });
  },

  afterLoadFromCache: (store, state) => {
    store.commit('MODULE_INITIATED_User');
  }
};

export default User;

