<template>
  <section id="opt60025">
    <!--头部logo-->
    <header></header>
    <!-- 添加点1，collapse需要加到script中 -->
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <!-- 修改点1，标题 -->
        <p>期权经营机构交易经手费(生产)
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <!-- 修改点2，日历或输入框 -->
              <!-- 样例1，日历 -->
              <Form-item prop="startdate" id="startDateForm" label="开始日期">
                <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期">
                <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              <!-- 样例2，选择框 -->
              <Form-item label="机构名称（关键字）" :label-width="140">
                <Radio-group v-model="formValidate.cxtype" class="zqradio">
                  <row>
                    <div id="zqcode">
                      <section class="warpSel">
                        <div class="searchIpt clearFix">
                          <input  :value="titles" v-model="titles" placeholder="请输入机构名称"
                                 class="select-input"/>
                        </div>
                      </section>
                    </div>
                  </row>
                </Radio-group>
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

    <Modal id="lookInfoPop" title="期权经营机构交易经手费  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <b>一． 数据说明</b>
      <br> 计算期权经营机构每日经手费
      <br><b>二． 指标说明</b>
      <br>1. 实际收款(交易系统)：交易系统计算当天实际经手费。
      <br>2. 业务类型：做市-做市账户成交；自营\经纪\其他-交易单元资金账户对应关系。
      <br>3. 标准收费金额：该数据不含备兑开仓、卖出开仓以及做市账户非连续竞价期间订单成交。
      <br>4. 优惠金额：做市账户按一定比例对经手费减免。
      <br>5. 奖励金额：对对手方实际收款按一定比例奖励给提供流动性的做市账户。
      <br>6. 实际收款 = 优惠后收费 - 奖励金额 = 标准收费金额 - 优惠金额 - 奖励金额。
      <br><b>三． 其他说明</b>
      <br>无
    </Modal>

    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-col :span="24">
        <el-table
            :data="tableData1"
            border
             :summary-method="getSumLast"
            show-summary
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
                             :formatter="fn_formatter"
                             :align="items.align"
                             :width="items.width">
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
    initialDate,
    commonHeader,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/OPT_60025.js';
  import '../theme/threeCommon.less';

var initialDateT=new Date(initialDate());
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
          startdate: initialDateT,
          enddate: initialDateT,
          cxtype: '输入会员名称',
          zqCode: ''
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ],
          zqCode: [
            {required: true, message: '请输入机构名称', trigger: 'change'}
          ]
        },
        //模糊查询数据
        titles: '',
        listShow: false,
        //表单
        zqCodeList: [],
        t: ''
      }
    },
    watch: {

    },
     mounted() {
      $(".el-table__footer-wrapper").show();
    },
    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
        // 需要格式化千分位的字段
        if(prop =='std_fee_amt' || prop == 'fee_amt_trade'|| prop == 'deduct_fee_amt'|| prop == 'pay_fee_amt'|| prop == 'back_fee_amt'|| prop == 'fee_amt'){
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
       * 隐藏模糊查询下拉信息框
       */
      showListHandle() {
        this.listShow = false;
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
          var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束日期！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('开始日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('结束日期不能大于当前日期！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('开始日期不能大于结束日期!');
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
      publicPagination(pages, rows, statics) {document.getElementById("exportCurrent").setAttribute("disabled",true);
       let thisVal = this.titles;
        if (thisVal.trim() == "") {
          thisVal = 'ALL';
        }
        //查询传送的参数
        this.searchParams = {
          "memCde": thisVal,
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
          // "reQuery": statics,

        };

        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/opt/opt_60025';
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
            console.log(data.resData)
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length <=1) {
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
       * 获取表格汇总行展示信息
       */
       getSumLast() {
        var sums = []
        var obj = this.tableData1[this.tableData1.length - 1]
        for(var key in obj){
          var v = obj[key]
          // sums.push(v)
          sums.push(formatTbousandth(v))
        }
        return sums;
      },
      /**
       * 导出Excel文件
       */
      exportData(type) {

        let thisVal = this.titles;
        if (thisVal == "") {
          thisVal = 'ALL';
        }
        var downfileParams = "row=1&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&memCde=" + thisVal + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        if (type === 1) {
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
          void(window.open('/dw/opt/opt_60025_export?' + downfileParams + commonGetReqParam));
        }
      }
    }
  }
</script>

<style lang="less">

  #opt60025 .el-table__body-wrapper tr:nth-last-child(1) {
    display: none;
  }
  #opt60025 .el-tabs__content{
    display: none;
  }
  #opt60025 .el-table__row:nth-last-child(1){
    display: none;
  }
  .el-table__footer-wrapper{
    display: block !important;
  }
  #opt60025 {
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
  .warpSel {
    height: 32px;
    position: relative;
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #d7dde4;
    transition: all .2s ease-in-out;
    margin-bottom: 0px;
  }

</style>
