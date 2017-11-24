<template>
  <div class="SellCardResult">
    <common-page-search
      class="custom-table"
      :list="list"
      :doSearch="true"
      :total="count"
      :tableHeader="tableHeader"
      :tableOperation="tableOperation"
      :leftSpace="leftSpace"
      :handleTableSelection="handleTableSelection"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <div class="top-bar">
        <p class="top-bar-operator">{{$t('LABEL_OPERATOR')}}：{{user.NAME}}</p>
        <p>{{$t('LABEL_SELL_CARD_COUNT', {count: count})}}，</p>
        <p>{{$t('LABEL_SELL_CARD_SUCC', {count: result.succCount})}}</p>
        <p class="top-bar-fail" v-if="result.failCount > 0">
          ，{{$t('LABEL_SELL_CARD_FAIL', {count: result.failCount})}}</p>
        <div class="sure-button-box">
          <mu-raised-button
            primary
            class="confirm-btn"
            :label="getLang('BTN_GOON_SELL_CARD')"
            @click="goonSellCard"
          ></mu-raised-button>
        </div>
      </div>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import PrePaidCardModel from '../../store/Model/PrePaidCard';

  export default {
    name: 'SellCardResult',
    components: {},
    props: {},
    data () {
      return {
        result: {succCount: 0, failCount: 0},
        list: [],
        count: 0,
        tableHeader: this.$tablePage.formatTableHeader(
          [
            {key: 'PREPAIDCARD_ID', width: 10, align: 'center'},
            {key: 'CARDTYPE_NAME', width: 15, align: 'center'},
            {key: 'CARD_PRICE', width: 10, align: 'center'},
            {key: 'SELL_CARD_RESULT', width: 10},
            {key: 'TRADE_FLOW_OF_PAYMINI', width: 20}
          ]
        ),
        tableOperation: [],
        leftSpace: 25,
        user: {},
        resultsModel: [],
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
        let result = this.$route.params.result;
        if (!this.getPlugin('lodash').isObject(result)) {
          this.gotoPage(this.$router, 'SellCard');
        } else {
          this.result = result;
          let name = this.$route.query.name;
          let resultsModel = [];
          let lang = this.getLang;
          let that = this;
          this.getPlugin('lodash').map(this.result.result, function (v) {
            resultsModel.push((new PrePaidCardModel()).initFromArray({
              'RESULT': v.result,
              'SELL_CARD_RET': true,
              'PREPAIDCARD_ID': v.prePaidCardId,
              'CARDTYPE_NAME': name,
              'CARD_PRICE': that.$money.money2Show(0, ''),
              'SELL_CARD_RESULT': parseInt(v.result) === 1 ? lang('LABEL_SELL_CARD_RESULT_SUCC') : lang('LABEL_SELL_CARD_RESULT_FAIL'),
              'TRADE_FLOW_OF_PAYMINI': parseInt(v.result) === 1 ? v.tradeFlowOfPaymini : lang('LABEL_FAIL_REASON', {desc: lang(v.description, {type: lang('ACTION_SELL')})})
            }));
          });
          this.count = this.result.succCount + this.result.failCount;
          this.user = this.getModuleGetterByName('getUser').toArray();
          this.resultsModel = resultsModel;
          this.goSearch();
        }
      },
      goonSellCard: function () {
        this.gotoPage(this.$router, 'SellCard');
      },
      handlePageChange: function (page) {
        this.currentPage = page;
        this.goSearch();
      },
      handlePageSizeChange: function (size) {
        this.pageCount = size;
        this.goSearch();
      },
      handleTableSelection: function () {
      },
      goSearch: function () {
        let resultsModel = [];
        let start = this.pageCount * (this.currentPage - 1);
        if (start >= this.resultsModel.length) {
          this.pageIndex = 1;
        } else {
          let left = this.resultsModel.length - start;
          let count = this.pageCount < left ? this.pageCount : left;
          for (let i = 0; i < count; i++) {
            resultsModel.push(this.resultsModel[start + i]);
          }
          this.list = resultsModel;
        }
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
  @import "../../assets/common_variable.less";

  .SellCardResult {
    width: 100%;
    .custom-table {
      padding-top: 51px;
    }

    .top-bar {
      height: 50px;
      background-color: @color-content-background;
      display: flex;
      align-items: center;
      p {
        font-weight: bold;
      }
      .top-bar-operator {
        padding: 0 25px;
      }
      .top-bar-fail {
        color: @color-ff0000;
      }
      .sure-button-box {
        margin-left: 410px;
        position: absolute;
        right: 20px;
      }
    }
  }
</style>
