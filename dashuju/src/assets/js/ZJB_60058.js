//引入排序方法
import {sortMethods} from './sort.js';

let tableColumns1 = [
  {
    title: "券商名称",
    key: "mem_full_name",
    width: 200,
    align: 'left'
  },
  {
    title: "现券代码",
    key: "bond_code",
    width: 130,
    align: 'left'
  }, {
    title: "现券名称",
    key: "sec_name",
    width: 100,
    align: 'left'
  }, {
    title: "质押券对应现券类型",
    key: "sec_type",
    width: 120,
    align: 'left'
  }
  , {
    title: "质押券对应现券评级",
    key: "credit_level",
    width: 100,
    align: 'left'
  }
  , {
    title: "质押券面值（万元）",
    key: "hold_par_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "标准券折算率",
    key: "turnover_rate",
    width: 80,
    align: 'right'
  },
  {
    title: "标准券面值（万元）",
    key: "hold_std_amt",
    width: 120,
    align: 'right'
  },
  {
    title: "占该会员公司标准券的比例（%）",
    key: "mem_std_ratio",
    width: 100,
    align: 'right'
  },
  {
    title: "占所有会员公司标准券的比例（%）",
    key: "std_ratio",
    width: 100,
    align: 'right'
  },
 {
   title: "会员质押库标准券总额（万元）",
     key: "tot_hold_std_amt",
   width: 120,
   align: 'right'
 },

];

export {tableColumns1}
