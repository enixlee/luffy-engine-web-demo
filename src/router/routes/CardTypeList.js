/**
 * Auth: lijiang
 * Date: 2017/10/30
 * Time: 下午2:13
 * File: CardTypeList
 * Description: CardTypeList
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import * as RouterViewType from '../RouterConfigs';

const RouterCardTypeList = {
  name: 'CardTypeList',
  path: '/CardTypeList',
  components: {
    child: () => import('components/CardTypeList/CardTypeList')
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
Vue.prototype.registerPMRoutes(RouterCardTypeList, RouteTypes.ROUTE_TYPE_DYNAMIC);

export default RouterCardTypeList;
