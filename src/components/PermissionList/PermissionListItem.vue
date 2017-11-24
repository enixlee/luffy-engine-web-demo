<template>
  <div class="PermissionListItem">
    <p class="item-title">{{ permissionItem.name }}</p>
    <div class="item-content">
      <ul class="item-content-table">
        <permission-list-item-row
          v-for="(item, index) in permissionItem.group"
          :permission="item"
          :key="index"
        ></permission-list-item-row>
      </ul>
      <mu-flat-button
        v-if="showEdit"
        class="item-content-button"
        :label="getLang('MINIPAY_COMPILE')"
        @click="clickEdit"
      ></mu-flat-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import PermissionListItemRow from './PermissionListItemRow.vue';

  export default {
    name: 'PermissionListItem',
    components: {PermissionListItemRow},
    props: {
      permissionItem: {
        type: Object,
        require: true
      }
    },
    computed: {
      showEdit () {
        let user = this.getModuleGetterByName('getUser');
        return user.hasPermissions([6]) && `${this.permissionItem.roleId}` !== '1' && this.permissionItem.configId === 0; // 超级管理员不能修改
      }
    },
    methods: {
      clickEdit () {
        this.gotoPage(this.$router, 'PermissionAdd', null, {t: 'modify', r: this.permissionItem.roleId});
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .PermissionListItem {
    width: 100%;
    display: flex;
    color: @color-333333;
    border-bottom: 1px solid @color-eaeff5;
    background-color: @color-ffffff;

    .item-title {
      display: flex;
      align-items: center;
      width: 180px;
      flex-shrink: 0;
      padding-left: 20px;
    }
    .item-content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item-content-table {
        width: 100%;
      }
      .item-content-button {
        margin: 0 20px;
        color: @color-0eb3fc;
      }
    }
  }
</style>
