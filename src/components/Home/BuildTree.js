import {treeNodes} from '../../external/resource/HomeTree';
import {default as TreeNode} from '../../external/resource/TreeNode';

let Vue = window.getVue();

export const buildTree = () => {
  let tree = [];
  let lodash = Vue.prototype.getPlugin('lodash');
  lodash.map(treeNodes, function (v) {
    let leaf = (new TreeNode(v.name)).initFromArray(v);
    leaf.isValid() ? tree.push(leaf) : null;
  });

  return tree;
};

/**
 * 根据节点名称查找节点
 * @param tree
 * @param leafName
 * @returns {*}
 */
export const findLeafByName = (tree, leafName) => {
  let i = 0;
  let top = tree[i];
  while (top) {
    if (top.isBranch()) {
      let leaf = findLeafByName(top.leaves(), leafName);
      if (leaf) {
        return leaf;
      }
    }
    if (top.RouteKey() === leafName) {
      return top;
    }
    top = tree[i++];
  }
  return null;
};
