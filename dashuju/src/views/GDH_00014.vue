<template>
  <section class="constWidth" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押式回购会员报送盯市报表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="起始日期">
                <Date-picker id="startDate" type="date" placeholder="选择起始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="截止日期">
                <Date-picker id="endDate" type="date" placeholder="选择截止日期" v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item id="memberName">
                <b>会员名称</b>
                <Radio-group v-model="formValidate.cxtype" class="zqradio">
                  <row>
                    <div id="zqcode">
                      <section class="warp">
                        <div class="searchIpt clearFix">
                          <input @click="showListHandle" :value="titles" v-model="titles" placeholder="请输入/选择会员名称"
                                 class="select-input"/>
                          <div class="select-down dropDown" v-show="listShow">
                            <ul class="list">
                              <li class="li-item" v-for="item in zqCodeList" @click="getTitleHandle(item.value)">{{
                                item.label }}
                              </li>
                            </ul>
                          </div>
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
    <Modal id="lookInfoPop" title="股票质押式回购会员报送盯市报表  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>
        只包含综合业务平台股票质押式回购初始交易和补充质押数据
      </p>
      <h3>二．指标说明</h3>
      <p>
        1.业务类型:初始交易或补充质押
        <br>2.初始交易日期: 初始交易申报日期；对于补充质押，对应初始交易的申报日期。
        <br>3.初始交易成交编号: 对于补充质押，对应初始交易成交编号
        <br>4.补充质押日期: 如属于补充质押则为非空，如属于初始交易则为空
        <br>5.补充质押成交编号: 如属于补充质押则为非空，如属于初始交易则为空
        <br>6.证券代码: 质押标的证券代码
        <br>7.证券简称: 质押标的证券简称
        <br>8.是否属于限售股份: 0：否；1：是
        <br>9.标的证券数量: 对于初始交易，为初始交易质押标的证券数量；对于补充质押，为补充质押标的证券数量
        <br>10.初始交易金额: 初始交易成交的金额
        <br>11.初始购回期限: 初始交易时约定的购回期限
        <br>12.初始购回日期: 初始交易时约定的购回日期
        <br>13.初始购回金额: 初始交易时约定的购回金额
        <br>14.融资利率:为初始交易时约定的融资利率
        <br>15.融出方属性: 00：自有资金；01：集合资产管理计划；02：定向资产管理计划；03：其他
        <br>16.融入方属性: 0：个人投资者；1：机构投资者
        <br>17.融入方应付金额: 根据场外分期付息等情况调整；对于当日了结的合约，展示该笔合约实际的购回金额
        <br>18.实际融资利率: 对于未了结的合约，展示该笔合约初始交易时约定的融资利率；对于当日了结的合约，展示该笔合约实际的融资利率
        <br>19.当前质押数量: 标的证券当前的质押在押数量，包括质押红股数量。从初始交易日（或补充质押日）起至T-1日（含）期间，该笔初始交易（或补充质押交易）标的证券数量与累计权益分派所获得的红股数量之和减去累计部分解除质押的标的证券数量。对于当日了结的合约，填报该笔合约实际的购回数量
        <br>20.当前质押红利金额: 从初始交易日（或补充质押日）起至T-1日（含）期间，所有权益分派所获得的红利金额之和减去累计部分解除质押的红利金额
        <br>21.盯市履约保障比例: 指单笔交易或合并管理的多笔交易的质押标的证券市值与质押红利金额之和与融入方应付金额的比值；质押标的证券涉及沪深两市的，合并计算履约保障比例
        <br>22.履约保障级别: 0：正常；1：警戒；2：触发
        <br>23.合约状态: 0：未到期；1：已到期未了结；2：当日已了结；9：违约处置中
        <br>24.了结类型: 00：未了结；01：提前购回；02：到期购回；03：延期购回；04：终止购回；09：违约处置了结
        <br>25.资金用途类型: 00：消费；01：企业经营；02：新股申购；03：定向增发；04：二级市场股票交易；05：其他
        <br>26.资金用途描述: 若资金用途类型字段选择其他，则本字段为对融入方获得资金的后续用途进行简要描述
        <br>27.质押标的价格: 为对应标的证券当日收盘价，当日无收盘价的，取最近一交易日收盘价
        <br>28.质押标的市值: 通过股票质押回购盯市报告数据文件中的当前质押数量*质押标的价格（质押标的市值=当前质押数量*质押标的价格）。<br>
      </p>
      <h3>三．其他说明</h3>
      <p>1.本应用从当天21点以后才可访问当天数据。</p>
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
          </el-table-column>
        </el-table>
      </el-col>
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


    <!--<h2 class="infoTitle">股票质押式回购会员报送盯市报表</h2>-->
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
    <!--<Modal id="lookInfoPop" title="股票质押式回购会员报送盯市报表  统计口径说明" v-model="changeInfo"-->
    <!--class-name="vertical-center-modal"-->
    <!--cancel-text>-->
    <!--<h3>数据说明</h3>-->
    <!--<p>只包含综合业务平台股票质押式回购初始交易和补充质押数据</p>-->
    <!--<h3>指标说明</h3>-->
    <!--<p>-->
    <!--1.业务类型:初始交易或补充质押-->
    <!--<br>-->
    <!--2.初始交易日期: 初始交易申报日期；对于补充质押，对应初始交易的申报日期。<br>-->
    <!--3.初始交易成交编号: 对于补充质押，对应初始交易成交编号<br>-->
    <!--4.补充质押日期: 如属于补充质押则为非空，如属于初始交易则为空<br>-->
    <!--5.补充质押成交编号: 如属于补充质押则为非空，如属于初始交易则为空<br>-->
    <!--6.证券代码: 质押标的证券代码<br>-->
    <!--7.证券简称: 质押标的证券简称<br>-->
    <!--8.是否属于限售股份: 0：否；1：是<br>-->
    <!--9.标的证券数量: 对于初始交易，为初始交易质押标的证券数量；对于补充质押，为补充质押标的证券数量<br>-->
    <!--10.初始交易金额: 初始交易成交的金额<br>-->
    <!--11.初始购回期限: 初始交易时约定的购回期限<br>-->
    <!--12.初始购回日期: 初始交易时约定的购回日期<br>-->
    <!--13.初始购回金额: 初始交易时约定的购回金额<br>-->
    <!--14.融资利率:为初始交易时约定的融资利率<br>-->
    <!--15.融出方属性: 00：自有资金；01：集合资产管理计划；02：定向资产管理计划；03：其他<br>-->
    <!--16.融入方属性: 0：个人投资者；1：机构投资者<br>-->
    <!--17.融入方应付金额: 根据场外分期付息等情况调整；对于当日了结的合约，展示该笔合约实际的购回金额<br>-->
    <!--18.实际融资利率: 对于未了结的合约，展示该笔合约初始交易时约定的融资利率；对于当日了结的合约，展示该笔合约实际的融资利率<br>-->
    <!--19.当前质押数量: 标的证券当前的质押在押数量，包括质押红股数量。从初始交易日（或补充质押日）起至T-1日（含）期间，该笔初始交易（或补充质押交易）标的证券数量与累计权益分派所获得的红股数量之和减去累计部分解除质押的标的证券数量。对于当日了结的合约，填报该笔合约实际的购回数量-->
    <!--<br>20.当前质押红利金额: 从初始交易日（或补充质押日）起至T-1日（含）期间，所有权益分派所获得的红利金额之和减去累计部分解除质押的红利金额-->
    <!--<br>21.盯市履约保障比例: 指单笔交易或合并管理的多笔交易的质押标的证券市值与质押红利金额之和与融入方应付金额的比值；质押标的证券涉及沪深两市的，合并计算履约保障比例-->
    <!--<br>22.履约保障级别: 0：正常；1：警戒；2：触发-->
    <!--<br> 23.合约状态: 0：未到期；1：已到期未了结；2：当日已了结；9：违约处置中-->
    <!--<br>24.了结类型: 00：未了结；01：提前购回；02：到期购回；03：延期购回；04：终止购回；09：违约处置了结-->
    <!--<br>25.资金用途类型: 00：消费；01：企业经营；02：新股申购；03：定向增发；04：二级市场股票交易；05：其他-->
    <!--<br>26.资金用途描述: 若资金用途类型字段选择其他，则本字段为对融入方获得资金的后续用途进行简要描述-->
    <!--<br>27.质押标的价格: 为对应标的证券当日收盘价，当日无收盘价的，取最近一交易日收盘价-->
    <!--<br>28.质押标的市值: 通过股票质押回购盯市报告数据文件中的当前质押数量*质押标的价格（质押标的市值=当前质押数量*质押标的价格）。-->
    <!--</p>-->
    <!--<h3>其他说明</h3>-->
    <!--<p>-->
    <!--本应用从当天21点以后才可访问当天数据。-->
    <!--</p>-->
    <!--</Modal>-->
    <!--&lt;!&ndash;头部logo&ndash;&gt;-->
    <!--<p id="infoTableList" class="redtext listlength"></p>-->
    <!--&lt;!&ndash;<fastTable :width="2500" :bwidth="2500" :columns="tableColumns1" :data="tableData1"></fastTable>&ndash;&gt;-->
    <!--<el-table-->
    <!--:data="tableData1"-->
    <!--border-->
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
    <!--<b>会员名称</b>-->
    <!--<Radio-group v-model="formValidate.cxtype" class="zqradio">-->
    <!--<row>-->
    <!--<div id="zqcode">-->
    <!--<section class="warp">-->
    <!--<div class="searchIpt clearFix">-->
    <!--<input @click="showListHandle" :value="titles" v-model="titles" placeholder="请输入/选择会员名称"-->
    <!--class="select-input"/>-->
    <!--<div class="select-down dropDown" v-show="listShow">-->
    <!--<ul class="list">-->
    <!--<li class="li-item" v-for="item in zqCodeList" @click="getTitleHandle(item.value)">{{-->
    <!--item.label }}-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--</section>-->
    <!--</div>-->
    <!--</row>-->
    <!--</Radio-group>-->
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
    commonGetReqParam,
    commonHeader,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00014.js';
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
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate()),
          cxtype: '输入会员名称',
          zqCode: ''
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ],
          zqCode: [
            {required: true,  message: '请输入/选择会员名称', trigger: 'change'}
          ]
        },
        //模糊查询数据
        titles: '全部',
        listShow: false,
        //表单
        zqCodeList: [],
        t: ''
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
    },
    methods: {
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate', true)
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
       * 查询功能
       */
      handleSubmit(name, isPageClick) {

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
            if(enddateValue.getTime() - startdateValue.getTime() > 182.5*24*60*60*1000){
              this.$confirm('您选择的时间范围过长，查询数据量过大的情况下可能会导致耗时很长且后台服务性能下降甚至不可使用，建议选择时间范围在半年内。' ,'提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              }).then(()=>{
                this.$Message.success('提交成功!请等待~');
                if (!isPageClick) this.returnN = 1;
                this.publicPagination(this.returnN, this.pageSize, true);
              }).catch(()=>{
              })
            }else{
              this.$Message.success('提交成功!请等待~');
              if (!isPageClick) this.returnN = 1;
              this.publicPagination(this.returnN, this.pageSize, true);
            }
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
        let thisStr = this.titles.indexOf("-");
        var thisVal = ''

        if (thisStr < 0) {
          thisVal = this.titles
        } else {
          thisVal = this.titles.slice(0, thisStr);
        }
        if (thisVal == '全部') {
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
          "businessId": "GDH_00015"
        };

        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/gdh/gdh00014';
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
            console.log(data.resData)
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
        var thisVal = ''

        if (thisStr < 0) {
          thisVal = this.titles
        } else {
          thisVal = this.titles.slice(0, thisStr);
        }
        if (thisVal == '全部') {
          thisVal = 'ALL';
        }
        var downfileParams = "row=1&type=bdsp_gdh00014&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&memCde=" + thisVal + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') +
          "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd');

        $("#exportCurrent").attr("disabled");
        setTimeout("$('#exportCurrent').removeAttr('disabled')", 5000);
        void(window.open('/dw/download/gdhexcel?' + downfileParams + commonGetReqParam));

      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'tradevol' || prop == 'inittradeamt' || prop == 'repuramt' || prop == 'payamt' || prop == 'impawnvol' || prop == 'dividendamt' || prop == 'pledgetargetprice' || prop == 'pledgetargetvalue' || prop == 'repurterm') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">
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
