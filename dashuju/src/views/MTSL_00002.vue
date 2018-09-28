<template>
  <section id="sixFiles">
    <!--头部logo-->
    <header></header>
    <!--查询条件收起与展示-->
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>融资融券概貌
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="开始日期">
                <Date-picker id="startDate" type="date" placeholder="选择起始日期" v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束日期">
                <Date-picker id="endDate" type="date" placeholder="选择截止日期" v-model="formValidate.enddate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit(formValidate)">查询</Button>
              </div>
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <!--全屏加载图标-->
    <Spin id="loadBox" fix class="loadBox" v-if="loadingIcon">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <!--统计口径-->
    <Modal id="lookInfoPop" title="融资融券概貌  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
      <b>一．数据说明</b>
      <br>1)	本应用可查询时间起始范围为：2010/03/31-now
      <br>2)	本应用可查询T日数据的时点为：T日22:00后
      <br>3)	本应用限制最大查询时间区间为： 无限制
      <br>4)	证券查询范围：融资融券担保品标的 （股票、债券、基金、权证）
      <br>5)	交易平台：竞价系统
      <br><b>二．	单指标算法</b>
      <br>1)担保品市值	统计区间最后一个交易日的担保品市值合计
      <br>2)融资余额	统计区间最后一个交易日的融资余额合计
      <br>3)融券余额	统计区间最后一个交易日的融券余额合计
      <br>4)开仓金额	统计区间的开仓金额合计
      <br>5)平仓金额	统计区间的平仓金额合计
      <br>6)日均新增开户数	统计区间的每日开户数合计除以统计区间的交易日期天数。
      <br>7)开户总数	统计区间的每日开户数合计
      <br>8)维持担保比例	统计区间最后一个交易日的维持担保比例。等于担保品市值/(融资余额+融券余额)
      <br>表2：
      <br>序号	展示字段	展示字段算法或公式
      <br>1)证券品种	固定分为A股、基金、债券和合计。
      <br>2)融资买入金额	统计区间融资买入金额合计
      <br>3)买券还款金额	统计区间买券还款金额合计
      <br>4)融资平仓金额	统计区间融资平仓金额合计
      <br>5)融资合计	统计区间的融资买入金额+买券还款金额+融资平仓金额
      <br>6)融券卖出金额	统计区间融券卖出金额合计。
      <br>7)买券还券金额	统计区间买券还券金额合计
      <br>8)融券平仓金额	统计区间融券平仓金额合计
      <br>9)融券合计	统计区间融券卖出金额+买券还券金额+融券平仓金额
      <br>10)信用交易合计	融资合计+信用交易合计

    </Modal>
    <!--tab-->
    <div class="tabTitle">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="active in activeNameList" :label="active.label" :name="active.name" :key="active.name">
          <el-button type="text" class="detailHref" v-if="active.name!=='first'&&active.name!=='fifth'&&detailBtn==true"
                     @click="detailJump(active.href)">查看明细表格</el-button>
          <el-table
            :data="active.tableDataList"
            border
            style="width: 100%;">
            <el-table-column :formatter="formatterNumber"  v-for="(item,index) in active.tableColumns"
             :key="item.field"
             :prop="item.field"
             :label="item.title"
             :align="item.align"
             :min-width="item.minWidth">
              <el-table-column :formatter="formatterNumber"  v-for="(itemChild,index) in item.children"
               :key="itemChild.field"
               :prop="itemChild.field"
               :label="itemChild.title"
               :align="itemChild.align"
               :min-width="itemChild.width">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!--<ul v-if="activeName==='fourth'" class="checkType">-->
        <!--<li>-->
          <!--<el-checkbox-group v-model="accountType" @change="changeAccount">-->
            <!--<el-checkbox v-for="item in accountTypeList" :label="item.key" :key="item.key" >{{item.name}}</el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="pageModule">-->
        <!--&lt;!&ndash;<Page :total="returnTotal" :current="pageNumber" :page-size="pageSize" :page-size-opts=[500,1000] placement="top" show-sizer @on-page-size-change="pageChangeSize" @on-change="pageChange" v-if="activeName=='first'||activeName=='sixth'"></Page>&ndash;&gt;-->
        <!--<Page :total="returnTotal" :current="pageNumber" :page-size="pageSize" :page-size-opts=[500,1000] placement="top" show-sizer v-if="activeName=='first'||activeName=='sixth'"></Page>-->
      <!--</div>-->
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" :disabled="isExport">
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
    </div>
  </section>
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
    initialDate,
    threeReqPath,
    downloadReqPath,
    commonHeader,
    initialMonth,
    commonGetReqParam,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import '../theme/sixCommon.less';
  import {tableColumns_MTSL02_1, tableColumns_MTSL02_2, tableColumns_MTSL02_3, tableColumns_MTSL02_4, tableColumns_MTSL02_5, tableColumns_MTSL02_6} from '../assets/js/MTSL_00002.js';
  import ElButton from "element-ui/packages/button/src/button";
 export default {
   components: {ElButton},
   data() {
     var startDate = (rule, value, callback) => {
       value = $(".ivu-input:eq(0)").val();
       let startdateValue = this.formValidate.startdate;
       let enddateValue = this.formValidate.enddate;
       if (!value) {
         return callback(new Error('请选择开始日期！'))
       } else if (!((/^((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-8])))/).test(value))) {
         return callback(new Error('请输入正确的开始日期！'))
       } else if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
         // this.$Message.error('结束日期不能小于开始日期！');
         return callback(Error('开始日期不能大于结束日期！'));
       } else {
         callback();
       }
     };
     var endDate = (rule, value, callback) => {
       value = value = $(".ivu-input:eq(1)").val();
       let startdateValue = this.formValidate.startdate;
       let enddateValue = this.formValidate.enddate;
       if (!value) {
         return callback(new Error('请选择开始日期！'))
       } else if (!((/^((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-8])))/).test(value))) {
         return callback(new Error('请输入正确的开始日期！'))
       } else if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
         // this.$Message.error('结束日期不能小于开始日期！');
         return callback(new Error('结束日期不能小于开始日期！'))
       } else {
         callback();
       }
     };
      return {
        // 查询日期选择范围
        dateRange: {
          disabledDate (date) {
            return date.valueOf() > Date.now();
          }
        },
        collapse: '1',
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        // 保存查询条件
        submitValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        // 查询条件验证
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', validator:startDate, trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', validator:endDate, trigger: 'change'}
          ]
        },
        // 加载图标是否显示
        loadingIcon: false,
        // 统计口径弹框是否显示
        changeInfo: false,
        // 是否显示明细按钮
        detailBtn: false,
        // tab默认展示第一个
        activeName: 'first',
        activeNameList: [{
          name: 'first',
          label: '融资融券概貌',
          tableColumns: tableColumns_MTSL02_1,
          tableDataList: [],
          href: '',
        }, {
          label: '融资融券交易情况',
          name: 'second',
          tableColumns: tableColumns_MTSL02_2,
          tableDataList: [],
          href: 'MTSL_00003',
        }, {
          label: '融资融券余额情况',
          name: 'third',
          tableColumns: tableColumns_MTSL02_3,
          tableDataList: [],
          href: 'MTSL_00005',
        }, {
          label: '分账户融资融券情况',
          name: 'fourth',
          tableColumns: tableColumns_MTSL02_4,
          tableDataList: [],
          href: 'MTSL_00010',
        }, {
          label: '担保品交易情况',
          name: 'fifth',
          tableColumns: tableColumns_MTSL02_5,
          tableDataList: [],
          href: '',
        }, {
          label: '违约情况',
          name: 'sixth',
          tableColumns: tableColumns_MTSL02_6,
          tableDataList: [],
          href: 'MTSL_00009',
        }],
        // 账户自然人
        // accountType: ['1', '2', '3', '3', '4', '5'],
        // accountTypeList: [{
        //   name: '50万以下',
        //   key: '1'
        // }, {
        //   name: '50-300万',
        //   key: '2'
        // }, {
        //   name: '300万以下',
        //   key: '3'
        // }, {
        //   name: '一般法人',
        //   key: '4'
        // }, {
        //   name: '专业机构',
        //   key: '5'
        // }],
        // 分页初始化
        // returnTotal: 0,
        // pageNumber: 1,
        // pageSize: 500,
        timeout: '',
        // 导出按钮
        isExport: true,
        // 保存概貌和违约情况的分页总数及当前页
        // totalCountFirst: 0,
        // totalCountFifth: 0,
        // pageNumberFirst: 1,
        // pageNumberFifth: 1,
        // pageSizeFirst: 500,
        // pageSizeFifth: 500,
      }
    },
   methods: {
     // 列：格式化字符
     formatterNumber:function (row,col,cellValue) {

       return formatTbousandth(cellValue)
     },
     _fetch (fetch_promise, timeout) {
       // 请求超时方法
       let abort_fn = null;
       // let abortInfo = this;
       //这是一个可以被reject的promise
       let abort_promise = new Promise(function (resolve, reject) {
         abort_fn = function () {
           this.loadingIcon = false;
           this.$Message.warning('查询超时！请重试！');
         };
       });
       //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
       let abortable_promise = Promise.race([
         fetch_promise,
         abort_promise
       ]);
       this.timeout = setTimeout(function () {
         abort_fn();
       }, timeout);
       return abortable_promise;
     },
     handleSubmit (data) {
       // 查询功能
       this.$refs['formValidate'].validate((valid) => {
         if (valid) {
           // 加载弹出层显示
           this.loadingIcon = true;
           // 当前页码
           this.pageNumber = 1;
           // 保存查询条件
           if (data) {
             this.submitValidate = {
               startdate: data.startdate.format('yyyy-MM-dd'),
               enddate: data.enddate.format('yyyy-MM-dd')
             }
           }
           this.$Message.success('提交成功!请等待~');
           let searchParams = {
             "startDate": this.submitValidate.startdate,
             "endDate": this.submitValidate.enddate,
             "userId": srcUseridA,
             "userName": srcUsernameA,
             // "reQuery": statics,
             "pageNo": 1,
             "pageSize": 500,
             "businessId": "MTSL_00002",
           };
           this._fetch(fetch('/dw/mtsl/mtsl00002', {
             method: "POST",
             body: JSON.stringify(searchParams),
             mode: 'cors',
             headers: commonHeader
           }), 600000)
             .then((res) => {
               return res.json()
             }, function (err) {
               this.loadingIcon = false;
               this.$Message.warning('查询超时,请重试！');
             })
             .then(data => {
               if (this.timeout != '') {
                 clearTimeout(this.timeout);
               }
               // 获取数据
               if (data.success == true) {
                 // 明细按钮出现
                 this.detailBtn = true;
                 data.resData.forEach((item, index) => {
                   // 请求的数据放到对应的表格里
                   if (index == 0) {
                     this.activeNameList[index].tableDataList = item.resData.data;
                   } else if (index == 1) {
                     item.resData.result.forEach((childitem, key) => {
                       this.activeNameList[index+key].tableDataList = childitem.data;
                     })
                   } else if (index == 2) {
                     this.activeNameList[5].tableDataList = item.resData.data;
                   }
                 })
                 if (this.activeNameList[0].tableDataList.length > 0||this.activeNameList[1].tableDataList.length > 0||this.activeNameList[2].tableDataList.length > 0 ||this.activeNameList[3].tableDataList.length > 0 ||this.activeNameList[4].tableDataList.length > 0||this.activeNameList[5].tableDataList.length > 0) {
                   this.isExport = false
                 } else {
                   this.$Message.warning('查询无数据');
                   this.isExport = true
                 }
                 // 保存概貌和违约情况的总数据数
                 if (this.activeName == 'first') {
                   this.returnTotal = data.resData[0].resData.totalCount;
                 } else if (this.activeName == 'sixth') {
                   this.returnTotal = data.resData[2].data.totalCount;
                 }
                 this.totalCountFirst = data.resData[0].resData.totalCount;
                 this.totalCountFifth = data.resData[2].resData.totalCount;
                 this.loadingIcon = false;
               } else {
                 this.loadingIcon = false;
                 this.activeNameList.forEach((item, index) => {
                   this.activeNameList[index].tableDataList = [];
                 })
                 this.returnTotal = 0;
                 this.$alert("错误" + data.message,'错误',{
                   confirmButtonText:'确定',
                   type:'error'
                 })
               }
             })
             .catch((err) => {
               this.loadingIcon = false;
               this.$Message.warning("系统繁忙，请稍后再试!");
             });
         } else {
           return false;
         }
       })
     },
     // tabClick () {
     //   // 点击Tab触发
     //   if (this.activeName == 'first') {
     //     // 显示概貌的分页情况
     //     this.returnTotal = this.totalCountFirst;
     //     this.pageNumber = this.pageNumberFirst;
     //     this.pageSize = this.pageSizeFirst;
     //   } else if (this.activeName == 'sixth') {
     //     // 显示违约情况的分页情况
     //     this.returnTotal = this.totalCountFifth;
     //     this.pageSize = this.pageSizeFifth;
     //     this.pageNumber = this.pageNumberFifth;
     //   }
     // },
     detailJump (url) {
       window.open('#/'+url+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA+'&startdate='+this.submitValidate.startdate+'&enddate='+this.submitValidate.enddate)
     },
     // changeAccount () {
     //   // 选择投资人范围
     //   this.pageChange(this.pageNumber)
     // },
     exportData() {
       var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +
         "&endDate=" + this.submitValidate.enddate + '&startDate=' + this.submitValidate.startdate;
       void(window.open('/dw/download/mtsl00002export?' + downfileParams +commonGetReqParam));
     },
     // pageChange (val) {
     //   // 翻页触发
     //   // 加载弹出层显示
     //   this.loadingIcon = true;
     //   // 当前页码
     //   this.pageNumber = val;
     //   let pageType = '';
     //   if (this.activeName == 'first') {
     //     pageType = 'violate'
     //     // 保存概貌当前页码
     //     this.pageNumberFirst = val;
     //   } else if (this.activeName == 'sixth') {
     //     pageType = 'generalPicture'
     //     // 保存违约情况当前页码
     //     this.pageNumberFifth = val;
     //   }
     //   // 传递参数
     //   let searchParams = {
     //     "startDate": this.submitValidate.startdate,
     //     "endDate": this.submitValidate.enddate,
     //     "userId": srcUseridA,
     //     "userName": srcUsernameA,
     //     // "reQuery": statics,
     //     "pageNo": val,
     //     "pageSize": this.pageSize,
     //     "businessId": "MTSL_00002",
     //     "pageType": pageType,
     //     // "inputTypeCode": this.accountType.toString(),
     //   };
     //   this._fetch(fetch('/dw/mtsl/mtsl00002page', {
     //     method: "POST",
     //     body: JSON.stringify(searchParams),
     //     mode: 'cors',
     //     headers: commonHeader
     //   }), 600000)
     //     .then((res) => {
     //       return res.json()
     //     }, function (err) {
     //       this.loadingIcon = false;
     //       this.$Message.warning('查询超时,请重试！');
     //     })
     //     .then(data => {
     //       if (this.timeout != '') {
     //         clearTimeout(this.timeout);
     //       }
     //       // 获取数据
     //       if (data.success == true) {
     //         if (data.resData.data.length > 0 ) {
     //           if (this.activeName == 'first') {
     //             this.activeNameList[0].tableDataList == data.resData.data;
     //           } else if (this.activeName == 'sixth') {
     //             this.activeNameList[5].tableDataList == data.resData.data;
     //           }
     //         } else {
     //           this.$Message.warning('查询无数据');
     //         }
     //         this.loadingIcon = false;
     //       } else {
     //         this.loadingIcon = false;
     //         if (this.activeName == 'first') {
     //           this.activeNameList[0].tableDataList == [];
     //         } else if (this.activeName == 'sixth') {
     //           this.activeNameList[5].tableDataList == [];
     //         }
     //         this.returnTotal = 0;
     //         this.$alert("翻页失败，" + data.message,'提示',{
     //           confirmButtonText:'确定'
     //         })
     //       }
     //     })
     //     .catch((err) => {
     //       this.loadingIcon = false;
     //       this.$Message.warning("系统繁忙，请稍后再试!");
     //     });
     // },
     // pageChangeSize (val) {
     //   // 改变每页数据量触发
     //   // this.pageSize = val;
     //   this.pageNumber = val;
     //   if (this.activeName == 'first') {
     //     // 保存概貌每页数量
     //     this.pageSizeFirst = val;
     //   } else if (this.activeName == 'sixth') {
     //     // 保存违约情况每页数量
     //     this.pageSizeFifth = val;
     //   }
     //   this.pageChange(1);
     // },
   },
  }
