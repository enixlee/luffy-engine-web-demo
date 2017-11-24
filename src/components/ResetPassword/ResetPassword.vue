<template>
  <div class="ResetPassword">
    <div class="container">
      <common-information
        :labelText="getLang('LABEL_REAL_NAME')"
        :infoText="realName"
      ></common-information>
      <common-information
        :labelText="getLang('LABEL_USER_NAME')"
        :infoText="userName"
      ></common-information>
      <common-information
        :labelText="getLang('LABEL_CELLPHONE')"
        :infoText="formatCellphone"
      ></common-information>
      <verification-input
        :requestFunc="requestResetLoginPasswordVerifyCode"
        :errorText="getLang('ERROR_CAPTCHA_INPUT')"
        :showErrorText="verifyCodeError"
        :handleBlur="verifyCodeBlur"
        v-model="verifyCodeVal"
      ></verification-input>
      <common-input
        showAsterisk
        inputType="password"
        :labelText="getLang('LABEL_NEW_PASSWORD')"
        :hintText="getLang('INPUT_PLACEHOLDER_NEW_PASSWORD')"
        :errorText="getLang('ERROR_MODIFY_PASSWORD_INPUT')"
        :showErrorText="newPasswordError"
        :handleBlur="newPasswordBlur"
        v-model="newPassword"
      ></common-input>
      <common-input
        showAsterisk
        inputType="password"
        :labelText="getLang('LABEL_CONFIRM_PASSWORD')"
        :hintText="getLang('INPUT_PLACEHOLDER_RETYPE_NEW_PASSWORD')"
        :errorText="getLang('ERROR_MODIFY_RETYPE_PASSWORD_INPUT')"
        :showErrorText="confirmPasswordError"
        :handleBlur="confirmPasswordBlur"
        v-model="confirmPassword"
      ></common-input>
      <mu-raised-button
        class="reset-button"
        :label="getLang('BTN_CONFIRM')"
        :disabled="modifyDisable"
        primary
        @click="clickReset"
      ></mu-raised-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import CommonInformation from '../../external/components/CommonInformation/CommonInformation.vue';
  import VerificationInput from '../../external/components/VerificationInput/VerificationInput.vue';
  import {REQUEST_MODIFY_LOGIN_PWD_SMS, MODIFY_LOGIN_PASSWORD} from '../../store/Subjects';

  export default {
    name: 'ResetPassword',
    components: {
      VerificationInput,
      CommonInformation},
    props: {},
    data () {
      return {
        newPasswordError: false,
        confirmPasswordError: false,
        verifyCodeError: false,
        charEncode: this.getLang('CHAR_ENCODE'),
        verifyCodeVal: '',
        newPassword: '',
        confirmPassword: '',
        cellphone: '',
        userName: '',
        realName: '',
        formatCellphone: ''
      };
    },
    computed: {
      modifyDisable () {
        return !(this.verifyCodeVal.length === 6 && this.newPassword.length >= 6 && this.confirmPassword.length >= 6);
      }
    },
    methods: {
      dataInit: function () {
        let user = this.getModuleGetterByName('getUser');
        this.realName = user.get('NAME');
        this.userName = user.get('USER_NAME');
        this.cellphone = user.get('CELLPHONE');
      },
      verifyMessageCode () {
        return this.$validator.messageCodeValid(this.verifyCodeVal);
      },
      verifyNewPassword () {
        return this.$validator.passwordValid(this.newPassword);
      },
      verifyConfirmPassword () {
        return this.newPassword === this.confirmPassword;
      },
      confirmPasswordBlur () {
        this.confirmPasswordError = !this.verifyConfirmPassword();
      },
      newPasswordBlur () {
        this.newPasswordError = !this.verifyNewPassword();
      },
      verifyCodeBlur () {
        this.verifyCodeError = !this.verifyMessageCode();
      },
      clickReset () {
        if (this.newPasswordError || this.confirmPasswordError) {
          return false;
        }
        this.$store.dispatch(MODIFY_LOGIN_PASSWORD, [
          this.getPlugin('Crypto').MD5(this.confirmPassword),
          this.verifyCodeVal
        ]);
      },
      requestResetLoginPasswordVerifyCode () {
        this.$store.dispatch(REQUEST_MODIFY_LOGIN_PWD_SMS, this.cellphone);
      },
      getCellPhoneLabel: function () {
        let cellphoneSplit = this.splitCellphone(this.cellphone);
        return `${cellphoneSplit[0]} ${this.charEncode}${this.charEncode}${this.charEncode}${this.charEncode} ${cellphoneSplit[2]}`;
      },
      userLogOut: function () {
        this.$authUtils.LogOut();
      }
    },
    watch: {
      cellphone () {
        this.formatCellphone = this.getCellPhoneLabel();
      },
      newPassword () {
        this.newPasswordError = false;
      },
      confirmPassword () {
        this.confirmPasswordError = false;
      },
      verifyCodeVal () {
        this.verifyCodeError = false;
      }
    },
    created: function () {
      if (this.getModuleGetterByName('isDataLoadComplete')) {
        this.dataInit();
      } else {
        this.Bus(this).on(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      }
      this.$bus.on(MODIFY_LOGIN_PASSWORD, this.userLogOut);
    },
    beforeDestroy: function () {
      this.Bus(this).off(this.getConstByKey(this, 'events', 'EVENT_APP_DATA_LOADED'), this.dataInit);
      this.$bus.off(MODIFY_LOGIN_PASSWORD, this.userLogOut);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .ResetPassword {
    .container {
      position: relative;
      padding-top: 20px;
      width: 580px;

      .reset-button {
        margin-top: 30px;
        position: absolute;
        right: 14px;
      }
    }
  }
</style>
