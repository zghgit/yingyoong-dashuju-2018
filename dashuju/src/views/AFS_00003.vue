<template>
  <section class="bnd15001" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>证监会行业资金流向
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}
            <i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="flexBox">
              <Form-item prop="startdate"
                         id="startDateForm"
                         label="开始日期">
                <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期">
                <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
                             class="datePickerWidth"></Date-picker>
              </Form-item>
              <div class="moreBtn">
                <!--<div  @click="isShowMore = !isShowMore">-->
                <div  @click="MoreClick">
                  <span>更多</span>
                   <i v-if="moreIf" class="el-icon-arrow-up"></i>
                  <i v-else class="el-icon-arrow-down"></i></a>
                </div>
              </div>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
              </div>
              <p @click="echartsClick" style="float: right;position: absolute; right: 45px;">
                <a style="font-weight: normal;font-size: 13px; color: #3D83B5;">{{echartsIfval}}
                  <i v-if="echartsIf" class="el-icon-arrow-up"></i>
                  <i v-else class="el-icon-arrow-down"></i></a>
              </p>
            </div>
            <div class="exportBtnBox"
                 v-if="moreIf"
                 style="margin-left: -3px;">
            <el-col :span="6">
              <Form-item  label="汇总方式">
                <Select
                  @on-change="selectMemCodeHandle"
                  v-model="currentReportType.trans">
                  <Option v-for="(item,index) in transList"
                          :value="item.key" :key="item.key"
                          :label="item.value"></Option>
                </Select>
              </Form-item>
            </el-col>
              <el-col :span="6">
                <Form-item label="行业大类">
                  <Select v-model="currentReportType.genera"
                          @on-change="minorDefectsChage" >
                    <Option v-for="(item,index) in generaList"
                            :value="item.industrycategory"
                            :key="item.industrycategory"
                            :label="item.code_name"></Option>
                  </Select>
                </Form-item>
              </el-col>
             <el-col :span="6">
               <Form-item id="memCode" label="行业中类">
               <Select v-model="currentReportType.minorDefects">
                 <Option
                   v-for="(item,index) in minorDefectsList"
                   :value="item.midindustrycategory"
                   :key="item.midindustrycategory"
                   :label="item.major_grop_name"></Option>
               </Select>
             </Form-item>
             </el-col>
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="证监会行业资金流向  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"
           cancel-text>
      <br><b>一．数据说明</b>
      <br>数据时间范围：目前为2011年以来的数据。
      <br>证券选择范围：所有沪市A股
      <br>交易平台：竞价平台
      <br><b>二．指标说明</b>
      <br>1．日资金流入量：SUM(Pi * 成交量)只在Pi大于Pi-1情况时计算值，其他时为0；
      <br>2．日资金流出量：SUM(Pi * 成交量)只在Pi小于Pi-1情况时计算值，其他时为0；
      <br>3．日资金净流量：日资金流入量 — 日资金流出量；
      <br><b>三．其他说明</b>
      <br>1．Pi是第i笔的成交价格，Pi-1是第i笔之前第（i-1）笔的成交价格。若是首笔成交，则前一笔价取昨收盘价；
      <br> 2．新交易数据根据成交标识判断是否集合竞价，并将集合竞价期间的所有成交整体上作为一笔成交看待；
      <br>3．按日汇总时，资金指标的单位：万元；
      <br>4．按周或月汇总时，资金指标的单位：亿元；


    </Modal>
    <afs00003-echarts :echartsData="echartsData" :echartsNum="echartsNum" v-if="echartsIf"></afs00003-echarts >
    <div class="sd" v-if="echartsIf">资金净流入单位（{{wan}}元）</div>
    <div class="sd1" v-if="echartsIf">行业大类</div>
    <div class="sd1" v-if="echartsIf" style="margin-top: 5px;"><span style="border: 1px solid;padding: 4px;">资金净流入</span></div>
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableDataAFS03"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <template v-for="(item,index) in tableColumns_AFS03">
          <el-table-column
            :key="item.field"
            :prop="item.field"
            :label="item.title"
            :align="item.align == null ? 'center' : item.align"
            :formatter="fn_formatter"
            :min-width="item.width"
            :width="item.width">
          </el-table-column>
        </template>
      </el-table>
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
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns_AFS03} from '../assets/js/AFS_00003';
  import '../theme/threeCommon.less';
  import Afs00003Echarts from '../views/AFS_00003Echarts'

  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
    name: "afs00003_echarts",
    props: [],
    components: {
      Afs00003Echarts
    },
    data() {
      return {
        collapse:'1',
        //显示隐藏输入条件
        changeArrow: 'rightArrow',
        gutterValue: 16,
        leftPane: 19,
        rightPane: 5,
        isHide: true,
        wan:'万',
        //统计口径
        changeInfo: false,
        //初始化表格信息
        tableColumns_AFS03: tableColumns_AFS03,
        tableDataAFS03: [],
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
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
        transList: [
          {value: '日', key: 1},
          {value: '周', key: 2},
          {value: '月', key: 3},
        ],
        generaList: [
          {code_name: '所有', industrycategory: 'ALL'},
        ],
        minorDefectsList: [
          {major_grop_name: '所有',
            midindustrycategory: 'ALL'},
        ],
        currentReportType:{
          trans:1,
          genera:'ALL',
          minorDefects:'ALL',
        },
        quStartdate:'',
        quEnddate:'',
        quTrans:'',
        quGenera:'',
        quMinor:'',

        //  子表格
        anchorTableModel: false,
        //  显示更多
        moreIf:false,
        industry:"ALL",
        echartsData:[],
        echartsNum:[],
        echartsIf:false,
        echartsIfs:false,
        echartsIfval:'展开'
      }
    },
    mounted() {
      this.generaListData();
      this.minorDefectsData();
    },
    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        var prop = col.property
        // if( prop == 'stock_amt'|| prop == 'fund_input'|| prop == 'funt_output'|| prop == 'fund_net_input'|| prop == 'market_value'){
        //     return cellValue
        // }
        return formatTbousandth(cellValue)
      },
      // 柱狀圖展開收縮
      echartsClick:function () {
        if(this.echartsIf){
          this.echartsIfval = '展开'
          this.echartsIf = false;
        }else {
          this.echartsIf = true;
          this.echartsIfval = '收起'
        }
      },
      // 更多条件收缩
      MoreClick:function () {
        if(this.moreIf){
          this.moreIf = false
        }else {
          this.moreIf =true;
        }
      },
      // 行业大类
      generaListData(){
        let _this = this;
        const url = '/dw/afs/induname';
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            "industryCategory": "ALL",
            "userId": srcUseridA,
            "userName": srcUsernameA
        }),
          mode: 'cors',
          headers: commonHeader
        }).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          this.generaList = data.resData.result[0].data;
          const All = {
            industrycategory: 'ALL',
            code_name: '所有'
          };
          this.generaList.unshift(All);
        })
      },
      // 行业中类

      minorDefectsData(){
        let _this = this;
        const url = '/dw/afs/indumidname';
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            "industryCategory": this.industry,
            "userId": srcUseridA,
            "userName": srcUsernameA
          }),
          mode: 'cors',
          headers: commonHeader
        }).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          this.minorDefectsList = data.resData.result[0].data;
          const All = {
            midindustrycategory: 'ALL',
            major_grop_name: '所有'
          };
          this.minorDefectsList.unshift(All);
        })
      },
      minorDefectsChage(val){
        this.industry = val;
        this.currentReportType.minorDefects = this.minorDefectsList[0].midindustrycategory;
        this.minorDefectsData();
      },
      // 汇总方式
      selectMemCodeHandle(val){
        if(val === 1){
          this.wan = '万'
        }else {
          this.wan = '亿'
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

      },
      /**
       *
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
          var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
            if(!isPageClick){
              this.returnN = 1;
              f = 0
            }
            this.publicPagination(this.returnN, this.pageSize, f);
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {document.getElementById("exportCurrent").setAttribute("disabled",true);
        this.echartsData=[];
        this.echartsNum=[];
        document.getElementById("exportCurrent").setAttribute("disabled",true);
      //查询传送的参数
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quEnddate = this.formValidate.enddate.format('yyyy-MM-dd');
        this.quTrans = this.currentReportType.trans;
        this.quGenera = this.currentReportType.genera;
        this.quMinor = this.currentReportType.minorDefects;

        this.searchParams = {
          "startDate": this.quStartdate,
          "endDate": this.quEnddate,
            "sumType":this.quTrans,
            "industryCategory":this.quGenera,
            "midIndustryCategory":this.quMinor,

          "pageSize": rows,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "businessId": "AFS_00003",

        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/afs/afs00003';    //  dw/afs/afs00003
        this.tableDataAFS03 = [];
        this.dealitems = 0;
        let _this = this;
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
            _this.tableDataAFS03 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
            this.echartsIf = false;
          } else {
            this.echartsIf = true;
            var dataResponse = data.resData[0].resData.data;
            var dataResponse1 = data.resData[1].resData.result[0].data;

            var datalength = data.resData[0].resData.totalCount;
            dataResponse1.forEach((el) => {
              this.echartsData.push(el.plate_name);
              this.echartsNum.push(el.fund_net_input);
            })
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableDataAFS03 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.returnTotal = datalength;
              _this.tableDataAFS03 = dataResponse;
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
      exportData() {
        var downfileParams = "userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&startDate=" + this.quStartdate+
          "&endDate="+ this.quEnddate +
          "&sumType="+this.quTrans+
          "&industryCategory="+this.quGenera +
          "&midIndustryCategory="+this.quMinor;
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/afs/afs00003export?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>

<style>
  .bnd15001 .ivu-collapse-content{
    overflow: inherit !important;
  }
  .sd{
    position: relative;
    left: 50px;
    top: -270px;
    writing-mode: vertical-lr;
    color: rgba(6, 90, 86, 0.78);
  }
  .sd1{
    color: rgba(6, 90, 86, 0.78);
    position: relative;
    top: -100px;
    text-align: center;
  }

</style>
<style lang="less" scoped>

  .tableBox{
    padding: 30px 30px;
  }
  .flexBox{
    display: flex;
    flex-wrap: wrap;
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

  .ivu-select-item{
    text-align: left;
  }
</style>
