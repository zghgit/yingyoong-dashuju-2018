<template>
  <div class="constWidth">
      <el-row>
        <el-col class="bnaBox">
          <collapse></collapse>
          <el-collapse v-model="activeName">
            <el-collapse-item name="1">
              <template slot="title" class="sss">
                <span>报价回购简报查询2017-04-13</span>
              </template>
              <div>
                <p>ddskfdkljdkljsdkg</p>
                <p>ddskfdkljdkljsdkg</p>
                <!--<el-button>sdfhsdjf</el-button>-->
                <!--<el-input>efsd</el-input>-->
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    <el-card>
      <el-row>
        <el-col>
          <el-table
            :data="majorHoldCount"
            border
            tooltip-effect="dark"

            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%;">
            <el-table-column
              v-for="column in majorHoldColumns"
              :key=column.field
              :align=column.align
              :prop=column.field
              :label=column.title
              :sortable=column.sortable
              :sort-method="column.sortMethod"
              :min-width=column.minWidth>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

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
    commonGetReqParam
  } from '../assets/js/commen.js';
  // import {tableColumns1} from '../assets/js/BND-15001.js';
  import '../theme/threeCommon.less';
  import Collapse from '../components/collapse'
  export default {
    name: "constWidth",
    props: [],
    components: {
      Collapse
    },
    data() {
      return {
        majorHoldCount: [], //表格数据
        activeName:'1',
        majorHoldColumns: [
          { field: "a01", title: "成交金额（万元）", minWidth: "17", align: 'center'},
          { field: "a02", title: "成交数量（手）",minWidth: "17", align: 'center'},
          { field: "a03", title: "成交笔数（笔）", minWidth: "17", align: 'center'},
          { field: "a04", title: "投资者人数", minWidth: "17", align: 'center'},
          { field: "a05", title: "今日交易投资者数(人)",minWidth: "22", align: 'center'},
          { field: "a06", title: "持有未到期回购投资者数(人)",minWidth: "22", align: 'center'},
          { field: "a07", title: "回购未到期金额（万元）",minWidth: "17", align: 'center'},
          { field: "a08", title: "占比", minWidth: "9", align: 'center'},
          { field: "a09", title: "标准券总额（亿元）", minWidth: "17", align: 'center'},
          { field: "a10", title: "期限", minWidth: "15", align: 'center'},
          { field: "a11", title: "最高报价",minWidth: "17", align: 'center'},
          { field: "a12", title: "最低报价", minWidth: "17", align: 'center'},
          { field: "a13", title: "周成交金额",minWidth: "17", align: 'center'},
          { field: "a14", title: "比例", minWidth: "9", align: 'center'},
          { field: "a15", title: "未到期金额", minWidth: "17", align: 'center'},
          { field: "a16", title: "比例", minWidth: "9", align: 'center'},
          { field: "a17", title: "成交金额（万元）", minWidth: "17", align: 'center'},
          { field: "a18", title: "成交数量（手）",minWidth: "17", align: 'center'},
          { field: "a19", title: "成交笔数（笔）",minWidth: "17", align: 'center'},
          { field: "a20", title: "投资者人数", minWidth: "17", align: 'center'},
          ], //表头

      }
    },
    methods: {
      //列颜色定义
      tableColumnClassName({row, column}) {
        if (column.label == '沪市A股') {
          return 'orange'
        }
      },
      handleCurrentChange(val) {
      },
    },
    watch: {},
    mounted() {

    },

  }
</script>

<style lang="less">
  .constWidth {
.bnaBox{
  position: relative;
}
  .el-collapse-item__header {
    height: initial;
    line-height: initial;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #464c5b;
    padding: 24px;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }
  .el-collapse {
     border-top: 0;
  }
.el-collapse, .el-collapse-item__header, .el-collapse-item__wrap {
 border-bottom: 0;
}
  .el-collapse-item.is-active .el-collapse-item__header {

    background-color: #FFFFFF;
    border-radius: 3px;
    border: 1px solid #d7dde4;
  }
  .constWidth .el-collapse-item.is-active .el-collapse-item__header {
     background-color: #d7dde4;
  }
  .el-button-int {
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }
  .el-button--int{
    color: gray;
     background-color: #FFFFFF;
    /*border: 1px solid gray;*/
     border-color: gray;
  }
  .el-button--int:focus, .el-button--int:hover {
    color: gray;
    border-color: gray;
    background-color: #FFFFFF;
  }
  .el-button--small, .el-button--small.is-round {
    padding: 7px 15px;
  }
  }
</style>
