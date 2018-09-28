//引入排序方法
import {sortMethods} from './sort.js';
//维度运算所有表头
//rptDte
//rptNme
let columns1 = [
  {
    title: "报表日期",
    key: "rptDte",
    width: 150,
    align: 'center',
  },
  {
    title: "日报名称",
    key: "rptNme",
    width: 699,
    align: 'left',
  },
  {
    title: "操作",
    key: "action",
    width: 150,
    align: 'center',
    render(row, column, index) {
      return '<Button class="handleBtn" type="primary" size="small" @click="handleLook()">查&nbsp;&nbsp;看</Button><Button class="handleBtn" type="primary" size="small" @click="handleDownload()">下&nbsp;&nbsp;载</Button>'
    }
  }
];

let columns2 = [
  {
    title: "排名序号",
    key: "rankId",
    width: 199,
    align: 'center',
  },
  {
    title: "证券账户号",
    key: "sellAcctId",
    width: 200,
    align: 'left',
  },
  {
    title: "质押证券代码",
    key: "secCode",
    width: 200,
    align: 'left',
  },
  {
    title: "质押证券简称",
    key: "secName",
    width: 200,
    align: 'left',
  },
  {
    title: "待购回余额（亿元）",
    key: "unmatureAmt",
    width: 200,
    align: 'right',
  }
];

let columns3 = [
  {
    title: "排名序号",
    key: "rankId",
    width: 99,
    align: 'center'
  },
  {
    title: "证券代码",
    key: "secCode",
    width: 200,
    align: 'left'
  },
  {
    title: "证券简称",
    key: "secName",
    width: 500,
    align: 'left'
  },
  {
    title: "质押集中度（%）",
    key: "tradeRatio",
    width: 200,
    align: 'right'
  }
];

let columns4 = [
  {
    title: "排名",
    key: "rankId",
    width: 99,
    align: 'center'
  },
  {
    title: "券商名称",
    key: "memFullName",
    width: 600,
    align: 'left'
  },
  {
    title: "待购回余额（亿元）",
    key: "unmatureAmt",
    width: 300,
    align: 'right'
  }
];

let columns5 = [
  {
    title: "融资方身份",
    key: "statTypeName",
    width: 400,
    align: 'left'
  },
  {
    title: "人数",
    key: "acctCnt",
    width: 199,
    align: 'right'
  },
  {
    title: "待购回金额（亿元）",
    key: "unmatureAmt",
    width: 400,
    align: 'right'
  }
];

let columns6 = [
  {
    title: "交易日期",
    key: "dataDate",
    width: 333,
    align: 'center'
  },
  {
    title: "初始交易金额（亿元）",
    key: "tradeAmt",
    width: 333,
    align: 'right'
  },
  {
    title: "购回交易金额（亿元）",
    key: "repurAmt",
    width: 333,
    align: 'right'
  }
];

export {columns1, columns2, columns3, columns4, columns5, columns6};
