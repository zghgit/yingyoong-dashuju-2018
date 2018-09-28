//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "证券代码",
    key: "sec_code",
    width: 150,
    align: 'left'
  },
  {
    title: "证券简称",
    key: "sec_name",
    width: 150,
    align: 'left',
  },
  {
    title: "异常期间",
    key: "start_end_date",
    width: 250,
    align: 'left',
  },
  {
    title: "期间涨跌幅（%）",
    key: "price_ratio_term",
    width: 100,
    align: 'right',
  },
  {
    title: "期间基准指数涨跌幅（%）",
    key: "index_price_ratio_term",
    width: 100,
    align: 'right',
  },
  {
    title: "累计成交量（万股）",
    key: "trade_vol",
    width: 150,
    align: 'right',
  },
  {
    title: "累计成交金额（亿元）",
    key: "trade_amt",
    width: 150,
    align: 'right',
  }
  ,
  {
    title: "融资买入金额（亿元）",
    key: "mb_trade_amt",
    width: 150,
    align: 'right',
  }
  ,
  {
    title: "卖券还款金额（亿元）",
    key: "ms_trade_amt",
    width: 150,
    align: 'right',
  }
  ,
  {
    title: "融券卖出金额（亿元）",
    key: "ss_trade_amt",
    width: 150,
    align: 'right',
  }
  ,
  {
    title: "买券还券金额（亿元）",
    key: "sb_trade_amt",
    width: 150,
    align: 'right',
  }
  ,
  {
    title: "信用交易金额占总成交金额比例（%）",
    key: "all_e_trade_rate",
    width: 100,
    align: 'right',
  }
];
export {tableColumns1}
