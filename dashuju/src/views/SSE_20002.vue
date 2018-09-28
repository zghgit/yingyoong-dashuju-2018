<template>
  <section class="sse20001" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>指数概貌
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="开始日期" :label-width="85">
                <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期" :label-width="110">
                <Date-picker id="endDate" type="date" placeholder="选择结束日期"
                             v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              <div class="moreBtn">
                <div  @click="MoreClick">
                  <span>更多</span>
                  <i v-if="moreIf" class="el-icon-arrow-up"></i>
                  <i v-else class="el-icon-arrow-down"></i></a>
                </div>
              </div>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                <el-button
                  type="danger"
                  style="margin-left: 50px;"
                  size="mini"
                  plain
                  @click="historyCodeClick(1)">代码变更历史</el-button>
              </div>
            </div>
            <div class="exportBtnBox" v-if="moreIf" style="margin-left: -3px;">
                <Form-item  label="成交数据是否含大宗" :label-width="140">
                  <el-radio-group
                    v-model="currentReportType.trans">
                    <el-radio :label="1">含大宗</el-radio>
                    <el-radio :label="2">不含大宗</el-radio>
                  </el-radio-group>
                </Form-item>
                <Form-item label="展现默认指数还是全部指数" :label-width="185">
                  <el-radio-group v-model="currentReportType.genera" >
                    <el-radio :label="1">默认指数</el-radio>
                    <el-radio :label="2">全部指数</el-radio>
                  </el-radio-group>
                </Form-item>
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <code-change-history v-if="vueGirldLayout"></code-change-history>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="指数概貌  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <br><b>一．数据说明</b>
      <br>1. 本应用可查询时间起始范围为：1991年以来的数据
      <br>2. 本应用可查询T日数据的时点为：T日15:00后
      <br>3. 本应用限制最大查询时间区间为：无限制
      <br><b>二．	单指标算法：</b>
      <br>序号	展示字段	展示字段算法或公式
      <br>1.	收盘点位	所选日期期末的对应指数的收盘点位
      <br>2.	涨跌幅%	(期末收盘点位-期初前收盘点位)/期初前收盘点位*100%
      <br>3.	振幅%	(max(最高点位)-min(最低点位))/min(最低点位)*100%
      <br>4.	成交金额	各指数成交金额。基于用户选择来决定数据是否包括大宗成交。
      <br>5.	日均成交金额	成交金额/成交天数
      <br>6.	换手率	流通股换手率。单日换手率公式：单日换手率=成交数量/流通股本*100%；阶段换手率公式：阶段换手率=sum(单日换手率)。
      <br>7.	日均换手率	日均流通股换手率。阶段换手率/成交天数
      <br>8.	最高点位	全阶段每日最高点位的最大值，即max(最高点位)
      <br>9.	最高点位日期	全阶段最高点位出现的日期，若阶段中最高点位出现日期大于1天，则取首次出现最高点位的日期
      <br>10.	最低点位	全阶段每日最低点位的最小值，即min(最低点位)
      <br>11.	最低点位日期	全阶段最低点位出现的日期，若阶段中最低点位出现日期大于1天，则取首次出现最低点位的日期
      <br>12.	静态市盈率	总市值/净利润


    </Modal>
    <!--头部logo-->
    <div class="tabTitle">
    <el-tabs v-model="activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="沪市数据" name="first"></el-tab-pane>
      <el-tab-pane label="深市数据" name="second"></el-tab-pane>
    </el-tabs>
    </div>
      <div class="tableBox ">
      <el-col :span="24" >
        <p v-show="activeName=='first'" class="redtext listlength">{{infoTableList1}}</p>
        <p v-show="activeName=='first'" class="redtext listlength"  style="float: right;margin-right: 47px">{{dazon}}</p>
        <p v-show="activeName=='first'" class="redtext listlength"  style="float: right; margin-right: 47px;">{{danri}}</p>
        <p v-show="activeName=='first'" class="redtext listlength"  style="float: right; margin-right: 47px;">{{zhishu}}</p>
        <el-table
          :data="tableData22_1"
          border
          :cell-class-name="cellClassHandle"
          v-if="activeName == 'first'"
          style="width: 100%">
          <el-table-column :formatter="formatterNumber" width="140" prop="att"  label="明细数据超链接" align="center">
            <template scope="scope">
              <a v-for="item in list1" class="df"
                 @click="datailLinkClick1(scope.row.indx_code, item)"
              >{{ item }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            :formatter="formatterNumber"
            v-if="isshow1"
            v-for="(item,index) in tableColumns22_1"
            :key="item.field"
            :prop="item.field"
            :class-name="item.className"
            :label="item.title"
            :align="item.align"
            :width="item.width">
          </el-table-column>
          <el-table-column
            :formatter="formatterNumber"
            v-if="isshow2"
            v-for="(item,index) in tableColumns22_11"
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :align="item.align"
            :width="item.width">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <p v-show="activeName=='second'" class="redtext listlength">{{infoTableList2}}</p>
        <p v-show="activeName=='second'" class="redtext listlength" style="float: right;margin-right: 47px">{{danris}}</p>
        <p v-show="activeName=='second'" class="redtext listlength" style="float: right;margin-right: 47px">{{zhishu1}}</p>
        <el-table
          :cell-class-name="cellClassHandle1"
          :data="tableData22_2"
          border
          v-if="activeName == 'second'"
          style="width: 100%">
          <el-table-column  :formatter="formatterNumber" width="140" prop="arr"  label="明细数据超链接" align="center">
            <template scope="scope">
              <a v-for="item in list2" class="df"
                 @click="datailLinkClick1(scope.row.indx_code, item)"
              >{{ item }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            :min-width="item.width"
            :formatter="formatterNumber"
            v-if="isshow1"
            v-for="(item,index) in tableColumns22_2"
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :align="item.align"
            :width="item.width">
          </el-table-column>
          <el-table-column
            :min-width="item.width"
            :formatter="formatterNumber"
            v-if="isshow2"
            v-for="(item,index) in tableColumns22_22"
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :align="item.align"
            :width="item.width">
          </el-table-column>
        </el-table>
      </el-col>
      <!--<div class="pageModule">-->
        <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
              <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
      <!--</div>-->
        <div v-if="activeName=='first'" class="pageModule">
          <Page :total="returnTotal" :current="returnN"
                :page-size="500" :page-size-opts=[500,1000]
                placement="top" show-sizer
                @on-page-size-change="tableChangeSize"
                @on-change="tableChange"></Page>
        </div>
        <div  v-if="activeName=='second'" class="pageModule">
          <Page :total="returnTota2" :current="returnN2"
                :page-size="500" :page-size-opts=[500,1000]
                placement="top" show-sizer
                @on-page-size-change="tableChangeSize2"
                @on-change="tableChange2"></Page>
        </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData" disabled>
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
    commonHeader,
    initialMonth,
    commonGetReqParam,
    dateReg,
    jump2NewPage,
    formatterNumber,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns22_1, tableColumns22_2, tableColumns22_11,tableColumns22_22,dayTableColumns1, dayTableColumns2,dayTableColumns3} from '../assets/js/SSE_20002.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';

  import CodeChangeHistory from '../components/codeChangeHistory';
  export default {
    name: "SSE_20002",
    props: [],
    components: {
      CodeChangeHistory
    },
    data() {
      return {
        // SSE_20002_day
        // SSE_20002_month
        // SSE_20002_year
        collapse: '1',
        queryResLoadMain:false,
        //显示隐藏输入条件
        changeArrow: 'rightArrow',
        gutterValue: 16,
        leftPane: 19,
        rightPane: 5,
        isHide: true,
        dialogFormVisble1: false,
        dialogFormVisble2: false,
        dialogFormVisble3: false,
        //统计口径
        changeInfo: false,
        isshow1:true,
        isshow2:false,
        //初始化表格信息
        tableColumns22_1: tableColumns22_1,
        tableColumns22_2: tableColumns22_2,
        tableColumns22_11:tableColumns22_11,
        tableColumns22_22:tableColumns22_22,
        tableData22_1: [],
        tableData22_2: [],
        dazon:"",
        danri:"",
        danris:"",
        zhishu:"",
        zhishu1:"",
        titleData1:'沪市数据',
        titleData2:'沪市数据',
        titleData3:'沪市数据',
        indxCode:'',
        indxCode2:'',
        indxCode3:'',

        list1: ['日','月','年'],
        list2: ['日','月','年'],


        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,

        //分页信息
        returnTota2: 0,
        returnN2: 1,
        dataArrayAll2: [],
        pageSize2: 500,

        infoTableList1:'',
        infoTableList2:'',
        quStartdate:'',
        quEnddate:'',
        quTrans:'',
        quGenera:'',
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        // TData:new Date(),
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
        vueGirldLayout:false,
        //  tab页
        activeName:'first',

        currentReportType:{
          trans:1,
          genera:1,
        },

        //  显示更多
        moreIf:false,
        tableRedIndexArr:[],
        gFlagDataArr:[],

        startdateData:'',
        enddateData:'',
        flagDz:'',
        flagIndxCloseDtlDay:'',
        flagIndxCloseDtlDaySz:'',
        flagEvery:'',
        flagEverySz:'',
      }
    },
    beforeUpdate() {
      // this.enddateChange();

    },
    mounted() {
      $(window).on('keydown',function(e){
        if(e.keyCode == 13){
          e.preventDefault()
        }
      })
    },
    watch: {

    },
    methods: {
      // 代码变更历史按钮
      historyCodeClick:function (val) {
        if(val){
          this.vueGirldLayout = !this.vueGirldLayout;
        }
      },
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'indx_code' || prop == 'h_date'|| prop == 'l_date' || prop == 'trade_month_year' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      // 更多条件收缩
      MoreClick:function () {
        if(this.moreIf){
          this.moreIf = false
        }else {
          this.moreIf =true;
        }
      },
      // 如果选择含大宗时查询“最新一日大宗数据还未入库，则最新一日的成交指标不含大宗”
      _gFlagData: function () {
        const urlFlag = '/dw/mktdt/sse20002flag';
        this.searchParams={
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
        }
        fetch(urlFlag, {
          method: "POST",
          // body: JSON.stringify({"endDate": this.formValidate.enddate.format('yyyy-MM-dd')}),
          body: JSON.stringify(this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          if (data) {
            this.gFlagDataArr = data.resData.result[0].data;
            data.resData.result[0].data.forEach((el) => {
              // enddate:"2018-06-08"
              // flag_dz:"N"
              // flag_index_everydate:"N"
              // flag_index_everydate_sz:"N"   //
              // flag_indx_close_dtl_day:"N"
              // flag_indx_close_dtl_day_sz:"N"
              // startdate:"2018-06-05"
              this.startdateData = el.startdate;
              this.enddateData = el.enddate;
              let InputFlagDZ = this.currentReportType.trans === 1 ? 'Y_DZ' : 'N_DZ';
              this.flagDz = el.flag_dz;
              this.flagIndxCloseDtlDay = el.flag_indx_close_dtl_day;
              this.flagIndxCloseDtlDaySz = el.flag_indx_close_dtl_day_sz;
              this.flagEvery = el.flag_index_everydate;
              this.flagEverySz = el.flag_index_everydate_sz;


              if (this.flagEvery === 'N') {
                // 沪市  FLAG_INDEX_EVERYDATE='N' “YYYYMMDD上海市盈率数据尚未入库
                // this.dazon =TData  + ' 最新一日大宗数据还未入库，则最新一日的成交指标不含大宗';
                this.dazon = this.enddateData + ' 上海市盈率数据尚未入库';
              } else {
                this.dazon = ''
              }
              if (InputFlagDZ === 'Y_DZ' && this.flagIndxCloseDtlDay === 'N' && this.flagDz === 'N') {
                // 沪市
                //     :Input_Flag_DZ = 'Y_DZ' AND FLAG_Indx_Close_Dtl_Day = 'N' AND FLAG_DZ = 'N'
                // “YYYYMMDD上海大宗成交数据尚未入库”
                // this.danri = TData +' 上海大宗成交数据尚未入住';
                this.danri = this.enddateData + ' 上海大宗成交数据尚未入库';

              } else {
                this.danri = ''
              }
              if ( this.flagIndxCloseDtlDay==="N"){

                this.zhishu = this.enddateData + '上海指数收盘明细表中数据未入库';
              }else {
                this.zhishu = ''
              }
              if (this.flagEverySz === 'N') {
                // 深市     //   FLAG_INDEX_EVERYDATE_SZ='N'  展示“YYYYMMDD深圳市盈率数据尚未入库”
                // this.dazons = TData +'  上海市盈率数据尚未入库';
                this.zhishu1 = this.enddateData + '  深圳市盈率数据尚未入库';
              } else {
                this.zhishu1 = ''
              }
              if(this.flagIndxCloseDtlDaySz==="N"){
                this.danris = this.enddateData + '深圳指数收盘明细表中数据未入库';
              }else {
                this.danris = ''
              }
            })
          }
        })
      },

      // 跳转 -- 明细数据超链接
      fnDatailLink1:function (code, scopes) {
        // this.activeName
        let objData = [
          {"startDate":this.startdateData},
          {"endDate":this.enddateData},
          {"isIncludeBulk":this.currentReportType.trans === 1 ? 'Y_DZ' : 'N_DZ'},

          {"flagDayS":this.flagIndxCloseDtlDaySz},         // T日 深圳每日指数收盘明细表 入库标志
          {"flagEveryS":this.flagEverySz},          // T日 深圳指数统计(天) 入库标志
          {"flagDay":this.flagIndxCloseDtlDay},         // 沪市每日指数收盘明细表 入库标志
          {"flagEvery":this.flagEvery},          // T日 上海指数统计(天) 入库标志
          {"secCode":code},          //  指数代码
          {"title":scopes},          //  日
          {"activeName":this.activeName},          //  指数代码
        ];
        if(scopes === '日'){
          jump2NewPage('SSE_20002_day', {
            data:JSON.stringify(objData),
            title:'日超链接明细表'
          });
        }else if(scopes === '月'){
          jump2NewPage('SSE_20002_month', {
            data:JSON.stringify(objData),
            title:'月超链接明细表'
          });
        }else if(scopes === '年'){
          jump2NewPage('SSE_20002_year', {
            data:JSON.stringify(objData),
            title:'年超链接明细表'
          });
        }
      },
      // 沪市
      datailLinkClick1:function (row,int) {
        this.fnDatailLink1(row, int);
      },


      // 表格字段
      tabHandleClick: function (tab, ev) {
        this.activeName === 'first' ? this.titleData1 = '沪市数据' : this.titleData1 = '深市数据';
        this.activeName === 'first' ? this.titleData2 = '沪市数据' : this.titleData2 = '深市数据';
        this.activeName === 'first' ? this.titleData3 = '沪市数据' : this.titleData3 = '深市数据';
      },
      /**
       * 显示当前页 沪市数据
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate',true, this.returnN, this.pageSize)
      },
      /**
       * 表格显示行数选择   沪市数据
       */
      tableChangeSize: function (pageSize) {
        this.returnN = 1;
        this.pageSize = pageSize;
        this.handleSubmit('formValidate',true , this.returnN, this.pageSize)
      },



      /**
       * 显示当前页 深市数据
       */
      tableChange2: function (page) {
        this.returnN2 = page;
        this.handleSubmit('formValidate',true, this.returnN2, this.pageSize2)
      },
      /**
       * 表格显示行数选择 深市数据
       */
      tableChangeSize2: function (pageSize) {
        this.returnN2 = 1;
        this.pageSize2 = pageSize;
        this.handleSubmit('formValidate',true, this.returnN2, this.pageSize2)
      },
      /**
       * 显示隐藏左右
       */
      hideRightBox: function () {
        (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
        (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
        (this.gutterValue == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
        (this.changeArrow == 'rightArrow') ? this.changeArrow = 'leftArrow' : this.changeArrow = 'rightArrow';

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
      handleSubmit(name,isPageClick,returnNumS,pageSizeS) {

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
            var f = ''
            f = this.activeName == 'first' ? 1 : 2
            if (!isPageClick) {
              this.returnN = 1;
              f = 0
            }
            this.publicPagination(returnNumS, pageSizeS,true, f);
            // this.publicPagination(returnNumS, pageSizeS, true， );
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        // 没一次查询时先清空下载数据
        this.infoTableList1 = '';
        this.infoTableList2 = '';
        document.getElementById("exportCurrent").setAttribute("disabled", true);
        // 选择含大宗时提示
        this._gFlagData();
        //查询传送的参数
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quEnddate = this.formValidate.enddate.format('yyyy-MM-dd');
        this.quTrans = this.currentReportType.trans === 1 ? 'Y_DZ' : 'N_DZ';
        this.quGenera = this.currentReportType.genera === 1 ? 'COMMON' : 'ALL';

        this.searchParams = {
          "startDate": this.quStartdate,       // 开始时间
          "endDate": this.quEnddate,         // 结束时间
          "isIncludeBulk": this.quTrans,   // 是否包含大宗
          "isDefaultIndex": this.quGenera, // 展现默认指数还是全部指数
          "changeTable": 0,
          "pageSize": rows,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "businessId": "SSE_20002",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/sse20002';
        // const url = '/45/mktdt/sse20002';
        this.tableData22_1 = [];
        this.tableData22_2 = [];
        this.dealitems = 0;
        let _this = this;
        _this.returnTotal = 0;
        _this.returnTota2 = 0;
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

          // 开始时间和结束时间一样时不展示日均指标、不展现最高点位日和最低点 表格切换显示字段
          if(data.message == 1){
            this.isshow1 = false;
            this.isshow2 = true;
            this.tableColumns22_11 = tableColumns22_11;
            this.tableColumns22_22 = tableColumns22_22;
          } else {
            this.isshow1 = true;
            this.isshow2 = false;
            this.tableColumns22_1 = tableColumns22_1;
            this.tableColumns22_2 = tableColumns22_2;
          }

          this.isHide = true;
          //取数据
          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            // this.$Message.warning("查询出错" + dataError);
            this.$alert("错误" + dataError,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            this.tableData22_1 = [];
            this.tableData22_2 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            let dataResponse1 = data.resData[0].resData.data;
            let dataResponse2 = data.resData[1].resData.data;
            let datalength1 = data.resData[0].resData.totalCount;
            let datalength2 = data.resData[1].resData.totalCount;
            if (dataResponse1.length == 0 && dataResponse2.length == 0) {
              $("#loadBox").addClass("hide");
              this.tableData22_1 = [];
              this.tableData22_2 = [];
              this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              this.dealitems1 = datalength1;
              this.dealitems2 = datalength2;
              // if (this.activeName == this.first) {
              //   _this.returnTotal = datalength1;
              // } else if (this.activeName == this.second) {
              //   _this.returnTota2 = datalength2;
              // }
              _this.returnTotal = datalength1;
              _this.returnTota2 = datalength2;
              this.tableData22_1 = dataResponse1;
              this.tableData22_2 = dataResponse2;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              this.infoTableList1 = "查询结果共 " + this.dealitems1 + " 条记录";
              this.infoTableList2 = "查询结果共 " + this.dealitems2 + " 条记录";
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },
      // 单元格className回调
      cellClassHandle: function ({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 3 || columnIndex == 4) {
          if (parseFloat(row.updown_breadth) < 0) {
            return 'greens'
          } else if (parseFloat(row.updown_breadth) > 0) {
            return 'fontRed'
          } else {
            return ''
          }
        }
      },
      cellClassHandle1: function ({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 3 || columnIndex == 4) {
          if (parseFloat(row.updown_breadth) < 0) {
            return 'greens'
          } else if (parseFloat(row.updown_breadth) > 0) {
            return 'fontRed'
          } else {
            return ''
          }
        }
      },

      /**
       * 导出Excel文件
       */
      exportData() {
        //查询传送的参数
        let downfileParams = "userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&flagDayS="+ this.flagIndxCloseDtlDaySz+
          "&flagEveryS="+ this.flagEverySz +
          "&flagDay="+ this.flagIndxCloseDtlDay +
          "&flagEvery="+ this.flagEvery+
          "&startDate=" + this.quStartdate +
          "&endDate=" +this.quEnddate +
          "&isIncludeBulk=" + this.quTrans +
          "&isDefaultIndex=" + this.quGenera;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        let dp = '/dw/mktdt/sse20002export?';
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style>
  .fontRed{
    color:red;
  }
  .greens{
    color: green;
  }

  .sse20001 .ivu-collapse-content{
    overflow: inherit !important;
  }
  .el-table__footer-wrapper{
    display: block !important;
  }
  .el-dialog__wrapper .el-dialog__body{
    padding: 0 20px 70px 20px !important;
  }
  /*.sse20001 .el-table__body-wrapper {*/
    /*height: 470px;*/
  /*}*/
</style>
<style lang="less" scoped>

  #lookInfoLink{
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }
  .exportBtnBox{
    display: flex;
    text-align: left;
    align-items: center;
    margin-left: 10px;
  }

  .ivu-select-item{
    text-align: left;
  }

  #lookInfoLink{
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }
  .exportBtnBox{
    display: flex;
    text-align: left;
    align-items: center;
    margin-left: 10px;
  }
  .moreBtn{
    color: #2db7f5;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 36px;
    margin-top: -3px;
  }
  .ivu-select-item{
    text-align: left;
  }
</style>
