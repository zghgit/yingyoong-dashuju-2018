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
      style="width: 100%">
      <template v-for="(item,index) in tableColumns2">
        <el-table-column   v-if="item.hasAnchor" :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
          <template scope="scope">
            <a @click="anchorClick(scope)">{{scope.row.coll_type_desc}}</a>
          </template>
        </el-table-column>
        <el-table-column :min-width="item.width" :formatter="formatterNumber" v-else :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </template>
    </el-table>
    <div class="exportBtn">
      <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled >
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
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        dataFromLast:{},
        isHide: false
      }
    },
    mounted() {
      var self = this
      var dataObj = JSON.parse(sessionStorage.getItem('MTSL_00004_detail'))
      this.dataFromLast = dataObj
      this.title = dataObj.title
      console.log(dataObj)
      this.getTableData()
    },
    methods:{
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
        this.dataFromLast.data.pageNo =  this.returnN
        this.dataFromLast.data.pageSize = this.pageSize
        var self = this
        console.log(this.dataFromLast)
        $("#infoTableList").html('')
        //请求表格数据
        $.ajax({
          type:'POST',
          timeout:600000,
          headers:commonHeader,
          url:'/dw/mtsl/mtsl00004detail',
          data:JSON.stringify(this.dataFromLast.data),
          success:function (res) {
            console.log('>>>>    ',res)

            if(res.success){
              if(res.resData.totalCount <1){
                self.$Message.warning('无数据！');
              }else{
                $("#exportCurrent").removeAttr("disabled");
                self.recieveData = res.resData.data
                self.returnTotal = res.resData.totalCount
                $("#infoTableList").html("查询结果共 " +self.returnTotal + " 条记录");
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
      //表格连接点击
      anchorClick:function (scope) {

        var obj = {}
        for(var k in this.dataFromLast.data){
          obj[k] = this.dataFromLast.data[k]
        }
        obj.collName = scope.row.coll_type_desc
        obj.menName = scope.row.men_name
        console.log(this.dataFromLast.data)
        jump2NewPage('MTSL_00004_report',{
          data:obj,
          title:'担保品清单'
        },true)
      },
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&rptDte=" + this.dataFromLast.data.rptDte
        downfileParams += '&menName='+(this.dataFromLast.data.menName =='市场合计' ? 'ALL' :this.dataFromLast.data.menName)
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/mtsl00004detailexport?'
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
