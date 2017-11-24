/**
 * Auth: admin
 * Date: 2017/11/7
 * Time: 19:26
 * File: UserList
 * Description: UserList
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterUserList = {
  name: 'UserList',
  path: '/UserList',
  components: {
    child: () => import('components/UserList/UserList')
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
Vue.prototype.registerPMRoutes(RouterUserList, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterUserList;
