let tableColumns1 = [
  {
    title: "证券类型",
    field: "sec_type_f",
    width: 200,
    align: 'left'
  },
  {
    title: "筹融资类型",
    field: "sec_type_th",
    width: 250,
    align: 'left',
    hasAnchor:true
  },
  {
    title: "筹资家数",
    field: "raise_count",
    width: 150,
    align: 'right'
  },
  {
    title: "筹资金额(亿元)",
    field: "raise_amt",
    width: 150,
    align: 'right'
  },
];
let anchorTableColumn = [
  {
    title: "筹资类型",
    field: "sec_type_th",
    width: 150,
    align: 'left'
  },
  {
    title: "证券代码",
    field: "sec_code",
    width: 150,
    notFormat:true,
    align: 'left',
  },
  {
    title: "证券名称",
    field: "sec_type_desc",
    width: 250,
    align: 'left'
  },
  {
    title: "上市日期",
    field: "list_date",
    width: 200,
    notFormat:true,
    align: 'center'
  },
  {
    title: "筹资金额(亿元)",
    field: "raise_amt",
    width: 150,
    align: 'right'
  },
  {
    title: "本次发行数量（亿）",
    field: "raise_num",
    width: 150,
    align: 'right'
  },
];
export {tableColumns1, anchorTableColumn}
