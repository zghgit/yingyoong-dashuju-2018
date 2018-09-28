<template>
    <div class="mtsl00005" id="fifteenCommon">
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>融资融券余额余量
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
          </p>
          <div slot="content"  >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm" label="开始日期" :label-width="85">
                  <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                               v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item prop="enddate" id="endDateForm" label="结束日期" :label-width="110">
                  <Date-picker id="endDate" type="date" placeholder="选择结束日期"
                               v-model="formValidate.enddate"
                               class="datePickerWidth"></Date-picker>
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
      <Modal id="lookInfoPop" title="融资融券余额余量  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．数据说明</b>
        <br>1)	本应用可查询时间起始范围为：2010/03/31-now
        <br>2)	本应用可查询T日数据的时点为：T日22:00后
        <br>3)	本应用限制最大查询时间区间为： 无限制
        <br>4)	证券查询范围：融资融券余额余量（股票、债券、基金、权证等）
        <br>5)	交易平台：竞价系统
        <br><b>二．	单指标算法</b>
        <br>序号	展示字段	展示字段算法或公式
        <br>1.	证券品种	固定分为A股、基金、债券和合计。
        <br>2.	融资余额	统计区间最后一个交易日该类证券的融资余额合计。
        <br>3.	融资余额占流通市值比例	统计区间最后一个交易日该类证券的融资余额合计/该类证券的流通股市值合计。
        <br>4.	融券余额	统计区间最后一个交易日该类证券的融券余额合计。
        <br>5.	融券余额占流通市值比例	统计区间最后一个交易日该类证券的融券余额合计/该类证券的流通股市值合计。
        <br>6.	融券余量	统计区间最后一个交易日该类证券的融券余量合计
        <br>7.	融券余量占流通股数比例	统计区间最后一个交易日该类证券的融券余量合计/该类证券的流通股数合计
        <br>8.	两融余额	统计区间最后一个交易日该类证券的融资余额合计+融券余额合计
        <br>9.	两融余额占流通市值比例	统计区间最后一个交易日该类证券的融资余额合计+融券余额合计/该类证券的流通股市值合计

      </Modal>
      <div class="tableBox tab">
        <p id="infoTableList" class="redtext listlength" style="width: 100%;"></p>
        <el-checkbox-group v-model="checkedTypes"
                           @change="handleChangeTypesChange">
          <el-checkbox v-for="(city,index) in types"
                       :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <el-table
          :data="tableData21"
          border
          style="width: 100%">
          <el-table-column  :formatter="formatterNumber" width="200" prop="arr"  label="明细数据超链接" align="center">
            <template scope="scope">
              <a v-for="item in list" class="df"
                 @click="datailLinkClick(scope.row.sec_type_lev_desc, item)"
                 >{{ item }}</a>
            </template>
          </el-table-column>
          <template v-for="(item,index) in tableColumns_mtsl00005">
            <el-table-column
              :min-width="item.width"
              :formatter="formatterNumber"
              :key="item.field"
              :prop="item.field"
              :label="item.title"
              :align="item.align"
              :width="item.width">
            </el-table-column>
          </template>
        </el-table>
        <div class="pageModule">
          <Page :total="returnTotal" :current="returnN" :page-size="500"
                :page-size-opts=[500,1000] placement="top"
                show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
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
    commonGetReqParam,
    dateReg,
    jump2NewPage,
    getUrlDate,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns_mtsl00005} from '../assets/js/MTSL_00005.js';

  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
    export default {
        name: "mtsl00005",
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
            //初始化表格信息
            tableColumns_mtsl00005: tableColumns_mtsl00005,
            tableData21: [],
            //分页信息
            returnTotal: 0,
            returnN: 1,
            dataArrayAll: [],
            pageSize: 500,
            secTypeLevDesc:'',
            quStartdate:'',
            quEnddate:'',

            //日期初始化
            formValidate: {
              startdate: new Date(getUrlDate(1,initialDate())),
              enddate: new Date(getUrlDate(2,initialDate())),
              numberEnd:'',
            },
            ruleValidate: {
              startdate: [
                {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
              ],
              enddate:[
                {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
              ],

            },
            t: '',
            //  tab页
            activeName:'first',

            currentReportType:{
              trans:1,
              genera:1,
            },
            //  显示更多
            isShowMore:false,
            //  复选框
            types: ['展现占比指标', '展现日均指标'],
            // checkedTypes: ['展现占比指标', '展现日均指标'],
            checkedTypes: [],
            flagType:[],
            list: ['日','月','年','个券','会员'],
          }
        },
        beforeUpdate() {

        },
      methods: {
// 列：格式化字符
        formatterNumber:function (row,col,cellValue) {
          var prop = col.property
          if(prop == 'sec_code' || prop == 'trade_date' ){
            return cellValue
          }
          return formatTbousandth(cellValue)
        },
        /**
         * 显示当前页
         */
        tableChange: function (page) {
          this.returnN = page;
          this.handleSubmit('formValidate',true)
        },
        /**
         * 表格显示行数选择
         */
        tableChangeSize: function (pageSize) {
          this.pageSize = pageSize;
          this.handleSubmit('formValidate')
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
        // 复选按钮 勾选时
        handleChangeTypesChange:function (val) {
          this.tableColumns_mtsl00005 = [tableColumns_mtsl00005[0], tableColumns_mtsl00005[1], tableColumns_mtsl00005[4], tableColumns_mtsl00005[7], tableColumns_mtsl00005[10]];
          this.types.forEach((type,index)=>{
            val.forEach((t,ind)=>{
              if(t == type){
                tableColumns_mtsl00005.forEach((o,inde)=>{
                  if(o.flag == (index+1)){
                    this.tableColumns_mtsl00005.push(o)
                  }
                })
              }
            })
          })
          //  排序
          this.tableColumns_mtsl00005.sort((o1,o2)=>{
            return o1.aIndex < o2.aIndex ? -1 : 1
          })
        },
        // 跳转 -- 明细数据超链接
        fnDatailLink:function (scopes) {
          let objData = [
            {"startDate":this.quStartdate},
            {"endDate":this.quEnddate},
            {"secType":this.secTypeLevDesc},
          ]
          if(scopes === '日'){
            jump2NewPage('MTSL_00005_day', {
              data:JSON.stringify(objData),
              title:'日超链接明细表'
            });
          }else if(scopes === '月'){
            jump2NewPage('MTSL_00005_month', {
              data:JSON.stringify(objData),
              title:'月超链接明细表'
            });
          }else if(scopes === '年'){
            jump2NewPage('MTSL_00005_year', {
              data:JSON.stringify(objData),
              title:'年超链接明细表'
            });
          }else if(scopes === '个券'){
            jump2NewPage('MTSL_00005_coupon', {
              data:JSON.stringify(objData),
              title:'个券超链接明细表'
            });
          }else if(scopes === '会员'){
            jump2NewPage('MTSL_00005_member', {
              data:JSON.stringify(objData),
              title:'会员超链接明细表'
            });
          }
        },
        // 日,月,年,个券,会员
        datailLinkClick:function(row,int){
            if(row === '合计'){
              this.secTypeLevDesc = 'ALL'
            }else {
              this.secTypeLevDesc = row
            }
          this.fnDatailLink(int);
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
        handleSubmit(name,isPageClick) {
          this.$refs[name].validate((valid) => {
            if (this.isHide == false) {
              return;
            }
            const {startdate} = this.formValidate;
            //日期格式验证
            var r = dateReg;
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
            //验证
            if (valid) {
              this.$Message.success('提交成功!请等待~');
              if(!isPageClick) this.returnN = 1;
              this.publicPagination(this.returnN, this.pageSize, true);
            } else {
              this.$Message.error('查询失败!');
            }
          })
        },
        /**
         * 分页、查询功能
         */
        publicPagination(pages, rows, statics) {
          $("#infoTableList").html('');
          // 没一次查询时先清空下载数据
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          //查询传送的参数
          this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
          this.quEnddate = this.formValidate.enddate.format('yyyy-MM-dd');
          this.searchParams = {
            "startDate": this.quStartdate,       // 开始时间
            "endDate": this.quEnddate,           // 结束时间
            "pageNo": pages,   // 500
            "pageSize": rows,     // 1
            "userId": srcUseridA,
            "userName": srcUsernameA,
            // "reQuery": statics,
            "businessId": "MTSL_00005",
          };
          //声明加载中
          $("#loadBox").removeClass("hide");
          //接口请求处理
          const url = '/dw/mtsl/mtsl00005';
          this.tableData21 = [];
          this.dealitems = 0;
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
            };
            this.isHide = true;
            //取数据
            $("#infoTableList").html("");
            var rtnStatic = data.success;
            var dataError = data.message;
            if (rtnStatic == false) {
              $("#loadBox").addClass("hide");
              // this.$Message.warning("查询出错" + dataError);
              this.$alert("错误" + dataError,'错误',{
                confirmButtonText:'确定',
                type:'error'
              })
              this.tableData21 = [];
              this.dealitems = 0;
              $("#exportCurrent").attr("disabled");
            }else{
              let dataResponse1 = data.resData.result[0].data;
              let datalength1 = data.resData.result[0].size;
              if (dataResponse1.length == 0) {
                $("#loadBox").addClass("hide");
                this.tableData21 = [];
                this.dealitems = 0;
                this.$Message.warning('查询无数据！');
                $("#exportCurrent").attr("disabled");
              }else{
                this.dealitems = datalength1;

                this.tableData21 = dataResponse1;
                $("#exportCurrent").removeAttr("disabled");
                this.isHide = true;
                $("#infoTableList").html("查询结果共 " + this.dealitems + " 条记录");
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
          this.flagType = [];
          if(this.checkedTypes.length == 2){
            this.flagType = ['A','B']
          }else {
            let str = this.checkedTypes[0];
            if(str){
              var i = this.types.indexOf(str) == 0 ? 'A' : 'B'
              this.flagType.push(i)
            }
          }
          //查询传送的参数
          let downfileParams = "userId=" + srcUseridA +
            "&userName=" + srcUsernameA + "&signature=" + signatureA +
            "&Authorization=" + AuthorizationA +
            "&startDate=" + this.quStartdate +
            "&endDate=" + this.quEnddate +
            "&flagType=" + this.flagType;

          $("#exportCurrent").attr("disabled");
          setTimeout(function () {
            $('#exportCurrent').removeAttr('disabled');
          }, 5000);

          let dp = '/dw/download/mtsl00005export?';
          console.log(downfileParams);
          void(window.open(dp + downfileParams + commonGetReqParam));
        },

      },
      watch: {},
      mounted() {
        if(getUrlDate()){
          this.handleSubmit('formValidate')
        };

        $(window).on('keydown',function(e){
          if(e.keyCode == 13){
            e.preventDefault()
          }
        });
          this.tableColumns_mtsl00005 = [tableColumns_mtsl00005[0],tableColumns_mtsl00005[1],tableColumns_mtsl00005[4],tableColumns_mtsl00005[7],tableColumns_mtsl00005[10]];
      },

    }
</script>

<style>
    .mtsl00005 .ivu-collapse-content{
      overflow: inherit !important;
    }
  .df{
    padding: 0 7px;
  }
</style>
