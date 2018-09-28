<template>
  <div class="bnd15001" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>报价回购简报
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="查询日期">
                <Date-picker   id="startDate" type="date" placeholder="选择查询日期"
                               v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <el-col :span="6">
                <Form-item id="memCode" label="简报类型">
                  <!--<b>简报类型</b>-->
                  <Select @on-change="selectMemCodeHandle"
                          v-model="currentReportType">
                    <Option v-for="(item,index) in memCodeList"
                            :value="index" :key="item.key"
                            :label="item.value"></Option>
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
    <Modal id="lookInfoPop" title="报价回购简报  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      <b>一．数据说明：</b>
      <br>数据时间范围：20090525(报价回购业务上线首日)到当前交易日，必须于每日14:30以后才可以访问到当日简报数据，本周周报简报数据必须于本周最后一个交易日14:30以后才可以访问
      <br>证券选择范围：只统计报价回购交易和未到期数据，证券代码为205打头
      <br><b>二．指标说明：</b>
      <br>成交金额单位为万元，保留两位小数
      <br>成交数量单位为手
      <br>成交笔数单位为笔
      <br>回购未到期金额单位为万元，保留两位小数
      <br>标准券总额单位为亿元，保留两位小数
      <br>最高最低报价为统计日或周内的每百元年收益率的最高最低值
      <br>所有比例保留两位小数，以%表示
      <br>各期限与报价回购代码对应关系为：205001－1天、205007－7天、205008－14天、205010－28天、205030－91天
      <br> <b>三．其他说明：</b>
      <br>投资者人数由于数据仓库无法知晓签约人数而不可提供
      <br>持有未到期回购投资者人数为到当日收盘为止仍然持有未到期回购的不同的投资者人数，从当日的未到期数据中获得历史的未到期部分，从当日的报价回购交易中获取当日部分，汇总推算出持有未到期回购投资者人数
      <br>回购未到期金额为到当日收盘为止仍然未被购回的金额。从当日未到期数据中获取历史未到期部分，从当日报价回购交易中获取当日部分，汇总推算出回购未到期金额总数。
      <br>注：占比=回购未到期余额/标准券总额；1手=1000元面值，报价为年收益率
      <br>如果查询日期所在周尚未完全结束，则周报数据不全
    </Modal>
    <!--头部logo-->
    <div class="tableBox">
      <el-table
        :data="tableDataA"
        border
        height="150"
        tooltip-effect="dark"

        style="width: 100%">
        <template v-for="(item,index) in tableColumns_A">
          <el-table-column
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :align="item.align == null ? 'center' : item.align"
            :formatter="fn_formatter1"
            :width="item.width">
          </el-table-column>
        </template>
      </el-table>
      <el-col style="margin-top: 16px;">
        <div v-if="currentReportType== '0'" style="margin-top: 16px;">
          <p class="redtext listlength">{{infoTableList}}</p>
          <el-table
            :data="tableData01"
            border
            height="400"
            tooltip-effect="dark"

            style="width: 100%">
            <template v-for="(item,index) in tableColumns_A01">
              <!--:key="item.field"-->
              <el-table-column
                :key="item.field"
                :prop="item.field"
                :label="item.title"
                :align="item.align == null ? 'center' : item.align"
                :formatter="fn_formatter2"
                :width="item.width">
              </el-table-column>
            </template>
          </el-table>
        </div>
        <div v-else  style="margin-top: 16px;">
          <p class="redtext listlength">{{infoTableList1}}</p>
          <el-table
            :data="tableData02"
            border
            height="400"
            tooltip-effect="dark"

            style="width: 100%">
            <template v-for="(item,index) in tableColumns_A02">
              <el-table-column
                :key="item.field"
                :prop="item.field"
                :label="item.title"
                :align="item.align == null ? 'center' : item.align"
                :formatter="fn_formatter3"
                :width="item.width">
              </el-table-column>
            </template>
          </el-table>
        </div>
      </el-col>
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
  import {tableColumns_A,tableColumns_A01, tableColumns_A02} from '../assets/js/BND_15001.js';
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
        tableColumns_A: tableColumns_A,
        tableColumns_A01: tableColumns_A01,
        tableColumns_A02: tableColumns_A02,
        tableDataA: [],
        tableData01: [],
        tableData02: [],
        total:0,
        //分页信息
        returnTotal: 0,
        returnN: 1,
        pageSize: 500,
        infoTableList:'',
        infoTableList1:'',

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
        memCodeList: [
          {value: '周报', key: 0},
          {value: '日报', key: 1},
        ],
        currentReportType: 0,
        //  子表格
        anchorTableModel: false,
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
      fn_formatter1:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // tableColumns_A
        // 需要格式化千分位的字段
        if(prop =='trade_amt' || prop == 'trade_vol' || prop == 'cnt' || prop == 'total_acct_cnt' || prop == 'acct_cnt' || prop == 'unmature_cnt' || prop == 'unmature' || prop == 'total_amt' ){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        };
      },
      // 列：格式化字符
      fn_formatter2:function (row,col,cellValue) {
        let prop = col.property;
        // tableColumns_A01
        // 需要格式化千分位的字段
        if(prop =='term' || prop == 'max_price' || prop == 'min_price' || prop == 'trade_amt' || prop == 'unmature'  ){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        };

      },
      // 列：格式化字符
      fn_formatter3:function (row,col,cellValue) {
        let prop = col.property;
        // tableColumns_A02
        // 需要格式化千分位的字段
        if(prop =='term' || prop == 'avg_price' || prop == 'trade_amt' || prop == 'unmature'  ){
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
        this.handleSubmit('formValidate', true)
      },
      // 当前选中的简报类型
      selectMemCodeHandle: function (item) {
        this.infoTableList = '';
        this.infoTableList1 ='';
        this.currentReportType = item;
        this.tableDataA = [];
        this.tableData01 = [];
        this.tableData02 = [];
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
        let abort_fn = null;
        let abortInfo = this;
        //这是一个可以被reject的promise
        let abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
            $("#loadBox").addClass("hide");
            abortInfo.isHide = true;
            abortInfo.$Message.warning('查询超时！请重试！');
          };
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        let abortable_promise = Promise.race([
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
      publicPagination(pages, rows, statics) {
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quCurrentReportType = this.currentReportType;
        this.searchParams = {
          "tradeDate": this.quStartdate,
          'reportType': this.quCurrentReportType,
          "pageSize": rows,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "businessId": "BND_15001",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/bnd/bnd15001';
        this.tableDataA = [];    // 展示数据
        this.tableData01 = [];    // 展示数据
        this.tableData02 = [];    // 展示数据
        this.dealitems = 0;        // 数据条数
        this.returnTotal = 0;      //
        this.isHide = false;
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          this.$Message.error('系统繁忙，刷新页面!');
          this.isHide = true;
        }).then(data => {
          if (this.t != '') {
            clearTimeout(this.t);
          };
          //取数据
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            this.$alert("查询失败，" + dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            this.tableDataA = [];
            this.tableData01 = [];
            this.tableData02 = [];
            this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponseA = data.resData[0].result[0].data;
            var dataResponse1 = data.resData[1].resData.data;
            var datalength1 = data.resData[1].resData.totalCount;
            if (dataResponseA.length == 0) {
              $("#loadBox").addClass("hide");
              this.tableDataA  = [];
              this.tableData01 = [];
              this.tableData02 = [];
              this.dealitems = 0;
              this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              this.dealitems = datalength1;
              this.dealitems1 = datalength1;
              this.returnTotal = datalength1;
              this.tableDataA = dataResponseA;
              this.tableData01= dataResponse1;
              this.tableData02= dataResponse1;

              $("#exportCurrent").removeAttr("disabled");
              this.isHide = true;
              //查询结果提示变化1
              this.infoTableList = "查询结果共 " + this.dealitems + " 条记录";
              this.infoTableList1 = "查询结果共 " + this.dealitems1 + " 条记录";
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
        var downfileParams = "userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&tradeDate=" + this.quStartdate +
          "&reportType="+this.quCurrentReportType;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/bnd150001export_1?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style lang="less" scoped>
  .tableBox{
    padding: 0 30px;
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
