<template>
  <section class="constWidth" id="sse20003">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>开户情况
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content"  >
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
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate',false);">查询</Button>
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
      <Modal id="lookInfoPop" title="开户情况  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．	整体说明：</b>
        <br>1)	本应用可查询时间起始范围为：1991年以来的数据
        <br>2)	本应用可查询T日数据的时点为：T日20:00后
        <br>3)	本应用限制最大查询时间区间为：无限制
        <br> <b>二．	单指标算法：</b>
        <br>序号	展示字段	展示字段算法或公式
        <br>1.	一码通新开户数	阶段内一码通新增的账户数之和
        <br>2.	一码通日均新开户数	阶段内一码通新增的账户数之和/阶段内交易天数
        <br>3.	一码通开户总数	阶段内期末一码通总数
        <br>4.	股票账户新增开户数	阶段内开设股票账户股东代码的账户数之和
        <br>5.	股票账户日均新增开户数	阶段内开设股票账户股东代码的账户数之和/阶段内交易天数
        <br>6.	股票账户开户总数	阶段内期末股票账户股东代码总数
        <br>7.	基金账户新增开户数	阶段内开设基金账户股东代码的账户数之和
        <br>8.	基金账户日均新增开户数	阶段内开设基金账户股东代码的账户数之和/阶段内交易天数
        <br>9.	基金账户开户总数	阶段内期末基金账户股东代码总数
        <br>10.	信用账户新增开户数	阶段内开设信用账户股东代码的账户数之和
        <br>11.	信用账户日均新增开户数	阶段内开设信用账户股东代码的账户数之和/阶段内交易天数
        <br>12.	信用账户开户总数	阶段内期末信用账户股东代码总数
        <br>13.	期权账户新增开户数	阶段内开设期权账户股东代码的账户数之和
        <br>14.	期权账户日均新增开户数	阶段内开设期权账户股东代码的账户数之和/阶段内交易天数
        <br>15.	期权账户开户总数	阶段内期末期权账户股东代码总数


      </Modal>
      <!--<Modal id="dayTableModel" width="1024" height="1200" :closable="false" v-model="dayTableModel"-->
             <!--class-name="vertical-center-modal" cancel-text>-->
        <!--&lt;!&ndash;表格弹窗&ndash;&gt;-->
        <!--<el-table-->
          <!--:data="dayTableData"-->
          <!--border-->
          <!--style="width: 100%;">-->
          <!--<template v-for="(item,index) in dayTableColumns">-->
            <!--<el-table-column  :key="index+(Math.random()*1)"-->
                              <!--:prop="item.field"-->
                              <!--:label="item.title"-->
                              <!--:align="item.align"-->
                              <!--:width="item.width">-->
              <!--<el-table-column  v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"-->
                                <!--:prop="ite.field"-->
                                <!--:label="ite.title"-->
                                <!--:align="ite.align"-->
                                <!--:width="ite.width">-->
              <!--</el-table-column>-->
            <!--</el-table-column>-->
          <!--</template>-->
        <!--</el-table>-->
        <!--<div class="exportBtn">-->
          <!--<Button id="exportCurrent2" type="primary" size="large" @click="exportData2()" disabled>-->
            <!--<Icon type="ios-download-outline"></Icon>-->
            <!--导出全部结果为XLSX文件-->
          <!--</Button>-->
        <!--</div>-->
      <!--</Modal>-->
      <!--头部logo-->
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="各类开户数据" name="first">各类开户数据</el-tab-pane>
        <el-tab-pane label="账户开户数据" name="second">账户开户数据</el-tab-pane>
      </el-tabs>
      <div class="tableBox">
        <p id="infoTableList"   class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          v-if="activeName == 'first'"
          style="width: 100%">
          <template v-for="(item,index) in tableColumns1">
            <el-table-column :min-width="item.width" :formatter="formatterNumber" v-if="item.hasAnchor"   :key="index+(Math.random()*1)"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <template scope="scope">
                <a @click="anchorClick(scope,0,1)">日</a>、
                <a @click="anchorClick(scope,1,2)">月</a>、
                <a @click="anchorClick(scope,1,3)">年</a>
              </template>
              <el-table-column :min-width="item.width" :formatter="formatterNumber"  v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"
                                :prop="ite.field"
                                :label="ite.title"
                                :align="ite.align"
                                :width="ite.width">
              </el-table-column>
            </el-table-column>
            <el-table-column :min-width="item.width" :formatter="formatterNumber" v-else  :key="index+(Math.random()*1)"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <el-table-column :min-width="item.width" :formatter="formatterNumber"  v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"
                                :prop="ite.field"
                                :label="ite.title"
                                :align="ite.align"
                                :width="ite.width">
              </el-table-column>
            </el-table-column>
          </template>
        </el-table>
        <el-table
          :data="tableData2"
          border
          v-if="activeName == 'second'"
          id="second"
          style="width: 100%">
          <template v-for="(item,index) in tableColumns2">
            <el-table-column :min-width="item.width" :formatter="formatterNumber" v-if="item.hasAnchor"   :key="index+(Math.random()*1)"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <template scope="scope">
                <a @click="anchorClick(scope,0,1)">日</a>、
                <a @click="anchorClick(scope,1,2)">月</a>、
                <a @click="anchorClick(scope,1,3)">年</a>
              </template>
              <el-table-column :min-width="item.width" :formatter="formatterNumber"  v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"
                                :prop="ite.field"
                                :label="ite.title"
                                :align="ite.align"
                                :width="ite.width">
              </el-table-column>
            </el-table-column>
            <el-table-column :min-width="item.width" :formatter="formatterNumber" v-else  :key="index+(Math.random()*1)"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <el-table-column :min-width="item.width"  :formatter="formatterNumber" v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"
                                :prop="ite.field"
                                :label="ite.title"
                                :align="ite.align"
                                :width="ite.width">
              </el-table-column>
            </el-table-column>
          </template>
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
    jump2NewPage,
    formatterNumber,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1,tableColumns11,tableColumns1Day,tableColumns22,tableColumns1Month,tableColumns2,tableColumns2Day,tableColumns2Month} from '../assets/js/SSE_20003.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
  import '../theme/fifteenCommon.less';
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
        tableColumns2:tableColumns2,
        tableData1: [],
        tableData2: [],
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

        //  tab页
        activeName:'first',
        //  是否显示日均
        isShowDayAvg:true,
        //  子表格是否展示
        dayTableModel:false,
        dayTableColumns:[],
        dayTableData:[],
        //  所有子表格
        tableColumns1Day:tableColumns1Day,
        tableColumns1Month:tableColumns1Month,
        tableColumns2Day:tableColumns2Day,
        tableColumns2Month:tableColumns2Month,
        sumAnchorTable:[
          [tableColumns1Day,tableColumns1Month],
          [tableColumns2Day,tableColumns2Month]
        ]
      }
    },
    mounted() {

    },
    watch:{
      isShowDayAvg:function () {
        if(this.isShowDayAvg){
          this.tableColumns1 = tableColumns1
          this.tableColumns2 = tableColumns2
        }else{
          // var tempArr = tableColumns11
          // tempArr.forEach((item,index)=>{
          //     if(item.children){
          //       item.children.splice(1,1)
          //     }
          // })
          this.tableColumns1 =tableColumns11
          this.tableColumns2 =tableColumns22
        }
      }
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'trade_date'){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      // tab页点击
      tabHandleClick:function (tab,ev) {
        this.activeName = tab.index == '0' ? 'first':'second'
        var f = tab.index == '0' ? 'block' : 'none'
        $('#infoTableList').css('display',f)
      },
      //点击子表格
      anchorClick:function (scope,ind,index) {
        console.log(scope,ind,index)
        var i = this.activeName == 'first' ? 0 : 1
        if (i == 0) {
          if (ind == 0) {
            this.dayTableColumns = this.tableColumns1Day
          } else {
            if(this.isShowDayAvg == false){
              this.dayTableColumns = this.tableColumns1Day
            }else{
              this.dayTableColumns = this.tableColumns1Month
            }
          }
          // this.dayTableColumns = (ind ==0 && this.isShowDayAvg == false) ? this.tableColumns1Month : this.tableColumns1Month
        } else {
          if (ind == 0) {
            this.dayTableColumns = this.tableColumns2Day
          } else {
            if(this.isShowDayAvg == false){
              this.dayTableColumns = this.tableColumns2Day
            }else{
              this.dayTableColumns = this.tableColumns2Month
            }
          }
          // this.dayTableColumns = (ind == 0 && this.isShowDayAvg == false) ? this.tableColumns2Month : this.tableColumns2Month
        }
        // this.dayTableColumns = this.sumAnchorTable[i][ind]
        console.log(this.dayTableColumns)
        var self = this
        var obj = {
          type:index,
          startDate:this.formValidate.startdate.format('yyyy-MM-dd'),
          endDate:this.formValidate.enddate.format('yyyy-MM-dd'),
          dayTableColumns:this.dayTableColumns,
          whichTable:this.activeName == 'first' ? 0 : 1
        }
        if(this.activeName == 'second'){
          obj.multiSecCode = scope.row.od
        }
        // this.dayTableModel = true
        // self.dayTableData = []
        // $("#exportCurrent2").attr("disabled");
        obj.url = '/dw/mktdt/sse_20003_detail' +(this.activeName == 'first' ? '' : 2 )
        jump2NewPage('SSE_20003_detail', {
          data: JSON.stringify(obj),
          title: (this.activeName == 'first' ? '各类开户数据：' :'账户开户数据：') + (this.activeName == 'first' ? '' : scope.row.sce_type+'：') +(['日','月','年'][index-1])
        },true)

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
      // 当前选中的会员代码
      selectMemCodeHandle:function (item) {
        this.currentReportType = item
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
            var f = ''
            f = this.activeName == 'first' ? 1 : 2
            if(!isPageClick){
              this.returnN = 1;
              f = 0
            }
            this.publicPagination(this.returnN, this.pageSize, f);
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
          'queryType':statics,
          // "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00011",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/sse_20003';
        if(statics <= 1) this.tableData1 = [];
        if(statics > 1) this.tableData2 = [];
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
          // $("#infoTableList").html("");
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            _this.$alert("错误" +  dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            // _this.$Message.warning("查询出错" + dataError);
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {

            if(data.resData[0] != null){
              console.log('1变了')
              this.tableData1 = data.resData[0].resData.data
              this.isShowDayAvg = data.resData[0].message == 'true' ? false : true
              console.log(this.isShowDayAvg)
            }
            if(data.resData[1] != null){
              console.log('2变了')
              this.tableData2 = data.resData[1].resData.data
            }
            // this.tableData1 = data.resData[0]!=null ? data.resData[0].resData.data :  this.tableData1;
            // this.tableData2 = data.resData[1]!=null ? data.resData[1].resData.data :  this.tableData2;
            if (this.tableData1.length == 0 && this.tableData2.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.tableData2 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {

              _this.dealitems = data.resData[0]!=null ? data.resData[0].resData.totalCount : _this.dealitems;
              _this.returnTotal = data.resData[0]!=null ? data.resData[0].resData.totalCount : _this.returnTotal;
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd')+ "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse_20003_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
      exportData2() {
        var str = ''
        if(this.activeName == 'second'){
          this.dayTableData.forEach((item,index)=>{
            str += item.od+','
          })
          str = str.slice(0,str.length-2)
        }
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd')+ "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        downfileParams += this.activeName == 'first' ? '' : '&multiSecCode='+str
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse_20003_detail'+ (this.activeName=='first' ? 1 : 2) +'_export?'
        console.log(dp+downfileParams)
        // void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style>
  #sse20003 #second table tr:nth-child(2) td:nth-child(2) {
    padding-left: 8px;
  }
  #sse20003 #second table tr:nth-child(5) td:nth-child(2) {
    padding-left: 8px;
  }

  #sse20003 #second table tr:nth-child(3) td:nth-child(2){
    padding-left: 15px;
  }
  #sse20003 #second table tr:nth-child(4) td:nth-child(2){
    padding-left: 15px;
  }
  #sse20003 #second table tr:nth-child(6) td:nth-child(2){
    padding-left: 15px;
  }
  #sse20003 #second table tr:nth-child(7) td:nth-child(2){
    padding-left: 15px;
  }
  #sse20003 .el-table__footer-wrapper{
    display: block !important;
  }
  #sse20003 .ivu-collapse-content{
    overflow: inherit !important;
  }
  #sse20003 .el-tabs__nav-scroll{
    padding-left: 30px !important;
  }
  #sse20003 .el-tabs__content{
    display: none;
  }
  #sse20003 .el-textarea{
    width: 100px;
    height: 100px;
    margin-left: 5px;
  }
  #sse20003 .el-textarea textarea{
    height: 100%;
    overflow: scroll;
    resize: none;
  }
</style>
<style lang="less" scoped>
  .tableBox{
    padding: 30px 30px;
  }
  .flexBox{
    display: flex;
    flex-wrap: wrap;
  }
  #anchorTableModel .ivu-modal-content{
    height: 800px;
  }
  #anchorTableModel .ivu-modal-body{
    height: 800px;
    max-height: 800px;
  }
  .submitBtnBox{
    display: flex;
    justify-content: center;
    align-items: center;

  }
  #lookInfoLink{
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }

</style>

