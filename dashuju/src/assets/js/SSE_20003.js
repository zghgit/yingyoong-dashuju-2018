
//引入排序方法
import {sortMethods} from './sort.js';
let tableColumns1 = [
  {
    title: "明细数据超链接",
    field: "statisticalindex",
    width: 150,
    align: 'left',
    static: false,
    hasAnchor:true
  },
  {
    title: "一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "ccrc_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "stock_ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "stock_ccrc_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "stock_ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "信用账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "credit_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "credit_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "credit_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "基金账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "fund_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "fund_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "fund_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "期权账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "opt_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "opt_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "opt_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  }
]
let tableColumns11 = [
  {
    title: "明细数据超链接",
    field: "statisticalindex",
    width: 150,
    align: 'left',
    static: false,
    notFormat:true,
    hasAnchor:true
  },
  {
    title: "一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "stock_ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "stock_ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "信用账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "credit_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "credit_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "基金账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "fund_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "fund_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "期权账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "opt_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "opt_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  }
]
let tableColumns2 = [
  {
    title: "明细数据超链接",
    field: "start_date",
    width: 150,
    align: 'left',
    hasAnchor:true
  },
  {
    title: "账户类型",
    field: "sce_type",
    width: 150,
    align: 'left',

  },
  {
    title: "新增账户数(万户)",
    field: "acct_open_cnt",
    width: 150,
    align: 'right'
  },
  {
    title: "日均新增账户数(万户)",
    field: "acct_open_cnt_avg",
    width: 180,
    align: 'right'
  },
  {
    title: "总开户数(万户)",
    field: "acct_total_cnt",
    width: 150,
    align: 'right'
  },
];
let tableColumns22 = [
  {
    title: "明细数据超链接",
    field: "start_date",
    width: 150,
    align: 'left',
    notFormat:true,
    hasAnchor:true
  },
  {
    title: "账户类型",
    field: "sce_type",
    width: 150,
    align: 'left',

  },
  {
    title: "新增账户数(万户)",
    field: "acct_open_cnt",
    width: 150,
    align: 'right'
  },
  {
    title: "总开户数(万户)",
    field: "acct_total_cnt",
    width: 150,
    align: 'right'
  },
];
let tableColumns1Day = [
  {
    title: "日期",
    field: "trade_date",
    width: 150,
    align: 'center',
    notFormat:true,
    static: false,
  },
  {
    title: "一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "stock_ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "stock_ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "信用账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "credit_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "credit_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "基金账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "fund_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "fund_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "期权账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "opt_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "开户总数(万户)",
        field: "opt_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  }
]
let tableColumns1Month = [
  {
    title: "日期",
    field: "trade_date",
    width: 150,
    align: 'center',
    static: false,
  },
  {
    title: "一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "ccrc_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票一码通",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "stock_ccrc_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "stock_ccrc_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "stock_ccrc_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "股票账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "信用账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "credit_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "credit_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "credit_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "基金账户开户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "fund_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "fund_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "fund_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  },
  {
    title: "期权账户",
    field: "all",
    static: true,
    children: [
      {
        title: "新增开户数(万户)",
        field: "opt_acct_open_cnt",
        align: 'right',
        width: 150,
      },
      {
        title: "日均新增开户数(万户)",
        field: "opt_acct_open_cnt_avg",
        align: 'right',
        width: 180,
      },
      {
        title: "开户总数(万户)",
        field: "opt_acct_total_cnt",
        align: 'right',
        width: 150,
      }
    ]
  }
]
let tableColumns2Day = [
  {
    title: "账户类型",
    field: "sce_type",
    align: 'left',
    width: 150,
  },
  {
    title: "日期",
    field: "trade_date",
    align: 'center',
    width: 150,
  },
  {
    title: "新增账户数(万户)",
    field: "acct_open_cnt",
    align: 'right',
    width: 150,
  },
  {
    title: "总开户数(万户)",
    field: "acct_total_cnt",
    align: 'right',
    width: 150,
  }
]
let tableColumns2Month = [
  {
    title: "账户类型",
    field: "sce_type",
    align: 'left',
    width: 150,
  },
  {
    title: "日期",
    field: "trade_date",
    align: 'center',
    width: 150,
  },
  {
    title: "新增账户数(万户)",
    field: "acct_open_cnt",
    align: 'right',
    width: 150,
  },
  {
    title: "日均新增账户数(万户)",
    field: "acct_open_cnt_avg",
    align: 'right',
    width: 180,
  },
  {
    title: "总开户数(万户)",
    field: "acct_total_cnt",
    align: 'right',
    width: 150,
  }
]
export {tableColumns1,tableColumns11,tableColumns1Day,tableColumns22,tableColumns1Month,tableColumns2,tableColumns2Day,tableColumns2Month}

