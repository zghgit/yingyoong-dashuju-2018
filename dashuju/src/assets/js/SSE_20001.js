//引入排序方法
import {sortMethods} from './sort.js';
// 沪市数据与深市数据
let tableColumns1 = [
  {title: "明细数据超链接", key: "", width: 150, align: 'left', hasAnchor:true},
  {title: "证券类型", key: "sec_type_name", width: 200, align: 'left',},
  {title: "证券数", key: "lst_vol_cnt", width: 150, align: 'right'},
  {title: "流通市值(亿元)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "总市值(亿元)", key: "tot_mkt_cap", width: 150, align: 'right',},
  {title: "流通股本(亿元)", key: "nego_vol", width: 150, align: 'right',},
  {title: "总股本(亿元)", key: "iss_vol", width: 150, align: 'right'},
  {title: "成交金额(亿元)", key: "cur_trade_amt", width: 150, align: 'right',},
  {title: "日均成交额(亿元)",  key: "cur_trade_amt_rate", width: 200, align: 'right',},
  {title: "成交数量(亿)", key: "cur_trade_vol", width: 150, align: 'right'},
  {title: "日均成交量(亿)",  key: "cur_trade_vol_rate", width: 150, align: 'right'},
  {title: "换手率(%)", key: "cur_turnover_rate", width: 150, align: 'right'},
  {title: "日均换手率(%)",  key: "cur_avg_turnover_rate", width: 100, align: 'right'},
  {title: "静态市盈率", key: "price_earning_ratio", width: 100, align: 'right'},
];
// 不含日均
let tableColumns2 = [
  {title: "明细数据超链接", key: "", width: 150, align: 'left', hasAnchor:true},
  {title: "证券类型", key: "sec_type_name", width: 200, align: 'left',},
  {title: "证券数", key: "lst_vol_cnt", width: 150, align: 'right'},
  {title: "流通市值(亿元)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "总市值(亿元)", key: "tot_mkt_cap", width: 150, align: 'right',},
  {title: "流通股本(亿元)", key: "nego_vol", width: 150, align: 'right',},
  {title: "总股本(亿元)", key: "iss_vol", width: 150, align: 'right'},
  {title: "成交金额(亿元)", key: "cur_trade_amt", width: 150, align: 'right',},
  {title: "成交数量(亿)", key: "cur_trade_vol", width: 150, align: 'right'},
  {title: "换手率(%)", key: "cur_turnover_rate", width: 100, align: 'right'},
  {title: "静态市盈率", key: "price_earning_ratio", width: 100, align: 'right'},
];

// 日
let dayTableColumnsSource = [
  {title: "证券类型", key: "sec_type_name", width: 200, align: 'left'},
  {title: "日期", key: "trade_date", width: 200, align: 'center'},
  {title: "证券数", key: "lst_vol_cnt", width: 150, align: 'right'},
  {title: "流通市值(亿元)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "总市值(亿元)",  key: "tot_mkt_cap", width: 150, align: 'right'},
  {title: "流通股本(亿元)", key: "nego_vol", width: 150, align: 'right'},
  {title: "总股本(亿元)", key: "iss_vol", width: 150, align: 'right'},
  {title: "成交金额(亿元)", isDeal:true, key: "cur_trade_amt", width: 150, align: 'right'},
  {title: "成交数量(亿)", isDeal:true, key: "cur_trade_vol", width: 150, align: 'right'},
  {title: "换手率(%)",  key: "nego_to_rate", width: 100, align: 'right'},
]
// “月”或“年”
let monthTableColumns = [
  {title: "证券类型", key: "sec_type_name", width: 200, align: 'left'},
  {title: "时间", key: "trade_month", width: 200, align: 'center'},
  {title: "证券数", key: "lst_vol_cnt", width: 150, align: 'right'},
  {title: "流通市值(亿元)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "总市值(亿元)", key: "tot_mkt_cap", width: 150, align: 'right'},
  {title: "流通股本(亿元)", key: "nego_vol", width: 150, align: 'right'},
  {title: "总股本(亿元)", key: "iss_vol", width: 150, align: 'right'},
  {title: "成交金额(亿元)", isDeal:true, key: "cur_trade_amt", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", isDeal:true, key: "cur_avg_amt_vol", width: 200, align: 'right'},
  {title: "成交数量(亿)", isDeal:true, key: "cur_trade_vol", width: 150, align: 'right'},
  {title: "日均成交量(亿)", isDeal:true, key: "cur_avg_trade_vol", width: 150, align: 'right'},
  {title: "换手率(%)", key: "nego_to_rate", width: 150, align: 'right'},
  {title: "日均换手率(%)", key: "nego_avg_to_rate", width: 100, align: 'right'},
  {title: "静态市盈率", key: "ratio_of_pe", width: 100, align: 'right'},
]
  //  A股
  let aTableColumns = [
  {title: "证券代码", notFormat:true, key: "sec_code", width: 150, align: 'left'},
  {title: "证券名称", key: "sec_abbr", width: 250, align: 'left'},
  {title: "收盘价", key: "cur_close_price", width: 150, align: 'right'},
  {title: "涨跌幅%", key: "rf_range", width: 100, align: 'right'},
  {title: "成交金额(亿元)", isDeal:true, key: "cur_trade_amt_cnt", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", isDeal:true, key: "cur_avg_amt_vol", width: 200, align: 'right'},
  {title: "成交数量(亿)", isDeal:true, key: "cur_trade_vol_cnt", width: 150, align: 'right'},
  {title: "日均成交量(亿)", isDeal:true, key: "cur_avg_trade_vol", width: 150, align: 'right'},
  {title: "换手率%", key: "nego_to_rate", width: 100, align: 'right'},
  {title: "日均换手率%", isDeal:true, key: "nego_avg_to_rate", width: 100, align: 'right'},
  {title: "流通市值(亿元)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "总市值(亿元)", key: "tot_mkt_cap", width: 150, align: 'right'},
  {title: "流通股本(亿)", key: "nego_vol", width: 150, align: 'right'},
  {title: "总股本(亿)", key: "iss_vol", width: 150, align: 'right'},
  {title: "静态市盈率", key: "pe_ratio_per_share", width: 100, align: 'right'},
]
// B股
let bTableColumns = [
  {title: "证券代码", notFormat:true, key: "sec_code", width: 150, align: 'left'},
  {title: "证券名称", key: "sec_abbr", width: 250, align: 'left'},
  {title: "收盘价（美元）", key: "cur_close_price", width: 150, align: 'right'},
  {title: "涨跌幅%", key: "rf_range", width: 100, align: 'right'},
  {title: "成交金额(亿元)", isDeal:true, key: "cur_trade_amt_cnt", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", isDeal:true, key: "cur_avg_amt_vol", width: 200, align: 'right'},
  {title: "成交数量(亿)", isDeal:true, key: "cur_trade_vol_cnt", width: 150, align: 'right'},
  {title: "日均成交量(亿)", isDeal:true, key: "cur_avg_trade_vol", width: 150, align: 'right'},
  {title: "换手率%", key: "nego_to_rate", width: 100, align: 'right'},
  {title: "日均换手率%", isDeal:true, key: "nego_avg_to_rate", width: 150, align: 'right'},
  {title: "流通市值(亿元)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "总市值(亿元)", key: "tot_mkt_cap", width: 150, align: 'right'},
  {title: "流通股本(亿)", key: "nego_vol", width: 150, align: 'right'},
  {title: "总股本(亿)", key: "iss_vol", width: 150, align: 'right'},
  {title: "静态市盈率", key: "pe_ratio_per_share", width: 100, align: 'right'},
]
// 基金
let jjTableColumns = [
  {title: "证券代码",notFormat:true, key: "sec_code", width: 150, align: 'left'},
  {title: "证券名称", key: "sec_abbr", width: 250, align: 'left'},
  {title: "收盘价", key: "cur_close_price", width: 150, align: 'right'},
  {title: "涨跌幅%", key: "rf_range", width: 100, align: 'right'},
  {title: "成交金额(亿元)", isDeal:true, key: "cur_trade_amt_cnt", width: 150, align: 'right'},
  {title: "日均成交额(亿元)", isDeal:true, key: "cur_avg_amt_vol", width: 200, align: 'right'},
  {title: "成交数量(亿)", isDeal:true, key: "cur_trade_vol_cnt", width: 150, align: 'right'},
  {title: "日均成交量(亿)", isDeal:true, key: "cur_avg_trade_vol", width: 150, align: 'right'},
  {title: "基金份额(亿份)", key: "nego_mkt_cap", width: 150, align: 'right'},
  {title: "基金市值(亿份)", key: "nego_vol", width: 150, align: 'right'},
]

export {tableColumns1,tableColumns2,dayTableColumnsSource,monthTableColumns, aTableColumns, bTableColumns, jjTableColumns}
