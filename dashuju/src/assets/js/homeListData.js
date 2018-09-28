import {
  signatureA,
  srcUsernameA,
  srcUseridA,
  AuthorizationA,
  dwSessionidA,
} from './commen.js';
var time3 = [
  [
    {
    code: 'BND_15013',
    title: '每日开盘前报价回购额度报表'
  },
    {
      code: 'BND_15020',
      title: '报价回购区间价格统计报表'
    },
    {
      code: 'BND_15014',
      title: '报价回购闭市后可用额度'
    },
    {
      code: 'GDH_00002',
      title: '股票质押回购购回交易明细'
    },
    {
      code: 'GDH_00006',
      title: '股票质押回购品种统计'
    },
    {
      code: 'GDH_00007',
      title: '股票质押回购资金使用统计'
    }],
  [{
    code: 'GDH_00008',
    title: '股票质押回购交易集中度'
  },
    {
      code: 'GDH_00012',
      title: '股票质押回购业务周报'
    },
    {
      code: 'GDH_00017',
      title: '股票质押回购待购回统计（预估）'
    },
    {
      code: 'HYB_00033',
      title: '约定购回及股票质押业务资金融入方结构'
    },
    {
      code: 'HYB_00034',
      title: '约定购回及股票质押业务期间初始交易平均利率'
    },
    {
      code: 'HYB_00037',
      title: '约定购回及股票质押业务初始交易回购期限分布'
    }],
  [{
    code: 'HYB_00038',
    title: '约定购回及股票质押业务期间初始交易质押率'
  },
    {
      code: 'HYB_00039',
      title: '约定购回及股票质押业务单一证券回购余额与过去30交易日成交额比值'
    },

    ],

    [{
      code: 'RSK_12081',
      title: '风险周报_证券全天停牌'
    },
      {
      code: 'RSK_12082',
      title: '风险周报_证券日内停牌'
    },
      {
      code: 'SLB_00007',
      title: '转融通月报下载'
    },
      {
      code: 'SYS_31051',
      title: '交易系统代码维护'
    },
     {
      code: 'SYS_31052',
      title: '交易系统代码管理月报下载'
    },
     {
      code: 'SYS_31053',
      title: '交易代码使用情况查询'
    }],
     [{
      code: 'BND_15015',
      title: '每日报价回购各品种成交价格分布表'
    },
     {
      code: 'HGT_00003',
      title: '会员公司港股通订单路由费预估'
    },
     {
      code: 'HYB_00036',
      title: '股票质押业务按资管产品出资计算履约保障比例'
    },
     {
      code: 'MEM_24070',
      title: '交易单元使用费'
    },
     {
      code: 'MEM_24090',
      title: '交易单元流速费'
    },
     {
      code: 'OPT_60025',
      title: '期权经营机构交易经手费(生产)'
    }],
     [{
      code: 'OPT_60034',
      title: '期权业务申报笔数统计'
    },
     {
      code: 'ZJB_60057',
      title: '报价回购质押券明细查询–按单个会员查询'
    },
    ]
]
var time4 = [
  [
    {
      code: 'HGT_00002',
      title: '沪股通港盛公司每月预估交易单元费（含年费、流量费、流速费）'
    },
    {
      code: 'HYB_00030',
      title: '约定购回及股票质押业务按融入方计算履约保障比例'
    },
    {
      code: 'HYB_00031',
      title: '约定购回及股票质押业务持股5%以上股东及董监高履约保障比例'
    },
    {
      code: 'HYB_00035',
      title: '约定购回及股票质押业务按自营出资计算履约保障比例'
    },
    {
      code: 'HYB_00040',
      title: '约定购回及股票质押业务单一证券集中度'
    },
    {
      code: 'MEM_24050',
      title: '会员公司每月预估年费'
    },
  ],
  [
    {
      code: 'SLB_00006',
      title: '转融通证券出借交易账户校验'
    },
    {
      code: 'GDH_00020',
      title: '股票质押回购交易业务日报下载'
    },
    {
      code: 'ZJB_60065',
      title: '债券投资人持仓信息'
    },
    {
      code: 'MKT_13100',
      title: '上海行情基本历史数据导出'
    },
    {
      code: 'SSE_00020',
      title: '股票概貌'
    },
    {
      code: 'SSEM_10009',
      title: '上市公司股本结构'
    }
  ],
  [
    {
      code: 'SSEM_10016',
      title: '会员交易'
    },
    {
      code: 'ZJB_60074',
      title: '风险月报评级下调名单预警'
    },
    {
      code: 'SSE_20003',
      title: '开户情况'
    },
    {
      code: 'SSE_20004',
      title: '市场筹融资统计'
    },
    {
      code: 'SSE_20001',
      title: '市场概貌'
    },
    {
      code: 'HYB_00044',
      title: '股票质押业务场外质押数据上传'
    }
  ]
]
var time5 = [
  [
  {
    code: 'BND_15001',
    title: '报价回购简报查询'
  },{
    code: 'BND_15002',
    title: '报价回购营业部成交简报'
  },{
    code: 'BND_15018',
    title: '各报价回购试点会员交易明细报表'
  },{
    code: 'BND_15021',
    title: '报价回购各品种区间成交金额、未到期余额统计表'
  },{
    code: 'BND_15022',
    title: '报价回购扩大试点每日简报'
  },{
    code: 'BND_15023',
    title: '报价回购阶段报表'
  }]
]
var time6 = [
  [{
    code: 'ACT_00002',
    title: 'A股账户数量统计（按持仓）'
  },{
    code: 'AFS_00003',
    title: '证监会行业资金流向'
  },{
    code: 'SSE_20002',
    title: '指数行情'
  }
  ]
]



