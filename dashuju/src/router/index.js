import Vue from 'vue'
import Router from 'vue-router'
/*import SearchInfo from '@/views/searchInfo'
import SearchDeal from '@/views/searchDeal'
import ShowInfo1 from '@/views/showInfo1'
import ShowInfo2 from '@/views/showInfo2'
import SearchChange from '@/views/searchChange'
import SearchProfitCal from '@/views/searchProfitCal'
import SearchInoutCal from '@/views/searchInoutCal'
import QueryIndex from '@/views/queryIndex'
import SearchOption from '@/views/searchOption'
import AccountReversal from '@/views/accountReversal'
import ObjectAnalysis from '@/views/objectAnalysis'*/
import commonNextPage from '@/views/commonNextPage'
import MKT_13080_print from '@/views/MKT_13080_print'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      //name: 'SearchInfo',
      component: resolve => require(['@/views/home'],resolve)
    },
    {
      path: '/searchInfo',
      //name: 'SearchInfo',
      component: resolve => require(['@/views/searchInfo'],resolve)
    },
    {
      path: '/searchDeal',
      //name: 'SearchDeal',
      component: resolve => require(['@/views/searchDeal'],resolve)
    },

    {
      path: '/searchChange',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchChange'],resolve)
    },
    {
      path: '/searchProfitCal',
      //name: 'SearchProfitCal',
      component: resolve => require(['@/views/searchProfitCal'],resolve)
    },
    {
      path: '/searchInoutCal',
      //name: 'SearchInoutCal',
      component: resolve => require(['@/views/searchInoutCal'],resolve)
    },
    {
      path: '/queryIndex',
      //name: 'QueryIndex',
      component: resolve => require(['@/views/queryIndex'],resolve)
    },
    {
      path: '/searchOption',
      //name: 'SearchOption',
      component: resolve => require(['@/views/searchOption'],resolve)
    },
    {
      path: '/accountReversal',
      //name: 'AccountReversal',
      component: resolve => require(['@/views/accountReversal'],resolve)
    },
    {
      path: '/objectAnalysis',
      //name: 'ObjectAnalysis',
      component: resolve => require(['@/views/objectAnalysis'],resolve)
    },
    {
      path: '/searchDaily',
      //name: 'searchDaily',
      component: resolve => require(['@/views/searchDaily'],resolve)
    },
    {
      path: '/searchAccount',
      //name: 'searchAccount',
      component: resolve => require(['@/views/searchAccount'],resolve)
    },
    {
      path: '/searchPosition',
      //name: 'searchPosition',
      component: resolve => require(['@/views/searchPosition'],resolve)
    },
    {
      path: '/GDH_00003',
      //name: 'searchDaily',
      component: resolve => require(['@/views/GDH_00003'],resolve)
    },
    {
      path: '/GDH_00004',
      //name: 'searchAccount',
      component: resolve => require(['@/views/GDH_00004'],resolve)
    },
    {
      path: '/GDH_00005',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00005'],resolve)
    },
    {
      path: '/GDH_00009',
      //name: 'searchDaily',
      component: resolve => require(['@/views/GDH_00009'],resolve)
    },
    {
      path: '/GDH_00011',
      //name: 'searchAccount',
      component: resolve => require(['@/views/GDH_00011'],resolve)
    },
    {
      path: '/GDH_00015',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00015'],resolve)
    },
    {
      path: '/GDH_00016',
      //name: 'searchDaily',
      component: resolve => require(['@/views/GDH_00016'],resolve)
    },
    {
      path: '/GDH_00018',
      //name: 'searchAccount',
      component: resolve => require(['@/views/GDH_00018'],resolve)
    },
    {
      path: '/GDH_00019',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00019'],resolve)
    },
    {
      path: '/HYB_00042',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00042'],resolve)
    },
    {
      path: '/IPO_00029',
      //name: 'searchPosition',
      component: resolve => require(['@/views/IPO_00029'],resolve)
    },
    {
      path: '/BND_15033',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15033'],resolve)
    },
    {
      path: '/BND_15034',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15034'],resolve)
    },
    {
      path: '/FTS_00012',
      //name: 'searchPosition',
      component: resolve => require(['@/views/FTS_00012'],resolve)
    },
    {
      path: '/FTS_00013',
      //name: 'searchPosition',
      component: resolve => require(['@/views/FTS_00013'],resolve)
    },
    {
      path: '/MKT_13080',
      //name: 'searchPosition',
      component: resolve => require(['@/views/MKT_13080'],resolve)
    },
    {
      path: '/MTSL_00058',
      //name: 'searchPosition',
      component: resolve => require(['@/views/MTSL_00058'],resolve)
    },
    {
      path: '/OPT_60023',
      //name: 'searchPosition',
      component: resolve => require(['@/views/OPT_60023'],resolve)
    },
    {
      path: '/MEM_24060',
      //name: 'searchPosition',
      component: resolve => require(['@/views/MEM_24060'],resolve)
    },
    {
      path: '/RSK_12080',
      //name: 'searchPosition',
      component: resolve => require(['@/views/RSK_12080'],resolve)
    },
    {
      path: '/GDH_00014',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00014'],resolve)
    },
    {
      path: '/MTSL_00061',
      //name: 'searchPosition',
      component: resolve => require(['@/views/MTSL_00061'],resolve)
    },
    {
      path: '/ZJB_60058',
      //name: 'searchPosition',
      component: resolve => require(['@/views/ZJB_60058'],resolve)
    },
    {
      path: '/INF_02030',
      //name: 'searchPosition',
      component: resolve => require(['@/views/INF_02030'],resolve)
    },
    {
      path: '/BND_15016',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15016'],resolve)
    },
    {
      path: '/BND_15019',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15019'],resolve)
    },
    {
      path: '/GDH_00010',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00010'],resolve)
    },
    {
      path: '/ZJB_61018',
      //name: 'searchPosition',
      component: resolve => require(['@/views/ZJB_61018'],resolve)
    },
    {
      path: '/GDH_00001',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00001'],resolve)
    },
    {
      path: '/SSE_00010',
      //name: 'searchPosition',
      component: resolve => require(['@/views/SSE_00010'],resolve)
    },
    {
      path: '/GDH_00013',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00013'],resolve)
    },

    {
      path: '/BND_15013',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15013'],resolve)
    },
    {
      path: '/BND_15020',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15020'],resolve)
    },
    {
      path: '/BND_15014',
      //name: 'searchPosition',
      component: resolve => require(['@/views/BND_15014'],resolve)
    },
    {
      path: '/GDH_00002',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00002'],resolve)
    },
    {
      path: '/GDH_00006',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00006'],resolve)
    },
    {
      path: '/GDH_00007',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00007'],resolve)
    },
    {
      path: '/GDH_00008',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00008'],resolve)
    },
    {
      path: '/GDH_00012',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00012'],resolve)
    },
    {
      path: '/GDH_00017',
      //name: 'searchPosition',
      component: resolve => require(['@/views/GDH_00017'],resolve)
    },
    {
      path: '/HYB_00033',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00033'],resolve)
    },
    {
      path: '/HYB_00034',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00034'],resolve)
    },
    {
      path: '/HYB_00037',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00037'],resolve)
    },
    {
      path: '/HYB_00038',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00038'],resolve)
    },
    {
      path: '/HYB_00039',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00039'],resolve)
    },  {
      path: '/HYB_00044',
      //name: 'searchPosition',
      component: resolve => require(['@/views/HYB_00044'],resolve)
    },
    {
      path: '/HYB_00044_Operation_Detail',
      // name: 'HYB_00044_Operation_Detail',
      component: resolve => require(['@/views/HYB_00044_Operation_Detail'],resolve)
    },

    {
      path: '/ZJB_60057',
      component: resolve => require(['@/views/ZJB_60057'],resolve)
    },
    {
      path: '/OPT_60034',
      component: resolve => require(['@/views/OPT_60034'],resolve)
    },
    {
      path: '/OPT_60025',
      component: resolve => require(['@/views/OPT_60025'],resolve)
    },
    {
      path: '/MEM_24090',
      component: resolve => require(['@/views/MEM_24090'],resolve)
    },
    {
      path: '/MEM_24070',
      component: resolve => require(['@/views/MEM_24070'],resolve)
    },
    {
      path: '/HYB_00036',
      component: resolve => require(['@/views/HYB_00036'],resolve)
    },
    {
      path: '/HGT_00003',
      component: resolve => require(['@/views/HGT_00003'],resolve)
    },
    {
      path: '/BND_15015',
      component: resolve => require(['@/views/BND_15015'],resolve)
    },
    {
      path: '/SYS_31053',
      component: resolve => require(['@/views/SYS_31053'],resolve)
    },
    {
      path: '/RSK_12081',
      component: resolve => require(['@/views/RSK_12081'],resolve)
    },
    {
      path: '/RSK_12082',
      component: resolve => require(['@/views/RSK_12082'],resolve)
    },
    {
      path: '/SLB_00007',
      component: resolve => require(['@/views/SLB_00007'],resolve)
    },
    {
      path: '/SYS_31052',
      component: resolve => require(['@/views/SYS_31052'],resolve)
    },
    {
      path: '/HGT_00002',
      component: resolve => require(['@/views/HGT_00002'],resolve)
    },
    {
      path: '/HYB_00030',
      component: resolve => require(['@/views/HYB_00030'],resolve)
    },
    {
      path: '/HYB_00031',
      component: resolve => require(['@/views/HYB_00031'],resolve)
    },
    {
      path: '/HYB_00035',
      component: resolve => require(['@/views/HYB_00035'],resolve)
    },
    {
      path: '/HYB_00040',
      component: resolve => require(['@/views/HYB_00040'],resolve)
    },
    {
      path: '/SYS_31051',
      component: resolve => require(['@/views/SYS_31051'],resolve)
    },
    {
      path: '/MEM_24050',
      component: resolve => require(['@/views/MEM_24050'],resolve)
    },
    {
      path: '/SLB_00006',
      component: resolve => require(['@/views/SLB_00006'],resolve)
    },
    {
      path: '/GDH_00020',
      component: resolve => require(['@/views/GDH_00020'],resolve)
    },
    {
      path: '/ZJB_60065',
      component: resolve => require(['@/views/ZJB_60065'],resolve)
    },
    {
      path: '/MKT_13100',
      component: resolve => require(['@/views/MKT_13100'],resolve)
    },
    {
      path: '/SSE_00020',
      component: resolve => require(['@/views/SSE_00020'],resolve)
    },
    {
      path: '/SSEM_10009',
      component: resolve => require(['@/views/SSEM_10009'],resolve)
    },
    {
      path: '/SSEM_10016',
      component: resolve => require(['@/views/SSEM_10016'],resolve)
    },
    {
      path: '/ZJB_60074',
      component: resolve => require(['@/views/ZJB_60074'],resolve)
    },
    {
      path: '/SSE_20003',
      component: resolve => require(['@/views/SSE_20003_new'],resolve)
    },
    {
      path: '/SSE_20003_detail',
      component: resolve => require(['@/views/SSE_20003_detail'],resolve)
    },
    {
      path: '/SSE_20004',
      component: resolve => require(['@/views/SSE_20004_new'],resolve)
    }, {
      path: '/SSE_20004_detail',
      component: resolve => require(['@/views/SSE_20004_detail'],resolve)
    },
    {
      path: '/BND_15001',
      component: resolve => require(['@/views/BND_15001'],resolve)
    },
    {
      path: '/BND_15002',
      component: resolve => require(['@/views/BND_15002'],resolve)
    },
    {
      path: '/BND_15018',
      component: resolve => require(['@/views/BND_15018'],resolve)
    },
    {
      path: '/BND_15021',
      component: resolve => require(['@/views/BND_15021'],resolve)
    },
    {
      path: '/BND_15022',
      component: resolve => require(['@/views/BND_15022'],resolve)
    },
    {
      path: '/BND_15023',
      component: resolve => require(['@/views/BND_15023'],resolve)
    },
    {
      path: '/ACT_00002',
      component: resolve => require(['@/views/ACT_00002'],resolve)
    },
    {
      path: '/AFS_00003',
      component: resolve => require(['@/views/AFS_00003'],resolve)
    },
    {
      path: '/SSE_20001',
      component: resolve => require(['@/views/SSE_20001_new'],resolve)
    }, {
      path: '/SSE_20001_detail',
      component: resolve => require(['@/views/SSE_20001_detail'],resolve)
    },
    {
      path: '/SSE_20002',
      component: resolve => require(['@/views/SSE_20002'],resolve)
    },
    {
      path: '/SSE_20002_day',
      component: resolve => require(['@/views/SSE_20002_day'],resolve)
    },{
      path: '/SSE_20002_month',
      component: resolve => require(['@/views/SSE_20002_month'],resolve)
    },{
      path: '/SSE_20002_year',
      component: resolve => require(['@/views/SSE_20002_year'],resolve)
    },
    {
      path: '/MTSL_00002',
      component: resolve => require(['@/views/MTSL_00002'],resolve)
    },
    {
      path: '/MTSL_00003',
      component: resolve => require(['@/views/MTSL_00003'],resolve)
    },
    {
      path: '/MTSL_00003_detail',
      component: resolve => require(['@/views/MTSL_00003_detail'],resolve)
    },
    {
      path: '/MTSL_00004',
      component: resolve => require(['@/views/MTSL_00004'],resolve)
    },
    {
      path: '/MTSL_00005',
      component: resolve => require(['@/views/MTSL_00005'],resolve)
    },
    {
      path: '/MTSL_00005_day',
      component: resolve => require(['@/views/MTSL_00005_day'],resolve)
    },{
      path: '/MTSL_00005_month',
      component: resolve => require(['@/views/MTSL_00005_month'],resolve)
    },{
      path: '/MTSL_00005_year',
      component: resolve => require(['@/views/MTSL_00005_year'],resolve)
    },{
      path: '/MTSL_00005_coupon',
      component: resolve => require(['@/views/MTSL_00005_coupon'],resolve)
    },{
      path: '/MTSL_00005_member',
      component: resolve => require(['@/views/MTSL_00005_member'],resolve)
    },
    {
      path: '/MTSL_00006',
      component: resolve => require(['@/views/MTSL_00006'],resolve)
    },
    {
      path: '/MTSL_00008',
      component: resolve => require(['@/views/MTSL_00008'],resolve)
    },
    {
      path: '/MTSL_00010',
      component: resolve => require(['@/views/MTSL_00010'],resolve)
    },{
      path: '/MTSL_00010_day',
      component: resolve => require(['@/views/MTSL_00010_day'],resolve)
    },{
      path: '/MTSL_00010_month',
      component: resolve => require(['@/views/MTSL_00010_month'],resolve)
    },{
      path: '/MTSL_00010_year',
      component: resolve => require(['@/views/MTSL_00010_year'],resolve)
    },
    {
      path: '/MTSL_00004_detail',
      component: resolve => require(['@/views/MTSL_00004_detail'],resolve)
    },
    {
      path: '/MTSL_00004_report',
      component: resolve => require(['@/views/MTSL_00004_report'],resolve)
    },
    {
      path: '/MTSL_00009_detail',
      component: resolve => require(['@/views/MTSL_00009_detail'],resolve)
    },
    {
      path: '/MTSL_00009_report',
      component: resolve => require(['@/views/MTSL_00009_report'],resolve)
    },
    {
      path: '/MTSL_00009',
      component: resolve => require(['@/views/MTSL_00009'],resolve)
    },{
      path: '/MTSL_00007',
      component: resolve => require(['@/views/MTSL_00007'],resolve)
    },{
      path: '/MTSL_00007_member',
      component: resolve => require(['@/views/MTSL_00007_member'],resolve)
    },{
      path: '/MTSL_00007_date',
      component: resolve => require(['@/views/MTSL_00007_date'],resolve)
    },{
      path: '/MTSL_00056',
      component: resolve => require(['@/views/MTSL_00056'],resolve)
    },{
      path: '/MTSL_00040',
      component: resolve => require(['@/views/MTSL_00040'],resolve)
    },{
      path: '/MTSL_00060',
      component: resolve => require(['@/views/MTSL_00060'],resolve)
    },{
      path: '/searchOption_new',
      component: resolve => require(['@/views/searchOption_new'],resolve)
    },{
      path: '/accountReversal_new',
      component: resolve => require(['@/views/accountReversal_new'],resolve)
    },{
      path: '/objectAnalysis_new',
      component: resolve => require(['@/views/objectAnalysis_new'],resolve)
    },{
      path: '/searchDeal_new',
      component: resolve => require(['@/views/searchDeal_new'],resolve)
    },{
      path: '/searchChange_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchChange_new'],resolve)
    },{
      path: '/searchProfitCal_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchProfitCal_new'],resolve)
    },{
      path: '/searchInoutCal_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchInoutCal_new'],resolve)
    },{
      path: '/queryIndex_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/queryIndex_new'],resolve)
    },
    // *************************
    {
      path: '/searchInfo_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchInfo_new'],resolve)
    },
    {
      path: '/searchDaily_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchDaily_new'],resolve)
    },
    {
      path: '/searchPosition_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchPosition_new'],resolve)
    },
    {
      path: '/searchAccount_new',
      //name: 'SearchChange',
      component: resolve => require(['@/views/searchAccount_new'],resolve)
    },
    {
      path: '/demandQuery',
      //name: 'SearchChange',
      component: resolve => require(['@/views/demandQuery'],resolve)
    },

    {
      path: '/MKT_13080_print',
      //name: 'SearchChange',
      component: resolve => require(['@/views/MKT_13080_print'],resolve)
    },
    {
      path: '/commonNextPage',
      //name: 'SearchChange',
      component: commonNextPage
    },
  ]
})

