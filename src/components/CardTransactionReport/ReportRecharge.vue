<template>
  <div class="ReportRecharge">
    <report-too-bar
      :title="getLang('REMINDER_REPORT_RECHARGE')"
    ></report-too-bar>
    <table-page
      class="table-page"
      :titles="tableHeader"
      :list="list"
      :operation="tableOperation"
      :leftSpace="leftSpace"
    ></table-page>
  </div>
</template>

<script type="text/javascript">
  import FinancialChart from '../../store/Model/FinancialChart';
  import ReportTooBar from './ReportTooBar.vue';
  import {EXPORT_RECHARGE_TRANSACTION} from '../../store/Subjects';

  export default {
    name: 'ReportRecharge',
    components: {ReportTooBar},
    props: {
      tableData: {
        type: Array,
        required: true
      },
      tradeTime: {
        type: Number,
        require: true
      }
    },
    data () {
      return {
        list: [],
        leftSpace: 20,
        tableHeader: this.$tablePage.formatTableHeader(
          [
            {key: 'TRADE_COUNT', width: 20, align: 'left'},
            {key: 'PAY_SUB_COMPANY_MONEY', width: 20, align: 'center'},
            {key: 'PLACE_COL', width: 20, align: 'center'},
            {key: 'PLACE_COL', width: 20, align: 'center'}
          ],
          {},
          {},
          this.formatTableValueMap()
        ),
        tableOperation: this.tableOperationList()
      };
    },
    methods: {
      refreshPages (data) {
        let list = [];
        this.getPlugin('lodash').map(data, (v) => {
          list.push((new FinancialChart()).initFromArray({
            'TRADE_COUNT': v.TRADE_COUNT,
            'PAY_SUB_COMPANY_MONEY': v.TRADE_TOTAL_MONEY
          }));
        });
        this.list = list;
      },
      formatTableValueMap: function () {
        return {
          'PAY_SUB_COMPANY_MONEY': this.showMoney
        };
      },
      showMoney: function (v) {
        return this.$money.money2Show(v, '');
      },
      tableOperationList () {
        return [
          {type: 'EXPORT_DETAIL', action: this.exportDetail}
        ];
      },
      exportDetail (v) {
        let date = this.$moments.milliseconds2DateStr(this.tradeTime, 'YYYY-MM-DD');
        this.$store.dispatch(EXPORT_RECHARGE_TRANSACTION, {
          tradeTimeStart: `${date} 00:00:00`,
          tradeTimeEnd: `${date} 23:59:59`,
          chartType: this.$constants.logic.RECHARGE_TRANSACTION_ONLINE
        });
      },
      exportReportSucc: function (e) {
        this.downloadFile(e.downloadUrl);
      }
    },
    watch: {
      tableData (newVal) {
        this.refreshPages(newVal);
      }
    },
    created: function () {
      this.$bus.on(EXPORT_RECHARGE_TRANSACTION, this.exportReportSucc);
    },
    beforeDestroy: function () {
      this.$bus.off(EXPORT_RECHARGE_TRANSACTION, this.exportReportSucc);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .ReportRecharge {
    width: 100%;
    border-top: 10px solid @color-eaeff5;

    .table-page {
      margin-bottom: -52px;
    }
  }
</style>
