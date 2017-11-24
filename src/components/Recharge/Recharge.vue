<template>
  <div class="Recharge">
    <div class="container">
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_START_CARD')"
        :hintText="getLang('PLACEHOLDER_CARD')"
        :errorText="getLang('ERROR_PREPAIDCARD_NO')"
        :reminderText="getLang('REMINDER_CARD_NUMBER_RULE')"
        v-model="startPrePaidCardId"
      ></common-input>
      <common-input
        showAsterisk
        :inputType="'number'"
        :labelText="getLang('LABEL_COUNT')"
        :hintText="getLang('PLACEHOLDER_RECHARGE_CARD_COUNT')"
        :errorText="countError"
        :unit="getLang('UNIT_CARD')"
        :showErrorText="countState"
        v-model.number="rechargeCount"
      ></common-input>
      <common-input
        showAsterisk
        :inputType="'number'"
        :labelText="getLang('LABEL_EVERY_CARD_RECHARGE')"
        :hintText="getLang('PLACEHOLDER_RECHARGE_MONEY')"
        :unit="getLang('MONEY_UNIT')"
        :showErrorText="countState"
        v-model.number="amount"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_COMPANY')"
      >
        <mu-select-field
          slot="customInput"
          fullWidth
          class="select-drop-down"
          @change="handleSubCompany"
          v-model="subCompanySelectIndex">
          <mu-menu-item
            v-for="(item,index) in subCompany"
            :key="index"
            :value="index"
            :title="item.get('STORE_NAME')"
            :titleClass="handleSelectedSubCompany(index)"
          ></mu-menu-item>
        </mu-select-field>
      </common-input>
      <p class="information">{{information}}</p>
      <mu-raised-button
        class="confirm-btn"
        primary
        :disabled="rechargeBtnDisabled"
        :label="getLang('BTN_RECHARGE_CONFIRM')"
        @click="doRecharge"
      ></mu-raised-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {QUERY_CARD_DETAIL} from '../../store/Subjects';

  export default {
    name: 'Recharge',
    components: {},
    props: {},
    data () {
      let max = this.$constants.logic.MAX_PREPAIDCARD_RECHARGE_COUNT;
      return {
        maxCount: max,
        startPrePaidCardId: '',
        amount: '',
        rechargeCount: 1,
        information: this.getLang('REMINDER_RECHARGE_COUNT', {count: max}),
        countError: this.getLang('REMINDER_RECHARGE_CARD', {count: max}),
        subCompanySelectIndex: -1,
        subCompany: []
      };
    },
    computed: {
      rechargeBtnDisabled () {
        return !(
          this.trimString(this.startPrePaidCardId).length !== 19 &&
          this.$validator.moneyValid(this.amount) &&
          this.rechargeCount >= 1 &&
          this.rechargeCount <= this.maxCount
        );
      },
      countState () {
        return parseInt(this.rechargeCount) > this.maxCount;
      }
    },
    methods: {
      dataInit: function () {
        this.subCompany = this.getModuleGetterByName('getSubCompany');
        this.subCompanySelectIndex = 0;
      },
      handleSelectedSubCompany (index) {
        return this.subCompanySelectIndex !== index ? 'selected-color' : 'unselected-color';
      },
      handleSubCompany: function (index) {
      },
      doRecharge: function () {
        this.$store.dispatch(QUERY_CARD_DETAIL, this.trimString(this.startPrePaidCardId));
      },
      rechargeConfirm: function (e) {
        this.gotoPage(this.$router, 'RechargeConfirm', {}, {
          startPrePaidCardId: this.trimString(this.startPrePaidCardId),
          amount: this.amount,
          count: this.rechargeCount,
          name: e.CARDTYPE_NAME,
          c: this.subCompany[this.subCompanySelectIndex].get('STORE_NO')
        });
      }
    },
    watch: {
      startPrePaidCardId: function (newVal, oldVal) {
        if (newVal === '') {
          let that = this;
          this.$nextTick(function () {
            that.startPrePaidCardId = '';
          });
        } else {
          let valid = this.$constants.regexp.PREPAIDCARD_NO.test(newVal);
          if (!valid) {
            let that = this;
            this.$nextTick(function () {
              that.startPrePaidCardId = oldVal === '' ? '' : this.formatPrePaidCardId(oldVal);
            });
          } else {
            this.startPrePaidCardId = this.formatPrePaidCardId(newVal);
          }
        }
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(QUERY_CARD_DETAIL, this.rechargeConfirm);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(QUERY_CARD_DETAIL, this.rechargeConfirm);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .Recharge {
    width: 100%;
    .container {
      position: relative;
      padding-top: 20px;
      margin-left: 20px;
      width: 450px;
    }
    .confirm-btn {
      position: absolute;
      margin-top: 30px;
      right: 0;
    }

    .information {
      font-size: 12px;
      color: @color-999999;
      margin-left: 50px;
      margin-top: 20px;
    }
  }
</style>
