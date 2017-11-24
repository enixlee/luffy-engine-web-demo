/**
 * Auth: Administrator
 * Date: 2017/11/3
 * Time: 10:09
 * File: FabricationRecord
 * Description: FabricationRecord
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterFabricationRecord = {
  name: 'FabricationRecord',
  path: '/FabricationRecord',
  components: {
    child: () => import('components/FabricationRecord/FabricationRecord')
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
Vue.prototype.registerPMRoutes(RouterFabricationRecord, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterFabricationRecord;
