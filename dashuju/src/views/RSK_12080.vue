<template>
  <section  id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <div id="tip">111</div>
    <div>
      <p class="infoTitle" v-if="(isShowMainBox == false)">股票退市市场指标计算<br><br>
        当日 <span class="c-red">{{thisTime}}</span>股票退市市场指标计算<span class="c-red">尚未完成</span>，建议在19:00以后查询，<span @click="isShowMainBox = true" style="cursor: pointer"><a
          href="javascript:void(0)">点此访问历史数据</a></span>
      </p>
    </div>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse"  v-if="isShowMainBox">
      <Panel name="1">
        <p v-if="isShowMainBox">股票退市市场指标计算
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <div class="flexBox">
            <Form-item prop="startdate" id="startDateForm" label="交易日期" :label-width="85">
              <Date-picker id="startDate" type="date" placeholder="选择交易日期"
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
    <Modal id="lookInfoPop" title="股票退市市场指标计算  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>整体说明:</h3>
      <p>
        1.本应用可查询时间起始范围为：当日
        <br>2.本应用可查询T日数据的时点为：T日20:00后
        <br>3.本应用限制最大查询时间区间为：无用户输入参数
      </p>
      <h3>单指标算法:</h3>
      <p>
        <b>各字段口径说明：</b>
        <br>1.股票代码	证券代码以6开头的A股股票代码（6xxxxx）
        <br>2.证券代码以900开头的B股股票代码（900xxx）
        <br>3.股票简称	该股票在计算日期当天的证券简称
        <br>4.起算时点（含本日）	该股票针对该项规则进行计算时的最早计算日期（含该日，因为各股票的期间停牌情况不同，所以起算时点可能不同）
        <br>5.截止时点（含本日）	计算日期当天
        <br>6.连续天数	该股票从起算时点到截止时点的非全天停牌的交易日天数
        <br>7.触及规则	数据仓库定义的规则代码，含义详见规则代码列表
      </p>
      <p>
        规则代码列表：
        <br>SV1	仅发行A股的上市公司因为其A股股票连续120个交易日累计成交量低于500万股而终止上市
        <br>SV2	仅发行B股的上市公司因为其B股股票连续120个交易日累计成交量低于100万股而终止上市
        <br>SV3	既发行A股又发行B股的上市公司因为其A股股票连续120个交易日累计成交量低于500万股并且其B股股票连续120个交易日累计成交量低于100万股而终止上市
        <br>SP1	仅发行A股的上市公司因为其A股股票连续20个交易日收盘价低于股票面值而终止上市
        <br>SP2	仅发行B股的上市公司因为其B股股票连续20个交易日收盘价低于股票面值而终止上市
        <br>SP3	既发行A股又发行B股的上市公司因为其A股股票连续20个交易日收盘价低于股票面值并且其B股股票连续20个交易日收盘价低于股票面值而终止上市
        <br>SH1	仅发行A股的上市公司因为其A股股票连续20个交易日持股投资者个数低于2000个而终止上市
        <br>SH2	仅发行B股的上市公司因为其B股股票连续20个交易日持股投资者个数低于2000个而终止上市
        <br>SH3	既发行A股又发行B股的上市公司因为其A股股票与B股股票合并计算连续20个交易日持股投资者个数低于2000个而终止上市
        <br>WV1	仅发行A股的上市公司因为其A股股票连续90个交易日累计成交量低于375万股而被警示或者其A股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于500万股而被再次警示
        <br>WV2	仅发行B股的上市公司因为其B股股票连续90个交易日累计成交量低于75万股而被警示或者其B股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于100万股而被再次警示
        <br>WV3	既发行A股又发行B股的上市公司因为其A股股票连续90个交易日累计成交量低于375万股并且其B股股票连续90个交易日累计成交量低于75万股而被警示或者其A股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于500万股并且其B股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于100万股而被再次警示
        <br>WP1	仅发行A股的上市公司因为其A股股票连续10个交易日收盘价低于股票面值而被警示
        <br>WP2	仅发行B股的上市公司因为其B股股票连续10个交易日收盘价低于股票面值而被警示
        <br>WP3	既发行A股又发行B股的上市公司因为其A股股票连续10个交易日收盘价低于股票面值并且其B股股票连续10个交易日收盘价低于股票面值而被警示
        <br>WA1	仅发行A股的上市公司因为其A股股票连续90个交易日累计成交量低于500万股而被警示或者其A股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于500万股而被再次警示
        <br>WA2	仅发行B股的上市公司因为其B股股票连续90个交易日累计成交量低于100万股而被警示或者其B股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于100万股而被再次警示
        <br>WA3	既发行A股又发行B股的上市公司因为其A股股票连续90个交易日累计成交量低于500万股并且其B股股票连续90个交易日累计成交量低于100万股而被警示或者其A股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于500万股并且其B股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于100万股而被再次警示
        <br>WH1	仅发行A股的上市公司因为其A股股票连续10个交易日持股投资者个数低于2000个而被警示
        <br>WH2	仅发行B股的上市公司因为其B股股票连续10个交易日持股投资者个数低于2000个而被警示
        <br>WH3	既发行A股又发行B股的上市公司因为其A股股票与B股股票合并计算连续10个交易日持股投资者个数低于2000个而被警示
        <br>WB1	仅发行A股的上市公司因为其A股股票连续5个交易日持股投资者个数低于2200个而被警示
        <br>WB2	仅发行B股的上市公司因为其B股股票连续5个交易日持股投资者个数低于2200个而被警示
        <br>WB3	既发行A股又发行B股的上市公司因为其A股股票与B股股票合并计算连续5个交易日持股投资者个数低于2200个而被警示
      </p>
      <p>
        <b>代码编制说明:</b>
        <br>第一位	S	终止上市 W	被警示
        <br>第二位	V	因为成交量低于标准  A	因为成交量低于终止上市标准而被警示  H	因为持股投资者个数低于标准   P 因为收盘价低于标准
        <br>第三位	1	发行A股且未发行B股的上市公司 2	发行B股且未发行A股的上市公司 3	既发行A股又发行B股的上市公司
      </p>
      <!--SV1： 仅发行A股的上市公司因为其A股股票连续120个交易日累计成交量低于500万股而终止上市。-->
      <!--<br>-->
      <!--SV2： 仅发行B股的上市公司因为其B股股票连续120个交易日累计成交量低于100万股而终止上市。-->
      <!--<br>-->
      <!--SV3： 既发行A股又发行B股的上市公司因为其A股股票连续120个交易日累计成交量低于500万股并且其B股股票连续120个交易日累计成交量低于100万股而终止上市。-->
      <!--<br>-->
      <!--SP1： 仅发行A股的上市公司因为其A股股票连续20个交易日收盘价低于股票面值而终止上市。-->
      <!--<br>-->
      <!--SP2： 仅发行B股的上市公司因为其B股股票连续20个交易日收盘价低于股票面值而终止上市。-->
      <!--<br>-->
      <!--SP3： 既发行A股又发行B股的上市公司因为其A股股票连续20个交易日收盘价低于股票面值并且其B股股票连续20个交易日收盘价低于股票面值而终止上市。-->
      <!--<br>-->
      <!--SH1： 仅发行A股的上市公司因为其A股股票连续20个交易日持股投资者个数低于2000个而终止上市。-->
      <!--<br>-->
      <!--SH2： 仅发行B股的上市公司因为其B股股票连续20个交易日持股投资者个数低于2000个而终止上市。-->
      <!--<br>-->
      <!--SH3： 既发行A股又发行B股的上市公司因为其A股股票与B股股票合并计算连续20个交易日持股投资者个数低于2000个而终止上市。-->
      <!--<br>-->
      <!--WV1： 仅发行A股的上市公司因为其A股股票连续90个交易日累计成交量低于375万股而被警示或者其A股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于500万股而被再次警示。-->
      <!--<br>-->
      <!--WV2： 仅发行B股的上市公司因为其B股股票连续90个交易日累计成交量低于75万股而被警示或者其B股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于100万股而被再次警示。-->
      <!--<br>-->
      <!--WV3： 既发行A股又发行B股的上市公司因为其A股股票连续90个交易日累计成交量低于375万股并且其B股股票连续90个交易日累计成交量低于75万股而被警示或者其A股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于500万股并且其B股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于100万股而被再次警示。-->
      <!--<br>-->
      <!--WA1： 仅发行A股的上市公司因为其A股股票连续90个交易日累计成交量低于500万股而被警示或者其A股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于500万股而被再次警示。-->
      <!--<br>-->
      <!--WA2： 仅发行B股的上市公司因为其B股股票连续90个交易日累计成交量低于100万股而被警示或者其B股股票之前已因成交量被警示但自起算时点至今累计成交量仍低于100万股而被再次警示。-->
      <!--<br>-->
      <!--WA3： 既发行A股又发行B股的上市公司因为其A股股票连续90个交易日累计成交量低于500万股并且其B股股票连续90个交易日累计成交量低于100万股而被警示或者其A股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于500万股并且其B股股票之前已因成交量被警示但自之前的起算时点至今不满120个交易日且累计成交量仍低于100万股而被再次警示。-->
      <!--<br>-->
      <!--WP1： 既发行A股又发行B股的上市公司因为其A股股票连续20个交易日收盘价低于股票面值并且其B股股票连续20个交易日收盘价低于股票面值而终止上市。-->
      <!--<br>-->
      <!--WP2： 仅发行B股的上市公司因为其B股股票连续10个交易日收盘价低于股票面值而被警示。-->
      <!--<br>-->
      <!--WP3： 既发行A股又发行B股的上市公司因为其A股股票连续10个交易日收盘价低于股票面值并且其B股股票连续10个交易日收盘价低于股票面值而被警示。-->
      <!--<br>-->
      <!--WH1： 仅发行A股的上市公司因为其A股股票连续10个交易日持股投资者个数低于2000个而被警示。-->
      <!--<br>-->
      <!--WH2： 仅发行B股的上市公司因为其B股股票连续10个交易日持股投资者个数低于2000个而被警示。-->
      <!--<br>-->
      <!--WH3： 既发行A股又发行B股的上市公司因为其A股股票与B股股票合并计算连续10个交易日持股投资者个数低于2000个而被警示。-->
      <!--<br>-->
      <!--WB1： 仅发行A股的上市公司因为其A股股票连续5个交易日持股投资者个数低于2200个而被警示。-->
      <!--<br>-->
      <!--WB2： 仅发行B股的上市公司因为其B股股票连续5个交易日持股投资者个数低于2200个而被警示。-->
      <!--<br>-->
      <!--WB3： 既发行A股又发行B股的上市公司因为其A股股票与B股股票合并计算连续5个交易日持股投资者个数低于2200个而被警示。-->
    </Modal>
    <div class="tableBox tab" v-if="isShowMainBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                         :formatter="formatData"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">

        </el-table-column>
      </el-table>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>
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
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/RSK_12080.js';
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
        isShowMainBox:new Date().getHours() >= 19 ? true : false,
        isHide: true,
        thisTime:new Date().format('yyyy-MM-dd'),
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
          startdate:  new Date().getHours() >= 19 ? new Date()  :  new Date(initialDate())
          // startdate:''
        },

        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: '',
        sums: []
      }
    },
    mounted() {
      $(".el-table__footer-wrapper").show();
      $(window).on('keydown',function(e){
        if(e.keyCode == 13){
          e.preventDefault()
        }
      })
      if(this.isShowMainBox){
        this.handleSubmit('formValidate')
      }
    },
    methods: {
      cellMouseEnter:function (row,col,cell,ev) {
        var dec = row.rule_code_desc
        $('#tip').text(dec).css({
          'left':(ev.pageX +20)+'px',
          'top':(ev.pageY -20)+'px',
          'display':'flex',
          'z-index':99
        })

        // console.log('enter >>>  ',row,col,cell,ev)
      },
      cellMouseLeave:function (row,col,cell,ev) {
        // console.log('leave <<<  ',row,col,cell,ev)
        $('#tip').text('').css({
          'left':0,
          'top':0,
          'display':'none'
        })
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
        document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
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
          var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
      publicPagination(pages, rows, statics) { document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          "rptDte": this.formValidate.startdate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "RSK_12080",

        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/rsk12080';
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
            _this.$alert("查询出错：" +  dataError,'错误',{
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
              // $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              for(var i=0;i<dataResponse.length;i++){
                dataResponse[i].order = i+1
              }
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + _this.tableData1.length + " 条记录");
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.formValidate.startdate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          var dp = '/dw/mktdt/rsk12080export?'

          void(window.open(dp + downfileParams + commonGetReqParam));
        }
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'calc_cnt') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>
<style scoped>
  #tip{
    border: 1px solid gray;
    background-color: #eee;
    border-radius: 5px;
    text-align: center;
    padding: 5px 8px;
    display: none;
    /*display: flex;*/
    position: absolute;
    left: 0;
    top:0;
  }
</style>
<style lang="less">
  .c-red{
    color: red;
  }

</style>
