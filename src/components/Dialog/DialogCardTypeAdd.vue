<template>
  <div class="DialogCardTypeAdd">
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_CARD_TYPE_NAME')"
      :infoText="slotParams.cardTypeName"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_CARD_INIT_VALUE')"
      :infoText="initCardValue"
      :unit="unitYuan"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_SINGLE_RECHARGE_LIMIT')"
      :infoText="singleRechargeMax"
      :unit="unitYuan"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_SINGLE_RECHARGE_LIMIT_MIN')"
      :infoText="singleRechargeMin"
      :unit="unitYuan"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_MAX_MONEY_IN_CARD')"
      :infoText="maxMoney"
      :unit="unitYuan"
    ></common-information>
    <!--
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_MIN_MONEY_IN_CARD')"
      :infoText="minMoney"
      :unit="unitYuan"
    ></common-information>
    -->
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_VALIDITY')"
      :infoText="slotParams.validity"
      :unit="unitMonth"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogCardTypeAdd',
    components: {},
    props: {
      slotParams: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        unitYuan: this.getLang('MONEY_UNIT'),
        unitMonth: this.getLang('MONTH_UNIT')
      };
    },
    computed: {
      initCardValue () {
        return this.slotParams.initCardValue.toFixed(2);
      },
      singleRechargeMax () {
        return this.slotParams.singleRechargeMax.toFixed(2);
      },
      singleRechargeMin () {
        return this.slotParams.singleRechargeMin.toFixed(2);
      },
      maxMoney () {
        return this.slotParams.maxMoney.toFixed(2);
      },
      minMoney () {
        return this.slotParams.minMoney.toFixed(2);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .DialogCardTypeAdd {
    width: 100%;
    padding: 10px 0;
  }
</style>
