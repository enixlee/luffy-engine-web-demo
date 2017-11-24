<template>
  <div class="DialogStoreDetail">
    <common-information
      plainInfo
      :labelText="getLang('TABLE_HEADER_STORE_NO')"
      :infoText="slotParams.STORE_NO"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      v-if="stringNotEmpty(slotParams.ORIGIN_STORE_NO)"
      :labelText="getLang('TABLE_HEADER_ORIGIN_STORE_NO')"
      :infoText="slotParams.ORIGIN_STORE_NO"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      :labelText="getLang('TABLE_HEADER_STORE_TYPE')"
      :infoText="slotParams.STORE_TYPE_NAME"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      v-if="stringNotEmpty(slotParams.PARENT_STORE_NAME)"
      :labelText="getLang('LABEL_COMPANY')"
      :infoText="slotParams.PARENT_STORE_NAME"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      v-if="stringNotEmpty(slotParams.BRAND_NAME)"
      :labelText="getLang('TABLE_HEADER_BRAND_NAME')"
      :infoText="slotParams.BRAND_NAME"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      :labelText="getLang('LABEL_COMPANY_NAME')"
      :infoText="slotParams.STORE_NAME"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      :labelText="getLang('LABEL_COMPANY_ADDRESS')"
      :infoText="slotParams.ADDRESS_NAME"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      v-if="stringNotEmpty(slotParams.BANK_NAME)"
      :labelText="getLang('LABEL_BANK_NAME')"
      :infoText="slotParams.BANK_NAME"
      class="info-style"
    ></common-information>
    <common-information
      plainInfo
      v-if="stringNotEmpty(slotParams.BANK_ACCOUNT)"
      :labelText="getLang('LABEL_BANK_ACCOUNT')"
      :infoText="slotParams.BANK_ACCOUNT"
      class="info-style"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogStoreDetail',
    components: {},
    props: {
      slotParams: {
        type: Object,
        default: () => {
          return {
            'STORE_NO': null,
            'STORE_NAME': '',
            'BANK_NAME': '',
            'BANK_ACCOUNT': '',
            'ADDRESS_NAME': '',
            'PARENT_STORE_NAME': '',
            'STORE_TYPE_NAME': '',
            'ORIGIN_STORE_NO': 'ORIGIN_STORE_NO',
            'BRAND_NAME': 'BRAND_NAME'
          };
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
  .DialogStoreDetail {
    width: 100%;
    padding: 10px 0;
  }
</style>
