/**
 * Auth: enixlee
 * Date: 2017/5/5
 * Description: PMConstantsGlobal
 */
/**
 * 万分比基础
 * @type {number}
 */
export const RATE_TEN_THOUSANDTH = 10000;
/**
 * 无效
 * @type {number}
 */
export const MINIPAY_STATUS_INVALID = 0;
/**
 * 正常
 * @type {number}
 */
export const MINIPAY_STATUS_NORMAL = 1;
/**
 * 冻结
 * @type {number}
 */
export const MINIPAY_STATUS_FROZEN = 2;
/**
 * 作废
 * @type {number}
 */
export const MINIPAY_STATUS_CANCELLATION = 3;
/**
 * 退回
 * @type {number}
 */
export const MINIPAY_STATUS_RETURN_BACK = 4;
/**
 * 毫秒级
 * @type {number}
 */
export const MILLISECOND = 1000;
/**
 * 抽屉下拉
 * @type {number}
 */
export const TREE_MENU_ACTION_TYPE_DREW = 0;
/**
 * 路由
 * @type {number}
 */
export const TREE_MENU_ACTION_TYPE_ROUTER = 1;
/**
 * 弹窗
 * @type {number}
 */
export const TREE_MENU_ACTION_TYPE_DIALOG = 2;
/**
 * 未审核
 */
export const REVIEW_STATUS_NOT_REVIEW = 0;
/**
 * 审核通过
 */
export const REVIEW_STATUS_PASS = 1;
/**
 * 审核未通过
 */
export const REVIEW_STATUS_NOT_PASS = 2;
/**
 * 弹框左侧按钮
 * @type {string}
 */
export const SIMPLE_DIALOG_BTN_CANCEL = 'cancel';
/**
 * 弹框右侧按钮事件
 * @type {string}
 */
export const SIMPLE_DIALOG_BTN_CONFIRM = 'confirm';
/**
 * 未制卡
 * @type {number}
 */
export const MANUFACTURE_STATUS_INVALID = 0;
/**
 * 已生成卡号文件，等待卡厂制卡
 * @type {number}
 */
export const MANUFACTURE_STATUS_FINISH = 1;
/**
 * 准备生成卡号
 * @type {number}
 */
export const MANUFACTURE_STATUS_PREPARE_MAKE = 2;
/**
 * 生成卡号中
 * @type {number}
 */
export const MANUFACTURE_STATUS_MAKING = 3;
/**
 * 正在生成实体卡片数据
 * @type {number}
 */
export const MANUFACTURE_STATUS_NEED_RECEIVE_ENTITY_CARD = 4;
/**
 * 完成制卡
 * @type {number}
 */
export const MANUFACTURE_STATUS_RECEIVE_ENTITY_CARD = 5;
