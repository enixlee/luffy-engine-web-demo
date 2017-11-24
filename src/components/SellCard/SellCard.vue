<template>
  <div class="SellCard">
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
        :labelText="getLang('LABEL_COUNT')"
        :hintText="getLang('PLACEHOLDER_SELL_CARD_COUNT')"
        :errorText="countError"
        :unit="getLang('UNIT_CARD')"
        :showErrorText="countState"
        v-model="sellCount"
      ></common-input>
      <p class="information">{{ $t('REMINDER_WARN_MESSAGE', {count: maxCount}) }}</p>
      <mu-raised-button
        class="confirm-btn"
        primary
        :disabled="sellBtnDisabled"
        :label="getLang('BTN_SURE_COMMIT')"
        @click="doSell"
      ></mu-raised-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {QUERY_CARD_DETAIL} from '../../store/Subjects';

  export default {
    name: 'SellCard',
    components: {},
    props: {},
    data () {
      let max = this.$constants.logic.MAX_PREPAIDCARD_SELL_COUNT;
      return {
        maxCount: max,
        countError: this.getLang('ERROR_SELL_CARD_BEYOND_MAX', {max: max}),
        information: this.getLang('REMINDER_WARN_MESSAGE', {count: max}),
        startPrePaidCardId: '',
        sellCount: 1
      };
    },
    computed: {
      countState () {
        return parseInt(this.sellCount) > this.maxCount;
      },
      sellBtnDisabled () {
        return this.trimString(this.startPrePaidCardId).length !== 19 || this.countState;
      }
    },
    methods: {
      dataInit: function () {
      },
      doSell: function () {
        this.$store.dispatch(QUERY_CARD_DETAIL, this.trimString(this.startPrePaidCardId));
      },
      sellConfirm: function (e) {
        this.gotoPage(this.$router, 'SellCardConfirm', {}, {
          startPrePaidCardId: this.trimString(this.startPrePaidCardId),
          count: this.sellCount,
          name: e.CARDTYPE_NAME
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
      this.$bus.on(QUERY_CARD_DETAIL, this.sellConfirm);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(QUERY_CARD_DETAIL, this.sellConfirm);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .SellCard {
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
      margin-left: 66px;
      margin-top: 20px;
    }
  }
</style>
