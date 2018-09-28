 //引入排序方法
import {sortMethods} from './sort.js';
export let tableColumns1 = [
  {title: '证券代码', field: 'secCode',width: 120, sortable: true,},
  {title: '证券简称', field: 'secName', width: 120, sortable: true,},
  {title: '交易日期', field: 'tradeDate', width: 120, sortable: true,},
  {title: '成交时间', field: 'tradeTime', width: 120, sortable: true,},
  {title: '成交编号', field: 'tradeNo', width: 120,sortMethod: sortMethods},
  {title: '成交价格', field: 'tradePrice', width: 120, align: 'right', sortable: true, sortMethod: sortMethods},
  {title: '成交数量', field: 'tradeVol', width: 120, align: 'right', sortable: true, sortMethod: sortMethods},
  {title: '成交金额', field: 'tradeAmt', width: 120, align: 'right', sortable: true, sortMethod: sortMethods},
  {title: '买方股东代码', field: 'buyAcctId', width: 120, sortable: true,},
  {title: '买方股东名称', field: 'buyAcctName', width: 120, sortable: true,},
  {title: '买方会员营业部', field: 'buyBranchName', width: 180, sortable: true,},
  {title: '买方交易PBU', field: 'buyPbuId', width: 160, sortable: true,},
  {title: '卖方股东代码', field: 'sellAcctId', width: 140, sortable: true,},
  {title: '卖方股东名称', field: 'sellAcctName', width: 140, sortable: true,},
  {title: '卖方会员营业部', field: 'sellBranchName', width: 160, sortable: true,},
  {title: '卖方交易PBU', field: 'sellPbuId', width: 120, sortable: true,}
  ];

