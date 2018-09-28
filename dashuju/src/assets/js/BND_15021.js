//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns21 = [
  { field: "sec_term", title: "品种", width: 100, align: 'left'},
  { field: "trade_amt", title: "区间成交金额（亿元）", width: 150, align: 'right'},
  { field: "trade_ratio", title: "比例（%）", width: 100, align: 'right'},
  { field: "start_unmature_amt", title: "期初未到期余额（亿元）", width: 150, align: 'right'},
  { field: "end_unmature_amt", title: "期末未到期余额（亿元）", width: 150, align: 'right'},
  { field: "avg_unmature_amt", title: "日均未到期余额（亿元）", width: 150, align: 'right'},
  { field: "end_unmature_ratio", title: "期末未到期余额占比（%）", width: 150, align: 'right'},
  { field: "avg_unmature_ratio", title: "日均未到期余额占比（%）", width: 150, align: 'right'},
  { field: "start_std_amt", title: "期初标准券总额（亿元）", width: 150, align: 'right'},
  { field: "end_std_amt", title: "期末标准券总额（亿元）", width: 150, align: 'right'},
  { field: "avg_std_amt", title: "日均标准券总额（亿元）", width: 150, align: 'right'},
];
export {tableColumns21}
