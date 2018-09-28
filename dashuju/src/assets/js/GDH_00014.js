//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "盯市日期",
    key: "tradedate",
    width: 100,
    align: 'center'
  },
  {
    title: "会员编号",
    key: "memcde",
    width: 150,
    align: 'left',
  },
  {
    title: "会员名称",
    key: "memname",
    width: 150,
    align: 'left'
  },
{
    title: "业务类型",
    key: "impawntype",
    width: 100,
    align: 'left',
  },
  {
    title: "初始交易日期",
    key: "inittradedate",
    width: 100,
    align: 'center'
  },
  {
    title: "初始交易成交编号",
    key: "inittradeno",
    width: 120,
    align: 'left'
  },
  {
    title: "补充质押日期",
    key: "addtradedate",
    width: 100,
    align: 'center'
  },
  {
    title: "补充质押成交编号",
    key: "addtradeno",
    width: 120,
    align: 'left'
  },
  {
    title: "证券代码",
    key: "seccode",
    width: 120,
    align: 'left'
  },

{
  title: "证券简称",
    key: "secname",
  width: 120,
  align: 'left',
},
{
  title: "是否属于限售股份",
    key: "nonnegoflag",
  width: 80,
  align: 'left'
},
{
  title: "标的证券数量（股/份/张）",
    key: "tradevol",
  width: 150,
  align: 'right'
},
{
  title: "初始交易金额（元）",
    key: "inittradeamt",
  width: 150,
  align: 'right'
},
{
  title: "初始购回期限（天）",
    key: "repurterm",
  width: 150,
  align: 'right'
},
{
  title: "初始购回日期",
    key: "repurdate",
  width: 100,
  align: 'center'
},
  {
    title: "初始购回金额（元）",
    key: "repuramt",
    width: 150,
    align: 'right'
  }
  ,
  {
    title: "融资利率（%，年化收益率）",
    key: "intratet",
    width: 80,
    align: 'right'
  }
  ,
  {
    title: "融出方属性",
    key: "sellaccttype",
    width: 100,
    align: 'left'
  }
  ,
  {
    title: "融入方属性",
    key: "buyaccttype",
    width: 100,
    align: 'left'
  }
  ,
  {
    title: "融入方应付金额（元）",
    key: "payamt",
    width: 150,
    align: 'right'
  }
  ,
  {
    title: "实际融资利率（%，年化收益率）",
    key: "actlintrate",
    width: 80,
    align: 'right'
  }
  ,
  {
    title: "当前质押数量（股/份/张）",
    key: "impawnvol",
    width: 150,
    align: 'right'
  }
  ,
  {
    title: "当前质押红利金额（元）",
    key: "dividendamt",
    width: 150,
    align: 'right'
  }
  ,
  {
    title: "盯市履约保障比例（%）",
    key: "collrate",
    width: 80,
    align: 'right'
  }
  ,
  {
    title: "履约保障级别",
    key: "checklevel",
    width: 120,
    align: 'left'
  }
  ,
  {
    title: "合约状态",
    key: "contrstatus",
    width: 100,
    align: 'left'
  }
  ,
  {
    title: "了结类型",
    key: "endtype",
    width: 100,
    align: 'left'
  }
  ,
  {
    title: "资金用途类型",
    key: "cashusetype",
    width: 120,
    align: 'left'
  }
  ,
  {
    title: "资金用途描述",
    key: "cashusedesc",
    width: 120,
    align: 'left'
  }
  ,
  {
    title: "业务备用字段",
    key: "note",
    width: 120,
    align: 'left'
  }
  ,
  {
    title: "质押标的价格（元）",
    key: "pledgetargetprice",
    width: 150,
    align: 'right'
  }  ,
  {
    title: "质押标的市值（元）",
    key: "pledgetargetvalue",
    width: 150,
    align: 'right'
  }
];
export {tableColumns1}
