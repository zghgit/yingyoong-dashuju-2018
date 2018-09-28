//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    field: "mem_full_name",
    width: 120,
    align: 'left'
  },
  {
    title: "盯市日期",
    field: "trade_date",
    width: 100,
    align: 'center',
  },
  {
    title: "交易系统信息",
    field: "all1",
    children: [
      {
        title: "初始交易成交编号",
        field: "jy_init_trade_no",
        width: 100,
        align: 'left'
      },
      {
        title: "初始交易日期",
        field: "jy_init_trade_date",
        width: 100,
        align: 'center',
      },
      {
        title: "证券代码",
        field: "jy_sec_code",
        width: 100,
        align: 'left'
      }
    ]
  },
  {
    title: "会员上报信息",
    field: "all2",
    children: [
      {
        title: "初始交易成交编号",
        field: "hy_init_trade_no",
        width: 100,
        align: 'left'
      },
      {
        title: "初始交易日期",
        field: "hy_init_trade_date",
        width: 100,
        align: 'center'
      },
      {
        title: "证券代码",
        field: "hy_sec_code",
        width: 100,
        align: 'left'
      }
    ]
  }
];
export {tableColumns1}
