<template>
  <div class="CardTypeAdd">
    <div class="container">
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_CARD_TYPE_NAME')"
        :hintText="getLang('LABEL_CARD_TYPE_NAME')"
        v-model="cardTypeName"
      ></common-input>
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_CARD_INIT_VALUE')"
        :hintText="getLang('LABEL_CARD_INIT_VALUE')"
        :errorText="getLang('ERROR_CARD_INIT_VALUE_GT_MAX_MONEY')"
        :unit="unitYuan"
        :showErrorText="initCardValueError"
        v-model.number="initCardValue"
      ></common-input>
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_SINGLE_RECHARGE_LIMIT')"
        :hintText="getLang('PLACEHOLDER_SINGLE_RECHARGE_MAX')"
        :errorText="getLang('ERROR_SINGLE_RECHARGE_MONEY_MAX_GT_MAX_MONEY')"
        :reminderText="getLang('REMINDER_SINGLE_RECHARGE_LIMIT')"
        :unit="unitYuan"
        :showErrorText="singleRechargeMaxError"
        v-model.number="singleRechargeMax"
      ></common-input>
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_SINGLE_RECHARGE_LIMIT_MIN')"
        :hintText="getLang('PLACEHOLDER_SINGLE_RECHARGE_LIMIT_MIN')"
        :errorText="getLang('ERROR_SINGLE_RECHARGE_MONEY_MIN_GT_MAX')"
        :reminderText="getLang('REMINDER_SINGLE_RECHARGE_LIMIT_MIN')"
        :unit="unitYuan"
        :showErrorText="singleRechargeMinError"
        v-model.number="singleRechargeMin"
      ></common-input>
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_MAX_MONEY_IN_CARD')"
        :hintText="getLang('PLACEHOLDER_MAX_MONEY_IN_CARD')"
        :reminderText="getLang('REMINDER_MAX_MONEY_IN_CARD')"
        :unit="unitYuan"
        v-model.number="maxMoney"
      ></common-input>
      <!--
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_MIN_MONEY_IN_CARD')"
        :hintText="getLang('LABEL_MIN_MONEY_IN_CARD')"
        :errorText="getLang('ERROR_CARD_MIN_MONEY_GT_MAX')"
        :reminderText="getLang('REMINDER_MIN_MONEY_IN_CARD')"
        :showErrorText="minMoneyError"
        :unit="unitYuan"
        v-model.number="minMoney"
      ></common-input>
      -->
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_VALIDITY')"
        :hintText="getLang('PLACEHOLDER_VALIDITY')"
        :reminderText="getLang('REMINDER_VALIDITY')"
        :unit="unitMonth"
        v-model.number="validity"
      ></common-input>
      <mu-raised-button
        class="confirm-btn"
        primary
        :disabled="confirmBtnDisabled"
        :label="getLang('BTN_CONFIRM_ADD')"
        @click="clickAdd"
      ></mu-raised-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {CARDTYPE_ADD} from '../../store/Subjects';

  export default {
    name: 'CardTypeAdd',
    components: {},
    props: {},
    data () {
      return {
        cardTypeName: '',
        initCardValue: 0,
        singleRechargeMax: '',
        singleRechargeMin: 0,
        maxMoney: '',
        minMoney: 0,
        validity: '',
        unitYuan: this.getLang('MONEY_UNIT'),
        unitMonth: this.getLang('MONTH'),
        // 错误提示
        initCardValueError: false,
        singleRechargeMaxError: false,
        singleRechargeMinError: false,
        minMoneyError: false
      };
    },
    computed: {
      confirmBtnDisabled: function () {
        // 全部都合格之后按钮才能点击
        return !(
          this.cardTypeName.length > 0 &&
          this.initCardValue >= 0 &&
          this.singleRechargeMin > 0 &&
          this.singleRechargeMax > 0 &&
          this.maxMoney > 0 &&
          this.$validator.positiveIntegerValid(this.validity)
        );
      }
    },
    methods: {
      dataInit: function () {
      },
      cardTypeAddSucc: function (e) {
        this.showToast(this.getLang('INFO_CARD_TYPE_ADD_SUCC'));
      },
      verifyInitCardValue () {
        return this.initCardValue <= this.maxMoney;
      },
      verifySingleRechargeMax () {
        return this.singleRechargeMax <= this.maxMoney;
      },
      verifySingleRechargeMin () {
        return this.singleRechargeMin <= this.singleRechargeMax;
      },
      verifyMinMoney () {
        return this.minMoney < this.maxMoney;
      },
      verifyInput () {
        this.initCardValueError = !this.verifyInitCardValue();
        this.singleRechargeMaxError = !this.verifySingleRechargeMax();
        this.singleRechargeMinError = !this.verifySingleRechargeMin();
//        this.minMoneyError = !this.verifyMinMoney();
      },
      clickAdd () {
        this.verifyInput();
        if (this.initCardValueError || this.singleRechargeMaxError || this.singleRechargeMinError || this.minMoneyError) {
          return false;
        }
        this.showCustomDialog(
          'CardTypeAdd',
          this.getLang('DIALOG_TITLE_CARD_TYPE_ADD'),
          this.getLang('BTN_CONFIRM_ADD'),
          null,
          this.clickReconfirm,
          null,
          {
            cardTypeName: this.cardTypeName,
            initCardValue: this.initCardValue,
            singleRechargeMax: this.singleRechargeMax,
            singleRechargeMin: this.singleRechargeMin,
            maxMoney: this.maxMoney,
            minMoney: this.minMoney,
            validity: this.validity
          }
        );
      },
      clickReconfirm () {
        this.$store.dispatch(CARDTYPE_ADD, {
          cardPrice: this.$money.yuan2Cent(this.initCardValue),
          cardTypeName: this.cardTypeName,
          termOfValidity: this.validity,
          singleRechargeLimitMin: this.$money.yuan2Cent(this.singleRechargeMin),
          singleRechargeLimit: this.$money.yuan2Cent(this.singleRechargeMax),
          moneyLimitMax: this.$money.yuan2Cent(this.maxMoney),
          moneyLimitMin: this.$money.yuan2Cent(this.minMoney)
        });
      }
    },
    watch: {
      initCardValue () {
        this.initCardValueError = false;
      },
      singleRechargeMax () {
        this.singleRechargeMaxError = false;
      },
      singleRechargeMin () {
        this.singleRechargeMinError = false;
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(CARDTYPE_ADD, this.cardTypeAddSucc);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(CARDTYPE_ADD, this.cardTypeAddSucc);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .CardTypeAdd {
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
  }
</style>
