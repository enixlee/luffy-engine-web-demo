/**
 * Auth: Administrator
 * Date: 2017/11/7
 * Time: 20:46
 * File: UserModify
 * Description: UserModify
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterUserModify = {
  name: 'UserModify',
  path: '/UserModify',
  components: {
    child: () => import('components/UserModify/UserModify')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true,
    breadCrumb: 'BREADCRUMB_USER_MODIFY'
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterUserModify, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterUserModify;
