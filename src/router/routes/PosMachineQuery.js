/**
 * Auth: admin
 * Date: 2017/11/6
 * Time: 11:09
 * File: PosMachineQuery
 * Description: PosMachineQuery
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterPosMachineQuery = {
  name: 'PosMachineQuery',
  path: '/PosMachineQuery',
  components: {
    child: () => import('components/PosMachineQuery/PosMachineQuery')
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
Vue.prototype.registerPMRoutes(RouterPosMachineQuery, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterPosMachineQuery;
