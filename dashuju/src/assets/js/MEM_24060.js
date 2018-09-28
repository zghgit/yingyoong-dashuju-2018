//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "交易日期",
    key: "trade_date",
    width: 100,
    align: 'center'
  },
  {
    title: "机构代码",
    key: "mem_code",
    width: 130,
    align: 'left',
  },
  {
    title: "机构序号",
    key: "ymb_seq",
    width: 100,
    align: 'right'
  },
  {
    title: "机构名称",
    key: "mem_full_name",
    width: 170,
    align: 'left',
  },
  {
    title: "交易单元",
    key: "pbu_code",
    width: 100,
    align: 'left'
  },
  {
    title: "本月交易类申报笔数",
    key: "trade_order_cnt",
    width: 120,
    align: 'right'
  },
  {
    title: "本月非交易类申报笔数",
    key: "nontrade_order_cnt",
    width: 120,
    align: 'right'
  },
  {
    title: "该年累计交易类申报笔数",
    key: "trade_order_cnt_sum",
    width: 120,
    align: 'right'
  },
  {
    title: "该年累计非交易类申报笔数",
    key: "nontrade_order_cnt_sum",
    width: 120,
    align: 'right'
  }
];
export {tableColumns1}
