<template>
  <section class="constWidth" id="sse00020">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>股票概貌
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i
              :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>股票代码：</b>
                  <el-input v-model="stockCode" placeholder="请输入股票代码"></el-input>
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
      <Modal id="lookInfoPop" title="股票概貌  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．数据说明：</b>
        <br>证券选择范围：沪市A股、B股的股票代码
        <br><b>二．其他说明：</b>
        <br>1、 五次股本变动，不包括“手工调整”的部分。
        <br>2、 送股比例（每10股送股）
        <br>3、 利润分红比例（每10股分红）
        <br>4、 配股比例（每10股配股）

      </Modal>
      <!--头部logo-->
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
        <el-tab-pane label="股本变动信息" name="second">股本变动信息</el-tab-pane>
        <el-tab-pane label="分红配送信息" name="three">分红配送信息</el-tab-pane>
      </el-tabs>
      <div class="tableBox">
        <p id="infoTableList" v-show="activeName == 'first'" class="redtext listlength"></p>
        <p id="infoTableList2" v-show="activeName == 'second'" class="redtext listlength"></p>
        <p id="infoTableList3" v-show="activeName == 'three'" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          v-if="activeName == 'first'"
          style="width: 100%">
          <el-table-column :min-width="item.width" :formatter="formatterNumber" v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData2"
          border
          v-if="activeName == 'second'"
          style="width: 100%">
          <el-table-column :min-width="item.width" :formatter="formatterNumber" v-for="(item,index) in tableColumns2" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData3"
          border
          v-if="activeName == 'three'"
          style="width: 100%">
          <el-table-column :min-width="item.width" :formatter="formatterNumber" v-for="(item,index) in tableColumns3" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
          </el-table-column>
        </el-table>
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
    formatterNumber,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1, tableColumns2, tableColumns3} from '../assets/js/SSE_00020.js';
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
        tableColumns2: tableColumns2,
        tableColumns3: tableColumns3,
        tableData1: [],
        tableData2: [],
        tableData3: [],
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
            {required: true, type: 'date', message: '请选择年份', trigger: 'change'}
          ],
        },
        t: '',
        //  tab页
        activeName: 'first',
        // 股票代码
        stockCode: ''
      }
    },
    mounted() {
      $(window).on('keydown', function (e) {
        if (e.keyCode == 13) {
          e.preventDefault()
        }
      })
    },
    methods: {
// 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if( prop=='a_sec_code' || prop=='b_sec_code' || prop=='csrc_ind_grp_desc' || prop=='trade_date' ||  prop=='chg_date' || prop=='share_reg_date' || prop=='derights_date' || prop=='issue_list_date'){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      // tab页点击
      tabHandleClick: function (tab, ev) {
        console.log(tab, ev)

      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate', true)
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
      handleSubmit(name, isPageClick) {
        var r = /^[0-9]{6}$/
        if (!r.test(this.stockCode)) {
          this.$Message.error('股票代码为6位纯数字！');
        } else {
          this.$Message.success('提交成功!请等待~');
          if (!isPageClick) this.returnN = 1;
          this.publicPagination(this.returnN, this.pageSize, true);
        }
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        document.getElementById("exportCurrent").setAttribute("disabled", true);
        //查询传送的参数
        this.searchParams = {
          'secCode': this.stockCode,
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
        const url = '/dw/mktdt/sse00020';
        this.tableData1 = [];
        this.tableData2 = [];
        this.tableData3 = [];
        $("#infoTableList").html('')
        $("#infoTableList2").html('')
        $("#infoTableList3").html('')
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
          // $("#infoTableList").html("");
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
            _this.tableData2 = [];
            _this.tableData3 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData;
            var datalength = data.resData[0].length;
            if (data.resData[0].size == 0 && data.resData[1].size == 0 && data.resData[2].size == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.tableData2 = [];
              _this.tableData3 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {

              // _this.dataArrayAll = dataResponse;//保存所有数据

              _this.tableData1 = dataResponse[0].data;
              _this.tableData2 = dataResponse[1].data;
              _this.tableData3 = dataResponse[2].data;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + data.resData[0].size + " 条记录");
              $("#infoTableList2").html("查询结果共 " + data.resData[1].size  + " 条记录");
              $("#infoTableList3").html("查询结果共 " + data.resData[2].size + " 条记录");
              console.log(data.resData[0].size,data.resData[1].size,data.resData[2].size)
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&secCode=" + this.stockCode;
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse00020export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style>
  #sse00020 .el-table__footer-wrapper {
    display: block !important;
  }

  #sse00020 .ivu-collapse-content {
    overflow: inherit !important;
  }

  #sse00020 .el-tabs__nav-scroll {
    padding-left: 30px !important;
  }

  #sse00020 .el-tabs__content {
    display: none;
  }

  #sse00020 .el-textarea {
    width: 100px;
    height: 100px;
    margin-left: 5px;
  }

  #sse00020 .el-textarea textarea {
    height: 100%;
    overflow: scroll;
    resize: none;
  }

  #sse00020 #startDateForm b {
    width: 80px;
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

