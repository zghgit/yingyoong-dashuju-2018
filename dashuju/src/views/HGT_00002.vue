<template>
  <section class="constWidth" id="gdh00002">
    <!--头部logo-->
    <div id="fifteenCommon">
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>沪股通港盛公司每月预估交易费用
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content"  >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>查询年月：</b>
                  <Date-picker   id="startDate" type="month" placeholder="选择查询年月"
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
      <Modal id="lookInfoPop" title="沪股通港盛公司每月预估交易费用  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <b>一．	整体说明</b>
        <br>1.本应用可查询时间起始范围为：2014.11-now。
        <br>2.本应用可查询T月数据的时点为：T+1月第二个交易日20:00后。
        <br>3.本应用限制最大查询时间区间为：无限制。
        <br><b>二．	单指标算法</b>
        <br>1.交易日期	展示为‘YYYY年MM月’。
        <br>2.机构代号	会员信息表‘会员代码’。
        <br>3.机构名称	会员信息表‘会员全称’。
        <br>4.机构序号	会员信息表‘原系统会员顺序号’。
        <br>5.席位数（个）	根据输出年月，查询该月末最后一个交易日，席位历史信息中会员拥有的席位个数（不考虑席位状态以及是否注销）。
        <br>6.交易单元数（个）	根据输出年月，查询该月末最后一个交易日，PBU历史信息中会员拥有的PBU个数（不考虑PBU状态以及是否注销）。
        <br>7.当月交易单元使用费（元）	PBU需付费天数 * （PBU标准使用年费(来源上交所网站) / 当年自然日个数）。
        <br>8.当月交易单元流速费（元）	（每月会员待计费流速权个数 - 每月基础流速权） * （标准流速费(来源上交所网站) / 当年自然日个数）。
        <br>9.当月交易单元流量费（元）	每月会员交易类订单笔数 * 交易类订单流量费费率(来源上交所网站) +每月会员非交易类订单笔数 * 非交易类订单流量费费率(来源上交所网站)。
        <br>a)	商业银行（会员）、债券（证券品种）减免在此处处理，订单笔数中剔除商业银行及债券订单笔数，遇商业银行下的债券订单只计算商业银行减免（避免重复）；。
        <br>b)	货币基金及债券ETF不收取相关费用在此处处理，订单笔数中剔除证券代码为511xxx的证券。
        <br>10.当月补交交易单元费（元） 	(会员上月申请注销PBU或流速变小并且本月审核不通过的日期 - 会员上月申请注销PBU或流速变小日期)* （PBU标准使用年费(来源上交所网站) / 当年自然日个数）。
        <br>11.当月补交流速费（元）	(会员上月申请注销PBU或流速变小并且本月审核不通过的日期 - 会员上月申请注销PBU或流速变小日期)*对应PBU的流速权* （标准流速费(来源上交所网站) / 当年自然日个数）。
        <br>12.年度内累计交易单元使用费（元）	同当月算法，统计日期为上年12月1日自本月末。
        <br>13.年度内累计交易单元流速费（元）	同当月算法，统计日期为上年12月1日自本月末。
        <br>14.年度内累计交易单元流量费（元）	同当月算法，统计日期为上年12月1日自本月末。
        <br>15.该年度内累计年费（元）	年度内累计交易单元使用费+年度内累计交易单元流速费+年度内累计交易单元流量费。
         <br><b>三．其他说明</b>
        <br>无
      </Modal>
      <!--头部logo-->
      <div class="tableBox">

        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%;">

          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.key"
                           :label="item.title"
                           :align="item.align"
                           :formatter="fn_formatter"
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
    initialMonth,
    commonGetReqParam,
    monthReg,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/HGT_00002.js';
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
          startdate: new Date(initialMonth())
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
        if(prop =='seat_cnt' || prop == 'pbu_cnt' || prop == 'pbu_fee' || prop == 'vel_amt' || prop == 'flux_amt' || prop == 'patch_pbu_fee' || prop == 'patch_vel_amt' || prop == 'pbu_fee_year' || prop == 'vel_amt_year' || prop == 'flux_amt_year' || prop == 'tot_year_fee'){
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
          //月份格式验证
          // var r = /^\d{4}([-/.]?)\d{1,2}$/;
          // var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
          var r = monthReg
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确查询月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前月份
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('查询月份不能大于当前月份！');
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
          "yearMonth": this.formValidate.startdate.format('yyyy-MM'),
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
        const url = '/dw/hgt/hgt00002';
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&yearMonth=" + this.formValidate.startdate.format('yyyy-MM');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/hgt00002export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style>
  #gdh00002 .ivu-collapse-content{
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
