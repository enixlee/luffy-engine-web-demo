/**
 * Auth: lijiang
 * Date: 2017/11/3
 * Time: 下午3:00
 * File: SellCardConfirm
 * Description: SellCardConfirm
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterSellCardConfirm = {
  name: 'SellCardConfirm',
  path: '/SellCardConfirm',
  components: {
    child: () => import('components/SellCardConfirm/SellCardConfirm')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true,
    belongLeaf: 'SellCard'
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterSellCardConfirm, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterSellCardConfirm;
