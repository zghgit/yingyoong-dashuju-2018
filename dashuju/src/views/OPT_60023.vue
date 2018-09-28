<template>
  <section class="constWidth" id="opt60023">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>期权经手费比对(生产)
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i
            :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <div>
                <Form-item label="日期类型">
                  <Select v-model="currentSelectType">
                    <Option v-for="(item,index) in selectTypeList" :value="index" :key="item" :label="item"></Option>
                  </Select>
                </Form-item>
              </div>
              <div v-if="currentSelectType == 0">
                <Form-item prop="searchDate" id="searchDateForm" label="选择日期">
                  <Date-picker id="searchDate" type="date" placeholder="选择日期" v-model="formValidate.searchDate"
                               class="datePickerWidth"></Date-picker>
                </Form-item>
              </div>
              <div v-if="currentSelectType == 1">
                <Form-item prop="searchMonth" id="searchMonthForm" label="查询月份">
                  <Date-picker id="searchMonth" type="month" placeholder="选择月份" v-model="formValidate.searchMonth"
                               class="datePickerWidth"></Date-picker>
                </Form-item>
              </div>
              <div v-if="currentSelectType == 2">
                <Form-item label="查询季度">
                  <Select @on-change="selectSeasonHandle" v-model="currentSeasonTitle" label="查询季度">
                    <Option v-for="(item,index) in seasonList" :value="index" :key="item.key"
                            :label="item.value"></Option>
                  </Select>
                </Form-item>
              </div>

              <div v-if="currentSelectType == 3">
                <Form-item prop="searchYear" id="searchYearForm" label="查询年份">
                  <Date-picker id="searchYear" type="year" placeholder="选择年份" v-model="formValidate.searchYear"
                               class="datePickerWidth"></Date-picker>
                </Form-item>
              </div>
              <div v-if="currentSelectType == 4">
                <Form-item prop="startdate" id="startDateForm" label="开始日期">
                  <Date-picker id="startDate" type="date" placeholder="选择开始日期" v-model="formValidate.startdate"
                               class="datePickerWidth"></Date-picker>
                </Form-item>
              </div>
              <div v-if="currentSelectType == 4">
                <Form-item prop="enddate" id="endDateForm"  label="结束日期">
                  <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
                               class="datePickerWidth"></Date-picker>
                </Form-item>
              </div>
              <div v-if="currentSelectType == 4">
              </div>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate')">查询</Button>
              </div>
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="期权经手费比对(生产)  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．整体说明</h3>
      <p>
        1.本应用可查询时间起始范围为：2015.02.09至今
        <br>2.本应用可查询T日数据的时点为：T日20:00后
        <br>3.本应用限制最大查询时间区间为：无限制
      </p>
      <h3>二．单指标算法</h3>
      <p>
        <b>根据不同的查询日期类型，分别描述算法</b>
        <br>1 交易日期 来自查询条件，详见下方补充
        <br>2 实际收款（交易系统） 期权交易系统日终生成的经手费实际收款
        <br>3 标准收费金额 合约成交数量(张数) * 单张合约收费金额。对于上述第a、b点的成交，其标准经手费为0。详见下方补充
        <br>4 优惠金额 标准经手费 * 减免比例（见下表）
        <br>5 优惠后收费 标准经手费 – 减免金额
        <br>6 奖励金额 对手方标准经手费* （1-对手方减免比例）（见下表）* 奖励比例（见下表）
        <br>7 实际收款 标准经手费(单向) - 减免金额 - 经手费奖励金额 或 减免后经手费金额 - 经手费奖励金额。实际经手费会出现为负的情况，此时为向做市商的做市账户进行奖励
        <br>8 合计 实际收款（交易系统）之和
        <br><b>补充：</b>
        <br>1．交易日期
        <br>选择类型 展示字段 展示字段算法或公式
        <br>日 交易日期 展示查询条件所选的日期
        <br>月 交易日期 展示该月有期权经手费情况记录的所有交易日日期
        <br>季度 交易日期 展示该季度有期权经手费情况记录的所有交易日日期
        <br>年份 交易日期 展示该年内有期权经手费情况记录的所有交易日日期
        <br>区间 交易日期 展示查询日期所处区间范围内有期权经手费情况记录的所有交易日日期
        <br>2．标准收费金额
        <br>a) 对于期权交易的卖出开仓（Pos_Flag = O &Trade_Dir = S）和备兑开仓（Covered_Flag = 1 &Pos_Flag = O）
        这两类交易免收交易费用（面向所有投资者、做市商等），免收其经手费,但对于做市账户此类交易会提供奖励。
        <br>b) 开盘集合竞价、盘中断路器触发的集合竞价、收盘集合竞价期间的做市商成交的订单，均不收取经手费，也不给予奖励。
        i. 开盘集合竞价、盘中断路器、收盘集合竞价期间的成交识别：成交日志文件中双方申报时间均早于成交时间的视为开盘
        集合竞价或盘中断路器触发的集合竞价或收盘集合竞价期间的成交.
        <br>3．优惠金额
        <br>连续竞价期间的限价订单中，对做市商“做市账户”交易产生的经手费按规则给予一定比例的减免。
        <br>a) 角色定义：做市账户在每笔成交记录中，其申报时间早于对手方的申报时间的，则该笔成交中该做市账户为流动性提供者，反之该做市账户为流动性消耗者。
        <br>b) 按照做市商流动性角色进行收费的优惠比例，详见下表：
        <br>角色 交易费用 减免比例
        <br>流动性提供者 0 100%
        <br>流动性消耗者 AA级：50%*标准交易费用（单向）
        <br>A级：60%*标准交易费用（单向）
        <br>B级：70%*标准交易费用（单向）
        <br>C级：100%*标准交易费用（单向） AA级：50%*标准交易费用（单向）
        <br>A级：40%*标准交易费用（单向）
        <br>B级：30%*标准交易费用（单向）
        <br>C级：0%*标准交易费用（单向）
        <br>4．奖励金额
        <br>a) 连续竞价期间的限价订单中，对做市商“做市账户”每笔成交，当其角色为流动性提供者时，按规则给予一定比例的奖励。
        <br>b) 按照做市商流动性提供进行收费的奖励比例，详见下表：
        <br>评级（上月） 奖励比例（只针对流动性提供者）
        <br>AA 30%*对手方交易费用（单向）
        <br>A 20%*对手方交易费用（单向）
        <br>B 10%*对手方交易费用（单向）
        <br>C（不达标） 0
        <br>日期类型 ：日 月 季度 年份 区间
        <br>*查询日期 ：
        <br>*查询月份 ：
        <br>*查询季度 ：2018年第3季度 2018年第2季度 2018年第1季度 2017年第4季度 2017年第3季度 2017年第2季度 2017年第1季度 2016年第4季度 2016年第3季度 2016年第2季度 2016年第1季度 2015年第4季度 2015年第3季度 2015年第2季度 2015年第1季度 2014年第4季度 2014年第3季度 2014年第2季度 2014年第1季度 2013年第4季度 2013年第3季度 2013年第2季度 2013年第1季度
        <br>*查询年份 ：
        <br>*开始日期 ：
        <br>*结束日期 ：
        <br>查询
        <br>预览图
      </p>
      <!--<h3>数据说明</h3>-->
      <!--<p>计算期权每日经手费</p>-->
      <!--<h3>指标说明</h3>-->
      <!--<p>-->
        <!--1.实际收款(交易系统)：交易系统计算当天实际经手费。<br>-->
        <!--2.标准收费金额：该数据不含备兑开仓、卖出开仓以及做市账户非连续竞价期间订单成交。<br>-->
        <!--3.优惠金额：做市账户按一定比例对经手费减免。<br>-->
        <!--4.奖励金额：对对手方实际收款按一定比例奖励给提供流动性的做市账户。<br>-->
        <!--5.实际收款 = 优惠后收费 - 奖励金额 = 标准收费金额 - 优惠金额 - 奖励金额。<br>-->
      <!--</p>-->
      <!--<h3>其他说明</h3>-->
      <!--<p>-->
        <!--无-->
      <!--</p>-->
    </Modal>
    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        show-summary
        :summary-method="getSumLast"
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                         :formatter="formatData"
                         :prop="item.field"
                         :label="item.title"
                         :align="item.align"
                         :min-width="item.width">
          <el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
                           :formatter="formatData"
                           :prop="items.field"
                           :label="items.title"
                           :align="items.align"
                           :min-width="items.width">
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
    </div>
    <!--旧代码-->
    <!--<h2 class="infoTitle">期权经手费比对(生产)</h2>-->
    <!--<div class="mainBox changeBox" id="opt60023">-->
    <!--<Row :gutter="gutterValue">-->
    <!--<Col :span="leftPane">-->
    <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
    <!--<Card class="iviewCard">-->
    <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
    <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
    <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
    <!--</Spin>-->
    <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
    <!--<Modal id="lookInfoPop" title="期权经手费比对(生产)  统计口径说明" v-model="changeInfo"-->
    <!--class-name="vertical-center-modal"-->
    <!--cancel-text>-->
    <!--<h3>数据说明</h3>-->
    <!--<p>计算期权每日经手费</p>-->
    <!--<h3>指标说明</h3>-->
    <!--<p>-->
    <!--1.实际收款(交易系统)：交易系统计算当天实际经手费。<br>-->
    <!--2.标准收费金额：该数据不含备兑开仓、卖出开仓以及做市账户非连续竞价期间订单成交。<br>-->
    <!--3.优惠金额：做市账户按一定比例对经手费减免。<br>-->
    <!--4.奖励金额：对对手方实际收款按一定比例奖励给提供流动性的做市账户。<br>-->
    <!--5.实际收款 = 优惠后收费 - 奖励金额 = 标准收费金额 - 优惠金额 - 奖励金额。<br>-->
    <!--</p>-->
    <!--<h3>其他说明</h3>-->
    <!--<p>-->
    <!--无-->
    <!--</p>-->
    <!--</Modal>-->
    <!--&lt;!&ndash;头部logo&ndash;&gt;-->
    <!--<p id="infoTableList" class="redtext listlength"></p>-->
    <!--<el-table-->
    <!--:data="tableData1"-->
    <!--show-summary-->
    <!--:summary-method="getSumLast"-->
    <!--style="width: 100%">-->
    <!--<el-table-column v-for="(item,index) in tableColumns1" :key="index"-->
    <!--:prop="item.field"-->
    <!--:label="item.title"-->
    <!--:align="item.align"-->
    <!--:width="item.width">-->

    <!--<el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"-->
    <!--:prop="items.field"-->
    <!--:label="items.title"-->
    <!--:align="items.align"-->
    <!--:width="items.width">-->

    <!--</el-table-column>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<div class="pageModule">-->
    <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
    <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
    <!--</div>-->
    <!--<div class="exportBtn">-->
    <!--<Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>-->
    <!--<Icon type="ios-download-outline"></Icon>-->
    <!--导出全部结果为XLSX文件-->
    <!--</Button>-->
    <!--</div>-->
    <!--</Card>-->
    <!--</Col>-->
    <!--<Col :span="rightPane" class="infoRightCard">-->
    <!--<Card class="iviewCard">-->
    <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
    <!--<Row class="dateBox">-->
    <!--<Form-item>-->
    <!--<b>日期类型</b>-->
    <!--<Select v-model="currentSelectType">-->
    <!--<Option v-for="(item,index) in selectTypeList" :value="index" :key="item" :label="item"></Option>-->
    <!--</Select>-->
    <!--</Form-item>-->

    <!--<div v-if="currentSelectType == 0">-->
    <!--<b>查询日期</b>-->
    <!--<Form-item prop="searchDate" id="searchDateForm">-->
    <!--<Date-picker id="searchDate" type="date" placeholder="选择日期" v-model="formValidate.searchDate"-->
    <!--class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--</div>-->

    <!--<div v-if="currentSelectType == 1">-->
    <!--<b>查询月份</b>-->
    <!--<Form-item prop="searchMonth" id="searchMonthForm">-->
    <!--<Date-picker id="searchMonth" type="month" placeholder="选择月份" v-model="formValidate.searchMonth"-->
    <!--class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--</div>-->

    <!--<div v-if="currentSelectType == 2">-->
    <!--<b>查询季度</b>-->
    <!--<Form-item>-->
    <!--<Select @on-change="selectSeasonHandle" v-model="currentSeasonTitle">-->
    <!--<Option v-for="(item,index) in seasonList" :value="index" :key="item.key" :label="item.value"></Option>-->
    <!--</Select>-->
    <!--</Form-item>-->
    <!--</div>-->

    <!--<div v-if="currentSelectType == 3">-->
    <!--<b>查询年份</b>-->
    <!--<Form-item prop="searchYear" id="searchYearForm">-->
    <!--<Date-picker id="searchYear" type="year" placeholder="选择年份" v-model="formValidate.searchYear"-->
    <!--class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--</div>-->
    <!--<div v-if="currentSelectType == 4">-->
    <!--<Col span="12">-->
    <!--<b>开始日期</b>-->
    <!--<Form-item prop="startdate" id="startDateForm">-->
    <!--<Date-picker id="startDate" type="date" placeholder="选择开始日期"-->
    <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--<b>结束日期</b>-->
    <!--<Form-item prop="enddate" id="endDateForm">-->
    <!--<Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"-->
    <!--class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--</Col>-->
    <!--</div>-->
    <!--</Row>-->
    <!--<Form-item>-->
    <!--<div class="cxBox cxTop">-->
    <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>-->
    <!--</div>-->
    <!--</Form-item>-->
    <!--</Form>-->
    <!--</Card>-->
    <!--</Col>-->
    <!--</Row>-->
    <!--</div>-->
  </section>
