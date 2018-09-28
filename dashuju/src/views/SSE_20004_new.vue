<template>
  <section class="constWidth" id="gdh00020">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>市场筹融资统计
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i
              :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content">
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
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }" style="z-index:9999999999999999">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="市场筹融资统计  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．	整体说明：</b>
        <br>1)	本应用可查询时间起始范围为：1991年以来的数据
        <br>2)	本应用可查询T日数据的时点为：T日20:00后
        <br>3)	本应用限制最大查询时间区间为：无限制
        <br><b>二．	单指标算法：</b>
        <br>序号	展示字段	展示字段算法或公式
        <br>1	筹资家数	阶段内涉及到筹资证券的家数，若阶段内一家证券筹资多次，则本指标只计+1处理
        <br>2	筹融资金额	阶段内筹融资金额之和

      </Modal>
      <!--<Modal id="anchorTableModel" width="1024" height="800" :closable="false" v-model="anchorTableModel"-->
             <!--class-name="vertical-center-modal" cancel-text>-->
        <!--<el-table-->
          <!--:data="tableData2"-->
          <!--border-->

          <!--style="width: 100%">-->
          <!--<template v-for="(item,index) in anchorTableColumn">-->
            <!--<el-table-column :key="index"-->
                             <!--:prop="item.field"-->
                             <!--:label="item.title"-->
                             <!--:align="item.align"-->
                             <!--:width="item.width">-->
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
      <div class="tableBox">
        <p  id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          :span-method="arraySpanMethod"
          style="width: 100%">
          <template v-for="(item,index) in tableColumns1">
            <el-table-column :min-width="item.width" :formatter="formatterNumber" v-if="item.hasAnchor" :key="index"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <template scope="scope">
                <span :class="{ 't-b' : scope.row.sec_type_th == '首发合计' ||  scope.row.sec_type_th == '再发合计' || scope.row.sec_type_th == '筹资合计' || scope.row.sec_type_th == '市场合计' || scope.row.sec_type_th == '公司债融资合计'}">{{scope.row.sec_type_th}}</span><a @click="anchorClick(scope)" style="margin-left: 20px">个劵明细</a>
              </template>
            </el-table-column>
            <el-table-column :min-width="item.width" :formatter="formatterNumber" v-else :key="index"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
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
  import {tableColumns1, anchorTableColumn} from '../assets/js/SSE_20004.js';
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
        anchorTableColumn: anchorTableColumn,
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
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
        //  子表格
        // anchorTableModel: false,
        tableData2: []
      }
    },
    mounted() {


    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'sec_code' || prop == 'list_date' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      //点击子表格
      anchorClick: function (scope) {
        console.log(scope)
        var obj = {
          multiSecCode: '',
          startDate: this.formValidate.startdate.format('yyyy-MM-dd'),
          endDate: this.formValidate.enddate.format('yyyy-MM-dd'),
        }
        var self = this
        // this.anchorTableModel = true
        this.isHide = true
        obj.multiSecCode = scope.row.od
        if (scope.row.sec_type_f == 'A股' && scope.row.sec_type_th == '筹资合计') {
          obj.multiSecCode = '1021,1022,1023,1024,1025,1010'
        }
        if (scope.row.sec_type_f == 'B股' && scope.row.sec_type_th == '筹资合计') {
          obj.multiSecCode = '2010,2020'
        }
        if (scope.row.sec_type_f == '优先股' && scope.row.sec_type_th == '筹资合计') {
          obj.multiSecCode = '3010,3020'
        }
        if (scope.row.sec_type_f == '公司债' && scope.row.sec_type_th == '筹资合计') {
          obj.multiSecCode = '4010,4011,4012,4013,4014,4015'
        }
        if (scope.row.sec_type_f == '市场合计') {
          obj.multiSecCode = '1021,1022,1023,1024,1025,1010,2010,2020,3010,3020,4010,4011,4012,4013,4014,4015'
        }
        console.log(obj)
        if(scope.row.sec_type_f == '公司债' || scope.row.sec_type_f == '可转换债券' || scope.row.sec_type_f == '交换债' || scope.row.sec_type_f == '私募债'|| scope.row.sec_type_f == '证券公司短债'||scope.row.sec_type_f == '可分离债券' || scope.row.sec_type_f =='公司债融资合计'){
          obj.hasSendNumber = false
        }else{
          obj.hasSendNumber = true
        }
        jump2NewPage('SSE_20004_detail', {
          data: JSON.stringify(obj),
          title:scope.row.sec_type_f+' - '+ scope.row.sec_type_th
        },true)


      },
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
      // 当前选中的会员代码
      selectMemCodeHandle: function (item) {
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
        //查询传送的参数
        this.searchParams = {
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00011",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/sse_20004';
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
            _this.$alert("错误" +  dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData[0].data;
            var datalength = data.resData[0].size;
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
              $("#infoTableList").html("查询结果共 " + _this.dealitems + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },

      // 合并单元格
      arraySpanMethod: function ({row, column, rowIndex, columnIndex}) {
        var arr = [
          [0, 8],
          [8, 11],
          [11, 14],
          [14, 21]
        ]
        if (rowIndex == 0) {
          if (columnIndex == 0) {
            return [8, 1]
          }
        } else if (rowIndex < 8) {
          if (columnIndex == 0) {
            return [0, 1]
          }
        } else if (rowIndex == 8) {
          if (columnIndex == 0) {
            return [3, 1]
          }
        } else if (rowIndex < 11) {
          if (columnIndex == 0) {
            return [0, 1]
          }
        } else if (rowIndex == 11) {
          if (columnIndex == 0) {
            return [3, 1]
          }
        } else if (rowIndex < 14) {
          if (columnIndex == 0) {
            return [0, 1]
          }
        } else if (rowIndex == 14) {
          if (columnIndex == 0) {
            return [7, 1]
          }
        } else if (rowIndex < 21) {
          if (columnIndex == 0) {
            return [0, 1]
          }
        }
      },
      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') + "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse_20004_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
      exportData2() {
        var str = ''
        this.tableData2.forEach((item, index) => {
          str += item.od + ','
        })
        str = str.slice(0, str.length - 2)
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') + "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        downfileParams += '&multiSecCode=' + str
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse_20004_detail_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style>
  .t-b{
    font-weight: bold;
  }
  #gdh00020 .el-table__footer-wrapper {
    display: block !important;
  }

  #gdh00020 .ivu-collapse-content {
    overflow: inherit !important;
  }
</style>
<style lang="less" scoped>
  .tableBox {
    padding: 30px 30px;
  }

  .flexBox {
    display: flex;
    flex-wrap: wrap;
  }

  .submitBtnBox {
    display: flex;
    justify-content: center;
    align-items: center;

  }

  #lookInfoLink {
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }
</style>

