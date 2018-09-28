//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "回购期限",
    field: "repur_desc",
    width: 120,
    align: 'left',
    static: false
  },
  {
    title: "按预计购回交易日统计",
    field: "childs",
    static: true,
    children: [
      {
        title: "初始交易金额（万元）",
        field: "buy_trade_amt",
        align: 'right',
        width: 130,
      },
      {
        title: "占比（%）",
        field: "buy_trade_ratio",
        align: 'right',
        width: 80,
      }
    ]
  },
  {
    title: "按实际购回交易日统计",
    field: "childs",
    static: true,
    children: [
      {
        title: "初始交易金额（万元）",
        field: "sell_trade_amt",
        align: 'right',
        width: 130,
      },
      {
        title: "占比（%）",
        field: "sell_trade_ratio",
        align: 'right',
        width: 80,
      }
    ]
  }
];
export {tableColumns1}
