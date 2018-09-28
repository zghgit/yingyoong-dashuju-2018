<template>
  <section class="constWidth">
    <h1> 大数据导航索引</h1>
    <h2>一期：</h2>
    <div class="box">
      <div class="box-item"><a :href="url1" target="_blank" title="交易营业部变更">交易营业部变更</a></div>
      <div class="box-item"><a :href="url2" target="_blank" title="账面盈利计算">账面盈利计算</a></div>
      <div class="box-item"><a :href="url3" target="_blank" title="先进先出">先进先出</a></div>
      <div class="box-item"><a :href="url4" target="_blank" title="庄股协查指标">庄股协查指标</a></div>
      <div class="box-item"><a :href="url5" target="_blank" title="期权投资者">期权投资者</a></div>
      <div class="box-item"><a :href="url6" target="_blank" title="两组账户对倒">两组账户对倒</a></div>
    </div>
    <div class="box">
      <div class="box-item"><a :href="url7" target="_blank" title="可疑对象分析">可疑对象分析</a></div>
      <div class="box-item"><a :href="url8" target="_blank" title="账户证券交易情况查询">账户证券交易情况查询</a></div>
      <div class="box-item"><a :href="url9" target="_blank" title="成交明细及对手方信息">成交明细及对手方信息</a></div>
      <div class="box-item"><a :href="url10" target="_blank" title="股票质押式回购交易业务日报下载">股票质押式回购交易业务日报下载</a></div>
      <div class="box-item"><a :href="url11" target="_blank" title="一码通关联帐户查询">一码通关联帐户查询</a></div>
      <div class="box-item"><a :href="url12" target="_blank" title="债券持仓明细">债券持仓明细</a></div>
    </div>
    <h2>三月份：</h2>
    <div class="box">
      <div class="box-item"><a :href="url13" target="_blank" title="股票质押回购违约处置明细">股票质押回购违约处置明细</a></div>
      <div class="box-item"><a :href="url14" target="_blank" title="股票质押回购待购回明细">股票质押回购待购回明细</a></div>
      <div class="box-item"><a :href="url15" target="_blank" title="股票质押回购交易概况统计">股票质押回购交易概况统计</a></div>
      <div class="box-item"><a :href="url16" target="_blank" title="股票质押回购交易期限统计">股票质押回购交易期限统计</a></div>
      <div class="box-item"><a :href="url17" target="_blank" title="股票质押回购待购回统计">股票质押回购待购回统计</a></div>
      <div class="box-item"><a :href="url18" target="_blank" title="会员股票质押式回购交易信息报送初始交易报表">会员股票质押式回购交易信息报送初始交易报表</a>
      </div>
    </div>
    <div class="box">
      <div class="box-item"><a :href="url19" target="_blank"
                               title="会员股票质押式回购交易信息报送比对校验（初始交易）">会员股票质押式回购交易信息报送比对校验（初始交易）</a></div>
      <div class="box-item"><a :href="url20" target="_blank"
                               title="会员股票质押式回购交易信息报送比对校验(补充质押)">会员股票质押式回购交易信息报送比对校验(补充质押)</a></div>
      <div class="box-item"><a :href="url21" target="_blank" title="董监高及持股5%以上股东股票质押回购待购回统计（一码通账户）">董监高及持股5%以上股东股票质押回购待购回统计（一码通账户）</a>
      </div>
      <div class="box-item"><a :href="url22" target="_blank" title="股票质押利率数据上传">股票质押利率数据上传</a></div>


      <div class="box-item"><a :href="url24" target="_blank" title="主要券商一天期品种每日报价回购加权平均利率查询">主要券商一天期品种每日报价回购加权平均利率查询</a>
      </div>
      <div class="box-item"><a :href="url25" target="_blank" title="每日报价回购期末未到期余额查询">每日报价回购期末未到期余额查询</a></div>
      <!--<div class="box-item"><a :href="url26" target="_blank" title="融资融券标的清单">融资融券标的清单</a></div>-->

    </div>
    <div class="box">
      <!--<div class="box-item"><a :href="url27" target="_blank" title="融资融券担保品清单">融资融券担保品清单</a></div>-->
      <div class="box-item"><a :href="url23" target="_blank" title="IPO可参与申购户数查询">IPO可参与申购户数查询</a></div>
      <div class="box-item"><a :href="url28" target="_blank" title="上市证券交易异常波动确认单">上市证券交易异常波动确认单</a></div>
      <!--<div class="box-item"><a :href="url29" target="_blank" title="融资融券个股余额情况">融资融券个股余额情况</a></div>-->
      <div class="box-item"><a :href="url30" target="_blank" title="期权经手费比对(生产)">期权经手费比对(生产)</a></div>
      <div class="box-item"><a :href="url31" target="_blank" title="交易单元申报笔数">交易单元申报笔数</a></div>
    </div>
    <div class="box">
      <div class="box-item"><a :href="url32" target="_blank" title="股票退市市场指标计算">股票退市市场指标计算</a></div>
      <div class="box-item"><a :href="url33" target="_blank" title="会员股票质押式回购交易信息报送盯市报表">会员股票质押式回购交易信息报送盯市报表</a></div>
      <!--<div class="box-item"><a :href="url34" target="_blank" title="融资融券标的信用交易情况">融资融券标的信用交易情况</a></div>-->
      <div class="box-item"><a :href="url35" target="_blank" title="报价回购质押券明细查询–按单个质押券查询">报价回购质押券明细查询–按单个质押券查询</a></div>
      <div class="box-item"><a :href="url36" target="_blank" title="指定PBU被使用历史情况">指定PBU被使用历史情况</a></div>
      <div class="box-item"><a :href="url37" target="_blank" title="每日报价回购成交金额类型分布报表">每日报价回购成交金额类型分布报表</a></div>
    </div>
    <div class="box">
      <div class="box-item"><a :href="url38" target="_blank" title="报价回购区间交易概况报表">报价回购区间交易概况报表</a></div>
      <div class="box-item"><a :href="url39" target="_blank" title="董监高及持股5%以上股东股票质押回购待购回统计">董监高及持股5%以上股东股票质押回购待购回统计</a>
      </div>
      <div class="box-item"><a :href="url40" target="_blank" title="债券市场概况">债券市场概况</a></div>
      <div class="box-item"><a :href="url41" target="_blank" title="股票质押回购初始交易明细">股票质押回购初始交易明细</a></div>
      <!--<div class="box-item"><a :href="url42" target="_blank" title="市场概貌">市场概貌</a></div>-->
      <div class="box-item"><a :href="url43" target="_blank" title="股票质押式回购交易业务月报下载">股票质押式回购交易业务月报下载</a></div>
    </div>
    <h2>四月份</h2>
    <div class="box" v-for="itemArr in time3">
      <div class="box-item" v-for="item in itemArr">
        <b>{{item.code}}</b><br>
        <a :href="item.url" target="_blank" :title="item.title">{{item.title}}</a>
      </div>
    </div>
    <h2>五月份</h2>
    <div class="box" v-for="itemArr in time4">
      <div class="box-item" v-for="item in itemArr">
        <b>{{item.code}}</b><br>
        <a :href="item.url" target="_blank" :title="item.title">{{item.title}}</a>
      </div>
    </div>
    <!--<h2>第四批</h2>-->
    <div class="box" v-for="itemArr in time5">
      <div class="box-item" v-for="item in itemArr">
        <b>{{item.code}}</b><br>
        <a :href="item.url" target="_blank" :title="item.title">{{item.title}}</a>
      </div>
    </div>
    <div class="box" v-for="itemArr in time6">
      <div class="box-item" v-for="item in itemArr">
        <b>{{item.code}}</b><br>
        <a :href="item.url" target="_blank" :title="item.title">{{item.title}}</a>
      </div>
    </div>
    <h2>六月份</h2>
    <div class="box" v-for="itemArr in time7">
      <div class="box-item" v-for="item in itemArr">
        <b>{{item.code}}</b><br>
        <a :href="item.url" target="_blank" :title="item.title">{{item.title}}</a>
      </div>
    </div>
    <h2>修改一期</h2>
    <div class="box" v-for="itemArr in time8">
      <div class="box-item" v-for="item in itemArr">
        <b>{{item.code}}</b><br>
        <a :href="item.url" target="_blank" :title="item.title">{{item.title}}</a>
      </div>
    </div>
  </section>
