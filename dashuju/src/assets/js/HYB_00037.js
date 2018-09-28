//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "回购期限",
    field: "stat_type",
    align: 'left',
    width: 150,
  },
  {
    title: "约定购回",
    field: "childs",
    static: true,
    children: [
      {
        title: "初始交易金额（元）",
        field: "agreed_repurchase_type_securities_trading",
        align: 'right',
        width: 250,
      },
      {
        title: "占比（%）",
        field: "agreed_repurchase_ratio",
        align: 'right',
        width: 100,
      }
    ]
  },
  {
    title: "股票质押",
    field: "childs",
    static: true,
    children: [
      {
        title: "初始交易金额（元）",
        field: "stock_pledge_init_trade_amt",
        align: 'right',
        width: 250,
      },
      {
        title: "占比（%）",
        field: "stock_pledge_ratio",
        align: 'right',
        width: 100,
      }
    ]
  }
];
export {tableColumns1}
