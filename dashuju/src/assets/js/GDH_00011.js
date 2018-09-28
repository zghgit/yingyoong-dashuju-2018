//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    key: "mem_full_name",
    width: 150,
    align: 'left'
  },
  {
    title: "融入方账户",
    key: "sell_acct_id",
    width: 150,
    align: 'left',
  },
  {
    title: "统计日期",
    key: "data_date",
    width: 120,
    align: 'center'
  },

  {
    title: "标的证券代码",
    key: "sec_code",
    width: 150,
    align: 'left'
  },
  {
    title: "标的证券简称",
    key: "sec_abbr",
    width: 150,
    align: 'left'
  },
  {
    title: "标的证券数量",
    key: "hold_vol_sum",
    width: 150,
    align: 'right'
  },
  {
    title: "初始交易金额（万元）",
    key: "trade_amt_sum",
    width: 120,
    align: 'right',
  },
  {
    title: "标的证券市值（万元）",
    key: "hold_amt_sum",
    width: 120,
    align: 'right'
  },
  {
    title: "履约保证比例(%)",
    key: "trade_ratio",
    width: 90,
    align: 'right'
  },
  {
    title: "标的证券市值（会员上报、万元）",
    key: "impawn_vol_amt",
    width: 150,
    align: 'right'
  },
  {
    title: "融入方应付金额（万元、会员上报）",
    key: "pay_amt_all_s",
    width: 150,
    align: 'right'
  },
  {
    title: "履约保障比例（会员上报）",
    key: "pay_amt_ratio",
    width: 150,
    align: 'right'
  },
  {
    title: "融出方属性",
    key: "buy_acct_type",
    width: 100,
    align: 'left'
  }
,
  {
    title: "证券类别",
    key: "sec_type_desc",
    width: 150,
    align: 'left'
  },
  {
    title: "司法冻结数量",
    key: "other_vol",
    width: 150,
    align: 'right'
  }
];
export {tableColumns1}
