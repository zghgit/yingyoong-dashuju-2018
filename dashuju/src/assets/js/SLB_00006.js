
let tableColumns1 = [
  {
    title: "序号",
    field: "rk",
    width: 80,
    align: 'left'
  },
  {
    title: "交易日期",
    field: "trade_date",
    width: 100,
    align: 'center',

  },
  {
    title: "证券账号",
    field: "acct_id",
    width: 110,
    align: 'left',
    hasAnchor:true
  },
  {
    title: "账户名称",
    field: "acct_name",
    width: 400,
    align: 'left',

  },
  {
    title: "PBU号",
    field: "pbu_id",
    width: 100,
    align: 'left',

  },
  {
    title: "指定交易证券公司名称",
    field: "mem_name",
    width: 350,
    align: 'left',

  }
];
let anchorTableColumn = [
  {
    title: "成交序列号",
    field: "trade_seq",
    width: 100,
    align: 'left'
  },
  {
    title: "证券代码",
    field: "sec_code",
    width: 100,
    align: 'left',

  },
  {
    title: "出借数量",
    field: "trade_vol",
    width: 100,
    align: 'right',

  },
  {
    title: "转融通费率",
    field: "buy_fee",
    width: 100,
    align: 'right',

  },
  {
    title: "期限",
    field: "sell_settle_rate",
    width: 100,
    align: 'left',

  },
  {
    title: "借入方证券账号",
    field: "buy_acct_id",
    width: 100,
    align: 'left',

  },
  {
    title: "借入方PBU号",
    field: "buy_pbu_id",
    width: 100,
    align: 'left',

  }
];
export {tableColumns1,anchorTableColumn}
