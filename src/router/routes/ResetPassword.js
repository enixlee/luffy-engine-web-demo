/**
 * Auth: admin
 * Date: 2017/11/1
 * Time: 16:25
 * File: ResetPassword
 * Description: ResetPassword
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterResetPassword = {
  name: 'ResetPassword',
  path: '/ResetPassword',
  components: {
    child: () => import('components/ResetPassword/ResetPassword')
  },
  isAsync: {
    child: false
  },
  meta: {
    requireAuth: true,
    breadCrumb: 'BREADCRUMB_RESET_PASSWORD'
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_CHILD_PAGE_CHILD
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterResetPassword, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterResetPassword;
