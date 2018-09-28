<template>
  <section class="gdh00006" id="fifteenCommon">
    <div id="gdh00006">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>股票质押回购品种统计
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
      <Modal id="lookInfoPop" title="股票质押回购品种统计  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <h3>一、数据说明</h3>
        <p>只包含综合业务平台股票质押式回购统计数据</p>
        <h3>二、指标说明</h3>
        <p>
          1.交易品种：显示为股票、债券、基金、其他四种之一。4种品种分类如下：
          <br>a)股票：股票质押回购交易中，标的证券代码为6*****
          <br> b)债券：股票质押回购交易中，标的证券代码为0*****或1*****
          <br>c)基金：股票质押回购交易中，标的证券代码为5*****
          <br>d)其他：股票质押回购交易中，除以上品种之外的代码
          <br>2.限售情况：只有当交易品种为股票才有值，显示为“限售”、“非限售”、“其他”，其他品种为空
          <br> 3.根据融入方账户归类为“特殊机构”、“一般机构”、“个人投资者”
          <br>4.成交总金额 = 初始交易金额 + 购回交易金额 = 特殊机构成交金额（初始+购回）+ 一般机构成交金额（初始+购回）+ 个人投资者成交金额（初始+购回），金额单位万元
          <br>5.全部交易笔数：包含股票质押式回购全部6种交易 = 初始交易笔数 + 补充质押笔数 +购回交易笔数 + 部分解质笔数 + 终止购回笔数 + 违约处置笔数
          <br>6.交易的账户数：包含全部6种交易
          <br> 7.期初待购回余额：统计期初未到期的初始交易金额，单位万元
          <br>8.期末待购回余额：统计期末未到期的初始交易金额，单位万元
          <br>9.期末标的券市值：统计期末未到期的标的券的收盘市值，其中债券的市值为持仓数量*（收盘价*10+应计利息*10）。单位万元
          <br>10.期末持有待购回投资者：投资者总数 = 个人投资者数 + 特殊机构投资者数 + 一般机构投资者数
        </p>
        <h3>三、其他说明</h3>
        <p>
          1. 会员名称为全称
          <br>2.按会员维度、交易品种维度、限售情况维度进行汇总统计，根据实际使用PBU代码的会员进行统计，即如果有基金，非会员租用则统计到基金和非会员
          <br>3.通常情况下，在T日20:00起可访问应用获得包含T日正确统计数据
          <br>4.某会员、某交易品种、某限售情况有以下3种数据则展示：
          <br>a)有期初待购回余额
          <br>b)有期末待购回余额
          <br>c)统计期间有交易
          <br>5.排序方式为：会员名称（正序从小到大）, 交易品种（按股票、债券、基金、其他排序）
        </p>
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
            <el-table-column v-for="(ite,index) in item.children" :key="index"
                             :formatter="formatData"
                             :prop="ite.field"
                             :label="ite.title"
                             :align="ite.align"
                             :min-width="ite.width">
            </el-table-column>
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

    </div>

    <!--<h2 class="infoTitle">股票质押回购品种统计</h2>-->
    <!--<div class="mainBox changeBox" id="gdh00006">-->
    <!--<Row :gutter="gutterValue">-->
    <!--<Col :span="leftPane">-->
    <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
    <!--<Card class="iviewCard">-->
    <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
    <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
    <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
    <!--</Spin>-->
    <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
    <!--<Modal id="lookInfoPop" title="股票质押回购品种统计  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
    <!--cancel-text>-->
    <!--<h3>数据说明</h3>-->
    <!--<p>只包含综合业务平台股票质押式回购统计数据</p>-->
    <!--<h3>指标说明</h3>-->
    <!--<p>-->
    <!--1. 交易品种：显示为股票、债券、基金、其他四种之一。4种品种分类如下：-->
    <!--<br>a) 股票：股票质押回购交易中，标的证券代码为6*****-->
    <!--<br> b) 债券：股票质押回购交易中，标的证券代码为0*****或1*****-->
    <!--<br>c) 基金：股票质押回购交易中，标的证券代码为5*****-->
    <!--<br>d) 其他：股票质押回购交易中，除以上品种之外的代码-->
    <!--<br>2. 限售情况：只有当交易品种为股票才有值，显示为“限售”、“非限售”、“其他”，其他品种为空-->
    <!--<br> 3. 根据融入方账户归类为“特殊机构”、“一般机构”、“个人投资者”-->
    <!--<br>4. 成交总金额 = 初始交易金额 + 购回交易金额 = 特殊机构成交金额（初始+购回）+ 一般机构成交金额（初始+购回）+ 个人投资者成交金额（初始+购回），金额单位万元-->
    <!--<br>5. 全部交易笔数：包含股票质押式回购全部6种交易 = 初始交易笔数 + 补充质押笔数 +购回交易笔数 + 部分解质笔数 + 终止购回笔数 + 违约处置笔数-->
    <!--<br>6. 交易的账户数：包含全部6种交易-->
    <!--<br> 7. 期初待购回余额：统计期初未到期的初始交易金额，单位万元-->
    <!--<br>8. 期末待购回余额：统计期末未到期的初始交易金额，单位万元-->
    <!--<br>9. 期末标的券市值：统计期末未到期的标的券的收盘市值，其中债券的市值为持仓数量*（收盘价*10+应计利息*10）。单位万元-->
    <!--<br>10. 期末持有待购回投资者：投资者总数 = 个人投资者数 + 特殊机构投资者数 + 一般机构投资者数-->
    <!--</p>-->
    <!--<h3>其他说明</h3>-->
    <!--<p>-->
    <!--三．其他说明-->
    <!--<br>1. 会员名称为全称-->
    <!--<br>2. 按会员维度、交易品种维度、限售情况维度进行汇总统计，根据实际使用PBU代码的会员进行统计，即如果有基金，非会员租用则统计到基金和非会员-->
    <!--<br>3. 通常情况下，在T日20:00起可访问应用获得包含T日正确统计数据-->
    <!--<br>4. 某会员、某交易品种、某限售情况有以下3种数据则展示：-->
    <!--<br>a) 有期初待购回余额-->
    <!--<br>b) 有期末待购回余额-->
    <!--<br>c) 统计期间有交易-->
    <!--<br>5. 排序方式为：会员名称（正序从小到大）, 交易品种（按股票、债券、基金、其他排序）-->
    <!--</p>-->
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
    <!--<el-table-column v-for="(ite,index) in item.children" :key="index"-->
    <!--:prop="ite.field"-->
    <!--:label="ite.title"-->
    <!--:align="ite.align"-->
    <!--:width="ite.width">-->
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
    <!--<Col span="12">-->
    <!--<b>开始日期</b>-->
    <!--<Form-item prop="startdate" id="startDateForm">-->
    <!--<Date-picker id="startDate" type="date" placeholder="选择开始日期"-->
    <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
    <!--</Form-item>-->
    <!--<b>结束日期</b>-->
    <!--<Form-item prop="enddate" id="endDateForm">-->
    <!--<Date-picker id="endDate" type="date" placeholder="选择结束日期"   v-model="formValidate.enddate"-->
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
  import {tableColumns1} from '../assets/js/GDH_00006.js';
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
        sums: [],

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
        const url = '/dw/gdh/gdh_00006';
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
        void(window.open('/dw/download/gdh00006export?' + downfileParams + commonGetReqParam));
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
            if (o.children) {
              for (var j = 0; j < o.children.length; j++) {
                var item = o.children[j]
                keyArr.push(item.field)
              }
            } else {
              keyArr.push(o.field)
            }
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
        if (prop !== 'mem_name' && prop !== 'sec_type_lev' && prop !== 'cap_vol_type') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  #gdh00006 .el-table__row:nth-last-child(1) {
    display: none;
  }

  .el-table__footer-wrapper {
    display: block !important;
  }
</style>
