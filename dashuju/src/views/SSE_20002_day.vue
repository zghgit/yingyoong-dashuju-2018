<template>
    <div class="sse20002day">
      <!--沪市 日超链接明细表-->
      <h1>{{title}}</h1>
      <p class="redtext listlength">{{titleTotalCount1}}</p>
      <el-table
        :data="dayTableData1"
        border
        :cell-class-name="cellClassHandle_A"
        v-loading="queryResLoadMain"
        element-loading-spinner="el-icon-loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-background="rgba(0,0,0,0.3)"
        style="width: 100%;">
        <el-table-column
          :min-width="item.width"
          :formatter="formatterNumber"
          v-for="(item,index) in dayTableColumns1"
          :key="item.field"
          :prop="item.field"
          :label="item.title"
          :align="item.align"
          :width="item.width">
        </el-table-column>
      </el-table>
      <el-col :span="24" style="margin-top: 20px">
        <div class="pageModules" style="float: right;">
          <Page :total="returnTotal1"
                :current="returnN1" :page-size="500"
                :page-size-opts=[500,1000] placement="top"
                show-sizer @on-page-size-change="tableChangeSize1"
                @on-change="tableChange1"></Page>
        </div>
        <Button id="exportCurrent"
                type="primary" size="large"
                @click="exportData1" disabled>
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </el-col>
    </div>
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

  import {dayTableColumns1} from '../assets/js/SSE_20002.js';

  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
    export default {
        name: "sse20002day",
        props: [],
        components: {},
      data() {
        return {
          title: '',
          queryResLoadMain:false,   // 数据加载中，请耐心等待
          isDisab:true,
          dealitems:10,
          objData:[],
          dayTableData1:[],
          dayTableColumns1: dayTableColumns1,
          titleTotalCount1:'',
          //分页信息
          returnTotal1: 0,
          returnN1: 1,
          dataArrayAll1: [],
          pageSize1: 500,
        }
      },
      methods:{
        // 列：格式化字符
        formatterNumber:function (row,col,cellValue) {
          var prop = col.property
          if(prop == 'indx_code' || prop == 'h_date'|| prop == 'l_date' || prop == 'trade_month_year' ){
            return cellValue
          }
          return formatTbousandth(cellValue)
        },
        /**
         * 显示当前页
         */
        tableChange1: function (page) {
          this.queryResLoadMain = true;    // 数据加载中，请耐心等待
          this.titleTotalCount1 = '';      // 清空总条数
          // 没一次查询时先清空下载数据
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.dayTableData1 = [];
          this.dealitems = 0;      // 总条数
          this.returnTotal = 0;   // 分页
          this.returnN1 = page;
          this.fnSundata()
        },
        /**
         * 表格显示行数选择
         */
        tableChangeSize1: function (pageSize) {
          this.queryResLoadMain = true;    // 数据加载中，请耐心等待
          this.titleTotalCount1 = '';       // 清空总条数
          // 没一次查询时先清空下载数据
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.dayTableData1 = [];
          this.dealitems = 0;      // 总条数
          this.returnTotal = 0;   // 分页
          this.pageSize1 = pageSize;    // 500  -- 1000
          this.fnSundata();
        },
        cellClassHandle_A: function ({row, column, rowIndex, columnIndex}) {
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
        // 查詢
        fnSundata:function (a,b,c,f1,f2,f3,f4,cd) {
          this.queryResLoadMain = true;    // 数据加载中，请耐心等待
          this.titleTotalCount1 = '';       // 清空总条数
          // 没一次查询时先清空下载数据
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.dayTableData1 = [];
          this.dealitems = 0;      // 总条数
          this.returnTotal = 0;   // 分页
          let searchParams = {
            "startDate":this.objData[0].startDate,            // 开始时间
            "endDate": this.objData[1].endDate,               // 结束时间
            "isIncludeBulk": this.objData[2].isIncludeBulk, // 成交数据是否含大宗

            "flagDayS": this.objData[3].flagDayS,             // T日 深圳每日指数收盘明细表 入库标志
            "flagEveryS": this.objData[4].flagEveryS,         // T日 深圳指数统计(天) 入库标志
            "flagDay": this.objData[5].flagDay,                  // 沪市每日指数收盘明细表 入库标志
            "flagEvery": this.objData[6].flagEvery,           // T日 上海指数统计(天) 入库标志

            "secCode": this.objData[7].secCode,                // 指数代码
            "pageSize": this.pageSize1,
            "pageNo": this.returnN1,
            "userId": srcUseridA,
            "userName": srcUsernameA,

          };
          const url = '/dw/mktdt/sse20002day';
          fetch(url, {
            method: "POST",
            body: JSON.stringify(searchParams),
            mode: 'cors',
            headers: commonHeader
          }).then(function (response) {
            return response.json()
          }, function (error) {
            $("#loadBox").addClass("hide");
            this.$Message.error('系统繁忙，刷新页面!');
          }).then(data => {
            this.queryResLoadMain = false;
            if(data){
              var rtnStatic = data.success;
              var dataError = data.message;
              if (rtnStatic == false) {
                $("#loadBox").addClass("hide");
                // this.$Message.warning("查询出错" + dataError);
                this.$alert("错误" + dataError,'错误',{
                  confirmButtonText:'确定',
                  type:'error'
                })
                this.dayTableData1 = [];
                this.dealitems = 0;
                $("#exportCurrent").attr("disabled");
              } else {
                $("#exportCurrent").removeAttr("disabled");
                //隐藏加载中
                $("#loadBox").addClass("hide");
                if (this.objData[9].activeName === 'first') {
                  // 日 沪市数据
                  this.returnTotal1 = data.resData[0].resData.totalCount;
                  this.dayTableData1 = data.resData[0].resData.data;
                  this.titleTotalCount1 = "查询结果共 " + data.resData[0].resData.totalCount + " 条记录";
                } else {
                  // 日 深市数据
                  this.returnTotal1 = data.resData[1].resData.totalCount;
                  this.dayTableData1 = data.resData[1].resData.data;
                  this.titleTotalCount1 = "查询结果共 " + data.resData[1].resData.totalCount + " 条记录";
                }
              }
            }
          })
        },
        // 日
        exportData1: function () {
          let dp = this.objData[9].activeName === 'first' ? '/dw/mktdt/sse20002dayexportsh?' : '/dw/mktdt/sse20002dayexportsz?';
          let downfileParams = "userId=" + srcUseridA +
            "&userName=" + srcUsernameA +
            "&signature=" + signatureA +
            "&Authorization=" + AuthorizationA +
            "&startDate=" + this.objData[0].startDate +
            "&endDate=" +this.objData[1].endDate +
            "&isIncludeBulk=" + this.objData[2].isIncludeBulk +
            "&flagDayS="+ this.objData[3].flagDayS +
            "&flagEveryS="+ this.objData[4].flagEveryS +
            "&flagDay="+ this.objData[5].flagDay +
            "&flagEvery="+ this.objData[6].flagEvery +
            "&secCode=" + this.objData[7].secCode;
          void(window.open(dp + downfileParams + commonGetReqParam));
        },
      },
      watch: {},
      mounted() {

        let dataObj = JSON.parse(sessionStorage.getItem('data'))
        this.objData = JSON.parse(dataObj.data);
        this.title = dataObj.title;
        this.fnSundata();
      },
    }
</script>

<style lang="less">
    .sse20002day {
      padding: 30px;
    }
    .fontRed{
      color:red;
    }
    .greens{
      color: green;
    }
</style>
