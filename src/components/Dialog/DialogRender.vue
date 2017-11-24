<template>
  <div class="DialogRender">
    <dialog-fabrication-add v-if="renderType === 'FabricationAdd'" :slotParams="slotParams"></dialog-fabrication-add>
    <dialog-card-type-add v-if="renderType === 'CardTypeAdd'" :slotParams="slotParams"></dialog-card-type-add>
    <dialog-add-store v-if="renderType === 'AddStore'" :slotParams="slotParams"></dialog-add-store>
    <dialog-store-detail v-if="renderType === 'StoreDetail'" :slotParams="slotParams"></dialog-store-detail>
    <dialog-user-detail v-if="renderType === 'UserDetail'" :slotParams="slotParams"></dialog-user-detail>
    <dialog-freeze-user v-if="renderType === 'FreezeUser'" :slotParams="slotParams"></dialog-freeze-user>
    <dialog-reset-user v-if="renderType === 'ResetUser'" :slotParams="slotParams"></dialog-reset-user>
    <dialog-enable-user v-if="renderType === 'EnableUser'" :slotParams="slotParams"></dialog-enable-user>
    <dialog-user-add v-if="renderType === 'UserAdd'" :slotParams="slotParams"></dialog-user-add>
    <dialog-transaction v-if="renderType === 'Transaction'" :slotParams="slotParams"></dialog-transaction>
    <dialog-receive-card v-if="renderType === 'ReceiveCard'" :slotParams="slotParams"></dialog-receive-card>
    <dialog-receive-entity-card v-if="renderType === 'ReceiveEntityCard'" :slotParams="slotParams"></dialog-receive-entity-card>
  </div>
</template>
<script type="text/javascript">
  import DialogFabricationAdd from './DialogFabricationAdd.vue';
  import DialogCardTypeAdd from './DialogCardTypeAdd.vue';
  import DialogAddStore from './DialogAddStore.vue';
  import DialogStoreDetail from './DialogStoreDetail.vue';
  import DialogUserDetail from './DialogUserDetail.vue';
  import DialogFreezeUser from './DialogFreezeUser.vue';
  import DialogResetUser from './DialogResetUser.vue';
  import DialogEnableUser from './DialogEnableUser.vue';
  import DialogUserAdd from './DialogUserAdd.vue';
  import DialogTransaction from './DialogTransaction.vue';
  import DialogReceiveCard from './DialogReceiveCard.vue';
  import DialogReceiveEntityCard from './DialogReceiveEntityCard.vue';
  export default {
    name: 'DialogRender',
    components: {
      DialogReceiveEntityCard,
      DialogReceiveCard,
      DialogTransaction,
      DialogEnableUser,
      DialogResetUser,
      DialogFreezeUser,
      DialogUserDetail,
      DialogStoreDetail,
      DialogAddStore,
      DialogUserAdd,
      DialogCardTypeAdd,
      DialogFabricationAdd
    },
    props: {
      renderType: {
        type: String,
        require: true
      },
      slotParams: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/common_variable.less";

  .DialogRender {
    width: 100%;
  }
</style>
