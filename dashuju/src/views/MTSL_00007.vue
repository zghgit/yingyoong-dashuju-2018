<template>
  <section class="constWidth" id="mtsl00007">
    <!--头部logo-->
    <div id="fifteenCommon">
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>融资融券风险情况
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
            <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm">
                  <b>开始日期：</b>
                  <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                               v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item prop="enddate" id="endDateForm">
                  <b>结束日期：</b>
                  <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"
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
    </div>

    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="融资融券风险情况  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <b>一．	整体说明：</b><br>
      1)	本应用可查询时间起始范围为：2010/03/31-now<br>
      2)	本应用可查询T日数据的时点为：T日22:00后<br>
      3)	本应用限制最大查询时间区间为： 无限制<br>
      4)	证券查询范围：融资融券风险情况<br>
      5)	交易平台：竞价系统<br>
        <b>二．	单指标算法</b><br>
      序号	展示字段	展示字段算法或公式<br>
      1.	维持担保比例	该投资者的维持担保比例<br>
      2.	担保品市值	该投资者的统计区间最后一个交易日的担保品市值<br>
      3.	融资余额	该投资者的统计区间最后一个交易日的融资余额<br>
      4.	融券余额	该投资者的统计区间最后一个交易日的融券余额<br>
      5. 占比	根据各维度计算的占比<br>


    </Modal>
    <!--头部logo-->
    <div class="tableBox">

      <p style="float: initial" id="infoTableList" class="redtext listlength"></p>
      <el-checkbox-group v-model="checkedTypes" @change="handleChangeTypesChange">
        <el-checkbox v-for="(city,index) in types" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <h3>维持担保比例区间分布</h3>
      <el-table
        :data="tableData1"
        border
        style="width: 100%">
        <template v-for="(item,index) in tableColumns1">
          <el-table-column v-if="item.hasAnchor"
                           :key="Math.random()"
                           :prop="item.key"
                           :label="item.title"
                           :align="item.align"
                           :width="item.width">
            <template scope="scope">
              <a @click="anchorClick(scope,index)"
                 v-for="(anchor,index) in scope.row.anchorArr">
                {{anchor}}</a>
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
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
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
    initialMonth,
    commonGetReqParam,
    dateReg,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MTSL_00007.js';
  import '../theme/threeCommon.less';
  import '../theme/fiveAppCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
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
        tableColumns1: tableColumns1,
        tableData1: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          enddate: new Date(initialDate())
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
        //  复选框
        types: ['展现占比指标', '展现日均指标', '展现户均指标'],
        checkedTypes: [],
      //  记录勾选的列
        currentCheckedArr:[false,false,false],
        recordQueryCheckedArr:'',
        recordQueryDate:''
      }
    },
    mounted() {
      $(window).on('keydown', function (e) {
        if (e.keyCode == 13) {
          e.preventDefault()
        }
      })
      var temp = []
      tableColumns1.forEach((item,index)=>{
        if(!item.flag){
          temp.push(item)
        }
      })
      this.tableColumns1 =  temp
      // this.tableColumns1 = tableColumns1
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
      //表格超链接点击
      anchorClick: function (scope,index) {
        console.log(scope,index)
        var inputCollRatio = scope.row.coll_ratio1 == '合计' ? 'ALL' : scope.row.coll_ratio1
        var inputData = ''
        if(index == 1){
          inputData = 'd'
        }
        if(index == 2){
          inputData = 'm'
        }
        if(index == 3){
          inputData = 'y'
        }
        jump2NewPage(index > 0 ? 'MTSL_00007_date' : 'MTSL_00007_member', {
          data: JSON.stringify({
            startDate:this.recordQueryDate.startdate.format('yyyy-MM-dd'),
            endDate:this.recordQueryDate.enddate.format('yyyy-MM-dd'),
            inputCollRatio:inputCollRatio,
            inputData:inputData
          }),
          title: index > 0 ? scope.row.anchorArr[index] : '会员明细'
        },true)

      },
      /**
       * 显示当前页
       */
      tableChange: function (page) {
        this.returnN = page;
        this.handleSubmit('formValidate', true)
      },
      /**
       * 表格显示行数选择
       */
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.handleSubmit('formValidate')
      },
      // 勾选时
      handleChangeTypesChange: function (value) {
        // 记录当前勾选的选项
        this.currentCheckedArr = [false,false,false]

        //动态改变表格列
        // this.tableColumns1 = tableColumns1.slice(0, 3)
        this.tableColumns1 = [tableColumns1[0],tableColumns1[1],tableColumns1[2],tableColumns1[4],tableColumns1[6],tableColumns1[8],tableColumns1[12]]

        this.types.forEach((type,index)=>{
          value.forEach((t,ind)=>{
            if(t == type){
              this.currentCheckedArr.splice(index,1,true)
              tableColumns1.forEach((o,inde)=>{
                if(o.flag == (index+1)){
                  this.tableColumns1.push(o)
                }
              })
            }
          })
        })
        console.log(this.currentCheckedArr)
      //  排序
        this.tableColumns1.sort((o1,o2)=>{
          return o1.aIndex < o2.aIndex ? -1 : 1
        })
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
      handleSubmit(name, isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate, enddate} = this.formValidate;
          //日期格式验证
          var r = dateReg
          var startDateA = $(".ivu-input:eq(0)").val();
          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确开始日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束日期！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('开始日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('结束日期不能大于当前日期！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('开始日期不能大于结束日期!');
            return;
          }
          ;
          //验证
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            if (!isPageClick) this.returnN = 1;
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
        document.getElementById("exportCurrent").setAttribute("disabled", true);
        //查询传送的参数
        this.searchParams = {
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "GDH_00011",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mtsl/mtsl_00007_data';
        this.tableData1 = [];
        this.dealitems = 0;
        var _this = this;
        _this.returnTotal = 0;
        _this.dataArrayAll = [];
        _this.isHide = false;
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(_this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
          _this.isHide = true;
        }).then(data => {
          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          ;
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
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData
            var datalength = data.resData.length;
            if (datalength == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              console.log(dataResponse)
              _this.recordQueryCheckedArr = _this.currentCheckedArr
              _this.recordQueryDate = _this.formValidate
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
              _this.tableData1.forEach((item,index)=>{
                item['anchorArr'] = ['会员 ',' 日 ',' 月 ',' 年 ']
              })
              console.log(_this.tableData1)
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + _this.dealitems + " 条记录");
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
        // "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
        //   "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),

        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.recordQueryDate.startdate.format('yyyy-MM-dd') +'&endDate='+this.recordQueryDate.enddate.format('yyyy-MM-dd')+'&showWhich='+this.currentCheckedArr
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mtsl/mtsl_00007_export?'
        console.log(downfileParams)
        void(window.open(dp + downfileParams + commonGetReqParam));
      },
    }
  }
</script>
<style>
  #mtsl00007 .ivu-collapse-content {
    overflow: inherit !important;
  }
</style>
<style lang="less" scoped>
  .tableBox {
    padding: 30px 30px;
  }

  .flexBox {
    display: flex;
    flex-wrap: wrap;
  }

  .submitBtnBox {
    display: flex;
    justify-content: center;
    align-items: center;

  }

  #lookInfoLink {
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }
</style>
