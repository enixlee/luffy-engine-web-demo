/**
 * Auth: admin
 * Date: 2017/11/7
 * Time: 15:20
 * File: PermissionAdd
 * Description: PermissionAdd
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterPermissionAdd = {
  name: 'PermissionAdd',
  path: '/PermissionAdd',
  components: {
    child: () => import('components/PermissionAdd/PermissionAdd')
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
Vue.prototype.registerPMRoutes(RouterPermissionAdd, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterPermissionAdd;
