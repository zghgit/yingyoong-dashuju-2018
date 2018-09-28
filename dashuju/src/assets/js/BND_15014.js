//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员",
    field: "mem_name",
    width: 150,
    align: 'left'
  },
  {
    title: "批准额度（亿元）",
    field: "approved_quota",
    width: 150,
    align: 'right',
  },
  {
    title: "标准券总额（亿元）",
    field: "approved_sum",
    width: 150,
    align: 'right',
  },
  {
    title: "可用额度（亿元）",
    field: "available_quota",
    width: 150,
    align: 'right',
  },
  {
    title: "可用额度占比",
    field: "availbalancerate",
    width: 150,
    align: 'right',
  },
  {
    title: "预警级别",
    field: "warning_level",
    width: 150,
    align: 'right',
  },
];
export {tableColumns1}
