<template>
  <div class="FabricationRecord">
    <common-page-search
      :list="fabricationList"
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
      ></common-query-tool-bar>
    </common-page-search>
  </div>
</template>

<script type="text/javascript">
  import {
    FABRICATION_QUERY_RECORD,
    RECEIVE_ENTITY_CARD,
    EXPORT_FABRICATION_CARD_ID_FILE
  } from '../../store/Subjects';
  import {FABRICATION_PAGE_HEADER, getFabricationStatusByType} from '../../store/Model/Fabrication';

  export default {
    name: 'FabricationRecord',
    components: {},
    props: {},
    data () {
      return {
        fabricationList: [],
        total: 0,
        doSearch: false,
        cardTypeName: null,
        manufactured: null,
        currentPage: 1,
        pageCount: this.$constants.page.PAGE_COUNT_DEFAULT,
        tableHeader: this.$tablePage.formatTableHeader(
          FABRICATION_PAGE_HEADER,
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
      },
      headerSelection: function () {
        return {
          'MANUFACTURED': {
            key: 'MANUFACTURED',
            selection: [
              this.getLang('FABRICATION_STATUS_ALL'),
              this.getLang('FABRICATION_STATUS_NOT_MAKING'),
              this.getLang('FABRICATION_STATUS_PREPARE_MAKE'),
              this.getLang('FABRICATION_STATUS_COMPLETE')
            ]
          }
        };
      },
      tableOperationList: function () {
        return [
          {type: 'DOWNLOAD_FABRICATION', action: this.exportFile},
          {type: 'CONFIRM_RECEIVE', action: this.receiveCard}
        ];
      },
      exportFile: function (v) {
        this.$store.dispatch(EXPORT_FABRICATION_CARD_ID_FILE, v.get('FABRICATION_BATCH_ID'));
      },
      receiveCard: function (v) {
        v.set('INIT_CARD_VALUE_YUAN', this.$money.money2Show(v.get('INIT_CARD_VALUE'), ''));
        this.showCustomDialog(
          'ReceiveEntityCard',
          this.getLang('DIALOG_TITLE_CONFIRM_RECEIVES'),
          this.getLang('BTN_CONFIRM'),
          null,
          () => {
            this.$store.dispatch(RECEIVE_ENTITY_CARD, v.get('FABRICATION_BATCH_ID'));
          },
          null,
          v
        );
      },
      formatTableValueMap: function () {
        return {
          'MANUFACTURED': this.showManufactured,
          'REVIEW_STATUS': this.getReviewStatusCn
        };
      },
      showManufactured: function (status) {
        return this.getLang(`MANUFACTURE_STATUS_${status}`);
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
      refreshPages: function (payload) {
        this.loading = false;
        this.fabricationList = payload.list;
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
          case 'MANUFACTURED':
            this.manufactured = getFabricationStatusByType(index);
            break;
          default:
            break;
        }
        this.goSearch();
        this.manufactured = null;
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
        this.$store.dispatch(FABRICATION_QUERY_RECORD, {
          cardTypeName: this.cardTypeName,
          pageIndex: this.currentPage,
          pageCount: this.pageCount,
          manufactured: this.manufactured
        });
      },
      receiveEntityCardSucc: function (e) {
        this.showToast(this.getLang('INFO_RECEIVE_ENTITY_CARD_BEGIN'));
      },
      downloadCardFile: function (e) {
        this.downloadFile(e.downloadUrl);
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
      this.$bus.on(FABRICATION_QUERY_RECORD, this.refreshPages);
      this.$bus.on(RECEIVE_ENTITY_CARD, this.receiveEntityCardSucc);
      this.$bus.on(EXPORT_FABRICATION_CARD_ID_FILE, this.downloadCardFile);
    },
    beforeDestroy: function () {
      this.doSearch = false;
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(FABRICATION_QUERY_RECORD, this.refreshPages);
      this.$bus.off(RECEIVE_ENTITY_CARD, this.receiveEntityCardSucc);
      this.$bus.off(EXPORT_FABRICATION_CARD_ID_FILE, this.downloadCardFile);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .FabricationRecord {
    width: 100%;
  }
</style>
