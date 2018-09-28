<template>
  <div class="container">
    <h1>{{title}}</h1>
    <p id="infoTableList" class="redtext listlength"></p>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <el-table
      :data="dayTableData"
      border

      ref="eltable"
      @sort-change="sortChange"
      style="width: 100%;">
      <template v-for="(item,index) in dayTableColumns">
        <el-table-column :min-width="item.width" :formatter="formatterNumber" sortable="true" :sort-method="sortMethod" :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </template>
    </el-table>
    <div class="exportBtn">
      <Button id="exportCurrent2" type="primary" size="large" @click="exportData()" disabled>
        <Icon type="ios-download-outline"></Icon>
        导出全部结果为csv文件
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
    formatterNumber,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1, tableColumns2, tableColumns3} from '../assets/js/SSE_20001.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
  import exportCsv from '../components/export-csv'
  import Csv from '../components/Csv.js'
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
        dataFromParent: '',
        sortObj: {},
        sourceArray:[]
      }
    },
    mounted() {
      // 解析数据
      var self = this
      var dataObj = JSON.parse(sessionStorage.getItem('SSE_20001_detail'))

      var o = dataObj.data
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
        if(prop == 'trade_date' || prop == 'sec_code' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },

      // 排序变化
      sortChange: function (col, prop, order) {
        var key = col.prop
        var x = -1
        x = col.order == "descending" ? 1 : -1
        this.sourceArray.sort((o1, o2) => {
          var v1 = isNaN(o1[key]) ? o1[key] : Number(o1[key])
          var v2 = isNaN(o1[key]) ? o2[key] : Number(o2[key])
          return v1 < v2 ? -1 * x : 1 * x
        })
        // this.isHide = true
        this.dayTableData = this.sourceArray
      },
      // 排序方法
      sortMethod: function (a, b) {
        // console.log(a,b)
        // if(this.sortObj.order){
        //   if(this.sortObj.order == "ascending"){
        //     return a-b
        //   }else{
        //     return b-a
        //   }
        // }
      },
      // 请求数据
      getTableData: function () {
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
            console.log('>>>>    ', res)
            self.isHide = true
            if (res.success === false) {
              self.$alert("查询出错" + res.message, '提示', {
                confirmButtonText: '确定'
              })
              // self.$Message.error('查询出错：', res.message);
              return
            }
            if (res.resData.result[0].size == 0) {
              self.$Message.warning('查询无数据！');
              return
            }
            $("#infoTableList").html("查询共" + res.resData.result[0].size + '条数据')
            $("#exportCurrent2").removeAttr("disabled");
            self.returnTotal = res.resData.result[0].size
            self.sourceArray = res.resData.result[0].data
            self.dayTableData = self.sourceArray.slice(0, 500)

            setTimeout(function () {
              var descending = $('.descending i')
              var ascending = $('.ascending i')
              descending.click(function (ev) {
                $('.ascending i').css({'color':'gray'})
                $('.descending i').css({'color':'gray'})
                $(ev.target).css({'color':'red'})
              })
              ascending.click(function (ev) {
                $('.ascending i').css({'color':'gray'})
                $('.descending i').css({'color':'gray'})
                $(ev.target).css({'color':'red'})
              })

              // console.log(descending)
            },20)
          },
          error: function (err) {
            // self.$Message.error('查询出错：', err);
            self.$alert("错误" + err, '错误', {
              confirmButtonText: '确定',
              type:'error'
            })
          }
        })
      },
      // 格式化子表格列的数字
      formatAnchorNumber: function (value, restN) {
        var n = restN > 0 ? parseFloat(value).toFixed(restN) : parseInt(value)
        n = isNaN(n) ? '' : n
        return n
      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.formatTableByPage()
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.formatTableByPage()
    },
      formatTableByPage:function () {
        var end = this.pageSize * this.returnN > this.sourceArray.length ? this.sourceArray.length :this.pageSize * this.returnN
        this.dayTableData = this.sourceArray.slice((this.returnN - 1)*this.pageSize ,end)
      },
      // 导出
      exportData(){
        var params = {}
        if (params.filename) {
          if (params.filename.indexOf('.csv') === -1) {
            params.filename += '.csv';
          }
        } else {
          params.filename = this.title+ '.csv';
        }
        let columns = [];
        let datas = [];
        if (params.columns && params.data) {
          columns = params.columns;
          datas = params.data;
        } else {
          columns = this.dayTableColumns;
          datas = this.sourceArray;
        }

        let noHeader = false;
        if ('noHeader' in params) noHeader = params.noHeader;

        const data = Csv(columns, datas, ',', noHeader);
        exportCsv.download(params.filename, data);
      },
      // exportData(i_d, url) {
      //   var params = ''
      //   var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.dataFromParent.startDate + "&endDate=" + this.dataFromParent.endDate + '&dzFlag=' + this.dataFromParent.dzFlag;
      //   if (!i_d || i_d == '') {
      //     if (this.dataFromParent != '') {
      //       i_d = 'exportCurrent2'
      //       //  A股/B股
      //
      //       if ((this.dataFromParent.secTypeName == 'A股' || this.dataFromParent.secTypeName == 'B股') && this.dataFromParent.type) {
      //         url = 'sse20001aorbsharesexport'
      //         params = '&type=' + this.dataFromParent.type
      //       } else if (this.dataFromParent.secTypeFlag) {
      //         //  月/年
      //         url = 'sse20001monthyearexport'
      //         params = '&secTypeFlag=' + this.dataFromParent.secTypeFlag + '&secTypeName=' + this.dataFromParent.secTypeName
      //       } else if (this.dataFromParent.foundType) {
      //         //  个券
      //         url = 'sse20001_fund_export'
      //         params = '&foundType=' + this.dataFromParent.foundType
      //       } else {
      //         //  日
      //         url = 'sse20001dayexport'
      //         params = '&secTypeName=' + this.dataFromParent.secTypeName
      //       }
      //       console.log('url : ', url)
      //       console.log('params : ', params)
      //     }
      //   }
      //   $("#" + i_d).attr("disabled");
      //   setTimeout(function () {
      //     $('#' + i_d).removeAttr('disabled');
      //   }, 5000);
      //   var dp = '/dw/mktdt/' + url + '?'
      //   console.log(dp + downfileParams)
      //   console.log(downfileParams)
      //   window.open(dp + downfileParams + params + commonGetReqParam)
      // },
    },

  }
</script>
<style scoped>

  .container {
    padding: 30px;
  }
</style>
