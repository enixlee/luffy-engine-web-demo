/**
 * Auth: lijiang
 * Date: 2017/10/30
 * Time: 下午2:15
 * File: CardTypeAdd
 * Description: CardTypeAdd
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterCardTypeAdd = {
  name: 'CardTypeAdd',
  path: '/CardTypeAdd',
  components: {
    child: () => import('components/CardTypeAdd/CardTypeAdd')
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
Vue.prototype.registerPMRoutes(RouterCardTypeAdd, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterCardTypeAdd;
