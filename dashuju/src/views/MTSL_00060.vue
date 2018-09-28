<template>
  <section class="constWidth" id="fifteenCommon">
    <div id="mtsl00060">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>融资融券标的证券概况
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
            <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
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
                <div class="moreBtn">
                  <div @click="isShowMore = !isShowMore"><span v-show="isShowMore">收起 ∧</span><span v-show="!isShowMore">更多 ∨</span></div>
                </div>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </div>
              <div class="inputBox" v-if="isShowMore">
                <div><span>累计偏离值：</span><Input :value="inputDiff"  :maxlength=9 ref="inputDiff" v-model="inputDiff" placeholder="请输入累计偏离值"></Input>%</div>
                <div><span>统计天数：</span><Input :value="inputN"  :maxlength=9 ref="inputN" v-model="inputN" placeholder="请输入统计天数"></Input>天</div>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="融资融券标的证券概况  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一． 数据说明</b>
        <br>日期区间内满足偏离值条件的异常波动证券的统计指标
        <br><b>二． 指标说明</b>
        <br>1． 证券简称：该证券于“异常期间”的最后一天时的证券简称。
        <br>2． 异常期间：为N个交易日,N为“统计天数”条件，展示格式YYYYMMDD-YYYYMMDD，如果为3，举例20150225-20150227。最终展示结果时，对该证券进行判断，如果该证券在该异常期间均为融资融券标的（可融资或者可融券）则展示，否则排除。异常期间的期初和期末日期均应落在查询的“开始日期”和“结束日期”之间
        <br>3． 异常：指某证券N个交易日期间收盘价格涨跌幅%的绝对值大于或等于用户输入的阀值。
        <br>4． 单只证券T日收盘价格涨跌幅% = ( T日该证券收盘价 / T日该证券昨收盘价 – 1 ) * 100%
        <br>5． 基准指数T日涨跌幅% = (T日该指数收盘价 / T日该指数昨收盘价 – 1 ) * 100%
        <br>6． 期间单只证券或指数收盘价格涨跌幅% = ( 1 + D1日涨跌幅% ) * ( 1 + D2日涨跌幅% ) * …*( 1 + Dn日涨跌幅% ) - 1，其中D1为期初日期，Dn为期末日期
        <br>7． A股对应的基准指数为“A股指数”代码：000002；ETF对应的基准指数为“基金指数”代码：000011。
        <br>8． 累计成交量：异常期间内该证券在竞价系统的累计成交量，取闭市行情中的数据。
        <br>9． 累计成交金额：异常期间内该证券在竞价系统的累计成交金额，取闭市行情中的数据。
        <br>10． 融资买入金额：异常期间内全体E账户对该证券的累计融资买入金额（采用竞价系统成交明细数据统计，信用标签：M；买卖方向：B）
        <br>11． 卖券还款金额：异常期间内全体E账户对该证券的累计卖券还款金额（采用竞价系统成交明细数据统计，信用标签：M；买卖方向：S）
        <br>12． 融券卖出金额：异常期间内全体E账户对该证券的累计融券卖出金额（采用竞价系统成交明细数据统计，信用标签：S；买卖方向：S）
        <br>13． 买券还券金额：异常期间内全体E账户对该证券的累计买券还券金额（采用竞价系统成交明细数据统计，信用标签：S；买卖方向：B）
        <br>14． 信用交易金额占总成交金额比例 = ( ( 异常期间内该证券累计信用交易金额 / （ 异常期间内该证券累计成交金额 * 2 ）) * 100%
        <br>15． 信用交易金额：全体E账户的买入及卖出总金额。
        <br><b>三． 其他说明</b>
        <br>1． 仅展示满足累计偏离值条件的融资或融券标的。
        <br>2． 正常情况下，预期T日20:00以后可查询T日的数据。

      </Modal>

      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%">
          <el-table-column  :min-width="item.width" :formatter="formatterNumber" v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.key"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
          </el-table-column>
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
    commonGetReqParam,
    lastMonthFirstAndLastDay,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MTSL_00060.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
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
        sums: [],
        //  显示更多
        isShowMore: false,
      //  偏离值/统计天数
        inputDiff:20,
        inputN:3,
        recordQueryDate:''
      }
    },
    mounted() {
      console.log(lastMonthFirstAndLastDay())
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'start_end_date' || prop == 'sec_code' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
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
          var reg = /^\d{1,9}$|(^\d{1,9}\.+\d{1,9}$)/
          var reg2 = /^\d{1,9}$/
          console.log(this.$refs)

          if(!reg.test(this.inputDiff)){
            this.$Message.error('累计偏离值不能为空，并且为正数!');
            return
          }
          if(!reg2.test(this.inputN)){
            this.$Message.error('统计天数不能为空，并且为整数!');
            return
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
        document.getElementById("exportCurrent").setAttribute("disabled", true);
        //查询传送的参数
        this.searchParams = {
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          'inputN':parseFloat(this.inputN),
          'inputDiff':parseFloat(this.inputDiff),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00003"
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mtsl/mtsl_00060_data';
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
          console.log(data)
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            // this.$Message.warning("查询出错" + dataError);
            this.$alert("错误" + dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (datalength == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.recordQueryDate = _this.formValidate
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
      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.recordQueryDate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.recordQueryDate.enddate.format('yyyy-MM-dd') +'&inputN='+parseFloat(this.inputN)+'&inputDiff='+parseFloat(this.inputDiff);
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        void(window.open('/dw/mtsl/mtsl_00060_export?' + downfileParams + commonGetReqParam));
      },
    }
  }
</script>

<style lang="less">
  #mtsl00060 .moreBtn {
    color: #2db7f5;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }

  #mtsl00060 .inputBox {
     display: flex;
    padding: 10px;
    margin-top: 10px;
   }
  #mtsl00060 .inputBox>div{
    display: flex;
    align-items: center;

  }
  #mtsl00060 .inputBox>div:last-child{
    margin-left: 30px;
  }
  #mtsl00060 .inputBox span{
    line-height: 280%;
  }
  #mtsl00060 .inputBox input,#mtsl00060 .inputBox .ivu-input-type{
    width: 100px;
  }

  #mtsl00060 .el-table__footer-wrapper {
    display: block !important;
  }
</style>
