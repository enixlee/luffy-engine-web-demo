/**
 * Auth: admin
 * Date: 2017/11/6
 * Time: 11:14
 * File: CardStock
 * Description: CardStock
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterCardStock = {
  name: 'CardStock',
  path: '/CardStock',
  components: {
    child: () => import('components/CardStock/CardStock')
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
Vue.prototype.registerPMRoutes(RouterCardStock, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterCardStock;
