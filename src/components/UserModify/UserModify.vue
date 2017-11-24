<template>
  <div class="UserModify">
    <div class="container">
      <common-information
        :labelText="getLang('LABEL_IDENTIFIER')"
        :infoText="userId"
      ></common-information>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_REAL_NAME')"
        :hintText="getLang('PLACEHOLDER_EMPLOYEE_NAME')"
        v-model="fullName"
        :errorText="getLang('ERROR_INPUT_FULL_NAME')"
        :showErrorText="showFullNameErrorText"
        :handleBlur="handleFullName"
      ></common-input>
      <common-input
        showAsterisk
        inputType="number"
        :labelText="getLang('LABEL_CELLPHONE')"
        :hintText="getLang('PLACEHOLDER_PHONE_RETRIEVE_PASSWORD')"
        :errorText="getLang('ERROR_PHONE_NUMBER_INPUT')"
        :showErrorText="showPhoneErrorText"
        v-model="cellPhone"
        :handleBlur="handleIphone"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_USER_NAME')"
        :hintText="getLang('PLACEHOLDER_USERNAME_RULE')"
        :errorText="getLang('ERROR_LOGIN_USERNAME_INPUT')"
        :showErrorText="showUsernameErrorText"
        v-model="userNameText"
        :handleBlur="handleUserNameText"
      ></common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_COMPANY')"
      >
        <drop-down-search
          slot="customInput"
          :hintText="getLang('PLACEHOLDER_COMPANY_NAME')"
          :formatValue="formatValue"
          :subject="storeTypeQuerySubject"
          :filterLoaded="filterStoreTypeLoaded"
          :queryKey="'storeName'"
          :paramsExtends="storeTypeQueryParams"
          @choose="chooseItem"
          :defaultTxt="defaultTxt"
        >
        </drop-down-search>
      </common-input>
      <common-input
        showAsterisk
        :labelText="getLang('LABEL_USER_ROLE')"
      >
        <mu-select-field
          slot="customInput"
          class="select-drop-down"
          fullWidth
          multiple
          :maxHeight="maxHeight"
          v-model="rolesId">
          <mu-menu-item
            v-for="role in roles "
            :key="role.get('ID')"
            :value="role.get('ID')"
            :title="role.get('ROLE_NAME')"
          ></mu-menu-item>
        </mu-select-field>
      </common-input>
      <div class="notice">
        <p class="notice-one">{{$t('REMINDER_JURISDICTION_INFO')}}</p>
      </div>
      <div class="btn-box">
        <mu-raised-button
          :label="getLang('BTN_CANCEL')"
          class="btn-modify-cancel"
          @click="handleCancelModify">
        </mu-raised-button>
        <mu-raised-button
          :label="getLang('BTN_SURE_AMEND')"
          class="btn-modify-true"
          :disabled="!confirmBtnDisabled"
          primary
          @click="handleUserModify">
        </mu-raised-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {COMPANY_QUERY, USER_MODIFY, USER_QUERY} from '../../store/Subjects.js';

  export default {
    name: 'UserModify',
    components: {},
    props: {},
    data () {
      return {
        fullName: null,
        userId: '',
        cellPhone: null,
        sourceCellPhone: null,
        showPhoneErrorText: false,
        showUsernameErrorText: false,
        showFullNameErrorText: false,
        userNameText: null,
        defaultTxt: '',
        storeNo: '',
        sourceStoreNo: '',
        rolesId: [],
        sourceRolesId: [],
        sourceFullName: null,
        sourceUserNameText: null,
        roles: [],
        maxHeight: 300,
        totalPageCount: 0,
        storeTypeQuerySubject: COMPANY_QUERY,
        storeTypeQueryParams: {status: JSON.stringify([this.$constants.global.MINIPAY_STATUS_NORMAL])}
      };
    },
    computed: {
      confirmBtnDisabled: function () {
        return this.trimString(this.fullName).length > 0 &&
          this.getPlugin('TypeCheck').isCellphone(this.cellPhone) && this.$validator.userNameValid(this.userNameText) && this.rolesId.length > 0 && this.handleIsModify();
      }
    },
    methods: {
      dataInit: function () {
        this.roles = this.getModuleGetterByName('getValidRoles');
        let user = this.$route.params.user;
        if (user) {
          this.rolesId = [...user.get('ROLES')];
          this.sourceRolesId = this.arrayToString(this.rolesId);
          this.userId = user.get('USER_ID');
          this.fullName = user.get('NAME');
          this.sourceFullName = this.fullName;
          this.cellPhone = user.get('CELLPHONE');
          this.sourceCellPhone = this.cellPhone;
          this.userNameText = user.get('USER_NAME');
          this.sourceUserNameText = this.userNameText;
          this.defaultTxt = user.get('STORE_NAME');
          this.storeNo = user.get('STORE_NO');
          this.sourceStoreNo = this.storeNo;
        } else {
          this.gotoPage(this.$router, 'UserList');
        }
      },
      formatValue (item) {
        if (this.getPlugin('lodash').isObject(item)) {
          return `[${item.get('STORE_NO')}] ${item.get('STORE_NAME')}`;
        }
        return '';
      },
      arrayToString (arr) {
        if (this.getPlugin('lodash').isArray(arr)) {
          return arr.map((item) => (parseInt(item))).sort((a, b) => (a - b)).toString();
        }
        return [];
      },
      handleIsModify () {
        return (this.sourceFullName !== this.fullName) || (this.sourceCellPhone !== this.cellPhone) || (this.sourceUserNameText !== this.userNameText) || (this.sourceStoreNo !== this.storeNo) || (this.arrayToString(this.rolesId) !== this.sourceRolesId);
      },
      filterStoreTypeLoaded (payload) {
        return payload.list;
      },
      chooseItem (item) {
        if (this.getPlugin('lodash').isObject(item)) {
          this.storeNo = item.get('STORE_NO');
        }
      },
      handleUserModify () {
        this.$store.dispatch(USER_QUERY, {
          userName: this.userNameText,
          pageIndex: 1,
          pageCount: 1
        });
      },
      checkUser: function (payload) {
        let user = payload.list[0];
        if (user && (user.get('USER_NAME') !== this.sourceUserNameText)) {
          // 用户名重复
          this.showDialog(this.getLang('INFO_USER_REPEAT'), this.getLang('BTN_CONFIRM'));
        } else {
          this.$store.dispatch(USER_MODIFY, {
            userName: this.userNameText,
            userId: this.userId,
            name: this.fullName,
            cellphone: this.cellPhone,
            storeNo: this.storeNo,
            role: JSON.stringify(this.rolesId.map((item) => (parseInt(item))))
          });
        }
      },
      getUserModifyResult () {
        this.showToast(this.getLang('INFO_USER_MODIFY_SUCC'));
      },
      handleCancelModify () {
        this.gotoPage(this.$router, 'UserList');
      },
      handleFullName () {
        this.showFullNameErrorText = !this.trimString(this.fullName).length > 0;
      },
      handleIphone () {
        this.showPhoneErrorText = !this.getPlugin('TypeCheck').isCellphone(this.cellPhone);
      },
      handleUserNameText () {
        this.showUsernameErrorText = !this.$validator.userNameValid(this.userNameText);
      }
    },
    watch: {
      fullName () {
        this.showFullNameErrorText = false;
      },
      cellPhone () {
        this.showPhoneErrorText = false;
      },
      userNameText () {
        this.showUsernameErrorText = false;
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(USER_MODIFY, this.getUserModifyResult);
      this.$bus.on(USER_QUERY, this.checkUser);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(USER_MODIFY, this.getUserModifyResult);
      this.$bus.off(USER_QUERY, this.checkUser);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .UserModify {
    width: 100%;
    color: @color-7e8e97;
    .container {
      position: relative;
      padding-top: 20px;
      margin-left: 20px;
      width: 450px;
      .notice {
        margin: 30px 0 0 58px;
        font-size: 12px;
        color: #999;
      }
      .btn-box {
        margin: 50px 0 0 230px;
        .btn-modify-cancel {
          margin-right: 26px;
        }
      }
    }
  }
</style>
