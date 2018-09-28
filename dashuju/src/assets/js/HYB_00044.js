//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "无效行号",
    key: "index",
    width: 100,
    align: 'right'
  },
  {
    title: "证券代码",
    key: "0",
    width: 150,
    align: 'left',
  },
  {
    title: "证券简称",
    key: "1",
    width: 150,
    align: 'left'
  },
  {
    title: "质押笔数（笔）",
    key: "2",
    width: 150,
    align: 'right',
  },
  {
    title: "无限售股份质押数量（万）",
    key: "3",
    width: 200,
    align: 'right'
  },
  {
    title: "有限售股份质押数量（万）",
    key: "4",
    width: 200,
    align: 'right'
  },
  {
    title: "A股总股本（万）",
    key: "5",
    width: 150,
    align: 'right',
  },
  {
    title: "质押比例（%）",
    key: "6",
    width: 100,
    align: 'right'
  },
];

let tableColumns2 = [
  {
    title: "行号",
    key: "rowindex",
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
    key: "tradeDate",
    width: 150,
    align: 'center'
  },
  {
    title: "证券代码",
    key: "secCode",
    width: 150,
    align: 'left',
  },
  {
    title: "证券简称",
    key: "secName",
    width: 150,
    align: 'left'
  },
  {
    title: "质押笔数（笔）",
    key: "impawnCnt",
    width: 150,
    align: 'right',
  },
  {
    title: "无限售股份质押数量（万）",
    key: "unlimitedSharesSoldCnt",
    width: 200,
    align: 'right'
  },
  {
    title: "有限售股份质押数量（万）",
    key: "lmtSharesSoldCnt",
    width: 200,
    align: 'right'
  },
  {
    title: "A股总股本（万）",
    key: "atotalShares",
    width: 150,
    align: 'right',
  },
  {
    title: "质押比例（%）",
    key: "impawnRatio",
    width: 100,
    align: 'right'
  },
];
export {tableColumns1,tableColumns2}
