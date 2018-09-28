
let tableColumns1 = [
  {
    title: "交易日期",
    field: "trade_date_1",
    width: 100,
    static: false,
    align: 'center'
  },
  {
    title: "期权经营机构名称",
    field: "mem_full_name",
    width: 260,
    static: false,
    align: 'left',
  },
  {
    title: "业务类型",
    field: "bus_type",
    width: 100,
    static: false,
    align: 'left'
  },
  {
    title: "实际收款（交易系统）",
    field: "fee_amt_trade",
    width: 140,
    static: false,
    align: 'right',
  },
    {
    title: "比对数据 ",
    field: "childs",
    static: true,
    children: [
      {
        title: "标准收费金额",
        field: "std_fee_amt",
        align: 'right',
        width: 140,
      },
      {
        title: "优惠金额",
        field: "deduct_fee_amt",
        align: 'right',
        width: 140,
      },
      {
        title: "优惠后收费",
        field: "pay_fee_amt",
        align: 'right',
        width: 140,
      },
      {
        title: "奖励金额",
        field: "back_fee_amt",
        align: 'right',
        width: 140,
      },
      {
        title: "实际收款",
        field: "fee_amt",
        align: 'right',
        width: 140,
      }
    ]
  }


];
export {tableColumns1}
