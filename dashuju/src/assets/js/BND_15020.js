//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "类型/品种",
    field: "variety",
    width: 150,
    align: 'left',
    static: false,
    hasChildren:true,
  },
  {
    title: "报价 ",
    field: "childs",
    static: true,
    children: [
      {
        title: "最高",
        field: "",
        align: 'right',
        width: 150,
        children: [
          {
            title: "价格",
            field: "maxprice",
            align: 'right',
            width: 150,
          },
          {
            title: "会员名称",
            field: "mem_maxprice",
            align: 'left',
            width: 150,
          }
        ]
      },
      {
        title: "最低",
        field: "",
        align: 'right',
        width: 150,
        children: [
          {
            title: "价格",
            field: "minprice",
            align: 'right',
            width: 150,
          },
          {
            title: "会员名称",
            field: "mem_minprice",
            align: 'left',
            width: 150,
          }
        ]
      },
      {
        title: "均值",
        field: "avgprice",
        align: 'right',
        width: 100,
      }
    ]
  },

];
export {tableColumns1}
