
let tableColumns1 = [
  {
    title: "品种/类型",
    field: "variety",
    width: 270,
    align: 'left',
    static: false,
    hasChildren:true,
  },

  {
    title: "报价",
    field: "childs",
    static: true,
    children: [
      {
        title: "最高",
        field: "max",
        align: 'right',
        static: true,
         children: [
      {
        title: "价格",
        field: "maxprice",
        align: 'right',
        width: 150,
      },
      {
        title: "会员名称",
        field: "mem_maxprice",
        align: 'left',
        width: 150,
      },

    ]
      },
      {
        title: "最低",
        field: "min",
        align: 'right',
           children: [
      {
        title: "价格",
        field: "minprice",
        align: 'right',
        width: 150,
      },
      {
        title: "会员名称",
        field: "mem_minprice",
        align: 'left',
        width: 150,
      }

    ]
      },
      {
        title: "均值",
        field: "avgprice",
        align: 'right',
        width: 150,
      }
    ]
  },

];
export {tableColumns1}
