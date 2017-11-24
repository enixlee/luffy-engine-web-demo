/**
 * Auth: admin
 * Date: 2017/11/8
 * Time: 15:31
 * File: CardTransaction
 * Description: CardTransaction
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterCardTransaction = {
  name: 'CardTransaction',
  path: '/CardTransaction',
  components: {
    child: () => import('components/CardTransaction/CardTransaction')
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
Vue.prototype.registerPMRoutes(RouterCardTransaction, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterCardTransaction;
