<template>
  <section class="constWidth" id="slb00006">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>转融通证券出借交易账户校验
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content"  >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startYear" id="yearForm">
                  <b>交易日期：</b>
                  <Date-picker id="startYear" type="date" placeholder="选择交易日期"
                               v-model="formValidate.startYear" class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item id="memCode">
                  <b>报表类型</b>
                  <Select id="report" @on-change="selectMemCodeHandle" v-model="currentReportType">
                    <Option v-for="(item,index) in memCodeList" :value="index" :key="item.key" :label="item.value"></Option>
                  </Select>
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
      <Modal id="lookInfoPop" title="转融通证券出借交易账户校验  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <b>一．数据说明</b>
        <br>综合业务平台，转融通出借申报且成交数据
        <br> <b> 二．指标说明</b>
        <br>无。
        <br><b> 三．其他说明</b>
        <br>查询“已报备证券账户清单”时，查询交易日期为T的数据，其结果是T-1日报备的帐户数据。
      </Modal>
      <Modal id="anchorTableModel" width="1024" height="1000" :closable="false" v-model="anchorTableModel" class-name="vertical-center-modal" cancel-text>
        <el-table
          :data="tableData2"
          border
          style="width: 100%">
          <template v-for="(item,index) in anchorTableColumn">
            <el-table-column  :key="index"
                              :prop="item.field"
                              :label="item.title"
                              :align="item.align"
                              :formatter="fn_formatter"
                              :width="item.width">
            </el-table-column>
          </template>
        </el-table>
        <div class="exportBtn">
          <Button id="exportCurrent2" type="primary" size="large" @click="exportData2()" disabled>
            <Icon type="ios-download-outline"></Icon>
            导出全部结果为XLSX文件
          </Button>
        </div>
      </Modal>
      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%">
          <template v-for="(item,index) in tableColumns1">
            <el-table-column v-if="item.hasAnchor && (currentReportType==0)"   :key="index"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
                             :formatter="fn_formatter"
                             :width="item.width">
              <template scope="scope">
                <a @click="anchorClick(scope)">{{scope.row.acct_id}}</a>
              </template>
            </el-table-column>
            <el-table-column v-else  :key="index+100"
                             :prop="item.field"
                             :label="item.title"
                             :align="item.align"
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
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1,anchorTableColumn} from '../assets/js/SLB_00006.js';
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
          startYear: new Date(initialDate())
        },
        ruleValidate: {
          startYear: [
            {required: true, type: 'date', message: '请选择交易日期', trigger: 'change'}
          ]
        },
        t: '',
        memCodeList:[
          { value:'未报备但参与证券出借申报且成交的证券账户清单',key:1 },
          { value:'参与证券出借申报且成交的证券账户清单',key:2 },
          { value:'已报备证券账户清单',key:3 }
        ],
        currentReportType:0,
        //  子表格
        anchorTableModel:false,
        tableData2:[],
        anchorTableColumn:anchorTableColumn,
      //  子表格accid
        acct_id:''
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
        if( prop == 'trade_vol'|| prop == 'buy_fee'){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        // if(prop =='m_fee' || prop == 'y_fee'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },

      // 点击显示子表格
      anchorClick:function (scope) {
        var self = this;
        self.tableData2 = [];
        var obj = {
          tradeDate:scope.row.trade_date,
          acctId:scope.row.acct_id
        };
        this.acct_id = scope.row.acct_id;
        this.anchorTableModel = true;
        $.ajax({
          type:'POST',
          timeout:600000,
          headers:commonHeader,
          url:'/dw/slb/slb_00006_1',
          data:JSON.stringify(obj),
          success:function (res) {
            var dataArr = res.resData.data
            self.tableData2 = dataArr;
            if(dataArr.length>0){
              $("#exportCurrent2").removeAttr("disabled");
            }
          },
          error:function (err) {
            self.$Message.error('查询出错：',err);
          }
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
      // 当前选中的会员代码
      selectMemCodeHandle:function (item) {
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
          "tradeDate": this.formValidate.startYear.format ? this.formValidate.startYear.format('yyyy-MM-dd') : this.formValidate.startYear,
          'reportType':this.currentReportType +1,
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
        const url = '/dw/slb/slb_00006';
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

              setTimeout(() => {
                var dom = $('.ivu-modal-wrap .ivu-modal-body')[1]
                $(dom).css({'max-height': '900px'})
              }, 20)
            }
          }
        });
      },
      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&tradeDate=" + this.formValidate.startYear.format('yyyy-MM-dd')+'&reportType='+(this.currentReportType+1);
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/slb/slb_00006_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
      exportData2() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&tradeDate=" + this.formValidate.startYear.format('yyyy-MM-dd')+"&acctId=" + this.acct_id
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        void(window.open('/dw/slb/slb_00006_1_export?' + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style>
  #slb00006 #report .ivu-select-selection{
    width: 309px;
  }
  #slb00006 .el-table__footer-wrapper{
    display: block !important;
  }
  #slb00006 .ivu-collapse-content{
    overflow: inherit !important;
  }
  #slb00006 #memCode b{
    width: 70px;
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
  #anchorTableModel .ivu-modal-content{
    height: 800px;
  }
  #anchorTableModel .ivu-modal-body{
    height: 800px;
    max-height: 800px;
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

