<template>
  <section class="constWidth" id="mtsl00004">
    <!--头部logo-->
    <header></header>
    <div id="fifteenCommon">
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>融资融券担保品
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
            <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>查询日期：</b>
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
    </div>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="融资融券担保品  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <b>一． 整体说明：</b><br>
        1) 本应用可查询时间起始范围为：2010/03/31-now<br>
        2) 本应用可查询T日数据的时点为：T日22:00后<br>
        3) 本应用限制最大查询时间区间为： 无限制<br>
        4) 证券查询范围：融资融券担保品 （股票、债券、基金、权证等）<br>
        5) 交易平台：竞价系统<br>
        <b>二． 单指标算法</b><br>
          序号 展示字段 展示字段算法或公式<br>
          1. 担保品市值 查询日的担保品市值合计<br>
          2. 折算后整体市值 担保品市值*折算率<br>
          3. 担保品折算率 该类担保品的折算率<br>
          4. 担保品品种 分为上证180指数成分股、其他、被实行特别处理和暂停上市的A股、ETF、其他上市证券投资基金、国债
    </Modal>
    <!--头部logo-->
    <div class="tableBox">

      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <template v-for="(item,index) in tableColumns1">
          <el-table-column v-if="item.hasAnchor" :key="index"
                           :prop="item.key"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
            <template scope="scope">
              {{scope.row.men_name}}
              <a style="margin-left: 10px;" @click="anchorClick(scope)">担保品明细</a>
            </template>
          </el-table-column>
          <el-table-column :min-width="item.width" :formatter="formatterNumber" v-else :key="index+100"
                           :prop="item.key"
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
  import {tableColumns1} from '../assets/js/MTSL_00004.js';
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
          startdate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: '',
        recordQueryDate: ''
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
      formatterNumber: function (row, col, cellValue) {
        var prop = col.property
        if (prop == 'sec_code') {
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      //表格超链接点击
      anchorClick: function (scope) {

        jump2NewPage('MTSL_00004_detail', {
          data: {
            rptDte: this.recordQueryDate.format('yyyy-MM-dd'),
            menName: scope.row.men_name
          },
          title: '担保品明细'
        }, true)
        console.log(scope)
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
      handleSubmit(name, isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate} = this.formValidate;
          //月份格式验证
          var r = dateReg
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确查询日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前月份
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
            if (!isPageClick) this.returnN = 1;
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
        document.getElementById("exportCurrent").setAttribute("disabled", true);
        //查询传送的参数
        this.searchParams = {
          "rptDte": this.formValidate.startdate.format('yyyy-MM-dd'),
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
        const url = '/dw/mtsl/mtsl00004';
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
            this.$alert("错误" + dataError, '错误', {
              confirmButtonText: '确定',
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
              _this.recordQueryDate = _this.formValidate.startdate
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.recordQueryDate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/mtsl00004export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style>
  #mtsl00004 .ivu-collapse-content {
    overflow: inherit !important;
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
