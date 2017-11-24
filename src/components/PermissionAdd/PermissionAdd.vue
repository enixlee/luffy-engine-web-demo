<template>
  <div class="PermissionAdd">
    <header class="header-box">
      <common-input
        :labelText="getLang('LABEL_LIMITS_NAME')"
        :disabled="modify"
        showAsterisk
        class="permission-common-style"
        v-model="roleName"
      ></common-input>
      <div class="btn-box">
        <mu-raised-button
          primary
          :label="getLang('BTN_SAVE')"
          :disabled="saveDisabled"
          @click="saveRole"
        ></mu-raised-button>
      </div>
    </header>
    <div class="cut-off-box"></div>
    <nav class="nav-box">
      <span class="function-model-span">{{ $t('LABEL_FUNCTION_MODULE') }}</span>
      <span class="models-permission-span">{{ $t('LABEL_MODULE_PERMISSIONS') }}</span>
    </nav>
    <div class="banner-box">
      <permission-add-item v-for="(item, index) in permissionGroups"
                           :key="index"
                           :permissionGroup="item"
                           :keyWord="index"
                           @changed="changeSelection"
      ></permission-add-item>
    </div>
  </div>
</template>

<script type="text/javascript">
  import PermissionAddItem from './PermissionAddItem.vue';
  import {buildPermissionGroup} from '../../external/resource/PermissionChecker';
  import {ROLE_ADD, ROLE_MODIFY} from '../../store/Subjects';
  import {default as PermissionModel} from '../../store/Model/Permission';

  export default {
    name: 'PermissionAdd',
    components: {
      PermissionAddItem
    },
    data () {
      return {
        permissionGroups: [],
        selections: [],
        permissions: [],
        initPermissions: [],
        roleName: null,
        modify: false,
        roleId: null,
        changed: false,
        initData: true
      };
    },
    methods: {
      dataInit: function () {
        let query = this.$route.query;
        let type = query.t;
        let roleId = query.r;
        let role = null;
        if (type === 'modify' && this.stringNotEmpty(roleId)) {
          let roles = this.getModuleGetterByName('getRoles');
          roleId = parseInt(roleId);
          for (let i = 0; i < roles.length; i++) {
            if (parseInt(roles[i].get('ID')) === roleId) {
              role = roles[i];
              break;
            }
          }
        }

        if (this.getPlugin('lodash').isObject(role)) {
          this.initCustomGroup(role.get('ID'), role.get('ROLE_NAME'), role.get('PERMISSION_LIST'));
        } else {
          this.initGroup();
        }
      },
      initCustomGroup: function (roleId, roleName, permissions) {
        this.roleId = roleId;
        let models = [];
        for (let i = 0; i < permissions.length; i++) {
          models.push((new PermissionModel()).initFromArray({
            ID: `${permissions[i]}`
          }));
        }
        let choosePermissionGroups = buildPermissionGroup(models);
        this.initGroup();

        for (let i = 0; i < this.permissionGroups.length; i++) {
          let group = this.permissionGroups[i];
          let choose = choosePermissionGroups.find(function (g) {
            return g.group_id === group.group_id;
          });
          group['choose'] = choose ? choose.permissions : [];
        }

        this.roleName = roleName;
        this.modify = true;
      },
      initGroup: function () {
        this.permissionGroups = buildPermissionGroup(this.getModuleGetterByName('getPermissions'));
      },
      changeSelection: function (index, permissions) {
        if (permissions.length === 0) {
          delete this.selections[index];
        } else {
          this.selections[index] = permissions;
        }

        let permission = [];
        for (let i = 0; i < this.selections.length; i++) {
          if (this.selections[i]) {
            permission = this.getPlugin('lodash').concat(permission, this.selections[i]);
          }
        }

        if (this.initData) {
          this.initData = false;
          this.initPermissions = permission;
        }
        this.permissions = permission;
        this.changed = !this.arrayEqual(this.permissions, this.initPermissions);
      },
      saveRole: function () {
        if (this.modify) {
          this.$store.dispatch(ROLE_MODIFY, [
            this.roleId,
            this.permissions
          ]);
        } else {
          this.$store.dispatch(ROLE_ADD, [
            this.roleName,
            this.permissions
          ]);
        }
      },
      addRoleSucc: function () {
        this.showToast(this.getLang('INFO_ADD_ROLE_SUCC', {roleName: this.roleName}));
        this.gotoPage(this.$router, 'PermissionList', {forceRefresh: true});
      },
      modifyRoleSucc: function () {
        this.showToast(this.getLang('INFO_MODIFY_ROLE_SUCC', {roleName: this.roleName}));
        this.gotoPage(this.$router, 'PermissionList', {forceRefresh: true});
      }
    },
    computed: {
      saveDisabled () {
        if (this.modify) {
          return !(this.stringNotEmpty(this.roleName) && this.permissions.length > 0 && this.changed);
        } else {
          return !(this.stringNotEmpty(this.roleName) && this.permissions.length > 0);
        }
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(ROLE_ADD, this.addRoleSucc);
      this.$bus.on(ROLE_MODIFY, this.modifyRoleSucc);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(ROLE_ADD, this.addRoleSucc);
      this.$bus.off(ROLE_MODIFY, this.modifyRoleSucc);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../../assets/common_variable.less";

  .PermissionAdd {
    width: 100%;
    .header-box {
      width: 100%;
      height: 56px;
      padding-right: 23px;
      .permission-common-style {
        width: 404px;
        float: left;
        margin-top: 5px;
      }
      .btn-box {
        float: right;
        padding-top: 10px;
      }
    }
    .cut-off-box {
      width: 100%;
      height: 10px;
      background-color: @color-eaeff5;
    }
    .nav-box {
      width: 100%;
      height: 53px;
      line-height: 53px;
      background-color: @color-f7fafd;
      color: @color-415669;
      .function-model-span {
        margin-left: 62px;
        margin-right: 506px;
      }
    }
    .banner-box {
      width: 100%;
      background-color: @color-content-background;
    }
  }
</style>
