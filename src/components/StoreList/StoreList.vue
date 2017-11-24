<template>
  <div class="StoreList">
    <common-page-search
      :list="storeList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :tableOperation="tableOperation"
      :handleTableSelection="handleTableSelection"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        :labelText="getLang('LABEL_STORE')"
        :doSearch="search"
        :hintText="getLang('LABEL_COMPANY_NAME')"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>
<script type="text/javascript">
  import {COMPANY_QUERY} from '../../store/Subjects';
  import {COMPANY_PAGE_HEADER} from '../../store/Model/Company';

  export default {
    name: 'StoreList',
    components: {},
    props: {},
    data () {
      return {
        storeList: [],
        total: 0,
        doSearch: false,
        storeName: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          COMPANY_PAGE_HEADER,
          {},
          this.headerSelection(),
          this.formatTableValueMap()
        ),
        tableOperation: this.tableOperationList()
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
      },
      headerSelection: function () {
        return {};
      },
      tableOperationList: function () {
        return [
          {type: 'MODIFY', action: this.modifyStore},
          {type: 'DETAIL', action: this.detailStore}
        ];
      },
      formatTableValueMap: function () {
        return {
          'PARENT_STORE_NAME': this.nameCn,
          'BRAND_NAME': this.nameCn,
          'STORE_TYPE': this.getStoreType,
          'ORIGIN_STORE_NO': this.nameCn
        };
      },
      nameCn: function (name) {
        if (name) {
          return name === '' ? '--' : name;
        }
        return '--';
      },
      getStoreType: function (e) {
        return this.getLang(`STORE_TYPE_${e}`);
      },
      search: function (value) {
        this.doSearch = true;
        if (value.length === 0) {
          return '';
        }
        if (this.storeName === value) {
          this.goSearch();
        } else {
          this.storeName = value;
        }
      },
      refreshPages: function (payload) {
        this.storeList = payload.list;
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
        this.$store.dispatch(COMPANY_QUERY, {
          storeName: this.storeName,
          pageIndex: this.currentPage,
          pageCount: this.pageCount
        });
      },
      modifyStore: function (e) {
        this.gotoPage(this.$router, 'StoreModify', {
          company: e
        });
      },
      detailStore: function (e) {
        this.showCustomDialog(
          'StoreDetail',
          this.getLang('DIALOG_TITLE_STORE_DETAIL'),
          this.getLang('BTN_CONFIRM'),
          null, null, null,
          {
            'STORE_NO': e.get('STORE_NO'),
            'STORE_NAME': e.get('STORE_NAME'),
            'BANK_NAME': e.get('BANK_NAME'),
            'BANK_ACCOUNT': e.get('BANK_ACCOUNT'),
            'ADDRESS_NAME': e.get('ADDRESS_NAME'),
            'PARENT_STORE_NAME': e.get('PARENT_STORE_NAME'),
            'STORE_TYPE_NAME': this.getStoreType(e.get('STORE_TYPE')),
            'ORIGIN_STORE_NO': e.get('ORIGIN_STORE_NO'),
            'BRAND_NAME': e.get('BRAND_NAME')
          });
      }
    },
    watch: {
      storeName: function (newVal, oldVal) {
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
      this.$bus.on(COMPANY_QUERY, this.refreshPages);
    },
    beforeDestroy: function () {
      this.doSearch = false;
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(COMPANY_QUERY, this.refreshPages);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .StoreList {
    width: 100%;
    height: 100%;
  }
</style>
