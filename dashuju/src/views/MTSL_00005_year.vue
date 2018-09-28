<template>
    <div class="mtsl00005Detail">
      <!--年超链接明细表-->
      <h1>{{title}}</h1>
      <p id="infoTableList" class="redtext listlength" style="width: 100%;"></p>
      <el-checkbox-group v-model="checkedTypes"
                         @change="handleChangeTypesChange">
        <el-checkbox v-for="(city,index) in types"
                     :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <el-table
        :data="recieveData"
        border
        v-loading="queryResLoadMain"
        element-loading-spinner="el-icon-loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-background="rgba(0,0,0,0.3)"
        style
          ="width: 100%">
        <template v-for="(item,index) in MTSL_l00005_month">
          <el-table-column  :formatter="formatterNumber" :key="item.field"
                           :prop="item.field"
                            :min-width="item.width"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
          </el-table-column>
        </template>
      </el-table>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()"  >
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
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
  import {MTSL_l00005_month} from '../assets/js/MTSL_00005.js';
   import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
    export default {
        name: "mtsl00005Detail",
        props: [],
        components: {},
        data() {
            return {
              title: '',
              recieveData: [],
              queryResLoadMain:false,   // 数据加载中，请耐心等待
              dealitems:'',
              objData:[],
              MTSL_l00005_month: MTSL_l00005_month,
              //分页信息
              returnTotal: 0,
              returnN: 1,
              dataArrayAll: [],
              pageSize: 500,
              //  复选框
              types: ['展现占比指标', '展现日均指标', '展现环比指标'],
              checkedTypes: [],
              flagType:[],

            }
        },
      methods:{
        // 列：格式化字符
        formatterNumber:function (row,col,cellValue) {
          var prop = col.property
          if(prop == 'sec_code' || prop == 'trade_date' ){
            return cellValue
          }
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
          this.handleSubmit('formValidate')
        },
        //表格连接点击
        anchorClick:function (scope) {

        },
        // 复选按钮 勾选时
        handleChangeTypesChange:function (val) {
          this.flagType = []
          this.MTSL_l00005_month =[MTSL_l00005_month[0],MTSL_l00005_month[1],MTSL_l00005_month[2],MTSL_l00005_month[6],MTSL_l00005_month[10],MTSL_l00005_month[14]];
          this.types.forEach((type,index)=>{
            val.forEach((t,ind)=>{
              if(t == type){
                var s = 'A'
                if(index == 1){
                  s=  'B'
                }
                if(index==2){
                  s = 'C'
                }
                this.flagType.push(s)
                MTSL_l00005_month.forEach((o,inde)=>{
                  if(o.flag == (index+1)){
                    this.MTSL_l00005_month.push(o)
                  }
                })
              }
            })
          })
          //  排序
          this.MTSL_l00005_month.sort((o1,o2)=>{
            return o1.aIndex < o2.aIndex ? -1 : 1
          })
        },
        fnSundata:function () {
          this.queryResLoadMain = true;    // 数据加载中，请耐心等待
          $("#infoTableList").html();       // 清空总条数
          // 没一次查询时先清空下载数据
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.recieveData = [];
          this.dealitems = 0;      // 总条数
          this.returnTotal = 0;   // 分页
          let searchParams = {
            "startDate":this.objData[0].startDate,       // 开始时间
            "endDate": this.objData[1].endDate,         // 结束时间
            "secType": this.objData[2].secType,       // 证券品种
            "flagDayMonYear":"y"
          };
          const url = '/dw/mtsl/mtsl00005my';
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
                this.recieveData = [];
                this.dealitems = 0;
                $("#exportCurrent").attr("disabled");
              } else {
                let dataResponse1 =  data.resData.data;
                let datalength1 = data.resData.totalCount;
                if (dataResponse1.length == 0) {
                  $("#loadBox").addClass("hide");
                  this.recieveData = [];
                  this.dealitems = 0;
                  this.$Message.warning('查询无数据！');
                  $("#exportCurrent").attr("disabled");
                } else {
                  this.dealitems = datalength1;
                  this.recieveData = dataResponse1;
                  $("#exportCurrent").removeAttr("disabled");
                  $("#infoTableList").html("查询结果共 " + this.dealitems + " 条记录");
                  //隐藏加载中
                  $("#loadBox").addClass("hide");
                }
              }
            }
          })
        },
        exportData() {
          this.flagType = [];
          this.types.forEach((type,index)=>{
            this.checkedTypes.forEach((t,ind)=>{
              if(t == type){
                var s = 'A'
                if(index == 1){
                  s=  'B'
                }
                if(index==2){
                  s = 'C'
                }
                this.flagType.push(s)
              }
            })
          });
          //查询传送的参数
          let downfileParams = "userId=" + srcUseridA +
            "&userName=" + srcUsernameA + "&signature=" + signatureA +
            "&Authorization=" + AuthorizationA +
            "&startDate=" + this.objData[0].startDate +
            "&endDate=" + this.objData[1].endDate +
            "&secType="+this.objData[2].secType+
            "&flagType=" + this.flagType + "&flagDayMonYear=y";

          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          var dp = '/dw/download/mtsl00005myexport?'
          // console.log(downfileParams);
          void(window.open(dp + downfileParams + commonGetReqParam));
        },
      },
      watch: {},
      mounted() {
        this.MTSL_l00005_month =[MTSL_l00005_month[0],MTSL_l00005_month[1],MTSL_l00005_month[2],MTSL_l00005_month[6],MTSL_l00005_month[10],MTSL_l00005_month[14]];

        let dataObj = JSON.parse(sessionStorage.getItem('data'));
        this.objData = JSON.parse(dataObj.data);
        this.title = dataObj.title;
        this.fnSundata();
      },



    }
</script>

<style lang="less">
    .mtsl00005Detail {
      padding: 30px;
    }
</style>
