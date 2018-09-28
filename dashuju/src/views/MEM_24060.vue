<template>
  <section id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>交易单元申报笔数
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm" label="选择月份">
                  <Date-picker id="startDate" type="month" placeholder="选择选择月份"
                               v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
                </Form-item>
              <Form-item prop="enddate" label="会员名称">
                <el-select   v-model="currentSelectMemberValue"  @change="selectTypeHandle"  placeholder="请选择">
                  <el-option v-for="item in memberList" :key="item.mem_full_name" :label="item.mem_full_name" :value="item.mem_code">
                  </el-option>
                </el-select>
              </Form-item>
              <Form-item prop="enddate" label="交易单元">
                <Radio-group >
                  <row>
                    <div id="tradingUnit">
                      <section class="warp">
                        <div class="searchIpt clear-left-pad clearFix"  style="width:212px">
                          <input :value="formValidate.tradingUnit" v-model="formValidate.tradingUnit" placeholder="请输入交易单元"
                                 class="select-input"/>
                        </div>
                      </section>
                    </div>
                  </row>
                </Radio-group>
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
    <Modal id="lookInfoPop" title="交易单元申报笔数  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．整体说明：</h3>
      <p>
        1) 本应用可查询时间起始范围为：2010/12-now
        <br>2) 本应用可查询T日数据的时点为：T日22:00后
        <br>3) 交易类订单申报：指普通订单（普通订单日志）中证券代码不是“7”开头并且不是“NTROUT”的订单申报
        <br>4) 非交易类订单申报：指普通订单（普通订单日志）中证券代码以“7”开头或是“NTROUT”的订单、债转股订单（其他非交易订单日志中可转债部分）、
        ETF订单（ETF订单日志）、IPO订单（IPO订单日志）、投票订单(新投票订单日志文件)、其他非交易订单（其他非交易订单日志）以及指定交易变动（指定交易变动数据）的订单申报
        <br>5) 剔除大宗交易（订单类型为'B1', 'B2', 'B3'）和货币基金（证券代码以511开头）的订单申报
        <br>6) 所有交易类及非交易类订单申报笔数为扣减商业银行订单和债券类订单后的订单申报笔数
      </p>
      <h3>二．单指标算法：</h3>
      <p>
        序号 展示字段 展示字段算法或公式
        <br>1 交易日期 取自查询年月，显示格式为“YYYY年MM月”
        <br>2 机构代码 根据机构序号取自会员历史机构代码字段
        <br>3 机构序号 根据交易单元获取自PBU信息表
        <br>4 机构名称 根据机构序号取自会员历史会员全称字段
        <br>5 交易单元 PBU交易单元代码
        <br>6 本月交易类申报笔数 汇总本月的每个PBU每个交易日的交易类订单数
        <br>7 本月非交易类申报笔数 汇总本月的每个PBU每个交易日的非交易类订单数
        <br>8 该年累计交易类申报笔数 汇总至本月为止的当年每个PBU每个交易日的交易类订单数
        <br>9 该年累计非交易类申报笔数 汇总至本月为止的当年每个PBU每个交易日的非交易类订单数
      </p>
    </Modal>
    <div class="tableBox" id="tableData">
      <el-col :span="24">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%">
          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :formatter="formatData"
                           :prop="item.key"
                           :label="item.title"
                           :align="item.align"
                           :min-width="item.width">
            <el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
                             :formatter="formatData"
                             :prop="items.field"
                             :label="items.title"
                             :align="items.align"
                             :mi.width="items.width">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
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
    urlParams,
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    getUrlParams,
    initialDateTwo,
    threeReqPath,
    downloadReqPath,
    initialMonth,
    commonGetReqParam,
    commonHeader,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MEM_24060.js';
  import '../theme/threeCommon.less';
  import FormItem from "iview/src/components/form/form-item";
  import '../theme/fifteenCommon.less';
  export default {
    components: {FormItem},
    data() {
      return {
        aa:'',
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
          startdate: new Date(initialMonth()),
          // enddate: new Date(initialDateTwo()),
          cxtype: '输入会员名称',
          zqCode: '',
          tradingUnit:''
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择开始月份', trigger: 'change'}
          ],
          // enddate: [
          //   {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          // ],
          zqCode: [
            {required: true, message: '请输入/选择会员名称', trigger: 'change'}
          ],
        },
        //模糊查询数据
        titles: '',
        listShow: false,
        //表单
        zqCodeList: [],
        t: '',
      //  会员列表
        memberList: [],
        currentSelectMember:'',
        currentSelectMemberValue:'全部'
      }
    },
    watch: {
      titles: function () {
        let _this = this;
        /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
          this.$Message.error('会员名称输入不合法');
        }*/
        //会员名称联想
        fetch('/base-service/mem/cdnme', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            "s": _this.titles,
            "userId": srcUseridA,
            "userName": srcUsernameA
          }),
          headers: commonHeader
        }).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {

          var _this = this;
          if (data.resData.length > 0) {
            this.listShow = true;
          } else {
            _this.listShow = false;
          }
          let codeData = data.resData,
            zqCodeList = [];
          for (var i = 0; i < codeData.length; i++) {
            let zqRow = {};
            zqRow.value = codeData[i];
            zqRow.label = codeData[i];
            zqCodeList.push(zqRow);
          }
          this.zqCodeList = zqCodeList;
        })
      }
    },
    mounted(){
      var self = this
      var obj = new XMLHttpRequest();
      obj.open('GET', '/dw/mem/mem_20460_mem_list?userId='+srcUseridA+'&userName='+srcUsernameA+'&signature='+signatureA+'&Authorization='+AuthorizationA +commonGetReqParam, false);
      obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200) {
          const responseData = JSON.parse(obj.responseText);
            self.memberList = responseData.resData
        }
      };
      obj.send(null);
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
        //document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        //document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
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
       * 获取模糊查询选择框get的参数
       */
      getTitleHandle(title) {
        let _this = this;
        this.titles = title;
        setTimeout(function () {
          _this.listShow = false;
        }, 300);
      },
      /**
       * 隐藏模糊查询下拉信息框
       */
      showListHandle() {
        this.listShow = false;
      },
      /**
       * 隐藏模糊查询下拉信息框
       */
      selectTypeHandle:function (item) {
        this.currentSelectMember = item
        // this.currentSelectMemberValue = this.memberList[item].mem_full_name
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
            this.$Message.error('请输入正确开始月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }

          $("#startDateForm").removeClass("ivu-form-item-error");

          // if (this.currentSelectMember =='') {
          //   this.$Message.error('请输入/选择会员名称！');
          //   $("#memberNameForm").addClass("input-error");
          //   return;
          // }
          // console.log(this.formValidate)
          // $("#memberNameForm").removeClass("input-error");
          // var endDateA = $(".ivu-input:eq(1)").val();
          // if (r.test(endDateA) == false) {
          //   this.$Message.error('请输入正确结束日期！');
          //   $("#endDateForm").addClass("ivu-form-item-error");
          //   return;
          // }
          // $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('开始月份不能大于当前月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          // if (new Date(new Date(endDateA).format('yyyy-MM-dd')) >= new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
          //   this.$Message.error('结束日期不能大于等于当前日期！');
          //   $("#endDateForm").addClass("ivu-form-item-error");
          //   return;
          // }
          // $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          // var startdateValue = this.formValidate.startdate,
          //   enddateValue = this.formValidate.enddate;
          // if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
          //   $("#startDateForm").addClass("ivu-form-item-error");
          //   $("#endDateForm").addClass("ivu-form-item-error");
          //   this.$Message.error('开始日期不能大于结束日期!');
          //   return;
          // }
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
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        // let thisStr = this.titles.indexOf("-");
        // let thisVal
        // if(thisStr>0){
        //   thisVal = this.titles.slice(0, thisStr);
        // }else{
        //   thisVal = this.titles
        // }
        // if (thisVal == "") {
        //   thisVal = 'ALL';
        // }
        //查询传送的参数
        this.searchParams = {
          "memCde": this.currentSelectMember == '' ? 'ALL':this.currentSelectMember,
          "tradeDateYearMonth": this.formValidate.startdate.format('yyyy-MM'),
          'pbuCode':this.formValidate.tradingUnit,
          // "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
          // "reQuery": statics,
          "businessId": "GDH_00018"
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mem/mem_20460';
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
            // _this.$Message.warning("查询出错" + dataError);
            _this.$alert("查询出错：" +  dataError,'错误',{
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
        let thisStr = this.titles.indexOf("-");
        let thisVal = this.titles.slice(0, thisStr);
        console.log(this.formValidate)
        var tradeDateYearMonth = this.formValidate.startdate == '' ? '' : this.formValidate.startdate.format('yyyy-MM')
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +
         '&tradeDateYearMonth='+tradeDateYearMonth+'&pbuCode='+this.formValidate.tradingUnit+'&memCde='+ (this.currentSelectMember == '' ? 'ALL':this.currentSelectMember)
        console.log(downfileParams)
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          console.log('/dw/mem/mem_20460_export?' + downfileParams)
          void(window.open('/dw/mem/mem_20460_export?' + downfileParams +commonGetReqParam));
        }
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'trade_order_cnt' || prop == 'nontrade_order_cnt' || prop == 'trade_order_cnt_sum' || prop == 'nontrade_order_cnt_sum') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  .clear-left-pad{
    padding-left: 0 !important;
  }
  .input-error{
    border:1px solid red !important;
  }
  div.el-scrollbar{
    width:200px;
  }
  .el-input__inner{
    padding-left: 8px !important;
    height: 32px !important;
  }
  .el-input--suffix{

    margin-bottom: 25px;
  }

</style>
