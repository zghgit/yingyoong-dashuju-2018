//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "会员名称",
    field: "mem_name",
    width: 180,
    align: 'left',
    static: false
  },
  {
    title: "出资类别",
    field: "out_acct_desc",
    width: 120,
    align: 'left',
    static: false
  },
  {
    title: "交易额度（亿元）",
    field: "mem_limit",
    width: 120,
    align: 'right',
    static: false
  },
  {
    title: "成交金额（万元）",
    field: "childs",
    static: true,
    children: [
      {
        title: "总金额",
        field: "trade_amt",
        align: 'right',
        width: 180,
      },
      {
        title: "初始交易",
        field: "buy_trade_amt",
        align: 'right',
        width: 180,
      },
      {
        title: "购回交易",
        field: "repur_trade_amt",
        align: 'right',
        width: 180,
      },
      {
        title: "个人投资者",
        field: "individual_amt",
        align: 'right',
        width: 180,
      },
      {
        title: "特殊机构",
        field: "especial_amt",
        align: 'right',
        width: 180,
      },
      {
        title: "一般机构",
        field: "org_amt",
        align: 'right',
        width: 180,
      }
    ]
  },
  {
    title: "交易笔数（笔）",
    field: "childs",
    static: true,
    children: [
      {
        title: "全部交易",
        field: "trade_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "初始交易",
        field: "stat_trade_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "补充质押",
        field: "recruit_trade_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "购回交易",
        field: "repur_trade_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "部分解质",
        field: "part_trade_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "终止购回",
        field: "end_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "违约处置",
        field: "disobey_cnt",
        align: 'right',
        width: 180,
      }
    ]
  },{
    title: "交易的账户数",
    field: "childs",
    static: true,
    children: [
      {
        title: "个人投资者",
        field: "individual_vol",
        align: 'right',
        width: 180,
      },
      {
        title: "特殊机构",
        field: "especial_vol",
        align: 'right',
        width: 180,
      },
      {
        title: "一般机构",
        field: "org_vol",
        align: 'right',
        width: 180,
      },
    ]
  },
  {
    title: "期初待购回余额(万元)",
    field: "stat_amt",
    width: 200,
    align: 'right',
    static: false
  },
  {
    title: "期末待购回余额(万元)",
    field: "end_amt",
    width: 200,
    align: 'right',
    static: false
  },
  {
    title: "期末标的券市值(万元)",
    field: "unmature_amt",
    width: 200,
    align: 'right',
    static: false
  },
  {
    title: "期末持有待购回人数",
    field: "childs",
    static: true,
    children: [
      {
        title: "投资者总数",
        field: "end_trade_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "个人投资者",
        field: "individual_cnt",
        align: 'right',
        width: 180,
      },
      {
        title: "特殊机构",
        field: "especial_cnt",
        align: 'right',
        width: 180,
      },{
        title: "一般机构",
        field: "org_cnt",
        align: 'right',
        width: 180,
      },
    ]
  },
];
export {tableColumns1}
