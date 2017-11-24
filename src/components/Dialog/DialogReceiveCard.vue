<template>
  <div class="DialogReceiveCard">
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_FABRICATION_BATCH_ID')"
      :infoText="slotParams.fabricationBatchId"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_CARDTYPE_NAME')"
      :infoText="slotParams.cardTypeName"
    ></common-information>
    <common-information
    class="dialog-info"
    plainInfo
    :labelText="getLang('LABEL_CARD_INIT_VALUE')"
    :unit="getLang('MONEY_UNIT')"
    :infoText="money"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_RECEIVE_COUNT')"
      :unit="getLang('UNIT_CARD')"
      :infoText="slotParams.count"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_START_PREPAIDCARD_ID')"
      :infoText="slotParams.startPrepaidCardId"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_RECEIVER')"
      :infoText="slotParams.name"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_RECEIVE_CARD_COMPANY')"
      :infoText="slotParams.storeName"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogReceiveCard',
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
      money () {
        return this.$money.money2Show(this.$money.yuan2Cent(this.slotParams.initValue), '');
      }
    },
    methods: {},
    watch: {},
    created: function () {
    },
    beforeDestroy: function () {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .DialogReceiveCard {
    width: 100%;
    padding: 10px 0;
  }
</style>
