//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns_mtsl00010 = [
  // { field: "a_1", title: "明细数据超链接", width: 150, align: 'left'},
  { field: "acct_cnt", title: "累计账户数", width: 150, align: 'right'},
  { field: "acct_cnt_ad", title: "新增账户数", width: 150, align: 'right'},
  { field: "acct_cnt_ad_avg", title: "日均新增账户数", width: 150, align: 'right'},
  { field: "bebt_cnt", title: "有负债的投资者数", width: 150, align: 'right'},
  { field: "finance_bebt_cnt", title: "有融资负债的投资者数", width: 150, align: 'right'},
  { field: "loansec_bebt_cnt", title: "有融券负债的投资者数  ", width: 150, align: 'right'},
  { field: "high_coll_ratio_acct_cnt", title: "高风险帐户数", width: 150, align: 'right'},
  ];
// 日
let MTSL_00010_day = [
  { field: "stat_end_date", title: "时间", width: 150, align: 'left'},
  { field: "acct_cnt", title: "累计账户数", width: 150, align: 'left'},
  { field: "acct_cnt_ad", title: "新增账户数", width: 150, align: 'left'},
  // { field: "bebt_cnt", title: "日均新增账户数", width: 150, align: 'left'},
  { field: "bebt_cnt", title: "有负债的投资者数", width: 150, align: 'left'},
  { field: "finance_bebt_cnt", title: "有融资负债的投资者数", width: 250, align: 'left'},
  { field: "loansec_bebt_cnt", title: "有融券负债的投资者数", width: 250, align: 'left'},
  { field: "high_coll_ratio_acct_cnt", title: "高风险帐户数", width: 150, align: 'left'},
];
// 月
let MTSL_00010_month = [
  { field: "stat_end_date", title: "时间", width: 150, align: 'left'},
  { field: "acct_cnt", title: "累计账户数", width: 150, align: 'left'},
  { field: "acct_cnt_ad", title: "新增账户数", width: 150, align: 'left'},
  { field: "acct_cnt_ad_avg", title: "日均新增账户数", width: 150, align: 'left'},
  { field: "bebt_cnt", title: "有负债的投资者数", width: 150, align: 'left'},
  { field: "finance_bebt_cnt", title: "有融资负债的投资者数", width: 150, align: 'left'},
  { field: "loansec_bebt_cnt", title: "有融券负债的投资者数", width: 150, align: 'left'},
  { field: "high_coll_ratio_acct_cnt", title: "高风险帐户数", width: 150, align: 'left'},
];
// 年
let MTSL_00010_year = [
  { field: "stat_end_date", title: "时间", width: 150, align: 'left'},
  { field: "acct_cnt", title: "累计账户数", width: 150, align: 'left'},
  { field: "acct_cnt_ad", title: "新增账户数", width: 150, align: 'left'},
  { field: "acct_cnt_ad_avg", title: "日均新增账户数", width: 150, align: 'left'},
  { field: "bebt_cnt", title: "有负债的投资者数", width: 150, align: 'left'},
  { field: "finance_bebt_cnt", title: "有融资负债的投资者数", width: 150, align: 'left'},
  { field: "loansec_bebt_cnt", title: "有融券负债的投资者数", width: 150, align: 'left'},
  { field: "high_coll_ratio_acct_cnt", title: "高风险帐户数", width: 150, align: 'left'},
];
export {tableColumns_mtsl00010,MTSL_00010_day,MTSL_00010_month,MTSL_00010_year}
