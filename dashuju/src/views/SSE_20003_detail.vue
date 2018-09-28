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
        <el-table-column  :formatter="formatterNumber"  :key="index+(Math.random()*1)"
                         :prop="item.field"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
          <el-table-column  :formatter="formatterNumber"  v-for="(ite,index) in item.children" :key="index+(Math.random()*1)"
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
  import {tableColumns1, tableColumns2, tableColumns3} from '../assets/js/SSE_20003.js';
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
        pageSize: 500,
        isHide: true,
        dayTableColumns: [],
        dayTableData: [],
        //  保存上个页面的数据
        dataFromParent: ''
      }
    },
    mounted() {
      // 解析数据
      var self = this
      var dataObj = JSON.parse(sessionStorage.getItem('SSE_20003_detail'))
      console.log(dataObj)
      var o = JSON.parse(dataObj.data)
      // o.
      self.dataFromParent = o
      self.dayTableColumns = o.dayTableColumns
      this.title = dataObj.title
      // 发送请求
      this.getTableData()
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'trade_date'){
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

        $.ajax({
          type: 'POST',
          timeout: 600000,
          headers: commonHeader,
          url: self.dataFromParent.url,
          data: JSON.stringify(self.dataFromParent),
          success: function (res) {
            console.log(res)
            var dataArr = res.resData.data
            //无数据
            if (res.resData.totalCount < 1) {
              self.$Message.warning('无数据!');
              $("#exportCurrent2").attr("disabled");
            } else {
              self.$Message.success('查询成功!');
              self.dayTableData = dataArr
              self.returnTotal = res.resData.totalCount
              $("#infoTableList").html("查询结果共 " + self.returnTotal + " 条记录");
              $("#exportCurrent2").removeAttr("disabled");
            }
            self.isHide = true
          },
          error: function (err) {
            // self.$Message.error('查询出错：', err);
            self.$alert("错误" +  err,'错误',{
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
      // 导出
      exportData2() {
        var str = ''
        if (this.dataFromParent.whichTable == 1) {
          this.dayTableData.forEach((item, index) => {
            str += item.od + ','
          })
          str = str.slice(0, str.length - 1)
        }
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.dataFromParent.startDate + "&endDate=" + this.dataFromParent.endDate
        downfileParams += this.dataFromParent.whichTable == 0 ? '' : '&multiSecCode=' + str
        downfileParams += '&type=' + this.dataFromParent.type
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/sse_20003_detail' + (this.dataFromParent.whichTable == 0 ? 1 : 2) + '_export?'
        console.log(dp + downfileParams)
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
