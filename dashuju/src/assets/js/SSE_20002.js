//引入排序方法
import {sortMethods} from './sort.js';

// 沪市数据查询
let   tableColumns22_1 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
  {title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
  {title: "收盘点位", field: "close_indx", width: 150, align: 'right', className:''},
  {title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right', className:''},
  {title: "振幅%", field: "swing", width: 100, align: 'right'},
  {title: "成交金额(亿元)", field: "trade_amt_s", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", field: "trade_amt_rj", width: 200, align: 'right'},
  {title: "换手率（%）", field: "nego_to_rate_s", width: 100, align: 'right'},
  {title: "日均换手率（%）", field: "nego_to_rate_rj", width: 100, align: 'right'},
  {title: "最高点位", field: "high_indx", width: 150, align: 'right'},
  {title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
  {title: "最高点位日期", field: "h_date", width: 150, align: 'center'},
  {title: "最低点位", field: "low_indx", width: 150, align: 'right'},
  {title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
  {title: "最低点位日期", field: "l_date", width: 150, align: 'center'},
  {title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
  {title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];
// 深市数据查询
let tableColumns22_2 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
  {title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
  {title: "收盘点位", field: "close_indx", width: 150, align: 'right'},
  {title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right'},
  {title: "振幅%", field: "swing", width: 100, align: 'right'},
  {title: "成交金额(亿元)", field: "trade_amt_s", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", field: "trade_amt_rj", width: 200, align: 'right'},
  {title: "换手率（%）", field: "nego_to_rate_s", width: 100, align: 'right'},
  {title: "日均换手率（%）", field: "nego_to_rate_rj", width: 100, align: 'right'},
  {title: "最高点位", field: "high_indx", width: 150, align: 'right'},
  {title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
  {title: "最高点位日期", field: "h_date", width: 150, align: 'center'},
  {title: "最低点位", field: "low_indx", width: 150, align: 'right'},
  {title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
  {title: "最低点位日期", field: "l_date", width: 150, align: 'center'},
  {title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
  {title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];

// 沪市数据查询  当日
let tableColumns22_11 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
  {title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
  {title: "收盘点位", field: "close_indx", width: 150, align: 'right'},
  {title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right'},
  {title: "振幅%", field: "swing", width: 100, align: 'right'},
  {title: "成交金额(亿元)", field: "trade_amt_s", width: 150, align: 'right'},
  {title: "换手率（%）", field: "nego_to_rate_s", width: 100, align: 'right'},
  {title: "最高点位", field: "high_indx", width: 150, align: 'right'},
  {title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
  {title: "最低点位", field: "low_indx", width: 150, align: 'right'},
  {title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
  {title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
  {title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];
// 深市数据查 询当日
let tableColumns22_22 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
{title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
{title: "收盘点位", field: "close_indx", width: 150, align: 'right'},
{title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right'},
{title: "振幅（%）", field: "swing", width: 100, align: 'right'},
{title: "成交金额(亿元)", field: "trade_amt_s", width: 150, align: 'right'},
{title: "换手率（%）", field: "nego_to_rate_s", width: 100, align: 'right'},
{title: "最高点位", field: "high_indx", width: 150, align: 'right'},
{title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
{title: "最低点位", field: "low_indx", width: 150, align: 'right'},
{title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
{title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
{title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];



// 沪市/深市 日数据  弹窗
let dayTableColumns1 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
  {title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
  {title: "日期", field: "trade_date", width: 150, align: 'center'},
  {title: "收盘点位", field: "close_indx", width: 150, align: 'right'},
  {title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right'},
  {title: "振幅（%）", field: "swing", width: 100, align: 'right'},
  {title: "成交金额(亿元)", field: "trade_amt", width: 150, align: 'right'},
  {title: "换手率（%）", field: "nego_to_rate", width: 100, align: 'right'},
  {title: "最高点位", field: "high_indx", width: 150, align: 'right'},
  {title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
  // {title: "最高点位日期", field: "h_date", width: 150, align: 'center'},
  {title: "最低点位", field: "low_indx", width: 150, align: 'right'},
  {title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
  {title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
  {title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];

// 沪市/深市 月数据  弹窗
let dayTableColumns2 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
  {title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
  {title: "日期", field: "trade_month_year", width: 200, align: 'center'},
  {title: "收盘点位", field: "close_indx", width: 150, align: 'right'},
  {title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right'},
  {title: "振幅（%）", field: "swing", width: 100, align: 'right'},
  {title: "成交金额(亿元)", field: "trade_amt_s", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", field: "trade_amt_rj", width: 200, align: 'right'},
  {title: "换手率（%）", field: "nego_to_rate_s", width: 100, align: 'right'},
  {title: "日均换手率（%）", field: "nego_to_rate_rj", width: 100, align: 'right'},
  {title: "最高点位", field: "high_indx", width: 150, align: 'right'},
  {title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
  {title: "最高点位日期", field: "h_date", width: 150, align: 'center'},
  {title: "最低点位", field: "low_indx", width: 150, align: 'right'},
  {title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
  {title: "最低点位日期", field: "l_date", width: 150, align: 'center'},
  {title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
  {title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];
// 沪市/深市 年数据  弹窗
let dayTableColumns3 = [
  {title: "指数代码",notFormat:true, field: "indx_code", width: 150, align: 'left'},
  {title: "指数名称", field: "indx_abbr", width: 200, align: 'left'},
  {title: "日期", field: "trade_month_year", width: 200, align: 'center'},
  {title: "收盘点位", field: "close_indx", width: 150, align: 'right'},
  {title: "涨跌幅（%）", field: "updown_breadth", width: 100, align: 'right'},
  {title: "振幅（%）", field: "swing", width: 100, align: 'right'},
  {title: "成交金额(亿元)", field: "trade_amt_s", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", field: "trade_amt_rj", width: 200, align: 'right'},
  {title: "换手率（%）", field: "nego_to_rate_s", width: 100, align: 'right'},
  {title: "日均换手率（%）", field: "nego_to_rate_rj", width: 100, align: 'right'},
  {title: "最高点位", field: "high_indx", width: 150, align: 'right'},
  {title: "最大涨幅（%）", field: "h_breadth", width: 100, align: 'right'},
  {title: "最高点位日期", field: "h_date", width: 150, align: 'center'},
  {title: "最低点位", field: "low_indx", width: 150, align: 'right'},
  {title: "最大跌幅（%）", field: "l_breadth", width: 100, align: 'right'},
  {title: "最低点位日期", field: "l_date", width: 150, align: 'center'},
  {title: "开盘点位", field: "open_indx", width: 150, align: 'right'},
  {title: "静态市盈率", field: "wgt_avg_pe_ratio", width: 100, align: 'right'},
];

let tablecolumms = [
  {title: "变更日期", field: "a1", width: 100, align: 'center'},
  {title: "原证券代码", field: "a2", width: 110, align: 'center'},
  {title: "新证券代码", field: "a3", width: 110, align: 'center'},
  {title: "变更说明", field: "a4", width: 310, align: 'left'},
];
export {tablecolumms, tableColumns22_1, tableColumns22_2,tableColumns22_11,tableColumns22_22, dayTableColumns1, dayTableColumns2,dayTableColumns3}






