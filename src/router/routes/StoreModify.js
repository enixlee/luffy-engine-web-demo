/**
 * Auth: admin
 * Date: 2017/11/4
 * Time: 15:29
 * File: StoreModify
 * Description: StoreModify
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterStoreModify = {
  name: 'StoreModify',
  path: '/StoreModify',
  components: {
    child: () => import('components/StoreModify/StoreModify')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true,
    breadCrumb: 'BREADCRUMB_STORE_MODIFY'
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterStoreModify, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterStoreModify;
