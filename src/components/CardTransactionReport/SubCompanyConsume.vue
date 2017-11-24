<template>
  <div class="SubCompanyConsume">
    <report-too-bar
      :title="this.getLang('REMINDER_SUB_COMPANY_CONSUME')"
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
  import {EXPORT_CONSUME_TRANSACTION} from '../../store/Subjects';

  export default {
    name: 'SubCompanyConsume',
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
            {key: 'COMPANY_NAME', width: 20, align: 'left'},
            {key: 'TRADE_COUNT', width: 20, align: 'center'},
            {key: 'MAIN_TO_SUB_MONEY', width: 20, align: 'center', info: this.getLang('REMINDER_MAIN_TO_SUB_MONEY')},
            {key: 'PLACE_COL', width: 20, align: 'center'}
          ],
          {},
          {},
          this.formatTableValueMap()
        ),
        tableOperation: this.tableOperationList()
      };
    },
    computed: {},
    methods: {
      refreshPages (data) {
        let list = [];
        this.getPlugin('lodash').map(data, (v) => {
          list.push((new FinancialChart()).initFromArray({
            'COMPANY_NAME': v.STORE_NAME,
            'TRADE_COUNT': v.TRADE_COUNT,
            'MAIN_TO_SUB_MONEY': v.MAIN_TO_SUB_MONEY,
            'SUB_TO_MAIN_MONEY': v.SUB_TO_MAIN_MONEY,
            'SUB_COMPANY_NO': v.SUB_COMPANY_NO
          }));
        });
        this.list = list;
      },
      formatTableValueMap: function () {
        return {
          'MAIN_TO_SUB_MONEY': this.$money.cent2yuan,
          'SUB_TO_MAIN_MONEY': this.$money.cent2yuan
        };
      },
      tableOperationList () {
        return [
          {type: 'EXPORT_DETAIL', action: this.exportDetail}
        ];
      },
      exportDetail (v) {
        let date = this.$moments.milliseconds2DateStr(this.tradeTime, 'YYYY-MM-DD');
        this.$store.dispatch(EXPORT_CONSUME_TRANSACTION, {
          tradeTimeStart: `${date} 00:00:00`,
          tradeTimeEnd: `${date} 23:59:59`,
          subCompanyStoreNo: v.get('SUB_COMPANY_NO')
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
      this.$bus.on(EXPORT_CONSUME_TRANSACTION, this.exportReportSucc);
    },
    beforeDestroy: function () {
      this.$bus.off(EXPORT_CONSUME_TRANSACTION, this.exportReportSucc);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .SubCompanyConsume {
    width: 100%;
    border-top: 10px solid @color-eaeff5;

    .table-page {
      margin-bottom: -51px;
    }
  }
</style>
