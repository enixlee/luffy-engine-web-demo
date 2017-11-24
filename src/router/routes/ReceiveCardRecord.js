/**
 * Auth: admin
 * Date: 2017/11/4
 * Time: 11:39
 * File: ReceiveCardRecord
 * Description: ReceiveCardRecord
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterReceiveCardRecord = {
  name: 'ReceiveCardRecord',
  path: '/ReceiveCardRecord',
  components: {
    child: () => import('components/ReceiveCardRecord/ReceiveCardRecord')
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
Vue.prototype.registerPMRoutes(RouterReceiveCardRecord, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterReceiveCardRecord;
