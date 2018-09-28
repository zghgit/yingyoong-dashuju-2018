<template>
  <div class="container">
    <h1>{{title}}</h1>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <p id="infoTableList" class="redtext listlength"></p>
    <el-table
      :data="recieveData"
      border
      style="width: 100%">
      <template v-for="(item,index) in tableColumns2">
        <el-table-column v-if="item.hasAnchor" :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
          <template scope="scope">{{scope.row.mem_abbr}}
            <a @click="anchorClick(scope)" style="margin-left: 15px">账户明细</a>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatterNumber" v-else :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </template>
    </el-table>
    <div class="exportBtn">
      <Button id="exportCurrent" type="primary" size="large" @click="exportData()"  >
        <Icon type="ios-download-outline"></Icon>
        导出全部结果为XLSX文件
      </Button>
    </div>
    <div class="pageModule">
      <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
            show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
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
  import {tableColumns1, tableColumns2, tableColumns3} from '../assets/js/MTSL_00009.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';

  export default {
    data() {
      return {
        title: '',
        recieveData: [],
        tableColumns2: tableColumns2,
        tableColumns3: tableColumns3,
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        dataFromLast:'',
        isHide:false,
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
      }
    },
    mounted() {
      var self = this
      var dataObj = JSON.parse(sessionStorage.getItem('MTSL_00009_detail'))
      this.dataFromLast = dataObj
      this.title = dataObj.title
      this.getTableData()
    },
    methods:{
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'trade_date'   ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      getTableData:function () {
        var self = this
        this.isHide = false
        $("#infoTableList").html('')
        this.dataFromLast.data.pageNo =  this.returnN
        this.dataFromLast.data.pageSize = this.pageSize
        //请求表格数据
        $.ajax({
          type:'POST',
          timeout:600000,
          headers:commonHeader,
          url:'/dw/mtsl/mtsl00009memberdetail',
          data:JSON.stringify(this.dataFromLast.data),
          success:function (res) {
            console.log('>>>>    ',res)

            if(res.resData.status){
              if(res.resData.result[0].data.length <1){
                self.$Message.warning('无数据！');
              }else{
                $("#exportCurrent").removeAttr("disabled");
                self.recieveData = res.resData.result[0].data
                self.returnTotal =  res.resData.result[0].data.length
                $("#infoTableList").html("查询结果共 " + res.resData.result[0].data.length + " 条记录");
              }
            }else{
              // self.$Message.error('查询出错：',err);
              self.$alert("错误：" +  res.message,'错误',{
                confirmButtonText:'确定',
                type:'error'
              })
            }
            self.isHide = true
          },
          error:function (err) {
            self.isHide = true
            self.$alert("错误：" +  err,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
          }
        })
      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.getTableData()
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.getTableData()
      },
      //表格连接点击
      anchorClick:function (scope) {
        console.log(scope.row)
        jump2NewPage('MTSL_00009_report',{
          data:{
            menName:scope.row.mem_abbr,
            menCode :scope.row.mem_code,
            rptDte:scope.row.trade_date
          },
          title:'账户明细'
        },true)
      },
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.dataFromLast.data.rptDte;
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/mtsl00009memberdetailexport?'
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style scoped>

  .container {
    padding: 30px;
  }
</style>
