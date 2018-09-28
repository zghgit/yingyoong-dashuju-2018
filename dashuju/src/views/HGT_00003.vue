<template>
  <section class="constWidth" id="fifteenCommon">
  <div id="hgt00003">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>会员公司港股通订单路由费预估
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">
            {{ collapse.length>0?'收起':'展开' }}
            <i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="查询年月">
                <Date-picker id="startDate" type="month" placeholder="选择查询年月" v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
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
    <Modal id="lookInfoPop" title="会员公司港股通订单路由费预估  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      <b>一．数据说明</b>
      <br>数据时间范围：201411月份起 统计对象：只统计港股通部分所产生的流量费
      <br><b> 二．指标说明</b>
      <br>（1）席位数：本月沪市月末交易日会员席位个数
      <br>（2）交易单元数：本月沪市月末交易日会员交易单元个数
      <br>（3）当月订单路由费：MAX{当月港股订单笔数 + MIN{当月沪股订单笔数–基础流量减免笔数*本月末席位数,0},0} * 费率，单位元
      <br>（4）当月订单路由费：MAX{当年(从上年12月到今年11月)从12月开始到当月的港股订单笔数+ MIN{当年(从上年12月到今年11月)从12月开始到当月的沪股订单笔数–基础流量减免笔数*本月末席位数*月份数,0},0} * 费率，单位元
      <br> <b>三．其他说明</b>
      <br> 无
    </Modal>
    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        :summary-method="getSumLast"
        show-summary
        border
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
           :prop="item.field"
           :label="item.title"
           :align="item.align"
           :formatter="fn_formatter"
           :width="item.width">
          <el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
             :prop="items.field"
             :label="items.title"
             :align="items.align"
                           :formatter="fn_formatter"
             :width="items.width">
          </el-table-column>

        </el-table-column>
      </el-table>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>
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
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    initialMonth,
    commonHeader,
    formatTbousandth,
    commonGetReqParam
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/HGT_00003.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';

  export default {
    data() {
      return {
        //显示隐藏输入条件
        collapse: '1',
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
          startdate:new Date(initialMonth()),

        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询年月', trigger: 'blur'}
          ],

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
    },
    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
       // 需要格式化千分位的字段
        if(prop =='m_fee' || prop == 'y_fee'){
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
          var r = /^\d{4}([-/.]?)(0[1-9]|1[0-2])/;
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确查询年月！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");

          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('查询年月不能大于当前年月！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");

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
      publicPagination(pages, rows, statics) {document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          "yearMonth": this.formValidate.startdate.format('yyyy-MM'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = "/dw/hgt/hgt00003";
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
            if (dataResponse.length <2) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              if (dataResponse.length == 1) {
                _this.tableData1 = [];
              } else {
                _this.tableData1 = _this.dataArrayAll;
              }
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
      /**
       * 导出Excel文件
       */
      exportData(type) {
        var downfileParams = "&row=1&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&yearMonth="+this.formValidate.startdate.format('yyyy-MM');
        if (type === 1) {
         document.getElementById("exportCurrent").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
          void(window.open("/dw/download/hgtexcel?type=bdsp_hgt00003" + downfileParams + commonGetReqParam));
        }
      },
      /**
       * 获取表格汇总行展示信息
       */
      getSumLast() {
        let newDatas = this.tableData1;
        let dataLens = newDatas.length;
        var secTitle = ["trade_date", "mem_code", "mem_full_name", "ymb_seq", "seat_cnt_sum","pbu_cnt_sum","m_fee_sum","y_fee_sum"];
        let lens = secTitle.length;
        if (dataLens == 0 || dataLens == 1) {
          for (var r = 0; r < lens; r++) {
            if (r == 0) {
              this.sums[r] = '合计';
            } else {
              this.sums[r] = '';
            }
          }
        } else {
          for (var r = 0; r < lens; r++) {
            let keys = secTitle[r];
            for (var rk in newDatas[dataLens - 1]) {
              if (keys == rk) {
                // this.sums[r] = newDatas[dataLens - 1][keys];
                this.sums[r] = newDatas[dataLens - 1][keys]?formatTbousandth(newDatas[dataLens - 1][keys]):'';

              }
            }
          }
        }
        return this.sums;
      }
    }
  }
</script>

<style lang="less">


 #hgt00003 .el-table__body-wrapper tr:nth-last-child(1) {
    display: none;
  }


</style>
