
let tableColumns1 = [
  {
    title: "A股代码",
    field: "a_sec_code",
    width: 150,
    notFormat:true,
    align: 'left'
  },
  {
    title: "A股简称",
    field: "a_sec_name",
    width: 150,
    align: 'left',
  },
  {
    title: "B股代码",
    field: "b_sec_code",
    width: 150,
    notFormat:true,
    align: 'left'
  },
  {
    title: "B股简称",
    field: "b_sec_name",
    width: 150,
    align: 'left',
  },
  {
    title: "公司状态",
    field: "company_status",
    width: 200,
    align: 'left'
  },
  {
    title: "所属省市",
    field: "prov_desc",
    width: 150,
    align: 'left'
  },
  {
    title: "CSRC门类代码",
    field: "csrc_ind_grp_desc",
    notFormat:true,
    width: 150,
    align: 'left'
  },
  {
    title: "最新股价",
    field: "cur_close_price",
    width: 150,
    align: 'right'
  },
  {
    title: "更新日期",
    field: "trade_date",
    notFormat:true,
    width: 200,
    align: 'center'
  },
];
let tableColumns2 = [
  {
    title: "股本变动日期",
    field: "chg_date",
    width: 200,
    notFormat:true,
    align: 'center'
  },
  {
    title: "股本变动原因描述",
    field: "chg_reason",
    width: 250,
    align: 'left',
  },
  {
    title: "非流通股合计",
    field: "noshare",
    width: 150,
    align: 'right'
  },
  {
    title: "A股流通股",
    field: "a_share",
    width: 150,
    align: 'right',
  },
  {
    title: "B股",
    field: "b_share",
    width: 150,
    align: 'right'
  },
  {
    title: "H股",
    field: "h_share",
    width: 150,
    align: 'right'
  },
  {
    title: "总股本",
    field: "total_capital",
    width: 150,
    align: 'right'
  },

];
let tableColumns3 = [
  {
    title: "股权登记日",
    field: "share_reg_date",
    width: 200,
    align: 'center'
  },
  {
    title: "除权基准日",
    field: "derights_date",
    width: 200,
    align: 'center',
  },
  {
    title: "送股比例",
    field: "bonus_share_ratio",
    width: 150,
    align: 'right'
  },
  {
    title: "分红比例",
    field: "profit_allot_ratio",
    width: 150,
    align: 'right',
  },
  {
    title: "配股比例",
    field: "issue_allot_ratio",
    width: 150,
    align: 'right'
  },
  {
    title: "配股价",
    field: "issue_price",
    width: 150,
    align: 'right'
  },
  {
    title: "配股上市日",
    field: "issue_list_date",
    width: 200,
    align: 'center'
  },

];
export {tableColumns1,tableColumns2,tableColumns3}
