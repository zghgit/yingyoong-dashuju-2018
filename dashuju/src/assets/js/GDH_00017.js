//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    field: "mem_full_name",
    width: 120,
    align: 'left'
  },
  {
    title: "融入方账户",
    field: "sell_acct_id",
    width: 100,
    align: 'left',
  },
  {
    title: "统计日期",
    field: "trade_date",
    width: 100,
    align: 'center',
  },
  {
    title: "初始交易金额（万元）",
    field: "trade_amt_sum",
    width: 100,
    align: 'right',
  },
  {
    title: "T-1日标的证券市值（万元）",
    field: "hold_amt_sum_pre",
    width: 100,
    align: 'right',
  },
  {
    title: "T-1日履约保证比例（%）",
    field: "trade_ratio_pre",
    width: 100,
    align: 'right',
  },
  {
    title: "T日估算标的证券市值（万元）",
    field: "hold_amt_sum_v",
    width: 100,
    align: 'right',
  },
  {
    title: "T日估算履约保证比例（%）",
    field: "trade_ratio_v",
    width: 100,
    align: 'right',
  },
  {
    title: "T日标的证券市值（万元）",
    field: "hold_amt_sum",
    width: 100,
    align: 'right',
  },
  {
    title: "T日履约保证比例（%）",
    field: "trade_ratio",
    width: 100,
    align: 'right',
  },
];
export {tableColumns1}
