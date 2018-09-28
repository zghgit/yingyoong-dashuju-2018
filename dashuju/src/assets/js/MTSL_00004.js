//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    key: "men_name",
    width: 200,
    align: 'left',
    hasAnchor:true
  },
  {
    title: "整体市值",
    key: "coll_amt_total",
    width: 200,
    align: 'right',
  },
  {
    title: "折算后整体市值",
    key: "coll_amt_total_zs",
    width: 200,
    align: 'right'
  }
  ,
  {
    title: "股票市值",
    key: "coll_amt_stock",
    width: 200,
    align: 'right'
  }
  ,
  {
    title: "折算后股票市值",
    key: "coll_amt_stock_zs",
    width: 200,
    align: 'right'
  } ,
  {
    title: "基金市值",
    key: "coll_amt_fund",
    width: 200,
    align: 'right'
  } ,
  {
    title: "折算后基金市值",
    key: "coll_amt_fund_zs",
    width: 200,
    align: 'right'
  } ,
  {
    title: "债券市值",
    key: "coll_amt_bond",
    width: 200,
    align: 'right'
  },
  {
    title: "折算后债券市值",
    key: "coll_amt_bond_zs",
    width: 200,
    align: 'right'
  },
  {
    title: "其他市值",
    key: "coll_amt_other",
    width: 200,
    align: 'right'
  },
  {
    title: "折算后其他市值",
    key: "coll_amt_other_zs",
    width: 200,
    align: 'right'
  }
];
let tableColumns2 = [

  {
    title: "会员名称",
    key: "men_name",
    width: 180,
    align: 'left'
  }
  ,
  {
    title: "担保品品种",
    key: "coll_type_desc",
    width: 400,
    align: 'left',
    hasAnchor:true
  } ,
  {
    title: "担保品市值（元）",
    key: "coll_amt",
    width: 200,
    align: 'right'
  } ,
  {
    title: "担保品折算率%",
    key: "disc_ratio",
    width: 100,
    align: 'right'
  }
];
let tableColumns3 = [
  {
    title: "担保品品种",
    key: "coll_type_desc",
    width: 400,
    align: 'left',
    hasAnchor:true
  },
  {
    title: "证券代码",
    key: "sec_code",
    width: 200,
    align: 'left',
  },
  {
    title: "证券名称",
    key: "sec_name",
    width: 200,
    align: 'left'
  }
];
export {tableColumns1,tableColumns2,tableColumns3}
