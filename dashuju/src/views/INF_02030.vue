<template>
  <section id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>指定PBU被使用历史情况
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="enddate" id="endDateForm" label="PBU代码">
                <Input :value="searchCode" v-model="searchCode" placeholder="请输入PBU代码" class="select-input"></Input>
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
    <Modal id="lookInfoPop" title="指定PBU被使用历史情况  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <br>一．整体说明：
      <br>1) 本应用可查询指定PBU所有被使用历史
      <br>2) 本应用查询条件为PBU代码
      <br> 二．单指标算法：
      <br>序号 展示字段 展示字段算法或公式
      <br>1 开始日期 来自se003jyrqyyyymmdd001.txt，交易日期文件的Trade_Date
      <br>2 结束日期 来自se003jyrqyyyymmdd001.txt，交易日期文件的Trade_Date
      <br>3 PBU代码 来自se003STSEYYYYMMDD001.txt PBU信息表的Seat_Code
      <br>4 使用该PBU的会员代码 来自se003MMYMYYYYMMDD001.txt 会员信息表的Mem_Code
      <br>5 使用该PBU的会员名称 来自se003MMYMYYYYMMDD001.txt会员信息表的Mem_Name
      <br>6 是否出租 来自se003STSEYYYYMMDD001.txt PBU信息表的Seat_Status，当席位状态为10,11,14,15时代表出租，否则不出租
      <br>7 出租该PBU的会员代码 来自se003MMYMYYYYMMDD001.txt会员信息表的Mem_Code
      <br>8 出租该PBU的会员名称 来自se003MMYMYYYYMMDD001.txt会员信息表的Mem_Name
    </Modal>
    <div class="tableBox" id="tableData">
      <el-col :span="24">
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
  import {tableColumns1} from '../assets/js/INF_02030.js';
  import '../theme/threeCommon.less';
  import ElInput from "element-ui/packages/input/src/input";
  import '../theme/fifteenCommon.less';
  export default {
    components: {ElInput},
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
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate()),
          // cxtype: '输入会员名称',
          // zqCode: ''
          searchCode: ''
        },
        ruleValidate: {
          searchCode: [
            {required: true, message: '请输入PBU代码', trigger: 'click'}
          ],
        },
        //模糊查询数据
        // titles: '',
        // listShow: false,
        //表单
        // zqCodeList: [],
        t: '',
        //模糊查询：证券代码
        searchCode: '',
        zqCodeList2: [],
        listShow2: false
      }
    },
    watch: {
      // titles: function () {
      //   let _this = this;
      //   /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
      //     this.$Message.error('会员名称输入不合法');
      //   }*/
      //   //会员名称联想
      //   fetch('/bdsp-query-service/mem/cdnme', {
      //     method: "POST",
      //     mode: 'cors',
      //     body: JSON.stringify({
      //       "s": _this.titles,
      //       "userId": srcUseridA,
      //       "userName": srcUsernameA
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //       "signature": signatureA,
      //       "Authorization": AuthorizationA
      //     }
      //   }).then(function (response) {
      //     return response.json()
      //   }, function (error) {
      //     this.$Message.error('系统繁忙，刷新页面!');
      //   }).then(data => {
      //     var _this = this;
      //     if (data.resData.length > 0) {
      //       this.listShow = true;
      //     } else {
      //       _this.listShow = false;
      //     }
      //     let codeData = data.resData,
      //       zqCodeList = [];
      //     for (var i = 0; i < codeData.length; i++) {
      //       let zqRow = {};
      //       zqRow.value = codeData[i];
      //       zqRow.label = codeData[i];
      //       zqCodeList.push(zqRow);
      //     }
      //     this.zqCodeList = zqCodeList;
      //   })
      // },
      // searchCode: function () {
      //   let _this = this;
      //   /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
      //     this.$Message.error('会员名称输入不合法');
      //   }*/
      //   //会员名称联想
      //   fetch('/bdsp-query-service/mem/cdnme', {
      //     method: "POST",
      //     mode: 'cors',
      //     body: JSON.stringify({
      //       "s": _this.searchCode,
      //       "userId": srcUseridA,
      //       "userName": srcUsernameA
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //       "signature": signatureA,
      //       "Authorization": AuthorizationA
      //     }
      //   }).then(function (response) {
      //     return response.json()
      //   }, function (error) {
      //     this.$Message.error('系统繁忙，刷新页面!');
      //   }).then(data => {
      //     var _this = this;
      //     if (data.resData.length > 0) {
      //       this.listShow2 = true;
      //     } else {
      //       _this.listShow2 = false;
      //     }
      //     let codeData = data.resData,
      //       zqCodeList = [];
      //     for (var i = 0; i < codeData.length; i++) {
      //       let zqRow = {};
      //       zqRow.value = codeData[i];
      //       zqRow.label = codeData[i];
      //       zqCodeList.push(zqRow);
      //     }
      //     this.zqCodeList2 = zqCodeList;
      //   })
      // }
    },
    mounted() {

      $(window).on('keydown',function(e){
        if(e.keyCode == 13){
          e.preventDefault()
        }
      })
    },
    methods: {
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        // this.publicPagination(page, this.pageSize, false);
        this.handleSubmit('formValidate',true)
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        // this.publicPagination(this.returnN, pageSize, false);
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
       * 获取模糊查询选择框get的参数
       */
      // getTitleHandle(title) {
      //   let _this = this;
      //   this.titles = title;
      //   setTimeout(function () {
      //     _this.listShow = false;
      //   }, 300);
      // },
      // getTitleHandle2(title) {
      //   let _this = this;
      //   this.searchCode = title;
      //   setTimeout(function () {
      //     _this.listShow2 = false;
      //   }, 300);
      // },
      /**
       * 隐藏模糊查询下拉信息框
       */
      // showListHandle() {
      //   this.listShow = false;
      // },
      // showListHandle2() {
      //   this.listShow2 = false;
      // },
      /**
       * 查询功能
       */
      handleSubmit(name,isPageClick) {

        if (this.isHide == false) {
          return;
        }
        //验证
        var valid = true
        if (this.searchCode.trim() == '') {
          this.$Message.error('请填写PBU代码');
          return
        }
        if(this.searchCode.trim().length > 5){
          this.$Message.error('PBU代码不能超过五位');
          return
        }
        if (!(/^[0-9a-zA-Z]{1,9}$/).test(this.searchCode)) {
           this.$Message.error('PBU代码只能是字母、数字或者组合');
           return
         }
        if (valid) {
          this.$Message.success('提交成功!请等待~');
          if(!isPageClick) this.returnN = 1;
          this.publicPagination(this.returnN, this.pageSize, true);
        } else {
          this.$Message.error('查询失败!');
        }

  },
  /**
   * 分页、查询功能
   */
  publicPagination(pages, rows, statics)
  {document.getElementById("exportCurrent").setAttribute("disabled",true);
    // let thisStr = this.titles.indexOf("-");
    // let thisVal = this.titles.slice(0, thisStr);
    // if (thisVal == "") {
    //   thisVal = 'ALL';
    // }
    //查询传送的参数
    this.searchParams = {
      // "memCde": thisVal,
      // "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
      // "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
      'seatCode':this.searchCode,
      "userId": srcUseridA,
      "userName": srcUsernameA,
      "pageNo": pages,
      "pageSize": rows,
      // "reQuery": statics,
      "businessId": "GDH_00015"
    };

    //声明加载中
    $("#loadBox").removeClass("hide");
    //接口请求处理
    const url = '/dw/inf/inf02030';
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
        console.log(data)
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
  }
  ,
  /**
   * 导出Excel文件
   */
  exportData(type)
  {

    var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +'&seatCode='+this.searchCode
    if (type === 1) {
      $("#exportCurrent").attr("disabled");
      setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
      void(window.open('/dw/inf/inf02030export?'+ downfileParams +commonGetReqParam));
    }
  }
  }
  }
</script>

<style lang="less">

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
