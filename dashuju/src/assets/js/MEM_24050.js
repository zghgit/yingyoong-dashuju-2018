//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "交易日期",
    field: "year_month",
   width: 100,
    align: 'center'
  },
  {
    title: "机构代号",
    field: "mem_code",
   width: 100,
    align: 'left',
  },
  {
    title: "机构名称",
    field: "mem_name",
   width: 100,
    align: 'left'
  },
  {
    title: "机构序号",
    field: "ymb_seq",
   width: 100,
    align: 'right',
  },
  {
    title: "席位数",
    field: "seat_cnt",
   width: 100,
    align: 'right'
  },
  {
    title: "交易单元数",
    field: "pbu_cnt",
   width: 100,
    align: 'right'
  },
  {
    title: "当月交易单元使用费",
    field: "pbu_fee",
   width: 140,
    align: 'right'
  },
  {
    title: "当月交易单元流速费",
    field: "vel_amt",
   width: 140,
    align: 'right'
  },
  {
    title: "当月交易单元流量费",
    field: "month_flux_amt",
   width: 130,
    align: 'right'
  },
  {
    title: "当月补交交易单元费",
    field: "patch_pbu_fee",
   width: 140,
    align: 'right'
  },
  {
    title: "当月补交流速费",
    field: "patch_vel_amt",
   width: 130,
    align: 'right'
  },
  {
    title: "年度内累计交易单元使用费",
    field: "sum_pbu_fee",
   width: 140,
    align: 'right'
  },
  {
    title: "年度内累计交易单元流速费",
    field: "sum_vel_fee",
   width: 130,
    align: 'right'
  },
  {
    title: "年度内累计交易单元流量费",
    field: "year_flux_amt",
   width: 130,
    align: 'right'
  },
  {
    title: "ETF流量费减免金额",
    field: "etf_flux_derate_amt",
   width: 140,
    align: 'right'
  },
  {
    title: "该年度内累计年费",
    field: "year_sum_fee",
   width: 150,
    align: 'right'
  }
];
export {tableColumns1}
