<template>
  <section id="mem24090">
    <!--头部logo-->
    <header></header>
    <!-- 添加点1，collapse需要加到script中 -->
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <!-- 修改点1，标题 -->
        <p>交易单元流速费
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="40">
            <div class="flexBox">
              <!-- 修改点2，日历或输入框 -->
              <!-- 样例1，日历 -->
              <Form-item prop="startdate" id="startDateForm" label="年">
                <Date-picker id="startDate" type="year" placeholder="选择年"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <Form-item class="memType" prop="enddate" id="endDateForm" label="月">
                <Date-picker id="enddate" type="month" format="MM" placeholder="选择月"
                             v-model="formValidate.enddate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <!-- 样例2，选择框 -->
              <Form-item prop="enddate" label="会员公司" :label-width="80">
                <el-select   v-model="currentSelectMemberValue"  @change="selectTypeHandle"  placeholder="请选择">
                    <el-option v-for="item in memberList" :key="item.mem_full_name" :label="item.mem_full_name" :value="item.mem_code">
                    </el-option>
                </el-select>
              </Form-item>
              <!-- 样例3，提交按钮 -->
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
    <Modal id="lookInfoPop" title="交易单元流速费  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
       <b>一．	整体说明</b>
      <br>1) 本应用可查询时间起始范围为：2004.1-now
     <br>2) 本应用可查询T日数据的时点为：T+1月第二个交易日21:00后
     <br>3) 本应用限制最大查询时间区间为：无
      <br><b>二． 单指标算法：</b>
      <br>序号 展示字段 展示字段算法或公式
      <br>1 日期 查询年月（YYYY年MM月）
      <br>2 机构序号 会员信息表‘原系统会员顺序号’
      <br>3 机构代码 会员信息表‘会员代码’
      <br>4 机构名称 会员信息表‘会员全称’
      <br>5 总流速权数 当月流速权个数*对应的使用天数(自然日)
      <br>6 总免费流速权数 当月减免的流速权个数*对应的使用天数(自然日)
      <br>7 当月实际流速权天数 当月流速权个数*对应的使用天数(自然日)
      <br>8 总免费流速权天数 当月减免的流速权个数*对应的使用天数(自然日
      <br>9 当月流速费 当月收费流速权天数*流速费费率
      <br>10 当月补交流速费 当月补交流速权天数*流速费费率
      <br>11 当月总流速费 当月流速费+当月补交流速费
      <br>12 该年累计流速费 当年流速费+当年补交流速费
      <br>13 备注 空
    </Modal>
    <div class="tableBox">
    <p id="infoTableList" class="redtext listlength"></p>
      <el-col :span="24">
        <el-table
            :data="tableData1"
            border
            style="width: 100%">
          <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                           :prop="item.field"
                           :label="item.title"
                           :formatter="fn_formatter"
                           :align="item.align"
                           :width="item.width">

          </el-table-column>
        </el-table>
      </el-col>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
              show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled>
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

    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    formatTbousandth,
     commonHeader,
    commonGetReqParam
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/MEM_24090.js';
  import '../theme/threeCommon.less';
  import FormItem from "iview/src/components/form/form-item";

  export default {
    components: {FormItem},
    data() {
      return {
        collapse: "1",
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
           startdate: new Date((new Date()).format("yyyy")),
          enddate: new Date(),

        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择年', trigger: 'change'}
          ],
          enddate: [
            {required: true, type: 'date', message: '请选择月', trigger: 'change'}
          ],

        },

        t: '',
      //  会员列表
        memberList: [
          ],
        currentSelectMember:'',
        currentSelectMemberValue:'全部'
      }
    },

    mounted(){
      this.fetchMemList();
    },
    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
        // 需要格式化千分位的字段
        if(prop =='vel_amt' || prop == 'patch_vel_amt' || prop == 'vel_amt_month_total' || prop == 'vel_amt_year_total' ){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },
     /**
       * 获取会员公司
       */
    fetchMemList:function(){
        var self = this
      var obj = new XMLHttpRequest();
      obj.open('GET', '/dw/mem/mem_20460_mem_list?userId='+srcUseridA+'&userName='+srcUsernameA+'&signature='+signatureA+'&Authorization='+AuthorizationA +commonGetReqParam, false);
      obj.onreadystatechange = function () {
        if (obj.readyState == 4 && obj.status == 200) {
          const responseData = JSON.parse(obj.responseText);
            self.memberList = responseData.resData
        }
      };
      obj.send(null);
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
        this.returnN = 1;
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
       * 选择下拉信息框
       */
      selectTypeHandle:function (item) {
        this.currentSelectMember = item
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
          var r = /^\d{4}$/;
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确年份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }

          $("#startDateForm").removeClass("ivu-form-item-error");

           //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy')) > new Date(new Date(Date.now()).format('yyyy'))) {
            this.$Message.error('年份不能大于当前年份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");

           let endDateA = $(".ivu-input:eq(1)").val();
            let rMonth = /^\d{1,2}$/;
          if (rMonth.test(endDateA) == false) {
            this.$Message.error('请输入正确月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          if (parseInt(endDateA)>12) {
            this.$Message.error('请输入正确月份！');
            $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#endDateForm").removeClass("ivu-form-item-error");
            let fullDate= startDateA+'-'+endDateA;

           if (new Date(new Date(fullDate).format('yyyy-MM')) > new Date(new Date(Date.now()).format('yyyy-MM'))) {
            this.$Message.error('月份不能大于当前月份！');
           $("#endDateForm").addClass("ivu-form-item-error");
            return;
          }
            $("#endDateForm").removeClass("ivu-form-item-error");

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确年份！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }

          $("#startDateForm").removeClass("ivu-form-item-error");

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
        $("#infoTableList").html("");
        document.getElementById("exportCurrent").setAttribute("disabled",true);
  //为空查询全部
   if(this.currentSelectMember==""){
   this.currentSelectMember="ALL";
   }
        //查询传送的参数
        this.searchParams = {
          "memCde": this.currentSelectMember,
          "year": this.formValidate.startdate.format('yyyy'),
          "month": this.formValidate.enddate.format('MM'),
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": pages,
          "pageSize": rows,
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mem/mem_24090';
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
            this.$alert("查询失败，" + dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;

            if (dataResponse.length == 0||datalength== 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
             // _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = dataResponse;
              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
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
      exportData(type) {

        var tradeDateYear = this.formValidate.startdate == '' ? '' : this.formValidate.startdate.format('yyyy');
         var tradeDateMonth = this.formValidate.startdate == '' ? '' : this.formValidate.enddate.format('MM');
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +
         '&year='+tradeDateYear+'&month='+tradeDateMonth+'&memCde='+ this.currentSelectMember
        console.log(downfileParams)
        if (type === 1) {
        document.getElementById("exportCurrent").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
          void(window.open('/dw/mem/mem_24090_export?' + downfileParams + commonGetReqParam));
        }
      }
    }
  }
</script>

<style lang="less">
  .memType .ivu-date-picker-header{
  display:none;
  }


  #mem24090 {
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
    .tableBox {
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
    .tabTitle {
      margin-top: 16px;
      padding: 0 30px;
      .el-tabs__header {
        margin: 0;
      }
    }
    .el-tabs--bottom .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs__item:nth-child(2) {
      padding-left: 0!important;
    }
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }

</style>
