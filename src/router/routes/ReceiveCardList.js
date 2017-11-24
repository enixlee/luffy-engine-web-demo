/**
 * Auth: admin
 * Date: 2017/11/3
 * Time: 9:55
 * File: ReceiveCardList
 * Description: ReceiveCardList
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterReceiveCardList = {
  name: 'ReceiveCardList',
  path: '/ReceiveCardList',
  components: {
    child: () => import('components/ReceiveCardList/ReceiveCardList')
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
Vue.prototype.registerPMRoutes(RouterReceiveCardList, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterReceiveCardList;
