
<template>
  <section class="constWidth" id="hyb00040">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>约定购回及股票质押业务单证券集中度
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content"  >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>交易日期：</b>
                  <Date-picker   id="startDate" type="date" placeholder="选择交易日期"
                                 v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
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
      <Modal id="lookInfoPop" title="约定购回及股票质押业务单证券集中度  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
             cancel-text>
        1．有约定购回未到期或股票质押未到期或股票质押场内场外合计的证券代码才予以展示。
        <br>2．证券名称显示为“证券名称简称”。
        <br>3．根据中登系统提供的未到期数据，统计约定购回和股票质押的待购回初始交易金额，统计待购回初始交易金额时，仅统计在非担保交收中“交收成功”的数据。
        <br>4．调整后待购回初始交易金额=待购回初始交易金额-待购回初始交易金额变动
        <br>5．调整后担保物价值 = 担保物价值 + 其他担保物价值。
        <br>6．某项业务标的证券占总股本比例（%）= 该项业务的未到期数量 / 该证券的总股本 。
        <br>7．对于股票质押业务：根据综业平台成交数据明细的“扩展标识”前9位有效数字，第1-2位表示证券类别。当类别为“PT”时表示为无限售流通股，当类别为 “XL”时表示为限售流通股。
        <br>8．场内场外质押的无限售质押数据和限售质押数据取自会员部通过前端应用导入的数据。若查询当日用户没有录入数据，则取查询日期之后的最近一个日期的数据。若查询日或查询日之后用户没有录入数据，则展示为空。
        <br>9．两项合计的调整后待购回初始交易金额 = 调整后约定购回待购回初始交易金额 + 调整后股票质押待购回初始交易金额。
        <br>10．两项合计的标的证券占总股本比例（%） = （ 约定购回标的证券质押数量+股票质押标的证券质押数量 ）/ 该证券总股本。
        <br>11．三项合计担保占总股本比例（%） = （ 约定购回标的证券质押数量  + 场内场外标的证券质押数量 ） / 该证券总股本。
        <br>12．根据停牌信息文件，判断证券的状态判断连续停牌是否超过20交易日，即[T,T-19]如果都在连续停牌，则显示为“是”，否则显示为“否”。
        <br>13．页面表格中记录排序方式为：证券代码（正序从小到大）
        <br>14．通常情况下，对于约定购回业务的数据，在T+1日20:00才可获得T日统计数据。对于股票质押业务的数据，在T日20:00其可获得T日的统计数据。
        <br>15．若用户没有通过前端应用将场外质押数据导入的话，将会导致场外质押和三项合计的指标出现以下情况:
        <br>a) 场内场外质押合计的无限售股质量数量为空。
        <br>b) 场内场外质押合计的限售股质量数量为空。
        <br>c) 场内场外质押合计的质押数量占总股本比例为空。
        <br>d) 三项合计担保占总股本比例（%）= （ 约定购回标的证券质押数量） / 该证券总股本。
        <br>16．PK字段为证券代码和交易日期
      </Modal>
      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%">
          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
            <el-table-column v-for="(ite,index) in item.children" :key="index"
                             :prop="ite.field"
                             :label="ite.title"
                             :align="ite.align"
                             :formatter="fn_formatter"
                             :width="ite.width">
            </el-table-column>
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
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/HYB_00040.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
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
        tableColumns1: tableColumns1,
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
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
        if(prop =='ydgh_up_trade_amt' || prop == 'gpzy_up_trade_amt' || prop == 'gpzy_up_trade_amt_pt' || prop == 'gpzy_up_trade_amt_xl' || prop == 'nyhj_impawn_hold_vol_1' || prop == 'nyhj_impawn_hold_vol_2' || prop == 'lxhj_up_trade_amt'){
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
      handleSubmit(name,isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate} = this.formValidate;
          //日期格式验证
          var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
          var startdateValue = this.formValidate.startdate;
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
        //查询传送的参数
        this.searchParams = {
          "tradDate": this.formValidate.startdate.format('yyyy-MM-dd'),
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
        const url = '/dw/hyb/hyb_00040';
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
      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&tradDate=" + this.formValidate.startdate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/hyb00040Export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>

<style>
  #hyb00040 .ivu-collapse-content{
    overflow: inherit !important;
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
