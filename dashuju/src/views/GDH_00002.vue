<template>
  <section class="gdh00002" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押回购购回交易明细
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="开始日期" :label-width="85">
                <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期" :label-width="110">
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
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="股票质押回购购回交易明细  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <br>只包含综合业务平台股票质押式回购购回交易、部分解质、终止购回数据
      <h3>二．指标说明</h3>
      1. 实际购回价格（%）：（购回交易金额-初始交易金额）/（初始交易金额*期限）*365，只有购回交易展示
      <br>2. 购回期限 = 实际购回交易日期 – 初始交易日期，按自然日计算
      <br>3. 购回交易类型：只有购回交易展示
      <br>a) 提前购回：购回交易日期小于预计购回交易日期
      <br>b) 到期购回：购回交易日期等于预计购回交易日期
      <br>c) 延期购回：购回交易日期大于预计购回交易日期
      <br>4. 融出方属性：根据融出方账户归类为“券商自营”、“集合资产”、“定向资产”、“专项资产”、“其他资产”
      <br>5. 融入方属性：根据融入方账户归类为“特殊机构”、“一般机构”、“个人投资者”
      <h3>三．其他说明</h3>
      1. 会员名称为全称
      <br>2. 对于部分解质业务，展示证券类别，流通类别，权益类别，挂牌年份
      <br>3. 按会员维度进行明细数据统计，根据实际使用PBU代码的会员进行统计，即如果有基金，非会员租用则统计到基金和非会员
      <br>4. 通常情况下，在T日16:30起可访问应用获得包含T日正确统计数据
      <br>5. 只展示有购回交易、终止购回、部分解质的会员
      <br>6. 排序方式为：会员名称（正序从小到大），购回交易日（正序从小到大），初始交易日（正序从小到大），标的证券代码（正序从小到大），购回交易金额（正序从小到大），初始交易金额（正序从小到大）
      <br>7. 根据实际交易情况，可能有完全重复数据
     </Modal>


    <!--头部logo-->
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        show-summary
        :summary-method="getSumLast"
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                         :formatter="formatData"
                         :prop="item.field"
                         :label="item.title"
                         :align="item.align"
                         :min-width="item.width">
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
    initialMonth,
    commonGetReqParam,
    dateReg,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00002.js';
  import '../theme/threeCommon.less';
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
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
        sums: []
      }
    },
    mounted() {

    },
    methods: {
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
        const url = '/dw/gdh/gdh_00002';
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
            _this.$alert("查询出错，" + dataError,'错误',{
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
        var downfileParams = "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        void(window.open('/dw/download/gdh00002export?' + downfileParams + commonGetReqParam));
      },
      /**
       * 获取表格汇总行展示信息
       */
      getSumLast() {
        var sums = []
        if (this.tableData1.length < 1) {
          sums = ['合计']
          for (var i = 0; i < this.tableColumns1.length - 2; i++) {
            sums.push('')
          }
          return sums
        } else {
          var obj = this.tableData1[this.tableData1.length - 1]
          var keyArr = []
          for (var i = 0; i < this.tableColumns1.length; i++) {
            var o = this.tableColumns1[i]
            keyArr.push(o.field)
          }
          for (var i = 0; i < keyArr.length; i++) {
            var v = obj[keyArr[i]]
            sums.push(formatTbousandth(v))
          }
        }
        return sums;
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'repur_amt' || prop == 'trade_amt' || prop == 'repur_price' || prop == 'payamt' || prop == 'impawnvol' || prop == 'dividendamt' || prop == 'pledgetargetprice' || prop == 'pledgetargetvalue' || prop == 'repurterm') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  .gdh00002 .el-table__row:nth-last-child(1) {
    display: none;
  }

  .el-table__footer-wrapper {
    display: block !important;
  }
</style>
