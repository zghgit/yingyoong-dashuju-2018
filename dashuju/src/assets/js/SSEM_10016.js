
let tableColumns1 = [
  {
    title: "会员名称",
    field: "member",
    width: 250,
    align: 'left'
  },
  {
    title: "当年交易",
    field: "childs",
    static: true,
    children: [
      {
        title: "总计",
        field: "tn_total",
        align: 'right',
        width: 150,
      },
      {
        title: "股票",
        field: "tn_share",
        align: 'right',
        width: 150,
      },
      {
        title: "基金",
        field: "tn_mult_etf",
        align: 'right',
        width: 150,
      },
      {
        title: "政府债",
        field: "allgov_bond_all",
        align: 'right',
        width: 150,
      },
      {
        title: "公司债",
        field: "allcorp_bond_all",
        align: 'right',
        width: 150,
      },
      {
        title: "债券回购",
        field: "tn_rep_all",
        align: 'right',
        width: 150,
      },
      {
        title: "权证",
        field: "tn_warrant",
        align: 'right',
        width: 150,
      },

    ]
  },
  {
    title: "当月交易",
    field: "childs",
    static: true,
    children: [
      {
        title: "总计",
        field: "total",
        align: 'right',
        width: 150,
      },
      {
        title: "股票",
        field: "shares",
        align: 'right',
        width: 150,
      },
      {
        title: "基金",
        field: "mult_etf",
        align: 'right',
        width: 150,
      },
      {
        title: "政府债",
        field: "allgov_bond",
        align: 'right',
        width: 150,
      },
      {
        title: "公司债",
        field: "allcorp_bond",
        align: 'right',
        width: 150,
      },
      {
        title: "债券回购",
        field: "rep_all",
        align: 'right',
        width: 150,
      },
      {
        title: "权证",
        field: "warrant",
        align: 'right',
        width: 150,
      },

    ]
  },
];
export {tableColumns1}
