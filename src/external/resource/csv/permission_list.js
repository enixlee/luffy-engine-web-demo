export const permissionList = [
  {permission_id: 1, permission_key: '/sdk_zhongbai/auth/get_login_verify_code', permission_name: '获取验证码'},
  {permission_id: 2, permission_key: '/sdk_zhongbai/auth/login_with_verify_code', permission_name: '登录'},
  {permission_id: 3, permission_key: '/sdk_zhongbai/auth/logout', permission_name: '退出'},
  {permission_id: 4, permission_key: '/sdk_zhongbai/permission/add', permission_name: '新增权限'},
  {permission_id: 5, permission_key: '/sdk_zhongbai/permission/delete', permission_name: '删除权限'},
  {permission_id: 6, permission_key: '/sdk_zhongbai/permission/modify', permission_name: '编辑权限'},
  {permission_id: 7, permission_key: '/sdk_zhongbai/permission/query', permission_name: '查询权限'},
  {permission_id: 8, permission_key: '/sdk_zhongbai/pos_machine/add', permission_name: '新增pos机'},
  {permission_id: 9, permission_key: '/sdk_zhongbai/pos_machine/delete', permission_name: '删除pos机'},
  {permission_id: 10, permission_key: '/sdk_zhongbai/pos_machine/export', permission_name: '导出pos机信息'},
  {permission_id: 11, permission_key: '/sdk_zhongbai/pos_machine/freeze', permission_name: '冻结pos机'},
  {permission_id: 12, permission_key: '/sdk_zhongbai/pos_machine/query', permission_name: '查询pos机'},
  {permission_id: 13, permission_key: '/sdk_zhongbai/pos_machine/unfreeze', permission_name: '解冻pos机'},
  {permission_id: 14, permission_key: '/sdk_zhongbai/prepaidcard/query_card', permission_name: '查询预付卡明细'},
  {permission_id: 15, permission_key: '/sdk_zhongbai/reconciliation/get_chart', permission_name: '查看交易报表'},
  {permission_id: 16, permission_key: '/sdk_zhongbai/role/add', permission_name: '新增角色'},
  {permission_id: 17, permission_key: '/sdk_zhongbai/role/freeze', permission_name: '冻结角色'},
  {permission_id: 18, permission_key: '/sdk_zhongbai/role/modify', permission_name: '修改角色'},
  {permission_id: 19, permission_key: '/sdk_zhongbai/role/query', permission_name: '查询角色'},
  {permission_id: 20, permission_key: '/sdk_zhongbai/role/unfreeze', permission_name: '解冻角色'},
  {permission_id: 21, permission_key: '/sdk_zhongbai/sms/get_modify_login_password_verify_code', permission_name: '获取重置登录密码短信验证码'},
  {permission_id: 22, permission_key: '/sdk_zhongbai/store/add_store', permission_name: '新增门店'},
  {permission_id: 23, permission_key: '/sdk_zhongbai/store/export', permission_name: '导出门店信息'},
  {permission_id: 24, permission_key: '/sdk_zhongbai/store/freeze', permission_name: '冻结门店'},
  {permission_id: 25, permission_key: '/sdk_zhongbai/store/modify', permission_name: '修改门店信息'},
  {permission_id: 26, permission_key: '/sdk_zhongbai/store/query', permission_name: '查看门店详情'},
  {permission_id: 27, permission_key: '/sdk_zhongbai/store/unfreeze', permission_name: '解冻门店'},
  {permission_id: 28, permission_key: '/sdk_zhongbai/transaction/export', permission_name: '导出交易记录'},
  {permission_id: 29, permission_key: '/sdk_zhongbai/transaction/notify', permission_name: '交易记录同步通知'},
  {permission_id: 30, permission_key: '/sdk_zhongbai/transaction/query', permission_name: '查询交易记录'},
  {permission_id: 31, permission_key: '/sdk_zhongbai/user/add_store_user', permission_name: '新增用户'},
  {permission_id: 32, permission_key: '/sdk_zhongbai/user/freeze', permission_name: '禁用用户'},
  {permission_id: 33, permission_key: '/sdk_zhongbai/user/modify_login_password', permission_name: '修改登录密码'},
  {permission_id: 34, permission_key: '/sdk_zhongbai/user/modify_store_user', permission_name: '修改用户信息'},
  {permission_id: 35, permission_key: '/sdk_zhongbai/user/query', permission_name: '查询用户'},
  {permission_id: 36, permission_key: '/sdk_zhongbai/user/reset_login_password', permission_name: '重置登录密码'},
  {permission_id: 37, permission_key: '/sdk_zhongbai/user/unfreeze', permission_name: '启用用户'},
  {permission_id: 38, permission_key: '/sdk_zhongbai/activity/recharge_rebate/add', permission_name: '新增充赠活动'},
  {permission_id: 39, permission_key: '/sdk_zhongbai/activity/recharge_rebate/modify', permission_name: '修改充赠活动'},
  {permission_id: 40, permission_key: '/sdk_zhongbai/activity/recharge_rebate/query', permission_name: '查询充赠活动'},
  {permission_id: 41, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/export', permission_name: '导出领卡详情'},
  {permission_id: 42, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/query', permission_name: '查询领卡记录'},
  {permission_id: 43, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/query_receive_fabrication_start_card', permission_name: '查询要领卡批次的起始卡号'},
  {permission_id: 44, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/receive_by_fabricationid', permission_name: '子公司领卡'},
  {permission_id: 45, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/return_card', permission_name: '退卡'},
  {permission_id: 46, permission_key: '/sdk_zhongbai/prepaidcard/cardtype/add', permission_name: '新增卡种'},
  {permission_id: 47, permission_key: '/sdk_zhongbai/prepaidcard/cardtype/export', permission_name: '导出卡种详情'},
  {permission_id: 48, permission_key: '/sdk_zhongbai/prepaidcard/cardtype/query', permission_name: '查询卡种'},
  {permission_id: 49, permission_key: '/sdk_zhongbai/prepaidcard/fabrication/apply', permission_name: '申请制卡'},
  {permission_id: 50, permission_key: '/sdk_zhongbai/prepaidcard/fabrication/export', permission_name: '下载制卡记录'},
  {permission_id: 51, permission_key: '/sdk_zhongbai/prepaidcard/fabrication/export_4_fabricate', permission_name: '下载卡号文件'},
  {permission_id: 52, permission_key: '/sdk_zhongbai/prepaidcard/fabrication/query', permission_name: '查询制卡信息'},
  {permission_id: 53, permission_key: '/sdk_zhongbai/prepaidcard/fabrication/receive_entity_card', permission_name: '确认收到实卡'},
  {permission_id: 54, permission_key: '/sdk_zhongbai/prepaidcard/operation/batch_freeze', permission_name: '卡批量冻结'},
  {permission_id: 55, permission_key: '/sdk_zhongbai/prepaidcard/operation/batch_unfreeze', permission_name: '卡冻结'},
  {permission_id: 56, permission_key: '/sdk_zhongbai/prepaidcard/operation/freeze', permission_name: '卡批量解冻'},
  {permission_id: 57, permission_key: '/sdk_zhongbai/prepaidcard/operation/query', permission_name: '查询预付卡'},
  {permission_id: 58, permission_key: '/sdk_zhongbai/prepaidcard/operation/unfreeze', permission_name: '卡解冻'},
  {permission_id: 59, permission_key: '/sdk_zhongbai/prepaidcard/stock/export', permission_name: '导出卡库存'},
  {permission_id: 60, permission_key: '/sdk_zhongbai/prepaidcard/stock/query', permission_name: '查询卡库存'},
  {permission_id: 61, permission_key: '/sdk_zhongbai/prepaidcard/trade/consume', permission_name: '后台消费'},
  {permission_id: 62, permission_key: '/sdk_zhongbai/prepaidcard/trade/recharge', permission_name: '批量充值'},
  {permission_id: 63, permission_key: '/sdk_zhongbai/prepaidcard/trade/sell_card', permission_name: '批量售卡'},
  {permission_id: 64, permission_key: '/sdk_zhongbai/store/brand/add', permission_name: '添加品牌'},
  {permission_id: 65, permission_key: '/sdk_zhongbai/store/brand/delete', permission_name: '删除品牌'},
  {permission_id: 66, permission_key: '/sdk_zhongbai/store/brand/query', permission_name: '查询品牌'},
  {permission_id: 67, permission_key: '/sdk_zhongbai/transaction/consume/export_consume_detail', permission_name: '导出消费记录'},
  {permission_id: 68, permission_key: '/sdk_zhongbai/transaction/recharge/export_recharge_detail', permission_name: '导出充值记录'},
  {permission_id: 69, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/record/export', permission_name: '导出领卡记录'},
  {permission_id: 70, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/export_card_detail', permission_name: '导出子公司领卡明细'},
  {permission_id: 71, permission_key: '/sdk_zhongbai/prepaidcard/card_distribute/record/query', permission_name: '查询卡片领取记录'},
  {permission_id: 72, permission_key: '/sdk_zhongbai/prepaidcard/fabrication/query_start_card', permission_name: '查询实卡起始id'},
  {permission_id: NaN, permission_key: '', permission_name: ''}
];
