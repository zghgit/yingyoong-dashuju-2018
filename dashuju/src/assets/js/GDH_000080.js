
let anchorTableColumn = [
  {
    title: "交易日期",
    key: "stat_date",
    width: 100,
    align: 'center'
  },
  {
    title: "待回购证券代码",
    key: "sec_code",
    width: 120,
    align: 'left',
  },
  {
    title: "待购回证券名称",
    key: "sec_name",
    width: 150,
    align: 'left',
  },
  {
    title: "会员名称",
    key: "mem_full_name",
    width: 150,
    align: 'left',
  },
  {
    title: "持有待购回证券客户数",
    key: "client_cnt",
    width: 120,
    align: 'right',
  },
  {
    title: "持有待购回证券数量",
    key: "unmature_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "持有待购回证券非限售数量",
    key: "pt_unmature_vol",
    width: 120,
    align: 'right',

  },
  {
    title: "待购回余额(万元)",
    key: "note2",
    width: 120,
    align: 'right',
  },
  {
    title: "待购回非限售证券余额(万元)",
    key: "pt_trade_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "持有待购回证券总股本(万)",
    key: "hold_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "质押集中度比例(%)",
    key: "trade_ratio",
    width: 100,
    align: 'right',
  },

];

let tableColumns1 = [
  {
    title: "交易日期",
    key: "stat_date",
    width: 100,
    align: 'center'
  },
  {
    title: "待购回证券代码",
    key: "sec_code",
    width: 120,
    align: 'left'
  }, {
    title: "待购回证券名称",
    key: "sec_name",
    width: 120,
    align: 'left'
  }, {
    title: "过去30交易日二级市场日均交易量",
    key: "avg_trade_vol",
    width: 120,
    align: 'right'
  }, {
    title: "过去30交易日二级市场日均交易额",
    key: "avg_trade_amt",
    width: 120,
    align: 'right'
  }, {
    title: "持有待购回证券客户数",
    key: "client_cnt",
    width: 120,
    align: 'right'
  }, {
    title: "持有待购回证券的证券公司数",
    key: "company_cnt",
    width: 120,
    align: 'right',
    hasAnchor:true
  }, {
    title: "持有待购回证券数量",
    key: "unmature_vol",
    width: 120,
    align: 'right'
  }, {
    title: "持有待购回非限售数量",
    key: "pt_unmature_vol",
    width: 120,
    align: 'right'
  }, {
    title: "待购回余额(万元)",
    key: "trade_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "待购回非限售证券余额(万元)",
    key: "pt_trade_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "持有待购回总股本(万)",
    key: "hold_vol",
    width: 120,
    align: 'right'
  }, {
    title: "质押集中度比例(%)",
    key: "trade_ratio",
    width: 100,
    align: 'right'
  },








];
export {tableColumns1,anchorTableColumn}

