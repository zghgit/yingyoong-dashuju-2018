//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
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
    title: "初始交易日",
    key: "inittradedate",
    width: 100,
    align: 'center',
  },
  {
    title: "预计购回交易日",
    key: "prerepurdate",
    width: 100,
    align: 'center',
  },
  {
    title: "标的证券代码",
    key: "seccode",
    width: 120,
    align: 'left',
  },{
    title: "标的证券类型说明",
    key: "sectypedesc",
    width: 120,
    align: 'left',
  },{
    title: "标的证券简称",
    key: "secname",
    width: 120,
    align: 'left',
  }
  ,{
    title: "标的证券数量",
    key: "tradevol",
    width: 120,
    align: 'right',
  }
  ,{
    title: "初始交易金额（万元）",
    key: "inittradeamt",
    width: 120,
    align: 'right',
  },
  {
    title: "标的证券市值（万元）",
    key: "mktval",
    width: 120,
    align: 'right',
  },
  {
    title: "质押率（%）",
    key: "traderatio",
    width: 80,
    align: 'right',
  },
  {
    title: "利率（%）",
    key: "rate",
    width: 80,
    align: 'right',
  },
  {
    title: "融出方账户",
    key: "outacctid",
    width: 120,
    align: 'left',
  },
  {
    title: "融出方属性",
    key: "sellaccttype",
    width: 120,
    align: 'left',
  },
  {
    title: "融入方账户",
    key: "inacctid",
    width: 120,
    align: 'left',
  },
  {
    title: "融入方属性",
    key: "buyaccttype",
    width: 100,
    align: 'left',
  },
  {
    title: "融入方属性2",
    key: "inacctdesc",
    width: 60,
    align: 'left',
  },
  {
    title: "证券类别",
    key: "sectype",
    width: 120,
    align: 'left',
  },
  {
    title: "流通类别",
    key: "negotype",
    width: 120,
    align: 'left',
  },
  {
    title: "权益类别",
    key: "righttype",
    width: 120,
    align: 'left',
  },
  {
    title: "挂牌年份",
    key: "listyear",
    width: 100,
    align: 'left',
  },
  {
    title: "交收状态",
    key: "clearresult",
    width: 100,
    align: 'left',
  },
  {
    title: "质权人名称",
    key: "outname",
    width: 220,
    align: 'left',
  },
  {
    title: "融资用途类型",
    key: "investcode",
    width: 120,
    align: 'left',
  },
  {
    title: "预警线",
    key: "warnlimit",
    width: 120,
    align: 'right',
  },
  {
    title: "平仓线",
    key: "closelimit",
    width: 120,
    align: 'right',
  }

];
export {tableColumns1}
