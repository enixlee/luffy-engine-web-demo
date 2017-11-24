/**
 * Auth: lijiang
 * Date: 2017/11/10
 * Time: 下午2:58
 * File: ReceiveCard
 * Description: ReceiveCard
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterReceiveCard = {
  name: 'ReceiveCard',
  path: '/ReceiveCard',
  components: {
    child: () => import('components/ReceiveCard/ReceiveCard')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true,
    breadCrumb: 'BREADCRUMB_RECEIVE_CARD'
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterReceiveCard, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterReceiveCard;
