<template>
  <div class="container">
    <h1>{{title}}</h1>
    <p id="infoTableList"   class="redtext listlength"></p>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <el-table
      :data="dayTableData"
      border
      style="width: 100%;">
      <template v-for="(item,index) in dayTableColumns">
        <el-table-column :min-width="item.width" :formatter="formatterNumber" :key="index+(Math.random()*1)"
                         :prop="item.field"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
          <el-table-column :min-width="item.width" :formatter="formatterNumber" v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"
                           :prop="ite.field"
                           :label="ite.title"
                           :align="ite.align"
                           :width="ite.width">
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
    <div class="exportBtn">
      <Button id="exportCurrent2" type="primary" size="large" @click="exportData2()" disabled>
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
    formatterNumber,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1,anchorTableColumn  } from '../assets/js/SSE_20004.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';

  export default {
    data() {
      return {
        title: '',
        recieveData: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        pageSize: 500,
        isHide: true,
        dayTableColumns: anchorTableColumn,
        dayTableData: [],
        //  保存上个页面的数据
        dataFromParent: ''
      }
    },
    mounted() {
      // 解析数据
      var self = this
      var dataObj = JSON.parse(sessionStorage.getItem('SSE_20004_detail'))
      console.log(dataObj)
      var o = JSON.parse(dataObj.data)
      self.dataFromParent = o
      this.title = dataObj.title
      // 发送请求
      this.getTableData()
      // 是否展示最后一列
      if(o.hasSendNumber){
        this.dayTableColumns = anchorTableColumn
      }else{
        this.dayTableColumns = anchorTableColumn.slice(0,anchorTableColumn.length - 1)
      }
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'sec_code' || prop == 'list_date' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      // 请求数据
      getTableData:function () {
        var self = this
        self.isHide = false
        self.dayTableData = []
        $("#infoTableList").html("")
        this.dataFromParent.pageNo = this.returnN
        this.dataFromParent.pageSize = this.pageSize
        $("#exportCurrent2").attr("disabled");
        $.ajax({
          type: 'POST',
          timeout: 600000,
          headers: commonHeader,
          url: '/dw/mktdt/sse_20004_detail',
          data: JSON.stringify(this.dataFromParent),
          success: function (res) {
            console.log('>>>>    ', res)
            if (res.success) {
              self.dayTableData = res.resData.data

              self.returnTotal = res.resData.totalCount
              if(res.resData.totalCount >0){
                $("#exportCurrent2").removeAttr("disabled");
              }
              $("#infoTableList").html("查询结果共 " + self.returnTotal + " 条记录");
            } else {
              self.$Message.error(res.message);
              $("#exportCurrent2").attr("disabled");
            }
            self.isHide = true
          },
          error: function (err) {
            $("#exportCurrent2").attr("disabled");
            self.isHide = true
            // self.$Message.error('查询出错：', err);
            self.$alert("错误" +  err,'错误',{
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
      // 导出
      exportData2() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.dataFromParent.startDate + "&endDate=" + this.dataFromParent.endDate
        downfileParams += '&multiSecCode=' + this.dataFromParent.multiSecCode
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse_20004_detail_export?'
        console.log(downfileParams )
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    },

  }
</script>
<style scoped>

  .container {
    padding: 30px;
  }
</style>
