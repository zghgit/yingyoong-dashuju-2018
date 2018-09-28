//引入排序方法
import {sortMethods} from './sort.js';

// finance_bal_amt  融资余额(亿元)
// loansec_bal_amt 融券余额(亿元)
// loansec_bal_vol  融券余量(亿元)
// all_bal_amt   两融余额（亿元）

// □展现占比指标    □展现日均指标
let tableColumns_mtsl00005 = [
  { field: "sec_type_lev_desc", title: "证券品种",width: 180, align: 'center',aIndex:1},  //0
  { field: "finance_bal_amt", title: "融资余额(亿元)",width: 180, align: 'right',aIndex:2},//1
  { field: "avg_finance_bal_amt", title: "融资余额(亿元)日均",width: 180, align: 'right',aIndex:3, flag:2},
  { field: "finance_bal_amt_rate", title: "融资余额占流通市值比例（%）",width: 180, align: 'right',aIndex:4, flag:1},
  { field: "loansec_bal_amt", title: "融券余额(亿元)",width: 180, align: 'right',aIndex:5},//4
  { field: "avg_loansec_bal_amt", title: "融券余额(亿元)日均",width: 180, align: 'right',aIndex:6, flag:2},
  { field: "loansec_bal_amt_rate", title: "融券余额占流通市值比例（%）",width: 180, align: 'right',aIndex:7, flag:1},
  { field: "loansec_bal_vol", title: "融券余量(亿)",width: 180, align: 'right',aIndex:8},//7
  { field: "avg_loansec_bal_vol", title: "融券余量(亿)日均",width: 180, align: 'right',aIndex:9, flag:2},
  { field: "loansec_bal_vol_rate", title: "融券余量占流通股数比例（%）",width: 180, align: 'right',aIndex:10, flag:1},
  { field: "all_bal_amt", title: "两融余额（亿元)",width: 180, align: 'right',aIndex:11},//10
  { field: "avg_all_bal_amt", title: "两融余额（亿元)日均",width: 180, align: 'right',aIndex:12, flag:2},
  { field: "all_bal_amt_rate", title: "两融余额占流通市值比例（%）",width: 180, align: 'right',aIndex:13, flag:1},
];

// 日  □展现占比指标    □展现环比指标
let MTSL_l00005_day = [
  { field: "sec_type_lev_desc", title: "证券品种",width: 180, align: 'left',aIndex:1},
  { field: "trade_date", title: "日期（日 月 年）",width: 300, align: 'center',aIndex:2},
  { field: "finance_bal_amt", title: "融资余额(亿元)",width: 180, align: 'right',aIndex:3,},
  { field: "finance_bal_amt_rate", title: "融资余额占流通市值比例（%）",width: 180, align: 'right',aIndex:4, flag:1},
  { field: "finance_bal_amt_amt1", title: "融资余额环比增速（%）",width: 180, align: 'right',aIndex:5, flag:2},
  { field: "loansec_bal_amt", title: "融券余额(亿元)",width: 180, align: 'right',aIndex:6},
  { field: "loansec_bal_amt_rate", title: "融券余额占流通市值比例（%）",width: 180, align: 'right',aIndex:7, flag:1},
  { field: "loansec_bal_amt_amt1", title: "融券余额环比增速（%）",width: 180, align: 'right',aIndex:8, flag:2},
  { field: "loansec_bal_vol", title: "融券余量(亿)",width: 180, align: 'right',aIndex:9},
  { field: "loansec_bal_vol_rate", title: "融券余量占流通股数比例（%）",width: 180, align: 'right',aIndex:10, flag:1},
  { field: "loansec_bal_vol_vol1", title: "融券余量环比增速（%）",width: 180, align: 'right',aIndex:11, flag:2},
  { field: "all_bal_amt", title: "两融余额（亿元）",width: 180, align: 'right',aIndex:12},
  { field: "all_bal_amt_rate", title: "两融余额占流通股数比例（%）",width: 180, align: 'right',aIndex:13, flag:1},
  { field: "all_bal_amt_amt1", title: "两融余额环比增速（%）",width: 180, align: 'right',aIndex:14, flag:2},

];

// 月 年  □展现占比指标   □展现日均指标   □展现环比指标
let MTSL_l00005_month = [
  { field: "sec_type_lev_desc", title:"证券品种",width: 300, align: 'left',aIndex:1},
  { field: "trade_date", title:"日期（日 月 年）",width: 300, align: 'center',aIndex:2,},
  { field: "finance_bal_amt", title:"融资余额(亿元)",width: 180, align: 'right',aIndex:3},
  { field: "avg_finance_bal_amt", title:"融资余额(亿元)日均",width: 180, align: 'right',aIndex:4, flag:2},
  { field: "finance_bal_amt_rate", title:"融资余额占流通市值比例（%）",width: 180, align: 'right',aIndex:5, flag:1},
  { field: "finance_bal_amt_amt1", title:"融资余额环比增速（%）",width: 180, align: 'right',aIndex:6, flag:3},
  { field: "loansec_bal_amt", title:"融券余额(亿元)",width: 180, align: 'right',aIndex:7},
  { field: "avg_loansec_bal_amt", title:"融券余额(亿元)日均",width: 180, align: 'right',aIndex:8, flag:2},
  { field: "loansec_bal_amt_rate", title:"融券余额占流通市值比例（%）",width: 180, align: 'right',aIndex:9, flag:1},
  { field: "loansec_bal_amt_amt1", title:"融券余额环比增速（%）",width: 180, align: 'right',aIndex:10, flag:3},
  { field: "loansec_bal_vol", title:"融券余量(亿)",width: 180, align: 'right',aIndex:11},
  { field: "avg_loansec_bal_vol", title:"融券余量(亿)日均",width: 180, align: 'right',aIndex:12, flag:2},
  { field: "loansec_bal_vol_rate", title:"融券余量占流通股数比例（%）",width: 180, align: 'right',aIndex:13, flag:1},
  { field: "loansec_bal_vol_vol1", title:"融券余量环比增速（%）",width: 180, align: 'right',aIndex:14, flag:3},
  { field: "all_bal_amt", title:"两融余额（亿元）",width: 180, align: 'right',aIndex:15},
  { field: "avg_all_bal_amt", title:"两融余额(亿元)日均",width: 180, align: 'right',aIndex:16, flag:2},
  { field: "all_bal_amt_rate", title:"两融余额占流通股数比例（%）",width: 180, align: 'right',aIndex:17, flag:1},
  { field: "all_bal_amt_amt1", title:"两融余额环比增速（%）",width: 180, align: 'right',aIndex:18, flag:3},
];

