<template>
    <div class="mtsl00006" id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>融资融券标的清单
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
          </p>
          <div slot="content"  >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
              <div class="flexBox">
                <Form-item prop="startdate"
                           id="startDateForm" label="查询日期">
                  <Date-picker   id="startDate" type="date"
                                 placeholder="选择查询日期"
                                 v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item  label="选择类型" prop="trans">
                  <el-select multiple
                    style="width: 245px;"
                             size="small" clearable
                    v-model="formValidate.trans">
                    <el-option v-for="(item,index) in transList"
                            :value="item.key" :key="item.key"
                            :label="item.value"></el-option>
                  </el-select>
                </Form-item>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="融资融券标的清单  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．数据说明</b>
        <br>1)	本应用可查询时间起始范围为：2010/03/31-now
        <br>2)	本应用可查询T日数据的时点为：T日22:00后
        <br>3)	本应用限制最大查询时间区间为： 无限制
        <br>4)	证券查询范围：融资融券标的清单（融资、融券、担保品）
        <br>5)	交易平台：竞价系统
        <br><b>二．	单指标算法</b>
        <br>序号	展示字段	展示字段算法或公式
        <br>1	证券代码	融资、融券和担保品的证券代码
        <br>2	证券简称	融资、融券和担保品的证券简称

      </Modal>
      <!--头部logo-->
      <div class="tabTitle">
        <p v-if="activeName=='first'" id="infoTableList1" class="redtext listlength">{{infoTableList1}}</p>
        <p v-if="activeName=='second'" id="infoTableList2" class="redtext listlength">{{infoTableList2}}</p>
        <p v-if="activeName=='third'" id="infoTableList3" class="redtext listlength">{{infoTableList3}}</p>
          <div class="ss">
            <el-tabs v-model="activeName" @tab-click="tabClick">
              <el-tab-pane v-for="active in activeNameList" :label="active.label"
                           :key="active.name" :name="active.name">
                <el-table
                  :data="active.tableDataList"
                  border
                  style="width: 100%;">
                  <el-table-column  :formatter="formatterNumber" v-for="(item,index) in active.tableColumns"
                                   :key="item.field"
                                   :prop="item.field"
                                   :label="item.title"
                                   :align="item.align"
                                   :min-width="item.width">
                    <el-table-column :formatter="formatterNumber" v-for="(itemChild,index) in item.children"
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
          </div>

        <div v-if="activeName=='first'" class="pageModule">
          <Page :total="returnTotal" :current="returnN"
                :page-size="500" :page-size-opts=[500,1000]
                placement="top" show-sizer
                @on-page-size-change="tableChangeSize"
                @on-change="tableChange"></Page>
        </div>
        <div  v-if="activeName=='second'" class="pageModule">
          <Page :total="returnTota2" :current="returnN2"
                :page-size="500" :page-size-opts=[500,1000]
                placement="top" show-sizer
                @on-page-size-change="tableChangeSize2"
                @on-change="tableChange2"></Page>
        </div>
        <div  v-if="activeName=='third'"  class="pageModule">
          <Page :total="returnTota3" :current="returnN3"
                :page-size="500" :page-size-opts=[500,1000]
                placement="top" show-sizer
                @on-page-size-change="tableChangeSize3"
                @on-change="tableChange3"></Page>
        </div>
        <div class="exportBtn">
          <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
            <Icon type="ios-download-outline"></Icon>
            导出全部结果为XLSX文件
          </Button>
        </div>
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
    dateReg,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  // import {tableDataMtsl00006_01} from '../assets/js/jsonData.js';

  import {tableColumns22_1, tableColumns22_2, tableColumns22_3} from '../assets/js/MTSL_00006.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
    export default {
        name: "mtsl00006",
        props: [],
        components: {},
      data() {
        return {
          collapse: '1',
          //显示隐藏输入条件
          changeArrow: 'rightArrow',
          gutterValue: 16,
          leftPane: 19,
          rightPane: 5,
          isHide: true,
          //统计口径
          changeInfo: false,

          //分页信息
          returnTotal: 0,
          returnN: 1,
          dataArrayAll: [],
          pageSize: 500,

          //分页信息
          returnTota2: 0,
          returnN2: 1,
          dataArrayAll2: [],
          pageSize2: 500,

          //分页信息
          returnTota3: 0,
          returnN3: 1,
          dataArrayAll3: [],
          pageSize3: 500,

          infoTableList1:'',
          infoTableList2:'',
          infoTableList3:'',
          quStartdate:'',
          quTrans:[],
          //日期初始化
          formValidate: {
            startdate: new Date(initialDate()),
            trans: ['001','002','003']
          },
          ruleValidate: {
            startdate: [
              {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
            ]
          },
          t: '',

          //  tab页
          activeName:'first',
          //初始化表格信息

          activeNameList: [
            {
            name: 'first',
            label: '融资',
            tableColumns: tableColumns22_1,
            tableDataList: [],
          }, {
            label: '融券',
            name: 'second',
            tableColumns: tableColumns22_2,
            tableDataList: [],
          }, {
            label: '担保品',
            name: 'third',
            tableColumns: tableColumns22_3,
            tableDataList: [],
          }],
          transList: [
            {value: '融资', key: '001'},
            {value: '融券', key: '002'},
            {value: '担保品', key: '003'},
          ],
          // currentReportType: {
          //   trans: []
          // }
        }
      },
      watch: {},
      mounted() {
        $(window).on('keydown',function(e){
          if(e.keyCode == 13){
            e.preventDefault()
          }
        })
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
        // tab页点击
        tabClick:function (tab,ev) {
        },

        /**
         * 显示当前页  融资
         */
        tableChange: function (page) {
          this.returnN = page;
          // this.handleSubmit('formValidate',true, this.returnN, this.pageSize)
          this.activeNameData1(this.returnN, this.pageSize)
        },
        /**
         * 表格显示行数选择   融资
         */
        tableChangeSize: function (pageSize) {
          this.returnN = 1;
          this.pageSize = pageSize;
          // this.handleSubmit('formValidate',true , this.returnN, this.pageSize)
          this.activeNameData1(this.returnN, this.pageSize)
        },



        /**
         * 显示当前页  融券
         */
        tableChange2: function (page) {
          this.returnN2 = page;
          // this.handleSubmit('formValidate',true, this.returnN2, this.pageSize2)
          this.activeNameData2(this.returnN2, this.pageSize2)
        },


        /**
         * 表格显示行数选择  融券
         */
        tableChangeSize2: function (pageSize) {
          this.returnN2 = 1;
          this.pageSize2 = pageSize;
          // this.handleSubmit('formValidate',true, this.returnN2, this.pageSize2)
          this.activeNameData2(this.returnN2, this.pageSize2)
        },
        /**
         * 显示当前页  担保品                                                                                                                           当前页   担保品
         */
        tableChange3: function (page) {
          this.returnN3 = page;
          // this.handleSubmit('formValidate',true, this.returnN3, this.pageSize3);
          this.activeNameData3(this.returnN3, this.pageSize3)
        },
        /**
         * 表格显示行数选择  担保品
         */
        tableChangeSize3: function (pageSize) {
          this.returnN3 = 1;
          this.pageSize3 = pageSize;
          // this.handleSubmit('formValidate',true, this.returnN3, this.pageSize3)
          this.activeNameData3(this.returnN3, this.pageSize3)
        },
        /**
         * 显示隐藏左右
         */
        hideRightBox: function () {
          (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
          (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
          (this.gutterValue == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
          (this.changeArrow == 'rightArrow') ? this.changeArrow = 'leftArrow' : this.changeArrow = 'rightArrow';

        },
        /**
         * 设置fetch请求超时方法
         */
        _fetch: function (fetch_promise, timeout) {
          var abort_fn = null;
          var abortInfo = this;
          //这是一个可以被reject的promise
          var abort_promise = new Promise(function (resolve, reject) {
            abort_fn = function () {
              $("#loadBox").addClass("hide");
              abortInfo.isHide = true;
              abortInfo.$Message.warning('查询超时！请重试！');
            };
          });
          //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
          var abortable_promise = Promise.race([
            fetch_promise,
            abort_promise
          ]);
          abortInfo.t = setTimeout(function () {
            abort_fn();
          }, timeout);
          return abortable_promise;
        },
        /**
         * 查询功能
         */
        handleSubmit(name,isPageClick,returnNumS,pageSizeS) {
          this.$refs[name].validate((valid) => {
            if (this.isHide == false) {
              return;
            }
            const {startdate} = this.formValidate;
            //日期格式验证
            var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
            var startDateA = $(".ivu-input:eq(0)").val();

            if (r.test(startDateA) == false) {
              this.$Message.error('请输入正确查询日期！');
              $("#startDateForm").addClass("ivu-form-item-error");
              return;
            }
            $("#startDateForm").removeClass("ivu-form-item-error");
            //手动输入不能大于当前日期
            if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
              this.$Message.error('查询日期不能大于当前日期！');
              $("#startDateForm").addClass("ivu-form-item-error");
              return;
            }
            $("#startDateForm").removeClass("ivu-form-item-error");
            var startdateValue = this.formValidate.startdate;

            if($.isEmptyObject(this.formValidate.trans)){
              this.$Message.error('选择类型不能为空!');
              return
            }

            //验证
            if (valid) {
              this.$Message.success('提交成功!请等待~');
              if(!isPageClick) this.returnN = 1;
              this.publicPagination(returnNumS, pageSizeS, true);
            } else {
              this.$Message.error('查询失败!');
            }
          })
        },
        /**
         * 分页、查询功能
         */

        activeNameData1:function (pages,rows) {
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.infoTableList1 = '';
          this.quStartdate =  this.formValidate.startdate.format('yyyy-MM-dd');

          this.searchParams = {
            "tradeDate": this.quStartdate,
            "userId": srcUseridA,
            "userName": srcUsernameA,
            // "reQuery": statics,
            "pageNo": pages,
            "pageSize": rows,
            "businessId": "MTSL_00006",
          };
          //声明加载中
          $("#loadBox").removeClass("hide");
          //接口请求处理
          const url = '/dw/mtsl/mtsl00006for1';
          // const url = '/45/mtsl/mtsl00006';
          this.tableDataList = [];
          this.returnTotal = 0;
          this.isHide = false;

          this._fetch(fetch(url, {
            method: "POST",
            body: JSON.stringify(this.searchParams),
            mode: 'cors',
            headers: commonHeader
          }), 600000).then(function (response) {
            return response.json()
          }, function (error) {
            $("#loadBox").addClass("hide");
            this.$Message.error('系统繁忙，刷新页面!');
            this.isHide = true;
          }).then(data => {
            if (this.t != '') {
              clearTimeout(this.t);
            }
            this.isHide = true;
            var rtnStatic = data.success;
            var dataError = data.message;
            if (rtnStatic == false) {
              $("#loadBox").addClass("hide");
              // this.$Message.warning("查询出错" + dataError);
              this.$alert("错误" + dataError,'错误',{
                confirmButtonText:'确定',
                type:'error'
              })
              $("#exportCurrent").attr("disabled");
            } else {
              let dataResponse1 = data.resData.data;
              let datalength1 =data.resData.totalCount;
              if (dataResponse1.length == 0){
                $("#loadBox").addClass("hide");
                this.$Message.warning('查询无数据！');
                $("#exportCurrent").attr("disabled");
              } else {
                this.dealitems1 = datalength1;
                this.returnTotal = datalength1;  // 分页

                this.activeNameList[0].tableDataList = dataResponse1;

                $("#exportCurrent").removeAttr("disabled");
                this.isHide = true;
                //查询结果提示变化1
                this.infoTableList1 = "查询结果共 " + this.dealitems1 + " 条记录";

                //隐藏加载中
                $("#loadBox").addClass("hide");
              }
            }
          })



        },
        activeNameData2:function (pages,rows) {
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.infoTableList2 = '';
          this.quStartdate =  this.formValidate.startdate.format('yyyy-MM-dd');

          this.searchParams = {
            "tradeDate": this.quStartdate,
            "userId": srcUseridA,
            "userName": srcUsernameA,
            // "reQuery": statics,
            "pageNo": pages,
            "pageSize": rows,
            "businessId": "MTSL_00006",
          };
          //声明加载中
          $("#loadBox").removeClass("hide");
          //接口请求处理
          const url = '/dw/mtsl/mtsl00006for2';
          // const url = '/45/mtsl/mtsl00006';
          this.tableDataList = [];
          this.returnTota2 = 0;
          this.isHide = false;

          this._fetch(fetch(url, {
            method: "POST",
            body: JSON.stringify(this.searchParams),
            mode: 'cors',
            headers: commonHeader
          }), 600000).then(function (response) {
            return response.json()
          }, function (error) {
            $("#loadBox").addClass("hide");
            this.$Message.error('系统繁忙，刷新页面!');
            this.isHide = true;
          }).then(data => {
            if (this.t != '') {
              clearTimeout(this.t);
            }
            this.isHide = true;
            var rtnStatic = data.success;
            var dataError = data.message;
            if (rtnStatic == false) {
              $("#loadBox").addClass("hide");
              // this.$Message.warning("查询出错" + dataError);
              this.$alert("查询出错" + dataError,'提示',{
                confirmButtonText:'确定'
              })
              $("#exportCurrent").attr("disabled");
            } else {
              let dataResponse1 = data.resData.data;
              let datalength1 =data.resData.totalCount;
              if (dataResponse1.length == 0){
                $("#loadBox").addClass("hide");
                this.$Message.warning('查询无数据！');
                $("#exportCurrent").attr("disabled");
              } else {
                this.dealitems2 = datalength1;
                this.returnTota2 = datalength1;  // 分页

                this.activeNameList[1].tableDataList = dataResponse1;

                $("#exportCurrent").removeAttr("disabled");
                this.isHide = true;
                //查询结果提示变化1
                this.infoTableList2 = "查询结果共 " + this.dealitems2 + " 条记录";

                //隐藏加载中
                $("#loadBox").addClass("hide");
              }
            }
          })



        },
        activeNameData3:function (pages,rows) {
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.infoTableList3 = '';
          this.quStartdate =  this.formValidate.startdate.format('yyyy-MM-dd');

          this.searchParams = {
            "tradeDate": this.quStartdate,
            "userId": srcUseridA,
            "userName": srcUsernameA,
            // "reQuery": statics,
            "pageNo": pages,
            "pageSize": rows,
            "businessId": "MTSL_00006",
          };
          //声明加载中
          $("#loadBox").removeClass("hide");
          //接口请求处理
          const url = '/dw/mtsl/mtsl00006for3';
          // const url = '/45/mtsl/mtsl00006';
          this.tableDataList = [];
          this.returnTota3 = 0;
          this.isHide = false;

          this._fetch(fetch(url, {
            method: "POST",
            body: JSON.stringify(this.searchParams),
            mode: 'cors',
            headers: commonHeader
          }), 600000).then(function (response) {
            return response.json()
          }, function (error) {
            $("#loadBox").addClass("hide");
            this.$Message.error('系统繁忙，刷新页面!');
            this.isHide = true;
          }).then(data => {
            if (this.t != '') {
              clearTimeout(this.t);
            }
            this.isHide = true;
            var rtnStatic = data.success;
            var dataError = data.message;
            if (rtnStatic == false) {
              $("#loadBox").addClass("hide");
              // this.$Message.warning("查询出错" + dataError);
              this.$alert("查询出错" + dataError,'提示',{
                confirmButtonText:'确定'
              })
              $("#exportCurrent").attr("disabled");
            } else {
              let dataResponse1 = data.resData.data;
              let datalength1 =data.resData.totalCount;
              if (dataResponse1.length == 0){
                $("#loadBox").addClass("hide");
                this.$Message.warning('查询无数据！');
                $("#exportCurrent").attr("disabled");
              } else {
                this.dealitems3 = datalength1;
                this.returnTota3 = datalength1;  // 分页

                this.activeNameList[2].tableDataList = dataResponse1;

                $("#exportCurrent").removeAttr("disabled");
                this.isHide = true;
                //查询结果提示变化1
                this.infoTableList3 = "查询结果共 " + this.dealitems3 + " 条记录";

                //隐藏加载中
                $("#loadBox").addClass("hide");
              }
            }
          })



        },
        publicPagination(pages, rows, statics,) {
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          this.infoTableList1 = '';
          this.infoTableList2 = '';
          this.infoTableList3 = '';

          //查询传送的参数
          this.quStartdate =  this.formValidate.startdate.format('yyyy-MM-dd');
          this.quTrans =  this.formValidate.trans.toString();
          this.searchParams = {
            "tradeDate": this.quStartdate,
            "collType": this.quTrans,

            "userId": srcUseridA,
            "userName": srcUsernameA,
            // "reQuery": statics,
            "pageNo": pages,
            "pageSize": rows,
            "businessId": "MTSL_00006",
          };
          //声明加载中
          $("#loadBox").removeClass("hide");
          //接口请求处理
          const url = '/dw/mtsl/mtsl00006';
          // const url = '/45/mtsl/mtsl00006';
          this.tableDataList = [];
          this.returnTotal = 0;
          this.returnTota2 = 0;
          this.returnTota3 = 0;
          this.isHide = false;
          this._fetch(fetch(url, {
            method: "POST",
            body: JSON.stringify(this.searchParams),
            mode: 'cors',
            headers: commonHeader
          }), 600000).then(function (response) {
            return response.json()
          }, function (error) {
            $("#loadBox").addClass("hide");
            this.$Message.error('系统繁忙，刷新页面!');
            this.isHide = true;
          }).then(data => {
            if (this.t != '') {
              clearTimeout(this.t);
            }
            ;
            this.isHide = true;
            //取数据
            var rtnStatic = data.success;
            var dataError = data.message;
            if (rtnStatic == false) {
              $("#loadBox").addClass("hide");
              // this.$Message.warning("查询出错" + dataError);
              this.$alert("查询出错" + dataError,'提示',{
                confirmButtonText:'确定'
              })
              $("#exportCurrent").attr("disabled");
            } else {
              let dataResponse1 = data.resData[0].resData == null ? [] :data.resData[0].resData.data;
              let dataResponse2 = data.resData[1].resData == null ? [] :data.resData[1].resData.data;
              let dataResponse3 = data.resData[2].resData == null ? [] :data.resData[2].resData.data;
              let datalength1 = data.resData[0].resData == null ? 0 :data.resData[0].resData.totalCount;
              let datalength2 = data.resData[1].resData == null ? 0:data.resData[1].resData.totalCount;
              let datalength3 = data.resData[2].resData == null ? 0:data.resData[2].resData.totalCount;
              if (dataResponse1.length == 0 && dataResponse2.length == 0 && dataResponse3.length == 0) {
                $("#loadBox").addClass("hide");
                this.$Message.warning('查询无数据！');
                $("#exportCurrent").attr("disabled");
              } else {
                this.dealitems1 = datalength1;
                this.dealitems2 = datalength2;
                this.dealitems3 = datalength3;

                this.returnTotal = datalength1;  // 分页
                this.returnTota2 = datalength2;
                this.returnTota3 = datalength3;

                this.activeNameList[0].tableDataList = dataResponse1;
                this.activeNameList[1].tableDataList = dataResponse2;
                this.activeNameList[2].tableDataList = dataResponse3;

                $("#exportCurrent").removeAttr("disabled");
                this.isHide = true;
                //查询结果提示变化1
                this.infoTableList1 = "查询结果共 " + this.dealitems1 + " 条记录";
                this.infoTableList2 = "查询结果共 " + this.dealitems2 + " 条记录";
                this.infoTableList3 = "查询结果共 " + this.dealitems3 + " 条记录";
                //隐藏加载中
                $("#loadBox").addClass("hide");
              }
            }
          });
        },
        /**
         * 导出Excel文件
         */
        exportData() {
          let typeVal = '';
          if(this.activeName === 'first'){
            typeVal = '1'
          }else if(this.activeName === 'second'){
            typeVal = '2';
          }else {
            typeVal = '3'
          }
          var downfileParams = "userId=" +
            srcUseridA + "&userName=" + srcUsernameA +
            "&signature=" + signatureA +
            "&Authorization=" + AuthorizationA + "&type="+typeVal+
            "&tradeDate=" + this.quStartdate +
          "&collType="+this.quTrans;

          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);
          var dp = 'dw/download/mtsl00006export?'
          void(window.open(dp + downfileParams + commonGetReqParam));
        },

      },
    }
</script>

<style lang="less">
    .mtsl00006 {

    }
    .el-tabs__nav-wrap {
      width: 100%;
    }
</style>
