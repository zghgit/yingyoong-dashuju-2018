<template>
    <div class="mtsl00010day">
      <h1>{{title}}</h1>
      <p id="infoTableList" class="redtext listlength" style="width: 100%;"></p>
      <el-table
        :data="recieveData"
        border
        v-loading="queryResLoadMain"
        element-loading-spinner="el-icon-loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-background="rgba(0,0,0,0.3)"
        style ="width: 100%">
        <template v-for="(item,index) in MTSL_00010_day">
          <el-table-column
            :min-width="item.width"
            :formatter="formatterNumber"
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
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
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
  import {MTSL_00010_day} from '../assets/js/MTSL_00010.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
    export default {
        name: "mtsl00010day",
        props: [],
        components: {},
        data() {
            return {
              title: '',
              objData:[],
              recieveData: [],
              queryResLoadMain:false,   // 数据加载中，请耐心等待
              MTSL_00010_day: MTSL_00010_day,
              //分页信息
              returnTotal: 0,
              returnN: 1,
              dataArrayAll: [],
              pageSize: 500,

            }
        },
        methods:{
          // 列：格式化字符
          formatterNumber:function (row,col,cellValue) {
            var prop = col.property
            if(prop == 'stat_end_date'){
              return cellValue
            }
            return formatTbousandth(cellValue)
          },
          // 列：格式化字符
          formatterNumber:function (row,col,cellValue) {
            var prop = col.property
            if(prop == 'stat_end_date'){
              return cellValue
            }
            return formatTbousandth(cellValue)
          },
          /**
           * 显示当前页
           */
          tableChange: function (page) {
            this.returnN = page;
            this.fnSundata(this.returnN, this.pageSize)
          },
          /**
           * 表格显示行数选择
           */
          tableChangeSize: function (pageSize) {
            this.returnN = 1;
            this.pageSize = pageSize;
            this.fnSundata(this.returnN, this.pageSize)

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
             "collaDuty": this.objData[2].collaDuty,   // 用户定义高风险维持担保比例
              "userId": srcUseridA,
              "userName": srcUsernameA,
              // "reQuery": statics,
              "pageNo": pages,
              "pageSize": rows,
              "businessId": "MTSL_00006",
            };
            const url = '/dw/mtsl/mtsl00010day';
            // const url = '/45/mtsl/mtsl00010day';
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
                this.dealitems = 0;      // 总条数
                $("#exportCurrent").attr("disabled");
              }else {
                let dataResponse1 =  data.resData.data;
                let datalength1 = data.resData.totalCount;
                if (dataResponse1.length == 0) {
                  $("#loadBox").addClass("hide");
                  this.recieveData = [];
                  this.dealitems = 0;
                  this.$Message.warning('查询无数据！');
                  $("#exportCurrent").attr("disabled");
                }else {
                  this.dealitems = datalength1;
                  this.recieveData = dataResponse1;
                  $("#exportCurrent").removeAttr("disabled");
                  $("#infoTableList").html("查询结果共 " + this.dealitems + " 条记录");
                  //隐藏加载中
                  $("#loadBox").addClass("hide");
                }
              }
            })
          },
          // 日链接-- 下载
        exportData() {
          let downfileParams = "userId=" + srcUseridA +
            "&userName=" + srcUsernameA + "&signature=" + signatureA +
            "&Authorization=" + AuthorizationA +
            "&startDate=" + this.objData[0].startDate +
            "&endDate=" + this.objData[1].endDate +
            "&collaDuty=" + this.objData[2].collaDuty;
          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          var dp = '/dw/download/mtsl00010dayexport?';
          void(window.open(dp + downfileParams + commonGetReqParam));
        },
      },
        watch: {},
        mounted() {
          var dataObj = JSON.parse(sessionStorage.getItem('data'));
          this.objData = JSON.parse(dataObj.data);
          this.title = dataObj.title;
          this.fnSundata();
        },

    }
</script>

<style lang="less">
    .mtsl00010day {
      padding: 30px;
    }
</style>
