//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "交易日期",
    key: "input_date",
    width: 100,
    align: 'center'
  },
  {
    title: "机构代号",
    key: "mem_code",
    width: 200,
    align: 'left',
  },
  {
    title: "机构名称",
    key: "mem_name",
    width: 250,
    align: 'left'
  },
  {
    title: "机构序号",
    key: "ymb_seq",
    width: 100,
    align: 'right',
  },
  {
    title: "席位数（个）",
    key: "seat_cnt",
    width: 100,
    align: 'right'
  },
  {
    title: "交易单元数（个）",
    key: "pbu_cnt",
    width: 100,
    align: 'right'
  },
  {
    title: "当月交易单元使用费（元）",
    key: "pbu_fee",
    width: 150,
    align: 'right',
  },
  {
    title: "当月交易单元流速费（元）",
    key: "vel_amt",
    width: 150,
    align: 'right'
  },
  {
    title: "当月交易单元流量费（元）",
    key: "flux_amt",
    width: 150,
    align: 'right',
  },
  {
    title: "当月补交交易单元费（元）",
    key: "patch_pbu_fee",
    width: 150,
    align: 'right'
  },
  {
    title: "当月补交流速费（元）",
    key: "patch_vel_amt",
    width: 100,
    align: 'right'
  },
  {
    title: "年度内累计交易单元使用费（元）",
    key: "pbu_fee_year",
    width: 150,
    align: 'right',
  },
  {
    title: "年度内累计交易单元流速费（元）",
    key: "vel_amt_year",
    width: 150,
    align: 'right'
  },
  {
    title: "年度内累计交易单元流量费（元）",
    key: "flux_amt_year",
    width: 150,
    align: 'right',
  },
  {
    title: "该年度内累计年费（元）",
    key: "tot_year_fee",
    width: 150,
    align: 'right',
  },

];
export {tableColumns1}
