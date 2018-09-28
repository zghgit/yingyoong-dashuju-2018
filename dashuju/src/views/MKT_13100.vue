<template>
  <section class="constWidth" id="mkt13100">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
        <Panel name="1">
          <p>上海行情基本历史数据导出
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
          <div slot="content"  >
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
                <div class="moreBtn">
                  <div  @click="isShowMore = !isShowMore"><span v-show="isShowMore">收起 ∧</span><span v-show="!isShowMore">更多 ∨</span></div>
                </div>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">导出</Button>
                </div>
              </div>
              <div class="exportBtnBox" v-if="isShowMore">
                证券类型：
                <el-checkbox class="checkAllBtn" :indeterminate="indeterminate" v-model="isCheckAll" @change="handleCheckChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedTypes" @change="handleChangeTypesChange">
                  <el-checkbox v-for="city in types" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="上海行情基本历史数据导出  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．	整体说明：</b>
        <br>1)	本应用可查询时间起始范围为：2014.01.02-now
        <br>2)	本应用可查询T日数据的时点为：T日15:20后
        <br>3)	本应用限制最大查询时间区间为：无限制
        <br>4)	本应用中当选择日期区间内没有查询结果时，显示：下载失败：当前日期区间内无查询结果。
        <br>5)	本应用不支持2014年之前的数据导出，如需2014年之前的数据请联系信息管理部
        <br><b>二．	单指标算法：</b>
        <br>序号	展示字段	展示字段算法或公式
        <br>1、	交易日期	行情历史中在开始日期和结束日期之间的每个交易日
        <br>2、	证券代码	上海交易所交易的A股、B股、指数、基金、债券、衍生品、其他等证券的代码，取自仓库维护的符合输出要求的上海行情输出类型
        <br>3	、证券简称	符合条件的证券代码对应的证券简称
        <br>4、	开盘价	收盘行情中每个交易日对应的开盘价
        <br>5、	收盘价	收盘行情中每个交易日对应的收盘价
        <br>6、	最高价	收盘行情中每个交易日对应的最高价
        <br>7、	最低价	收盘行情中每个交易日对应的最低价
        <br>8、	成交量	收盘行情中每个交易日每个证券的成交量汇总
        <br>9、成交额	收盘行情中每个交易日每个证券的成交额汇总

      </Modal>
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
    lastMonthFirstAndLastDay
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/GDH_00020.js';
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
          startdate: new Date(lastMonthFirstAndLastDay().pre_month_first_txdate),
          enddate: new Date(lastMonthFirstAndLastDay().pre_month_last_txdate)
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ]
        },
        t: '',
      //  多选框
        isCheckAll:false,
        indeterminate:true,
        checkedTypes:['A股','B股','指数'],
        types:['A股','B股','指数','基金','债券','衍生品','其他'],
      //  显示更多
        isShowMore:false
      }
    },
    mounted() {

    },
    methods: {
      //点击全选
      handleCheckChange :function (val) {
          console.log(val)
          this.checkedTypes = val ? this.types :[]
        this.indeterminate =false
      },
      // 勾选时
      handleChangeTypesChange:function (value) {

        console.log(value)
        this.isCheckAll = value.length === this.types.length
        this.indeterminate = value.length >0 && value.length < this.types.length
      },
      //更多按钮点击
      moreBtnClick:function () {

      },
      /**
       * 查询功能
       */
      handleSubmit(name) {

        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate, enddate} = this.formValidate;
          //日期格式验证
          var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
          if(this.checkedTypes.length <1){
            this.$Message.error('至少选择一个证券类型!');
            return;
          }
          ;
          //验证
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            // this.returnN = 1;
            this.publicPagination();
          } else {
            this.$Message.error('提交失败!');
          }
        })
      },
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
      publicPagination() {

        var str = 'A股,B股,指数,基金,债券,衍生品,其他'
        if(this.checkedTypes.length <7){
          str =''
            this.checkedTypes.forEach((item,index)=>{
            var s = item+','
            str +=s
          })
          str = str.slice(0,str.length-1)
        }
        //查询传送的参数
        this.searchParams = {
          "startDate": this.formValidate.startdate.format ? this.formValidate.startdate.format('yyyy-MM-dd') : this.formValidate.startdate,
          "endDate": this.formValidate.enddate.format ? this.formValidate.enddate.format('yyyy-MM-dd') : this.formValidate.enddate,
          'secTypeDesc':  str
      };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        var downfileParams ="&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA
        const url = '/dw/mktdt/mkt13100?startDate='+this.searchParams.startDate+'&endDate='+this.searchParams.endDate+'&secTypeDesc='+str
        var  self = this
        console.log()
        this.isHide = false
        var self = this
        $.ajax({
          type:'GET',
          timeout:600000,
          headers:commonHeader,
          url:'/dw/mktdt/check_mkt13100?startDate='+this.searchParams.startDate+'&endDate='+this.searchParams.endDate+'&secTypeDesc='+str+downfileParams,
          success:function (res) {
            self.isHide = true
            if(res.message == 'false'){
              self.$Message.error('所选时间范围内，无数据！');
            }else{
              window.open(url+downfileParams+commonGetReqParam)
            }
          },
          error:function (err) {
            self.isHide = true
            this.$alert("错误" + err,'错误',{
              confirmButtonText:'确定',
              type:'error'
            })
            self.isHide = true
          }
        })
        // window.open(url+downf  ileParams+commonGetReqParam)


        // var _this = this;
        //
        // this._fetch(fetch(url, {
        //   method: "POST",
        //   // body: JSON.stringify(_this.searchParams),
        //   mode: 'cors',
        //   headers: commonHeader
        // }), 600000).then(function (response) {
        //   return response.json()
        // }, function (error) {
        //   $("#loadBox").addClass("hide");
        //   _this.$Message.error('系统繁忙，刷新页面!');
        //   _this.isHide = true;
        // }).then(data => {
        //   if (_this.t != '') {
        //     clearTimeout(_this.t);
        //   }
        //   ;
        //   this.isHide = true;
        //   console.log(data)
        //
        // });
      },
    }
  }
</script>

<style lang="less" scoped>
  .tableBox{
    padding: 30px 30px;
  }
  .flexBox{
    display: flex;
    flex-wrap: wrap;
  }
  .submitBtnBox{
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .exportBtnBox{
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    margin-left: 10px;
  }
  #lookInfoLink{
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }
  .checkAllBtn{
    margin-right: 30px;
  }
  .moreBtn{
    color: #2db7f5;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
</style>
