/**
 * Auth: lijiang
 * Date: 2017/11/6
 * Time: 下午8:38
 * File: RechargeConfirm
 * Description: RechargeConfirm
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterRechargeConfirm = {
  name: 'RechargeConfirm',
  path: '/RechargeConfirm',
  components: {
    child: () => import('components/RechargeConfirm/RechargeConfirm')
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
Vue.prototype.registerPMRoutes(RouterRechargeConfirm, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterRechargeConfirm;
