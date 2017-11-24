<template>
  <div class="PermissionList">
    <header class="header-box">
      <p>{{ $t('REMINDER_JURISDICTION_INFO') }}</p>
    </header>
    <div class="nav-warp">
      <nav class="nav-box">
        <p class="user-permission-p">{{ $t('TABLE_HEADER_ROLES') }}</p>
        <p class="operating-middle-p">{{ $t('LABEL_OPERATION_AUTHORITY') }}</p>
        <p class="review-status-right-p">{{ $t('REVIEW_STATUS_3') }}</p>
      </nav>
    </div>
    <permission-list-item
      v-for="permissionItem in permissionGroup"
      :permissionItem="permissionItem"
      :key="permissionItem.name"
    ></permission-list-item>
  </div>
</template>

<script type="text/javascript">
  import PermissionListItem from './PermissionListItem.vue';
  import {buildRolePermission} from '../../external/resource/PermissionChecker';
  import {ROLE_QUERY} from '../../store/Subjects';

  export default {
    name: 'PermissionList',
    components: {PermissionListItem},
    props: {},
    data () {
      return {
        permissionGroup: []
      };
    },
    methods: {
      dataInit: function () {
        let forceRefresh = this.$route.params.forceRefresh;
        if (forceRefresh) {
          this.$store.dispatch(ROLE_QUERY);
        } else {
          this.initGroup();
        }
      },
      initGroup: function () {
        let roleList = this.getModuleGetterByName('getRoles');
        this.permissionGroup = buildRolePermission(roleList);
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(ROLE_QUERY, this.initGroup);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(ROLE_QUERY, this.initGroup);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .PermissionList {
    width: 100%;

    .header-box {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: @color-ff0000;
      border-bottom: 1px solid @color-eaeff5;
      p {
        margin-left: 20px;
      }
    }
    .nav-warp {
      width: 100%;
      padding-left: 1px;
      padding-right: 1px;
      .nav-box {
        position: relative;
        width: 100%;
        height: 51px;
        line-height: 51px;
        background-color: @color-f7fafd;
        border-top: 1px solid @color-ffffff;
        padding-right: 47px;
        padding-left: 21px;
        p {
          float: left;
          color: @color-415669;
        }
        .operating-middle-p {
          position: absolute;
          left: 180px;
        }
        .review-status-right-p {
          float: right;
        }
      }
    }
  }
</style>
