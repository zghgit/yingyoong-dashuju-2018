//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "统计指标",
    field: "statisticalindex",
    width: 100,
    align: 'left',
    static: false
  },
  {
    title: "XXX月",
    field: "all",
    static: true,
    children: [
      {
        title: "只数",
        field: "curmonthamt",
        align: 'right',
        width: 100,
      },
      {
        title: "金额（亿元）",
        field: "curmonthsum",
        align: 'right',
        width: 100,
      }
    ]
  },
  {
    title: "上月数",
    field: "qq",
    static: true,
    children: [
      {
        title: "只数",
        field: "premonthamt",
        align: 'right',
        width: 100,
      },
      {
        title: "金额（亿元）",
        field: "premonthsum",
        align: 'right',
        width: 100,
      }
    ]
  }
];
let tableColumns2 = [
  {
    title: "统计指标",
    field: "statisticalindex",
    width: 100,
    align: 'left',
    static: false
  },
  {
    title: "XX年01月--XX月",
    field: "all",
    static: true,
    children: [
      {
        title: "只数",
        field: "curyearamt",
        align: 'right',
        width: 100,
      },
      {
        title: "金额（亿元）",
        field: "curyearsum",
        align: 'right',
        width: 100,
      }
    ]
  },
  {
    title: "去年同期数",
    field: "qq",
    static: true,
    children: [
      {
        title: "只数",
        field: "preyearamt",
        align: 'right',
        width: 100,
      },
      {
        title: "金额（亿元）",
        field: "preyearsum",
        align: 'right',
        width: 100,
      }
    ]
  }
];
export {tableColumns1,tableColumns2}
