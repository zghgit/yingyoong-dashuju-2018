//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "约定购回",
    field: "childs",
    static: true,
    children: [
      {
        title: "期间最高利率（%）",
        field: "max_interest_ratio",
        align: 'right',
        width: 100,
      },
      {
        title: "期间最低利率（%）",
        field: "min_interest_ratio",
        align: 'right',
        width: 100,
      },
      {
        title: "加权平均利率（%）",
        field: "avg_repur_ratio_1",
        align: 'right',
        width: 100,
      },
    ]
  },
  {
    title: "股票质押",
    field: "childs",
    static: true,
    children: [
      {
        title: "期间最高利率（%）",
        field: "max_repur_ratio",
        align: 'right',
        width: 100,
      },
      {
        title: "期间最低利率（%）",
        field: "min_repur_ratio",
        align: 'right',
        width: 100,
      },
      {
        title: "加权平均利率（%）",
        field: "avg_repur_ratio_2",
        align: 'right',
        width: 100,
      },

    ]
  }
];
export {tableColumns1}
