//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    key: "mem_name",
    width: 150,
    align: 'left'
  },
  {
    title: "一码通账户",
    key: "ccrc_acct_id",
    width: 120,
    align: 'left',
  },
  {
    title: "账户名称",
    key: "acct_name",
    width: 120,
    align: 'left'
  },
  {
    title: "标的证券代码",
    key: "sec_code",
    width: 120,
    align: 'left',
  },
  {
    title: "标的证券简称",
    key: "sec_name",
    width: 120,
    align: 'left'
  },
  {
    title: "待购回证券数量",
    key: "unmature_vol_sum",
    width: 120,
    align: 'right'
  },
  {
    title: "标的证券市值(万元)",
    key: "unmature_vol_amt_s",
    width: 120,
    align: 'right',
  },
  {
    title: "履约保障比例(%)",
    key: "trade_ratio",
    width: 100,
    align: 'right'
  },
  {
    title: "待购回余额（万元）",
    key: "unmature_amt_sum",
    width: 120,
    align: 'right',
  },
  {
    title: "融入方应付金额（万元、会员上报）",
    key: "pay_amt_all_sum",
    width: 120,
    align: 'right'
  },
  {
    title: "履约保障比例%（会员上报）",
    key: "pay_amt_t_ratio",
    width: 100,
    align: 'right'
  },
  {
    title: "可质押数量",
    key: "valid_vol_sum",
    width: 120,
    align: 'right',
  },
  {
    title: "可质押数量的市值（万元）",
    key: "valid_amt_sum",
    width: 120,
    align: 'right'
  },
  {
    title: "融入方属性",
    key: "in_acct_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "持股比例(%)",
    key: "hold_ratio_rt",
    width: 100,
    align: 'right',
  },
  {
    title: "持股数量",
    key: "ccrc_hold_bal",
    width: 120,
    align: 'right',
  },
  {
    title: "司法冻结数量",
    key: "sf_frzn_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "是否第一大股东",
    key: "is_most_sec_holder",
    width: 120,
    align: 'left',
  },
  {
    title: "标的证券总股本",
    key: "capital",
    width: 120,
    align: 'right',
  },
  // {
  //   title: "融出方属性",
  //   key: "buy_acct_type",
  //   width: 100,
  //   align: 'left',
  // },
  // {
  //   title: "证券类别",
  //   key: "sec_type",
  //   width: 120,
  //   align: 'left',
  // },
];
export {tableColumns1}
