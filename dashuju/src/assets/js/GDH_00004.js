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
    title: "初始交易日",
    key: "trade_date",
    width: 100,
    align: 'center',
  },
  {
    title: "预计购回交易日",
    key: "repur_date",
    width: 100,
    align: 'center'
  },
  {
    title: "标的证券代码",
    key: "sec_code",
    width: 120,
    align: 'left',
  },
  {
    title: "标的证券类型说明",
    key: "sec_type_desc",
    width: 120,
    align: 'left'
  },
  {
    title: "标的证券简称",
    key: "sec_name",
    width: 120,
    align: 'left'
  },
  {
    title: "标的证券数量",
    key: "trade_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "初始交易金额（万元）",
    key: "trade_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "标的证券市值（万元）",
    key: "capital",
    width: 120,
    align: 'right',
  },
  {
    title: "履约保证比例(%)",
    key: "assure_ratio",
    width: 80,
    align: 'right'
  },
  {
    title: "购回期限",
    key: "repur_limit",
    width: 100,
    align: 'right'
  },
  {
    title: "预计剩余购回期限",
    key: "left_day",
    width: 100,
    align: 'right',
  },
  {
    title: "20日较期初盘中最大跌幅",
    key: "drop_range_1",
    width: 120,
    align: 'right'
  },
  {
    title: "20日期末较盘中最大跌幅",
    key: "drop_range_2",
    width: 120,
    align: 'right',
  },
  {
    title: "融出方账户",
    key: "out_acct_id",
    width: 120,
    align: 'left',
  },
  {
    title: "融出方属性",
    key: "out_acct_desc",
    width: 80,
    align: 'left',
  },
  {
    title: "融入方账户",
    key: "in_acct_id",
    width: 120,
    align: 'left',
  },
  {
    title: "融入方属性",
    key: "in_acct_desc",
    width: 80,
    align: 'left',
  },
  {
    title: "融入方属性2",
    key: "in_acct_desc2",
    width: 80,
    align: 'left',
  },
  {
    title: "证券类别",
    key: "sec_type",
    width: 100,
    align: 'left',
  },
  {
    title: "流通类别",
    key: "nego_type",
    width: 100,
    align: 'left',
  },
  {
    title: "权益类别",
    key: "right_type",
    width: 100,
    align: 'left',
  },
  {
    title: "挂牌年份",
    key: "list_year",
    width: 100,
    align: 'left',
  },
  {
    title: "质权人名称",
    key: "out_name",
    width: 150,
    align: 'left',
  },
  {
    title: "融入方应付金额（万元）会员上报",
    key: "pay_amt_all",
    width: 120,
    align: 'right',
  },
  {
    title: "履约保障比例（会员上报）",
    key: "coll_rate",
    width: 120,
    align: 'right',
  },
  {
    title: "司法冻结数量",
    key: "other_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "融资投向",
    key: "maturity_flag",
    width: 120,
    align: 'left',
  }
];
export {tableColumns1}
