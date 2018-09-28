<template>
  <section class="hyb00030" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>报价回购营业部成交简报
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="100">
            <div class="flexBox">
              <Form-item prop="startdate"
                         id="startDateForm"
                         label="交易日期">
                <Date-picker   id="startDate"
                               type="date"
                               placeholder="选择交易日期"
                               v-model="formValidate.startdate"
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
    <Modal id="lookInfoPop" title="报价回购营业部成交简报  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
     <b> 一．数据说明：</b>
      <br> 数据时间范围：20090525(报价回购业务上线首日)到当前交易日，必须于每日14:30以后才可以访问到当日营业部成交简报数据
      <br>证券选择范围：只统计报价回购交易和未到期数据，证券代码为205打头
      <br><b>二．指标说明：</b>
      <br>成交金额单位为万元，保留两位小数
      <br>成交数量单位为手
      <br>成交笔数单位为笔
      <br>回购未到期金额单位为万元，保留两位小数
      <br>所有比例保留两位小数，以%表示
      <br>营业部以“会员名称-营业部名称”表示
      <br><b>三．其他说明：</b>
      <br>以投资者的前一日清算后指定席位为准，根据指定席位所属营业部确定统计营业部。
      <br>持有未到期回购投资者人数为到当日收盘为止仍然持有未到期回购的不同的投资者人数，从当日的未到期数据中获得历史的未到期部分，从当日的报价回购交易中获取当日部分，汇总推算出持有未到期回购投资者人数
      <br>回购未到期金额为到当日收盘为止仍然未被购回的金额。从当日未到期数据中获取历史未到期部分，从当日报价回购交易中获取当日部分，汇总推算出回购未到期金额总数。
    </Modal>
    <!--头部logo-->
    <div class="tableBox">

      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData02"
        border
        tooltip-effect="dark"

        style="width: 100%">
        <template v-for="(item,index) in tableColumns02">
          <el-table-column
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :align="item.align == null ? 'center' : item.align"
            :formatter="fn_formatter"
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
  import {tableColumns02} from '../assets/js/BND_15002.js';

  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
    data() {
      return {
        collapse:'1',
        //显示隐藏输入条件
        changeArrow: 'rightArrow',
        gutterValue: 16,
        leftPane: 19,
        rightPane: 5,
        isHide: true,
        //统计口径
        changeInfo: false,
        //初始化表格信息
        tableColumns02: tableColumns02,
        tableData02: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        pageSize: 500,
        //日期初始化
        quStartdate:'',
        formValidate: {
          startdate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择交易日期', trigger: 'change'}
          ]
        },
        t: '',
      }
    },
    mounted() {
      $(window).on('keydown',function(e){
        if(e.keyCode == 13){
          e.preventDefault()
        }
      })
    },
    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='sum_trade_amt' || prop == 'trade_ratio'|| prop == 'tot_trade_vol'|| prop == 'tot_trade_cnt'|| prop == 'acct_cnt'|| prop == 'unmature_acct_cnt'|| prop == 'sum_unmature_vol'|| prop == 'unmature_ratio'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
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
       * 显示隐藏左右
       */
      hideRightBox: function () {
        (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
        (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
        (this.gutterValue == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
        (this.changeArrow == 'rightArrow') ? this.changeArrow = 'leftArrow' : this.changeArrow = 'rightArrow';

      },
      /**
       *
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
          const {startdate} = this.formValidate;
          //日期格式验证
          // var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
          var r = dateReg
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确查询日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('查询日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          let startdateValue = this.formValidate.startdate;
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
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd')
        this.searchParams = {
          // 2014-12-18
          "tradeDate": this.quStartdate,
          "pageSize": rows,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "businessId": "BND_15002",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/bnd/bnd15002';
        this.tableData02 = [];
        this.dealitems = 0;
        var _this = this;
        _this.returnTotal = 0;
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
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData02 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.returnTotal = datalength;
              _this.tableData02 = dataResponse;
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
        var downfileParams ="type=bdsp_bnd15002" + "&userId=" + srcUseridA +
          "&userName=" + srcUsernameA + "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA + "&row=1" +
          "&tradeDate=" + this.quStartdate;
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/bndexcel?';
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style lang="less" scoped>
  .tableBox{
    padding: 30px 30px;
  }
  .flexBox{
    display: flex;
    flex-wrap: wrap;
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
