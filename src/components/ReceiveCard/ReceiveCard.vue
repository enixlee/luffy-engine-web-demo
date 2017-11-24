<template>
  <div class="ReceiveCard">
    <div class="container">
      <common-information
        :labelText="getLang('LABEL_BATCH')"
        :infoText="fabricationBatchId"
      ></common-information>
      <common-information
        :labelText="getLang('TABLE_HEADER_CARDTYPE_NAME')"
        :infoText="cardTypeName"
      ></common-information>
      <common-information
        :labelText="getLang('LABEL_CARD_INIT_VALUE')"
        :infoText="money"
      ></common-information>
      <common-input
        showAsterisk
        :inputType="'number'"
        :labelText="getLang('LABEL_CARD_GET_NUMBER')"
        :hintText="`${leftCount}`"
        :errorText="getLang('ERROR_RECEIVE_CARD_NOT_ENOUGH')"
        :unit="getLang('UNIT_CARD')"
        :showErrorText="countState"
        v-model.number="count"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_LEAD_PERSON')"
      >
        <drop-down-search
          slot="customInput"
          :hintText="getLang('PLACEHOLDER_SEARCH_MANAGER_NAME')"
          :formatValue="formatValue"
          :subject="userQuerySubject"
          :filterLoaded="filterUserLoaded"
          :queryKey="'name'"
          @choose="chooseItem"
        ></drop-down-search>
      </common-input>
      <p class="information">{{ $t('REMINDER_LEFT_COUNT', {leftCount: leftCount}) }}</p>
      <mu-raised-button
        :label="getLang('BTN_LEAD_CARD')"
        class="confirm-btn"
        :disabled="btnDisable"
        @click="receiveCard2Company"
        primary>
      </mu-raised-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {USER_QUERY, SUB_COMPANY_RECEIVE_CARD} from '../../store/Subjects';

  export default {
    name: 'ReceiveCard',
    data () {
      return {
        cardTypeName: null,
        fabricationBatchId: null,
        initValue: 0,
        leftCount: 0,
        count: 0,
        cardTypeId: null,
        userQuerySubject: USER_QUERY,
        user: null,
        startPrepaidCardId: null,
        receiveCount: 0
      };
    },
    computed: {
      countState () {
        return this.leftCount < this.count || this.leftCount === 0;
      },
      btnDisable () {
        return this.countState || !this.getPlugin('lodash').isObject(this.user) || !this.$validator.positiveIntegerValid(this.count);
      },
      money () {
        return this.$money.money2Show(this.$money.yuan2Cent(this.initValue), '') + this.getLang('MONEY_UNIT');
      }
    },
    methods: {
      dataInit: function () {
        let query = this.$route.query;
        this.fabricationBatchId = query.b;
        this.cardTypeName = query.n;
        this.initValue = query.v || 0;
        this.leftCount = query.c || 0;
        this.cardTypeId = query.cid;
        this.startPrepaidCardId = query.s;
        this.receiveCount = query.u || 0;

        if (!this.stringNotEmpty(this.fabricationBatchId) ||
          !this.stringNotEmpty(this.cardTypeName) ||
          !this.stringNotEmpty(this.cardTypeId)
        ) {
          this.goReceiveList();
        }
      },
      receiveCard2Company: function () {
        if (this.user.isHeadquarterUser()) {
          // 领卡人不能是总公司
          this.showDialog(this.getLang('ERROR_RECEIVE_BY_HEADQUARTER'), this.getLang('BTN_CONFIRM'));
        } else {
          this.showCustomDialog(
            'ReceiveCard',
            this.getLang('DIALOG_TITLE_RECEIVE_CARD'),
            this.getLang('BTN_LEAD_CARD'),
            null,
            this.receiveCardCallback,
            null,
            {
              fabricationBatchId: this.fabricationBatchId,
              cardTypeName: this.cardTypeName,
              initValue: this.initValue,
              count: this.count,
              startPrepaidCardId: this.calPrePaidCardOffset(this.startPrepaidCardId, parseInt(this.receiveCount)),
              name: this.user.get('NAME'),
              storeName: this.user.get('STORE_NAME')
            }
          );
        }
      },
      receiveCardCallback () {
        this.$store.dispatch(SUB_COMPANY_RECEIVE_CARD, [
          this.fabricationBatchId,
          this.count,
          this.user.get('STORE_NO'),
          this.user.get('USER_ID')
        ]);
      },
      filterUserLoaded: function (payload) {
        return payload.list;
      },
      formatValue (item) {
        if (this.getPlugin('lodash').isObject(item)) {
          return `[${item.get('USER_ID')}] ${item.get('NAME')}`;
        }
        return '';
      },
      chooseItem: function (item) {
        this.user = item;
      },
      goReceiveList: function () {
        this.gotoPage(this.$router, 'ReceiveCardList');
      },
      receiveCardSucc: function (e) {
        this.showToast(this.getLang('INFO_SUB_COMPANY_RECEIVE_CARD_SUCC'));
      }
    },
    watch: {},
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(SUB_COMPANY_RECEIVE_CARD, this.receiveCardSucc);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(SUB_COMPANY_RECEIVE_CARD, this.receiveCardSucc);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .ReceiveCard {
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
