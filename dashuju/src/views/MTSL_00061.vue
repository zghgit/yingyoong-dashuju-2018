<template>
  <section class="constWidth">
    <!--头部logo-->
    <header></header>
    <h2 class="infoTitle">融资融券标的信用交易情况</h2>
    <div class="mainBox changeBox">
      <Row :gutter="gutterValue">
        <Col :span="leftPane">
        <span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>
        <Card class="iviewCard">
          <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
            <Icon type="load-c" size=40 class="loadIcon"></Icon>
            <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
          </Spin>
          <span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>
          <Modal id="lookInfoPop" title="融资融券标的信用交易情况  统计口径说明" v-model="changeInfo"
                 class-name="vertical-center-modal"
                 cancel-text>

             <h3>数据说明</h3>
             <p>日期区间内指定证券代码以及会员名称的信用交易情况</p>
             <h3>指标说明</h3>
             <p>
            1． 会员名称：该会员在所内会籍系统中的“会员全称”。<br>
            2． 期间参与信用交易账户总数：在用户设定的日期区间内，该会员下属E账户对该证券有过买入或卖出成交的账户数。<br>
             3． 期末融资余额：按照各会员上报的T2日沪市“融资融券业务余额汇总统计”数据，统计其中该会员该证券“融资余额”字段的汇总值。<br>
             4． 期间融资买入金额：SUM( 融资买入金额 )<br>
             5． 期间卖券还款金额：SUM( 卖券还款金额 )<br>
             6． 期间现金还款金额：SUM( 直接还款金额 )<br>
             7． 期末融券余额：按照各会员上报的T2日沪市“融资融券业务余额汇总统计”数据，统计其中该会员该证券“融券余量余额”字段的汇总值。<br>
             8． 期间融券卖出金额：SUM( T日融券卖出量 * 该证券T日收盘价 )<br>
             9． 期间买券还券金额：SUM( T日买券还券量 * 该证券T日收盘价 )<br>
             10．期间直接还券金额：SUM( T日直接还券量 * 该证券T日收盘价 )<br>
             11．期间新增融资余额占当前总融资余额比例 = ( 1 – T0日融资余额 / T2日融资余额) * 100%，当且仅当T2日融资余额为0时，结果为空。<br>
             12．期间新增融券余额占当前总融券余额比例= ( 1 – T0日融券余额 / T2日融券余额) * 100%，当且仅当T2日融券余额为0时，结果为空。
             </p>
             <h3>其他说明</h3>
             <p>
             1． 本应用的数据源各会员上报的沪市“融资融券业务余额汇总统计”数据为准。<br>
             2． 假设用户输入的起始日期为T1、结束日期为T2，则余额期初日期为T0，且为T1的前一交易日。<br>
             3． 正常情况下，预期T日22:30以后可查询T日的数据。因为会员可能于T+1日修改之前T日上报的数据，所以T+1日18:00以后可以查询T日的最终数据。<br>
             </p>
          </Modal>
          <!--头部logo-->
          <p id="infoTableList" class="redtext listlength"></p>
          <fastTable :width="1920" :bwidth="1920" :columns="tableColumns1" :data="tableData1"></fastTable>
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
        </Card>
        </Col>
        <Col :span="rightPane" class="infoRightCard">
        <Card class="iviewCard">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row class="dateBox">
              <Col span="12">
              <b>开始日期</b>
              <Form-item prop="startdate" id="startDateForm">
                <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <b>结束日期</b>
              <Form-item prop="enddate" id="endDateForm">
                <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              </Col>
            </Row>
            <b>会员名称</b>
            <Radio-group v-model="formValidate.cxtype" class="zqradio">
              <row>
                <div id="zqcode">
                  <section class="warp">
                    <div class="searchIpt clearFix">
                      <input @click="showListHandle" :value="titles" v-model="titles" placeholder="请输入/选择会员名称"
                             class="select-input"/>
                      <div class="select-down dropDown" v-show="listShow">
                        <ul class="list">
                          <li class="li-item" v-for="item in zqCodeList" @click="getTitleHandle(item.value)">{{
                            item.label }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </row>
            </Radio-group>
            <b>证券代码</b>
            <Radio-group v-model="formValidate.cxtype" class="zqradio">
              <row>
                <div id="zqcode">
                  <section class="warp">
                    <div class="searchIpt clearFix">
                      <input @click="showListHandle2" :value="searchCode" v-model="searchCode" placeholder="请输入/选择证券代码"
                             class="select-input"/>
                      <div class="select-down dropDown" v-show="listShow2">
                        <ul class="list">
                          <li class="li-item" v-for="item in zqCodeList2" @click="getTitleHandle2(item.value)">{{
                            item.label }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </row>
            </Radio-group>
            <Form-item>
              <div class="cxBox cxTop">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
              </div>
            </Form-item>
          </Form>
        </Card>
        </Col>
      </Row>
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
    downloadReqPath
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MTSL_00061.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {
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
          cxtype: '输入会员名称',
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
        //模糊查询：证券代码
        searchCode:'',
        zqCodeList2: [],
        listShow2:false
      }
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
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
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
      },
      searchCode: function () {
        let _this = this;
        /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
          this.$Message.error('会员名称输入不合法');
        }*/
        //会员名称联想
        fetch('/base-service/mem/cdnme', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            "s": _this.searchCode,
            "userId": srcUseridA,
            "userName": srcUsernameA
          }),
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
        }).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          var _this = this;
          if (data.resData.length > 0) {
            this.listShow2 = true;
          } else {
            _this.listShow2 = false;
          }
          let codeData = data.resData,
            zqCodeList = [];
          for (var i = 0; i < codeData.length; i++) {
            let zqRow = {};
            zqRow.value = codeData[i];
            zqRow.label = codeData[i];
            zqCodeList.push(zqRow);
          }
          this.zqCodeList2 = zqCodeList;
        })
      }
    },
    methods: {
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
      getTitleHandle2(title) {
        let _this = this;
        this.searchCode = title;
        setTimeout(function () {
          _this.listShow2 = false;
        }, 300);
      },
      /**
       * 隐藏模糊查询下拉信息框
       */
      showListHandle() {
        this.listShow = false;
      },
      showListHandle2() {
        this.listShow2 = false;
      },
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
          var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
        let thisStr = this.titles.indexOf("-");
        let thisVal = this.titles.slice(0, thisStr);
        if (thisVal == "") {
          thisVal = 'ALL';
        }
        //查询传送的参数
        this.searchParams = {
          "memCde": thisVal,
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
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
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
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
            this.$alert("查询出错" + dataError,'提示',{
              confirmButtonText:'确定'
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
        let thisStr = this.titles.indexOf("-");
        let thisVal = this.titles.slice(0, thisStr);
        var downfileParams = "type=GDH_00015&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&memCde=" + thisVal + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          void(window.open(downloadReqPath + downfileParams));
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
