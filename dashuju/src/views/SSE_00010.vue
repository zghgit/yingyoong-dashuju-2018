<template>
  <section class="constWidth">
    <!--头部logo-->
    <header></header>
    <h2 class="infoTitle">市场概貌</h2>
    <div class="mainBox changeBox">
      <Row :gutter="gutterValue">
        <Col :span="leftPane">
        <span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>
        <Card class="iviewCard">
          <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
            <Icon type="load-c" size=40 class="loadIcon"></Icon>
            <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
          </Spin>
          <span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>
          <Modal id="lookInfoPop" title="市场概貌  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
                 cancel-text>
            <h3>数据说明</h3>
            <p>
              数据时间范围：1999年初至当前日期的前一交易日<br>
              证券选择范围：沪深市A股、B股、债券和指数
            </p>
            <h3>指标说明</h3>
            <br>沪港通概况
            <br>1.本应用可查询20141117日至今的数据。
            <br>2.从港股通每日成交数据中，统计出每日成交金额合计和标的证券数。其中，成交金额合计 = 卖方成交金额合计 + 买方成交金额合计。统计成交金额时，不包含大宗交易，同时，按照央行汇率折算成人民币。标的证券数取自港股通标的证券清单，不管该证券有没有进行交易。
            <br>3.在每日A股成交数据中，取出沪港通大帐户账号的每日成交金额合计和买卖标的证券数。其中，成交金额合计 = 卖方成交金额合计 + 买方成交金额合计。统计成交金额时，不包含大宗交易，同时，按照央行汇率折算成人民币。标的券数取自A股通标的证券清单，不管该证券有没有进行交易。
            <br>4.目前沪港通大帐户的账号为：D890825260。

            <br>成交概况
            <br>公司债含企业债现 货和公司债（122000－122999）
            <br>国债现货 含贴现国债
            <br>贴现国债 只在固定收益平台交易，因此当日显示实际为上日交易数据
            <br>从2011-10-31日起，合计、股票、基金、债券中包括约定式回购数据

            <br>市场构成
            <br>筹资额：以上市日做统计，再发筹资＝增发筹资额＋配股筹资额＋权证筹资
            <br>当日开户、本周开户、当月开户、当年开户、A股合计均为A股开户数，不含B股及基金开户数。
            <br>总开户数含A股、B股及基金开户数

            <br>历史数据
            <br>1.平均市盈率为加权平均市盈率。
            <br>2.流通股换手率=SUM(每日全市场换手率)，每日全市场换手率＝每日所有股票成交总量『A股成交量＋B股成交量』/当日所有股票流通量『A股流通量＋B股流通量』。
            <br>3.股票筹资总额单位为亿元；开户总数单位为万户；市价总值及无限售条件市值单位为亿元；成交金额单位为亿元；年度涨幅单位为%
            <br>4.市价总值、无限售条件市值、平均市盈率此处为股票相关数据。
            <br>5.市价总值只统计股票。
            <br>6.从2011-10-31日起，股票合计(亿元)、债券合计(亿元)、总成交额(亿元)中包括约定式回购数据
            <h3>其他说明</h3>
            <br>1、实时刷新
            <br>每交易日实时刷新时间： 9：00－15：00实时变化；　自动刷新时间间隔：　15分钟
            <br>2、数据范围：
            <br>大宗交易不纳入当日既时行情和指数的计算，成交量在大宗交易结束后计入该证券成交量。
            <br>固定收益平台不计入当日既时数据中。
            <br>历史数据包含大宗交易和固定收益平台
            <br>3、股本结构：上海市场为当日股本
            <br>深圳市场为前一交易日股本
            <br>4、筹资数据：本周、本月和本年统计均为截止前一交易日数据，不含当日数据。
            <br>5、历史数据：为当年每日近实时更新数据。针对当年数据，指标“上市公司家数、开户总数、A股、B股、基金”为上月末数据；指标“股票筹资总额、首次发行、再次发行”为前一交易日数据；其他指标均含当日数据。
            </p>
          </Modal>
          <!--头部logo-->
          <p id="infoTableList" class="redtext listlength"></p>
          <!--<i-table border :columns="tableColumns1" :data="tableData1"></i-table>-->
          <b>沪港通概貌</b>
          <fastTable :width="1200" :bwidth="1200"  :columns="tableColumnsList.hgtgm" :data="tableData1"></fastTable>
          <div class="b-blue mar-t-20">
            <div style="display:inline-block;width: 49%">
              <p>指数概况（上海证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.zsgk" :data="tableData1"></fastTable>
            </div>
            <div style="display:inline-block;width: 49%">
              <p>指数概况（深圳证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.zsgk" :data="tableData1"></fastTable>
            </div>
          </div>
          <div class="b-blue mar-t-20">
            <div style="display:inline-block;width: 49%">
              <p>重点指数（上海证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.zdzs" :data="tableData1"></fastTable>
            </div>
            <div style="display:inline-block;width: 49%">
              <p>重点指数（深圳证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.zdzs" :data="tableData1"></fastTable>
            </div>
          </div>
          <div class="b-blue mar-t-20">
            <div style="display:inline-block;width: 49%">
              <p>成交概况（上海证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.cjgk" :data="tableData1"></fastTable>
            </div>
            <div style="display:inline-block;width: 49%">
              <p>成交概况（深圳证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.cjgk" :data="tableData1"></fastTable>
            </div>
          </div>
          <b>期权概况（上海证券交易所）</b>
          <fastTable :width="1000" :bwidth="1000"  :columns="tableColumnsList.qqgk" :data="tableData1"></fastTable>
          <div class="b-blue mar-t-20">
            <div style="display:inline-block;width: 49%">
              <p>股票市场（上海证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.gpsc" :data="tableData1"></fastTable>
            </div>
            <div style="display:inline-block;width: 49%">
              <p>股票市场（深圳证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.gpsc" :data="tableData1"></fastTable>
            </div>
          </div>
          <b>市场构成（上海证券交易所）</b>
          <fastTable :width="1920" :bwidth="1920"  :columns="tableColumnsList.scgc" :data="tableData1"></fastTable>
          <div class="b-blue mar-t-20">
            <div style="display:inline-block;width: 49%">
              <p>近期成交（上海证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.jqcj" :data="tableData1"></fastTable>
            </div>
            <div style="display:inline-block;width: 49%">
              <p>近期成交（深圳证券交易所）</p>
              <fastTable :width="700" :bwidth="700" :isDouble="false" :columns="tableColumnsList.jqcj" :data="tableData1"></fastTable>
            </div>
          </div>

          <!--<div class="pageModule">-->
            <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
                  <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
          <!--</div>-->
          <div class="exportBtn">
            <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>
              <Icon type="ios-download-outline"></Icon>
              导出全部结果为XLSX文件
            </Button>
          </div>
        </Card>
        </Col>
        <Col :span="rightPane" class="infoRightCard">
        <Card class="iviewCard">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row class="dateBox">
              <Col span="12">
              <b>交易日期</b>
              <Form-item prop="startdate" id="startDateForm">
                <Date-picker id="startDate" type="date" placeholder="选择交易日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              </Col>
            </Row>
            <Form-item class="showrow">
              <p><label class="redtext fontsize12">{{new Date(formValidate.startdate).format('yyyy-MM-dd')}}</label></p>
            </Form-item>
            <Form-item>
              <div class="cxBox cxTop">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
              </div>
            </Form-item>
          </Form>
        </Card>
        </Col>
      </Row>
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
    // initialDate,
    threeReqPath,
    downloadReqPath
  } from '../assets/js/commen.js';
  import {tableColumnsList} from '../assets/js/SSE_00010.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {
        //显示隐藏输入条件
        changeArrow: 'rightArrow',
        gutterValue: 16,
        leftPane: 19,
        rightPane: 5,
        isHide: true,
        //统计口径
        changeInfo: false,
        //初始化表格信息
        tableColumnsList: tableColumnsList,
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        //日期初始化
        formValidate: {
          // startdate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: '',
        sums: []
      }
    },
    mounted() {
      $(".el-table__footer-wrapper").show();
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
        // document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        // document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
        var list = document.getElementsByClassName("ivu-table-header")
        var list2 = document.getElementsByClassName("ivu-table-body")
        for(var i=0;i<list.length;i++){
          list[i].children[0].style.width = "100%";
          list2[i].children[0].style.width = "100%";
        }
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
          var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('开始日期不能大于当前日期！');
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
      publicPagination(pages, rows, statics) { document.getElementById("exportCurrent").setAttribute("disabled",true);
        //查询传送的参数
        this.searchParams = {
          "rptDte": this.formValidate.startdate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00011",

        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = threeReqPath;
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
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
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
            _this.$Message.warning("查询出错" + dataError);
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
        var downfileParams = "type=GDH_00011&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.formValidate.startdate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          void(window.open(downloadReqPath + downfileParams));
        }
      },
      /**
       * 获取表格汇总行展示信息
       */
      getSumLast() {
        let newDatas = this.tableData1;
        let dataLens = newDatas.length;
        let lens = this.tableColumns1.length;
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
            let keys = this.tableColumns1[r].key;
            for (var rk in newDatas[dataLens - 1]) {
              if (keys == rk) {
                this.sums[r] = newDatas[dataLens - 1][keys];
              }
            }
          }
        }
        ;
        return this.sums;
      }
    }
  }
