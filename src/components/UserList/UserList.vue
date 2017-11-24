<template>
  <div class="UserList">
    <common-page-search
      :list="userList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :handleTableSelection="handleTableSelection"
      :tableOperation="tableOperation"
      :loading="loading"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        :labelText="getLang('LABEL_USER')"
        :doSearch="search"
        :hintText="getLang('PLACEHOLDER_USER_NAME')"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import {USER_QUERY, RESET_USER_LOGIN_PASSWORD, USER_FREEZE, USER_UNFREEZE} from '../../store/Subjects';
  import {USER_PAGE_HEADER} from '../../store/Model/User';
  import RoleState from '../../store/modules/Role';

  export default {
    name: 'UserList',
    components: {},
    props: {},
    data () {
      return {
        userList: [],
        total: 0,
        doSearch: false,
        realName: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          USER_PAGE_HEADER,
          {},
          {},
          this.formatTableValueMap()
        ),
        tableOperation: this.tableOperationList(),
        loading: false
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
      },
      search: function (value) {
        this.doSearch = true;
        if (value.length === 0) {
          return '';
        }
        if (this.realName === value) {
          this.goSearch();
        } else {
          this.realName = value;
        }
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.userList = payload.list;
        this.total = payload.total;
      },
      handlePageChange: function (page) {
        this.currentPage = page;
        this.goSearch();
      },
      handlePageSizeChange: function (pageCount) {
        this.pageCount = pageCount;
        this.goSearch();
      },
      handleTableSelection: function (e) {
      },
      goSearch: function () {
        this.loading = true;
        this.$store.dispatch(USER_QUERY, {
          name: this.realName,
          pageIndex: this.currentPage,
          pageCount: this.pageCount
        });
      },
      getRolesCn: function (roleList) {
        let names = '';
        let that = this;
        this.getPlugin('lodash').map(roleList, function (v) {
          let role = RoleState.getRoleByRoleId(that.getStoreState('Role'), v);
          if (role) {
            names += `${role.get('ROLE_NAME')}、`;
          }
        });
        return names.substring(0, names.length - 1);
      },
      formatTableValueMap: function () {
        return {
          'USER_STATUS': this.getStatusCn,
          'ROLES': this.getRolesCn
        };
      },
      tableOperationList: function () {
        return [
          {type: 'DETAIL', action: this.userDetail},
          {type: 'FREEZE', action: this.freezeUser},
          {type: 'MODIFY', action: this.modifyUser},
          {type: 'RESET_PASSWORD', action: this.resetUser},
          {type: 'UNFREEZE', action: this.enableUser}
        ];
      },
      userDetail (e) {
        this.showCustomDialog(
          'UserDetail',
          this.getLang('DIALOG_TITLE_USER_DETAIL'),
          this.getLang('BTN_CONFIRM'),
          null,
          null,
          null,
          {
            'USER_ID': e.get('USER_ID'),
            'NAME': e.get('NAME'),
            'USER_NAME': e.get('USER_NAME'),
            'CELLPHONE': e.get('CELLPHONE'),
            'STORE_NAME': e.get('STORE_NAME'),
            'PERMISSION': e.getUserRoles(),
            'STATUS': e.get('STATUS')
          });
      },
      freezeUser (e) {
        let that = this;
        this.showCustomDialog(
          'FreezeUser',
          this.getLang('DIALOG_TITLE_FREEZE_USER'),
          this.getLang('BTN_CONFIRM'),
          null,
          function () {
            that.freezeUserCallBack(e);
          },
          null,
          {
            'NAME': e.get('NAME'),
            'CELLPHONE': e.get('CELLPHONE'),
            'USER_NAME': e.get('USER_NAME'),
            'STORE_NAME': e.get('STORE_NAME'),
            'PERMISSION': e.getUserRoles()
          }).setBottomTip(this.getLang('REMINDER_FREEZE_USER_BOTTOM'));
      },
      modifyUser (e) {
        this.gotoPage(this.$router, 'UserModify', {user: e});
      },
      resetUser (e) {
        let that = this;
        this.showCustomDialog(
          'ResetUser',
          this.getLang('DIALOG_TITLE_RESET_PASSWORD'),
          this.getLang('BTN_CONFIRM'),
          null,
          function () {
            that.resetPasswordCallBack(e);
          },
          null,
          {
            'NAME': e.get('NAME'),
            'CELLPHONE': e.get('CELLPHONE'),
            'USER_NAME': e.get('USER_NAME'),
            'STORE_NAME': e.get('STORE_NAME'),
            'PERMISSION': e.getUserRoles()
          }).setBottomTip(this.getLang('REMINDER_RESET_USER_BOTTOM'));
      },
      enableUser (e) {
        let that = this;
        this.showCustomDialog(
          'EnableUser',
          this.getLang('DIALOG_TITLE_ENABLE_USER'),
          this.getLang('BTN_CONFIRM'),
          null,
          function () {
            that.enableUserCallBack(e);
          },
          null,
          {
            'NAME': e.get('NAME'),
            'CELLPHONE': e.get('CELLPHONE'),
            'USER_NAME': e.get('USER_NAME'),
            'STORE_NAME': e.get('STORE_NAME'),
            'PERMISSION': e.getUserRoles()
          });
      },
      freezeUserCallBack (e) {
        this.$store.dispatch(USER_FREEZE, e.get('USER_ID'));
      },
      resetPasswordCallBack (e) {
        this.$store.dispatch(RESET_USER_LOGIN_PASSWORD, e.get('USER_ID'));
      },
      enableUserCallBack (e) {
        this.$store.dispatch(USER_UNFREEZE, e.get('USER_ID'));
      },
      freezeUserSucc () {
        this.showToast(this.getLang('INFO_FREEZE_USER_SUCC'));
      },
      enableUserSucc () {
        this.showToast(this.getLang('INFO_ENABLE_USER_SUCC'));
      },
      resetPasswordSucc (e) {
        this.showToast(this.getLang('INFO_RESET_USER_SUCC'));
        let mySelf = this.getModuleGetterByName('getUser').get('USER_ID');
        if (mySelf === e.userId) {
          this.$authUtils.LogOut();
        }
      }
    },
    watch: {
      realName: function (newVal, oldVal) {
        this.currentPage = 1;
        this.pageCount = this.$constants.page.PAGE_COUNT_DEFAULT;
        this.goSearch();
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(USER_QUERY, this.refreshPages);
      this.$bus.on(RESET_USER_LOGIN_PASSWORD, this.resetPasswordSucc);
      this.$bus.on(USER_FREEZE, this.freezeUserSucc);
      this.$bus.on(USER_UNFREEZE, this.enableUserSucc);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(USER_QUERY, this.refreshPages);
      this.$bus.off(RESET_USER_LOGIN_PASSWORD, this.resetPasswordSucc);
      this.$bus.off(USER_FREEZE, this.freezeUserSucc);
      this.$bus.off(USER_UNFREEZE, this.enableUserSucc);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .UserList {
    width: 100%;
  }
</style>
