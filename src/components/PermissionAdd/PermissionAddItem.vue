<template>
  <div class="PermissionAddItem">
    <span class="span-key-style">{{ permissionGroup.group_name }}</span>
    <ul class="ul-content-style">
      <li class="li-list-style" v-for="(permission, index) in permissionGroup.permissions">
        <mu-checkbox
          :key="index"
          class='mu-checkbox-style'
          :nativeValue="permission.get('ID')"
          :label="permission.get('PERMISSION_NAME')"
          :iconClass="styleMaker(permission.get('ID'))"
          v-model="checkBoxVal"
        ></mu-checkbox>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'PermissionAddItem',
    components: {},
    props: {
      permissionGroup: {
        type: Object,
        require: true
      },
      keyWord: {
        type: [Number, String],
        require: true
      }
    },
    data () {
      return {
        checkBoxVal: []
      };
    },
    methods: {
      styleMaker: function (value) {
        return this.checkBoxVal.indexOf(value) >= 0 ? 'checkbox-custom-check' : 'checkbox-custom-uncheck';
      }
    },
    watch: {
      checkBoxVal: function (newVal, oldVal) {
        this.$emit('changed', this.keyWord, newVal);
      }
    },
    mounted: function () {
      let that = this;
      let choose = this.permissionGroup.choose;
      this.getPlugin('lodash').map(choose, function (v) {
        that.checkBoxVal.push(v.get('ID'));
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .PermissionAddItem {
    width: 100%;
    padding-left: 40px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px dashed @color-eff3f5;
    .span-key-style {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100px;
      padding-left: 20px;
    }
    .ul-content-style {
      width: 890px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      margin-left: 150px;
      .li-list-style {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50px;
        line-height: 50px;
        width: 33.33%;
      }
    }
  }
</style>
