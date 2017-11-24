<template>
  <div class="CardTransactionReport">
    <div class="title">
      <p>
        {{ $t('REMINDER_CARD_TRANSACTION_REPORT_TIME', {time: this.$moments.milliseconds2DateStr(this.yesterday, 'YYYY-MM-DD')})
        }}</p>
      <tool-tip
        class="tool-tip"
        :reminderText="getLang('REMINDER_CARD_TRANSACTION_REPORT')"
      ></tool-tip>
    </div>

    <report-recharge :tableData="recharge" :tradeTime="yesterday"></report-recharge>
    <sub-company-recharge :tableData="subCompanyRecharge" :tradeTime="yesterday"></sub-company-recharge>
    <sub-company-consume :tableData="subCompanyConsume" :tradeTime="yesterday"></sub-company-consume>
    <sub-company-payment :tableData="subCompanyPayment" :tradeTime="yesterday"></sub-company-payment>
  </div>
</template>

<script type="text/javascript">
  import {FINANCE_QUERY_CHART} from '../../store/Subjects';
  import SubCompanyRecharge from './SubCompanyRecharge.vue';
  import ReportRecharge from './ReportRecharge.vue';
  import SubCompanyConsume from './SubCompanyConsume.vue';
  import SubCompanyPayment from './SubCompanyPayment.vue';
  import ToolTip from '../../external/components/ToolTip/ToolTip.vue';

  export default {
    name: 'CardTransactionReport',
    components: {
      ToolTip,
      SubCompanyPayment,
      SubCompanyConsume,
      ReportRecharge,
      SubCompanyRecharge
    },
    props: {},
    data () {
      return {
        yesterday: this.$moments.yesterday(),
        recharge: [],
        subCompanyRecharge: [],
        subCompanyConsume: [],
        subCompanyPayment: []
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
        this.$store.dispatch(FINANCE_QUERY_CHART, this.$moments.milliseconds2DateStr(this.yesterday));
      },
      refreshPages (data) {
        this.recharge = [data.get('recharge')];
        this.subCompanyRecharge = data.get('subCompanyRecharge');
        this.subCompanyConsume = data.get('subCompanyConsume');
        this.subCompanyPayment = data.get('subCompanyPayment');
      }
    },
    watch: {},
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(FINANCE_QUERY_CHART, this.refreshPages);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.on(FINANCE_QUERY_CHART, this.refreshPages);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .CardTransactionReport {
    width: 100%;

    .title {
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 20px;
      font-size: 16px;

      .tool-tip {
        margin-left: 5px;
      }
    }
  }
</style>
