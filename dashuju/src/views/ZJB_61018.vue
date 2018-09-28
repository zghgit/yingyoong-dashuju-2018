<template>
  <section class="constWidth" id="zjb61018">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>债券统计市场概况
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="月份选择">
                <Date-picker id="startDate" type="month" placeholder="选择月份" v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </Form-item>
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="债券统计市场概况  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      1.发行量，即上市日期在本月的债券在上市首日前一个交易日的托管量。统计时，不包含国债和地方政府债。<br>
      2.到期量，即摘牌日期在本月的债券在摘牌日的托管量。<br>
      3.现券交易量为交易面值，包含竞价、大宗和固收平台；回购交易量包含标准券回购、协议回购和报价回购。<br>
    </Modal>
    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        style="width: 100%"
        id="tableColumns1">
        <el-table-column :formatter="formatterNumber" v-for="(item,index) in tableColumns1"  :key="index"
           :prop="item.field"
           :label="item.title"
           :align="item.align"
           :min-width="item.width">
          <el-table-column :formatter="formatterNumber" v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
             :prop="items.field"
             :label="items.title"
             :align="items.align"
             :min-width="items.width">
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData2"
        style="width: 100%"
        id="tableColumns2">
        <el-table-column :formatter="formatterNumber" v-for="(item,index) in tableColumns2" :key="index"
           :prop="item.field"
           :label="item.title"
           :align="item.align"
           :min-width="item.width">
          <el-table-column :formatter="formatterNumber" v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"
             :prop="items.field"
             :label="items.title"
             :align="items.align"
             :min-width="items.width">
          </el-table-column>
        </el-table-column>
      </el-table>
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
    </div>

    <!--旧代码-->
    <!--<h2 class="infoTitle">债券统计市场概况</h2>-->
    <!--<div class="mainBox changeBox" id="zjb61018">-->
      <!--<Row :gutter="gutterValue">-->
        <!--<Col :span="leftPane">-->
        <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
        <!--<Card class="iviewCard">-->
          <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
            <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
            <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
          <!--</Spin>-->
          <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
          <!--<Modal id="lookInfoPop" title="债券统计市场概况  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
                 <!--cancel-text>-->
            <!--1.发行量，即上市日期在本月的债券在上市首日前一个交易日的托管量。统计时，不包含国债和地方政府债。<br>-->
            <!--2.到期量，即摘牌日期在本月的债券在摘牌日的托管量。<br>-->
            <!--3.现券交易量为交易面值，包含竞价、大宗和固收平台；回购交易量包含标准券回购、协议回购和报价回购。<br>-->
          <!--</Modal>-->
          <!--&lt;!&ndash;头部logo&ndash;&gt;-->
          <!--<p id="infoTableList" class="redtext listlength"></p>-->
          <!--&lt;!&ndash;<i-table border :columns="tableColumns1" :data="tableData1"></i-table>&ndash;&gt;-->
          <!--&lt;!&ndash;<fastTable :width="1920" :bwidth="1920" :columns="tableColumns1" :data="tableData1"></fastTable>&ndash;&gt;-->
          <!--<el-table-->
            <!--:data="tableData1"-->
            <!--style="width: 100%"-->
            <!--id="tableColumns1">-->
            <!--<el-table-column v-for="(item,index) in tableColumns1"  :key="index"-->
                             <!--:prop="item.field"-->
                             <!--:label="item.title"-->
                             <!--:align="item.align"-->
                             <!--:width="item.width">-->
              <!--<el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"-->
                               <!--:prop="items.field"-->
                               <!--:label="items.title"-->
                               <!--:align="items.align"-->
                               <!--:width="items.width">-->
              <!--</el-table-column>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--<el-table-->
            <!--:data="tableData2"-->
            <!--style="width: 100%"-->
            <!--id="tableColumns2">-->
            <!--<el-table-column v-for="(item,index) in tableColumns2" :key="index"-->
                             <!--:prop="item.field"-->
                             <!--:label="item.title"-->
                             <!--:align="item.align"-->
                             <!--:width="item.width">-->
              <!--<el-table-column v-if="item.children.length > 0" v-for="items in item.children" :key="items.field"-->
                               <!--:prop="items.field"-->
                               <!--:label="items.title"-->
                               <!--:align="items.align"-->
                               <!--:width="items.width">-->
              <!--</el-table-column>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--&lt;!&ndash;<div class="pageModule">&ndash;&gt;-->
            <!--&lt;!&ndash;<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"&ndash;&gt;-->
                  <!--&lt;!&ndash;show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
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
              <!--<b>月份选择</b>-->
              <!--<Form-item prop="startdate" id="startDateForm">-->
                <!--<Date-picker id="startDate" type="month" placeholder="选择月份"-->
                             <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--</Col>-->
            <!--</Row>-->
            <!--&lt;!&ndash;<Form-item class="showrow">&ndash;&gt;-->
              <!--&lt;!&ndash;<p><label class="redtext fontsize12">{{new Date(formValidate.startdate).format('yyyy-MM')}}</label></p>&ndash;&gt;-->
            <!--&lt;!&ndash;</Form-item>&ndash;&gt;-->
            <!--<Form-item>-->
              <!--<div class="cxBox cxTop">-->
                <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>-->
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
    initialMonth,
    threeReqPath,
    downloadReqPath,
    commonHeader,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1,tableColumns2} from '../assets/js/ZJB_61018.js';
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
        tableColumns2: tableColumns2,
        tableData1: [],
        tableData2: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        dataArrayAll2: [],
        pageSize: 500,
        //日期初始化
        formValidate: {
          startdate: new Date(initialMonth()),
          // startdate:''
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
      $(window).on('keydown',function(e){
        if(e.keyCode == 13){
          e.preventDefault()
        }
      })
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {


        return formatTbousandth(cellValue)
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
        $('#tableColumns1 .el-table__header').css('width','100%')
        $('#tableColumns1 .el-table__body').css('width','100%')
        $('#tableColumns2 .el-table__header').css('width','100%')
        $('#tableColumns2 .el-table__body').css('width','100%')
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
          var r = /^\d{4}([-/.]?)\d{1,2}$/;
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请选择正确月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('选择月份不能大于当前月份！');
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
          "queryDate": this.formValidate.startdate.format('yyyy-MM'),
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
        const url = '/dw/mktdt/zjb61018';
        this.tableData1 = [];
        this.dealitems = 0;
        var _this = this;
        _this.returnTotal = 0;
        _this.dataArrayAll = [];
        _this.dataArrayAll2 = [];
        _this.isHide = false;
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(_this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 60000).then(function (response) {
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
            _this.$alert("查询出错：" +  dataError,'提示',{
              confirmButtonText:'确定'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse1 = data.resData.result[0].data;
            var dataResponse2 = data.resData.result[1].data;
            var datalength = data.resData.result[0].data.length;
            var datalength2 = data.resData.result[1].data.length;
            if (datalength == 0 && datalength2 == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.tableData2 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse1;//保存所有数据
              _this.dataArrayAll2 = dataResponse2;//保存所有数据
              _this.returnTotal = datalength;
              if (dataResponse1.length == 1) {
                _this.tableData1 = [];
              } else {
                _this.tableData1 = _this.dataArrayAll;
              }
              if (dataResponse2.length == 1) {
                _this.tableData2 = [];
              } else {
                _this.tableData2 = _this.dataArrayAll2;

              }
              // _this.tableColumns1[1].title = this.formValidate.startdate.format('yyyy-MM')
              var searchDate = new Date(this.formValidate.startdate)
              var year = searchDate.getFullYear()
              var month = (searchDate.getMonth()+1) <10 ? '0'+(searchDate.getMonth()+1)+'月' : searchDate.getMonth()+1+'月'
              console.log(year,month)
              _this.tableColumns1[1].title = month
              _this.tableColumns2[1].title = year+'年01月——'+month
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
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&queryDate=" + this.formValidate.startdate.format('yyyy-MM');
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          void(window.open('/dw/mktdt/zjb61018export?' + downfileParams +commonGetReqParam));
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
        console.log(this.sums)
        return this.sums;
      }
    }
  }
</script>

<style lang="less">
  #zjb61018 {
    .submitBtnBox {
      margin-left: -40px;
    }
    .ivu-form-item-content {
      line-height: normal;
    }
    #tableColumns2 {
      margin-top: 15px;
    }
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
