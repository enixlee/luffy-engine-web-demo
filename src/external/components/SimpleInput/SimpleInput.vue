<template>
  <div class="SimpleInput">
    <span class="label">
      {{ labelText }}
    </span>
    <tool-tip
      class="tool-tip"
      v-if="showReminder"
      :reminderText="reminderText"
    ></tool-tip>
    <mu-text-field
      class="input"
      :class="inputWidth"
      :type="inputType"
      :hintText="hintText"
      :value="value"
      hintTextClass="hint-font-size-class"
      @input="handleInput"
    ></mu-text-field>
    <span class="unit">{{ unit }}</span>
  </div>
</template>

<script type="text/javascript">
  import ToolTip from '../ToolTip/ToolTip.vue';

  export default {
    name: 'SimpleInput',
    components: {ToolTip},
    props: {
      value: [String, Number],
      inputType: {
        type: String,
        default: 'text'
      },
      labelText: {
        type: String,
        default: ''
      },
      unit: {
        type: String,
        default: ''
      },
      inputWidth: {
        type: [String, Array],
        default: ''
      },
      reminderText: {
        type: String,
        default: ''
      },
      hintText: {}
    },
    methods: {
      handleInput (value) {
        this.$emit('input', value);
      }
    },
    computed: {
      showReminder () {
        return this.reminderText.length > 0;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/common_variable.less";

  .SimpleInput {
    height: 56px;
    font-size: 16px;
    display: flex;
    color: @color-7e8e97;

    .label {
      color: @color-344a5e;
      white-space: nowrap;
      margin: 13px 20px 0 0;
    }
    .tool-tip {
      z-index: 100;
      top: 13px;
      right: 10px;
    }
    .unit {
      margin-top: 13px;
    }
    .width-100 {
      width: 100px;
    }
    .width-270 {
      width: 270px;
    }
  }
</style>
