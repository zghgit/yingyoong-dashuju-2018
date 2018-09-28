//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [

  {
    title: "序号",
    key: "index",
    width: 100,
    align: 'right'
  },
  {
    title: "操作ID",
    key: "action_id",
    width: 300,
    align: 'center',
  },
  {
    title: "操作类型",
    key: "func_name",
    width: 100,
    align: 'center'
  },
  {
    title: "资源名",
    key: "file_name",
    width: 200,
    align: 'left',
  },
  {
    title: "上传行数",
    key: "upload_row_cnt",
    width: 100,
    align: 'right'
  },
  {
    title: "有效行数",
    key: "tmp_row_cnt",
    width: 100,
    align: 'right'
  },
  {
    title: "生效行数",
    key: "effect_row_cnt",
    width: 100,
    align: 'right',
  },
  {
    title: "刷新",
    width: 400,
    align: 'left',
    hasOperation:true,
    children:[
      {
        title: "有效明细",
        key: "6",
        width: 50,
        align: 'left',
      },
      {
        title: "生效明细",
        key: "6",
        width: 50,
        align: 'left',
      },
      {
        title: "下载",
        key: "6",
        width: 50,
        align: 'left',
      },
      {
        title: "重新入库",
        key: "6",
        width: 50,
        align: 'left',
      },
    ]
  },
];
let tableColumns2 = [
  {
    title: "行号",
    key: "file_no",
    width: 100,
    align: 'right'
  },
  {
    title: "是否生效",
    key: "isEff",
    width: 100,
    align: 'center'
  },{
    title: "交易日期",
    key: "trade_date",
    width: 100,
    align: 'center'
  },
  {
    title: "证券代码",
    key: "sec_code",
    width: 100,
    align: 'left',
  },
  {
    title: "证券简称",
    key: "sec_name",
    width: 100,
    align: 'left'
  },
  {
    title: "质押笔数（笔）",
    key: "impawn_cnt",
    width: 100,
    align: 'right',
  },
  {
    title: "无限售股份质押数量（万）",
    key: "impawn_hold_vol_1",
    width: 100,
    align: 'right'
  },
  {
    title: "有限售股份质押数量（万）",
    key: "impawn_hold_vol_2",
    width: 100,
    align: 'right'
  },
  {
    title: "A股总股本（万）",
    key: "a_hold_amt",
    width: 100,
    align: 'right',
  },
  {
    title: "质押比例（%）",
    key: "impawn_ratio",
    width: 100,
    align: 'right'
  },
];
export {tableColumns1,tableColumns2}
