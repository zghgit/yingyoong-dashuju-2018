//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
{title: "一码通账户号", key: "ccrcAcctId", width: '', align: 'left'},
{title: "账户类别", key: "acctTypeDesc", width: '', align: 'left',},
{title: "账户代码", key: "acctId", width: '', align: 'left'},
{title: "账户名称", key: "acctName", width: '', align: 'left',},
{title: "账户证件号码", key: "idCard", width: '', align: 'left'}
];
let queryList = [
  {value: '1', label: '证券账户'},
  {value: '2', label: '身份证号码'},
  {value: '3', label: '一码通号'}
];
export {tableColumns1, queryList}
