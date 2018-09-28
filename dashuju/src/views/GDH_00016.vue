<template>
  <section id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押式回购会员报送初始交易比对报表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
               <Form-item prop="startdate" id="startDateForm" label="开始日期">
                 <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                              v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
               </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期">
                <Date-picker id="endDate" type="date" placeholder="选择结束日期"
                             v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="会员名称">
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
    <Modal id="lookInfoPop" title="股票质押式回购会员报送初始交易比对报表  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>
        包含会员股票质押式回购交易数据与交易系统数据比对不一致数据
      </p>
      <h3>二．指标说明</h3>
      <p>
        1.本应用展示会员股票质押式回购交易数据与交易系统数据比对不一致的数据
        <br>2.交易系统初始交易成交编号: 在购回交易时，填写该笔购回对应的初次交易的成交序列号(交易类型为632:股票质押式回购初始交易)
        <br>3.交易系统初始交易日期: 填写对应的交易日期(交易类型为632:股票质押式回购初始交易)
        <br>4.交易系统证券代码: 约定购回式证券交易时填写标的物证券代码(交易类型为632:股票质押式回购初始交易)
        <br>5.会员上报初始交易成交编号: 对应初始交易成交编号
        <br>6.会员上报初始交易日期: 初始交易申报日期.
        <br>7.会员上报证券代码: 质押标的证券代码
      </p>
      <h3>三．其他说明</h3>
       <p>
         1.本应用从当天21点以后才可访问当天数据。
       </p>
    </Modal>
    <div class="tableBox" id="tableData">
      <el-col :span="24">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          style="width: 100%">
          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :min-width="item.width">
            <el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
                             :prop="items.field"
                             :label="items.title"
                             :align="items.align"
                             :min-width="items.width">
            </el-table-column>
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
    commonGetReqParam,
    commonHeader
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00016.js';
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
          ]
        },
        //模糊查询数据
        titles: '全部',
        listShow: false,
        //表单
        zqCodeList: [],
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
        fetch('/base-service/mem/cdnme', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            "s": _this.titles,
            "userId": srcUseridA,
            "userName": srcUsernameA
          }),
          headers:commonHeader
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
        let thisStr = this.titles.indexOf("(");
        var thisVal = ''

        if(thisStr < 0){
          thisVal = this.titles
        }else{
          thisVal = this.titles.slice(0, thisStr);
        }
        if (thisVal == '' || thisVal=='全部') {
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
          "reQuery": statics,
          "businessId": "GDH_00016"
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
          headers:commonHeader
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
        let thisStr = this.titles.indexOf("(");
        var thisVal = ''

        if(thisStr < 0){
          thisVal = this.titles
        }else{
          thisVal = this.titles.slice(0, thisStr);
        }
        if (thisVal == '' || thisVal =='全部') {
          thisVal = 'ALL';
        }
        var downfileParams = "type=GDH_00016&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&memCde=" + thisVal + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          void(window.open(downloadReqPath + downfileParams + commonGetReqParam));
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.searchIpt,.dropDown{
  width:350px;
}
.select-input{
  padding:0;
}
</style>
