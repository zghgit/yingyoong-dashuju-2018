//引入排序方法
import {sortMethods} from './sort.js';
let tableColumns22_1 = [
  {field: "trade_date", title: "日期",width: 150, align: 'center'},
  {
    field: "", title: "融资",
    children: [
      {title: "证券代码", field: "sec_code",width: 150, align: 'left'},
      {title: "证券简称", field: "sec_name", width: 150, align: 'left',},
    ]
  }
];
let tableColumns22_2 = [
  {field: "trade_date", title: "日期",width: 150, align: 'center'},
  {
    field: "", title: "融券",
    children: [
      {title: "证券代码", field: "sec_code",width: 150, align: 'left'},
      {title: "证券简称", field: "sec_name", width: 150, align: 'left',},
    ]
  }
];

let tableColumns22_3 = [
  {field: "trade_date", title: "日期",width: 150, align: 'center'},
  {
    field: "", title: "担保品",
    children: [
      {title: "证券代码", field: "sec_code",width: 150, align: 'left'},
      {title: "证券简称", field: "sec_name", width: 150, align: 'left',},
    ]
  }
];
export {tableColumns22_1, tableColumns22_2, tableColumns22_3}
