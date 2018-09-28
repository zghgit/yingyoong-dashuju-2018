<template>
    <section class="mtsl00008" id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>融资融券个券风险
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
          </p>
          <div slot="content"  >
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate">
              <div class="flexBox">
                <Form-item prop="startdate"
                           id="startDateForm"
                           label="查询日期"
                           :label-width="80">
                  <Date-picker id="startDate"
                               type="date"
                               placeholder="选择查询日期"
                               v-model="formValidate.startdate"
                               class="datePickerWidth"></Date-picker>
                </Form-item>
                <Form-item prop="numberEnd" label="用户定义高风险维持担保比例" :label-width="200">
                  <el-col :span="18">
                  <el-input
                    v-model="formValidate.numberEnd"
                    :maxlength="9"
                    placeholder="请输入用户定义高风险维持担保比例"
                    size="small">
                  </el-input>
                  </el-col>
                  <el-col :span="5" style="margin-left: 5px;">% 以下</el-col>
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
      <Modal id="lookInfoPop" title="融资融券个券风险  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <br><b>一．数据说明</b>
        <br>1)	本应用可查询时间起始范围为：2010/03/31-now
        <br>2)	本应用可查询T日数据的时点为：T日22:00后
        <br>3)	本应用限制最大查询时间区间为： 无限制
        <br>4)	证券查询范围：融资融券个券风险
        <br>5)	交易平台：竞价系统
        <br><b>二．	单指标说明</b>
        <br>序号	展示字段	展示字段算法或公式
        <br>1	担保品市值	统计区间最后一个交易日的担保品市值合计
        <br>2	高风险账户担保品持有市值	统计区间最后一个交易日的融券余额合计
        <br>3	融资余额	统计区间最后一个交易日的融资余额
        <br>4	融券余额	统计区间最后一个交易日的融券余额
        <br>5	占流动市值比	该类市值占流动性市值的比重
        <br>7	维持担保比例	等于担保品市值/(融资余额+融券余额)

      </Modal>
      <div class="tableBox tab">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData08"
          border
          size="mini"
          style="width: 100%">
          <template v-for="(item,index) in tableColumns_mtsl00008">
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
    dateReg,
    jump2NewPage,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns_mtsl00008} from '../assets/js/MTSL_00008.js';
  import {tableDataMtsl00008} from '../assets/js/jsonData.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
        name: "mtsl00008",
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
        tableColumns_mtsl00008: tableColumns_mtsl00008,
        tableData08: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        quStartdate:'',
        quNumberEnd:'',
        //日期初始化
        formValidate: {
          startdate: new Date(initialDate()),
          numberEnd:'130',
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ],
          // numberEnd: [
          //   {required: true, type: 'string', message: '', trigger: 'change'}
          // ]
        },
        t: '',
      }
    },
        mounted() {},
        methods: {
          // 列：格式化字符
          formatterNumber:function (row,col,cellValue) {
            var prop = col.property
            if(prop == 'sec_code' ){
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
          // var r = /^\d{4}([-/.]?)\d{1,2}\1\d{1,2}$/;
          var r = dateReg
          var startDateA = $(".ivu-input:eq(0)").val();

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入正确日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          //手动输入不能大于当前日期
          if (new Date(new Date(startDateA).format('yyyy-MM-dd')) > new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
            this.$Message.error('输入日期不能大于当前日期！');
            $("#startDateForm").addClass("ivu-form-item-error");
            return;
          }
          $("#startDateForm").removeClass("ivu-form-item-error");
          var startdateValue = this.formValidate.startdate;

          // var reg = /^\d{1,9}.?\d{1,9}$/;   // 上面小数
         // var reg = /^\d{1,9}$|(^\d{1,9}.?\d{1,9}$)/  // 上面小数
         // var reg = /^[0-9]{1,4}\.[0-9]{1,4}$/  // 上面小数
         //  var reg = /^\d{1,9}$|(^\d{1,9}.?\d{1,9}$)/  // 上面小数
          var reg = /^\d{1,9}$|(^\d{1,9}\.+\d{1,9}$)/
          if(!reg.test(this.formValidate.numberEnd)){
            this.$Message.error('请输入用户定义高风险维持担保比例,并且为数值和整数！');
            return
          }


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
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        $("#infoTableList").html("");
        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quNumberEnd = this.formValidate.numberEnd;
        //查询传送的参数
        this.searchParams = {
          "tradeDate": this.quStartdate,
          "collaDuty": this.quNumberEnd,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "MTSL_00008",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mtsl/mtsl00008';
        // const url = '/45/mtsl/mtsl00008';
        this.tableData08 = [];
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
            _this.tableData08 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.data;
            var datalength = data.resData.totalCount;
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData08 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData08 = _this.dataArrayAll;
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
       * 无导出Excel文件
       */
      exportData() {
        var downfileParams = "&userId=" + srcUseridA +
          "&userName=" + srcUsernameA +
          "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&tradeDate=" + this.quStartdate +
          "&collaDuty="+this.quNumberEnd;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/mtsl00008export?';

        void(window.open(dp + downfileParams + commonGetReqParam));
      },

    },
        watch: {},

    }
</script>

<style lang="less">

</style>
