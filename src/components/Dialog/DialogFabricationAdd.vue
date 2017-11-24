<template>
  <div class="DialogFabricationAdd">
    <common-information
      plainInfo
      :labelText="getLang('LABEL_CARD_TYPE_NAME')"
      :infoText="slotParams.cardTypeName"
      class="common-information-style"
    ></common-information>
    <common-information
      plainInfo
      :labelText="getLang('LABEL_FABRICATION_ADD_COUNT')"
      :infoText="slotParams.count"
      :unit="getLang('UNIT_CARD')"
      class="common-information-style"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'DialogFabricationAdd',
    components: {},
    props: {
      slotParams: {
        type: Object,
        required: true
      }
    },
    data () {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .DialogFabricationAdd {
    width: 100%;
    padding: 10px 0;
  }
</style>
