<template>
  <section class="constWidth" id="zjb60074">
   <div id="fifteenCommon">
     <!--头部logo-->
     <header></header>

     <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
       <Panel name="1">
         <p>风险月报评级下调名单预警
           <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
           <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

         </p>
         <div slot="content">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
             <div class="flexBox">
               <Form-item prop="startdate" id="startDateForm">
                 <b>查询月份：</b>
                 <Date-picker @on-open-change="datePickerOpen" id="startDate" type="month" placeholder="选择查询年月"
                              v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
               </Form-item>
               <b style="display: flex;align-items: center;margin-left:30px">债券代码：</b>
               <el-input v-model="stockCodes" type="textarea"></el-input>
               <div class="submitBtnBox">
                 <el-upload :headers="commonHeader2" action="/dw/mktdt/zjb_60074_upload" accept=".txt"
                            :on-error="uploadError" :on-success="uploadSuccess">
                   <el-button size="small" type="primary">上传txt文件</el-button>
                 </el-upload>
               </div>
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
     <Modal id="lookInfoPop" title="风险月报评级下调名单预警  统计口径说明" v-model="changeInfo"
            class-name="vertical-center-modal"
            cancel-text>
       <br><b>一．数据说明</b>
       <br>根据录入债券评级下调名单（债券代码）计算预警级别
       <br><b>二．指标说明</b>
       <br>（1） 最大涨幅：(max(最高价)-月初前收盘) /月初前收盘*100%
       <br>（2） 日均换手率：∑（成交数量/托管数量*100%）/交易天数
       <br>（3） 价格偏离度：abs(估值-收盘价)/收盘价*100%
       <br>（4） 估值：月末时点估值，当月末最后一个交易日无估值时向前追溯
       <br><b>三． 其他说明</b>
       <br>三级预警 二级预警 一级预警
       <br>(10%/4%) (5%/3%) (3%/2%)
       <br>最大跌幅% 4% 6% 8%
       <br>最大涨幅% 3% 5% 7%
       <br>价格偏离度% 6% 9% 11%
       <br>个人投资者持有比例% 10% 20% 30%

     </Modal>
     <!--头部logo-->
     <el-tabs v-model="activeName" @tab-click="tabHandleClick">
       <el-tab-pane label="明细数据" name="first">明细数据</el-tab-pane>
       <el-tab-pane label="预警情况" name="second">预警情况</el-tab-pane>
     </el-tabs>
     <p id="infoTableList" style="margin-left: 30px;" class="redtext listlength"></p>
     <div class="tableBox">

       <el-table
         :data="tableData1"
         border
         v-if="activeName == 'first'"
         style="width: 100%">
         <el-table-column
                          :formatter="formatterNumber"
                          v-for="(item,index) in tableColumns1" :key="index"
                          :prop="item.field"
                          :label="item.title"
                          :align="item.align"
                          :min-width="item.width"
                          >
         </el-table-column>
       </el-table>
       <table_60074 v-if="activeName == 'second'" :date="formValidate.startdate" :dataArr="dataArr"></table_60074>

       <div class="pageModule" v-if="activeName == 'first'">
         <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
               show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
       </div>
       <div class="pageModule" v-if="activeName == 'second'">
         <Page :total="returnTotal2" :current="returnN2" :page-size="500" :page-size-opts=[500,1000] placement="top"
               show-sizer @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page>
       </div>
       <div class="exportBtn">
         <Button id="exportCurrent" type="primary" size="large" @click="exportData" disabled>
           <Icon type="ios-download-outline"></Icon>
           导出全部结果
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
    dateReg,
    formatterNumber,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1, tableColumns2} from '../assets/js/ZJB_60074.js';
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
        isHide: true,
        //统计口径
        changeInfo: false,
        //初始化表格信息
        tableColumns1: tableColumns1,
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnTotal2: 0,
        returnN: 1,
        returnN2: 1,
        dataArrayAll: [],
        pageSize: 500,
        pageSize2: 500,
        //日期初始化
        formValidate: {
          startdate: new Date(initialMonth())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询年月', trigger: 'change'}
          ],
        },
        t: '',
        commonHeader2: {},
        //  tab页
        activeName: 'first',
        //  当前展示的表格
        currentShowTable: 1,
        //  债券代码
        stockCodes: '',
        //  传递给子表格
        dataArr: [],
        //  日期控件状态
        datePickerIsOpen: false
      }
    },
    mounted() {
      this.commonHeader2.Authorization = commonHeader.Authorization
      this.commonHeader2.role = commonHeader.role
      this.commonHeader2.signature = commonHeader.signature
      this.commonHeader2.username = commonHeader.username
      var self = this
      $(window).on('keydown', function (e) {
        if (e.keyCode == 13 && self.datePickerIsOpen) {
          e.preventDefault()
        }
      })
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop =='sec_code'){

          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      // 日期选择器打开时
      datePickerOpen: function (flag) {
        this.datePickerIsOpen = flag
      },
      // 上传成功
      uploadSuccess: function (response, file, fileList) {
        this.stockCodes = ''
        if (response) {
          this.$Message.success(response.message);
          var arr = response.resData
          var self = this
          arr.forEach((item, index) => {
            item = item + '\r\n'
            self.stockCodes += item
          })
        }
      },
      //上传失败
      uploadError: function (error, file, fileList) {
        this.stockCodes = ''
        if (error) {
          this.$Message.error('上传失败，请重试！');
        }
      },
      // tab页点击
      tabHandleClick: function (tab, ev) {

        this.currentShowTable = tab.index == '0' ? 1 : 2
      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate', true, 1)
      },
      tableChange2: function (page) {
        this.returnN2 = page;
        this.handleSubmit('formValidate', true, 2)
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.handleSubmit('formValidate', true, 1)
      },
      tableChangeSize2: function (pageSize) {
        this.pageSize2 = pageSize;
        this.returnN2 = 1;
        this.handleSubmit('formValidate', true, 2)
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
      handleSubmit(name, isPageSubmit, whichTable) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate} = this.formValidate;
          //日期格式验证
          var r = /^\d{4}([-/.]?)\d{1,2}$/
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
            // this.returnN = 1;
            var returnN = whichTable == 1 ? this.returnN : this.returnN2
            var pageSize = whichTable == 1 ? this.pageSize : this.pageSize2
            this.publicPagination(returnN, pageSize, isPageSubmit);
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, isPageSubmit) {
        document.getElementById("exportCurrent").setAttribute("disabled", true);

        if (this.stockCodes.trim() != '') {
          var stockCodes = this.stockCodes.replace(/[\r\n]/g, ',');
          stockCodes = stockCodes.split(',')
          var reg = /^\d{6}$/
          var str = ''
          for (var i = 0; i < stockCodes.length; i++) {
            var s = stockCodes[i].trim()
            if (s != '') {
              str += s + ','
            }
            if (!reg.test(s) && s != '') {
              this.$Message.error('债券代码为6位数字！');
              return
            }
          }
          str = str.slice(0, str.length - 1)
        }

        //查询传送的参数
        this.searchParams = {
          "queryDate": this.formValidate.startdate.format ? this.formValidate.startdate.format('yyyy-MM') : this.formValidate.startdate,
          'queryType': isPageSubmit ? this.currentShowTable : 0,
          'secCode': str,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00011",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/zjb_60074';

        var _this = this;
        this.returnTotal = 0
        this.returnTotal2 = 0
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
          this.dataArr = data.resData.data

          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          ;
          this.isHide = true;
          //取数据
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            this.$alert("错误" + dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {

            _this.isHide = true;
            //隐藏加载中
            $("#loadBox").addClass("hide");
            // 总查询
            if (!isPageSubmit) {
              var tableData1 = data.resData
              this.tableData1 = tableData1.data.length > 2000 ? tableData1.data.slice(0, 1999) : tableData1.data
              if (tableData1.data.length > 2000) _this.$Message.success('查询结果超过2000条，导出查看完成数据！')
              if (this.tableData1.length == 0) {
                $("#loadBox").addClass("hide");
                _this.tableData1 = [];
                _this.$Message.warning('查询无数据！');
                $("#exportCurrent").attr("disabled");
                $("#infoTableList").html("查询结果共0条记录");
                //隐藏加载中
                $("#loadBox").addClass("hide");
                return
              }
              $("#exportCurrent").removeAttr("disabled");
              _this.returnTotal = tableData1.totalCount;
              $("#infoTableList").html("查询结果共 " + tableData1.totalCount + " 条记录");
            } else {
              $("#exportCurrent").removeAttr("disabled");
              var data = data.resData
              _this.dealitems = data.totalCount;
              _this.returnTotal = data.totalCount;
              this.tableData1 = data.data.length > 2000 ? data.data.slice(0, 1999) : data.data
              if (data.data.length > 2000) _this.$Message.success('查询结果超过2000条，导出查看完成数据！')
              $("#infoTableList").html("查询结果共 " + _this.dealitems + " 条记录");
            }
          }
        });
      },
      /**
       * 导出Excel文件
       */
      exportData() {
        var str = ''
        if (this.stockCodes.trim() != '') {

          var stockCodes = this.stockCodes.replace(/[\r\n]/g, ',');
          stockCodes = stockCodes.split(',')
          var reg = /^\d{6}$/

          for (var i = 0; i < stockCodes.length; i++) {
            var s = stockCodes[i].trim()
            if (s != '') {
              str += s + ','
            }
            if (!reg.test(s) && s != '') {
              this.$Message.error('债券代码为6位数字！');
              return
            }
          }
          str = str.slice(0, str.length - 1)
        }
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&queryDate=" + this.formValidate.startdate.format('yyyy-MM') + '&queryType=' + this.currentShowTable + '&secCode=' + str;
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/zjb_60074_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style>
  #zjb60074 .el-upload-list{
    display: none;
  }
  #zjb60074 .el-table__footer-wrapper {
    display: block !important;
  }

  #zjb60074 .ivu-collapse-content {
    overflow: inherit !important;
  }

  #zjb60074 .el-tabs__nav-scroll {
    padding-left: 30px !important;
  }

  #zjb60074 .el-tabs__content {
    display: none;
  }

  #zjb60074 .el-textarea {
    width: 100px;
    height: 100px;
    margin-left: 5px;
  }

  #zjb60074 .el-textarea textarea {
    height: 100%;
    overflow: scroll;
    resize: none;
  }

  #zjb60074 #startDateForm > div {
    display: flex;
    margin-top: 34px;
  }
</style>
<style lang="less" scoped>
  .tableBox {
    padding: 30px 30px;
  }

  .flexBox {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
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

