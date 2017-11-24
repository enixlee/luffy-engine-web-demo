<template>
  <div class="CardTransaction">
    <common-page-search
      :list="cardTransaction"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :tableOperation="tableOperation"
      :loading="loading"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        showDoubleSearch
        :firstLabelText="getLang('LABEL_START_CARD')"
        :firstHintText="getLang('PLACEHOLDER_QUERY_NUMBER')"
        :firstReminderText="getLang('REMINDER_CARD_NUMBER_RULE')"
        :lastLabelText="getLang('LABEL_QUERY_COUNT')"
        :lastHintText="getLang('PLACEHOLDER_PREPAIDCARD_COUNT',{count:maxCount})"
        :lastDefaultValue="searchCount"
        :unit="getLang('UNIT_CARD')"
        :doSearch="search"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
        :customSearchButtonCheck="buttonDisableCheck"
        :firstLabelFilter="prePaidCardFilter"
        :lastLabelFilter="countFilter"
        @firstQueryTextChanged="prePaidCardTextChanged"
        @lastQueryTextChanged="countTextChanged"
      >
        <p class="tool-bar-info" v-if="cardTransaction.length > 0">{{ $t('REMINDER_CARD_TRANSACTION') }}</p>
      </common-query-tool-bar>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import {TRANSACTION_QUERY} from '../../store/Subjects';
  import {TRANSACTION_PAGE_HEADER} from '../../store/Model/Transaction';
  import {getTradeTypeCnBy} from '../../logic/Transaction';

  export default {
    name: 'CardTransaction',
    components: {},
    props: {},
    data () {
      let max = this.$constants.logic.MAX_QUERY_CARD_COUNT;
      return {
        maxCount: max,
        searchCount: 1,
        cardTransaction: [],
        total: 0,
        doSearch: false,
        prePaidCardId: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          TRANSACTION_PAGE_HEADER,
          {},
          {},
          this.formatTableValueMap()
        ),
        tableOperation: this.tableOperationList(),
        loading: false
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
      },
      prePaidCardFilter: function (newVal, oldVal) {
        if (newVal === '') {
          return '';
        } else {
          let valid = this.$constants.regexp.PREPAIDCARD_NO.test(newVal);
          if (!valid) {
            return oldVal === '' ? '' : this.formatPrePaidCardId(oldVal);
          }
        }
        return this.formatPrePaidCardId(newVal);
      },
      countFilter: function (newVal, oldVal) {
        if (newVal === '') {
          return '';
        } else {
          let valid = this.$constants.regexp.NATURAL_INTEGER.test(newVal);
          if (!valid) {
            return oldVal === '' ? '' : oldVal;
          }
        }
        return newVal;
      },
      prePaidCardTextChanged: function (v) {
        if (v !== this.prePaidCardId) {
          this.reset();
          this.prePaidCardId = v;
        }
      },
      countTextChanged: function (v) {
        if (v !== this.searchCount) {
          this.reset();
          this.searchCount = v;
        }
      },
      buttonDisableCheck: function (prePaidCardId, count) {
        return !(this.$constants.regexp.PREPAIDCARD_NO.test(prePaidCardId) && parseInt(count) <= this.maxCount);
      },
      terminalIdFormatCn: function (terminalId) {
        return terminalId || '--';
      },
      formatTradeTypeCn (value, model) {
        return getTradeTypeCnBy(model.get('TRADE_TYPE'), model.get('TRADE_CHANNEL'));
      },
      formatTableValueMap: function () {
        return {
          'TERMINAL_ID': this.terminalIdFormatCn,
          'TRADE_TYPE': this.formatTradeTypeCn,
          'TRADE_MONEY': this.$money.cent2yuan,
          'BALANCE': this.$money.cent2yuan
        };
      },
      search: function (prePaidCardId, count) {
        this.doSearch = true;
        this.goSearch();
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.cardTransaction = payload.list;
        this.total = payload.total;
      },
      handlePageChange: function (page) {
        this.currentPage = page;
        this.goSearch();
      },
      handlePageSizeChange: function (pageCount) {
        this.pageCount = pageCount;
        this.goSearch();
      },
      goSearch: function () {
        this.loading = true;
        let params = {
          prePaidCardId: this.prePaidCardId,
          count: parseInt(this.searchCount),
          pageIndex: this.currentPage,
          pageCount: this.pageCount
        };
        this.$store.dispatch(TRANSACTION_QUERY, params);
      },
      tableOperationList: function () {
        return [
          {type: 'DETAIL', action: this.transactionDetail}
        ];
      },
      transactionDetail (e) {
        this.showCustomDialog(
          'Transaction',
          this.getLang('DIALOG_TITLE_TRANSACTION_DETAIL'),
          this.getLang('BTN_CONFIRM'),
          null,
          null,
          null,
          e);
      },
      reset: function () {
        this.currentPage = 1;
        this.pageCount = this.$constants.page.PAGE_COUNT_DEFAULT;
      }
    },
    watch: {
      cardTransaction: function (newVal, oldVal) {
        if (newVal.length === 0) {
          this.reset();
        }
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(TRANSACTION_QUERY, this.refreshPages);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(TRANSACTION_QUERY, this.refreshPages);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .CardTransaction {
    width: 100%;

    .tool-bar-info {
      font-weight: bold;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 25px;
    }
  }
</style>