</template>

<script>
  import 'whatwg-fetch';
  import {
    urlParams,
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    getUrlParams,
    initialDate,
    threeReqPath,
    downloadReqPath,
    commonHeader,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/OPT_60023.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {
        //显示隐藏输入条件
        collapse: '1',
        changeArrow: 'rightArrow',
        gutterValue: 16,
        leftPane: 19,
        rightPane: 5,
        isHide: true,
        //统计口径
        changeInfo: false,
        //初始化表格信息
        tableColumns1: tableColumns1,
        tableData1: [
          // {
          //   'name':'zhangsan',
          //   'money':123,
          //   'age':10,
          //   'bag':1
          // },
          // {
          //   'name':'zhangsan',
          //   'money':456,
          //   'age':18,
          //   'bag':2
          // },
          // {
          //   'name':'zhangsan',
          //   'money':789,
          //   'age':13,
          //   'bag':3
          // }
        ],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate()),
          cxtype: '输入会员名称',
          zqCode: '',
          searchYear: new Date(initialDate()),
          searchMonth: new Date(initialDate()),
          searchDate: new Date(initialDate()),
        },
        ruleValidate: {
          searchDate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          searchMonth: [
            {required: true, type: 'date', message: '请选择查询月份', trigger: 'change'}
          ],
          searchYear: [
            {required: true, type: 'date', message: '请选择查询年份', trigger: 'change'}
          ],
          startdate: [
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ],
          zqCode: [
            {required: true, message: '请输入/选择会员名称', trigger: 'change'}
          ]
        },
        //模糊查询数据
        titles: '',
        listShow: false,
        //表单
        zqCodeList: [],
        t: '',
        // 查询类型
        selectTypeList: ['日', '月份', '季度', '年', '区间'],
        currentSelectType: 0,
        labelInValue: true,
        //  合计
        sums: [],
        //  当前选中的season
        currentSeason: '',
        currentSeasonTitle: ''
      }
    },
    mounted() {
      var self = this
      var obj = new XMLHttpRequest();
      obj.open('GET', '/dw/opt/season_list?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + commonGetReqParam, false);
      obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200) {
          const responseData = JSON.parse(obj.responseText);
          self.seasonList = responseData.resData
          var nowYear = new Date().getFullYear()
          var nowSeason = (new Date().getMonth() + 1) / 4 + 1
          console.log(nowYear + '-' + nowSeason)
          setTimeout(function () {
            var obj = {
              key: nowYear + '-' + nowSeason,
              value: nowYear + '年第' + nowSeason + '季度'
            }
            for (var i = 0; i < self.seasonList.length; i++) {
              if (self.seasonList[i].key == obj.key) {
                self.currentSeasonTitle = i
                self.currentSeason = obj.key
              }
            }
          }, 10)
        }
      };
      obj.send(null);
      $(window).on('keydown', function (e) {
        if (e.keyCode == 13) {
          e.preventDefault()
        }
      })
    },
    watch: {
      titles: function () {
        let _this = this;
        /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
          this.$Message.error('会员名称输入不合法');
        }*/
        //会员名称联想
        fetch('/base-service/mem/cdnme', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            "s": _this.titles,
            "userId": srcUseridA,
            "userName": srcUsernameA
          }),
          headers: commonHeader
        }).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          var _this = this;
          if (data.resData.length > 0) {
            this.listShow = true;
          } else {
            _this.listShow = false;
          }
          let codeData = data.resData,
            zqCodeList = [];
          for (var i = 0; i < codeData.length; i++) {
            let zqRow = {};
            zqRow.value = codeData[i];
            zqRow.label = codeData[i];
            zqCodeList.push(zqRow);
          }
          this.zqCodeList = zqCodeList;
        })
      }
    },
    watch: {
      currentSelectType: function () {
        if (this.currentSelectType != 2) {
          this.currentSeason = ''
        }
      }
    },
    methods: {
      // 当前选中的季度
      selectSeasonHandle: function (item) {
        console.log(item, ' >>> ', this.seasonList)
        var o = this.seasonList[item]
        this.currentSeason = o.key
      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate', true)
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.handleSubmit('formValidate')
      },
      /**
       * 显示隐藏左右
       */
      hideRightBox: function () {
        (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
        (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
        (this.gutterValue == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
        (this.changeArrow == 'rightArrow') ? this.changeArrow = 'leftArrow' : this.changeArrow = 'rightArrow';
        document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
      },
      /**
       * 设置fetch请求超时方法
       */
      _fetch: function (fetch_promise, timeout) {
        var abort_fn = null;
        var abortInfo = this;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
            $("#loadBox").addClass("hide");
            abortInfo.isHide = true;
            abortInfo.$Message.warning('查询超时！请重试！');
          };
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        var abortable_promise = Promise.race([
          fetch_promise,
          abort_promise
        ]);
        abortInfo.t = setTimeout(function () {
          abort_fn();
        }, timeout);
        return abortable_promise;
      },
      /**
       * 获取模糊查询选择框get的参数
       */
      getTitleHandle(title) {
        let _this = this;
        this.titles = title;
        setTimeout(function () {
          _this.listShow = false;
        }, 300);
      },
      /**
       * 隐藏模糊查询下拉信息框
       */
      showListHandle() {
        this.listShow = false;
      },
      /**
       * 查询功能
       */
      handleSubmit(name, isPageClick) {
        if (this.currentSelectType != 2) {
          this.currentSeason = ''
        }
        //验证
        if (this.currentSeason != '' && this.currentSelectType == 2) {
          this.$Message.success('提交成功!请等待~');
          if (!isPageClick) this.returnN = 1;
          this.publicPagination(this.returnN, this.pageSize, true);
          return
        }
        // if(this.currentSeason == '' && this.currentSelectType == 2){
        //   this.$Message.warning('请选择季度！');
        //   return
        // }

        // this.$refs[name].validate((valid) => {

        if (this.isHide == false) {
          return;
        }

        const {startdate, enddate} = this.formValidate;
        //日期格式验证
        var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/

        // 判断是哪种查询类型：日、月、年...

        if (this.currentSelectType == 0) {
          var value = $("#searchDate input").val();
          if (r.test(value) == false) {
            this.$Message.error('请输入正确查询日期！');
            $("#searchDateForm").addClass("ivu-form-item-error");
            return;
          }
          if (new Date(new Date(value).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('查询日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
        }
        $("#searchDateForm").removeClass("ivu-form-item-error");

        if (this.currentSelectType == 1) {
          var value = $("#searchMonth input").val();
          var reg = /^\d{4}([-/.]?)\d{1,2}$/
          if (reg.test(value) == false) {
            this.$Message.error('请输入正确月份！');
            $("#searchMonthForm").addClass("ivu-form-item-error");
            return;
          }
          if (new Date(new Date(value).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('查询月份不能大于当前月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
        }
        $("#searchMonthForm").removeClass("ivu-form-item-error");

        if (this.currentSelectType == 3) {
          var value = $("#searchYear input").val();
          var reg = /^\d{4}$/
          if (reg.test(value) == false) {
            this.$Message.error('请输入正确年份！');
            $("#searchYearForm").addClass("ivu-form-item-error");
            return;
          }
          if (new Date(new Date(value).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('查询年份不能大于当前年份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
        }

        $("#searchYearForm").removeClass("ivu-form-item-error");
        if (this.currentSelectType == 4) {
          var startDateA = $(".ivu-input:eq(0)").val();
          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束日期！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('开始日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('结束日期不能大于当前日期！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('开始日期不能大于结束日期!');
            return;
          }
        }

        ;
        //验证
        // if (valid) {
        this.$Message.success('提交成功!请等待~');
        this.returnN = 1;
        this.publicPagination(this.returnN, this.pageSize, true);
        // } else {
        //   this.$Message.error('查询失败!');
        // }
        // })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        let thisStr = this.titles.indexOf("-");
        let thisVal = this.titles.slice(0, thisStr);
        if (thisVal == "") {
          thisVal = 'ALL';
        }
        console.log(this.formValidate)
        document.getElementById("exportCurrent").setAttribute("disabled", true);
        this.searchParams = {
          'dateType': (this.currentSelectType + 1),
          // 'date':this.formValidate.searchDate == '' ?  '' : new Date(this.formValidate.searchDate).format('yyyy-MM-dd'),
          // 'yearMonth':this.formValidate.searchMonth == '' ?  '' : new Date(this.formValidate.searchMonth).format('yyyy-MM'),
          // 'season':this.currentSeason,
          // 'year':this.formValidate.searchYear == '' ?  '' : new Date(this.formValidate.searchYear).format('yyyy'),
          "startDate": new Date(this.formValidate.startdate).format('yyyy-MM-dd'),
          "endDate": new Date(this.formValidate.enddate).format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00015"
        };
        if (this.currentSelectType == 0) {
          this.searchParams.date = this.formValidate.searchDate == '' ? '' : new Date(this.formValidate.searchDate).format('yyyy-MM-dd')
        }
        if (this.currentSelectType == 1) {
          this.searchParams.yearMonth = this.formValidate.searchMonth == '' ? '' : new Date(this.formValidate.searchMonth).format('yyyy-MM')
        }
        if (this.currentSelectType == 2) {
          this.searchParams.season = this.currentSeason
        }
        if (this.currentSelectType == 3) {
          this.searchParams.year = this.formValidate.searchYear == '' ? '' : new Date(this.formValidate.searchYear).format('yyyy')
        }
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/opt/opt_60023'
        this.tableData1 = [];
        this.dealitems = 0;
        var _this = this;
        _this.returnTotal = 0;
        _this.dataArrayAll = [];
        _this.isHide = false;
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(_this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
          _this.isHide = true;
        }).then(data => {
          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          ;
          this.isHide = true;
          //取数据
          $("#infoTableList").html("");
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            // _this.$Message.warning("查询出错" + dataError);
            _this.$alert("查询出错：" +  dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0 || dataResponse.length == 1) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + this.dealitems + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },
      /**
       * 导出Excel文件
       */
      exportData(type) {
        console.log(typeof this.formValidate.searchMonth)
        var date = this.formValidate.searchDate
        var dateType = (this.currentSelectType + 1)
        var yearMonth = this.formValidate.searchMonth
        var season = this.currentSeason
        var year = this.formValidate.searchYear
        var startDate = this.formValidate.startdate.format('yyyy-MM-dd')
        var endDate = this.formValidate.enddate.format('yyyy-MM-dd')

        if ((typeof date) != 'string') date = date.format('yyyy-MM-dd')
        if ((typeof yearMonth) != 'string') yearMonth = yearMonth.format('yyyy-MM')
        if ((typeof year) != 'string') year = year.format('yyyy')

        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +
          "&date=" + date + '&dateType=' + dateType + '&yearMonth=' + yearMonth + '&season=' + season + '&year=' + year + '&startDate=' + startDate + '&endDate=' + endDate

        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          var url = '/dw/opt/opt_60023_export?' + downfileParams + commonGetReqParam
          void(window.open(url));
        }
      },
      /**
       * 获取表格汇总行展示信息
       */
      getSumLast(params) {
        if (this.tableData1.length < 1) {
          return ['合计', '', '', '', '', '', '']
        }
        var sums = []
        var obj = this.tableData1[this.tableData1.length - 1]
        for (var key in obj) {
          var v = obj[key]
          sums.push(formatTbousandth(v))
        }
        return sums;
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop !== 'trade_date') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  .select {
    padding: 5px !important;
  }

  .select-item {
    background-color: transparent;
    color: #111;
  }

  #opt60023 .el-table__row:nth-last-child(1) {
    display: none;
  }

  #opt60023 {
    .ivu-select-selection {
      width: 210px;
    }
  }

  .el-table__footer-wrapper {
    display: block !important;
  }

  /*公共*/
  #opt60023 {
    .ivu-collapse {
      border: none;
    }

    .el-table thead.has-gutter th {
      background-color: #F5F8FA;

    }
    .ivu-collapse-content {
      background: #F5F8FA;
      margin: 0 30px;
      padding: 15px 0 15px 0;
      .ivu-form-item {
        margin-bottom: 0;
      }
      .ivu-collapse-content-box {
        padding-top: 0;
      }
    }
    .ivu-collapse-header {
      padding: 20px 31px;
      border-bottom: none;
      .ivu-icon-arrow-right-b {
        display: none;
      }
      p {
        line-height: 30px;
        .lookInfo {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .showButton {
        float: right;
        font-weight: normal;
        font-size: 13px;
        color: #3D83B5;
        i {
          margin-left: 5px;
        }
      }
    }
    .el-table__empty-text {
      top: 50%;
    }
    .tableBox {
      padding: 27px 30px;
      .pageModule {
        float: right;
        width: inherit;
        .ivu-page-options-sizer {
          margin-right: 0;
        }
      }
      .exportBtn {
        float: left;
      }
    }
    .tabTitle {
      margin-top: 16px;
      padding: 0 30px;
      .el-tabs__header {
        margin: 0;
      }
    }
    .el-tabs--bottom .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs__item:nth-child(2) {
      padding-left: 0 !important;
    }
  }

  /*.iviewCard {
    min-height: 780px;
  }

  .ivu-modal-body {
    max-height: 400px;
    overflow-y: auto;
  }

  .pageModule {
    padding-top: 10px;
  }

  .exportBtn {
    text-align: right;
    padding-top: 5px;
  }

  .datePickerWidth {
    width: 210px;
  }

  .numberUploads {
    margin: 10px 0 5px 0;
  }

  .searchIpt {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  .clearFix:after {
    display: block;
    content: '';
    clear: both;
  }

  .select-down {
    width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    position: absolute;
    z-index: 900;
  }

  .warp {
    height: 32px;
    position: relative;
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #d7dde4;
    transition: all .2s ease-in-out;
    margin-bottom: 15px;
  }

  .select-input {
    width: 100%;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  .li-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #657180;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
  }

  .dropDown {
    width: 212px;
    transform-origin: center top 0px;
    position: absolute;
    left: 0px;
    top: 33px;
  }

  th.ivu-table-column-left {
    text-align: center;
  }

  th.ivu-table-column-right {
    text-align: center;
  }

  .ivu-table-header, .ivu-table-body {
    overflow-y: scroll;
  }

  .cxTop {
    margin: 90px 0 0 0;
  }

  .ivu-table th {
    background-color: #29a7de;
    color: #fff;
  }

  .searchIpt {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  .clearFix:after {
    display: block;
    content: '';
    clear: both;
  }

  .select-down {
    width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    position: absolute;
    z-index: 900;
  }

  .warp {
    height: 32px;
    position: relative;
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #d7dde4;
    transition: all .2s ease-in-out;
    margin-bottom: 15px;
  }

  .select-input {
    width: 100%;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  .li-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #657180;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
  }

  .dropDown {
    width: 212px;
    transform-origin: center top 0px;
    position: absolute;
    left: 0px;
    top: 33px;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(51, 153, 255, .2);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    border-radius: 4px;
  }*/
</style>


