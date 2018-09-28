//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "品种",
    field: "sec_term",
    width: 150,
    align: 'left',
    static: false
  },
  {
    title: "新开",
    field: "childs",
    static: true,
    children: [
      {
        title: "金额（亿元）",
        field: "trade_amt",
        align: 'right',
        width: 120,
      },
      {
        title: "占比（%）",
        field: "trade_ratio",
        align: 'right',
        width: 80,
      }
    ]
  },
  {
    title: "到期",
    field: "childs",
    static: true,
    children: [
      {
        title: "金额（亿元）",
        field: "mature_amt",
        align: 'right',
        width: 120,
      },
      {
        title: "占比（%）",
        field: "mature_ratio",
        align: 'right',
        width: 80,
      }
    ]
  }
  ,
  {
    title: "提前终止",
    field: "childs",
    static: true,
    children: [
      {
        title: "金额（亿元）",
        field: "cutoff_amt",
        align: 'right',
        width: 120,
      },
      {
        title: "占比（%）",
        field: "cutoff_ratio",
        align: 'right',
        width: 80,
      }
    ]
  },
  {
    title: "日终未到期",
    field: "childs",
    static: true,
    children: [
      {
        title: "金额（亿元）",
        field: "unmature_amt",
        align: 'right',
        width: 120,
      },
      {
        title: "占比（%）",
        field: "unmature_ratio",
        align: 'right',
        width: 80,
      }
    ]
  },
];
export {tableColumns1}
