//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "证券公司",
    field: "mem_full_name",
    width: 100,
    align: 'left'
  },
  {
    title: "交易日期",
    field: "trade_date",
    width: 100,
    align: 'center',
  },
  {
    title: "约定购回",
    field: "all1",
    children: [
      {
        title: "待购回初始交易金额（元）",
        field: "ydgh_trade_amt",
        width: 140,
        align: 'right'
      },
      {
        title: "标的证券市值",
        field: "ydgh_hold_amt",
        width: 100,
        align: 'right',
      },
      {
        title: "待购回初始交易金额变动（元）",
        field: "ydgh_repur_trade_amt",
        width: 140,
        align: 'right',
      },
      {
        title: "其他担保物价值",
        field: "ydgh_otc_other_amt",
        width: 100,
        align: 'right',
      },
      {
        title: "调整后待购回初始交易金额（元）",
        field: "ydgh_up_trade_amt",
        width: 140,
        align: 'right'
      },
      {
        title: "调整后担保物价值",
        field: "ydgh_up_other_amt",
        width: 100,
        align: 'right'
      },
      {
        title: "调整后履约保障比例（%）",
        field: "ydgh_trade_ratio",
        width: 100,
        align: 'right'
      }
    ]
  },
  {
    title: "股票质押",
    field: "all2",
    children: [
      {
        title: "待购回初始交易金额（元）",
        field: "gpzy_trade_amt",
        width: 140,
        align: 'right'
      },
      {
        title: "标的证券市值（调整后）",
        field: "gpzy_hold_amt",
        width: 100,
        align: 'right'
      },
      {
        title: "待购回初始交易金额变动（元）",
        field: "gpzy_repur_trade_amt",
        width: 140,
        align: 'right',
      },
      {
        title: "其他担保物价值",
        field: "gpzy_otc_other_amt",
        width: 100,
        align: 'right',
      },
      {
        title: "调整后待购回初始交易金额（元）",
        field: "gpzy_up_trade_amt",
        width: 140,
        align: 'right'
      },
      {
        title: "调整后担保物价值",
        field: "gpzy_up_other_amt",
        width: 100,
        align: 'right'
      },
      {
        title: "调整后履约保障比例（%）",
        field: "gpzy_trade_ratio",
        width: 100,
        align: 'right'
      }
    ]
  },
  {
    title: "两项合计",
    field: "all2",
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "hj_up_trade_amt",
        width: 100,
        align: 'right'
      },
      {
        title: "调整后担保物价值",
        field: "hj_up_other_amt",
        width: 100,
        align: 'right'
      },
      {
        title: "调整后履约保障比例（%）",
        field: "hj_trade_ratio",
        width: 100,
        align: 'right',
      },

    ]
  }
];
export {tableColumns1}
