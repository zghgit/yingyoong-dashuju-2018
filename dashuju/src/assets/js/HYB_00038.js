//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "约定购回",
    field: "childs",
    static: true,
    children: [
      {
        title: "当期无限售股质押率均值（%）",
        field: "avg_zhiyalv_1_unlimited",
        align: 'right',
        width: 100,
      },
      {
        title: "平均质押率（%）",
        field: "avg_zhiyalv_1",
        align: 'right',
        width: 100,
      }
    ]
  },
  {
    title: "股票质押",
    field: "childs",
    static: true,
    children: [
      {
        title: "当期无限售股质押率均值（%）",
        field: "pt_avg_zhiyalv",
        align: 'right',
        width: 100,
      },
      {
        title: "当期限售股质押率均值（%）",
        field: "xl_avg_zhiyalv",
        align: 'right',
        width: 100,
      },
      {
        title: "平均质押率（%）",
        field: "avg_zhiyalv_2",
        align: 'right',
        width: 100,
      }
    ]
  }
];
export {tableColumns1}
