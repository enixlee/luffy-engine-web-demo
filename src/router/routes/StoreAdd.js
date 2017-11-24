/**
 * Auth: admin
 * Date: 2017/11/3
 * Time: 11:06
 * File: StoreAdd
 * Description: StoreAdd
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterStoreAdd = {
  name: 'StoreAdd',
  path: '/StoreAdd',
  components: {
    child: () => import('components/StoreAdd/StoreAdd')
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
Vue.prototype.registerPMRoutes(RouterStoreAdd, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterStoreAdd;
