<template>
  <section class="bnd15018" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>报价回购试点会员交易明细报表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="flexBox">
              <Form-item prop="startdate" label="交易日期" id="startDateForm">
                <Date-picker   id="startDate" type="date" placeholder="选择交易日期"
                               v-model="formValidate.startdate"
                               @on-change="startdateChange"
                               class="datePickerWidth"></Date-picker>
              </Form-item>
              <el-col :span="6">
              <Form-item id="memCode"
                         prop="currentReportType"
                         label="会员名称">
                <Select @on-change="selectMemCodeHandle"
                        v-model="currentReportType">
                  <Option v-for="(item,index) in memCodeList"
                          :value="item.mem_code"
                          :key="item.mem_code"
                          :label="item.mem_abbr"></Option>
                </Select>
              </Form-item>
                </el-col>
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
    <Modal id="lookInfoPop" title="报价回购试点会员交易明细报表  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      <b>一．数据说明</b>
      <br>只包含综合业务平台报价回购数据
      <br><b>二．指标说明</b>
      <br>1.占比为各品种占所有品种总和的百分比
      <br><b>三．其他说明</b>
      <br>无
    </Modal>
    <!--头部logo-->
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData18"
        border
        style="width: 100%;">
        <el-table-column v-for="(item,index) in tableColumns18" :key="index"
                         :prop="item.field"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
          <el-table-column v-for="(ite,index) in item.children" :key="index"
                           :prop="ite.field"
                           :label="ite.title"
                           :formatter="fn_formatter"
                           :align="ite.align"
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
  import {tableColumns18} from '../assets/js/BND_15018.js';
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
        tableColumns18: tableColumns18,
        tableData18: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        quStartdate:'',
        quCurrentReportType:'',
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
        memCodeList: [],
        currentReportType: 'mem_code',

        //  子表格
        anchorTableModel: false,
      }
    },
    mounted() {
      this.userNmae(this.formValidate.startdate.format('yyyy-MM-dd'));
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
        if(prop =='trade_amt' || prop == 'mature_amt' || prop == 'cutoff_amt' || prop == 'unmature_amt'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },
      startdateChange:function (val) {
        // 会员名称
        this.userNmae(val)
      },
      // 会员名称
      userNmae(tradeVal){
        let _this = this;
        // const url = '/bdsp-query-service/mem/cdnme';
        const url = '/dw/bnd/bnd15018mem';
        fetch(url, {
          method: "POST",
          // body: JSON.stringify({ }),
          body: JSON.stringify({
            // "tradeDate":this.formValidate.startdate.format('yyyy-MM-dd'),
            "tradeDate":tradeVal,
          }),
          mode: 'cors',
          headers: commonHeader
        }).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          this.memCodeList = data.resData.result[0].data;
          this.currentReportType = data.resData.result[0].data[0].mem_code;
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
        this.handleSubmit('formValidate')
      },
      // 当前选中的会员代码
      selectMemCodeHandle: function (item) {
        this.currentReportType = item
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
            this.$Message.error('请输入正确交易日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('交易日期不能大于当前日期！');
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
      publicPagination(pages, rows, statics) {
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quCurrentReportType = this.currentReportType;
        this.searchParams = {
          "tradeDate": this.quStartdate ,
          'memCde': this.quCurrentReportType,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "BND_15018",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/bnd/bnd15018';
        this.tableData18 = [];
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
            _this.tableData18 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData18 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData18 = _this.dataArrayAll;
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
        var downfileParams ="type=bdsp_bnd15018" +
          "&row=2" +"&userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&tradeDate=" + this.quStartdate +
          "&memCde="+this.quCurrentReportType;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/bndexcel?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style lang="less" scoped>

</style>
