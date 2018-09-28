//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns02 = [
  { field: "branch_name", title: "营业部",width: 250, align: 'left'},
  { field: "sum_trade_amt", title: "成交金额（亿元）",width: 150, align: 'right'},
  { field: "trade_ratio", title: "占比（成交金额/成交总金额）%",width: 100, align: 'right'},
  { field: "tot_trade_vol", title: "成交数量（手）",width: 100, align: 'right'},
  { field: "tot_trade_cnt", title: "成交笔数（笔）",width: 100, align: 'right'},
  { field: "acct_cnt", title: "今日交易投资者数",width: 100, align: 'right'},
  { field: "unmature_acct_cnt", title: "持有未到期投资者数",width: 100, align: 'right'},
  { field: "sum_unmature_vol", title: "回购未到期金额（亿元）",width: 150, align: 'right'},
  { field: "unmature_ratio", title: "占比（回购未到期金额/回购未到期总额）%",width: 120, align: 'right'},
];
export {tableColumns02}
