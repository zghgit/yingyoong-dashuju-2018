<template>
  <section id="slb00007">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>转融通月报下载
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="起始月份">
                <Date-picker id="startDate" type="month" placeholder="选择起始月份"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item prop="enddate" id="endDateForm" label="结束月份">
                <Date-picker id="endDate" type="month" placeholder="选择结束月份" v-model="formValidate.enddate"
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
    <Modal id="lookInfoPop" title="转融通月报下载" v-model="changeInfo" class-name="vertical-center-modal"
                 cancel-text>
      <b>一．数据说明</b>
       <br>只包含综合业务平台转融通借出业务统计数据
      <br><b> 二．指标说明</b>
      <br>1. 证券账户总个数：期末有效的转融通报备账户总数
      <br>2. 机构账户个数：期末有效的转融通报备账户中B打头账户总数
      <br>3. 会员自营账户个数：期末有效的转融通报备账户中D打头账户总数
      <br>4. 机构账户成交账户数：业务上市以来有出借成交的B打头不同的卖出账户个数
      <br>5. 自营账户成交账户数：业务上市以来有出借成交的D打头不同的卖出账户个数
      <br>6. 转融券余额：取业务上市以来截止到统计月末未到期的转融通借出数量的收盘市值，未到期数量为发生出借交易且未到期限的数量，假设T日成交，N为期限，则先求得大于等于T+N的第一个交易日，即是到期日，假设为X，本指标是指“X>月末日期”的转融通余额，单位万元
      <br><b>三．其他说明</b>
      <br>1. 成交排名按成交金额倒序，成交数量倒序，股票代码正序排名，只取前5名，可能会有不足5名情况
      <br>2. 转融券余额排名按转融券余额倒序，转融券未到期数量倒序，股票代码正序排名，只取前5名，可能会有不足5名情况
      <br>3. 每个月最后一个自然日23:00自动生成月报可供下载
    </Modal>
    <div class="tableBox" id="tableData">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-col :span="24">
        <el-table
          :data="tableData1"
          border
          style="width: 100%;">
          <template v-for="(item,index) in tableColumns1">
              <el-table-column v-if="item.hasAnchor"   :key="index"
                               :prop="item.key"
                               :label="item.title"
                               :align="item.align"
                               :width="item.width">
                <template scope="scope">
                  <a @click="anchorClick(scope)">{{scope.row.value}}</a>
                </template>
              </el-table-column>
              <el-table-column v-else  :key="index"
                               :prop="item.key"
                               :label="item.title"
                               :align="item.align"
                               :width="item.width">
              </el-table-column>
            </template>
        </el-table>
      </el-col>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
    </div>
  </section>
</template>