</script>

<style lang="less">
  .el-table__body-wrapper tr:nth-last-child(1) {
    display: none;
  }
  .b-blue{
    border: 1px solid #d7dde4;
  }
  .mar-t-20{
    margin-top: 20px;
  }

  /*.iviewCard {
    min-height: 780px;
  }

  .ivu-modal-body {
    max-height: 400px;
    overflow-y: auto;
  }

  .pageModule {
    padding-top: 10px;
  }

  .exportBtn {
    text-align: right;
    padding-top: 5px;
  }

  .datePickerWidth {
    width: 210px;
  }

  .numberUploads {
    margin: 10px 0 5px 0;
  }

  .searchIpt {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  .clearFix:after {
    display: block;
    content: '';
    clear: both;
  }

  .select-down {
    width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    position: absolute;
    z-index: 900;
  }

  .warp {
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
    margin-bottom: 15px;
  }

  .select-input {
    width: 100%;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  .li-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #657180;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
  }

  .dropDown {
    width: 212px;
    transform-origin: center top 0px;
    position: absolute;
    left: 0px;
    top: 33px;
  }

  th.ivu-table-column-left {
    text-align: center;
  }

  th.ivu-table-column-right {
    text-align: center;
  }

  .ivu-table-header, .ivu-table-body {
    overflow-y: scroll;
  }

  .cxTop {
    margin: 90px 0 0 0;
  }

  .ivu-table th {
    background-color: #29a7de;
    color: #fff;
  }*/
</style>
