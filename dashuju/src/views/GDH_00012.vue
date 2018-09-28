<template>
  <section class="constWidth" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押式回购交易业务周报下载
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm">
                <b>开始月份：</b>
                <Date-picker id="startDate" type="month" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm">
                <b>结束月份：</b>
                <Date-picker id="endDate" type="month" placeholder="选择结束日期" v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
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
    <Modal id="lookInfoPop" title="股票质押式回购交易业务周报下载  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
      <h3>一、整体说明:</h3>
      <p>
        1.本应用可查询时间起始范围为：20130624日至上周。
        <br>2.本应用可查询T周数据的时点为：只能待T周下一交易日03:00才可查询T周数据。.
      </p>
      <h3>二、单指标算法:</h3>
      <p>
        <b>标题：</b>
        1.周报期数	数据仓库不填写，空置两个空格
        <br>2.周报日期区间	显示为YYYY年MM月DD日-YYYY年MM月DD日，表示该周的第一交易日到最后交易日
      </p>
      <p>
        <b>正文：</b>
        1.周报截止日期	MM月DD日，表示该周的最后交易日
        <br>2.会员个数	是指截至该周最后一个交易日，有股票质押式回购交易权限的会员个数
        <br>3.本周总成交金额	本周发生的股票质押回购业务初始交易金额和购回交易金额之和，单位亿元，保留两位小数，剔除交收失败的数据。
        <br>4.本周初始交易金额	本周发生的股票质押回购业务初始交易金额之和，单位亿元，保留两位小数，剔除交收失败的数据。
        <br>5.本周购回交易金额	本周发生的股票质押回购业务购回交易金额之和，单位亿元，保留两位小数，剔除交收失败的数据。
        <br>6.本周平均质押率	本周发生的股票质押回购业务，当周有交易的会员中每笔初始交易质押率的算术平均值，每笔质押率 = 初始交易金额 / 质押标的券在初始交易日的市值，单位%，保留两位小数
        <br>7.本周平均利率	本周平均利率=∑（本周每笔初始交易金额*相应利率）/∑本周每笔初始交易金额，股票质押利率的数据源为“股票质押回购初始交易明细应用”（手工单录）或者“股票质押利率数据上传应用”（批量导入）中用户输入的利率。以“股票质押回购初始交易明细应用”手工录入的数据为优先，若用户2个应用都没有输入，则利率相关统计为空
        <br>8.累计总成交金额	截至本周末股票质押回购业务上市以来的初始成交金额和购回交易金额之和，单位亿元，保留两位小数，剔除交收失败的数据。
        <br>9.累计初始交易金额	截至本周末股票质押回购业务上市以来的初始成交金额之和，单位亿元，保留两位小数，剔除交收失败的数据。
        <br>10.累计购回交易金额	截至本周末股票质押回购业务上市以来的购回交易金额之和，单位亿元，保留两位小数，剔除交收失败的数据。
        <br>11.期末待购回初始交易金额	股票质押回购业务期末待购回初始交易金额之和，单位亿元，保留两位小数
        <br>12.期末标的证券市值	股票质押回购业务期末待购回的标的证券市值之和，其中标的证券市值 = 当日未到期数量 * 当日收盘价，债券使用全价计算市值，单位亿元，保留两位小数
        <br>13.平均履约担保比例	期末计算股票质押回购业务: 标的证券市值之和 / 期末待购回初始交易金额之和，单位%，保留两位小数.
      </p>
      <!--一．	整体说明：<br>-->
      <!--1)	本应用可查询时间起始范围为：20130624日至上周。<br>-->
      <!--2)	本应用可查询T周数据的时点为：只能待T周下一交易日03:00才可查询T周数据。。<br>-->
    </Modal>

    <!--头部logo-->
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <template v-for="(item,index) in tableColumns1">
          <el-table-column v-if="item.hasAnchor" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :min-width="item.width">
            <template scope="scope">
              <a @click="anchorClick(scope)">{{scope.row.reportDateTile}}</a>
            </template>
          </el-table-column>
          <el-table-column v-else :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :min-width="item.width">
          </el-table-column>
        </template>
      </el-table>
      <!--<div class="pageModule">-->
        <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
              <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
      <!--</div>-->
      <!--<div class="exportBtn">-->
        <!--<Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>-->
          <!--<Icon type="ios-download-outline"></Icon>-->
          <!--导出全部结果为XLSX文件-->
        <!--</Button>-->
      <!--</div>-->
    </div>


    <!--<h2 class="infoTitle">股票质押式回购交易业务周报下载</h2>-->
    <!--<div class="mainBox changeBox">-->
    <!--<Row :gutter="gutterValue">-->
    <!--<Col :span="leftPane">-->
    <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
    <!--<Card class="iviewCard">-->
    <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
    <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
    <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
    <!--</Spin>-->
    <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
    <!--<Modal id="lookInfoPop" title="股票质押式回购交易业务周报下载  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
    <!--cancel-text>-->
    <!--待补充-->
    <!--</Modal>-->
    <!--&lt;!&ndash;头部logo&ndash;&gt;-->
    <!--<p id="infoTableList" class="redtext listlength"></p>-->
    <!--<el-table-->
    <!--:data="tableData1"-->
    <!--border-->
    <!--style="width: 100%">-->
    <!--<template v-for="(item,index) in tableColumns1">-->
    <!--<el-table-column v-if="item.hasAnchor"   :key="index"-->
    <!--:prop="item.field"-->
    <!--:label="item.title"-->
    <!--:align="item.align"-->
    <!--:width="item.width">-->
    <!--<template scope="scope">-->
    <!--<a @click="anchorClick(scope)">{{scope.row.reportDateTile}}</a>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column v-else  :key="index"-->
    <!--:prop="item.field"-->
    <!--:label="item.title"-->
    <!--:align="item.align"-->
    <!--:width="item.width">-->
    <!--</el-table-column>-->
    <!--</template>-->
    <!--</el-table>-->
    <!--&lt;!&ndash;<div class="pageModule">&ndash;&gt;-->
    <!--&lt;!&ndash;<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"&ndash;&gt;-->
    <!--&lt;!&ndash;show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="exportBtn">&ndash;&gt;-->
    <!--&lt;!&ndash;<Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>&ndash;&gt;-->
    <!--&lt;!&ndash;<Icon type="ios-download-outline"></Icon>&ndash;&gt;-->
    <!--&lt;!&ndash;导出全部结果为XLSX文件&ndash;&gt;-->
    <!--&lt;!&ndash;</Button>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</Card>-->
    <!--</Col>-->
    <!--<Col :span="rightPane" class="infoRightCard">-->
    <!--<Card class="iviewCard">-->
    <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
    <!--<Row class="dateBox">-->
    <!--<Col span="12">-->
    <!--<b>开始月份</b>-->
    <!--<Form-item prop="startdate" id="startDateForm">-->
    <!--<Date-picker id="startDate" type="month" placeholder="选择开始月份"-->
    <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--<b>结束月份</b>-->
    <!--<Form-item prop="enddate" id="endDateForm">-->
    <!--<Date-picker id="endDate" type="month" placeholder="选择结束月份" v-model="formValidate.enddate"-->
    <!--class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--</Col>-->
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
    initialMonth,
    commonGetReqParam
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00012.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
  import '../theme/fifteenCommon.less';

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
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        //月份初始化
        formValidate: {
          startdate: new Date(initialMonth()),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询月份', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束月份', trigger: 'change'}
          ]
        },
        t: '',
        sums: []
      }
    },
    mounted() {

    },
    methods: {
      anchorClick: function (scope) {
        console.log(scope)
        var url = '/dw/gdh/gdh_00012?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&startDate=' + scope.row.startDate + '&endDate=' + scope.row.endDate + commonGetReqParam
        window.open(url)
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
        $('.el-table__header-wrapper table').css('width', '100%')
        $('.el-table__body-wrapper table').css('width', '100%')
        $('.el-table__empty-block').css('width', '100%')
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
       * 查询功能
       */
      handleSubmit(name, isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate, enddate} = this.formValidate;
          //月份格式验证
          var r = /^\d{4}([-/.]?)\d{1,2}/;
          var startDateA = $(".ivu-input:eq(0)").val();
          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前月份
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('开始月份不能大于当前月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('结束月份不能大于当前月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始月份不能大于结束月份（手动输入+选择月份）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMM') > enddateValue.format('yyyyMM')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('开始月份不能大于结束月份!');
            return;
          }
          ;
          //验证
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            if (!isPageClick) this.returnN = 1;
            this.publicPagination(this.returnN, this.pageSize, true);
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      //
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        var _this = this
        this.isHide = false;
        $("#loadBox").removeClass("hide");

        var self = this
        var obj = new XMLHttpRequest();
        obj.open('GET', '/dw/gdh/gdh_week_list?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&startYearMonth=' + this.formValidate.startdate.format('yyyy-MM') + '&endYearMonth=' + this.formValidate.enddate.format('yyyy-MM') + commonGetReqParam, false);
        obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == 200) {
            const responseData = JSON.parse(obj.responseText);
            _this.isHide = true;
            console.log(responseData)
            var dataResponse = responseData.resData
            var datalength = responseData.resData.length
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.$Message.warning('查询无数据！');
              // $("#exportCurrent").attr("disabled");
            } else {
              // _this.$Message.success('查询成功!');
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
              // $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + datalength + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");

            }
          }
        };
        obj.send(null);
        //查询传送的参数
        // this.searchParams = {
        //   "startDate": this.formValidate.startdate.format('yyyy-MM'),
        //   "endDate": this.formValidate.enddate.format('yyyy-MM'),
        //   "userId": srcUseridA,
        //   "userName": srcUsernameA,
        //   // "reQuery": statics,
        //   "pageNo": pages,
        //   "pageSize": rows,
        //   "businessId": "GDH_00003"
        // };
        // //声明加载中
        // $("#loadBox").removeClass("hide");
        // //接口请求处理
        // const url = '/dw/gdh/gdh00001';
        // this.tableData1 = [];
        // this.dealitems = 0;
        // var _this = this;
        // _this.returnTotal = 0;
        // _this.dataArrayAll = [];
        // _this.isHide = false;
        // this._fetch(fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify(_this.searchParams),
        //   mode: 'cors',
        //   headers: commonHeader
        // }), 600000).then(function (response) {
        //   return response.json()
        // }, function (error) {
        //   $("#loadBox").addClass("hide");
        //   _this.$Message.error('系统繁忙，刷新页面!');
        //   _this.isHide = true;
        // }).then(data => {
        //   if (_this.t != '') {
        //     clearTimeout(_this.t);
        //   }
        //   ;
        //   this.isHide = true;
        //   //取数据
        //   $("#infoTableList").html("");
        //   var rtnStatic = data.success;
        //   var dataError = data.message;
        //   if (rtnStatic == false) {
        //     $("#loadBox").addClass("hide");
        //     _this.$Message.warning("查询出错" + dataError);
        //     _this.tableData1 = [];
        //     _this.dealitems = 0;
        //     $("#exportCurrent").attr("disabled");
        //   } else {
        //     var dataResponse = data.resData.data;
        //     var datalength = data.resData.totalCount;
        //     if (dataResponse.length == 0 || dataResponse.length==1) {
        //       $("#loadBox").addClass("hide");
        //       _this.tableData1 = [];
        //       _this.dealitems = 0;
        //       _this.$Message.warning('查询无数据！');
        //       $("#exportCurrent").attr("disabled");
        //     } else {
        //       _this.dealitems = datalength;
        //       _this.dataArrayAll = dataResponse;//保存所有数据
        //       _this.returnTotal = datalength;
        //       _this.tableData1 = _this.dataArrayAll;
        //       $("#exportCurrent").removeAttr("disabled");
        //       _this.isHide = true;
        //       //查询结果提示变化1
        //       $("#infoTableList").html("查询结果共 " + _this.dealitems + " 条记录");
        //       //隐藏加载中
        //       $("#loadBox").addClass("hide");
        //     }
        //   }
        // });
      },
      /**
       * 导出Excel文件
       */


    }
  }
</script>

<style lang="less">

</style>
