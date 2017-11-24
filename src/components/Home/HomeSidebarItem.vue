<template>
  <mu-list-item
    class="home-sidebar"
    toggleIconClass="toggle-icon-class"
    :title="treeNode.getNameCn()"
    :toggleNested="isFolder"
    :value="treeNode.uniqueKey()"
    :open="false"
    @click="doAction"
  >
    <img
      :src="treeNode.getNodeIcon()"
      slot="left"
    >
    <div slot="nested" v-if="isFolder">
      <home-sidebar-item
        v-for="item in babies"
        :key="item.getNameCn()"
        :treeNode="item"
      ></home-sidebar-item>
    </div>
  </mu-list-item>
</template>

<script type="text/javascript">
  export default {
    name: 'HomeSidebarItem',
    components: {},
    props: {
      treeNode: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        babies: this.treeNode.leaves()
      };
    },
    computed: {
      nestedLevel () {
        // 因为 home-sidebar-item 成为了 mu-list-item 的父组件，所以需要自己连接一下
        return this.$parent.nestedLevel;
      },
      handleChange () {
        // 因为 home-sidebar-item 成为了 mu-list-item 的父组件，所以需要自己连接一下
        return this.$parent.handleChange;
      },
      value () {
        // 因为 home-sidebar-item 成为了 mu-list-item 的父组件，所以需要自己连接一下
        return this.$parent.value;
      },
      isFolder () {
        return this.babies.length > 0;
      },
      created: function () {
        console.info(this.babies);
      }
    },
    methods: {
      doAction: function () {
        this.treeNode.doAction();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
