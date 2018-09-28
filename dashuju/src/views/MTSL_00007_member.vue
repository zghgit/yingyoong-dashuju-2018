<template>
  <div class="container">
    <h1>{{title}}超链接页面</h1>
    <p id="infoTableList" class="redtext listlength" style="float: none"></p>
    <el-checkbox-group v-model="checkedTypes" @change="handleChangeTypesChange">
      <el-checkbox v-for="(city,index) in types" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
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
          <template scope="scope">
            <a @click="anchorClick(scope)">{{scope.row.rr}}</a>
          </template>
        </el-table-column>
        <el-table-column  :formatter="formatterNumber" v-else :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </template>
    </el-table>
    <div class="exportBtn">
      <Button id="exportCurrent" type="primary" size="large" @click="exportData()">
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
  import {tableColumns1, tableColumns2, tableColumns3} from '../assets/js/MTSL_00007.js';
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
        //  复选框
        types: ['展现占比指标', '展现日均指标', '展现户均指标'],
        checkedTypes: [],
        currentCheckedArr:[false,false,false],
        dataFromParent:'',
        isHide:false
      }
    },
    mounted() {
      var dataObj = JSON.parse(sessionStorage.getItem('MTSL_00007_member'))
      console.log(dataObj)
      var o = JSON.parse(dataObj.data)
      if(o.inputCollRatio){
        o.inputCollRatio = o.inputCollRatio.replace(/\%/g,'@')
      }

      this.dataFromParent = o
      console.log(o)
      $("#infoTableList").html('')
      var self = this
      $.ajax({
        type:'POST',
        timeout:600000,
        headers:commonHeader,
        url:'/dw/mtsl/mtsl_00007_detail',
        data:JSON.stringify(o),
        success:function (res) {
          console.log('>>>>    ',res)
          if(res.success){
            if(res.resData.data.length <1){
              self.$Message.warning('无数据！');
            }else{
              $("#exportCurrent").removeAttr("disabled");
              self.recieveData = res.resData.data
              $("#infoTableList").html("查询结果共 " + res.resData.data.length + " 条记录");
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

          self.$alert("错误：" +  err,'错误',{
            confirmButtonText:'确定',
            type:'error'
          })
          self.isHide = true
        }
      })
      this.title = dataObj.title

      var temp = []
      tableColumns2.forEach((item,index)=>{
        if(!item.flag){
          temp.push(item)
        }
      })
      this.tableColumns2 =  temp
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'trade_date' || prop == 'sec_code' || prop=='stat_date' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
// 勾选时
      handleChangeTypesChange: function (value) {
        // 记录当前勾选的选项
        this.currentCheckedArr = [false,false,false]

        this.tableColumns2 = [tableColumns2[0],tableColumns2[1],tableColumns2[2],tableColumns2[4],tableColumns2[6],tableColumns2[8],tableColumns2[12]]

        this.types.forEach((type, index) => {
          value.forEach((t, ind) => {
            if (t == type) {
              this.currentCheckedArr.splice(index,1,true)
              tableColumns2.forEach((o, inde) => {
                if (o.flag == (index + 1)) {
                  this.tableColumns2.push(o)
                }
              })
            }
          })
        })
        //  排序
        this.tableColumns2.sort((o1,o2)=>{
          return o1.aIndex < o2.aIndex ? -1 : 1
        })
      },
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&inputCollRatio=" +this.dataFromParent.inputCollRatio+'&startDate='+this.dataFromParent.startDate+'&endDate='+this.dataFromParent.endDate+'&showWhich='+this.currentCheckedArr
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mtsl/mtsl_00007_detail_export?'
        console.log(downfileParams)
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
