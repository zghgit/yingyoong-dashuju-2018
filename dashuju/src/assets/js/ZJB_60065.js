//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "投资人姓名",
    key: "acct_name",
    width: 150,
    align: 'left'
  },
  {
    title: "投资人股东账户",
    key: "acct_id",
    width: 150,
    align: 'left',
  },
  {
    title: "投资人账户分类",
    key: "acct_type",
    width: 150,
    align: 'left',
  },
  {
    title: "债券简称",
    key: "sec_name",
    width: 300,
    align: 'left',
  },
  {
    title: "债券代码",
    key: "sec_code",
    width: 150,
    align: 'left',
  },
  {
    title: "上年末债券持有面值（万元）",
    key: "par_amt_last_year",
    width: 150,
    align: 'right',
  },
  {
    title: "上月末债券持有面值（万元）",
    key: "par_amt_last_month",
    width: 150,
    align: 'right',
  },
  {
    title: "当前债券持有面值（万元）",
    key: "par_amt_now",
    width: 150,
    align: 'right',
  },
];
let tableColumns2 = [
  {
    title: "债券代码",
    key: "sec_code",
    width: 150,
    align: 'left'
  },
  {
    title: "债券简称",
    key: "sec_name",
    width: 300,
    align: 'left',
  },
  {
    title: "债券余额(万元)",
    key: "total_hold_par_amt_2",
    width: 150,
    align: 'right',
  },
  {
    title: "持债账户总数",
    key: "sum_acct_id",
    width: 150,
    align: 'right',
  },
  {
    title: "个人持债账户数",
    key: "p_hold_id",
    width: 150,
    align: 'right',
  },
  {
    title: "个人持债面值(万元)",
    key: "p_hold_amt",
    width: 150,
    align: 'right',
  },
  {
    title: "个人持债面值占比",
    key: "par_amt",
    width: 150,
    align: 'right',
  },
];
export {tableColumns1,tableColumns2}
