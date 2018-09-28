//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "明细数据钻入",
    key: "arr",
    width: 250,
    align: 'left',
    hasAnchor:true,
    aIndex:1
  },
  {
    title: "维持担保比例%",
    key: "coll_ratio1",
    width: 150,
    align: 'left',
    // flag:1
    aIndex:2
  },
  {
    title: "投资者数",
    key: "acct_cnt",
    width: 150,
    align: 'right',
    aIndex:3
  },
  {
    title: "分布占比%",
    key: "acct_cnt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:4
  },
  {
    title: "担保品市值(亿元)",
    key: "hold_amt",
    width: 150,
    align: 'right',
    aIndex:4.5
  },
  {
    title: "担保品市值日均（亿元）",
    key: "hold_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:5
  },
  {
    title: "沪市担保品市值（亿元）",
    key: "hold_amt_sh",
    width: 200,
    align: 'right',
    aIndex:5.5
  },{
    title: "沪市担保品市值日均（亿元）",
    key: "hold_amt_sh_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:6
  },
  {
    title: "融资余额（万元）",
    key: "finance_debt_amt",
    width: 150,
    align: 'right',
    aIndex:6.5
  },{
    title: "融资余额日均（万元）",
    key: "finance_debt_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:7
  }, {
    title: "户均（万元）",
    key: "bal_m_avg_sh",
    width: 150,
    align: 'right',
    flag:3,
    aIndex:8
  }, {
    title: "分布占比%",
    key: "finance_debt_amt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:9
  },{
    title: "融券余额（万元）",
    key: "loansec_debt_amt",
    width: 150,
    align: 'right',
    aIndex:9.5
  }, {
    title: "融券余额日均（万元）",
    key: "loansec_debt_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:10
  }, {
    title: "户均（万元）",
    key: "bal_s_avg_sh",
    width: 150,
    align: 'right',
    flag:3,
    aIndex:11
  }, {
    title: "分布占比%",
    key: "loansec_amt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:12
  }
];
let tableColumns2 = [
  {
    title: "维持担保比例%",
    key: "coll_ratio1",
    width: 150,
    align: 'left',
    // hasAnchor:true
    aIndex:1
  },
  {
    title: "会员名称",
    key: "mem_abbr",
    width: 150,
    align: 'left',
    aIndex:2
  },
  {
    title: "投资者数",
    key: "acct_cnt",
    width: 150,
    align: 'right',
    aIndex:3
  },
  {
    title: "分布占比%",
    key: "acct_cnt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:4
  },{
    title: "担保品市值（亿元）",
    key: "hold_amt",
    width: 150,
    align: 'right',
    aIndex:4.5
  },
  {
    title: "担保品市值日均（亿元）",
    key: "hold_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:5
  },{
    title: "沪市担保品市值（亿元）",
    key: "hold_amt_sh",
    width: 200,
    align: 'right',
    aIndex:5.5
  },  {
    title: "沪市担保品市值日均（亿元）",
    key: "hold_amt_sh_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:6
  }, {
    title: "融资余额（万元）",
    key: "finance_debt_amt",
    width: 150,
    align: 'right',
    aIndex:6.5
  }, {
    title: "融资余额日均（万元）",
    key: "finance_debt_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:7
  }, {
    title: "户均（万元）",
    key: "bal_m_avg_sh",
    width: 150,
    align: 'right',
    flag:3,
    aIndex:8
  }, {
    title: "分布占比%",
    key: "finance_debt_amt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:9
  },{
    title: "融券余额（万元）",
    key: "loansec_debt_amt",
    width: 150,
    align: 'right',
    aIndex:9.5
  }, {
    title: "融券余额日均（万元）",
    key: "loansec_debt_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:10
  }, {
    title: "户均（万元）",
    key: "bal_s_avg_sh",
    width: 150,
    align: 'right',
    flag:3,
    aIndex:11
  }, {
    title: "分布占比%",
    key: "loansec_amt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:12
  }
];
let tableColumns3 = [
  {
    title: "维持担保比例%",
    key: "coll_ratio1",
    width: 150,
    align: 'left',
    // hasAnchor:true
    aIndex:1
  },
  {
    title: "时间",
    key: "stat_date",
    width: 150,
    align: 'center',
    aIndex:2
  },
  {
    title: "投资者数",
    key: "acct_cnt",
    width: 150,
    align: 'right',
    aIndex:3
  },
  {
    title: "分布占比%",
    key: "acct_cnt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:4
  },
  {
    title: "担保品市值（亿元）",
    key: "hold_amt",
    width: 150,
    align: 'right',
    aIndex:5
  }, {
    title: "担保品市值日均（亿元）",
    key: "hold_amt_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:5.5
  },{
    title: "沪市担保品市值（亿元）",
    key: "hold_amt_sh",
    width: 200,
    align: 'right',
    aIndex:6
  },{
    title: "沪市担保品市值日均（亿元）",
    key: "hold_amt_sh_avg",
    width: 250,
    align: 'right',
    flag:2,
    aIndex:6.5
  }, {
    title: "融资余额（万元）",
    key: "finance_debt_amt",
    width: 150,
    align: 'right',
    aIndex:7
  }, {
    title: "户均（万元）",
    key: "bal_m_avg_sh",
    width: 150,
    align: 'right',
    flag:3,
    aIndex:8
  }, {
    title: "分布占比%",
    key: "finance_debt_amt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:9
  }, {
    title: "融券余额（万元）",
    key: "loansec_debt_amt",
    width: 150,
    align: 'right',
    aIndex:10
  }, {
    title: "户均（万元）",
    key: "bal_s_avg_sh",
    width: 150,
    align: 'right',
    flag:3,
    aIndex:11
  }, {
    title: "分布占比%",
    key: "loansec_amt_rate",
    width: 150,
    align: 'right',
    flag:1,
    aIndex:12
  }
];
export {tableColumns1,tableColumns2,tableColumns3}
