<template>
  <div class="PosMachineQuery">
    <common-page-search
      :list="posMachineList"
      :doSearch="doSearch"
      :total="total"
      :tableHeader="tableHeader"
      :handleTableSelection="handleTableSelection"
      :loading="loading"
      @pageChange="handlePageChange"
      @pageSizeChange="handlePageSizeChange"
    >
      <common-query-tool-bar
        showDoubleSearch
        :firstLabelText="getLang('LABEL_COMPANY')"
        :firstHintText="getLang('PLACEHOLDER_COMPANY')"
        :lastLabelText="getLang('TABLE_HEADER_POS_MACHINE_TERMINAL_NO')"
        :lastHintText="getLang('TABLE_HEADER_POS_MACHINE_TERMINAL_NO')"
        :lastInputWidth="['width-270']"
        :doSearch="search"
        :searchButtonLabel="getLang('LABEL_SEARCH')"
        :customSearchButtonCheck="buttonDisableCheck"
        @firstQueryTextChanged="storeTextChanged"
        @lastQueryTextChanged="posTextChanged"
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import {POS_MACHINE_QUERY} from '../../store/Subjects';
  import {POS_MACHINE_PAGE_HEADER} from '../../store/Model/PosMachine';
  import RpcPosQuery from '../../api/Template/ErrorCode/ErrorRpcSDKZhongBaiPOSMachineQuery';

  export default {
    name: 'PosMachineQuery',
    components: {},
    props: {},
    data () {
      return {
        posMachineList: [],
        total: 0,
        doSearch: false,
        storeName: null,
        posMachineNo: null,
        status: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          POS_MACHINE_PAGE_HEADER,
          {},
          this.headerSelection(),
          this.formatTableValueMap()
        ),
        loading: false
      };
    },
    computed: {},
    methods: {
      dataInit: function () {
      },
      reset: function () {
        this.currentPage = 1;
        this.pageCount = this.$constants.page.PAGE_COUNT_DEFAULT;
        this.status = null;
      },
      storeTextChanged: function (v) {
        if (v !== this.storeName) {
          this.reset();
          this.storeName = v;
        }
      },
      posTextChanged: function (v) {
        if (v !== this.posMachineNo) {
          this.reset();
          this.posMachineNo = v;
        }
      },
      headerSelection: function () {
        return {
          'POS_STATUS': {
            key: 'POS_STATUS',
            selection: [
              this.getLang('MINIPAY_STATUS_ALL'),
              this.getLang('MINIPAY_STATUS_NORMAL'),
              this.getLang('MINIPAY_STATUS_FROZEN'),
              this.getLang('MINIPAY_STATUS_VALID')
            ]
          }
        };
      },
      buttonDisableCheck: function (storeName, posMachineNo) {
        return !(storeName.length > 0 || posMachineNo.length > 0);
      },
      search: function () {
        this.doSearch = true;
        this.goSearch();
      },
      goSearch: function () {
        this.loading = true;
        this.$store.dispatch(POS_MACHINE_QUERY, {
          storeName: this.storeName,
          posMachineNo: this.posMachineNo,
          pageIndex: this.currentPage,
          pageCount: this.pageCount,
          status: this.status
        });
      },
      refreshPages: function (payload) {
        this.loading = false;
        this.posMachineList = payload.list;
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
          case 'POS_STATUS':
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
        let status;
        switch (index) {
          case 1:
            status = [this.$constants.global.MINIPAY_STATUS_NORMAL];
            break;
          case 2:
            status = [this.$constants.global.MINIPAY_STATUS_FROZEN];
            break;
          case 3:
            status = [this.$constants.global.MINIPAY_STATUS_INVALID];
            break;
          default:
            break;
        }
        return JSON.stringify(status);
      },
      formatTableValueMap: function () {
        return {
          'POS_STATUS': this.getStatusCn
        };
      },
      posQueryRet: function () {
        this.loading = false;
      }
    },
    watch: {
      posMachineList: function (newVal, oldVal) {
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
      this.$bus.on(POS_MACHINE_QUERY, this.refreshPages);
      this.$bus.on(RpcPosQuery.method, this.posQueryRet);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(POS_MACHINE_QUERY, this.refreshPages);
      this.$bus.off(RpcPosQuery.method, this.posQueryRet);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .PosMachineQuery {
    width: 100%;
  }
</style>
