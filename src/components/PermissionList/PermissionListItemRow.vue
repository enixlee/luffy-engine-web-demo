<template>
  <li class="PermissionListItemRow">
    <span class="row-title">{{ permission.group_name }}：</span>
    <span
      class="row-info"
      v-for="(p, index) in permission.permissions"
    >
      {{ p.permission_name }}
    </span>
  </li>
</template>

<script type="text/javascript">
  export default {
    name: 'PermissionListItemRow',
    props: {
      permission: {
        type: Object,
        required: true
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .PermissionListItemRow {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px dashed @color-eaeff5;
    &:last-child {
      border-bottom: none;
    }

    .row-title {
      color: @color-708690;
    }
    .row-info::after {
      content: '、';
    }
    .row-info:last-child::after {
      content: '';
    }
  }
</style>
