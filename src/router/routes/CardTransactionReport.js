/**
 * Auth: admin
 * Date: 2017/11/8
 * Time: 11:33
 * File: CardTransactionReport
 * Description: CardTransactionReport
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterCardTransactionReport = {
  name: 'CardTransactionReport',
  path: '/CardTransactionReport',
  components: {
    child: () => import('components/CardTransactionReport/CardTransactionReport')
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
Vue.prototype.registerPMRoutes(RouterCardTransactionReport, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterCardTransactionReport;
