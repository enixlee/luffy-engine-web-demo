/**
 * Auth: admin
 * Date: 2017/10/30
 * Time: 20:27
 * File: SellCard
 * Description: SellCard
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterSellCard = {
  name: 'SellCard',
  path: '/SellCard',
  components: {
    child: () => import('components/SellCard/SellCard')
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
Vue.prototype.registerPMRoutes(RouterSellCard, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterSellCard;
