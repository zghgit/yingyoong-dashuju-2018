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
    title: "对应历史业务类型",
    key: "his_trade_type_desc",
    width: 100,
    align: 'left',
  },
  {
    title: "初始交易日或补充质押日",
    key: "his_trade_date",
    width: 100,
    align: 'center'
  },
  {
    title: "预计购回交易日",
    key: "repur_date",
    width: 100,
    align: 'center',
  },
  {
    title: "违约处置申报日",
    key: "trade_date",
    width: 100,
    align: 'center'
  },
  {
    title: "标的证券代码",
    key: "sec_code",
    width: 120,
    align: 'left'
  },
  {
    title: "标的证券简称",
    key: "sec_name",
    width: 120,
    align: 'left',
  },
  {
    title: "初始交易金额（万元）",
    key: "trade_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "初始交易数量",
    key: "trade_vol",
    width: 120,
    align: 'right',
  },
  {
    title: "融出方属性",
    key: "out_acct_desc",
    width: 80,
    align: 'left'
  },
  {
    title: "融入方属性",
    key: "in_acct_desc",
    width: 80,
    align: 'left'
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
    align: 'left'
  },
  {
    title: "权益类别",
    key: "right_type",
    width: 100,
    align: 'left'
  },
  {
    title: "挂牌年份",
    key: "list_year",
    width: 100,
    align: 'left',
  }
];
export {tableColumns1}
