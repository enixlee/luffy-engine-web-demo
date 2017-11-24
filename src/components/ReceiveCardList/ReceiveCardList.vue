<template>
  <div class="ReceiveCardList">
    <common-page-search
      :list="receiveCardList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :tableOperation="tableOperation"
      :loading="loading"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        :labelText="getLang('LABEL_CARDTYPE')"
        :doSearch="search"
        :hintText="getLang('PLACEHOLDER_CARD_TYPE_QUERY')"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
      >
        <p class="tool-bar-info">{{ $t('REMINDER_TOOL_BAR_INFO') }}</p>
      </common-query-tool-bar>
    </common-page-search>
  </div>
</template>
<script type="text/javascript">
  import {QUERY_CARD_CAN_RECEIVE} from '../../store/Subjects';
  import {CARD_DISTRIBUTE_PAGE_HEADER} from '../../store/Model/CardDistribute';

  export default {
    name: 'ReceiveCardList',
    components: {},
    props: {},
    data () {
      return {
        receiveCardList: [],
        total: 0,
        doSearch: false,
        cardTypeName: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          CARD_DISTRIBUTE_PAGE_HEADER,
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
      formatYuan (value) {
        return this.$money.money2Show(this.$money.yuan2Cent(value), '');
      },
      formatTableValueMap: function () {
        return {
          'INIT_CARD_VALUE_YUAN': this.formatYuan
        };
      },
      search: function (value) {
        this.doSearch = true;
        if (value.length === 0) {
          return '';
        }
        if (this.cardTypeName === value) {
          this.goSearch();
        } else {
          this.cardTypeName = value;
        }
      },
      goSearch: function () {
        this.loading = true;
        this.$store.dispatch(QUERY_CARD_CAN_RECEIVE, {
          cardTypeName: this.cardTypeName,
          pageIndex: this.currentPage,
          pageCount: this.pageCount
        });
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.receiveCardList = payload.list;
        this.total = payload.total;
      },
      tableOperationList: function () {
        return [
          {type: 'RECEIVE_CARD', action: this.subCompanyReceiveCard}
        ];
      },
      handlePageChange: function (page) {
        this.currentPage = page;
        this.goSearch();
      },
      handlePageSizeChange: function (pageCount) {
        this.pageCount = pageCount;
        this.goSearch();
      },
      subCompanyReceiveCard (e) {
        this.gotoPage(this.$router, 'ReceiveCard', null, {
          cid: e.get('MERCHANT_CARDTYPE_ID'),
          b: e.get('FABRICATION_BATCH_ID'),
          n: e.get('CARDTYPE_NAME'),
          v: e.get('INIT_CARD_VALUE_YUAN'),
          c: e.get('LEFT_COUNT'),
          s: e.get('START_PREPAIDCARD_ID'),
          u: e.get('CURRENT_RECEIVE_CARD_COUNT')
        });
      }
    },
    watch: {
      cardTypeName: function (newVal, oldVal) {
        this.currentPage = 1;
        this.pageCount = this.$constants.page.PAGE_COUNT_DEFAULT;
        this.goSearch();
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(QUERY_CARD_CAN_RECEIVE, this.refreshPages);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(QUERY_CARD_CAN_RECEIVE, this.refreshPages);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .ReceiveCardList {
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