var time7 = [
  [{
    code: 'MTSL_00002',
    title: '融资融券概貌'
  },{
    code: 'MTSL_00003',
    title: '融资融券信用交易'
  },{
    code: 'MTSL_00004',
    title: '融资融券担保品'
  },{
    code: 'MTSL_00005',
    title: '融资融券余额余量'
  },
    {
      code: 'MTSL_00006',
      title: '融资融券标的清单'
    }, {
    code: 'MTSL_00008',
    title: '融资融券个券风险'
  },{
    code: 'MTSL_00010',
    title: '融资融券账户情况'
  }, {
    code: 'MTSL_00009',
    title: '融资融券违约情况'
  }, {
    code: 'MTSL_00007',
    title: '融资融券风险情况'
  }, {
    code: 'MTSL_00056',
    title: '融资融券信用账户分析'
  } ,{
    code: 'MTSL_00040',
    title: '融资融券交易业务动态周报下载'
  }, {
    code: 'MTSL_00060',
    title: '融资融券标的证券概况'
  },{
    code: 'searchChange_new',
    title: '交易营业部变更'
  },{
    code: 'searchProfitCal_new',
    title: '账面盈利计算'
  },{
    code: 'searchInoutCal_new',
    title: '先进先出'
  },{
    code: 'queryIndex_new',
    title: '庄股协查指标查询'
  },{
    code: 'demandQuery',
    title: '质押式回购日内特定时间段供需情况查询'
  }
  ]
]

var time8 = [
  [{
    code: 'searchOption_new',
    title: '期权投资者'
  },{
    code: 'accountReversal_new',
    title: '两组账户对倒'
  },{
    code: 'objectAnalysis_new',
    title: '可疑对象分析'
  },{
    code: 'searchDeal_new',
    title: '账户证券交易情况查询'
  },
    {
      code: 'searchInfo_new',
      title: '成交明细及对手方信息 '
    },{
    code: 'searchDaily_new',
    title: '股票质押式回购交易业务日报下载'
  },{
    code: 'searchAccount_new',
    title: '一码通关联帐户查询'
  },{
    code: 'searchPosition_new',
    title: '债券持仓明细'
  }]
]
time3.forEach((itemArr,index)=>{
  itemArr.forEach((item,index)=>{
    item.url = '#/'+item.code+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA
  })
})
time4.forEach((itemArr,index)=>{
  itemArr.forEach((item,index)=>{
    item.url = '#/'+item.code+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA
  })
})
time5.forEach((itemArr,index)=>{
  itemArr.forEach((item,index)=>{
    item.url = '#/'+item.code+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA
  })
})
time6.forEach((itemArr,index)=>{
  itemArr.forEach((item,index)=>{
    item.url = '#/'+item.code+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA
  })
})
time7.forEach((itemArr,index)=>{
  itemArr.forEach((item,index)=>{
    item.url = '#/'+item.code+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA
  })
})
time8.forEach((itemArr,index)=>{
  itemArr.forEach((item,index)=>{
    item.url = '#/'+item.code+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA
  })
})
export {time3,time4,time5,time6,time7,time8}
