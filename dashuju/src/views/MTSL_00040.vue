<template>
  <section class="constWidth" id="mtsl00040">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>融资融券交易业务动态周报下载
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <!--<Form-item prop="startdate" id="startDateForm">-->
                  <!--<b>交易日期：</b>-->
                  <!--<Date-picker id="startDate" type="date" placeholder="选择交易日期"-->
                               <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
                <!--</Form-item>-->
                <!--<Form-item prop="enddate" id="endDateForm">-->
                  <!--<b>结束日期：</b>-->
                  <!--<Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"-->
                               <!--class="datePickerWidth"></Date-picker>-->
                <!--</Form-item>-->
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
      <Modal id="lookInfoPop" title="融资融券交易业务动态周报下载  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br>一．	整体说明：
        <br>1)	本应用可查询时间起始范围为：2011年11月7日起
        <br>2)	本应用可查数据的时点为：每周的数据于下周的第一个交易日期提供下载。
        <br>3)	本应用限制最大查询时间区间为：一周
        <br>4)	<em>[绿色字体]</em>是变量，将由数据仓库根据用户所上传文件动态填充。填充完成后是不加粗的黑色字体（没有[ ]）。生成的文件名为：融资融券交易业务动态_YYYYMMDD_ YYYYMMDD.doc。
        <br>二．	单指标算法：
        <br>1．	<em>[个人账户数]</em> 上周具有交易的个人账户，其中账户类型为“非机构账户”和“对应账户”开头为“A”的账户皆归为个人账户。
        <br>2．	<em>[机构账户数]</em> 上周具有交易的机构账户。
        <br>3．	<em>[信用账户总数]</em> 上周活跃的信用账户总数。
        <br>4．	<em>[证券公司家数]</em> 上周活跃的会员总数。
        <br>5．	<em>[担保品市值_股票]</em>  金融工具代码为“6”、“900”开头的“担保品价值”。
        <br>6．	<em>[担保品市值_基金]</em>  金融工具代码为“6”、“900”开头的“担保品价值”。
        <br>7．	<em>[担保品市值_债券]</em>  金融工具代码为'500','501','503','502','505' ,'510','511','513','518','512'开头的“担保品价值”。
        <br>8．	<em>[担保品市值_其它]</em>  金融工具代码为“0”、“1”开头的“担保品价值”。
        <br>9．<em>	[证券公司为客户融券业务准备的标的证券只数]</em>“股东持有历史（闭市后）”有历史，且 “融资融券担保品清单”融资融券担保品清单有记录的证券数量。
        <br>10．	<em>[证券公司为客户融券业务准备的标的证券市值]</em> “股东持有历史（闭市后）”有历史，且 “融资融券担保品清单”融资融券担保品清单有记录的证券市值。
        <br>11．	<em>[融资融券交易总额]</em>上周每日交易融资融券总和。包含“融资买入额”、“卖券还款额”、“融券卖出额”和“买券还券额”。
        <br>12．	<em>[融资买入额]</em> 上周总的“融资买入额”。
        <br>13．	<em>[卖券还款额]</em> 上周总的“卖券还款额”。
       <br>14．	<em>[融券卖出额]</em> 上周总的“融券卖出额”。
       <br>15．	<em>[买券还券额]</em> 上周总的“买券还券额”。
       <br>16．<em>	[本周信用交易额最大会员简称]</em>上周交易额最大的“会员简称”。
       <br>17．<em>	[本周信用交易额最大会员信用交易金额]</em>上周交易额最大会员的“信用交易金额”。
       <br>18．	<em>[本周信用交易额最大会员信用交易金额占比]</em>上周该会员交易额\所有会员交易额*100%。
       <br>19．	<em>[本周融资买入额最大的标的证券简称]</em>上周融资买入额最大会员的简称。
       <br>20．	<em>[本周融资买入额最大的标的证券代码]</em> 上周融资买入额最大会员的“证券代码”。
       <br>21．	<em>[本周融资买入额最大的标的证券融资买入额]</em>上周总的最大的融资买入额。
       <br>22．	<em>[本周融资买入额最大的标的证券融资买入额占比]</em>上周最大融资买入额占总的融资买入额的占比。
       <br>23．	<em>[本周融券卖出额最大的标的证券简称] </em>上周融券卖出额最大会员的简称。
       <br>24．	<em>[本周融券卖出额最大的标的证券代码] </em>上周融券卖出额最大会员的“证券代码”。
       <br>25．	<em>[本周融券卖出额最大的标的证券融券卖出额]</em>上周总的最大的融券卖出额。
       <br>26．	<em>[本周融券卖出额最大的标的证券融券卖出额占</em> 上周最大融券卖出额占总的融券卖出额的占比。
       <br>27．	<em>[市场融资融券余额]</em> 上周“融资余额”和“融券余额”之和。
       <br>28．	<em>[市场融资余额]</em> 上周“融资余额”。
       <br>29．	<em>[市场融券余额]</em> 上周“融券余额”。
       <br>30．	<em>[融资融券余额最多会员简称]</em> 上周融资融券最大会员的简称。
       <br>31．	<em>[融资融券余额最多会员融资融券余额]</em> 上周融资融券余额最多会员融资融券余额。
       <br>32．	<em>[融资融券余额最多会员融资融券余额占比]</em> 融资融券余额最多会员占（总的融资融券余额*100）的百分比。
        <br>根据用户维护的代码分配数据表加载后的数据仓库表自动生成。


      </Modal>

      <!--头部logo-->
      <div class="tableBox">
        <el-tree :data="tableData1" :props="defaultProp" @node-click="treeNodeClick"></el-tree>
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
    lastMonthDay
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00020.js';
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
          startdate: new Date(lastMonthDay()),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择交易日期', trigger: 'change'}
          ],
          // enddate: [
          //   {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          // ]
        },
        t: '',
      //  树形菜单
        treeData:[],
        defaultProp:{
          children:'children',
          label:'label'
        },
      }
    },
    mounted() {

    },
    methods: {
      // 树形节点点击
      treeNodeClick:function (ev) {

        if(ev.children.length < 1){
          console.log(ev)
          var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA

          window.open('/dw/mtsl/mtsl_00040_word?startDate='+ev.other.start_date+'&endDate='+ev.other.end_date +'&'+downfileParams)
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
      // 当前选中的会员代码
      selectMemCodeHandle: function (item) {
        this.currentReportType = item
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
        this.publicPagination(this.returnN, this.pageSize, true);
        // this.$refs[name].validate((valid) => {
        //   if (this.isHide == false) {
        //     return;
        //   }
        //   const {startdate, enddate} = this.formValidate;
        //   //日期格式验证
        //   var r = dateReg
        //   var startDateA = $(".ivu-input:eq(0)").val();
        //   if (r.test(startDateA) == false) {
        //     this.$Message.error('请输入正确开始日期！');
        //     $("#startDateForm").addClass("ivu-form-item-error");
        //     return;
        //   }
        //   $("#startDateForm").removeClass("ivu-form-item-error");
        //   // var endDateA = $(".ivu-input:eq(1)").val();
        //   // if (r.test(endDateA) == false) {
        //   //   this.$Message.error('请输入正确结束日期！');
        //   //   $("#endDateForm").addClass("ivu-form-item-error");
        //   //   return;
        //   // }
        //   $("#endDateForm").removeClass("ivu-form-item-error");
        //   //手动输入不能大于当前日期
        //   if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
        //     this.$Message.error('交易日期不能大于当前日期！');
        //     $("#startDateForm").addClass("ivu-form-item-error");
        //     return;
        //   }
        //   $("#startDateForm").removeClass("ivu-form-item-error");
        //   // if (new Date(new Date(endDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
        //   //   this.$Message.error('结束日期不能大于当前日期！');
        //   //   $("#endDateForm").addClass("ivu-form-item-error");
        //   //   return;
        //   // }
        //   // $("#endDateForm").removeClass("ivu-form-item-error");
        //   //开始日期不能大于结束日期（手动输入+选择日期）
        //   // var startdateValue = this.formValidate.startdate,
        //   //   enddateValue = this.formValidate.enddate;
        //   // if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
        //   //   $("#startDateForm").addClass("ivu-form-item-error");
        //   //   $("#endDateForm").addClass("ivu-form-item-error");
        //   //   this.$Message.error('开始日期不能大于结束日期!');
        //   //   return;
        //   // }
        //   ;
        //   //验证
        //   if (valid) {
        //     this.$Message.success('提交成功!请等待~');
        //     if(!isPageClick) this.returnN = 1;
        //     this.publicPagination(this.returnN, this.pageSize, true);
        //   } else {
        //     this.$Message.error('查询失败!');
        //   }
        //
        // })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {

        var self = this
        //查询传送的参数
        this.searchParams = {
          // "date": this.formValidate.startdate.format('yyyy-MM-dd'),
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
        const url = '/dw/mtsl/mtsl_00040_tree';
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
            var dataResponse = data.resData
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.tableData1 = [
                {children:_this.dataArrayAll.children,label:_this.dataArrayAll.label}
              ];
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') + "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/bndexcel?type=bdsp_bnd15014&row=1&'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    }
  }
</script>
<style>
  #mtsl00040 .is-expanded .el-tree-node__children .el-tree-node__content span.el-tree-node__label{
    color: blue;
    text-decoration: underline;
  }
  #mtsl00040 .el-table__footer-wrapper {
    display: block !important;
  }

  #mtsl00040 .ivu-collapse-content {
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
  #lookInfoPop{
    em{
      font-style: normal;
      color:green;
    }
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

