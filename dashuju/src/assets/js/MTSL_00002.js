//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns_MTSL02_1 = [
  { field: "coll_amt", title: "担保品市值", minWidth: "200", align: "right"},
  { field: "", title: "融资融券余额", minWidth: "", align: "right",
    children: [
      {title: "合计", field: "total_mtsl_bal", width: "200", align: "right"},
      {title: "融资余额", field: "finance_bal_amt", width: "200", align: "right"},
      {title: "融券余额", field: "loansec_bal_amt", width: "200", align: "right",},
    ]},
  { field: "", title: "信用交易额", minWidth: "", align: "right",
    children: [
      {title: "合计", field: "total_pos_bal", width: "200", align: "right"},
      {title: "开仓金额", field: "open_pos_amt", width: "200", align: "right"},
      {title: "平仓金额", field: "close_pos_amt", width: "200", align: "right",},
    ]},
  { field: "acct_open_cnt_avg", title: "日均新增开户数(万户)", minWidth: "200", align: "right"},
  { field: "open_acct_cnt", title: "开户总数(万户)", minWidth: "200", align: "right"},
  { field: "ratio", title: "维持担保比例(%)", minWidth: "100", align: "right"},
];

let tableColumns_MTSL02_2 = [
  { field: "sec_type", title: "证券品种", minWidth: "200", align: "center"},
  { field: "", title: "融资", minWidth: "300", align: "right",
    children: [
      {title: "融资买入金额", field: "margin_buy_amt_all", width: "200", align: "right"},
      {title: "卖券还款金额", field: "margin_sell_amt_all", width: "200", align: "right",},
      {title: "融资平仓金额", field: "forced_sell_amt_all", width: "200", align: "right",},
      {title: "合计", field: "total_maigin", width: "200", align: "right",},
    ]
  },
  { field: "", title: "融券", minWidth: "400", align: "right",
    children: [
      {title: "融券卖出金额", field: "short_sell_amt_all", width: "200", align: "right"},
      {title: "买券还券金额", field: "short_buy_amt_all", width: "200", align: "right",},
      {title: "融券平仓金额", field: "forced_buy_amt_all", width: "200", align: "right",},
      {title: "合计", field: "total_short", width: 200, align: "right",},
    ]},
  { field: "total_credit", title: "信用交易合计", minWidth: "200",align: "right"},
];

let tableColumns_MTSL02_3 = [
  { field: "sec_type", title: "证券品种", minWidth: "200", align: "center"},
  { field: "finance_bal", title: "融资余额(亿元)", minWidth: "200", align: "right"},
  { field: "finance_bal_ratio", title: "融资余额占流通市值比例(%)", minWidth: "100", align: "right"},
  { field: "loansec_bal", title: "融券余额(亿元)", minWidth: "200", align: "right"},
  { field: "loansec_bal_ratio", title: "融券余额占流通市值比例(%)", minWidth: "100", align: "right"},
  { field: "loansec_vol", title: "融券余量(亿元)", minWidth: "200", align: "right"},
  { field: "loansec_vol_ratio", title: "融券余量占流通股数比例(%)", minWidth: "100", align: "right"},
  { field: "total_bal", title: "两融余额(亿元)", minWidth: "200", align: "right"},
  { field: "total_bal_ratio", title: "两融余额占流通市值比例(%)", minWidth: "100", align: "right"},
];

let tableColumns_MTSL02_4 = [
  { field: "type_desc_2", title: "融资", minWidth: "200", align: "center"},
  { field: "margin_buy_amt", title: "融资买入金额", minWidth: "200", align: "right"},
  { field: "margin_sell_amt", title: "卖券还款金额", minWidth: "200", align: "right"},
  { field: "forced_sell_amt", title: "融资平仓金额", minWidth: "200", align: "right"},
  { field: "total_margin", title: "合计", minWidth: "200", align: "center"},
  { field: "type_desc_2", title: "融券", minWidth: "200", align: "right"},
  { field: "short_sell_amt", title: "融券卖出金额", minWidth: "200", align: "right"},
  { field: "short_buy_amt", title: "买券还券金额", minWidth: "200", align: "right"},
  { field: "forced_buy_amt", title: "融券平仓金额", minWidth: "200", align: "right"},
  { field: "total_short", title: "合计", minWidth: "200", align: "right"},
];

let tableColumns_MTSL02_5 = [
  { field: "sec_type", title: "担保品类型", minWidth: "200", align: "center"},
  { field: "credit_buy_amt_all", title: "买入金额", minWidth: "200", align: "right"},
  { field: "credit_buy_ratio", title: "占担保品买入比重(%)", minWidth: "100", align: "right"},
  { field: "sec_buy_ratio", title: "占同品种成交比重(%)", minWidth: "100", align: "right"},
  { field: "credit_sell_amt_all", title: "卖出金额", minWidth: "200", align: "right"},
  { field: "credit_sell_ratio", title: "占担保品卖出比重(%)", minWidth: "100", align: "right"},
  { field: "sec_sell_ratio", title: "占同品种成交比重(%)", minWidth: "100", align: "right"},
  { field: "credit_amt_all", title: "交易金额", minWidth: "200", align: "right"},
  { field: "credit_amt_ratio", title: "占担保品比重(%)", minWidth: "100", align: "right"},
  { field: "sec_total_ration", title: "占同品种成交比重(%)", minWidth: "100", align: "right"},
];

let tableColumns_MTSL02_6 = [
  { field: "acct_cnt", title: "未了结违约账户数", minWidth: "200", align: "right"},
  { field: "breach_cnt", title: "未了结违约笔数", minWidth: "200", align: "right"},
  { field: "breach_amt", title: "未了结违约金额", minWidth: "200", align: "right"},
];

export {tableColumns_MTSL02_1, tableColumns_MTSL02_2, tableColumns_MTSL02_3, tableColumns_MTSL02_4, tableColumns_MTSL02_5, tableColumns_MTSL02_6}

