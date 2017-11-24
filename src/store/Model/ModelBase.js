/**
 * Auth: lijiang
 * Date: 2017/10/27
 * Description: ModelBase
 */
let Vue = window.getVue();

class ModelBase {

  constructor (modelName) {
    this.modelName = modelName;
    this.properties = this.data();
  }

  data () {
    return {};
  }

  initFromArray (dataMap) {
    Vue.prototype.getPlugin('Assert').isObject(dataMap);
    let that = this;
    Vue.prototype.getPlugin('lodash').map(dataMap, function (v, k) {
      that.set(k, v);
    });

    return this;
  }

  filterKV (key) {
    return null;
  }

  get (key) {
    Vue.prototype.getPlugin('Assert').isString(key);

    let filter = this.filterKV(key);

    if (filter !== null) {
      return filter;
    }

    return this.properties[key];
  }

  set (key, value) {
    Vue.prototype.getPlugin('Assert').isString(key);
    this.properties[key] = value;
  }

  toArray () {
    return this.properties;
  }

  couldOperate (operateType) {
    return false;
  }

  getColor () {
    return null;
  }
}

export default ModelBase;
