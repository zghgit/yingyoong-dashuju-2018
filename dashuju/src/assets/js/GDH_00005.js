//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {field: 'mem_name_all', width: 150, title: '会员名称', align: 'left', static: false},
  {field: 'mem_limit', title: '交易额度(亿元)', align: 'right', static: false},
  {
    field: 'all1', title: '成交金额（万元）', static: true, children: [
      {field: 'trade_amt', width: 120, title: '总金额', align: 'right'},
      {field: 'buy_trade_amt', width: 120, title: '初始交易', align: 'right'},
      {field: 'repur_trade_amt', width: 120, title: '购回交易', align: 'right'},
      {field: 'individual_amt', width: 120, title: '个人投资者', align: 'right'},
      {field: 'especial_amt', width: 120, title: '特殊机构', align: 'right'},
      {field: 'org_amt', width: 120, title: '一般机构', align: 'right'}
    ]
  },
  {
    field: 'all2', title: '交易笔数（笔）', static: true, children: [
      {field: 'trade_cnt', width: 120, title: '全部交易', align: 'right'},
      {field: 'stat_trade_cnt', width: 120, title: '初始交易', align: 'right'},
      {field: 'recruit_trade_cnt', width: 120, title: '补充质押', align: 'right'},
      {field: 'repur_trade_cnt', width: 120, title: '购回交易', align: 'right'},
      {field: 'part_trade_cnt', width: 120, title: '部分解质', align: 'right'},
      {field: 'end_cnt', width: 120, title: '终止购回', align: 'right'},
      {field: 'disobey_cnt', width: 120, title: '违约处置', align: 'right'}
    ]
  },
  {
    field: 'all3', title: '交易的账户数', static: true, children: [
      {field: 'individual_vol', width: 120, title: '个人投资者', align: 'right'},
      {field: 'especial_vol', width: 120, title: '特殊机构', align: 'right'},
      {field: 'org_vol', width: 120, title: '一般机构', align: 'right'}
    ]
  },
  {field: 'start_amt', width: 120, title: '期初待购回余额(万元)', static: false, align: 'right'},
  {field: 'end_amt', width: 120, title: '期末待购回余额(万元)', static: false, align: 'right'},
  {field: 'unmature_amt', width: 120, title: '期末标的券市值(万元)', static: false, align: 'right'},
  {
    field: 'all4', title: '期末持有待购回人数', static: true, children: [
      {field: 'end_trade_cnt', width: 120, title: '投资者总数', align: 'right'},
      {field: 'individual_cnt', width: 120, title: '个人投资者', align: 'right'},
      {field: 'especial_cnt', width: 120, title: '特殊机构', align: 'right'},
      {field: 'org_cnt', width: 120, title: '一般机构', align: 'right'}
    ]
  }
];

export {tableColumns1}
