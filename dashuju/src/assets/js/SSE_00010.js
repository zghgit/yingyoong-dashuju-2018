//引入排序方法
import {sortMethods} from './sort.js';

let tableColumnsList = {

  hgtgm: [
    {
      title: "指标",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "沪股通",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "港股通",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
  ],
  zsgk: [
    {
      title: "指数名称",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "当前",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "今开",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "最高",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "最低",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "涨跌",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "振幅",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
  ],
  zdzs: [
    {
      title: "指标",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "收盘",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "样本均价",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "成交金额(亿元)",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "平均股本(亿股)",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "总市值(万亿)",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "占比(％)",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
  ],
  cjgk: [
    {
      title: "成交类别",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "成交金额（亿元）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "成交数量（亿）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "市价总值（亿元）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "上市数量（个）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    }
  ],
  gpsc:[
    {
      title: "成交类别",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "发行数量(亿）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "流通数量(亿）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "流通市值(亿）",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "平均市盈率",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "平均价格",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "流通股换手率",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
  ],
  jqcj:[
    {
      title: "当日",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "前日",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "本周",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "本月",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
    {
      title: "本年",
      field: "name",
      width: 50,
      align: 'center',
      static: false
    },
  ],
  qqgk:[
    {
      title: "今日标的数",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "今日合约数",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    }
    ,
    {
      title: "今日成交量(万张)",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    }
    ,
    {
      title: "今日成交金额(万元)",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    }
    ,
    {
      title: "昨日持仓量(万张)",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    }
  ],
  scgc:[
    {
      title: "上市公司",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "家",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "筹资额",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "家",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "亿元",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "券商",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "家",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "席位",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "个",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "投资者",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    },
    {
      title: "万户",
      field: "name",
      width: 100,
      align: 'center',
      static: false
    }
  ]

}




export {tableColumnsList}
