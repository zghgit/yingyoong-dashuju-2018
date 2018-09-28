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
    title: "业务类型",
    field: "trade_type_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "对应历史业务类型",
    field: "his_trade_type_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "初始交易日或补充质押日",
    field: "trade_date",
    width: 100,
    align: 'center',
  },
  {
    title: "购回交易日",
    field: "repur_date",
    width: 100,
    align: 'center',
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
    title: "购回交易金额（万元）",
    field: "repur_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "初始交易金额（万元）",
    field: "trade_amt",
    width: 120,
    align: 'right',
  },
  {
    title: "实际购回价格",
    field: "repur_price",
    width: 120,
    align: 'right',
  },
  {
    title: "购回交易类型",
    field: "repur_trade_type",
    width: 100,
    align: 'left',
  },
  {
    title: "购回期限",
    field: "repur_limit",
    width: 100,
    align: 'right',
  },
  {
    title: "融出方属性",
    field: "out_acct_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "融入方属性",
    field: "in_acct_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "证券类别",
    field: "sec_type",
    width: 100,
    align: 'left',
  },
  {
    title: "流通类别",
    field: "nego_type",
    width: 100,
    align: 'left',
  },
  {
    title: "权益类别",
    field: "right_type",
    width: 100,
    align: 'left',
  },
  {
    title: "挂牌年份",
    field: "list_year",
    width: 100,
    align: 'left',
  },
];
export {tableColumns1}
