<template>
  <section class="bnd15021" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>报价回购品种区间统计表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
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
    <Modal id="lookInfoPop" title="报价回购品种区间统计表  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <b>一．数据说明</b>
      <br>只包含综合业务平台报价回购数据
      <br><b>二．指标说明</b>
      <br>1.占比为各品种占所有品种总合的百分比
      <br>2.区间成交金额为正常交易金额，不包含提前终止交易金额
      <br><b>三．其他说明</b>
      <br>无
    </Modal>
    <div class="tableBox tab">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData21"
        show-summary
        :summary-method="getSumLast"
        border
        tooltip-effect="dark"

        style="width: 100%">
        <template v-for="(item,index) in tableColumns21">
          <el-table-column
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :formatter="fn_formatter"
            :align="item.align == null ? 'center' : item.align"
            :min-width="item.width">
          </el-table-column>
        </template>
      </el-table>
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
  import {tableColumns21} from '../assets/js/BND_15021.js';
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
        tableColumns21: tableColumns21,
        tableData21: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,

        quStartdate:'',
        quEnddate:'',
        //日期初始化
        formValidate: {
          startdate: new Date(),
          enddate: new Date()
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
        //  子表格
        anchorTableModel: false,
      }
    },
    mounted() {

    },
    methods: {
      // 合并单元格   :span-method="spanMethod"
      // spanMethod({row, column, rowIndex, columnIndex}){
      //   let columnNmb = this.tableData21.length - 1;
      //   if(columnIndex === 8){
      //     if(rowIndex === 0){
      //       return {
      //         rowspan:columnNmb,
      //         colspan:1
      //       };
      //     }else {
      //       return {
      //         rowspan:0,
      //         colspan:0
      //       }
      //     }
      //     }else if(columnIndex === 9) {
      //         if(rowIndex === 0) {
      //           return {
      //             rowspan: columnNmb,
      //             colspan: 1
      //           };
      //         }else {
      //           return {
      //             rowspan:0,
      //             colspan:0
      //           }
      //         }
      //     }else if(columnIndex === 10) {
      //       if (rowIndex === 0) {
      //         return {
      //           rowspan: columnNmb,
      //           colspan: 1
      //         };
      //       } else {
      //         return {
      //           rowspan: 0,
      //           colspan: 0
      //         }
      //       }
      //   }
      // },
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='trade_amt' || prop == 'trade_ratio' || prop == 'start_unmature_amt' || prop == 'end_unmature_amt' || prop == 'avg_unmature_amt' || prop == 'start_std_amt' || prop == 'end_std_amt' || prop == 'avg_std_amt'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
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
        this.handleSubmit('formValidate')
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
          "businessId": "BND_15021",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/bnd/bnd15021';
        this.tableData21 = [];
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
            this.$alert("查询失败，" + dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData21 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData21 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData21 = _this.dataArrayAll;
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
       * 获取表格汇总行展示信息
       */
      getSumLast() {
        var sums = []
        if(this.tableData21.length<1){
          sums = ['合计']
          for(var i=0;i<this.tableColumns21.length-2;i++){
            sums.push('')
          }
          return sums
        }else{
          var obj = this.tableData21[this.tableData21.length - 1]
          var keyArr = []
          for(var i=0;i<this.tableColumns21.length;i++){
            var o = this.tableColumns21[i]
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
       * 无导出Excel文件
       */
      exportData() {
        var downfileParams = "type=bdsp_bnd15021" + "&row=1" +
          "&userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&startDate=" + this.quStartdate +
          "&endDate=" + this.quEnddate;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/bndexcel?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    },
    mounted() {
    },
  }
</script>
<style>
  .bnd15021 .el-table__row:nth-last-child(1){
    display: none;
  }
  .el-table__footer-wrapper{
    display: block !important;
  }

</style>


