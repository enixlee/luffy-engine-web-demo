<template>
  <div class="ReceiveCardRecord">
    <common-page-search
      :list="recordList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :handleTableSelection="handleTableSelection"
      :loading="loading"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        :labelText="getLang('LABEL_BATCH_NO')"
        :doSearch="search"
        :hintText="getLang('PLACEHOLDER_QUERY_BATCH_NO')"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>
<script type="text/javascript">
  import {QUERY_CARD_RECEIVE_RECORD} from '../../store/Subjects';
  import {CARD_RECEIVE_RECORD_PAGE_HEADER} from '../../store/Model/CardReceiveRecord';

  export default {
    name: 'ReceiveCardRecord',
    components: {},
    props: {},
    data () {
      return {
        recordList: [],
        total: 0,
        doSearch: false,
        fabricationBatchId: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          CARD_RECEIVE_RECORD_PAGE_HEADER,
          {},
          {},
          this.formatTableValueMap()
        ),
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
        if (this.fabricationBatchId === value) {
          this.goSearch();
        } else {
          this.fabricationBatchId = value;
        }
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.recordList = payload.list;
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
      },
      goSearch: function () {
        this.loading = true;
        this.$store.dispatch(QUERY_CARD_RECEIVE_RECORD, {
          fabricationBatchId: this.fabricationBatchId,
          pageIndex: this.currentPage,
          pageCount: this.pageCount
        });
      }
    },
    watch: {
      fabricationBatchId: function (newVal, oldVal) {
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
      this.$bus.on(QUERY_CARD_RECEIVE_RECORD, this.refreshPages);
    },
    beforeDestroy: function () {
      this.doSearch = false;
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(QUERY_CARD_RECEIVE_RECORD, this.refreshPages);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .ReceiveCardRecord {
    width: 100%;
    height: 100%;
  }
</style>
