//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [

  [
    {
      title: "融资标的清单",
      field: "all1",
      children: [
        {
          title: "证券代码",
          field: "jy_init_trade_no",
          width: 100,
          align: 'left'
        },
        {
          title: "证券简称",
          field: "jy_init_trade_date",
          width: 100,
          align: 'center',
        },
      ]
    }
  ],
  [
    {
      title: "融券标的清单",
      field: "all2",
      children: [
        {
          title: "证券代码",
          field: "hy_init_trade_no",
          width: 100,
          align: 'left'
        },
        {
          title: "证券简称",
          field: "hy_init_trade_date",
          width: 100,
          align: 'center'
        }
      ]
    }
  ]
];
export {tableColumns1}
