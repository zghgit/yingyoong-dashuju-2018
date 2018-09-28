//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    field: "mem_abbr",
    width: 120,
    align: 'left'
  },
  {
    title: "总成交金额（亿元）",
    field: "t_trade_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "总成交数量（手）",
    field: "t_trade_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "总成交笔数（笔）",
    field: "t_trade_cnt",
    width: 120,
    align: 'right',
  },
  {
    title: "期初回购未到期余额（亿元）",
    field: "start_unmature_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "期末回购未到期余额（亿元）",
    field: "end_unmature_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "日均回购未到期金额（亿元）",
    field: "avg_unmature_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "期初标准券总额（亿元）",
    field: "start_std_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "期末标准券总额（亿元）",
    field: "end_std_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "日均标准券总额（亿元）",
    field: "avg_std_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "日均未到期占比（%）",
    field: "avg_unmature_ratio",
    width: 80,
    align: 'right',
  },
  {
    title: "期末未到期占比（%）",
    field: "end_unmature_ratio",
    width: 80,
    align: 'right',
  },
  {
    title: "日均成交金额（亿元）",
    field: "avg_trade_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "日均成交数量（手）",
    field: "avg_trade_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "日均成交笔数（笔）",
    field: "avg_trade_cnt",
    width: 120,
    align: 'right',
  },
];
export {tableColumns1}
