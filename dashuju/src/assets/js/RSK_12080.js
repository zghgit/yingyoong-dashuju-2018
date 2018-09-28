//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "序号",
    key: "order",
    width: 80,
    align: 'left',
    static: false
  },
  {
    title: "股票代码",
    key: "sec_code",
    width: 130,
    align: 'left',
    static: false
  },
  {
    title: "股票简称",
    key: "company_name",
    width: 150,
    align: 'left',
    static: false
  },
  {
    title: "起算时点（含本日）",
    key: "calc_start_date",
    width: 100,
    align: 'left',
    static: false
  },
  {
    title: "截止时点（含本日）",
    key: "trade_date",
    width: 100,
    align: 'left',
    static: false
  },
  {
    title: "连续天数",
    key: "calc_cnt",
    width: 100,
    align: 'left',
    static: false
  },
  {
    title: "触及规则",
    key: "rule_code",
    width: 100,
    align: 'left',
    static: false
  },

];
export {tableColumns1}
