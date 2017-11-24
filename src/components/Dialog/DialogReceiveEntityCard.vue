<template>
  <div class="DialogReceiveEntityCard">
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_BATCH_NO')"
      :infoText="slotParams.get('FABRICATION_BATCH_ID')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_CARD_NAME')"
      :infoText="slotParams.get('CARDTYPE_NAME')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_CARD_INIT_VALUE')"
      :infoText="slotParams.get('INIT_CARD_VALUE_YUAN')"
      :unit="getLang('MONEY_UNIT')"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_CARD_NAME_CODE')"
      :infoText="startId"
    ></common-information>
    <common-information
      class="dialog-info"
      plainInfo
      :labelText="getLang('LABEL_RECEIVE_COUNT')"
      :infoText="slotParams.get('FABRICATION_CARD_COUNT')"
    ></common-information>
  </div>
</template>

<script type="text/javascript">
  import {QUERY_ENTITY_CARD_START_ID} from '../../store/Subjects';

  export default {
    name: 'DialogReceiveEntityCard',
    components: {},
    props: {
      slotParams: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        startId: ''
      };
    },
    methods: {
      getCardStartId (id) {
        this.startId = id.PREPAIDCARD_ID;
      }
    },
    watch: {},
    created: function () {
      this.$bus.on(QUERY_ENTITY_CARD_START_ID, this.getCardStartId);
      this.getPlugin('DataModule').dispatch(QUERY_ENTITY_CARD_START_ID, this.slotParams.get('FABRICATION_BATCH_ID'));
    },
    beforeDestroy: function () {
      this.$bus.off(QUERY_ENTITY_CARD_START_ID, this.getCardStartId);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .DialogReceiveEntityCard {
    width: 100%;
    padding: 10px 0;
  }
</style>
