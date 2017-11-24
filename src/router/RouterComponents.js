/**
 * Auth: enixlee
 * Date: 2017/3/22
 * Description: RouterComponents
 */
import * as RouteTypes from 'vue-luffy-engine/lib/Route/RouteTypes';
import NotFound from './routes/404';
import Login from './routes/Login';
import Main from './routes/Main';
import CardTypeList from './routes/CardTypeList';
import CardTypeAdd from './routes/CardTypeAdd';
import SellCard from './routes/SellCard';
import Recharge from './routes/Recharge';
import QueryCard from './routes/QueryCard';
import FabricationAdd from './routes/FabricationAdd';
import ResetPassword from './routes/ResetPassword';
import ReceiveCardList from './routes/ReceiveCardList';
import StoreAdd from './routes/StoreAdd';
import SellCardConfirm from './routes/SellCardConfirm';
import SellCardResult from './routes/SellCardResult';
import StoreModify from './routes/StoreModify';
import FabricationRecord from './routes/FabricationRecord';
import ReceiveCardRecord from './routes/ReceiveCardRecord';
import PermissionList from './routes/PermissionList';
import UserAdd from './routes/UserAdd';
import PosMachineQuery from './routes/PosMachineQuery';
import CardStock from './routes/CardStock';
import RechargeConfirm from './routes/RechargeConfirm';
import RechargeResult from './routes/RechargeResult';
import PermissionAdd from './routes/PermissionAdd';
import StoreList from './routes/StoreList';
import UserList from './routes/UserList';
import CardTransactionReport from './routes/CardTransactionReport';
import UserModify from './routes/UserModify';
import CardTransaction from './routes/CardTransaction';
import ReceiveCard from './routes/ReceiveCard';

let Vue = window.getVue();
const RoutesMap = {
  NotFound,
  Login,
  Main,
  CardTypeList,
  CardTypeAdd,
  SellCard,
  Recharge,
  QueryCard,
  FabricationAdd,
  ResetPassword,
  ReceiveCardList,
  StoreAdd,
  SellCardConfirm,
  SellCardResult,
  StoreModify,
  FabricationRecord,
  ReceiveCardRecord,
  PermissionList,
  UserAdd,
  PosMachineQuery,
  CardStock,
  RechargeConfirm,
  RechargeResult,
  PermissionAdd,
  StoreList,
  UserList,
  CardTransactionReport,
  UserModify,
  CardTransaction,
  ReceiveCard
};

/**
 * 根据名称获取路由配置
 * @param name
 * @returns {*}
 */
Vue.prototype.getRouteByName = (name) => {
  return RoutesMap[name];
};

/**
 * routers need to be registered to vue-router instance
 * return {array}
 */
export function getRouterRoutes () {
  return [].concat(Vue.prototype.getPMRoutesByType(RouteTypes.ROUTE_TYPE_NORMAL))
    .concat(Vue.prototype.getPMRoutesByType(RouteTypes.ROUTE_TYPE_DYNAMIC));
}
