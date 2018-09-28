//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns23_1 = [   // 0
  { field: "sec_term", title: "品种", width: 100,align: 'left'},
  { field: "", title: "新开",
    children: [
      {title: "金额", field: "new_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "new_amt_pro", width: 100, align: 'right',},
    ]},
  { field: "", title: "到期",
    children: [
      {title: "金额", field: "due_amt", width: 100, align: 'right'},
      {title: "占比（%）", field: "due_amt_pro", width: 100, align: 'right',},
    ]},
  { field: "", title: "提前终止",
    children: [
      {title: "金额", field: "pre_end_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "pre_end_amt_pro", width: 100, align: 'right',},
    ]},
  { field: "", title: "期末日终未到期",
    children: [
      {title: "金额", field: "not_due_amt", width: 150, align: 'right'},
      {title: "占比（%）", field: "not_due_amt_pro", width: 100, align: 'right',},
    ]},
];
let tableColumns23_2 = [


  { field: "mem", title: "会员", width: 100,align: 'left'},
  { field: "approver_limit", title: "批准额度", width: 150,align: 'right'},
  { field: "standard_amt", title: "标准券总额", width: 150,align: 'right'},
  { field: "usable_limit", title: "可用额度", width: 150,align: 'right'},
  { field: "usable_limit_pro", title: "可用额度占比（%）", width: 120,align: 'right'},
  { field: "max_usable_range", title: "区间已用额度最大值  ", width: 100,align: 'right'},
  { field: "max_usable_range_pro", title: "占比（%）", width: 100,align: 'right'},
  { field: "financing_investment_desc", title: "融入资金投资情况  ", width: 100,align: 'left'}
];

let tableColumns23_3 = [
  { field: "mem_abbr", title: "会员", width: 100,align: 'left'},
  { field: "new_open_mem", title: "新开户投资者人数", width: 100,align: 'right'},
  { field: "day_close_mem", title: "销户投资者人数", width: 100,align: 'right'},
  { field: "mem_act", title: "累计投资者人数", width: 100,align: 'right'},
  { field: "deal_mem", title: "累计参与交易的投资者人数", width: 100,align: 'right'},
  { field: "day_deal_mem", title: "交易的投资者人数", width: 100,align: 'right'},
];
export {tableColumns23_1, tableColumns23_2, tableColumns23_3}

