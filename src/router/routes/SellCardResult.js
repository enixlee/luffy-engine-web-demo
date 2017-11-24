/**
 * Auth: lijiang
 * Date: 2017/11/3
 * Time: 下午9:14
 * File: SellCardResult
 * Description: SellCardResult
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterSellCardResult = {
  name: 'SellCardResult',
  path: '/SellCardResult',
  components: {
    child: () => import('components/SellCardResult/SellCardResult')
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
Vue.prototype.registerPMRoutes(RouterSellCardResult, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterSellCardResult;
