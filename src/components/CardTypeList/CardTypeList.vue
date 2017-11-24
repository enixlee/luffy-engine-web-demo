<template>
  <div class="CardTypeList">
    <common-page-search
      :list="cardTypeList"
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
        :labelText="getLang('LABEL_CARDTYPE')"
        :doSearch="search"
        :hintText="getLang('PLACEHOLDER_CARD_TYPE_QUERY')"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
        :forceSearchEnable="true"
        @queryTextChanged="cardTypeNameChanged"
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>
<script type="text/javascript">
  import {CARDTYPE_QUERY} from '../../store/Subjects';
  import {CARDTYPE_PAGE_HEADER} from '../../store/Model/CardType';

  export default {
    name: 'CardTypeList',
    components: {},
    props: {},
    data () {
      return {
        cardTypeList: [],
        total: 0,
        doSearch: false,
        cardTypeName: null,
        status: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          CARDTYPE_PAGE_HEADER,
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
      dataInit: function () {
        this.search();
      },
      cardTypeNameChanged: function (v) {
        if (v !== this.cardTypeName) {
          this.reset();
          this.cardTypeName = v;
        }
      },
      headerSelection: function () {
        return {
          'STATUS': {
            key: 'STATUS',
            selection: [
              this.getLang('MINIPAY_STATUS_ALL'),
              this.getLang('MINIPAY_STATUS_VALID'),
              this.getLang('MINIPAY_STATUS_NORMAL')
            ]
          }
        };
      },
      tableOperationList: function () {
        return [
//          {type: 'MODIFY', action: this.modifyCardType},
//          {type: 'DETAIL', action: this.modifyCardType},
//          {type: 'FREEZE', action: this.modifyCardType},
//          {type: 'RESET', action: this.modifyCardType}
        ];
      },
      formatTableValueMap: function () {
        return {
          'INIT_CARD_VALUE': this.$money.cent2yuan,
          'SINGLE_RECHARGE_LIMIT': this.$money.cent2yuan,
          'SINGLE_RECHARGE_LIMIT_MIN': this.$money.cent2yuan,
          'HIGHEST_MONEY_LIMIT': this.$money.cent2yuan,
          'HIGHEST_VIRTUAL_MONEY_LIMIT': this.$money.cent2yuan,
          'STATUS': this.getStatusCn,
          'REVIEW_STATUS': this.getReviewStatusCn
        };
      },
      modifyCardType: function (e) {
        console.info(e);
      },
      search: function (value) {
        this.doSearch = true;
        this.goSearch();
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.cardTypeList = payload.list;
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
            this.status = this.getStatusByIndex(index);
            break;
          default:
            break;
        }
        this.goSearch();
      },
      getStatusByIndex: function (index) {
        if (index === 0) {
          return this.allStatus();
        }
        let status = index === 1 ? [
          this.$constants.global.MINIPAY_STATUS_INVALID,
          this.$constants.global.MINIPAY_STATUS_FROZEN,
          this.$constants.global.MINIPAY_STATUS_CANCELLATION,
          this.$constants.global.MINIPAY_STATUS_RETURN_BACK
        ] : [
          this.$constants.global.MINIPAY_STATUS_NORMAL
        ];
        return JSON.stringify(status);
      },
      goSearch: function () {
        this.loading = true;
        this.$store.dispatch(CARDTYPE_QUERY, {
          cardTypeName: this.cardTypeName,
          pageIndex: this.currentPage,
          pageCount: this.pageCount,
          status: this.status
        });
      },
      reset: function () {
        this.currentPage = 1;
        this.pageCount = this.$constants.page.PAGE_COUNT_DEFAULT;
        this.status = null;
      }
    },
    watch: {
      cardTypeList: function (newVal, oldVal) {
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
      this.$bus.on(CARDTYPE_QUERY, this.refreshPages);
    },
    beforeDestroy: function () {
      this.doSearch = false;
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(CARDTYPE_QUERY, this.refreshPages);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .CardTypeList {
    width: 100%;
    height: 100%;
  }
</style>
