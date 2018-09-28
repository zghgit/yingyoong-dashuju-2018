<template>
  <section class="constWidth" id="fifteenCommon">

    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>按一码通董监高及5%大股东股票质押回购统计
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="交易日期">
                <Date-picker id="startDate" type="date" placeholder="选择交易日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
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
    <Modal id="lookInfoPop" title="按一码通董监高及5%大股东股票质押回购统计  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>
        1.按一码通账户维度进行汇总统计
        <br>2.包含综合业务平台股票质押式回购业务数据统计（一码通账户）和会员股票质押式回购交易数据统
      </p>
      <h3>二．指标说明</h3>
      <p>
        1.待购回数量：截止T日收盘未到期的标的证券数量
        <br>2.待购回余额（万元）：截止T日收盘未到期数据对应的初始交易金额
        <br>3.标的证券市值（万元）：标的证券数量的T日收盘市值，其中债券的市值为持仓数量*（收盘价*10+应计利息*10）。
        <br>4.可质押数量=T日清算账户总持仓-T日冻结数量=流通股持仓+非流通股持仓-冻结数量
        <br>5.可质押数量市值：可质押数量的T日收盘市值，其中债券的市值为持仓数量*（收盘价*10+应计利息*10）。
        <br>6.融入方属性：根据对应标的证券董监高账户属性和持股比例，归类为1,2,3
        <br>1：只是标的券的董监高账户
        <br>2：只是持股5%及以上账户
        <br>3：两者皆是
        <br>7.持股比例：（ 个人持有该公司A股股本+B股股本 ） * 100.00 / 该公司总股本（A股+B股+H股）
        <br>8.待购回证券数量：取自未到期明细表中未到期数量。
        <br>9.融入方应付金额（万元）会员上报：会员上报文件中“融入方应付金额”，只加总涉及的初始交易，不加补充质押交易填报的融入方应付金额
        <br>10.质押标的市值：“质押标的市值”=当前质押数量*质押标的价格，其中“质押标的价格”取对应标的证券当日收盘价，当日无收盘价的，取最近一交易日收盘价。
        <br>11.履约保障比例（会员上报）：SUM（融入方应付金额*履约保证比例）/ SUM（融入方应付金额）。
      </p>
      <h3>三．其他说明</h3>
      <p>
        1.按一码通账户维度进行汇总统计
        <br>2.通常情况下，在T日20:00起可访问应用获得包含T日正确统计数据
        <br>3.持有待购回且满足董监高账户或者持股超过5%的账户才展示
        <br>4.排序方式为：会员名称（正序从小到大），一码通账户（正序从小到大），账户名称（正序从小到大），标的证券代码（正序从小到大）
      </p>
    </Modal>
    <div class="tableBox" id="tableData">
      <el-col :span="24">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
          :formatter="formatData"
          :prop="item.key"
          :label="item.title"
          :align="item.align"
          :min-width="item.width">
        </el-table-column>
        </el-table>
      </el-col>
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





    <!--头部logo-->
    <!--<header></header>-->
    <!--<h2 class="infoTitle">按一码通董监高及5%大股东股票质押回购统计</h2>-->
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
          <!--<Modal id="lookInfoPop" content="按一码通董监高及5%大股东股票质押回购统计  统计口径说明"-->
                 <!--title="按一码通董监高及5%大股东股票质押回购统计  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
                 <!--cancel-text>-->
            <!--<h3>数据说明</h3>-->
            <!--<p>包含综合业务平台股票质押式回购业务数据统计（一码通账户）和会员股票质押式回购交易数据统计</p>-->
            <!--<h3>指标说明</h3>-->
            <!--<p>-->
              <!--1. 待购回数量：截止T日收盘未到期的标的证券数量<br>-->
              <!--2. 待购回余额（万元）：截止T日收盘未到期数据对应的初始交易金额<br>-->
              <!--3. 标的证券市值（万元）：标的证券数量的T日收盘市值，其中债券的市值为持仓数量*（收盘价*10+应计利息*10）。<br>-->
              <!--4. 可质押数量=T日清算账户总持仓-T日冻结数量=流通股持仓+非流通股持仓-冻结数量<br>-->
              <!--5. 可质押数量市值：可质押数量的T日收盘市值，其中债券的市值为持仓数量*（收盘价*10+应计利息*10）。<br>-->
              <!--6. 融入方属性：根据对应标的证券董监高账户属性和持股比例，归类为1,2,3<br>-->
              <!--&nbsp;&nbsp;&nbsp;&nbsp;1：只是标的券的董监高账户<br>-->
              <!--&nbsp;&nbsp;&nbsp;&nbsp;2：只是持股5%及以上账户<br>-->
              <!--&nbsp;&nbsp;&nbsp;&nbsp;3：两者皆是<br>-->
              <!--7. 持股比例：（ 个人持有该公司A股股本+B股股本 ） * 100.00 / 该公司总股本（A股+B股+H股）<br>-->
              <!--8. 待购回证券数量：取自未到期明细表中未到期数量。<br>-->
              <!--9. 融入方应付金额（万元）会员上报：会员上报文件中“融入方应付金额”，只加总涉及的初始交易，不加补充质押交易填报的融入方应付金额<br>-->
              <!--10. 质押标的市值：“质押标的市值”=当前质押数量*质押标的价格，其中“质押标的价格”取对应标的证券当日收盘价，当日无收盘价的，取最近一交易日收盘价。<br>-->
              <!--11. 履约保障比例（会员上报）：SUM（融入方应付金额*履约保证比例）/ SUM（融入方应付金额）。<br>-->
            <!--</p>-->
            <!--<h3>其他说明</h3>-->
            <!--<p>-->
              <!--1. 按一码通账户维度进行汇总统计<br>-->
              <!--2. 通常情况下，在T日20:00起可访问应用获得包含T日正确统计数据<br>-->
              <!--3. 持有待购回且满足董监高账户或者持股超过5%的账户才展示<br>-->
              <!--4. 排序方式为：会员名称（正序从小到大），一码通账户（正序从小到大），账户名称（正序-->
              <!--从小到大），标的证券代码（正序从小到大）<br>-->
            <!--</p>-->
          <!--</Modal>-->
          <!--&lt;!&ndash;头部logo&ndash;&gt;-->
          <!--<p id="infoTableList" class="redtext listlength"></p>-->
          <!--&lt;!&ndash;<i-table border :columns="tableColumns1" :data="tableData1"></i-table>&ndash;&gt;-->
          <!--&lt;!&ndash;<fastTable :width="1920" :bwidth="1920" :columns="tableColumns1" :data="tableData1"></fastTable>&ndash;&gt;-->
          <!--<el-table-->
            <!--:data="tableData1"-->
            <!--border-->
            <!--style="width: 100%">-->
            <!--<el-table-column v-for="(item,index) in tableColumns1" :key="index"-->
                             <!--:prop="item.key"-->
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
              <!--<b>交易日期</b>-->
              <!--<Form-item prop="startdate" id="startDateForm">-->
                <!--<Date-picker   @on-open-change="datePickerOpen" id="startDate" type="date" placeholder="选择交易日期"-->
                             <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--</Col>-->
            <!--</Row>-->
            <!--<Form-item>-->
              <!--<div class="cxBox cxTop">-->
                <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate',false);">查询</Button>-->
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
  import {tableColumns1} from '../assets/js/GDH_00019.js';
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
          startdate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: '',
      //  日期控件状态
        datePickerIsOpen:false
      }
    },
    mounted:function(){
      var self = this
      $(window).on('keydown',function(e){
        if(e.keyCode == 13 && self.datePickerIsOpen){
          e.preventDefault()
        }
      })
    },
    methods: {
      // 日期选择器打开时
      datePickerOpen:function(flag){
        this.datePickerIsOpen = flag
      },

      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate',true)
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.handleSubmit('formValidate',true)
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
       * 查询功能
       */
      handleSubmit(name,isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate} = this.formValidate;
          //日期格式验证
          var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('开始日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var startdateValue = this.formValidate.startdate;
          //验证
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            if(!isPageClick) this.returnN = 1;
            this.publicPagination(this.returnN, this.pageSize, isPageClick ? false : true);
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
          "rptDte": this.formValidate.startdate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00019",

        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = threeReqPath;
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
            _this.$alert("查询出错" +  dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0) {
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
        var downfileParams = "type=GDH_00019&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.formValidate.startdate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          void(window.open(downloadReqPath + downfileParams +commonGetReqParam));
        }
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'unmature_vol_sum' || prop == 'unmature_vol_amt_s' || prop == 'unmature_amt_sum' || prop == 'pay_amt_all_sum' || prop == 'valid_vol_sum' || prop == 'valid_amt_sum' || prop == 'ccrc_hold_bal' || prop == 'sf_frzn_vol' || prop == 'capital') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  .ivu-modal-header-inner {
    overflow: inherit;
    text-overflow: inherit;
    white-space: inherit;
  }
</style>
