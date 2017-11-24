<template>
  <div class="StoreAdd">
    <div class="container">
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
          class="select-drop-down"
          slot="customInput"
          fullWidth
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
        :labelText="getLang('LABEL_STORE_NAME')"
        v-model="storeName"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_STORE_ADDRESS')"
        v-model="addressName"
      ></common-input>
      <mu-raised-button
        class="add-store-btn"
        :label="getLang('BTN_CONFIRM_ADD')"
        primary
        :disabled="!confirmBtnDisabled"
        @click='clickAdd'
      ></mu-raised-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {COMPANY_ADD} from '../../store/Subjects.js';

  export default {
    name: 'StoreAdd',
    data () {
      return {
        companyName: '',
        storeName: '',
        companyListBrands: [],
        brandTextValue: '',
        brandId: '',
        addressName: '',
        originStoreNo: '',
        parentStoreNo: '',
        getSubCompany: [],
        subCompanyId: null,
        storeNumberValid: /^(([1-9])|(\d{2,255}))$/
      };
    },
    computed: {
      confirmBtnDisabled () {
        return this.trimString(this.addressName).length > 0 &&
          this.trimString(this.storeName).length > 0 &&
          this.storeNumberValid.test(this.trimString(this.originStoreNo));
      }
    },
    methods: {
      dataInit: function () {
        this.companyListBrands = this.getModuleGetterByName('getBrands');
        this.getSubCompany = this.getModuleGetterByName('getSubCompany');
        this.subCompanyId = 0;
        this.companyName = this.getSubCompany[this.subCompanyId].get('STORE_NAME');
        this.parentStoreNo = this.getSubCompany[this.subCompanyId].get('STORE_NO');
        this.brandId = this.companyListBrands[0].get('ID') + '';
        this.brandTextValue = this.companyListBrands[0].get('BRAND_NAME');
      },
      handleSelectedBrandColor (index) {
        return this.brandId !== index ? 'selected-color' : 'unselected-color';
      },
      handleSelectedSubCompany (index) {
        return this.subCompanyId !== index ? 'selected-color' : 'unselected-color';
      },
      handleSubCompany (value) {
        this.companyName = this.getSubCompany[value].get('STORE_NAME');
        this.parentStoreNo = this.getSubCompany[value].get('STORE_NO');
      },
      clickAdd () {
        this.showCustomDialog(
          'AddStore',
          this.getLang('DIALOG_TITLE_STORE_ADD'),
          '',
          this.getLang('BTN_CONFIRM_ADD'),
          this.clickReconfirm,
          null,
          {
            companyName: this.companyName,
            brand: this.brandTextValue,
            originStoreNo: this.trimString(this.originStoreNo),
            storeName: this.trimString(this.storeName),
            addressName: this.trimString(this.addressName)
          }
        );
      },
      clickReconfirm () {
        this.$store.dispatch(COMPANY_ADD, {
          storeName: this.trimString(this.storeName),
          parentStoreNo: this.parentStoreNo,
          brandId: parseInt(this.brandId),
          addressName: this.trimString(this.addressName),
          originStoreNo: this.trimString(this.originStoreNo),
          storeType: 0
        });
      },
      handleChange (value) {
        this.brandId = value;
        this.brandTextValue = this.companyListBrands[value - 1].get('BRAND_NAME');
      },
      getAddStoreResult () {
        this.showToast(this.getLang('INFO_ADD_COMPANY_SUCC'));
      }
    },
    watch: {},
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(COMPANY_ADD, this.getAddStoreResult);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(COMPANY_ADD, this.getAddStoreResult);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .StoreAdd {
    width: 100%;
    color: @color-7e8e97;
    .container {
      position: relative;
      padding-top: 20px;
      margin-left: 20px;
      width: 450px;
      .add-store-btn {
        margin: 30px 0 0 350px;
      }
    }
  }
</style>
