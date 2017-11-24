/**
 * Auth: admin
 * Date: 2017/10/30
 * Time: 21:35
 * File: QueryCard
 * Description: QueryCard
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterQueryCard = {
  name: 'QueryCard',
  path: '/QueryCard',
  components: {
    child: () => import('components/QueryCard/QueryCard')
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
Vue.prototype.registerPMRoutes(RouterQueryCard, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterQueryCard;
