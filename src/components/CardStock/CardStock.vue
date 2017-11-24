<template>
  <div class="CardStock">
    <common-page-search
      :list="cardStockList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :leftSpace="leftSpace"
      :loading="loading"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        :doSearch="search"
        :labelText="getLang('LABEL_SUBSIDIARY')"
        :hintText="getLang('PLACEHOLDER_SUBSIDIARY')"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
      >
        <p
          class="tool-bar-info"
          v-if="sum && subsidiaryName"
        >{{ $t('REMINDER_TOOL_BAR_CARD_STOCK', {subsidiaryName: this.subsidiaryName, count: this.sum}) }}</p>
      </common-query-tool-bar>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import {STOCK_PAGE_HEADER} from '../../store/Model/Stock';
  import {STOCK_QUERY} from '../../store/Subjects';

  export default {
    name: 'CardStock',
    components: {},
    props: {},
    data () {
      return {
        loading: false,
        cardStockList: [],
        total: 0,
        leftSpace: 20,
        doSearch: false,
        subsidiaryName: null,
        currentPage: 1,
        sum: '',
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          STOCK_PAGE_HEADER
        )
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
      },
      search: function (value) {
        this.doSearch = true;
        if (value.length === 0) {
          return '';
        }
        if (this.subsidiaryName === value) {
          this.goSearch();
        } else {
          this.subsidiaryName = value;
        }
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.sum = payload.sum;
        this.cardStockList = payload.list;
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
        this.$store.dispatch(STOCK_QUERY, {
          storeName: this.trimString(this.subsidiaryName),
          pageIndex: this.currentPage,
          pageCount: this.pageCount
        });
      }
    },
    watch: {
      subsidiaryName: function (newVal, oldVal) {
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
      this.$bus.on(STOCK_QUERY, this.refreshPages);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(STOCK_QUERY, this.refreshPages);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .CardStock {
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
