
let tableColumns_A = [
    { field: "trade_amt", title: "成交金额（万元）", width: 150, align: 'right'},
    { field: "trade_vol", title: "成交数量（手）", width: 140, align: 'right'},
    { field: "cnt", title: "成交笔数（笔）", width: 140, align: 'right'},
    { field: "total_acct_cnt", title: "投资者人数", width: 150, align: 'right'},
    { field: "acct_cnt", title: "今日交易投资者数(人)", width: 100, align: 'right'},
    { field: "unmature_cnt", title: "持有未到期回购投资者数(人)", width: 100, align: 'right'},
    { field: "unmature", title: "回购未到期金额（万元）", width: 150, align: 'right'},
    { field: "unmat_total_per", title: "占比（%）", width: 100, align: 'right'},
    { field: "total_amt", title: "标准券总额（亿元）", width: 150, align: 'right'},
];
  // 周报：
let tableColumns_A01 = [
    { field: "term", title: "期限", width: 100, align: 'left'},
    { field: "max_price", title: "最高报价", width: 120, align: 'right'},
    { field: "min_price", title: "最低报价", width: 120, align: 'right'},
    { field: "trade_amt", title: "周成交金额", width: 150, align: 'right'},
    { field: "trade_amt_ratio", title: "比例（%）", width: 120, align: 'right'},
    { field: "unmature", title: "未到期金额", width: 150, align: 'right'},
    { field: "unmature_ratio", title: "比例（%）", width: 120, align: 'right'},
  ];
  // 日报：
let tableColumns_A02 = [
  { field: "term", title: "期限", width: 100, align: 'left'},
  { field: "avg_price", title: "报价", width: 120, align: 'right'},
  { field: "trade_amt", title: "成交金额", width: 150, align: 'right'},
  { field: "trade_amt_ratio", title: "比例（%）", width: 120, align: 'right'},
  { field: "unmature", title: "未到期金额", width: 150, align: 'right'},

]
export {tableColumns_A,tableColumns_A01, tableColumns_A02}
