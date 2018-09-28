<template>
  <section class="constWidth" id="fifteenCommon">

    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押式回购交易月报下载
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="开始年份">
                <Date-picker id="startDate" type="year" placeholder="选择开始年份"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束年份">
                <Date-picker id="endDate" type="year" placeholder="选择结束年份" v-model="formValidate.enddate"
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
    <Modal id="lookInfoPop" title="股票质押式回购交易月报下载  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>
        只包含综合业务平台股票质押式回购初始交易和补充质押数据
      </p>
      <h3>二．指标说明</h3>
      <p>
        1.入方属性：特殊机构，一般机构和个人投资者的区分，依据现有数据仓库维护的机构账户分类表，在此表中的账户为特殊机构，不在此表的账户且A字头账户为个人投资者，剩余的为一般机构
        <br>2.入方分类：特殊机构和一般机构统称为“机构投资者”，其他为“个人投资者”。
        <br>3.出方属性：数据来源为综合业务平台合格投资者账户（se012qisj），其中“自营”在需求中融出方分类为“证券公司”，其余“定向资产管理”，“集合资产管理”，“专项资产管理”在需求中融出方分类为“资产管理产品”
        <br>4.月总成交金额：本月发生的股票质押回购业务初始交易金额和购回交易金额之和。
        <br>5.月初始交易金额：本月发生的股票质押回购业务初始交易金额之和。只取交收成功的数据。
        <br>6.月购回交易金额：本月发生的股票质押回购业务购回交易金额之和。
        <br>7.月平均质押率：本月发生的股票质押回购业务，当月有交易的会员中每笔初始交易质押率的算术平均值，每笔质押率=初始交易金额/质押标的券市值。
        <br>8.月平均利率=∑（本月每笔初始交易金额*相应利率）/∑本月每笔初始交易金额，股票质押利率的数据源为“股票质押回购初始交易明细应用”（手工单录）或者“股票质押利率数据上传应用”（批量导入）中用户输入的利率。以“股票质押回购初始交易明细应用”手工录入的数据为优先，若用户2个应用都没有输入，则利率相关统计为空
        <br>9.计总成交金额：截至本月末股票质押回购业务上市以来的初始成交金额和购回交易金额之和。
        <br>10.累计初始交易金额：截至本月末股票质押回购业务上市以来的初始成交金额之和。只取交收成功的数据。
        <br>11.累计购回交易金额：截至本月末股票质押回购业务上市以来的购回交易金额之和。
        <br>12.期末待购回初始交易金额：股票质押回购业务期末待购回初始交易金额之和。
        <br>13.期末标的证券市值：股票质押回购业务期末待购回的权益调整后的标的证券市值之和，其中债券使用全价计算市值。
        <br>14.均履约担保比例：期末计算股票质押回购业务:权益调整后期末标的证券市值之和/初始交易金额之和。
        <br>15.购回期限=购回交易日-初始交易日，按自然日计算。
        <br>16.质押集中度比例 = 持有待购回证券数量 / 持有待购回证券总股本。总股本：T日统计使用T日开盘总股本，开盘总股本使用T-1日清算后持仓汇总数量。
      </p>
      <h3>三．其他说明</h3>
      <p>
        1.会员名称为简称
        <br>2.通常情况下，在T日22:00起可访问应用获得包含T日正确统计数据，忽略交收结果、融入方属性2的情况下，可在T日16:30起获得T日统计数据
        <br>3.只展示有权限做股票质押的会员。若有会员本月没有任何交易或其他数据，同样展示该会员数据。
        <br>4.排序方式为：表4按照待购回初始交易金额排序，其他表按照会员简称的拼音排序。
      </p>
    </Modal>
    <div class="tableBox" id="tableData">
      <el-col :span="24">
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
                <a @click="anchorClick(scope)">{{scope.row.value}}</a>
              </template>
            </el-table-column>
            <el-table-column v-else :key="index"
                             :prop="item.key"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
            </el-table-column>
          </template>
        </el-table>
      </el-col>

    </div>



    <!--头部logo-->
    <!--<header></header>-->
    <!--<h2 class="infoTitle">股票质押式回购交易月报下载</h2>-->
    <!--<div class="mainBox changeBox">-->
      <!--<Row :gutter="gutterValue">-->
        <!--<Col :span="leftPane">-->
        <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
        <!--<Card class="iviewCard">-->
          <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
            <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
            <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
          <!--</Spin>-->
          <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
          <!--<Modal id="lookInfoPop" title="股票质押式回购交易月报下载" v-model="changeInfo" class-name="vertical-center-modal"-->
                 <!--cancel-text>-->
            <!--<h3>数据说明</h3>-->
            <!--只包含综合业务平台股票质押式回购初始交易和补充质押数据-->
            <!--<br>-->
            <!--<h3>指标说明</h3>-->
            <!--1. 融入方属性：特殊机构，一般机构和个人投资者的区分，依据现有数据仓库维护的机构账户分类表，在此表中的账户为特殊机构，不在此表的账户且A字头账户为个人投资者，剩余的为一般机构-->
            <!--<br>2. 融入方分类：特殊机构和一般机构统称为“机构投资者”，其他为“个人投资者”。-->
            <!--<br>3.-->
            <!--融出方属性：数据来源为综合业务平台合格投资者账户（se012qisj），其中“自营”在需求中融出方分类为“证券公司”，其余“定向资产管理”，“集合资产管理”，“专项资产管理”在需求中融出方分类为“资产管理产品”-->
            <!--<br>4. 本月总成交金额：本月发生的股票质押回购业务初始交易金额和购回交易金额之和。-->
            <!--<br>5. 本月初始交易金额：本月发生的股票质押回购业务初始交易金额之和。只取交收成功的数据。-->
            <!--<br>6. 本月购回交易金额：本月发生的股票质押回购业务购回交易金额之和。-->
            <!--<br>7. 本月平均质押率：本月发生的股票质押回购业务，当月有交易的会员中每笔初始交易质押率的算术平均值，每笔质押率=初始交易金额/质押标的券市值。-->
            <!--<br>8.-->
            <!--本月平均利率=∑（本月每笔初始交易金额*相应利率）/∑本月每笔初始交易金额，股票质押利率的数据源为“股票质押回购初始交易明细应用”（手工单录）或者“股票质押利率数据上传应用”（批量导入）中用户输入的利率。以“股票质押回购初始交易明细应用”手工录入的数据为优先，若用户2个应用都没有输入，则利率相关统计为空-->
            <!--<br>9. 累计总成交金额：截至本月末股票质押回购业务上市以来的初始成交金额和购回交易金额之和。-->
            <!--<br>10. 累计初始交易金额：截至本月末股票质押回购业务上市以来的初始成交金额之和。只取交收成功的数据。-->
            <!--<br>11. 累计购回交易金额：截至本月末股票质押回购业务上市以来的购回交易金额之和。-->
            <!--<br>12. 期末待购回初始交易金额：股票质押回购业务期末待购回初始交易金额之和。-->
            <!--<br>13. 期末标的证券市值：股票质押回购业务期末待购回的权益调整后的标的证券市值之和，其中债券使用全价计算市值。-->
            <!--<br>14. 均履约担保比例：期末计算股票质押回购业务:权益调整后期末标的证券市值之和/初始交易金额之和。-->
            <!--<br>15. 购回期限=购回交易日-初始交易日，按自然日计算。-->
            <!--<br>16. 质押集中度比例 = 持有待购回证券数量 / 持有待购回证券总股本。总股本：T日统计使用T日开盘总股本，开盘总股本使用T-1日清算后持仓汇总数量。-->
            <!--<h3>其他说明</h3>-->
            <!--1. 会员名称为简称-->
            <!--<br>2. 通常情况下，在T日22:00起可访问应用获得包含T日正确统计数据，忽略交收结果、融入方属性2的情况下，可在T日16:30起获得T日统计数据-->
            <!--<br>3. 只展示有权限做股票质押的会员。若有会员本月没有任何交易或其他数据，同样展示该会员数据。-->
            <!--<br>4. 排序方式为：表4按照待购回初始交易金额排序，其他表按照会员简称的拼音排序。-->
          <!--</Modal>-->
          <!--&lt;!&ndash;头部logo&ndash;&gt;-->
          <!--<p id="infoTableList" class="redtext listlength"></p>-->
          <!--&lt;!&ndash;<i-table border :columns="tableColumns1" @on-row-click="tableRowClickHandle" :data="tableData1"></i-table>&ndash;&gt;-->
          <!--&lt;!&ndash;<fastTable :width="1000" :bwidth="1000" :addWidth="0" :columns="tableColumns1" :data="tableData1"></fastTable>&ndash;&gt;-->


          <!--<el-table-->
            <!--:data="tableData1"-->
            <!--border-->
            <!--style="width: 100%">-->
            <!--<template v-for="(item,index) in tableColumns1">-->
              <!--<el-table-column v-if="item.hasAnchor"   :key="index"-->
                               <!--:prop="item.key"-->
                               <!--:label="item.title"-->
                               <!--:align="item.align"-->
                               <!--:width="item.width">-->
                <!--<template scope="scope">-->
                  <!--<a @click="anchorClick(scope)">{{scope.row.value}}</a>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column v-else  :key="index"-->
                               <!--:prop="item.key"-->
                               <!--:label="item.title"-->
                               <!--:align="item.align"-->
                               <!--:width="item.width">-->
              <!--</el-table-column>-->
            <!--</template>-->
          <!--</el-table>-->
          <!--&lt;!&ndash;<div class="exportBtn">&ndash;&gt;-->
            <!--&lt;!&ndash;<Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>&ndash;&gt;-->
              <!--&lt;!&ndash;<Icon type="ios-download-outline"></Icon>&ndash;&gt;-->
              <!--&lt;!&ndash;导出全部结果为XLSX文件&ndash;&gt;-->
            <!--&lt;!&ndash;</Button>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</Card>-->
        <!--</Col>-->
        <!--<Col :span="rightPane" class="infoRightCard">-->
        <!--<Card class="iviewCard">-->
          <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
            <!--<Row class="dateBox">-->
              <!--<Col span="12">-->
              <!--<b>开始年份</b>-->
              <!--<Form-item prop="startdate" id="startDateForm">-->
                <!--<Date-picker id="startDate" type="year" placeholder="选择开始年份"-->
                             <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--<b>结束年份</b>-->
              <!--<Form-item prop="enddate" id="endDateForm">-->
                <!--<Date-picker id="endDate" type="year" placeholder="选择结束年份" v-model="formValidate.enddate"-->
                             <!--class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--</Col>-->
            <!--</Row>-->
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
    initialDate,
    threeReqPath,
    downloadReqPath,
    initialYear,
    commonGetReqParam,
    commonHeader
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00013.js';
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
          startdate:new Date(new Date().setFullYear(initialYear())),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择开始年份', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束年份', trigger: 'change'}
          ]
        },
        t: '',
        sums: [],
      //  当前选中的下载对象
        currentDownloadObj:''
      }
    },
    mounted() {
      $(".el-table__footer-wrapper").show();
    },
    methods: {

      /**
       * 显示隐藏左右
       */
      hideRightBox: function () {
        (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
        (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
        (this.gutterValue == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
        (this.changeArrow == 'rightArrow') ? this.changeArrow = 'leftArrow' : this.changeArrow = 'rightArrow';
        $('.ivu-table-header table').css({width:'100%'})
        $('.ivu-table-body table ').css({width:'100%'})
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
          var r = /^\d{4}$/;
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始年份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束年份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy')) > new Date(new Date(Date.now()).format('yyyy'))) {
            this.$Message.error('开始年份不能大于当前年份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy')) > new Date(new Date(Date.now()).format('yyyy'))) {
            this.$Message.error('结束年份不能大于当前年份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyy') > enddateValue.format('yyyy')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('开始年份不能大于结束年份!');
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
      // 点击下载
      anchorClick:function (scope) {

        this.exportData(scope.row.key)
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        var _this = this
        this.isHide = false;
        $("#loadBox").removeClass("hide");

        var self = this
        var obj = new XMLHttpRequest();
        obj.open('GET', '/dw/gdh/gdh_month_list?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&startYear=' + this.formValidate.startdate.format('yyyy') + '&endYear=' + this.formValidate.enddate.format('yyyy') + commonGetReqParam, false);
        obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == 200) {
            const responseData = JSON.parse(obj.responseText);
            _this.isHide = true;
            console.log(responseData)
            var dataResponse = responseData.resData
            var datalength = responseData.resData.length
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.$Message.warning('查询无数据！');
              // $("#exportCurrent").attr("disabled");
            } else {
              // _this.$Message.success('查询成功!');
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
              // $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + datalength + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");

              setTimeout(function () {
                $('.ivu-table-body .ivu-table-column-left span').click(function (e) {
                  console.log(e)
                  var value = $(e.target).text()
                  _this.tableData1.forEach((item,index)=>{
                    if(value == item.value){
                       _this.currentDownloadObj = item
                      alert(item.key)
                    }
                  })

                })
              },0)
            }
          }
        };
        obj.send(null);



      },
      /**
       * 导出Excel文件
       */
      exportData(key) {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +'&yearMonth='+key

          void(window.open('/dw/gdh/gdh_00013?' + downfileParams +commonGetReqParam));
      },
      /**
       * 获取表格汇总行展示信息
       */
      // getSumLast() {
      //   var sums = []
      //   var obj = this.tableData1[this.tableData1.length - 1]
      //   for(var key in obj){
      //     var v = obj[key]
      //     sums.push(v)
      //   }
      //   console.log(sums)
      //   return sums;
      // }
    }
  }
</script>

<style scoped>
  /*.el-table__body-wrapper {*/
    /*height: auto !important;*/
  /*}*/

  /*.el-table__header-wrapper, .el-table__body-wrapper {*/
    /*overflow-y: hidden !important;*/
  /*}*/


  /*.el-table__footer-wrapper {*/
    /*overflow-y: hidden !important;*/
  /*}*/


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

  .el-table thead.is-group th {
    background-color: #29a7de;
    color: #fff;
    text-align: center;
  }

  .el-table td, .el-table th {
    padding: 3px 0;
    font-weight: 100;
  }

  .cxTop {
    margin: 90px 0 0 0;
  }

  .ivu-table th {
    background-color: #29a7de;
    color: #fff;
  }

  .el-table__body-wrapper {
    min-height: 550px;
  }*/
</style>
