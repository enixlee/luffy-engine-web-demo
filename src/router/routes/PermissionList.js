/**
 * Auth: admin
 * Date: 2017/11/6
 * Time: 16:34
 * File: PermissionList
 * Description: PermissionList
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterPermissionList = {
  name: 'PermissionList',
  path: '/PermissionList',
  components: {
    child: () => import('components/PermissionList/PermissionList')
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
Vue.prototype.registerPMRoutes(RouterPermissionList, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterPermissionList;
