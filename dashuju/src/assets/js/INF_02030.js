//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "开始日期",
    key: "start_date",
    width: 100,
    align: 'center'
  },
  {
    title: "结束日期",
    key: "end_date",
    width: 100,
    align: 'center',
  }
  ,
  {
    title: "PBU代码",
    key: "seat_code",
    width: 200,
    align: 'left',
  }
  ,
  {
    title: "使用该PBU的会员代码",
    key: "mem_code_1",
    width: 200,
    align: 'left',
  }
  ,
  {
    title: "使用该PBU的会员名称",
    key: "mem_name_1",
    width: 200,
    align: 'left',
  }
  ,
  {
    title: "是否出租",
    key: "rent_flag",
    width: 100,
    align: 'left',
  }
  ,
  {
    title: "出租该PBU的会员代码",
    key: "mem_code_2",
    width: 200,
    align: 'left',
  }
  ,
  {
    title: "出租该PBU的会员名称",
    key: "mem_name_2",
    width: 200,
    align: 'left',
  }
];
export {tableColumns1}
