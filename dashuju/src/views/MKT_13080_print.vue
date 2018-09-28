<template>
  <div class="box">
  <h1>上市证券交易异常波动确认单</h1>
    <p class="printCode"><b>编号：2010年10月10日</b></p>
    <!--<el-table-->
      <!--:data="dataArr"-->
      <!--border-->
      <!--style="width: 100%">-->
      <!--<el-table-column v-for="(item,index) in tableColumns" :key="index"-->
                       <!--:prop="item.key"-->
                       <!--:label="item.title"-->
                       <!--:align="item.align"-->
                       <!--:min-width="item.width">-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <table>
      <tr>
        <td v-for="(item,index) in tableColumns">{{item.title}}</td>
      </tr>
      <tr v-for="(item,index) in dataArr">
        <td >{{item.index}}</td>
        <td >{{item.code}}</td>
        <td >{{item.name}}</td>
        <td >{{item.type}}</td>
        <td >{{item.desc}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import {
    urlParams,
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    getUrlParams,
    validNum
  } from '../assets/js/commen.js';
  export default {
    data(){
      return {
        t:'',
        Authorization: AuthorizationA,
        signature: signatureA,
        srcUserid: srcUseridA,
        srcUsername: srcUsernameA,
        dwSessionid: dwSessionidA,
        dataArr:[
          { index:'1', code:'lpj' ,name:18 ,type:11,desc:55 }
        ],
        tableColumns:[
          {
            key:'index',
            title:'序号',
            align:'center',
            width:100,
          },
          {
            key:'code',
            title:'证券代码',
            align:'center',
            width:100,
          },
          {
            key:'name',
            title:'证券简称',
            align:'center',
            width:100,
          },
          {
            key:'type',
            title:'交易异常波动类型',
            align:'center',
            width:100,
          },
          {
            key:'desc',
            title:'备注',
            align:'center',
            width:100,
          },
        ]
      }
    },
    mounted(){


         // this.goNextPage('/MKT_13080')

    },
    methods:{

    },
    beforeDestroy(){

    }
  }
</script>
<style lang="less" scoped>
  .box{
    padding: 80px 180px;
    border:1px solid #111;
  }
h1{
  text-align: center;
}
  .printCode{
    text-align: right;
  }
  table{
    display: block;
    width: 100%;
    font-size: 14px;
    /*border-spacing: 0;*/
    border-collapse: collapse;
    margin:20px 0 ;
    tr{
      width: 100%;
      td{
        border: 1px solid #111;
        text-align: center;

      }
    }

  }
</style>
