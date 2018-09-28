let tableColumns1 = [
  {
    title: "债券代码",
    field: "sec_code",
    width: 100,
    notFormat:true,
    align: 'left'
  },
  {
    title: "债券名称",
    field: "sec_name",
    width: 240,
    align: 'left',
  },
{
    title: "最大跌幅%",
    field: "down_ratio",
    width: 140,
    align: 'right'
  },
  {
    title: "最大涨幅%",
    field: "up_ratio",
    width: 140,
    align: 'right',
  },
  {
    title: "日均换手率%",
    field: "exchange_ratio",
    width: 140,
    align: 'right',
  },
  {
    title: "价格最大偏离度%",
    field: "price_departure",
    width: 140,
    align: 'right',
  },
  {
    title: "个人投资者最大持有占比%",
    field: "phold_ratio",
    width: 140,
    align: 'right',
  },
  {
    title: "日均交易量(手)",
    field: "trade_vol",
    width: 150,
    align: 'right',
  },
  {
    title: "日均交易金额（元）",
    field: "trade_amt",
    width: 150,
    align: 'right',
  },
  {
    title: "估值（元）",
    field: "net_price",
    width: 140,
    align: 'right',
  },
];
let tableColumns2 = [
  {
    title: "哈哈",
    field: "trade_date",
    width: 140,
    align: 'left'
  },
  {
    title: "呵呵",
    field: "sell_acct_id",
    width: 140,
    align: 'left',
  },

];
export {tableColumns1,tableColumns2}
