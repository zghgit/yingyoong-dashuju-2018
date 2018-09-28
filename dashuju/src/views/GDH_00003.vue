<template>
  <section class="constWidth" id="gdh00003">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押回购违约处置明细
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="开始日期">
                <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期">
                <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
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
    <Modal id="lookInfoPop" title="股票质押回购违约处置明细  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>只包含综合业务平台股票质押式回购违约处置数据</p>
      <h3>二．指标说明</h3>
      <p>
        1.预计购回交易日：违约处置对应的初始交易所填的购回交易日
        <br>2.融出方属性：根据融出方账户归类为“券商自营”、“集合资产”、“定向资产”、“专项资产”、“其他资产”
        <br>3.融入方属性：根据融入方账户归类为“特殊机构”、“一般机构”、“个人投资者
      </p>
      <h3>三．其他说明</h3>
      <p>
      1.会员名称为全称
      <br>2.按会员维度进行明细数据统计，根据实际使用PBU代码的会员进行统计，即如果有基金，非会员租用则统计到基金和非会员
      <br>3.通常情况下，在T日16:30起可访问应用获得包含T日正确统计数据
      <br>4.只展示有违约处置的会员
      <br>5.排序方式为：会员名称（正序从小到大），违约处置申报日（正序从小到大），购回交易日（正序从小到大），初始交易日（正序从小到大），标的证券代码（正序从小到大），初始交易金额（正序从小到大）
      <br>6.根据实际交易情况，可能有完全重复数据
      </p>
    </Modal>
    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        :summary-method="getSumLast"
        show-summary
        style="width: 100%">
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
           :formatter="formatData"
           :prop="item.key"
           :label="item.title"
           :align="item.align"
           :min-width="item.width">
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

    <!--旧代码-->
    <!--<h2 class="infoTitle">股票质押回购违约处置明细</h2>-->
    <!--<div class="mainBox changeBox" id="gdh00003">-->
      <!--<Row :gutter="gutterValue">-->
        <!--<Col :span="leftPane">-->
        <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
        <!--<Card class="iviewCard">-->
          <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
            <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
            <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
          <!--</Spin>-->
          <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
          <!--<Modal id="lookInfoPop" title="股票质押回购违约处置明细  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
                 <!--cancel-text>-->
            <!--<h3>数据说明</h3>-->
            <!--<p>只包含综合业务平台股票质押式回购违约处置数据</p>-->
            <!--<h3>指标说明</h3>-->
            <!--<p>-->
              <!--1. 预计购回交易日：违约处置对应的初始交易所填的购回交易日。<br>-->
              <!--2. 融出方属性：根据融出方账户归类为“券商自营”、“集合资产”、“定向资产”、“专项资产”、“其他资产”。<br>-->
              <!--3. 融入方属性：根据融入方账户归类为“特殊机构”、“一般机构”、“个人投资者。<br>-->
            <!--</p>-->
            <!--<h3>其他说明</h3>-->
            <!--<p>-->
              <!--1. 会员名称为全称。<br>-->
              <!--2. 按会员维度进行明细数据统计，根据实际使用PBU代码的会员进行统计，即如果有基金，非会员租用则统计到基金和非会员<br>-->
              <!--3. 通常情况下，在T日16:30起可访问应用获得包含T日正确统计数据<br>-->
              <!--4. 只展示有违约处置的会员<br>-->
              <!--5. 排序方式为：会员名称（正序从小到大），违约处置申报日（正序从小到大），购回交易日（正序从小到大），初始交易日（正序从小到大），标的证券代码（正序从小到大），初始交易金额（正序从小到大）<br>-->
              <!--6. 根据实际交易情况，可能有完全重复数据<br>-->
            <!--</p>-->
          <!--</Modal>-->
          <!--&lt;!&ndash;头部logo&ndash;&gt;-->
          <!--<p id="infoTableList" class="redtext listlength"></p>-->
          <!--&lt;!&ndash;<i-table border :columns="tableColumns1" :data="tableData1"></i-table>&ndash;&gt;-->
          <!--&lt;!&ndash;<fastTable :width="1920" :bwidth="1920" :columns="tableColumns1" :data="tableData1"></fastTable>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-table></el-table>&ndash;&gt;-->
          <!--<el-table-->
            <!--:data="tableData1"-->
            <!--border-->
            <!--:summary-method="getSumLast"-->
            <!--show-summary-->
            <!--style="width: 100%">-->
            <!--<el-table-column v-for="(item,index) in tableColumns1" :key="index"-->
                             <!--:prop="item.key"-->
                             <!--:label="item.title"-->
                             <!--:align="item.align"-->
                             <!--:width="item.width">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--<div class="pageModule">-->
            <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
                  <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
          <!--</div>-->
          <!--<div class="exportBtn">-->
            <!--<Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>-->
              <!--<Icon type="ios-download-outline"></Icon>-->
              <!--导出全部结果为XLSX文件-->
            <!--</Button>-->
          <!--</div>-->
        <!--</Card>-->
        <!--</Col>-->
        <!--<Col :span="rightPane" class="infoRightCard">-->
        <!--<Card class="iviewCard">-->
          <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
            <!--<Row class="dateBox">-->
              <!--<Col span="12">-->
              <!--<b>开始日期</b>-->
              <!--<Form-item prop="startdate" id="startDateForm">-->
                <!--<Date-picker id="startDate" type="date" placeholder="选择开始日期"-->
                             <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--<b>结束日期</b>-->
              <!--<Form-item prop="enddate" id="endDateForm">-->
                <!--<Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"-->
                             <!--class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--</Col>-->
            <!--</Row>-->
            <!--<Form-item>-->
              <!--<div class="cxBox cxTop">-->
                <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate',false);">查询</Button>-->
              <!--</div>-->
            <!--</Form-item>-->
          <!--</Form>-->
        <!--</Card>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</div>-->
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
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00003.js';
  import '../theme/threeCommon.less';

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
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
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
        // this.publicPagination(page, this.pageSize, false);
        this.handleSubmit('formValidate',true)
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        // this.publicPagination(this.returnN, pageSize, false);
        this.handleSubmit('formValidate',true)
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
       * 查询功能
       */
      handleSubmit(name,isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate, enddate} = this.formValidate;
          //日期格式验证
          // var r = /^\d{4}([-/.]?)\d{1,2}\1\d{1,2}$/;
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
            this.publicPagination(this.returnN, this.pageSize, isPageClick ? false : true);
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
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00003"
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
          headers:commonHeader
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
            _this.$alert("查询出错" +  dataError,'错误',{
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
              if (dataResponse.length == 1){
                _this.tableData1 = [];
              }else{
                _this.tableData1 = _this.dataArrayAll;
              }
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
      exportData(type) {
        var downfileParams = "type=GDH_00003&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          void(window.open(downloadReqPath + downfileParams+commonGetReqParam));
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
                this.sums[r] = newDatas[dataLens - 1][keys]?formatTbousandth(newDatas[dataLens - 1][keys]):'';
              }
            }
          }
        }
        ;
        return this.sums;
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'trade_amt' || prop == 'trade_vol') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
   #gdh00003 .el-table__body-wrapper tr:nth-last-child(1) {
    display: none;
  }
   #gdh00003 {
     /*公共样式*/
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
</style>
