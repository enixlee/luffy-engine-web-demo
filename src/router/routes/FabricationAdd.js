/**
 * Auth: Administrator
 * Date: 2017/10/31
 * Time: 10:07
 * File: FabricationAdd
 * Description: FabricationAdd
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterFabricationAdd = {
  name: 'FabricationAdd',
  path: '/FabricationAdd',
  components: {
    child: () => import('components/FabricationAdd/FabricationAdd')
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
Vue.prototype.registerPMRoutes(RouterFabricationAdd, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterFabricationAdd;
