<template>
  <div class="RechargeConfirm">
    <load-mask v-if="showLoadMask"></load-mask>
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
        <div class="start-card-name-box">
          <span class="start-card-span">{{ $t('LABEL_START_CARD') }}：</span>
          <span>{{startPrePaidCardId}}</span>
        </div>
        <div class="end-card-name-box">
          <span class="end-card-span">{{ $t('LABEL_COMPANY_END_CARD_NAME') }}：</span>
          <span>{{endPrePaidCardId}}</span>
        </div>
        <div class="total-card-box">
          <span class="total-card-span">{{ $t('LABEL_TOTAL') }}：</span>
          <span class="total-card-number">{{count}}{{$t('UNIT_CARD')}}</span>
        </div>
        <div class="total-card-box">
          <span class="total-card-span">{{ $t('LABEL_EVERY_CARD_RECHARGE') }}：</span>
          <span class="total-card-number">{{amount}}{{$t('MONEY_UNIT')}}</span>
        </div>
        <div class="sure-button-box">
          <mu-raised-button
            primary
            :disabled="disable"
            class="confirm-btn"
            :label="getLang('BTN_RECHARGE_CONFIRM')"
            @click="doRecharge"
          ></mu-raised-button>
        </div>
      </div>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import PrePaidCardModel from '../../store/Model/PrePaidCard';
  import {RECHARGE_PREPAIDCARD} from '../../store/Subjects';
  import LoadMask from '../../external/components/Loading/LoadMask.vue';

  export default {
    name: 'RechargeConfirm',
    components: {LoadMask},
    props: {},
    data () {
      return {
        leftSpace: 25,
        startPrePaidCardId: '',
        endPrePaidCardId: '',
        count: 1,
        cardTypeName: '',
        tableHeader: this.$tablePage.formatTableHeader(
          [
            {key: 'PREPAIDCARD_ID', width: 15, align: 'center'},
            {key: 'CARDTYPE_NAME', width: 15, align: 'center'},
            {key: 'PLACE_COL', width: 70}
          ]
        ),
        tableOperation: [],
        list: [],
        cards: [],
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        disable: false,
        amount: 0,
        subCompany: null,
        showLoadMask: false
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
        let query = this.$route.query;
        this.startPrePaidCardId = query.startPrePaidCardId;
        this.count = parseInt(query.count);
        this.amount = this.$money.money2Show(this.$money.yuan2Cent(query.amount), '');
        let cardTypeName = query.name;
        let cardIds = this.calculatePrePaidCardIds(this.startPrePaidCardId, this.count);
        let cards = [];
        this.getPlugin('lodash').map(cardIds, function (v) {
          cards.push((new PrePaidCardModel()).initFromArray({
            'PREPAIDCARD_ID': v,
            'CARDTYPE_NAME': cardTypeName
          }));
        });
        this.cards = cards;
        this.endPrePaidCardId = cardIds[cardIds.length - 1];

        let company = query.c;
        if (company) {
          this.subCompany = company;
        }

        if (this.startPrePaidCardId.length !== 19 || this.count < 1 || this.amount === 0 || this.subCompany === null) {
          this.gotoPage(this.$router, 'Recharge');
        }
        this.goSearch();
      },
      doRecharge: function () {
        this.disable = true;
        this.showLoadMask = true;
        this.$store.dispatch(RECHARGE_PREPAIDCARD, [this.startPrePaidCardId, this.count, parseInt(this.$money.yuan2Cent(this.amount)), this.subCompany]);
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
        let cards = [];
        let start = this.pageCount * (this.currentPage - 1);
        if (start >= this.cards.length) {
          this.pageIndex = 1;
        } else {
          let left = this.cards.length - start;
          let count = this.pageCount < left ? this.pageCount : left;
          for (let i = 0; i < count; i++) {
            cards.push(this.cards[start + i]);
          }
          this.list = cards;
        }
      },
      rechargeComplete: function (e) {
        this.showLoadMask = false;
        this.gotoPage(this.$router, 'RechargeResult', {
          result: e,
          amount: this.amount
        }, {name: this.$route.query.name});
      }
    },
    watch: {},
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(RECHARGE_PREPAIDCARD, this.rechargeComplete);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(RECHARGE_PREPAIDCARD, this.rechargeComplete);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .RechargeConfirm {
    width: 100%;
    position: relative;
    .custom-table {
      padding-top: 51px;
    }

    .top-bar {
      height: 50px;
      background-color: @color-content-background;
      display: flex;
      align-items: center;
      span {
        font-weight: bold;
      }
      .start-card-name-box {
        margin-left: 25px;
        margin-right: 21px;
        font-weight: bold;
      }
      .end-card-name-box {
        margin-right: 21px;
        font-weight: bold;
      }
      .total-card-box {
        .total-card-number {
          margin-right: 15px;
        }
        font-weight: bold;
      }
      .sure-button-box {
        margin-left: 410px;
        position: absolute;
        right: 20px;
      }
    }
  }
</style>
