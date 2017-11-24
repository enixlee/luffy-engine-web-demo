<template>
  <div class="DialogUserAdd">
    <div class="DialogFabricationAdd">
      <common-information
        plainInfo
        class="dialog-info"
        :labelText="getLang('LABEL_REAL_NAME')"
        :infoText="slotParams.fullName"
      ></common-information>
      <common-information
        plainInfo
        class="dialog-info"
        :labelText="getLang('LABEL_CELLPHONE')"
        :infoText="slotParams.cellPhone"
      ></common-information>
      <common-information
        plainInfo
        class="dialog-info"
        :labelText="getLang('LABEL_USER_NAME')"
        :infoText="slotParams.userNameText"
      ></common-information>
      <common-information
        plainInfo
        class="dialog-info"
        :labelText="getLang('LABEL_COMPANY')"
        :infoText="slotParams.company"
      ></common-information>
      <common-information
        plainInfo
        class="dialog-info"
        :labelText="getLang('LABEL_USER_ROLE')"
        :infoText="slotParams.roleTextValue"
      ></common-information>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogUserAdd',
    components: {},
    props: {
      slotParams: {
        type: Object,
        required: true
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
  .DialogUserAdd {
    width: 100%;
    padding: 10px 0;
  }
</style>
