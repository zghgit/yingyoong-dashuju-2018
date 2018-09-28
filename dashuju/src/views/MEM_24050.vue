<template>
  <section class="constWidth" id="mem24050">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>会员公司每月预估年费
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startYear" id="yearForm">
                  <b>年：</b>
                  <Date-picker id="startYear" type="year" placeholder="选择年份"
                               v-model="formValidate.startYear" class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item prop="month" id="monthForm">
                  <b>月：</b>
                  <Date-picker id="startMonth" format="MM" type="month" placeholder="选择月份"
                               v-model="formValidate.startMonth" class="datePickerWidth"></Date-picker>
                </Form-item>
                <div class="moreBtn">
                  <div  @click="isShowMore = !isShowMore"><span v-show="isShowMore">收起 ∧</span><span v-show="!isShowMore">更多 ∨</span></div>
                </div>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </div>
              <Form-item id="memCode" v-if="isShowMore">
                <b>会员代码：</b>
                <el-select   v-model="currentSelectMemberValue"  @change="selectTypeHandle"  placeholder="请选择">
                  <el-option v-for="item in memberList" :key="item.mem_full_name" :label="item.mem_full_name" :value="item.mem_code">
                  </el-option>
                </el-select>
              </Form-item>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="会员公司每月预估年费  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
       <b> 一.数据说明</b>
        <br> 数据时间范围：200401月份起
        <br>证券选择范围：
        <br>交易平台：竞价系统
        <br><b>二.指标说明</b>
        <br>当月交易单元使用费：本月PBU使用费，单位元
        <br>当月交易单元流速费：本月流速费，单位元
        <br>当月交易单元流量费：根据本月申报量计算的单月流量费，单位元
        <br>当月补交交易单元费：因为跨月的PBU注销申请被退回等因素，而需要补交之前的PBU使用费，单位元。
        <br>当月补交流速费：因为跨月的PBU注销申请被退回等因素，而需要补交之前的流速费，单位元。
        <br>年度内累计交易单元使用费：当年(从上年12月到今年11月)从12月开始到当月的PBU使用费累计，单位元。
        <br>年度内累计交易单元流速费：当年(从上年12月到今年11月)从12月开始到当月的流速费累计，单位元。
        <br>年度内累计交易单元流量费：当年(从上年12月到今年11月)从12月开始到当月的所有申报量计算的流量费。单位元
        <br>ETF流量费减免金额：全年(从上年12月到今年11月)的ETF申报产生的减免金额。单位元
        <br>该年度内累计年费：全年的(PBU使用费+流速费+流量费)。单位元
        <br><b>三.其他说明</b>
        <br>无
      </Modal>
      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1.slice(0,tableData1.length-1)"
          border
          show-summary
          :summary-method="getSumLast"
          style="width: 100%;">
          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :align="item.align"
                           :formatter="fn_formatter"
                           :width="item.width">
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
  import {tableColumns1} from '../assets/js/MEM_24050.js';
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
          startYear: new Date().format('yyyy'),
          startMonth: new Date(),
        },
        ruleValidate: {
          startYear: [
            {required: true, type: 'date', message: '请选择年份', trigger: 'change'}
          ],
          startMonth: [
            {required: true, type: 'date', message: '请选择月份', trigger: 'change'}
          ]
        },
        t: '',
        memberList: [],
        currentSelectMember:'',
        currentSelectMemberValue:'全部',
        isShowMore:false
      }
    },
    mounted() {
      var self = this
      var obj = new XMLHttpRequest();
      obj.open('GET', '/dw/mem/mem_20460_mem_list?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + commonGetReqParam, false);
      obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200) {
          const responseData = JSON.parse(obj.responseText);
          console.log(responseData)
          self.memberList = responseData.resData
        }
      };
      obj.send(null);
    },
    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='pbu_cnt' || prop == 'pbu_fee' || prop == 'vel_amt' || prop == 'month_flux_amt' || prop == 'patch_pbu_fee' || prop == 'patch_vel_amt' || prop == 'sum_pbu_fee' || prop == 'sum_vel_fee' || prop == 'year_flux_amt' || prop == 'etf_flux_derate_amt'|| prop == 'year_sum_fee'){
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
       * 隐藏模糊查询下拉信息框
       */
      selectTypeHandle:function (item) {
        this.currentSelectMember = item
        // this.currentSelectMemberValue = this.memberList[item].mem_full_name
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

        const {startYear} = this.formValidate;
        //月份格式验证
        var r = /^\d{4}$/;
        var startYearA = $(".ivu-input:eq(0)").val();
        if (r.test(startYearA) == false) {
          this.$Message.error('请输入正确查询年份！');
          $("#startYearForm").addClass("ivu-form-item-error");
          return;
        }
        $("#startYearForm").removeClass("ivu-form-item-error");

        let endDateA = $(".ivu-input:eq(1)").val();
        let rMonth = /^\d{1,2}$/;
        if (rMonth.test(endDateA) == false) {
          this.$Message.error('请输入月份！');
          $("#endDateForm").addClass("ivu-form-item-error");
          return;
        }
        $("#endDateForm").removeClass("ivu-form-item-error");

        console.log('>>>  ',new Date(startYearA).format('yyyy'),new Date(Date.now()).format('yyyy'))
        console.log(parseInt($(".ivu-input:eq(1)").val()), (new Date().getMonth() + 1))
        //手动输入不能大于当前月份
        if (new Date(new Date(startYearA).format('yyyy')) > new Date(new Date(Date.now()).format('yyyy'))) {
          this.$Message.error('查询年份不能大于当前年份！');
          $("#startYearForm").addClass("ivu-form-item-error");
          return;
        }else if(new Date(startYearA).format('yyyy') == new Date(Date.now()).format('yyyy')){
          if(parseInt($(".ivu-input:eq(1)").val()) > (new Date().getMonth() + 1)){
            this.$Message.error('查询年月不能大于当前年月！');
            return;
          }
        }
        $("#startYearForm").removeClass("ivu-form-item-error");

        var startYearValue = this.formValidate.startYear;
        //验证

        this.$Message.success('提交成功!请等待~');

        if(!isPageClick) this.returnN = 1;
        this.publicPagination(this.returnN, this.pageSize, true);


      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          "year": this.formValidate.startYear.format ? this.formValidate.startYear.format('yyyy') : this.formValidate.startYear,
          'month': this.formValidate.startMonth.format ? this.formValidate.startMonth.format('MM') : this.formValidate.startMonth,
          'memCde': this.currentSelectMember == '' ? 'ALL':this.currentSelectMember,
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
        const url = '/dw/mem/mem_24050';
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&year=" + (this.formValidate.startYear.format ? this.formValidate.startYear.format('yyyy') : this.formValidate.startYear)+'&month='+(this.formValidate.startMonth.format ? this.formValidate.startMonth.format('MM') : this.formValidate.startMonth)+'&memCde='+(this.currentSelectMember == '' ? 'ALL':this.currentSelectMember)
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mem/mem_24050_export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
      // 合计
      getSumLast() {
        var sums = []
        if (this.tableData1.length < 1) {
          sums = ['合计']
          for (var i = 0; i < this.tableColumns1.length - 2; i++) {
            sums.push('')
          }
          return sums
        } else {
          var obj = this.tableData1[this.tableData1.length - 1]
          var keyArr = []
          for (var i = 0; i < this.tableColumns1.length; i++) {
            var o = this.tableColumns1[i]
            if (o.children) {
              for (var j = 0; j < o.children.length; j++) {
                var item = o.children[j]
                keyArr.push(item.field)
              }
            } else {
              keyArr.push(o.field)
            }
          }
          for (var i = 0; i < keyArr.length; i++) {
            var v = obj[keyArr[i]]
            // sums.push(v)
            sums.push(formatTbousandth(v))
          }
        }
        return sums;
      }
    }
  }
</script>
<style>
  #mem24050 .el-table__footer-wrapper {
    display: block !important;
  }

  #mem24050 .ivu-collapse-content {
    overflow: inherit !important;
  }
  #mem24050 .el-input>input{
    height: 30px;
  }
  #mem24050 #memCode>div{
    margin-left: 10px !important;
    margin-top: 15px;
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
  .moreBtn{
    color: #2db7f5;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
</style>
