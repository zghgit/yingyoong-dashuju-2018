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
    title: "会员编号",
    key: "mem_code",
    width: 150,
    align: 'left',
  },
  {
    title: "盯市日期",
    key: "trade_date",
    width: 100,
    align: 'center'
  },
  {
    title: "业务类型",
    key: "impawn_type",
    width: 100,
    align: 'left',
  },
  {
    title: "初始交易日期",
    key: "init_trade_date",
    width: 100,
    align: 'center'
  },
  {
    title: "初始交易成交编号",
    key: "init_trade_no",
    width: 120,
    align: 'left'
  },
  {
    title: "补充质押日期",
    key: "add_trade_date",
    width: 100,
    align: 'center',
  },
  {
    title: "补充质押成交编号",
    key: "add_trade_no",
    width: 120,
    align: 'left'
  },
  {
    title: "证券代码",
    key: "sec_code",
    width: 135,
    align: 'left',
  },
  {
    title: "证券简称",
    key: "sec_name",
    width: 100,
    align: 'left'
  },
  {
    title: "是否属于限售股份",
    key: "nonnego_flag",
    width: 100,
    align: 'left'
  },
  {
    title: "标的证券数量(股/份/张)",
    key: "trade_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "初始交易金额(元)",
    key: "init_trade_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "初始购回期限(天)",
    key: "repur_term",
    width: 120,
    align: 'right',
  },
  {
    title: "初始购回日期",
    key: "repur_date",
    width: 100,
    align: 'center',
  },
  {
    title: "初始购回金额(元)",
    key: "repur_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "融资利率(%,年化收益率)",
    key: "int_rate",
    width: 100,
    align: 'right',
  },
  {
    title: "融出方属性",
    key: "sell_acct_type",
    width: 100,
    align: 'left',
  },
  {
    title: "融入方属性",
    key: "buy_acct_type",
    width: 100,
    align: 'left',
  },
  {
    title: "融入方应付金额(元)",
    key: "pay_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "实际融资利率(%,年化收益率)",
    key: "actl_int_rate",
    width: 100,
    align: 'right',
  },
  {
    title: "当前质押数量(股/份/张)",
    key: "impawn_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "当前质押红利金额(元)",
    key: "dividend_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "盯市履约保障比例(%)",
    key: "coll_rate",
    width: 100,
    align: 'right',
  },
  {
    title: "履约保障级别",
    key: "check_level",
    width: 120,
    align: 'left',
  },
  {
    title: "合约状态",
    key: "contr_status",
    width: 100,
    align: 'left',
  },
  {
    title: "了结类型",
    key: "end_type",
    width: 100,
    align: 'left',
  },
  {
    title: "资金用途类型",
    key: "cash_use_type",
    width: 120,
    align: 'left',
  },
  {
    title: "资金用途描述",
    key: "cash_use_desc",
    width: 120,
    align: 'left',
  },
  {
    title: "业务备用字段",
    key: "note",
    width: 120,
    align: 'left',
  },
  {
    title: "质押标的价格(元)",
    key: "pre_curr_price",
    width: 130,
    align: 'right',
  },
  {
    title: "质押标的市值(元)",
    key: "vol_price",
    width: 130,
    align: 'right',
  }
];
export {tableColumns1}