<script>
  import 'whatwg-fetch';
  import {

    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    initialDate,
    commonHeader,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/SLB_00007.js';
  import '../theme/threeCommon.less';

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
            startdate: new Date().setYear(new Date().getFullYear() - 1),
          enddate: new Date()
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择起始月份', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择结束月份', trigger: 'change'}
          ]
        },
        t: '',


      }
    },
    mounted() {
     // $(".el-table__footer-wrapper").show();
      this.publicPagination(1, this.pageSize, true);
    },
    methods: {
      anchorClick:function (scope) {
        console.log(scope)
        var url = '/dw/slb/slb_00007?userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&tradeDate=' + scope.row.key + commonGetReqParam
        window.open(url)
      },
     tableChange:function (page){
                this.returnN=page;
                this.tableData1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
            },

            tableChangeSize:function (pageSize){
                this.pageSize=pageSize;
                this.returnN=1;
                this.tableData1 =this.dataArrayAll.slice(0,this.pageSize);
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
      handleSubmit(name,isPageClick) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {startdate, enddate} = this.formValidate;
          //日期格式验证
          var r = /^\d{4}([-/.]?)\d{1,2}$/;
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确起始月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var endDateA = $(".ivu-input:eq(1)").val();
          if (r.test(endDateA) == false) {
            this.$Message.error('请输入正确结束月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('起始月份不能大于当前月份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          if (new Date(new Date(endDateA).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('结束月份不能大于当前月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
          //开始日期不能大于结束日期（手动输入+选择日期）
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMM') > enddateValue.format('yyyyMM')) {
            $("#startDateForm").addClass("ivu-form-item-error");
            $("#endDateForm").addClass("ivu-form-item-error");
            this.$Message.error('起始月份不能大于结束月份!');
            return;
          }
          ;
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
        var _this = this
        this.isHide = false;
        $("#loadBox").removeClass("hide");
         $("#infoTableList").html("查询结果共 0 条记录");
        var self = this
        var obj = new XMLHttpRequest();
        if(typeof  this.formValidate.startdate == 'number' ) this.formValidate.startdate = new Date(this.formValidate.startdate)
        var startYearMonth = this.formValidate.startdate.format ? this.formValidate.startdate.format('yyyy-MM') : this.formValidate.startdate
        var endYearMonth = this.formValidate.enddate.format ? this.formValidate.enddate.format('yyyy-MM') : this.formValidate.enddate
        obj.open('GET', '/dw/slb/slb_month_list?pageNo='+pages+'&pageSize='+rows+ '&userId=' + srcUseridA + '&userName=' + srcUsernameA + '&signature=' + signatureA + '&Authorization=' + AuthorizationA + '&startYearMonth=' + startYearMonth + '&endYearMonth=' +  endYearMonth+ commonGetReqParam, false);
        obj.onreadystatechange = function () {
          _this.isHide = true;
          $("#loadBox").addClass("hide");
          // this.$Message.warning("查询出错" + dataError);
          // this.$alert("查询出错" + dataError,'提示',{
          //   confirmButtonText:'确定'
          // })
          if (obj.readyState == 4 && obj.status == 200) {
            const responseData = JSON.parse(obj.responseText);
            _this.isHide = true;
            var dataResponse = responseData.resData
            var datalength = responseData.resData.length
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.$Message.warning('查询无数据！');

            } else {
              // _this.$Message.success('查询成功!');
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
           //   _this.tableData1 = _this.dataArrayAll;
              _this.returnN=1;
              let tmpLimit=_this.pageSize;
              if(tmpLimit>dataResponse.length){
                            //如果加载数据少，全部返回
               tmpLimit=dataResponse.length;
                            }
                _this.tableData1=_this.dataArrayAll.slice(0,tmpLimit);

              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + datalength + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");



            }
          }else{
            _this.$Message.warning('查询错误！');
             //隐藏加载中
                _this.isHide = true;
                $("#loadBox").addClass("hide");
          }
        };
        obj.send(null);




      },

    }
  }
</script>

<style lang="less">

  #slb00007 {
    .ivu-collapse {
      border: none;
    }

    .el-table thead.has-gutter th {
    background-color: #F5F8FA;

  }
    .ivu-collapse-content {
      background: #F5F8FA;
      margin: 0 30px;
      padding: 15px 0 15px 0;
      .ivu-form-item {
        margin-bottom: 0;
      }
      .ivu-collapse-content-box {
        padding-top: 0;
      }
    }
    .ivu-collapse-header {
      padding: 20px 31px;
      border-bottom: none;
      .ivu-icon-arrow-right-b {
        display: none;
      }
      p {
        line-height: 30px;
        .lookInfo {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .showButton {
        float: right;
        font-weight: normal;
        font-size: 13px;
        color: #3D83B5;
        i {
          margin-left: 5px;
        }
      }
    }
    .el-table__empty-text {
      top: 50%;
    }
  }
  .tabTitle {
    margin-top: 16px;
    padding: 0 30px;
    .el-tabs__header {
      margin: 0;
    }
  }
  #tableData {
    padding: 27px 30px;
    .pageModule {
      float: right;
      width: inherit;
      .ivu-page-options-sizer {
        margin-right: 0;
      }
    }
    .exportBtn {
      float: left;
    }
  }
  .ivu-form-item-error .searchIpt  {
    border: 1px solid #f30;
  }


</style>
