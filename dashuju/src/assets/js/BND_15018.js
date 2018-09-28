//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns18 = [
  { field: "variety", title: "品种", width: 100, align: 'left'},
  { field: "trade_price", title: "报价", width: 100, align: 'right'},
  { field: "", title: "新开", align: 'right',
    children: [
      {title: "金额（亿元）", field: "trade_amt", width: 140, align: 'right'},
      {title: "占比（%）", field: "trade_ratio", width: 100, align: 'right',},
    ]},
  { field: "b04", title: "到期", align: 'left',
    children: [
      {title: "金额（亿元）", field: "mature_amt", width: 140, align: 'right'},
      {title: "占比（%）", field: "mature_ratio", width: 100, align: 'right',},
    ]},
  { field: "b05", title: "提前终止",  align: 'left',
    children: [
      {title: "金额（亿元）", field: "cutoff_amt", width: 140, align: 'right'},
      {title: "占比（%）", field: "cutoff_ratio", width: 100, align: 'right',},
    ]},
  { field: "b06", title: "日终未到期", align: 'left',
    children: [
      {title: "金额（亿元）", field: "unmature_amt", width: 140, align: 'right'},
      {title: "占比（%）", field: "unmature_ratio", width: 100, align: 'right',},
    ]},
];
export {tableColumns18}
