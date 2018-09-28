let tableColumns = [
  { field: "ccrc_acct_id", title: "一码通号", minWidth: "100", align: "left"},
  { field: "acct_id", title: "证券账户", minWidth: "100", align: "left"},
  { field: "acct_name", title: "证券账户名称", minWidth: "110", align: "left"},
  { field: "trade_price", title: "最高成交价格", minWidth: "110", align: "right"},
  { field: "jq_trade_price", title: "加权平均价", minWidth: "100", align: "right"},
  { field: "trade_amt", title: "超过利率阈值的成交金额（万元）", minWidth: "240", align: "right"},
  { field: "qtjq_trade_price", title: "全天加权平均价", minWidth: "130", align: "right"},
  { field: "qt_trade_amt", title: "全天成交金额（万元）", minWidth: "170", align: "right"},
]
export {tableColumns}