</script>

<style lang="less">
  /*.ivu-collapse {*/
    /*border: none;*/
    /*background: #fff;*/
    /*.ivu-collapse-header {*/
      /*background: #fff;*/
      /*padding: 20px 31px;*/
      /*border-bottom: none;*/
      /*.ivu-icon-arrow-right-b {*/
        /*display: none;*/
      /*}*/
      /*p {*/
        /*line-height: 30px;*/
        /*.lookInfo {*/
          /*margin-top: 0;*/
          /*margin-bottom: 0;*/
        /*}*/
      /*}*/
      /*.showButton {*/
        /*float: right;*/
        /*font-weight: normal;*/
        /*font-size: 13px;*/
        /*color: #3D83B5;*/
        /*i {*/
          /*margin-left: 5px;*/
        /*}*/
      /*}*/
    /*}*/
    /*.ivu-collapse-content {*/
      /*background: #F5F8FA;*/
      /*margin: 0 30px;*/
      /*padding: 15px 0;*/
      /*.ivu-form-item {*/
        /*margin-bottom: 0;*/
      /*}*/
      /*.ivu-collapse-content-box {*/
        /*padding-top: 0;*/
      /*}*/
    /*}*/
  /*}*/
  /*.ivu-btn-primary {*/
    /*background-color: #3D83B5;*/
    /*border-color: #3D83B5;*/
  /*}*/
  /*!*.ivu-btn-primary:hover {*!*/
    /*!*background-color: #39f;*!*/
    /*!*border-color: #39f;*!*/
  /*!*}*!*/
  /*!*.ivu-btn-primary:active {*!*/
    /*!*background-color: #288bef;*!*/
    /*!*border-color: #288bef;*!*/
  /*!*}*!*/
  /*.tabTitle {*/
    /*padding: 0 30px;*/
    /*.el-tabs__header {*/
      /*margin: 0;*/
    /*}*/
    /*.el-tabs__header {*/
      /*margin: 15px 0;*/
    /*}*/
  /*}*/
  /*.pageModule {*/
    /*float: right;*/
    /*width: inherit;*/
    /*.ivu-page-options-sizer {*/
      /*margin-right: 0;*/
    /*}*/
  /*}*/
  /*.exportBtn {*/
    /*float: left;*/
  /*}*/
  /*.pageModule {*/
    /*margin-top: 10px;*/
  /*}*/
  /*.el-tabs--bottom .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs__item:nth-child(2) {*/
    /*padding-left: 0!important;*/
  /*}*/
  /*.el-table thead.has-gutter th {*/
    /*background-color: #F5F8FA;*/
    /*color: #000;*/
    /*text-align: center;*/
  /*}*/
  /*.el-table--border td, .el-table--border th{*/
    /*border-right: 3px solid #fff;*/
  /*}*/
  /*.el-table--border th, .el-table__fixed-right-patch {*/
    /*border-bottom: 3px solid #fff;*/
  /*}*/
  /*.el-table--border .has-gutter td:nth-last-of-type(2), .el-table--border .has-gutter th:nth-last-of-type(2) {*/
    /*border-right: 3px solid #fff;;*/
  /*}*/
  /*.el-table td, .el-table th {*/
    /*padding: 3px 0;*/
    /*font-weight: 100;*/
  /*}*/
  /*.el-table__header-wrapper, .el-table__body-wrapper, .el-table__footer-wrapper {*/
    /*overflow-y: scroll;*/
  /*}*/
  /*.el-table__body-wrapper {*/
    /*height: 550px;*/
  /*}*/
  /*::-webkit-scrollbar {*/
    /*width: 7px;*/
    /*height: 7px;*/
  /*}*/
  /*.ivu-page-item-active{*/
    /*background-color: #3D83B5;*/
    /*border-color: #3D83B5;*/
  /*}*/
  /*.el-tabs__active-bar {*/
    /*background-color: #3D83B5 !important;*/
  /*}*/

  /*.el-tabs__item.is-active {*/
    /*color: #3D83B5 !important;*/
  /*}*/
  /*.detailHref {*/
    /*span {*/
      /*color: #3D83B5;*/
    /*}*/
  /*}*/
</style>
