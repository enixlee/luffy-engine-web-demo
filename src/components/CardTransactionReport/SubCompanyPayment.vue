<template>
  <div class="SubCompanyPayment">
    <report-too-bar
      :title="getLang('REMINDER_SUB_COMPANY_PAYMENT')"
    ></report-too-bar>
    <table-page
      class="table-page"
      :titles="tableHeader"
      :list="list"
      :leftSpace="leftSpace"
    ></table-page>
  </div>
</template>

<script type="text/javascript">
  import FinancialChart from '../../store/Model/FinancialChart';
  import ReportTooBar from './ReportTooBar.vue';

  export default {
    name: 'SubCompanyPayment',
    components: {ReportTooBar},
    props: {
      tableData: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        list: [],
        leftSpace: 20,
        tableHeader: this.$tablePage.formatTableHeader(
          [
            {key: 'COMPANY_NAME', width: 20, align: 'left'},
            {key: 'MAIN_TO_SUB_MONEY', width: 20, align: 'center'},
            {key: 'PLACE_COL', width: 20, align: 'center'},
            {key: 'PLACE_COL', width: 20, align: 'center'},
            {key: 'PLACE_COL', width: 20, align: 'center'}
          ],
          {},
          {},
          this.formatTableValueMap()
        )
      };
    },
    computed: {},
    methods: {
      refreshPages (data) {
        let list = [];
        this.getPlugin('lodash').map(data, (v) => {
          list.push((new FinancialChart()).initFromArray({
            'COMPANY_NAME': v.STORE_NAME,
            'MAIN_TO_SUB_MONEY': v.MAIN_TO_SUB_MONEY,
            'SUB_TO_MAIN_MONEY_RECHARGE': v.SUB_TO_MAIN_MONEY_RECHARGE,
            'SUB_TO_MAIN_MONEY': v.SUB_TO_MAIN_MONEY
          }));
        });
        this.list = list;
      },
      formatTableValueMap: function () {
        return {
          'MAIN_TO_SUB_MONEY': this.$money.cent2yuan,
          'SUB_TO_MAIN_MONEY_RECHARGE': this.$money.cent2yuan,
          'SUB_TO_MAIN_MONEY': this.$money.cent2yuan
        };
      }
    },
    watch: {
      tableData (newVal) {
        this.refreshPages(newVal);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .SubCompanyPayment {
    width: 100%;
    background-color: @color-ffffff;
    border-top: 10px solid @color-eaeff5;

    .table-page {
    }
  }
</style>
