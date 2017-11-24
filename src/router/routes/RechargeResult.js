/**
 * Auth: lijiang
 * Date: 2017/11/6
 * Time: 下午9:02
 * File: RechargeResult
 * Description: RechargeResult
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterRechargeResult = {
  name: 'RechargeResult',
  path: '/RechargeResult',
  components: {
    child: () => import('components/RechargeResult/RechargeResult')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true,
    belongLeaf: 'Recharge'
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterRechargeResult, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterRechargeResult;
