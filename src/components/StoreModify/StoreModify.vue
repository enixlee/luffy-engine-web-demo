<template>
  <div class="StoreModify">
    <div class="container">
      <common-information
        :labelText="getLang('LABEL_COMPANY_IDENTIFIER')"
        :infoText="storeNo"
      ></common-information>
      <common-information
        :labelText="getLang('LABEL_COMPANY_TYPE')"
        :infoText="companyType"
      ></common-information>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_COMPANY')"
      >
        <mu-select-field
          class="select-drop-down"
          slot="customInput"
          fullWidth
          @change="handleSubCompany"
          v-model="subCompanyId">
          <mu-menu-item
            v-for="(item,index) in getSubCompany"
            :key="index"
            :value="index"
            :title="item.get('STORE_NAME')"
            :titleClass="handleSelectedSubCompany(index)"
          ></mu-menu-item>
        </mu-select-field>
      </common-input>
      <common-input
        showAsterisk
        :labelText="getLang('TABLE_HEADER_BRAND_NAME')"
      >
        <mu-select-field
          slot="customInput"
          fullWidth
          class="select-drop-down"
          v-model="brandId"
          @change="handleChange">
          <mu-menu-item
            v-for="item in companyListBrands "
            :key="item.get('ID')"
            :value="item.get('ID')"
            :title="item.get('BRAND_NAME')"
            :titleClass="handleSelectedBrandColor(item.get('ID'))"
          ></mu-menu-item>
        </mu-select-field>
      </common-input>
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_STORE_NO')"
        v-model="originStoreNo"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_COMPANY_NAME')"
        v-model="storeName"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_COMPANY_ADDRESS')"
        v-model="addressName"
      ></common-input>
      <div class="btn-box">
        <mu-raised-button
          :label="getLang('BTN_CANCEL')"
          class="btn-modify-cancel"
          @click="handleCancelModify">
        </mu-raised-button>
        <mu-raised-button
          :label="getLang('BTN_SURE_AMEND')"
          class="btn-modify-confirm"
          primary
          :disabled="!confirmBtnDisabled"
          @click="handleStoreModify">
        </mu-raised-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {COMPANY_MODIFY} from '../../store/Subjects.js';

  export default {
    name: 'StoreModify',
    components: {},
    props: {},
    data () {
      return {
        companyType: null,
        storeNo: null,
        storeName: '',
        addressName: '',
        companyListBrands: [],
        brandId: '',
        originStoreNo: '',
        parentStoreNo: '',
        getSubCompany: [],
        subCompanyId: null,
        sourceSubCompanyId: null,
        sourceBrandId: null,
        sourceOriginStoreNo: null,
        sourceStoreName: null,
        sourceAddressName: null,
        storeNumberValid: /^(([1-9])|(\d{2,255}))$/
      };
    },
    computed: {
      confirmBtnDisabled () {
        return this.trimString(this.storeName).length > 0 &&
          this.storeNumberValid.test(this.trimString(this.originStoreNo)) &&
          this.trimString(this.addressName).length > 0 && this.handleIsModify();
      }
    },
    methods: {
      dataInit: function () {
        let company = this.$route.params.company;
        if (company) {
          this.companyListBrands = this.getModuleGetterByName('getBrands');
          this.getSubCompany = this.getModuleGetterByName('getSubCompany');
          let subCompanyName = company.get('PARENT_STORE_NAME');
          let arr = [];
          this.getSubCompany.forEach((item) => {
            arr.push(item.get('STORE_NAME'));
          });
          this.subCompanyId = arr.indexOf(subCompanyName);
          this.sourceSubCompanyId = this.subCompanyId; // 原所属公司
          this.storeNo = company.get('STORE_NO');
          this.addressName = company.get('ADDRESS_NAME');
          this.sourceAddressName = this.addressName;
          this.companyType = this.getLang('STORE_TYPE_' + company.get('STORE_TYPE'));
          this.parentStoreNo = company.get('PARENT_STORE_NO');
          this.storeName = company.get('STORE_NAME');
          this.sourceStoreName = this.storeName;
          this.originStoreNo = company.get('ORIGIN_STORE_NO');
          this.sourceOriginStoreNo = this.originStoreNo;
          this.brandId = company.get('BRAND_ID');
          this.sourceBrandId = this.brandId;
        } else {
          this.gotoPage(this.$router, 'StoreList');
        }
      },
      handleSelectedBrandColor (index) {
        return this.brandId !== index ? 'selected-color' : 'unselected-color';
      },
      handleChange (value) {
        this.brandId = value;
      },
      handleSelectedSubCompany (index) {
        return this.subCompanyId !== index ? 'selected-color' : 'unselected-color';
      },
      handleSubCompany (value) {
        this.parentStoreNo = this.getSubCompany[value].get('STORE_NO');
      },
      handleCancelModify () {
        this.gotoPage(this.$router, 'StoreList');
      },
      handleIsModify () {
        return (this.brandId !== this.sourceBrandId) ||
          (this.sourceOriginStoreNo !== this.originStoreNo) ||
          (this.sourceStoreName !== this.storeName) ||
          (this.sourceAddressName !== this.addressName) ||
          (this.sourceSubCompanyId !== this.subCompanyId);
      },
      handleStoreModify () {
        this.$store.dispatch(COMPANY_MODIFY, {
          storeNo: this.storeNo,
          storeName: this.trimString(this.storeName),
          originStoreNo: this.trimString(this.originStoreNo),
          addressName: this.trimString(this.addressName),
          parentStoreNo: this.parentStoreNo,
          brandId: parseInt(this.brandId)
        });
      },
      getStoreModifyResult () {
        this.showToast(this.getLang('INFO_MODIFY_COMPANY_SUCC'));
      }
    },
    watch: {},
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(COMPANY_MODIFY, this.getStoreModifyResult);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(COMPANY_MODIFY, this.getStoreModifyResult);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .StoreModify {
    width: 100%;
    color: @color-7e8e97;
    .container {
      position: relative;
      padding-top: 20px;
      margin-left: 20px;
      width: 450px;
      .btn-box {
        margin: 30px 0 0 228px;
        .btn-modify-cancel {
          margin-right: 26px;
        }
      }
    }
  }
</style>
