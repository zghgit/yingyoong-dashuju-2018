<template>
  <section id="bnd15016">
    <!--头部logo-->
    <header></header>
    <!-- 添加点1，collapse需要加到script中 -->
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <!-- 修改点1，标题 -->
        <p>报价回购成交金额类型分布报表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <!-- 修改点2，日历或输入框 -->
              <!-- 样例1，日历 -->
              <Form-item prop="startdate" id="startDateForm" label="交易日期">
                <Date-picker id="startDate" type="date" placeholder="选择交易日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <!-- 样例3，提交按钮 -->
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
    <Modal id="lookInfoPop" content="每日报价回购成交金额类型分布报表  统计口径说明"
           title="每日报价回购成交金额类型分布报表  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      <h3>一、数据说明</h3>
      <p>只包含综合业务平台报价回购数据</p>
      <h3>二、指标说明</h3>
      <p>
        1. 占比为各品种占所有品种总和的百分比<br>
      </p>
      <h3>三、其他说明</h3>
      <p>
        无
      </p>
    </Modal>
    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-col :span="24">
        <el-table
            :data="tableData1"
            style="width: 100%">
          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :min-width="item.width">
            <el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
                             :formatter="formatData"
                             :prop="items.field"
                             :label="items.title"
                             :align="items.align"
                             :min-width="items.width">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div> -->
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
    commonGetReqParam,
    commonHeader,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/BND_15016.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {
        collapse: "1",
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
          startdate: new Date()
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: ''
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
      publicPagination(pages, rows, statics) {
      document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          "tradeDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00019",

        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/bnd/bnd_15016';
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
            var dataResponse = data.resData;
            var datalength = data.resData.length;
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
              $("#infoTableList").html("查询结果共 " + this.dealitems + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },
      //求和
      // getSumLast(params) {
      //   if(this.tableData1.length<1){
      //     return ['合计','','','','','','','','']
      //   }
      //   var sums = []
      //   var obj = this.tableData1[this.tableData1.length - 1]
      //   for(var key in obj){
      //     var v = obj[key]
      //     sums.push(v)
      //   }
      //   console.log(sums)
      //   return sums;
      // },
      /**
       * 导出Excel文件
       */
      exportData(type) {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&tradeDate=" + this.formValidate.startdate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          void(window.open('/dw/bnd/bnd_15016_export?' + downfileParams +commonGetReqParam));
        }
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'trade_amt' || prop == 'mature_amt' || prop == 'cutoff_amt' || prop == 'unmature_amt') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  .ivu-modal-header-inner {
    overflow: inherit;
    text-overflow: inherit;
    white-space: inherit;
  }
  .el-table__footer-wrapper{
    display: block !important;
  }
  /*#bnd15016 .el-table__row:nth-last-child(1){*/
    /*display: none;*/
  /*}*/
  #bnd15016 .el-tabs__content{
    display: none;
  }
  /*#bnd15016 .el-table__row:nth-last-child(1){*/
    /*display: none;*/
  /*}*/
  .el-table__footer-wrapper{
    display: block !important;
  }
  #bnd15016 {
    .ivu-collapse {
      border: none;
    }

    .el-table thead.has-gutter th {
      background-color: #F5F8FA;

    }
    .ivu-collapse-content {
      background: #F5F8FA;
      margin: 0 30px;
      padding: 15px 0 15px 0;
      .ivu-form-item {
        margin-bottom: 0;
      }
      .ivu-collapse-content-box {
        padding-top: 0;
      }
    }
    .ivu-collapse-header {
      padding: 20px 31px;
      border-bottom: none;
      .ivu-icon-arrow-right-b {
        display: none;
      }
      p {
        line-height: 30px;
        .lookInfo {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .showButton {
        float: right;
        font-weight: normal;
        font-size: 13px;
        color: #3D83B5;
        i {
          margin-left: 5px;
        }
      }
    }
    .el-table__empty-text {
      top: 50%;
    }
    .tableBox {
      padding: 27px 30px;
      .pageModule {
        float: right;
        width: inherit;
        .ivu-page-options-sizer {
          margin-right: 0;
        }
      }
      .exportBtn {
        float: left;
      }
    }
    .tabTitle {
      margin-top: 16px;
      padding: 0 30px;
      .el-tabs__header {
        margin: 0;
      }
    }
    .el-tabs--bottom .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs__item:nth-child(2) {
      padding-left: 0!important;
    }
  }
</style>
