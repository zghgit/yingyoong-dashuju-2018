//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "资金融入主体",
    field: "stat_type",
    width: 100,
    align: 'left',
    static: false
  },
  {
    title: "约定购回",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_yd",
        align: 'right',
        width: 100,
      },
      {
        title: "占比（%）",
        field: "ydzb",
        align: 'right',
        width: 80,
      },

    ]
  },
  {
    title: "股票质押",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_gp",
        align: 'right',
        width: 100,
      },
      {
        title: "占比（%）",
        field: "gpzb",
        align: 'right',
        width: 80,
      },

    ]
  },
  {
    title: "两项合计",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_sum",
        align: 'right',
        width: 100,
      },
      {
        title: "占比（%）",
        field: "hjzb",
        align: 'right',
        width: 80,
      },

    ]
  }
];
export {tableColumns1}
