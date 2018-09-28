//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    field: "mem_name",
    width: 150,
    align: 'left'
  },
  {
    title: "证券账户",
    field: "acct_id",
    width: 120,
    align: 'left',
  },
  {
    title: "账户名称",
    field: "acct_name",
    width: 120,
    align: 'left',
  },
  {
    title: "标的证券代码",
    field: "sec_code",
    width: 120,
    align: 'left',
  },
  {
    title: "标的证券简称",
    field: "sec_name",
    width: 120,
    align: 'left',
  },
  {
    title: "待购回证券数量",
    field: "unmature_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "待购回余额（万元）",
    field: "unmature_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "标的证券市值（万元）",
    field: "mkt_val",
    width: 120,
    align: 'right',
  },
  {
    title: "履约保证比例（%）",
    field: "trade_ratio",
    width: 80,
    align: 'right',
  },
  {
    title: "融入方应付金额（万元、会员上报）",
    field: "pay_amt_s",
    width: 120,
    align: 'right',
  },
  {
    title: "履约保障比例%（会员上报）",
    field: "coll_rate_s",
    width: 120,
    align: 'right',
  },
  {
    title: "可质押数量",
    field: "valid_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "可质押数量的市值（万元）",
    field: "valid_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "融入方属性",
    field: "in_acct_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "持股比例%",
    field: "hold_ratio",
    width: 80,
    align: 'right',
  },
  {
    title: "司法冻结数量",
    field: "other_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "是否第一大股东",
    field: "total_hold_rank",
    width: 120,
    align: 'left',
  },
  {
    title: "标的证券总股本",
    field: "tot_vol",
    width: 120,
    align: 'right',
  },
  // {
  //   title: "融出方属性",
  //   field: "out_acct_desc",
  //   width: 100,
  //   align: 'left',
  // },
  // {
  //   title: "证券类别",
  //   field: "sec_type",
  //   width: 120,
  //   align: 'left',
  // },
];
export {tableColumns1}
