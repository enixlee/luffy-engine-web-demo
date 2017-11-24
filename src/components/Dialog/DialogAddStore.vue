<template>
  <div class="DialogAddStore">
    <common-information
      plainInfo
      class="dialog-info"
      :labelText="getLang('LABEL_COMPANY')"
      :infoText="slotParams.companyName"
    ></common-information>
    <common-information
      plainInfo
      class="dialog-info"
      :labelText="getLang('LABEL_COMPANY_BRAND')"
      :infoText="slotParams.brand"
    ></common-information>
    <common-information
      plainInfo
      :labelText="getLang('LABEL_STORE_NO')"
      :infoText="slotParams.originStoreNo"
      class="dialog-info"
    ></common-information>
    <common-information
      plainInfo
      class="dialog-info"
      :labelText="getLang('LABEL_STORE_NAME')"
      :infoText="slotParams.storeName"
    ></common-information>
    <common-information
      plainInfo
      class="dialog-info"
      :labelText="getLang('LABEL_STORE_ADDRESS')"
      :infoText="slotParams.addressName"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogAddStore',
    components: {},
    props: {
      slotParams: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data () {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .DialogAddStore {
    width: 100%;
    padding: 10px 0;
  }
</style>
