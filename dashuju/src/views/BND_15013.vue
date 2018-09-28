.<template>
  <div id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>盘前报价回购额度报表
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content"  >
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="10">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="交易日期" :label-width="85">
                <Date-picker   id="startDate" type="date" placeholder="选择交易日期"
                               v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
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
    <Modal id="lookInfoPop" title="盘前报价回购额度报表  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <h3>一．数据说明</h3>
      <p>
        只包含综合业务平台报价回购数据
      </p>
      <h3>二．指标说明</h3>
      <p>
        1.批准额度：交易所批准的报价回购总额度
        <br>2.标准券总额度：根据会员质押库的所有无司法瑕疵的质押券根据标准券折算率计算出来的总额度，有司法瑕疵的质押券为登记公司发给本所的证券冻结文件中进行标志的质押券
        <br>3.可用额度：
        T日该会员盘前可用额度=Min[∑(该账户证券明细数据中各对应现券的有效数量×该现券当日折算率×1000)，报价回购额度]-T日开市前未到期报价回购总余额
        其中，各对应现券的有效数量=max（证券明细中的现券数量-冻结数量，0）
        T日开市前未到期报价回购总余额=T-1日闭市后正常未到期报价回购总余额+T-1日新开回购延迟交收部分=∑（未到期数据中辅助代码为ZC且标志为N的记录数量×1000）+∑（未到期数据中辅助代码为YC且成交日期为T-1日的记录数量×1000）。
        <br>4.预警级别：当可用额度占比大于等于20%，预警级别为“安全”；当实时可用额度占比大于等于10%，小于20%的时候，预警级别为“注意”；当实时可用额度占比小于10%；预警级别为“危险”。
      </p>
      <h3>三．其他说明</h3>
      <p>
        每日开盘9:00前
      </p>
      <!--<b>一．数据说明</b><br>-->
      <!--只包含综合业务平台报价回购数据<br>-->
      <!--<b>二．指标说明</b> <br>-->
      <!--1.批准额度：交易所批准的报价回购总额度<br>-->
      <!--2.标准券总额度：根据会员质押库的所有无司法瑕疵的质押券根据标准券折算率计算出来的总额度，有司法瑕疵的质押券为登记公司发给本所的证券冻结文件中进行标志的质押券-->
      <!--<br>3.可用额度：-->
      <!--<br> T日该会员盘前可用额度=Min[∑(该账户证券明细数据中各对应现券的有效数量×该现券当日折算率×1000)，报价回购额度]-T日开市前未到期报价回购总余额-->
      <!--<br>其中，各对应现券的有效数量=max（证券明细中的现券数量-冻结数量，0）-->
      <!--<br>T日开市前未到期报价回购总余额=T-1日闭市后正常未到期报价回购总余额+T-1日新开回购延迟交收部分=∑（未到期数据中辅助代码为ZC且标志为N的记录数量×1000）+∑（未到期数据中辅助代码为YC且成交日期为T-1日的记录数量×1000）。-->
      <!--<br>4.预警级别：当可用额度占比大于等于20%，预警级别为“安全”；当实时可用额度占比大于等于10%，小于20%的时候，预警级别为“注意”；当实时可用额度占比小于10%；预警级别为“危险”。-->
      <!--<br><b>三．其他说明</b>-->
      <!--<br>每日开盘9:00前-->
    </Modal>
    <!--头部logo-->
    <div class="tableBox">

      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        style="width: 100%;">

        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                         :formatter="formatData"
                         :prop="item.field"
                         :label="item.title"
                         :align="item.align"
                         :min-width="item.width">
        </el-table-column>
      </el-table>
      <!--<div class="pageModule">-->
        <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
              <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
      <!--</div>-->
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
    </div>



    <!--<h2 class="infoTitle">每日开盘前报价回购额度报表</h2>-->
    <!--<div class="mainBox changeBox">-->
      <!--<Row :gutter="gutterValue">-->
        <!--<Col :span="leftPane">-->
        <!--<span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>-->
        <!--<Card class="iviewCard">-->
          <!--<Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">-->
            <!--<Icon type="load-c" size=40 class="loadIcon"></Icon>-->
            <!--<div>&nbsp;&nbsp;&nbsp;数据加载中...</div>-->
          <!--</Spin>-->
          <!--<span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>-->
          <!--<Modal id="lookInfoPop" title="每日开盘前报价回购额度报表  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal"-->
                 <!--cancel-text>-->
            <!--<b>一．数据说明</b><br>-->
            <!--只包含综合业务平台报价回购数据<br>-->
            <!--<b>二．指标说明</b>-->
            <!--1.批准额度：交易所批准的报价回购总额度<br>-->
            <!--2.标准券总额度：根据会员质押库的所有无司法瑕疵的质押券根据标准券折算率计算出来的总额度，有司法瑕疵的质押券为登记公司发给本所的证券冻结文件中进行标志的质押券-->
            <!--<br>3.可用额度：-->
            <!--<br> T日该会员盘前可用额度=Min[∑(该账户证券明细数据中各对应现券的有效数量×该现券当日折算率×1000)，报价回购额度]-T日开市前未到期报价回购总余额-->
            <!--<br>其中，各对应现券的有效数量=max（证券明细中的现券数量-冻结数量，0）-->
            <!--<br>T日开市前未到期报价回购总余额=T-1日闭市后正常未到期报价回购总余额+T-1日新开回购延迟交收部分=∑（未到期数据中辅助代码为ZC且标志为N的记录数量×1000）+∑（未到期数据中辅助代码为YC且成交日期为T-1日的记录数量×1000）。-->
            <!--<br>4.预警级别：当可用额度占比大于等于20%，预警级别为“安全”；当实时可用额度占比大于等于10%，小于20%的时候，预警级别为“注意”；当实时可用额度占比小于10%；预警级别为“危险”。-->
            <!--<br><b>三．其他说明</b>-->
            <!--<br>每日开盘9:00前-->
          <!--</Modal>-->
          <!--&lt;!&ndash;头部logo&ndash;&gt;-->
          <!--<p id="infoTableList" class="redtext listlength"></p>-->
          <!--<el-table-->
            <!--:data="tableData1"-->
            <!--border-->
            <!--style="width: 100%">-->
            <!--<el-table-column v-for="(item,index) in tableColumns1" :key="index"-->
                             <!--:prop="item.field"-->
                             <!--:label="item.title"-->
                             <!--:align="item.align"-->
                             <!--:width="item.width">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--&lt;!&ndash;<div class="pageModule">&ndash;&gt;-->
            <!--&lt;!&ndash;<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"&ndash;&gt;-->
                  <!--&lt;!&ndash;show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div class="exportBtn">-->
            <!--<Button id="exportCurrent" type="primary" size="large" @click="exportData()" disabled>-->
              <!--<Icon type="ios-download-outline"></Icon>-->
              <!--导出全部结果为XLSX文件-->
            <!--</Button>-->
          <!--</div>-->
        <!--</Card>-->
        <!--</Col>-->
        <!--<Col :span="rightPane" class="infoRightCard">-->
        <!--<Card class="iviewCard">-->
          <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
            <!--<Row class="dateBox">-->
              <!--<Col span="12">-->
              <!--<b>交易日期</b>-->
              <!--<Form-item prop="startdate" id="startDateForm">-->
                <!--<Date-picker id="startDate" type="date" placeholder="选择交易日期"-->
                             <!--v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>-->
              <!--</Form-item>-->
              <!--</Col>-->
            <!--</Row>-->
            <!--<Form-item>-->
              <!--<div class="cxBox cxTop">-->
                <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>-->
              <!--</div>-->
            <!--</Form-item>-->
          <!--</Form>-->
        <!--</Card>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</div>-->
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
    commonGetReqParam,
    dateReg,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/BND_15013.js';

  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
    data() {
      return {
        //显示隐藏输入条件
        collapse: '1',
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
          startdate: new Date()
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        t: '',
      }
    },
    mounted() {
      $(window).on('keydown',function(e){
        if(e.keyCode == 13){
          e.preventDefault()
        }
      })
    },
    methods: {
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
        document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
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
        //查询传送的参数
        this.searchParams = {
          "tradeDate": this.formValidate.startdate.format('yyyy-MM-dd'),
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
        const url = '/dw/bnd/bnd15013';
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
            // _this.$Message.warning("查询出错" + dataError);
            _this.$alert("查询出错，" + dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.result[0].data;
            var datalength = data.resData.result[0].size;;
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;
              _this.tableData1 = _this.dataArrayAll;
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
        var downfileParams ='dwSessionid='+ dwSessionidA+ "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&tradeDate=" + this.formValidate.startdate.format('yyyy-MM-dd');
        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        var dp = '/dw/download/bndexcel?type=bdsp_bnd15013&row=1&'
        void(window.open(dp + downfileParams + commonGetReqParam ));
      },
      /**
       * 金额、数量千分制转换
       */
      formatData (row, column, cellValue) {
        let prop = column.property;
        if (prop == 'approved_quota' || prop == 'approved_sum' || prop == 'available_quota') {
          return formatTbousandth(cellValue)
        } else {
          return cellValue
        }
      },
    }
  }
</script>

<style lang="less">

</style>
