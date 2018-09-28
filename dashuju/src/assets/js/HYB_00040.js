//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "证券代码",
    field: "sec_code",
    width: 100,
    align: 'left'
  },
  {
    title: "证券名称",
    field: "sec_name",
    width: 140,
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
        title: "调整后待购回初始交易金额（元）",
        field: "ydgh_up_trade_amt",
        width: 140,
        align: 'right'
      },
      {
        title: "标的证券占总股本比例（%）",
        field: "ydgh_trade_ratio",
        width: 100,
        align: 'right',
      },
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
        title: "无限售质押股对应调整后待购回初始交易金额（元）",
        field: "gpzy_up_trade_amt_pt",
        width: 140,
        align: 'right'
      },
      {
        title: "限售质押股对应调整后待购回初始交易金额（元）",
        field: "gpzy_up_trade_amt_xl",
        width: 140,
        align: 'right',
      },
      {
        title: "无限售质押证券占总股本比例（%）",
        field: "gpzy_trade_ratio_pt",
        width: 100,
        align: 'right',
      },
      {
        title: "限售质押占总股本比例（%）",
        field: "gpzy_trade_ratio_xl",
        width: 100,
        align: 'right'
      },
      {
        title: "标的证券占总股本比例（%）",
        field: "gpzy_trade_ratio",
        width: 90,
        align: 'right'
      }
    ]
  },
  {
    title: "场内场外质押合计",
    field: "all2",
    children: [
      {
        title: "无限售股份质押数量",
        field: "nyhj_impawn_hold_vol_1",
        width: 100,
        align: 'right'
      },
      {
        title: "有限售股份质押数量",
        field: "nyhj_impawn_hold_vol_2",
        width: 100,
        align: 'right'
      },
      {
        title: "总股本",
        field: "nyhj_a_hold_amt",
        width: 100,
        align: 'right',
      },
      {
        title: "质押数量占总股本比例（%）",
        field: "nyhj_impawn_ratio",
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
        field: "lxhj_up_trade_amt",
        width: 140,
        align: 'right'
      },
      {
        title: "标的证券占总股本比例（%）",
        field: "lxhj_trade_ratio",
        width: 100,
        align: 'right'
      }
    ]
  },
  {
    title: "三项合计担保占总股本比例（%）",
    field: "sxhj_hold_vol",
    width: 100,
    align: 'right'
  },
  {
    title: "连续停牌是否超过20交易日",
    field: "if_valid",
    width: 70,
    align: 'left',
  },
];
export {tableColumns1}
