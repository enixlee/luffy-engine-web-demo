<template>
  <div class="ReportTooBar">
    <p>{{ title }}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'ReportTooBar',
    components: {},
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {};
    },
    computed: {},
    methods: {
      dataInit: function () {
      }
    },
    watch: {},
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .ReportTooBar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: @color-666666;
    border-bottom: 1px solid @color-eaeff5;
    font-size: @font-content;

    p { font-weight: bold; }
  }
</style>
