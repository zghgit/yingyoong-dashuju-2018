<template>
  <section class="constWidth" id="mkt13080">
    <!--头部logo-->
    <header></header>
    <div v-model="collapse">
      <div>
        <p class="tx">上市证券交易异常波动确认单
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <!--<span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>-->
        </p>
        <div class="tc" slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="起始日期">
                <Date-picker id="startDate" type="date" placeholder="选择起始日期" v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="截止日期">
                <Date-picker id="endDate" type="date" placeholder="选择截止日期" v-model="formValidate.enddate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate')">查询</Button>
              </div>
              <div class="submitBtnBox">
                <Button  type="primary" @click="print">打印</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="交易异常波动的类型：" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
      <h3>一．整体说明：</h3>
      <p>
        1)本应用可查询时间起始范围为：2006.08.07-now
        <br>2)本应用可查询T日数据的时点为：T日16:00后
        <br>3)本应用限制最大查询时间区间为：无限制
        <br>4)本应用包含ＡＢ股以及封闭基金
      </p>
      <h3>二．单指标算法：</h3>
      <p>
        1	日期	查询时段内,根据输入条件能查询到证券有异常波动的所有交易日
        <br>2	证券代码	有异常波动的证券代码
        <br>3	证券简称	有异常波动的证券代码发生波动日的证券简称
        <br>4	交易异常波动类型<b>(见异常波动类型代码)</b>
        	收盘价格涨跌幅偏离值＝个股涨跌幅-对应指数涨跌幅（对应指数为A股指数、B股指数以及基金指数，各自类型的证券对应各自类型的指数）
        	个股涨跌幅 = (今收盘价–昨复权后收盘价)/ 昨复权后收盘价
        	对下列指标统计连续３个交易日累计值的，按交易日从前往后累加，３日内任意某个交易日的累加值达标，则当日展示异动，并且该证券同一种异动类型从下一交易日开始重新计算。
        <b>异常波动类型代码:</b>
        <br>(1)1:非ST、*ST和S的A、B股，封闭式基金，连续3个交易日内日收盘价格涨幅偏离值累计达到20%
        20140108(不含)日前非ST和非*ST的A,B股，封闭式基金，连续3个交易日内日收盘价格涨幅偏离值累计达到20%
        <br>(2)2:非ST、*ST和S的A、B股，封闭式基金，连续3个交易日内日收盘价格跌幅偏离值累计达到20%
        20140108(不含)日前非ST和非*ST的A,B股，封闭式基金，连续3个交易日内日收盘价格跌幅偏离值累计达到20%
        <br>(3)3:ST、*ST和S的A、B股，连续3个交易日内日收盘价格涨幅偏离值累计达到15%
        20140108(不含)日前ST和*ST的A,B股，连续3个交易日内日收盘价格涨幅偏离值累计达到15%
        <br>(4)4:ST、*ST和S的A、B股，连续3个交易日内日收盘价格跌幅偏离值累计达到15%
        20140108(不含)日前ST和*ST的A,B股，连续3个交易日内日收盘价格跌幅偏离值累计达到15%
        <br>(5)5:所有A,B股，封闭式基金，连续3个交易日内日均换手率与前5个交易日的日均换手率的比值达到30倍，并且连续3个交易日内的累计换手率达到20%
        <br>(6)33:当日有涨跌幅限制的A股，连续2个交易日触及涨幅限制，在这2个交易日中同一营业部净买入股数占当日总成交股数的比重30％以上，且上市公司未有重大事项公告的（有效期至20140108(不含)）
        <br>(7)34:当日有涨跌幅限制的A股，连续2个交易日触及跌幅限制，在这2个交易日中同一营业部净卖出股数占当日总成交股数的比重30％以上，且上市公司未有重大事项公告的（有效期至20140108(不含)）
        <br>(8)35:ST股票、*ST股票和S股连续三个交易日触及涨幅限制（有效期至20140108(不含)）
        <br>(8)36:ST股票、*ST股票和S股连续三个交易日触及跌幅限制（有效期至20140108(不含)）
        <br>(9)37:风险警示股票当日换手率达到或超过30%
        20070917(不含)日前 ST股票、*ST股票和S股连续三个交易日触及涨(跌)幅限制
      </p>
    </Modal>
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
         :prop="item.key"
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
        <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
    </div>

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
    commonGetReqParam
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MKT_13080.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {
        collapse: '1',
        //显示隐藏输入条件
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
          startdate: new Date(),
          enddate: new Date(),
          // cxtype: '输入会员名称',
          zqCode: ''
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ],
          zqCode: [
            {required: true, message: '请输入/选择会员名称', trigger: 'change'}
          ]
        },
        //模糊查询数据
        // titles: '',
        // listShow: false,
        //表单
        // zqCodeList: [],
        t: ''
      }
    },
    watch: {
      titles: function () {
        let _this = this;
        /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
          this.$Message.error('证券代码输入不合法');
        }*/
        //证券代码联想
        // fetch('/bdsp-query-service/mem/cdnme', {
        //   method: "POST",
        //   mode: 'cors',
        //   body: JSON.stringify({
        //     "s": _this.titles,
        //     "userId": srcUseridA,
        //     "userName": srcUsernameA
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //     "signature": signatureA,
        //     "Authorization": AuthorizationA
        //   }
        // }).then(function (response) {
        //   return response.json()
        // }, function (error) {
        //   this.$Message.error('系统繁忙，刷新页面!');
        // }).then(data => {
        //   var _this = this;
        //   if (data.resData.length > 0) {
        //     this.listShow = true;
        //   } else {
        //     _this.listShow = false;
        //   }
        //   let codeData = data.resData,
        //     zqCodeList = [];
        //   for (var i = 0; i < codeData.length; i++) {
        //     let zqRow = {};
        //     zqRow.value = codeData[i];
        //     zqRow.label = codeData[i];
        //     zqCodeList.push(zqRow);
        //   }
        //   this.zqCodeList = zqCodeList;
        // })
      }
    },
    mounted(){
        var flag = true
        if(flag){
          // this.$router.push('/MKT_13080_print')
          this.goNextPage('/MKT_13080_print')
        }
    },
    methods: {
      print:function () {

        window.print()
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
        //document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        //document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
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
      // getTitleHandle(title) {
      //   let _this = this;
      //   this.titles = title;
      //   setTimeout(function () {
      //     _this.listShow = false;
      //   }, 300);
      // },
      /**
       * 隐藏模糊查询下拉信息框
       */
      // showListHandle() {
      //   this.listShow = false;
      // },
      /**
       * 查询功能
       */
      handleSubmit(name,isPageClick) {
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
            if(!isPageClick) this.returnN = 1;
            this.publicPagination(this.returnN, this.pageSize, true);
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {document.getElementById("exportCurrent").setAttribute("disabled",true);
        // let thisStr = this.titles.indexOf("-");
        // let thisVal = this.titles.slice(0, thisStr);
        // if (thisVal == "") {
        //   thisVal = 'ALL';
        // }
        //查询传送的参数
        this.searchParams = {
          // "memCde": thisVal,
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
          // "reQuery": statics,
          "businessId": "GDH_00016"
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/mkt13080';
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
          console.log(_this.t)
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
            var datalength = data.resData.totalCount
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

        var downfileParams = "row=1&type=bdsp_mkt13080&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +  "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          void(window.open('/dw/download/mktexcel?' + downfileParams +commonGetReqParam));
        }
      }
    }
  }
</script>

<style lang="less">
  .tc{
    background: #F5F8FA;
    margin: 0 30px;
    padding-top: 15px;
  }
  .tx{
    padding: 20px 31px;
    font-weight: 700;
    border-bottom: 0 solid #e3e8ee;
    /* padding: 20px 24px 22px 17px; */
    line-height: 120% !important;
    font-size: 20px;
    color: rgba(0,0,0,0.85) !important;
    height: initial !important;
  }
  #mkt13080 {
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
      padding-left: 0!important;
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

  .el-table thead.is-group th {
    background-color: #29a7de;
    color: #fff;
    text-align: center;
  }

  .el-table td, .el-table th {
    padding: 3px 0;
    font-weight: 100;
  }

  .cxTop {
    margin: 90px 0 0 0;
  }

  .ivu-table th {
    background-color: #29a7de;
    color: #fff;
  }

  .el-table__header-wrapper, .el-table__body-wrapper {
    overflow-y: scroll;
  }

  .el-table__body-wrapper {
    height: 550px;
    overflow: auto;
  }

  .el-table__empty-text{
    top:15px;
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
