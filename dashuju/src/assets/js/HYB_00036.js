
let tableColumns1 = [
  {
    title: "证券公司",
    field: "mem_full_name",
    width: 150,
    align: 'left'
  },
  {
    title: "交易日期",
    field: "trade_date",
    width: 100,
    align: 'center',
  },

    {
    title: "集合资产管理计划",
    field: "childs",
    static: true,
    children: [
      {
        title: "待购回初始交易金额（元）",
        field: "trade_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "标的证券市值（调整后）",
        field: "hold_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "待购回初始交易金额变动（元）",
        field: "repur_trade_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "其他担保物价值",
        field: "otc_other_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后担保物价值",
        field: "up_other_amt_1",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后履约保障比例（%）",
        field: "trade_ratio_1",
        align: 'right',
        width: 110,
      },

    ]
  },
  {
    title: "定向管理",
    field: "childs",
    static: true,
    children: [
      {
        title: "待购回初始交易金额（元）",
        field: "trade_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "标的证券市值（调整后）",
        field: "hold_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "待购回初始交易金额变动（元）",
        field: "repur_trade_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "其他担保物价值",
        field: "otc_other_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后担保物价值",
        field: "up_other_amt_2",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后履约保障比例（%）",
        field: "trade_ratio_2",
        align: 'right',
        width: 110,
      },

    ]
  },
  {
    title: "合计",
    field: "childs",
    static: true,
    children: [
      {
        title: "调整后待购回初始交易金额（元）",
        field: "up_trade_amt_s",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后担保物价值",
        field: "up_other_amt_s",
        align: 'right',
        width: 150,
      },
      {
        title: "调整后履约保障比例（%）",
        field: "trade_ratio_s",
        align: 'right',
        width: 110,
      },


    ]
  }


];
export {tableColumns1}
