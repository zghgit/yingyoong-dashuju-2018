//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "日期",
    key: "trade_date",
    width: 250,
    align: 'left',
    hasAnchor:true
  },
  {
    title: "未了结违约账户数",
    key: "acct_cnt_wlj",
    width: 150,
    align: 'right',
  },
  {
    title: "未了结违约笔数",
    key: "cnt_wlj",
    width: 150,
    align: 'right'
  }
  ,
  {
    title: "未了结违约金额",
    key: "breach_amt_wlj",
    width: 150,
    align: 'right'
  }
];
let tableColumns2 = [

  {
    title: "日期",
    key: "trade_date",
    width: 200,
    align: 'left'
  }
  ,
  {
    title: "会员名称",
    key: "mem_abbr",
    width: 200,
    align: 'left',
    hasAnchor:true
  } ,
  {
    title: "未了结违约账户数",
    key: "acct_cnt_wlj",
    width: 150,
    align: 'right'
  } ,
  {
    title: "未了结违约账户数占比%",
    key: "acct_wlj_ro",
    width: 150,
    align: 'right'
  } ,
  {
    title: "未了结违约笔数",
    key: "cnt_wlj",
    width: 150,
    align: 'right'
  } ,
  {
    title: "未了结违约笔数占比%",
    key: "cnt_wlj_ro",
    width: 150,
    align: 'right'
  } ,
  {
    title: "未了结违约金额",
    key: "breach_amt_wlj",
    width: 150,
    align: 'right'
  } ,
  {
    title: "未了结违约金额占比%",
    key: "breach_amt_wlj_ro",
    width: 150,
    align: 'right'
  }
];
let tableColumns3 = [
  {
    title: "日期",
    key: "trade_date",
    width: 200,
    align: 'center',
  },
  {
    title: "会员名称",
    key: "mem_abbr",
    width: 200,
    align: 'left',
  },
  {
    title: "账户名称",
    key: "acct_name",
    width: 150,
    align: 'left'
  },
  {
    title: "违约类型",
    key: "breach_type_desc",
    width: 150,
    align: 'left'
  },
  {
    title: "未了结违约金额",
    key: "breach_amt_wlj",
    width: 150,
    align: 'right'
  },
  {
    title: "未了结违约笔数",
    key: "cnt_wlj",
    width: 150,
    align: 'right'
  }
];
export {tableColumns1,tableColumns2,tableColumns3}
