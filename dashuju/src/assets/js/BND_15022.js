//引入排序方法
import {sortMethods} from './sort.js';
let tableColumns22_1 = [
  {field: "mem_abbr", title: "会员", width: 130, align: 'left'},
  {field: "approved_amt", title: "批准额度", width: 150, align: 'right'},
  {field: "standard_sum", title: "标准券总额", width: 150, align: 'right'},
  {field: "usable_amt", title: "可用额度", width: 130, align: 'right'},
  {field: "usable_amt_duty", title: "可用额度占比（%）", width: 150, align: 'right'},
  {field: "warning_level", title: "预警级别", width: 130, align: 'left'},
  {field: "financing_investment_desc", title: "融入资金投资情况", width: 130, align: 'left'},
];
let tableColumns22_2 = [
  {field: "mem_abbr", title: "会员", width: 130, align: 'left'},
  {field: "new_open_mem", title: "当日新开户投资者人数", width: 130, align: 'right'},
  {field: "day_close_mem", title: "当日销户投资者人数", width: 130, align: 'right'},
  {field: "mem_act", title: "投资者人数", width: 130, align: 'right'},
  {field: "deal_mem", title: "参与交易的投资者人数", width: 130, align: 'right'},
  {field: "day_deal_mem", title: "当日交易的投资者人数  ", width: 130, align: 'right'}
];

let tableColumns22_3 = [

  {field: "sec_term", title: "品种", width: 130, align: 'left'},
  {
    field: "", title: "新开",
    children: [
      {title: "金额", field: "new_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "new_amt_pro", width: 130, align: 'right',},
    ]
  },
  {
    field: "", title: "到期",
    children: [
      {title: "金额", field: "due_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "due_amt_pro", width: 130, align: 'right',},
    ]
  },
  {
    field: "", title: "提前终止",
    children: [
      {title: "金额", field: "pre_end_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "pre_end_amt_pro", width: 130, align: 'right',},
    ]
  },
  {
    field: "", title: "日终未到期",
    children: [
      {title: "金额", field: "not_due_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "not_due_amt_pro", width: 130, align: 'right',},
    ]
  },
];
export {tableColumns22_1, tableColumns22_2, tableColumns22_3}
