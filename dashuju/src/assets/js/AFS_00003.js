//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns_AFS03 = [
  { field: "date", title: "日期", width: 230, align: 'center'},
  { field: "plate_name", title: "板块名称", width: 500, align: 'left'},
  { field: "stock_amt", title: "股票数量", width: 150, align: 'right'},
  { field: "fund_input", title: "主动买入", width: 150, align: 'right'},
  { field: "funt_output", title: "主动卖出", width: 150, align: 'right'},
  { field: "fund_net_input", title: "主动净买", width: 150, align: 'right'},
  { field: "market_value", title: "市场成交金额", width: 150, align: 'right'},
];
export {tableColumns_AFS03}
