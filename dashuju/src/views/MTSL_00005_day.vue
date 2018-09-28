<template>
    <div class="mtsl00005day">
      <!--日超链接明细表-->
      <h1>{{title}}</h1>
        <p id="infoTableList" class="redtext listlength" style="width: 100%;"></p>
      <el-checkbox-group v-model="checkedTypes"
                         @change="handleChangeTypesChange">
        <el-checkbox v-for="(city,index) in types"
                     :label="city" :key="index">{{city}}</el-checkbox>
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
        <template v-for="(item,index) in MTSL_l00005_day">
          <el-table-column
            :formatter="formatterNumber"
            :min-width="item.width"
             :key="item.field"
             :prop="item.field"
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
  import {MTSL_l00005_day} from '../assets/js/MTSL_00005.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
    export default {
        name: "mtsl00005day",
        props: [],
        components: {},
        data() {
            return {
              title: '',
              recieveData: [],
              queryResLoadMain:false,   // 数据加载中，请耐心等待
              dealitems:10,
              objData:[],
              MTSL_l00005_day: MTSL_l00005_day,
              //分页信息
              returnTotal: 0,
              returnN: 1,
              dataArrayAll: [],
              pageSize: 500,
              //  复选框
              types: ['展现占比指标', '展现环比指标'],
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
            this.returnN = 1;
            this.handleSubmit('formValidate')
          },
        //表格连接点击
        anchorClick:function (scope) {

        },
        // 复选按钮 勾选时
        handleChangeTypesChange:function (val) {
          // this.flagType = []
          // if(val.length ==2){
          //   this.flagType = ['A','B']
          // }else{
          //   var str = val[0]
          //   if(str){
          //     var i = this.types.indexOf(str) == 0 ? 'A' : 'B'
          //     this.flagType.push(i)
          //   }
          // }

          this.MTSL_l00005_day = [MTSL_l00005_day[0], MTSL_l00005_day[1], MTSL_l00005_day[2], MTSL_l00005_day[5], MTSL_l00005_day[8], MTSL_l00005_day[11]];
          this.types.forEach((type,index)=>{
            val.forEach((t,ind)=>{
              if(t == type){
                MTSL_l00005_day.forEach((o,inde)=>{
                  if(o.flag == (index+1)){
                    this.MTSL_l00005_day.push(o)
                  }
                })
              }
            })
          });
          //  排序
          this.MTSL_l00005_day.sort((o1,o2)=>{
            return o1.aIndex < o2.aIndex ? -1 : 1
          })
        },
        fnSundata:function (pages,rows) {
            this.queryResLoadMain = true;    // 数据加载中，请耐心等待
            $("#infoTableList").html('');       // 清空总条数
            // 没一次查询时先清空下载数据
            document.getElementById("exportCurrent").setAttribute("disabled",true);
            this.recieveData = [];
            this.dealitems = 0;      // 总条数
            this.returnTotal = 0;   // 分页
            let searchParams = {
              "startDate":this.objData[0].startDate,       // 开始时间
              "endDate": this.objData[1].endDate,         // 结束时间
              "secType": this.objData[2].secType,       // 证券品种
              "pageSize": rows,
              "userId": srcUseridA,
              "userName": srcUsernameA,
              // "reQuery": statics,
              "pageNo": pages,
              "businessId": "MTSL_l00010",
            };
            const url = '/dw/mtsl/mtsl00005day';
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
          if(this.checkedTypes.length == 2){
            this.flagType = ['A','B']
          }else {
            let str = this.checkedTypes[0];
            if(str){
              var i = this.types.indexOf(str) == 0 ? 'A' : 'B'
              this.flagType.push(i)
            }
          }
          //查询传送的参数
          let downfileParams = "userId=" + srcUseridA +
            "&userName=" + srcUsernameA + "&signature=" + signatureA +
            "&Authorization=" + AuthorizationA +
            "&startDate=" + this.objData[0].startDate +
            "&endDate=" + this.objData[1].endDate +
            "&secType="+this.objData[2].secType +
            "&flagType=" + this.flagType;
          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);

          var dp = '/dw/download/mtsl00005dayexport?'
          // console.log(downfileParams);
          void(window.open(dp + downfileParams + commonGetReqParam));
        },
      },
        watch: {},
        mounted() {
          this.MTSL_l00005_day = [MTSL_l00005_day[0], MTSL_l00005_day[1], MTSL_l00005_day[2], MTSL_l00005_day[5], MTSL_l00005_day[8], MTSL_l00005_day[11]];
          let dataObj = JSON.parse(sessionStorage.getItem('data'))
          this.objData = JSON.parse(dataObj.data);
          this.title = dataObj.title;
          this.fnSundata();
        },
    }
</script>

<style lang="less">
    .mtsl00005day {
      padding: 30px;
    }
</style>
