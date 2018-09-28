<template>
  <section id="sys31052">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p class="textBox">交易系统代码管理月报下载
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="起始月份:">
                <Date-picker id="startDate" type="month" placeholder="选择起始月份"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束月份:">
                <Date-picker id="endDate" type="month" placeholder="选择结束月份" v-model="formValidate.enddate"
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
    <Modal id="lookInfoPop" title="交易系统代码管理月报下载" v-model="changeInfo" class-name="vertical-center-modal sysPageModal"
                 cancel-text>
     <b> 一．数据说明</b>
      <br>上海证券交易所交易系统使用的所有证券代码，包括辅助代码。
      <br><b> 二．指标说明</b>
      <br>1.本期代码变动情况统计只统计用户维护的代码分配表中，代码变动标识为“是”的代码，而一些辅助代码如7******，质押出入库代码均不进行变动统计
      <br>2.本地代码变动汇总统计中只统计本期有变化数量的且变动标识为“是”的代码段
      <br><b> 三．其他说明</b>
      <br>生成的月报从2013年4月起可供下载，每月最后一个自然日23点生成当月的代码管理月报。
    </Modal>
    <div class="tableBox" id="tableData">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-col :span="24">
        <el-table
          :data="tableData1"
          border
          style="width: 100%;">
          <template v-for="(item,index) in tableColumns1">
              <el-table-column v-if="item.hasAnchor"   :key="index"
                               :prop="item.key"
                               :label="item.title"
                               :align="item.align"
                               :width="item.width">
                <template scope="scope">
                  <a @click="anchorClick(scope)">{{scope.row.value}}</a>
                </template>
              </el-table-column>
              <el-table-column v-else  :key="index"
                               :prop="item.key"
                               :label="item.title"
                               :align="item.align"
                               :width="item.width">
              </el-table-column>
            </template>
        </el-table>
      </el-col>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
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
    commonHeader,
    downloadReqPath,
    initialYear,
    commonGetReqParam
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/SLB_00007.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {

        collapse:'1',

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
         // startdate:new Date(new Date().setFullYear(initialYear())),
         // enddate: new Date(initialDate())
         startdate: new Date(new Date().setYear(new Date().getFullYear() - 1)),
         //startdate: new Date((new Date()).getFullYear()-1+"-"+((new Date()).getMonth()+1)),
          enddate: new Date((new Date()).format("yyyy-MM")),
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择起始月份', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束月份', trigger: 'change'}
          ]
        },
        t: '',

      }
    },
    mounted() {
      $(".el-table__footer-wrapper").show();
    },
    methods: {
      anchorClick:function (scope) {

        var url = '/dw/sys/sys_31052_export?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&yearMonth=' + scope.row.key + commonGetReqParam
        window.open(url)
      },
        tableChange:function (page){
                this.returnN=page;
                this.tableData1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
            },

            tableChangeSize:function (pageSize){
                this.pageSize=pageSize;
                this.returnN=1;
                this.tableData1 =this.dataArrayAll.slice(0,this.pageSize);
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
          const {startdate, enddate} = this.formValidate;
          //日期格式验证
          var r = /^\d{4}([-/.]?)\d{1,2}$/;
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确起始月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('起始月份不能大于当前月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('结束月份不能大于当前月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMM') > enddateValue.format('yyyyMM')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('起始月份不能大于结束月份!');
            return;
          }
          ;
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
        var _this = this
        this.isHide = false;
        $("#loadBox").removeClass("hide");
         $("#infoTableList").html("查询结果共 0 条记录");

        var self = this
        var obj = new XMLHttpRequest();
        obj.open('GET', '/dw/sys/sys_31052_list?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&startMonth=' + this.formValidate.startdate.format('yyyy-MM') + '&endMonth=' + this.formValidate.enddate.format('yyyy-MM') + commonGetReqParam, false);
        obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == 200) {
            const responseData = JSON.parse(obj.responseText);
            _this.isHide = true;
            console.log(responseData)
            var dataResponse = responseData.resData
            var datalength = responseData.resData.length
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              this.$alert("查询失败，" + responseData.message,'错误',{
                confirmButtonText:'确定',
                type: 'error'
              })
              // $("#exportCurrent").attr("disabled");
            } else {
              // _this.$Message.success('查询成功!');
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
             // _this.tableData1 = _this.dataArrayAll;
             _this.returnN=1;
              let tmpLimit=_this.pageSize;
              if(tmpLimit>dataResponse.length){
                            //如果加载数据少，全部返回
               tmpLimit=dataResponse.length;
                            }
                _this.tableData1=_this.dataArrayAll.slice(0,tmpLimit);
              // $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + datalength + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");


            }
          }
        };
        obj.send(null);




      },


    }
  }
</script>

<style lang="less">

  #sys31052 {
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
  }
  .tabTitle {
    margin-top: 16px;
    padding: 0 30px;
    .el-tabs__header {
      margin: 0;
    }
  }
  #tableData {
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
  .ivu-form-item-error .searchIpt  {
    border: 1px solid #f30;
  }

</style>
