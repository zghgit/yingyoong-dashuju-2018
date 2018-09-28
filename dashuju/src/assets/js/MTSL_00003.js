let tableColumns_MTSL03 = [
  { field: "sec_type", title: "标的券类型", minWidth: "150", align: "center"},
  { field: "", title: "融资", minWidth: "", align: "right",
    children: [
      {title: "融资买入金额", field: "margin_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融资买入日均", field: "margin_buy_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融资买入占比(%)", field: "margin_buy_amt_ratio", width: "150", align: "right", type: "propor"},
      {title: "卖券还款金额", field: "margin_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "卖券还款日均", field: "margin_sell_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融资强平金额", field: "forced_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融资强平日均", field: "forced_sell_amt_avg", width: "150", align: "right", type: "average"},
    ]
  },
  { field: "", title: "融券", minWidth: "300", align: "right",
    children: [
      {title: "融券卖出金额", field: "short_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融券卖出日均", field: "short_sell_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融券卖出占比(%)", field: "short_sell_amt_ratio", width: "150", align: "right", type: "propor"},
      {title: "买券还券金额", field: "short_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "买券还券日均", field: "short_buy_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融券强平金额", field: "forced_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融券强平日均", field: "forced_buy_amt_avg", width: "150", align: "right", type: "average"},
    ]
  },
  { field: "pre_end_amt", title: "担保品", minWidth: "", align: "right",
    children: [
      {title: "买入金额", field: "credit_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "买入日均", field: "credit_buy_amt_avg", width: "150", align: "right", type: "average"},
      {title: "卖出金额", field: "credit_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "卖出日均", field: "credit_sell_amt_avg", width: "150", align: "right", type: "average"},
      {title: "交易金额", field: "credit_amt_all", width: "150", align: "right", type: "amount"},
      {title: "交易日均", field: "credit_amt_avg", width: "150", align: "right", type: "average"},
    ]
  }
];
let tableColumns_MTSL03_href = [
  {name: "日", value: "day", title: "日明细表", businessId: "mtsl00003yearmonthday", flagDayMonYear: "D", url: "/dw/mtsl/mtsl00003yearmonthday"},
  {name: "月", value: "mounth", title: "月明细表", businessId: "mtsl00003yearmonthday", flagDayMonYear: "M", url: "/dw/mtsl/mtsl00003yearmonthday"},
  {name: "年", value: "year", title: "年明细表", businessId: "mtsl00003yearmonthday", flagDayMonYear: "Y", url: "/dw/mtsl/mtsl00003yearmonthday"},
  {name: "个券", value: "vouchers", title: "个券明细表", businessId: "mtsl00003voucher", flagDayMonYear: "", url: "/dw/mtsl/mtsl00003voucher"},
  {name: "会员", value: "vip", title: "会员明细表", businessId: "mtsl00003membership", flagDayMonYear: "", url: "/dw/mtsl/mtsl00003membership"},
];
let tableColumns_MTSL03_details = [
  { field: "sec_code", title: "证券代码", minWidth: "120", align: "left", isShow: "code"},
  { field: "sec_name", title: "证券简称", minWidth: "150", align: "left", isShow: "abbr"},
  { field: "sec_type", title: "证券类型", minWidth: "120", align: "left", isShow: "type"},
  { field: "mem_abbr", title: "会员名称", minWidth: "150", align: "left", isShow: "vipname"},
  { field: "stat_date", title: "日期", minWidth: "150", align: "center", isShow: "date"},
  { field: "", title: "融资", minWidth: "", align: "right", isShow: "show",
    children: [
      {title: "融资买入金额", field: "margin_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融资买入日均", field: "margin_buy_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融资买入占比(%)", field: "margin_buy_amt_ratio", width: "150", align: "right", type: "propor"},
      {title: "卖券还款金额", field: "margin_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "卖券还款日均", field: "margin_sell_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融资强平金额", field: "forced_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融资强平日均", field: "forced_sell_amt_avg", width: "150", align: "right", type: "average"},
    ]
  },
  { field: "", title: "融券", minWidth: "", align: "right", isShow: "show",
    children: [
      {title: "融券卖出金额", field: "short_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融券卖出日均", field: "short_sell_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融券卖出占比(%)", field: "short_sell_amt_ratio", width: "150", align: "right", type: "propor"},
      {title: "买券还券金额", field: "short_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "买券还券日均", field: "short_buy_amt_avg", width: "150", align: "right", type: "average"},
      {title: "融券强平金额", field: "forced_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "融券强平日均", field: "forced_buy_amt_avg", width: "150", align: "right", type: "average"},
    ]
  },
  { field: "pre_end_amt", title: "担保品", minWidth: "", align: "right", isShow: "show",
    children: [
      {title: "买入金额", field: "credit_buy_amt_all", width: "150", align: "right", type: "amount"},
      {title: "买入日均", field: "credit_buy_amt_avg", width: "150", align: "right", type: "average"},
      {title: "卖出金额", field: "credit_sell_amt_all", width: "150", align: "right", type: "amount"},
      {title: "卖出日均", field: "credit_sell_amt_avg", width: "150", align: "right", type: "average"},
      {title: "交易金额", field: "credit_amt_all", width: "150", align: "right", type: "amount"},
      {title: "交易日均", field: "credit_amt_avg", width: "150", align: "right", type: "average"},
    ]
  }
]
export {tableColumns_MTSL03, tableColumns_MTSL03_href, tableColumns_MTSL03_details}
