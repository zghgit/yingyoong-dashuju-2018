<template>
  <section class="constWidth" id="gdh00002">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>融资融券信用账户分析
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
            <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
          </p>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>开始日期：</b>
                  <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                               v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item prop="enddate" id="endDateForm">
                  <b>结束日期：</b>
                  <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
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
    </div>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="融资融券信用账户分析  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <b>一．	整体说明：</b><br>
      1)	本应用可查询时间起始范围为：2010/03/31-now<br>
      2)	本应用可查询T日数据的时点为：T日22:00后<br>
      3)	本应用限制最大查询时间区间为： 无限制<br>
      4)	正常情况下，预期T日22:30以后可查询T日的数据。<br>
        <b>二．	单指标算法：</b><br>
      序号	展示字段	展示字段算法或公式<br>
      1.	日期	交易日期<br>
      2.	累计账户数（个）	T日闭市时存量E账户总数，根据T日获取的“账户开户资料数据”统计。<br>
      3.	个人账户总数（个）	T日闭市时存量E账户中，其对应的普通账户以A开头的账户总数，根据T日获取的“普通账户与信用账户对应关系数据”统计。<br>
      4.	个人投资者期末账户占比（%）	( 个人账户总数 / 累计账户数 ) * 100%，当且仅当T日累计账户数为0时，结果为空。<br>
      5.	新增账户总数（个）	T日获取的“账户开户资料数据”中在T日之前从未出现过的E账户的总数。<br>
      6.	新增个人账户数（个）	T日获取的“账户开户资料数据”中在T日之前从未出现过的、且其对应的普通账户以A开头的E账户总数。
      7.	个人投资者新增账户占比（%）	( 新增个人账户数 / 新增账户总数 ) * 100%，当且仅当T日新增账户总数为0时，结果为空。<br>
      8.	存在交易的账户总数（个）	T日及T日之前，在竞价系统有过买入或卖出成交的E账户总数。<br>
      9.	有效信用账户占比（%）	( 存在交易的账户总数 / 累计账户数 ) * 100%，当且仅当T日累计账户数为0时，结果为空。<br>

    </Modal>

    <!--头部logo-->
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <el-table-column :min-width="item.width" :formatter="formatterNumber" v-for="(item,index) in tableColumns1" :key="index"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </el-table>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
    </div>


    <!--<h2 class="infoTitle">股票质押回购购回交易明细</h2>-->
    <!--<div class="mainBox changeBox" id="gdh00002">-->
    <!--<Row :gutter="gutterValue">-->
    <!--<Col :span="leftPane">-->
    <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
    <!--<Card class="iviewCard">-->
    <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
    <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
    <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
    <!--</Spin>-->
    <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
    <!--<Modal id="lookInfoPop" title="股票质押回购购回交易明细  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
    <!--cancel-text>-->
    <!--<br>交易平台：竞价系统-->
    <!--<br>统计对象：只统计机构‘港盛信息服务(上海)有限公司‘的沪股通计费-->

    <!--<br>二．指标说明-->

    <!--<br>（1）当月交易单元使用费：本月PBU使用费，单位元-->
    <!--<br>（2）当月交易单元流速费：本月流速费，单位元-->
    <!--<br>（3）当月交易单元流量费：根据本月申报量计算的单月流量费，单位元-->
    <!--<br>（4）当月补交交易单元费：因为跨月的PBU注销申请被退回等因素，而需要补交之前的PBU使用费，单位元。-->
    <!--<br>（5）当月补交流速费：因为跨月的PBU注销申请被退回等因素，而需要补交之前的流速费，单位元。-->
    <!--<br>（6）年度内累计交易单元使用费：当年(从上年12月到今年11月)从12月开始到当月的PBU使用费累计，单位元。-->
    <!--<br>（7）年度内累计交易单元流速费：当年(从上年12月到今年11月)从12月开始到当月的流速费累计，单位元。-->
    <!--<br>（8）年度内累计交易单元流量费：当年(从上年12月到今年11月)从12月开始到当月的所有申报量计算的流量费。单位元-->
    <!--<br>（9）该年度内累计年费：全年的(PBU使用费+流速费+流量费)。单位元-->

    <!--<br>三．其他说明-->

    <!--<br>无-->
    <!--</Modal>-->
    <!--&lt;!&ndash;头部logo&ndash;&gt;-->
    <!--<p id="infoTableList" class="redtext listlength"></p>-->
    <!--<el-table-->
    <!--:data="tableData1"-->
    <!--border-->
    <!--show-summary-->
    <!--:summary-method="getSumLast"-->
    <!--style="width: 100%">-->
    <!--<el-table-column v-for="(item,index) in tableColumns1" :key="index"-->
    <!--:prop="item.field"-->
    <!--:label="item.title"-->
    <!--:align="item.align"-->
    <!--:width="item.width">-->
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
  lastMonthFirstAndLastDay,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MTSL_00056.js';
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
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
        sums: [],
        recordQueryDate:''
      }
    },
    mounted() {
      console.log(lastMonthFirstAndLastDay())
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'trade_date' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
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
          //日期格式验证
          var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00003"
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mtsl/mtsl_00056_data';
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
            // this.$Message.warning("查询出错" + dataError);
            this.$alert("错误" + dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0 ) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.recordQueryDate = _this.formValidate
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + _this.dealitems + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },
      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.recordQueryDate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.recordQueryDate.enddate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        void(window.open('/dw/mtsl/mtsl_00056_export?' + downfileParams + commonGetReqParam));
      },
    }
  }
</script>

<style lang="less">


  .el-table__footer-wrapper {
    display: block !important;
  }
</style>
