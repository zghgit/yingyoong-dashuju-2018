<template>
  <section class="constWidth" id="gdh00020">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>股票质押回购交易业务日报下载
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

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
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="股票质押回购交易业务日报下载  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br>各表格指标统计口径如下：
        <br>表1：股票质押回购交易概括
        <br>1. 待购回余额指当日股票质押式业务待购回金额合计。
        <br>2. 客户数量指当日待购回的账户数量。
        <br>3. 质押股票市值，指当日已质押未购回的证券数量 * 当日收盘价，债券使用全价计算。
        <br>4. 履约保障比例(%)=调整后标的证券市值/初始交易金额，其中调整后标的证券市值为调整后标的证券数量在查询指定日期的收盘市值，对于标的证券类型为债券时，收盘价需使用全价=行情中收盘净价+当日应计利息。
        <br>5. 平仓线以下指履约保障比例小于等于130%。
        <br>6. 当日违约处置金额指当日交易类型为违约处置的交易金额。客户数量指涉及到违约处置的账户数量。
        <br>表2：股票质押回购单一股票质押集中度最高前10名
        <br>1. 按质押集中度展示当天质押集中度排名前十的证券代码及证券名称。
        <br>2. 质押集中度比例（%） = 持有待购回证券数量 * 100.00000 / 持有待购回证券总股本。采用百分比表示，保留5位小数。
        <br>表3：股票质押回购融资方情况
        <br>1. 统计人数时，仅统计股票质押回购业务融资方的股东账户，若某股东持有某任一证券比例大于或等于5%，则该股东计入持股5%及以上股东的人数。
        <br>2. 其他股东 = 合计持股人数 – 上市公司持股5%及以上股东人数。
        <br>3. 持股比例（%） = 当日该股东持有该证券的流通和非流通股本 * 100.00 / 当日该证券总股本。
        <br>4. 统计待购回金额时，若某股东持有两个证券，其中一个持股比例超过5%，另外一个不超过5%，则超过5%部分计入持股5%以上的待购回金额，5%以下的待购回则计入其他股东的待购回金额中。.
        <br>表4：股票质押回购当日交易情况
        <br>1. 初始交易金额，指当日交易类型为初始交易的交易金额。剔除交收失败的数据。
        <br>2. 购回交易金额，指当日交易类型为购回交易、部分解质和终止购回的交易金额。
        <br>表5：股票质押回购履约保障比例小于130％客户金额最大前10名情况
        <br>1. 履约保障比例(%)=调整后标的证券市值/初始交易金额，其中调整后标的证券市值为调整后标的证券数量在查询指定日期的收盘市值，对于标的证券类型为债券时，收盘价需使用全价=行情中收盘净价+当日应计利息。
        <br>2. 按照待购回余额排序。剔除交收失败的数据。
        <br>表6：股票质押回购履约保障比例小于130％券商金额最大前10名情况
        <br>1. 履约保障比例(%)=调整后标的证券市值/初始交易金额，其中调整后标的证券市值为调整后标的证券数量在查询指定日期的收盘市值，对于标的证券类型为债券时，收盘价需使用全价=行情中收盘净价+当日应计利息。
        <br>2. 按照待购回余额排序。剔除交收失败的数据。
      </Modal>

      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%">
          <template v-for="(item,index) in tableColumns1">
            <el-table-column v-if="item.hasAnchor" :key="index"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <template scope="scope">
                <a @click="anchorClick(scope)">{{scope.row.value}}</a>
              </template>
            </el-table-column>
            <el-table-column v-else :key="index"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
            </el-table-column>
          </template>
        </el-table>
        <!--<div class="exportBtn">-->
        <!--<Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>-->
        <!--<Icon type="ios-download-outline"></Icon>-->
        <!--导出全部结果为XLSX文件-->
        <!--</Button>-->
        <!--</div>-->
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
    lastMonthDay
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00020.js';
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
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        //日期初始化
        formValidate: {
          startdate: new Date(lastMonthDay()),
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
      }
    },
    mounted() {

    },
    methods: {
      anchorClick: function (scope) {
        console.log(scope)
        var url = '/dw/gdh/gdh_00020?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&tradeDate=' + scope.row.key+ commonGetReqParam
        window.open(url)
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
      handleSubmit(name,isPageClick) {

        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate, enddate} = this.formValidate;
          //日期格式验证
          var r = dateReg
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
      publicPagination(pages, rows, statics) {
        this.isHide = false;
        var self = this
        $.get('/dw/gdh/gdh_00012_datelist?userId=' + srcUseridA +
          '&userName=' + srcUsernameA + '&signature=' + signatureA +
          '&Authorization=' + AuthorizationA +
          '&startDate=' + this.formValidate.startdate.format('yyyy-MM-dd') +
          '&&endDate=' + this.formValidate.enddate.format('yyyy-MM-dd') +
          commonGetReqParam, function (data) {
          if (data.success) {
            self.tableData1 = data.resData
          } else {
            self.$Message.error('查询失败！')
          }
          self.isHide = true
          $("#infoTableList").html("查询结果共 " + self.tableData1.length + " 条记录");
          //       //隐藏加载中
          $("#loadBox").addClass("hide");
        })

        //
        // //查询传送的参数
        // this.searchParams = {
        //   "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
        //   "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
        //   "userId": srcUseridA,
        //   "userName": srcUsernameA,
        //   // "reQuery": statics,
        //   "pageNo": pages,
        //   "pageSize": rows,
        //   "businessId": "GDH_00011",
        // };
        // //声明加载中
        // $("#loadBox").removeClass("hide");
        // //接口请求处理
        // const url = '/swg/gdh/gdh_00012_datelist';
        // this.tableData1 = [];
        // this.dealitems = 0;
        // var _this = this;
        // _this.returnTotal = 0;
        // _this.dataArrayAll = [];
        // _this.isHide = false;
        // this._fetch(fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify(_this.searchParams),
        //   mode: 'cors',
        //   headers: commonHeader
        // }), 600000).then(function (response) {
        //   return response.json()
        // }, function (error) {
        //   $("#loadBox").addClass("hide");
        //   _this.$Message.error('系统繁忙，刷新页面!');
        //   _this.isHide = true;
        // }).then(data => {
        //   if (_this.t != '') {
        //     clearTimeout(_this.t);
        //   }
        //   ;
        //   this.isHide = true;
        //   //取数据
        //   $("#infoTableList").html("");
        //   var rtnStatic = data.success;
        //   var dataError = data.message;
        //   if (rtnStatic == false) {
        //     $("#loadBox").addClass("hide");
        //     _this.$Message.warning("查询出错" + dataError);
        //     _this.tableData1 = [];
        //     _this.dealitems = 0;
        //     $("#exportCurrent").attr("disabled");
        //   } else {
        //     var dataResponse = data.resData.result[0].data;
        //     var datalength = data.resData.result[0].size;
        //     if (dataResponse.length == 0) {
        //       $("#loadBox").addClass("hide");
        //       _this.tableData1 = [];
        //       _this.dealitems = 0;
        //       _this.$Message.warning('查询无数据！');
        //       $("#exportCurrent").attr("disabled");
        //     } else {
        //       _this.dealitems = datalength;
        //       _this.dataArrayAll = dataResponse;//保存所有数据
        //       _this.returnTotal = datalength;
        //       _this.tableData1 = _this.dataArrayAll;
        //       $("#exportCurrent").removeAttr("disabled");
        //       _this.isHide = true;
        //       //查询结果提示变化1
        //       $("#infoTableList").html("查询结果共 " + _this.dealitems + " 条记录");
        //       //隐藏加载中
        //       $("#loadBox").addClass("hide");
        //     }
        //   }
        // });
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
        var dp = '/dw/download/bndexcel?type=bdsp_bnd15014&row=1&'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style>
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

