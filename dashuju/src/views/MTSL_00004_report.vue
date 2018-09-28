<template>
  <div class="container">
    <h1>{{title}}</h1>
    <p id="infoTableList" class="redtext listlength"></p>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <el-table
      :data="recieveData"
      border
      :span-method="arraySpanMethod"
      style="width: 100%">
      <template v-for="(item,index) in tableColumns3">
        <el-table-column :min-width="item.width" :formatter="formatterNumber" :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </template>
    </el-table>
    <div class="exportBtn">
      <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
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
  import {tableColumns1, tableColumns2, tableColumns3} from '../assets/js/MTSL_00004.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';

  export default {
    data() {
      return {
        title: '',
        recieveData: [],
        tableColumns2: tableColumns2,
        tableColumns3: tableColumns3,
        getData:{},
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
      var dataObj = JSON.parse(sessionStorage.getItem('MTSL_00004_report'))
      this.getData = dataObj
      this.title = dataObj.title
      console.log(dataObj)
      this.getTableData()
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'sec_code' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      getTableData:function () {
        this.isHide = false
        this.getData.data.pageNo =  this.returnN
        this.getData.data.pageSize = this.pageSize
        var self = this
        $("#infoTableList").html('')
        //请求表格数据
        $.ajax({
          type:'POST',
          timeout:600000,
          headers:commonHeader,
          url:'/dw/mtsl/mtsl00004list',
          data:JSON.stringify(this.getData.data),
          success:function (res) {
            console.log('>>>>    ',res)

            if(res.success){
              if(res.resData.totalCount <1){
                self.$Message.warning('无数据！');
              }else{
                $("#exportCurrent").removeAttr("disabled");
                self.recieveData = res.resData.data
                self.returnTotal = res.resData.totalCoun
                $("#infoTableList").html("查询结果共 " + res.resData.totalCount+ " 条记录");
              }
            }else{
              self.$alert("错误：" +  res.message,'错误',{
                confirmButtonText:'确定',
                type:'error'
              })
            }
            self.isHide = true
          },
          error:function (err) {
            // self.$Message.error('查询出错：',err);
            self.$alert("错误：" +  err,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            self.isHide = true
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
    // 合并单元格
      arraySpanMethod: function ({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          if (columnIndex == 0) {
            return [this.recieveData.length, 1]
          }
        } else if (rowIndex < this.recieveData.length) {
          if (columnIndex == 0) {
            return [0, 1]
          }
        }
      },
      exportData() {
        console.log(this.getData)
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.getData.data.rptDte+'&menName='+this.getData.data.menName+'&collName='+this.getData.data.collName;
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        console.log(downfileParams)
        var dp = '/dw/download/mtsl00004listexport?'
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