// 个券   □展现占比指标   □展现日均指标
let MTSL_l00005_coupon = [
  { field: "trade_date", title: "日期",width: 300, align: 'center',aIndex:1},
  { field: "sec_code", title: "证券代码",width: 180, align: 'left',aIndex:2},
  { field: "sec_name", title: "证券简称",width: 180, align: 'left',aIndex:3},
  { field: "finance_bal_amt", title: "融资余额(亿元)",width: 180, align: 'right',aIndex:4},
  { field: "avg_finance_bal_amt", title: "融资余额(亿元)日均",width: 180, align: 'right',aIndex:5, flag:2},
  { field: "finance_bal_amt_rate", title: "融资余额占流通市值比例（%）",width: 180, align: 'right',aIndex:6, flag:1},
  { field: "loansec_bal_amt", title: "融券余额(亿元)",width: 180, align: 'right',aIndex:7},
  { field: "avg_loansec_bal_amt", title: "融券余额(亿元)日均",width: 180, align: 'right',aIndex:8, flag:2},
  { field: "loansec_bal_amt_rate", title: "融券余额占流通市值比例（%）",width: 180, align: 'right',aIndex:9, flag:1},
  { field: "loansec_bal_vol", title: "融券余量(亿)",width: 180, align: 'right',aIndex:10},
  { field: "avg_loansec_bal_vol", title: "融券余量(亿)日均",width: 180, align: 'right',aIndex:11, flag:2},
  { field: "loansec_bal_vol_rate", title: "融券余量占流通股数比例（%）",width: 180, align: 'right',aIndex:12, flag:1},
  { field: "all_bal_amt", title: "两融余额（亿元）",width: 180, align: 'right',aIndex:13},
  { field: "avg_all_bal_amt", title: "两融余额（亿元）日均",width: 180, align: 'right',aIndex:14, flag:2},
  { field: "all_bal_amt_rate", title: "两融余额占流通市值比例（%）",width: 180, align: 'right',aIndex:15, flag:1},
];

// 会员     □展现市场占有率  □展现日均指标
let MTSL_l00005_member = [
  { field: "mem_abbr", title: "会员名称",width: 300, align: 'left',aIndex:1},
  { field: "sec_type_lev_desc", title: "证券品种",width: 180, align: 'left',aIndex:2},
  { field: "trade_date", title: "日期",width: 300, align: 'center',aIndex:3},
  { field: "finance_bal_amt", title: "融资余额(亿元)",width: 180, align: 'right',aIndex:4},
  { field: "avg_finance_bal_amt", title: "融资余额(亿元)日均",width: 180, align: 'right',aIndex:5, flag:2},
  { field: "finance_bal_amt_rate", title: "融资余额市场占有率（%）",width: 180, align: 'right',aIndex:6, flag:1},
  { field: "loansec_bal_amt", title: "融券余额(亿元)",width: 180, align: 'right',aIndex:7},
  { field: "avg_loansec_bal_amt", title: "融券余额(亿元)日均",width: 180, align: 'right',aIndex:8, flag:2},
  { field: "loansec_bal_amt_rate", title: "融券余额市场占有率（%）",width: 180, align: 'right',aIndex:9, flag:1},
  { field: "loansec_bal_vol", title: "融券余量(亿)",width: 180, align: 'right',aIndex:10},
  { field: "avg_loansec_bal_vol", title: "融券余量(亿)日均",width: 180, align: 'right',aIndex:11, flag:2},
  { field: "loansec_bal_vol_rate", title: "融券余量市场占有率（%）",width: 180, align: 'right',aIndex:12, flag:1},
  { field: "all_bal_amt", title: "两融余额（亿元）",width: 180, align: 'right',aIndex:13},
  { field: "avg_all_bal_amt", title: "两融余额（亿元）日均",width: 180, align: 'right',aIndex:14, flag:2},
  { field: "all_bal_amt_rate", title: "两融余额市场占有率（%）",width: 180, align: 'right',aIndex:15, flag:1},
];

export {tableColumns_mtsl00005,MTSL_l00005_day,MTSL_l00005_month,MTSL_l00005_coupon,MTSL_l00005_member}




