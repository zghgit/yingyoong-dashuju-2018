//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "融入方账号",
    field: "acct_id",
   width: 100,
    align: 'left'
  },
  {
    title: "账户名称",
    field: "acct_name",
   width: 200,
    align: 'left',
  },
  {
    title: "交易日期",
    field: "trade_date",
   width: 100,
    align: 'left',
  },
  {
    title: "标的证券代码",
    field: "sec_code",
   width: 100,
    align: 'left',
  },
  {
    title: "标的证券简称",
    field: "sec_name",
   width: 120,
    align: 'left',
  },
  {
    title: "持股比例（交易前）（%）",
    field: "hold_ratio",
    width: 100,
    align: 'right',
  },
  {
    title: "约定购回",
    field: "all1",
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "ydgh_up_trade_amt",
       width: 140,
        align: 'right'
      },
      {
        title: "标的证券市值",
        field: "ydgh_up_other_amt",
       width: 100,
        align: 'right',
      },
      {
        title: "调整后履约保障比例（%）",
        field: "ydgh_trade_ratio",
        width: 100,
        align: 'right',
      }
    ]
  },
  {
    title: "股票质押",
    field: "all2",
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "gpzy_up_trade_amt",
       width: 140,
        align: 'right'
      },
      {
        title: "标的证券市值（调整后）",
        field: "gpzy_up_other_amt",
       width: 100,
        align: 'right'
      },
      {
        title: "调整后履约保障比例（%）",
        field: "gpzy_trade_ratio",
        width: 100,
        align: 'right',
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
       width: 140,
        align: 'right'
      },
      {
        title: "标的证券市值",
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
