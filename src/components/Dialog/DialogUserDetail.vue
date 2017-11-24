<template>
  <div class="DialogUserDetail">
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_USER_ID')"
      :infoText="slotParams.USER_ID"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_NAME')"
      :infoText="slotParams.NAME"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_USER_NAME')"
      :infoText="slotParams.USER_NAME"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_CELLPHONE')"
      :infoText="slotParams.CELLPHONE"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_COMPANY')"
      :infoText="slotParams.STORE_NAME"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_USERS_ROLE')"
      :infoText="permission"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_USER_STATUS')"
      :infoText="status"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogUserDetail',
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
    computed: {
      permission () {
        let names = '';
        this.getPlugin('lodash').map(this.slotParams.PERMISSION, (role) => {
          names += `${role.get('ROLE_NAME')}、`;
        });
        return names.substring(0, names.length - 1);
      },
      status () {
        return this.getStatusCn(this.slotParams.STATUS);
      }
    },
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
  .DialogUserDetail {
    width: 100%;
    padding: 10px 0;
  }
</style>
