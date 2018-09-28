//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns_mtsl00008 = [
  { field: "sec_code", title: "证券代码", width: 150, align: 'left'},
  { field: "sec_name", title: "证券名称", width: 150, align: 'left'},
  { field: "coll_amt", title: "担保品持有市值", width: 150, align: 'right'},
  { field: "coll_amt_rate", title: "占流动市值比（%）", width: 100, align: 'right'},
  { field: "coll_amt1", title: "高风险账户担保品持有市值", width: 250, align: 'right'},
  { field: "coll_amt_rate1", title: "占流动市值比（%）", width: 100, align: 'right'},
  { field: "finance_bal_amt", title: "融资余额", width: 150, align: 'right'},
  { field: "finance_bal_amt_rate", title: "占流动市值比（%）", width: 100, align: 'right'},
  { field: "loansec_bal_amt", title: "融券余额", width: 150, align: 'right'},
  { field: "loansec_bal_amt_rate", title: "占流动市值比（%）", width: 100, align: 'right'},
];
export {tableColumns_mtsl00008}
