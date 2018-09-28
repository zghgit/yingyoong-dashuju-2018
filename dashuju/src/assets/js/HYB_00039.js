//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "证券代码",
    field: "sec_code",
    align: 'left',
    width: 120,
  },
  {
    title: "证券名称",
    field: "sec_name",
    align: 'left',
    width: 160,
  },  {
    title: "交易日期",
    field: "trade_date",
    align: 'left',
    width: 120,
  },
   {
    title: "过去30交易日成交额（元）",
    field: "sum_trade_amt",
    align: 'right',
    width: 150,
  },
  {
    title: "期末收盘价较过去20个交易日最大跌幅（%）",
    field: "close_price_ratio",
    align: 'right',
    width: 120,
  },
  {
    title: "约定购回",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "标的证券市值（元）",
        field: "hold_amt_1",
        align: 'right',
        width: 120,
      },
      {
        title: "与过去30交易日成交额比值（%）",
        field: "up_trade_amt_1_ratio",
        align: 'right',
        width: 120,
      }
    ]
  },
  {
    title: "股票质押",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "标的证券市值（调整后）",
        field: "hold_amt_2",
        align: 'right',
        width: 120,
      },
      {
        title: "与过去30交易日成交额比值（%）",
        field: "up_trade_amt_2_ratio",
        align: 'right',
        width: 120,
      }
    ]
  },
  {
    title: "两项合计",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_s",
        align: 'right',
        width: 150,
      },
      {
        title: "标的证券市值（元）",
        field: "hold_amt_s",
        align: 'right',
        width: 120,
      },
      {
        title: "与过去30交易日成交额比值（%）",
        field: "up_trade_amt_s_ratio",
        align: 'right',
        width: 120,
      }
    ]
  }
];
export {tableColumns1}
