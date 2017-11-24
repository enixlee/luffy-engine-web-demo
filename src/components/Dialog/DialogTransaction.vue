<template>
  <div class="DialogTransaction">
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_TRADE_TIME')"
      :infoText="slotParams.get('TRADE_TIME')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_TRANSACTION_STORE')"
      :infoText="slotParams.get('STORE_NAME')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_SUBSIDIARY_NAME')"
      :infoText="slotParams.get('PARENT_STORE_NAME')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_CARDTYPE_NAME')"
      :infoText="slotParams.get('CARDTYPE_NAME')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_PREPAIDCARD_ID')"
      :infoText="slotParams.get('PREPAIDCARD_ID')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_TRADE_TYPE')"
      :infoText="tradeType"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_TRADE_MONEY')"
      :infoText="tradeMoney"
      :unit="getLang('MONEY_UNIT')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_BALANCE')"
      :infoText="balance"
      :unit="getLang('MONEY_UNIT')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_OPERATOR')"
      :infoText="slotParams.get('OPERATOR')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_TERMINAL_ID')"
      :infoText="terminalId"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('TABLE_HEADER_TRADE_FLOW_OF_PAYMINI')"
      :infoText="slotParams.get('TRADE_FLOW_OF_PAYMINI')"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  import { getTradeTypeCnBy } from '../../logic/Transaction';
  export default {
    name: 'DialogTransaction',
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
      tradeType () {
        return getTradeTypeCnBy(this.slotParams.get('TRADE_TYPE'), this.slotParams.get('TRADE_CHANNEL'));
      },
      terminalId () {
        return this.terminalIdFormatCn(this.slotParams.get('TERMINAL_ID'));
      },
      tradeMoney () {
        return this.$money.money2Show(this.slotParams.get('TRADE_MONEY'), '');
      },
      balance () {
        return this.$money.money2Show(this.slotParams.get('BALANCE'), '');
      }
    },
    methods: {
      dataInit: function () {
      },
      terminalIdFormatCn: function (terminalId) {
        return terminalId || '--';
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
  .DialogTransaction {
    width: 100%;
    padding: 10px 0;
  }
</style>
