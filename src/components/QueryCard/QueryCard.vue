<template>
  <div class="QueryCard">
    <common-page-search
      :list="prePaidCardList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :tableOperation="tableOperation"
      :handleTableSelection="handleTableSelection"
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
        @firstQueryTextChanged="cardTextChanged"
        @lastQueryTextChanged="contTextChanged"
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>
<script type="text/javascript">
  import {PREPAIDCARD_QUERY_LIST} from '../../store/Subjects';
  import {
    PREPAIDCARD_PAGE_HEADER,
    getPrePaidCardStatusByType,
    getSellStatebyType,
    getReceiveStatebyType
  } from '../../store/Model/PrePaidCard';

  export default {
    name: 'QueryCard',
    components: {},
    props: {},
    data () {
      let max = this.$constants.logic.MAX_QUERY_CARD_COUNT;
      return {
        maxCount: max,
        searchCount: 1,
        isSold: null,
        isReceived: null,
        prePaidCardList: [],
        total: 0,
        doSearch: false,
        prePaidCardId: null,
        status: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          PREPAIDCARD_PAGE_HEADER,
          {},
          this.headerSelection(),
          this.formatTableValueMap()
        ),
        tableOperation: this.tableOperationList(),
        loading: false
      };
    },
    computed: {},
    methods: {
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
      dataInit: function () {
      },
      reset: function () {
        this.currentPage = 1;
        this.pageCount = this.$constants.page.PAGE_COUNT_DEFAULT;
        this.status = null;
        this.isReceived = null;
        this.isSold = null;
      },
      cardTextChanged (v) {
        if (v !== this.prePaidCardId) {
          this.reset();
          this.prePaidCardId = v;
        }
      },
      contTextChanged (v) {
        if (v !== this.searchCount) {
          this.reset();
          this.searchCount = v;
        }
      },
      buttonDisableCheck: function (prePaidCardId, count) {
        return !(this.$constants.regexp.PREPAIDCARD_NO.test(prePaidCardId) && parseInt(count) <= this.maxCount);
      },
      headerSelection: function () {
        return {
          'IS_SOLD': {
            key: 'IS_SOLD',
            selection: [
              this.getLang('PREPAIDCARD_SOLD_STATUS_ALL'),
              this.getLang('PREPAIDCARD_SOLD_STATUS_SOLD'),
              this.getLang('PREPAIDCARD_SOLD_STATUS_UNSOLD')
            ]
          },
          'IS_RECEIVED': {
            key: 'IS_RECEIVED',
            selection: [
              this.getLang('PREPAIDCARD_RECEIVE_STATUS_ALL'),
              this.getLang('PREPAIDCARD_RECEIVE_STATUS_RECEIVED'),
              this.getLang('PREPAIDCARD_RECEIVE_STATUS_NOT_RECEIVE')
            ]
          },
          'STATUS': {
            key: 'STATUS',
            selection: [
              this.getLang('MINIPAY_STATUS_ALL'),
              this.getLang('MINIPAY_STATUS_NORMAL'),
              this.getLang('MINIPAY_STATUS_FROZEN')
            ]
          }
        };
      },
      tableOperationList: function () {
        return [];
      },
      formatSoldCn: function (sold) {
        return parseInt(sold) === 0 ? this.getLang('PREPAIDCARD_SOLD_STATUS_UNSOLD') : this.getLang('PREPAIDCARD_SOLD_STATUS_SOLD');
      },
      formatReceiveCn: function (receive) {
        return parseInt(receive) === 0 ? this.getLang('PREPAIDCARD_RECEIVE_STATUS_NOT_RECEIVE') : this.getLang('PREPAIDCARD_RECEIVE_STATUS_RECEIVED');
      },
      dateFormatCn: function (date) {
        return date || '--';
      },
      formatTableValueMap: function () {
        return {
          'IS_SOLD': this.formatSoldCn,
          'IS_RECEIVED': this.formatReceiveCn,
          'STATE': this.getStatusCn,
          'ACTIVE_DATE': this.dateFormatCn,
          'EXPIRE_DATE': this.dateFormatCn,
          'BALANCE': this.$money.cent2yuan
        };
      },
      search: function (prePaidCardId, count) {
        if (parseInt(count) > this.maxCount) {
          this.showDialog(this.getLang('INFO_PREPAIDCARD_QUERY', {count: this.maxCount}), this.getLang('BTN_CONFIRM'));
        } else {
          this.doSearch = true;
          this.goSearch();
        }
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.prePaidCardList = payload.list;
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
      handleTableSelection: function (e) {
        let key = e.key;
        let index = e.value;
        switch (key) {
          case 'STATUS':
            this.status = getPrePaidCardStatusByType(index);
            break;
          case 'IS_RECEIVED':
            this.isReceived = getReceiveStatebyType(index);
            break;
          case 'IS_SOLD':
            this.isSold = getSellStatebyType(index);
            break;
          default:
            break;
        }
        this.goSearch();
      },
      goSearch: function () {
        this.loading = true;
        let params = {
          startPrePaidCardId: this.prePaidCardId,
          count: parseInt(this.searchCount),
          isSold: this.isSold,
          isReceived: this.isReceived,
          pageIndex: this.currentPage,
          pageCount: this.pageCount,
          status: this.status
        };
        this.$store.dispatch(PREPAIDCARD_QUERY_LIST, params);
      }
    },
    watch: {
      prePaidCardList: function (newVal, oldVal) {
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
      this.$bus.on(PREPAIDCARD_QUERY_LIST, this.refreshPages);
    },
    beforeDestroy: function () {
      this.doSearch = false;
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(PREPAIDCARD_QUERY_LIST, this.refreshPages);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .QueryCard {
    width: 100%;
    height: 100%;
  }
</style>