</template>
<script>
  import {
    urlParams,
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    getUrlParams,
    validNum
  } from '../assets/js/commen.js';
  import {time3, time4, time5, time6, time7, time8} from '../assets/js/homeListData.js'

  export default {
    data() {
      return {
        url: window.location.url,
        hostname: window.location.hostname,
        Authorization: AuthorizationA,
        signature: signatureA,
        srcUserid: srcUseridA,
        srcUsername: srcUsernameA,
        dwSessionid: dwSessionidA,
        time3: time3,
        time4: time4,
        time5: time5,
        time6: time6,
        time7: time7,
        time8: time8,
      }
    },
    mounted() {
      var str = new Date().format('yyyy')

    },
    computed: {
      url1() {
        return `#/searchChange?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url2() {
        return `#/searchProfitCal?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url3() {
        return `#/searchInoutCal?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`

      },
      url4() {
        return `#/queryIndex?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url5() {
        return `#/searchOption?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url6() {
        return `#/accountReversal?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url7() {
        return `#/objectAnalysis?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url8() {
        return `#/searchDeal?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url9() {
        return `#/searchInfo?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url10() {
        return `#/searchDaily?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url11() {
        return `#/searchAccount?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url12() {
        return `#/searchPosition?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url13() {
        return `#/GDH_00003?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url14() {
        return `#/GDH_00004?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url15() {
        return `#/GDH_00005?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url16() {
        return `#/GDH_00009?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url17() {
        return `#/GDH_00011?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url18() {
        return `#/GDH_00015?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url19() {
        return `#/GDH_00016?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url20() {
        return `#/GDH_00018?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url21() {
        return `#/GDH_00019?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url22() {
        return `#/HYB_00042?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url23() {
        return `#/IPO_00029?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url24() {
        return `#/BND_15033?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url25() {
        return `#/BND_15034?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url26() {
        return `#/FTS_00012?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url27() {
        return `#/FTS_00013?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url28() {
        return `#/MKT_13080?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url29() {
        return `#/MTSL_00058?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url30() {
        return `#/OPT_60023?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url31() {
        return `#/MEM_24060?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url32() {
        return `#/RSK_12080?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url33() {
        return `#/GDH_00014?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url34() {
        return `#/MTSL_00061?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url35() {
        return `#/ZJB_60058?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url36() {
        return `#/INF_02030?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url37() {
        return `#/BND_15016?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url38() {
        return `#/BND_15019?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url39() {
        return `#/GDH_00010?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url40() {
        return `#/ZJB_61018?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url41() {
        return `#/GDH_00001?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url42() {
        return `#/SSE_00010?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      },
      url43() {
        return `#/GDH_00013?signature=${this.signature}&srcUserid=${this.srcUserid}&srcUsername=${this.srcUsername}&dwSessionid=${this.dwSessionid}&Authorization=${this.Authorization}`
      }
    }
  }

</script>
<style scope>
  .box {
    background-color: white;
    margin: 0 0 55px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .box-item {
    width: 200px;
    height: 100px;
    /*line-height: 200px;*/
    vertical-allign: middle;
    margin: 5px;
    background-color: #ffd200;
    font-size: 8px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .box-item b {
    font-size: 12px;
    color: #000;
  }

  .box-item a {
    text-align: center;
    font-size: 12px;
    display: inline-block;
    width: 100%;
  }

  .bg-pink {
    background-color: pink;
  }

  .tx-c {
    text-align: center;
  }
</style>
