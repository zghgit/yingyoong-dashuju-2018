//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "交易日期",
    key: "trade_date",
    width: 200,
    align: 'center'
  },
  {
    title: "累计账户数（个）",
    key: "e_acct_cnt",
    width: 150,
    align: 'right',
  },
  {
    title: "个人账户总数（个）",
    key: "e_acct_cnt_a",
    width: 150,
    align: 'right',
  },
  {
    title: "个人投资者期末账户占比（%）",
    key: "e_acct_cnt_a_ratio",
    width: 100,
    align: 'right',
  },
  {
    title: "新增账户总数（个）",
    key: "new_e_acct_cnt",
    width: 150,
    align: 'right',
  },
  {
    title: "新增个人账户数（个）",
    key: "new_e_acct_cnt_a",
    width: 150,
    align: 'right',
  },
  {
    title: "个人投资者新增账户占比（%）",
    key: "new_e_acct_cnt_a_ratio",
    width: 100,
    align: 'right',
  }
  ,
  {
    title: "存在交易的账户总数（个）",
    key: "e_acct_cnt_trade",
    width: 150,
    align: 'right',
  }
  ,
  {
    title: "有效信用账户占比（%）",
    key: "e_acct_cnt_t_ratio",
    width: 100,
    align: 'right',
  }
];
export {tableColumns1}
