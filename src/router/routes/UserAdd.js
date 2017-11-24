/**
 * Auth: Administrator
 * Date: 2017/11/6
 * Time: 15:56
 * File: UserAdd
 * Description: UserAdd
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterUserAdd = {
  name: 'UserAdd',
  path: '/UserAdd',
  components: {
    child: () => import('components/UserAdd/UserAdd')
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
Vue.prototype.registerPMRoutes(RouterUserAdd, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterUserAdd;
