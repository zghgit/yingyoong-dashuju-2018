<template>
  <section id="fifteenCommon" class="ss">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>报价回购阶段报表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="起始日期">
                <Date-picker id="startDate" type="date" placeholder="选择起始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="截止日期">
                <Date-picker id="endDate" type="date" placeholder="选择截止日期" v-model="formValidate.enddate"
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
    <Modal id="lookInfoPop" title="报价回购阶段报表  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <b>一．数据说明</b>
      <br>只包含综合业务平台报价回购数据
      <br><b>二．指标说明</b>
      <br>（1）批准额度为交易所批准的报价回购总额度。
      <br>（2）标准券总额度为根据会员质押库的所有无司法瑕疵的质押券根据标准券折算率计算出来的总额度。
      <br>（3）T日报价回购可用额度 = Min (Σ（T日质押库内无法律瑕疵质押券面值×该质押券折算率），报价回购批准额度) - T日开市前未到期报价回购总余额 -ΣT日新开报价回购金额 +ΣT日提前终止报价回购金额
      其中，T日开市前未到期报价回购总余额 = T-1日晚未到期报价回购总余额-ΣT日到期报价回购金额，根据中国结算T-1日晚上发给交易所的未到期数据表计算。
      <br>（4）可用额度占比为可用额度除以Min(批准额度，标准券总额）的百分比。
      <br>（5）占比 = 区间已用额度最大值 / min(批准额度, 标准券总额)
      <br>（6）当日交易的投资者人数是指参与报价回购正常交易的投资者人数。
      <br><b>三．其他说明</b>
      <br>所有统计均不包含国信证券。
    </Modal>
    <div class="tabTitle">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="报价回购交易明细报表（单位：亿元）" name="first">报价回购交易明细报表（单位：亿元）</el-tab-pane>
        <el-tab-pane label="截止日盘后报价回购可用额度报表（单位：亿元）" name="second">截止日盘后报价回购可用额度报表（单位：亿）</el-tab-pane>
        <el-tab-pane label="报价回购投资者情况表" name="thirdly">报价回购投资者情况表</el-tab-pane>
      </el-tabs>
    </div>
    <div class="tableBox">
      <el-col :span="24">
        <p v-show="this.activeName == 'first'" class="redtext listlength">{{infoTableList1}}</p>
        <el-table
          :data="tableData23_1"
          border
          show-summary
          :summary-method="getSumLast1"
          v-if="activeName == 'first'"
          style="width: 100%;">
          <el-table-column v-for="(item,index) in tableColumns23_1" :key="item.field"
             :prop="item.field"
             :label="item.title"
             :align="item.align"
             :width="item.width">
            <el-table-column v-for="(ite,index) in item.children" :key="item.field"
               :prop="ite.field"
               :label="ite.title"
               :formatter="fn_formatter1"
               :align="ite.align"
               :width="ite.width">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <p v-show="this.activeName == 'second'"  class="redtext listlength">{{infoTableList2}}</p>
        <el-table
          :data="tableData23_2"
          border
          show-summary
          :summary-method="getSumLast2"
          v-if="activeName == 'second'"
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in tableColumns23_2"
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :formatter="fn_formatter2"
            :align="item.align"
            :width="item.width">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <p v-show="this.activeName == 'thirdly'" class="redtext listlength">{{infoTableList3}}</p>
        <el-table
          :data="tableData23_3"
          border
          show-summary
          :summary-method="getSumLast3"
          v-if="activeName == 'thirdly'"
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in tableColumns23_3"
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :formatter="fn_formatter3"
            :align="item.align"
            :width="item.width">
          </el-table-column>
        </el-table>
      </el-col>
      <div v-if="activeName=='first'" class="pageModule">
        <Page :total="returnTotal" :current="returnN"
              :page-size="500" :page-size-opts=[500,1000]
              placement="top" show-sizer
              @on-page-size-change="tableChangeSize"
              @on-change="tableChange"></Page>
      </div>
      <div  v-if="activeName=='second'" class="pageModule">
        <Page :total="returnTota2" :current="returnN2"
              :page-size="500" :page-size-opts=[500,1000]
              placement="top" show-sizer
              @on-page-size-change="tableChangeSize2"
              @on-change="tableChange2"></Page>
      </div>
      <div  v-if="activeName=='third'"  class="pageModule">
        <Page :total="returnTota3" :current="returnN3"
              :page-size="500" :page-size-opts=[500,1000]
              placement="top" show-sizer
              @on-page-size-change="tableChangeSize3"
              @on-change="tableChange3"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
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
    initialMonth,
    commonGetReqParam,
    dateReg,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns23_1, tableColumns23_2, tableColumns23_3} from '../assets/js/BND_15023.js';

  import '../theme/threeCommon.less';
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


        //初始化表格信息
        tableColumns23_1: tableColumns23_1,
        tableColumns23_2: tableColumns23_2,
        tableColumns23_3: tableColumns23_3,

        tableData23_1: [],
        tableData23_2: [],
        tableData23_3: [],
        infoTableList1:'',
        infoTableList2:'',
        infoTableList3:'',

        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,

        //分页信息
        returnTota2: 0,
        returnN2: 1,
        dataArrayAll2: [],
        pageSize2: 500,

        //分页信息
        returnTota3: 0,
        returnN3: 1,
        dataArrayAll3: [],
        pageSize3: 500,

        quStartdate:'',
        quEnddate:'',
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择起始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择截止日期', trigger: 'change'}
          ]
        },
        t: '',
        //  tab页
        activeName:'first',
        //  子表格
        anchorTableModel: false,
      }
    },
    methods: {
      // 列：格式化字符
      fn_formatter1:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='new_amt' || prop == 'due_amt' || prop == 'due_amt' || prop == 'pre_end_amt' || prop == 'not_due_amt'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },
      // 列：格式化字符
      fn_formatter2:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='approver_limit' || prop == 'standard_amt'|| prop == 'usable_limit'|| prop == 'max_usable_range'|| prop == 'financing_investment_desc'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },
      // 列：格式化字符
      fn_formatter3:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='new_open_mem' || prop == 'day_close_mem'|| prop == 'mem_act'|| prop == 'deal_mem'|| prop == 'day_deal_mem'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },
      // tab页点击
      tabHandleClick:function (tab,ev) {
      },
      spanMethod({row, column, rowIndex, columnIndex}){
        if(columnIndex === 8 ){
          if(rowIndex % 2 === 0){
            return {
              rowspan:4,
              colspan:1
            };
          }else {
            return {
              rowspan:0,
              colspan:0
            }
          }
        }else if(columnIndex === 9 ){
          if(rowIndex % 2 === 0){
            return {
              rowspan:4,
              colspan:1
            };
          }else {
            return {
              rowspan:0,
              colspan:0
            }
          }
        }else if(columnIndex === 10 ){
          if(rowIndex % 2 === 0){
            return {
              rowspan:4,
              colspan:1
            };
          }else {
            return {
              rowspan:0,
              colspan:0
            }
          }
        }

      },
      // 点击显示子表格
      anchorClick: function (scope) {
        var self = this
        var obj = {
          secCode: scope.row.sec_code,
          querDte: scope.row.stat_date
        }
        this.anchorTableModel = true
        // $.ajax({
        //   type:'POST',
        //   timeout:600000,
        //   headers:commonHeader,
        //   url:'/dw/gdh/gdh_00008_detail',
        //   data:JSON.stringify(obj),
        //   success:function (res) {
        //     console.log(res)
        //     var dataArr = res.resData.result[0].data
        //     self.tableData01 = dataArr
        //   },
        //   error:function (err) {
        //     self.$Message.error('查询出错：',err);
        //   }
        // })
      },
      /**
       * 显示当前页  融资
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate',true, this.returnN, this.pageSize)
      },
      /**
       * 表格显示行数选择   融资
       */
      tableChangeSize: function (pageSize) {
        this.returnN = 1;
        this.pageSize = pageSize;
        this.handleSubmit('formValidate',true , this.returnN, this.pageSize)
      },



      /**
       * 显示当前页  融券
       */
      tableChange2: function (page) {
        this.returnN2 = page;
        this.handleSubmit('formValidate',true, this.returnN2, this.pageSize2)
      },
      /**
       * 表格显示行数选择  融券
       */
      tableChangeSize2: function (pageSize) {
        this.returnN2 = 1;
        this.pageSize2 = pageSize;
        this.handleSubmit('formValidate',true, this.returnN2, this.pageSize2)
      },
      /**
       * 显示                                                                                                                             当前页   担保品
       */
      tableChange3: function (page) {
        this.returnN3 = page;
        this.handleSubmit('formValidate',true, this.returnN3, this.pageSize3)
      },
      /**
       * 表格显示行数选择  担保品
       */
      tableChangeSize3: function (pageSize) {
        this.returnN3 = 1;
        this.pageSize3 = pageSize;
        this.handleSubmit('formValidate',true, this.returnN3, this.pageSize3)
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
      handleSubmit(name,isPageClick,returnNumS,pageSizeS) {

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
        //   //验证
        //   if (valid) {
        //     this.$Message.success('提交成功!请等待~');
        //     var f = ''
        //     f = this.activeName == 'first' ? 1 : 2
        //     if(!isPageClick){
        //       this.returnN = 1;
        //       f = 0
        //     }
        //     this.publicPagination(this.returnN, this.pageSize, f);
        //   } else {
        //     this.$Message.error('查询失败!');
        //   }
        // })
          //验证
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            if(!isPageClick) this.returnN = 1;
            this.publicPagination(returnNumS, pageSizeS, true);
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        this.infoTableList1 ='';
          this.infoTableList2 ='';
            this.infoTableList3 ='';
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quEnddate = this.formValidate.enddate.format('yyyy-MM-dd');
        this.searchParams = {
          "startDate": this.quStartdate,
          "endDate": this.quEnddate,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "BND_15023",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/bnd/bnd15023';
        // const url = '/45/bnd/bnd15023';
        this.tableData1 = [];
        this.dealitems = 0;
        let _this = this;
        this.dealitems = 0;
        this.returnTotal = 0;
        this.returnTota2 = 0;
        this.returnTota3 = 0;
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
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            // this.$Message.warning("查询出错" + dataError);
            this.$alert("查询出错" + dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData23_1 = [];
            _this.tableData23_2 = [];
            _this.tableData23_3 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            let dataResponse1 = data.resData[0].resData.data;
            let dataResponse2 = data.resData[1].resData.data;
            let dataResponse3 = data.resData[2].resData.data;
            let datalength1 = data.resData[0].resData.totalCount;
            let datalength2 = data.resData[1].resData.totalCount;
            let datalength3 = data.resData[2].resData.totalCount;
            if (dataResponse1.length == 0 && dataResponse2.length == 0 && dataResponse3.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData23_1 = [];
              _this.tableData23_2 = [];
              _this.tableData23_3 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems1 = datalength1;
              _this.dealitems2 = datalength2;
              _this.dealitems3 = datalength3;
              // if(this.activeName == this.first){
              //   _this.returnTotal = datalength1;
              // }else if(this.activeName ==  this.second){
              //   _this.returnTotal = datalength2;
              // }else if(this.activeName == this.thirdly){
              //   _this.returnTotal = datalength3;
              // }

              this.returnTotal = datalength1;  // 分页
              this.returnTota2 = datalength2;
              this.returnTota3 = datalength3;

               _this.tableData23_1 = dataResponse1;
               _this.tableData23_2 = dataResponse2;
               _this.tableData23_3 = dataResponse3;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              this.infoTableList1 = "查询结果共 " + this.dealitems1 + " 条记录";
              this.infoTableList2 = "查询结果共 " + this.dealitems2 + " 条记录";
              this.infoTableList3 = "查询结果共 " + this.dealitems3 + " 条记录";
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },
      // 合计
      getSumLast1() {
        var sums = []
        if(this.tableData23_1.length<1){
          sums = ['合计']
          for(var i=0;i<this.tableColumns23_1.length-2;i++){
            sums.push('')
          }
          return sums
        }else{
          var obj = this.tableData23_1[this.tableData23_1.length - 1]
          var arr = ['sec_term','new_amt','new_amt_pro','due_amt','due_amt_pro','pre_end_amt','pre_end_amt_pro','not_due_amt','not_due_amt_pro']
          for(var i=0;i<arr.length;i++){
            var key = arr[i]
            var v = obj[key]
            // sums.push(v)
            sums.push(formatTbousandth(v))
          }
        }
        return sums;
      },
      getSumLast2() {
        var sums = []
        if(this.tableData23_2.length<1){
          sums = ['合计']
          for(var i=0;i<this.tableColumns23_2.length-2;i++){
            sums.push('')
          }
          return sums
        }else{
          var obj = this.tableData23_2[this.tableData23_2.length - 1]
          var keyArr = []
          for(var i=0;i<this.tableColumns23_2.length;i++){
            var o = this.tableColumns23_2[i]
            keyArr.push(o.field)
          }
          for(var i=0;i<keyArr.length;i++){
            var v = obj[keyArr[i]]
            // sums.push(v)
            sums.push(formatTbousandth(v))
          }
        }
        return sums;
      },
      getSumLast3() {
        var sums = []
        if(this.tableData23_3.length<1){
          sums = ['合计']
          for(var i=0;i<this.tableColumns23_3.length-2;i++){
            sums.push('')
          }
          return sums
        }else{
          var obj = this.tableData23_3[this.tableData23_3.length - 1]
          var keyArr = []
          for(var i=0;i<this.tableColumns23_3.length;i++){
            var o = this.tableColumns23_3[i]
            keyArr.push(o.field)
          }
          for(var i=0;i<keyArr.length;i++){
            var v = obj[keyArr[i]]
            // sums.push(v)
            sums.push(formatTbousandth(v))
          }
        }
        return sums;
      },


      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&startDate=" + this.quStartdate +
          "&endDate="+  this.quEnddate;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);

        var dp = '/dw/download/bnd15023export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    },
    mounted() {
    },
  }
</script>
<style lang="less">
  .ss .el-tabs__content{
    display: none;
  }
  .ss .el-table__row:nth-last-child(1){
    display: none;
  }
  .el-table__footer-wrapper{
    display: block !important;
  }

</style>

