/**
 * Auth: lijiang
 * Date: 2017/11/7
 * Time: 下午4:22
 * File: StoreList
 * Description: StoreList
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterStoreList = {
  name: 'StoreList',
  path: '/StoreList',
  components: {
    child: () => import('components/StoreList/StoreList')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterStoreList, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterStoreList;
