<template>
  <section class="constWidth">
    <!--头部logo-->
    <header></header>
    <Modal id="dayTableModel" width="1024" height="1200" :closable="false" v-model="dayTableModel"
           class-name="vertical-center-modal" cancel-text>
      <!--表格弹窗-->
      <el-table
        :data="modalTableData"
        border
        id="hyb00044RightArray"
        style="width: 100%;">
        <template :formatter="formatterNumber" v-for="(item,index) in tableColumns2">
          <el-table-column :key="Math.random()"
                           :prop="item.key"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
          </el-table-column>
        </template>
      </el-table>
      <div class="pageModule">
        <Page :total="returnTotal2" :current="returnN2" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page>
      </div>
    </Modal>
    <div class="mainBox changeBox">
      <Row :gutter="gutterValue">

        <Card class="iviewCard">
          <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
            <Icon type="load-c" size=40 class="loadIcon"></Icon>
            <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
          </Spin>
          <!--头部logo-->
          <p id="infoTableList" class="redtext listlength"></p>
          <Button class="checkAllToLib" type="primary" @click="checkAllToLib">批量重新入库</Button>
          <el-table
            :data="tableData1"
            border
            @selection-change="selectionChange"
            style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <template v-for="(item,index) in tableColumns1">
              <el-table-column :min-width="item.width" :formatter="formatterNumber" v-if="item.hasOperation == true" :key="index"
                               :prop="item.key"
                               :label="item.title"
                               :align="item.align"
                               :width="item.width">
                <template scope="scope">
                  <Button v-for="(ite,ind) in item.children" @click="operationBtnClick(scope,ind)" type="primary">
                    {{ite.title}}
                  </Button>
                </template>
              </el-table-column>
              <el-table-column :min-width="item.width"  :formatter="formatterNumber" v-else :key="index" :prop="item.key"
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
        </Card>
      </Row>
    </div>
  </section>
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
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1, tableColumns2} from '../assets/js/HYB_00044_Operation_Detail.js';
  import '../theme/threeCommon.less';

  export default {
    data() {
      return {
        //显示隐藏输入条件
        changeArrow: 'rightArrow',
        gutterValue: 16,
        leftPane: 19,
        rightPane: 5,
        isHide: false,
        //统计口径
        changeInfo: false,
        //初始化表格信息
        tableColumns1: tableColumns1,
        tableColumns2: tableColumns2,
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        pageSize: 500,
        returnTotal2: 0,
        returnN2: 1,
        pageSize2: 500,
        //日期初始化
        formValidate: {
          startdate: new Date()
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: '',
        //  勾选的选项框数组
        selectionIndexArr: '',
        modalTableData: [],
        dayTableModel: false,
      //  弹窗请求体
        modalReqBody:{}
      }
    },
    mounted() {
      this.sendRequset()
    },
    methods: {
      sendRequset:function () {
        var self = this
        this.isHide = false
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA
        downfileParams+='&pageNo='+this.returnN+'&pageSize='+this.pageSize
        $.ajax({
          type: 'GET',
          timeout: 600000,
          // headers:commonHeader,
          url: '/dw/hyb/hyb_00044_backup_list?' + downfileParams,
          // data:JSON.stringify(obj),
          success: function (res) {
            console.log(res)
            var dataArr = res.resData.data
            self.returnTotal = res.resData.totalCount
            dataArr.forEach((item, index) => {
              item.index = index
            })
            self.tableData1 = dataArr
            self.isHide = true
          },
          error: function (err) {
            // self.$Message.error('查询出错：', err);
            self.$alert("错误：" +  err,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            self.isHide = true
          }
        })
      },
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if( prop=='index'||prop=='action_id'){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.sendRequset()
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.sendRequset()
      },
      /**
       * 显示当前页
       */
      tableChange2: function (page) {
        this.returnN2 = page;
        this.sendModalRequset()
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize2: function (pageSize) {
        this.pageSize2 = pageSize;
        this.returnN2 = 1;
        this.sendModalRequset()
      },
      sendModalRequset:function () {
        var self = this
        this.modalReqBody.pageNo = this.returnN2
        this.modalReqBody.pageSize = this.pageSize2
        $.ajax({
          type: 'POST',
          timeout: 600000,
          headers: commonHeader,
          url: '/dw/hyb/hyb_00044_detail_list',
          data: JSON.stringify(this.modalReqBody),
          success: function (res) {
            console.log(res)
            self.isHide = true
            res.resData.data.forEach((item, index) => {
              item.isEff = '●'
            })
            self.modalTableData = res.resData.data
            self.returnTotal2 = res.resData.totalCount

          },
          error: function (err) {
            // self.$Message.error('出错：', err);
            self.$alert("错误：" +  err,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            self.isHide = true
          }
        })
      },
      // 操作按钮
      operationBtnClick: function (scope, index) {
        var self = this
        self.isHide = false
        console.log(this.returnN2,this.pageSize2)
        var obj = {
          actionId: scope.row.action_id,
          onlyEff: (index == 0 ? 'N' : 'Y'),

        }
        this.modalReqBody = obj
        console.log(obj)
        console.log(JSON.stringify(obj))
        if (index < 2) { // 有效/生效
          this.dayTableModel = true
          this.sendModalRequset()
        } else if (index == 2) {  // 下载
          self.isHide = true
          var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&refActionId=" + scope.row.action_id
          var dp = '/dw/hyb/hyb_00044_excel?'
          void(window.open(dp + downfileParams + commonGetReqParam));
        } else { // 入库
          $.ajax({
            type: 'POST',
            timeout: 600000,
            headers: commonHeader,
            url: '/dw/hyb/hyb_00044_reupload',
            data: JSON.stringify({
              refActionId: scope.row.action_id
            }),
            success: function (res) {
              console.log(res)
              self.isHide = true
              if (res.resData.status) {
                self.$Message.success('入库成功')
              }
            },
            error: function (err) {
              // self.$Message.error('入库出错：', err);
              self.$alert("错误：" +  err,'提示',{
                confirmButtonText:'确定'
              })
              self.isHide = true
            }
          })
        }
      },
      // 点击checkbox
      selectionChange: function (arr) {
        this.selectionIndexArr = ''
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          var refActionId = arr[i].action_id
          this.selectionIndexArr += refActionId + ','
        }
        this.selectionIndexArr = this.selectionIndexArr.slice(0, this.selectionIndexArr.length - 1)
        console.log(this.selectionIndexArr.slice(0, this.selectionIndexArr.length - 1))
      },
      // 批量重新入库
      checkAllToLib: function () {
        var self = this
        self.isHide = false
        if (this.selectionIndexArr == '') {
          self.$Message.error('至少勾选一个选项！');
          return
        }
        $.ajax({
          type: 'POST',
          timeout: 600000,
          headers: commonHeader,
          url: '/dw/hyb/hyb_00044_reupload_batch',
          data: JSON.stringify({
            refActionId: this.selectionIndexArr
          }),
          success: function (res) {
            self.isHide = true
            if (res.success) {
              self.$Message.success('批量入库成功！')
            }
          },
          error: function (err) {
            self.isHide = true
            // self.$Message.error('入库出错：', err);
            self.$alert("错误：" +  err,'提示',{
              confirmButtonText:'确定'
            })
          }
        })
      },

      /**
       * 导出Excel文件
       */
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&tradeDate=" + this.formValidate.startdate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/gdh/gdh_00010_export?'
        void(window.open(dp + downfileParams));
      },
    }
  }
</script>

<style lang="less">
  #hyb00044RightArray table td:nth-child(2){
    color:green;
  }
  .iviewCard {
    min-height: 0;
  }

  .checkAllToLib {
    margin-bottom: 20px;
  }
</style>
