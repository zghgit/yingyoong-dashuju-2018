<template>
  <section class="constWidth" id="ssem10009">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>上市公司股本结构
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>统计月份：</b>
                  <Date-picker id="startDate" type="month" placeholder="选择统计月份"
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
      <Modal id="lookInfoPop" title="上市公司股本结构  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>数据说明</b>
        <br>数据时间范围：界面所选择的月份
        <br>证券选择范围：
        <br>交易平台：只包括竞价平台
        <br><b>指标说明</b>
        <br>比例1：SUM(股票的该类股本)* 100.00 / SUM(股票的总股本)
        <br>比例2：SUM(股票的该类股本所占市值)* 100.00 / SUM(股票的总市值)
        <br><b>其他说明</b>
        <br>仅统计在上交所的上市公司
        <br>在次月的第三个交易日起才能查看当月统计数据

      </Modal>
      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          id="eltable"
          style="width: 100%">
          <template v-for="(item,index) in tableColumns1">
            <el-table-column :min-width="item.width" :formatter="formatterNumber" :key="index"
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
    initialMonthNow,
    monthReg,
    formatterNumber,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/SSEM_10009.js';
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
          startdate: new Date(initialMonthNow())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择月份', trigger: 'change'}
          ],
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
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'volcode'){
          return cellValue
        }
        return formatTbousandth(cellValue)
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
          var r = monthReg
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确查询月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
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
      publicPagination(pages, rows, statics) {
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          'yearMonth': new Date(this.formValidate.startdate).format('yyyy-MM'),
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
        const url = '/dw/ssem/ssem_10009';
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
            // this.$Message.warning("查询出错" + dataError);
            this.$alert("错误" + dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.result[0].data;
            var datalength = data.resData.result[0].size;
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
              // _this.tableData1.forEach((item,index)=>{
              //   if(index >=1 && index <=5){
              //     item.volname = ''+item.volname
              //   }
              // })
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&yearMonth=" +  new Date(this.formValidate.startdate).format('yyyy-MM');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/ssem/ssem_10009_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style>
  #ssem10009 #eltable table tr:nth-child(15) td:nth-child(2){
    font-weight: bold;

  }
  #ssem10009 #eltable table tr:nth-child(16) td:nth-child(2){
    font-weight: bold;

  }
  #ssem10009 #eltable table tr:nth-child(10) td:nth-child(2){
    font-weight: bold;

  }
  #ssem10009 #eltable table tr:nth-child(2) td:nth-child(2){
    padding-left: 15px;
  }
  #ssem10009 #eltable table tr:nth-child(3) td:nth-child(2){
    padding-left: 15px;
  }
  #ssem10009 #eltable table tr:nth-child(4) td:nth-child(2){
    padding-left: 15px;
  }
  #ssem10009 #eltable table tr:nth-child(5) td:nth-child(2){
    padding-left: 15px;
  }
  #ssem10009 .el-table__footer-wrapper {
    display: block !important;
  }

  #ssem10009 .ivu-collapse-content {
    overflow: inherit !important;
  }

  #ssem10009 .el-tabs__nav-scroll {
    padding-left: 30px !important;
  }

  #ssem10009 .el-tabs__content {
    display: none;
  }

  #ssem10009 .el-textarea {
    width: 100px;
    height: 100px;
    margin-left: 5px;
  }

  #ssem10009 .el-textarea textarea {
    height: 100%;
    overflow: scroll;
    resize: none;
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

  #anchorTableModel .ivu-modal-content {
    height: 800px;
  }

  #anchorTableModel .ivu-modal-body {
    height: 800px;
    max-height: 800px;
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

