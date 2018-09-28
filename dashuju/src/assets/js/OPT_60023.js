//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "交易日期",
    field: "trade_date",
    width: 100,
    align: 'center',
    static: false
  },
  {
    title: "实际收款(交易系统)(元)",
    field: "fee_amt_trade_system",
    width: 100,
    align: 'right',
    static: false
  },
  {
    title: "比对数据 ",
    field: "childs",
    static: true,
    children: [
      {
        title: "标准收费金额（元）",
        field: "std_fee_amt",
        align: 'right',
        width: 100,
      },
      {
        title: "优惠金额（元）",
        field: "deduct_fee_amt",
        align: 'right',
        width: 100,
      },
      {
        title: "优惠后收费（元）",
        field: "pay_fee_amt",
        align: 'right',
        width: 100,
      },
      {
        title: "奖励金额（元）",
        field: "back_fee_amt",
        align: 'right',
        width: 100,
      },
      {
        title: "实际收款（元）",
        field: "fee_amt",
        align: 'right',
        width: 100,
      }
    ]
  }
];
export {tableColumns1}
