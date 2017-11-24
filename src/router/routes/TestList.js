/**
 * Auth: admin
 * Date: 2017/10/30
 * Time: 9:16
 * File: TestList
 * Description: TestList
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterTestList = {
  name: 'TestList',
  path: '/TestList',
  components: {
    fullPage: () => import('components/TestList/TestList')
  },
  isAsync: {
    fullPage: false
  },
  meta: {
    requireAuth: true
  },
  transitionName: '',
  routerViewType: RouterViewType.ROUTE_TYPE_FULL_PAGE
};

/**
 * choose route type which you needed，you can see route type detail from RouteTypes
 */
let Vue = window.PMApp.Vue;
Vue.prototype.registerPMRoutes(RouterTestList, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterTestList;
