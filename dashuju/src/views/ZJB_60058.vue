<template>
  <section class="constWidth" id="zjb60058">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>按质押券统计报价回购质押券明细
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="选择日期">
                <Date-picker id="startDate" type="date" placeholder="选择日期" v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item label="证券代码">
                <Radio-group v-model="formValidate.cxtype">
                  <div id="zqcode">
                    <section class="warp">
                      <div class="searchIpt clearFix">
                        <input @click="showListHandle2" :value="searchCode" v-model="searchCode" placeholder="请输入/选择证券代码"
                               class="select-input"/>
                        <div class="select-down dropDown" v-show="listShow2">
                          <ul class="list">
                            <li class="li-item" v-for="item in zqCodeList2" @click="getTitleHandle2(item.value)">{{
                              item.label }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </div>
                </Radio-group>
              </Form-item>
              <Form-item>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                  <el-button type="danger" style="margin-left: 50px;" size="mini" plain @click="historyCodeClick(1)">代码变更历史</el-button>
                </div>
              </Form-item>
            </div>
          </Form>
          <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
            <!--<div class="flexBox">-->
              <!--<Form-item prop="startdate" id="startDateForm" label="起始日期">-->
                <!--<Date-picker id="startDate" type="date" placeholder="选择起始日期" v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--<Form-item prop="enddate" id="endDateForm" label="截止日期">-->
                <!--<Date-picker id="endDate" type="date" placeholder="选择截止日期" v-model="formValidate.enddate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--<div class="submitBtnBox">-->
                <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate')">查询</Button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</Form>-->
        </div>
      </Panel>
    </Collapse>
    <code-change-history v-if="vueGirldLayout"></code-change-history>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="按质押券统计报价回购质押券明细  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>
        只包含综合业务平台报价回购质押券数据，数据的有效期从20110829日开始。
      </p>
      <h3>二．指标说明</h3>
      <p>
        （1）质押券面值（万元）为质押券对应的现券手数 * 每手现券对应的面值。
        <br>（2）标准券面值（万元）为质押券折算成标准券对应的手数 * 每手标准券的折算率。
        <br>（3）占该会员的标准券占比（%）为选中某只质押券转化成标准券的面值与质押该质押券的会员所有质押券转换成标准券面值总和的比。
        <br>（4）占所有会员公司标准券的比例（%）为选中某只质押券转化成标准券的标准券面值与所有会员公司全部质押券转换成标准券面值总和的比。
        <br>（5）会员质押库标准券总额（万元）为会员公司所有的质押转换成标准券面值的总额。
      </p>
      <!--<h3>数据说明</h3>-->
      <!--<p>只包含综合业务平台报价回购质押券数据，数据的有效期从20110829日开始。</p>-->
      <!--<h3>指标说明</h3>-->
      <!--<p>-->
        <!--1． 质押券面值（万元）为质押券对应的现券手数 * 每手现券对应的面值。<br>-->
        <!--2． 标准券面值（万元）为质押券折算成标准券对应的手数 * 每手标准券的折算率。<br>-->
        <!--3． 占该会员的标准券占比（%）为选中某只质押券转化成标准券的面值与质押该质押券的会员所有质押券转换成标准券面值总和的比。<br>-->
        <!--4． 占所有会员公司标准券的比例（%）为选中某只质押券转化成标准券的标准券面值与所有会员公司全部质押券转换成标准券面值总和的比。<br>-->
        <!--5． 会员质押库标准券总额（万元）为会员公司所有的质押转换成标准券面值的总额。<br>-->
      <!--</p>-->
      <!--<h3>其他说明</h3>-->
      <!--<p>-->
        <!--无-->
      <!--</p>-->
      <h3>三．其他说明</h3>
      <p>无。</p>
      <!--<h3>数据说明</h3>-->
      <!--<p>只包含综合业务平台报价回购质押券数据，数据的有效期从20110829日开始。</p>-->
      <!--<h3>指标说明</h3>-->
      <!--<p>-->
        <!--1． 质押券面值（万元）为质押券对应的现券手数 * 每手现券对应的面值。<br>-->
        <!--2． 标准券面值（万元）为质押券折算成标准券对应的手数 * 每手标准券的折算率。<br>-->
        <!--3． 占该会员的标准券占比（%）为选中某只质押券转化成标准券的面值与质押该质押券的会员所有质押券转换成标准券面值总和的比。<br>-->
        <!--4． 占所有会员公司标准券的比例（%）为选中某只质押券转化成标准券的标准券面值与所有会员公司全部质押券转换成标准券面值总和的比。<br>-->
        <!--5． 会员质押库标准券总额（万元）为会员公司所有的质押转换成标准券面值的总额。<br>-->
      <!--</p>-->
      <!--<h3>其他说明</h3>-->
      <!--<p>-->
        <!--无-->
      <!--</p>-->
    </Modal>
    <div class="tableBox">
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
    commonGetReqParam,
    commonHeader,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/ZJB_60058.js';
  import '../theme/threeCommon.less';
  // import CodeChangeHistory from '../components/codeChangeHistory';

  export default {
    name: "ZJB_60058",
    props: [],
    // components: {
    //   CodeChangeHistory
    // },
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
          enddate: new Date(initialDate()),
          cxtype: '输入证券代码',
          zqCode: ''
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ],
        },
        //模糊查询数据
        // titles: '',
        // listShow: false,
        //表单
        // zqCodeList: [],
        t: '',
        vueGirldLayout:false,
        //模糊查询：证券代码
        searchCode:'',
        zqCodeList2: [],
        listShow2:false,
      //  exportCode要导出的证券代码
        exportCode:''
      }
    },
    watch: {

      searchCode: function () {
        let _this = this;
        /*if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
          this.$Message.error('会员名称输入不合法');
        }*/
        //会员名称联想
        fetch('/base-service/mem/scdnme', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            "s": _this.searchCode,
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
            this.listShow2 = true;
          } else {
            _this.listShow2 = false;
          }
          let codeData = data.resData,
            zqCodeList = [];
          for (var i = 0; i < codeData.length; i++) {
            let zqRow = {};
            zqRow.value = codeData[i];
            zqRow.label = codeData[i];
            zqCodeList.push(zqRow);
          }
          this.zqCodeList2 = zqCodeList;
        })
      }
    },
    methods: {
      // 代码变更历史按钮
      historyCodeClick:function (val) {
        if(val){
          this.vueGirldLayout = !this.vueGirldLayout;
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
       * 获取模糊查询选择框get的参数
       */
      getTitleHandle(title) {
        let _this = this;
        this.searchCode = title;
        setTimeout(function () {
          _this.listShow = false;
        }, 300);
      },
      getTitleHandle2(title) {
        let _this = this;
        this.searchCode = title;
        setTimeout(function () {
          _this.listShow2 = false;
        }, 300);
      },
      /**
       * 隐藏模糊查询下拉信息框
       */
      showListHandle() {
        this.listShow = false;
      },
      showListHandle2() {
        this.listShow2 = false;
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
          var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          // var endDateA = $(".ivu-input:eq(1)").val();
          // if (r.test(endDateA) == false) {
          //   this.$Message.error('请输入正确结束日期！');
          //   $("#endDateForm").addClass("ivu-form-item-error");
          //   return;
          // }
          // $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('查询日期不能大于当前日期！');
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
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
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
      publicPagination(pages, rows, statics) { document.getElementById("exportCurrent").setAttribute("disabled",true);
        var thisVal = ''
        var thisStr = this.searchCode.indexOf("-");
        if(thisStr>0){
          thisVal = this.searchCode.slice(0, thisStr);
        }else{
          thisVal = this.searchCode
        }
        // if (thisVal == "") {
        //   thisVal = 'ALL';
        // }
        //查询传送的参数
        this.searchParams = {
          // "memCde": thisVal,
          "tradeDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          // "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
          // "reQuery": statics,
          "businessId": "GDH_00015",
          'secCode':thisVal
        };

        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/zjb60058';
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
            this.$alert("查询出错，" + dataError,'错误',{
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
              _this.exportCode = _this.searchCode
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              console.log(_this.tableData1)
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
        var downfileParams = "row=1&type=bdsp_zjb60058&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&secCode=" +this.exportCode + "&tradeDate=" + this.formValidate.startdate.format('yyyy-MM-dd')
        if (type === 1) {
          $("#exportCurrent").attr("disabled");
          setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
          void(window.open('/dw/download/zjbexcel?' + downfileParams + commonGetReqParam));
        }
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'hold_par_amt' || prop == 'hold_std_amt' || prop == 'tot_hold_std_amt') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
  #zjb60058 {
    .warp {
      margin-bottom: 0;
    }
    .submitBtnBox {
      margin-left: -40px;
    }
    .ivu-form-item-content {
      line-height: normal;
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

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(51, 153, 255, .2);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    border-radius: 4px;
  }*/
</style>
