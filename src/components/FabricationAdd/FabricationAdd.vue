<template>
  <div class="FabricationAdd">
    <div class="container">
      <div class="card-name-wrapper">
        <common-input
          showAsterisk
          :labelText="getLang('LABEL_CARD_NAME')"
        >
          <drop-down-search
            slot="customInput"
            :hintText="getLang('PLACEHOLDER_CARD_TYPE_QUERY')"
            :formatValue="formatValue"
            :subject="cardTypeQuerySubject"
            :filterLoaded="filterCardTypeLoaded"
            :queryKey="'cardTypeName'"
            :paramsExtends="cardTypeQueryParams"
            @choose="chooseItem"
          ></drop-down-search>
        </common-input>
      </div>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_FABRICATION_ADD_COUNT')"
        :hintText="`${remainingCardCount}`"
        :errorText="getLang('ERROR_FABRICATION_COUNT_INPUT')"
        :unit="getLang('UNIT_CARD')"
        :showErrorText="countState && cardTypeModel!== null"
        v-model="count"
      ></common-input>
      <div class="information">
        <div class="information-top">
          {{$t('REMINDER_SURPLUS_CARD_NUM', {count: parseInt(this.remainingCardCount)})}}
        </div>
        <div class="information-bottom">{{$t('REMINDER_SURPLUS_CARD_DESC')}}</div>
      </div>
      <mu-raised-button
        :label="getLang('BTN_CONFIRM_ADD')"
        class="confirm-btn"
        :disabled="countState"
        @click="apply"
        primary>
      </mu-raised-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {CARDTYPE_QUERY, FABRICATION_APPLY} from '../../store/Subjects.js';

  export default {
    name: 'FabricationAdd',
    props: {},
    data () {
      return {
        count: 0,
        realCount: 0,
        cardTypeQuerySubject: CARDTYPE_QUERY,
        cardTypeQueryParams: {status: JSON.stringify([this.$constants.global.MINIPAY_STATUS_NORMAL])},
        cardTypeModel: null
      };
    },
    computed: {
      countState () {
        return this.remainingCardCount < this.realCount || this.remainingCardCount === 0 || !this.$validator.positiveIntegerValid(this.count);
      },
      remainingCardCount () {
        return this.cardTypeModel === null ? 0 : this.cardTypeModel.get('LEFT_COUNT');
      }
    },
    methods: {
      chooseItem: function (item) {
        this.cardTypeModel = item;
        if (this.cardTypeModel !== null) {
          this.count = this.cardTypeModel.get('LEFT_COUNT');
        } else {
          this.count = 0;
        }
      },
      filterCardTypeLoaded: function (payload) {
        return payload.list;
      },
      fabrication: function () {
        this.$store.dispatch(FABRICATION_APPLY, [this.cardTypeModel.get('MERCHANT_CARDTYPE_ID'), parseInt(this.realCount)]);
      },
      confirmFabricationApply: function (result) {
        this.showToast(this.getLang('INFO_FABRICATION_CARD_SUCC'));
      },
      formatValue (item) {
        if (this.getPlugin('lodash').isObject(item)) {
          return `[${item.get('MERCHANT_CARDTYPE_ID')}] ${item.get('CARDTYPE_NAME')}`;
        }
        return '';
      },
      dataInit: function () {
      },
      apply: function () {
        this.showCustomDialog(
          'FabricationAdd',
          this.getLang('DIALOG_TITLE_CARD_FABRICATION_ADD'),
          this.getLang('BTN_CONFIRM_FABRICATION'),
          null,
          this.fabrication,
          null,
          {
            cardTypeName: this.cardTypeModel.get('CARDTYPE_NAME'),
            count: this.realCount
          }
        );
      }
    },
    watch: {
      count: function (newVal, oldVal) {
        if (newVal === '') {
          let that = this;
          this.$nextTick(function () {
            that.count = '';
          });
        } else {
          let valid = this.$constants.regexp.NATURAL_INTEGER.test(newVal);
          if (!valid) {
            let that = this;
            this.$nextTick(function () {
              that.count = oldVal === '' ? '' : oldVal;
            });
          }
        }
        this.realCount = this.count === '' ? 0 : parseInt(this.count);
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(FABRICATION_APPLY, this.confirmFabricationApply);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(FABRICATION_APPLY, this.confirmFabricationApply);
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable";

  .FabricationAdd {
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
      margin-left: 63px;
      margin-top: 20px;
      .information-bottom {
        margin-left: 25px;
        margin-top: 10px;
      }
    }
  }
</style>
