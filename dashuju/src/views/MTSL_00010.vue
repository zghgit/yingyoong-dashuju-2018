<template>
  <div class="mtsl00010" id="fifteenCommon">
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>融资融券账户情况
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
              <div class="moreBtns">
                <div  @click="MoreClick">
                  <span>更多</span>
                  <i v-if="moreIf" class="el-icon-arrow-up"></i>
                  <i v-else class="el-icon-arrow-down"></i></a>
                </div>
              </div>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
              </div>
            </div>
            <div class="exportBtnBoxq" v-if="moreIf"
                 style="margin-left: -3px;">
              <Form-item id="memCode" label="用户定义高风险维持担保比例"
                         prop="numberEnd"
                         :label-width="196">
               <el-col :span="18">
                 <el-input
                   v-model="formValidate.numberEnd"
                    :maxlength="9"
                   placeholder="请输入用户定义高风险维持担保比例"
                   size="small">
                 </el-input>
               </el-col>
                <el-col :span="5" style="margin-left: 5px;">% 及以下</el-col>
              </Form-item>
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Modal id="lookInfoPop" title="融资融券账户情况  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <br><b>一．数据说明</b>
      <br>1)	本应用可查询时间起始范围为：2010/03/31-now
      <br>2)	本应用可查询T日数据的时点为：T日22:00后
      <br>3)	本应用限制最大查询时间区间为： 无限制
      <br>4)	证券查询范围：融资融券账户情况
      <br>5)	交易平台：竞价系统
      <br><b>二．	单指标算法</b>
      <br>序号	展示字段	展示字段算法或公式
      <br>1.	累计账户数	截止结束日期的历史上的融资融券账户总数
      <br>2.	新增账户数	开户日期在统计区间的账户数量
      <br>3.	日均新增账户数	新增账户数/统计区间的交易日数
      <br>4.	有负债的投资者数	统计区间融资负债或融券负债大于0的投资者数
      <br>5.	有融资负债的投资者数	统计区间融资负债大于0的投资者数
      <br>6.	有融券负债的投资者数	统计区间融券负债大于0的投资者数。
      <br>7.	高风险帐户数	履约担保比例在指定阀值之下的账户数。

    </Modal>
    <div class="tableBox tab">
      <p id="infoTableList" class="redtext listlength">{{infoTableList1}}</p>
      <el-table
        :data="tableData21"
        border
        style="width: 100%">
        <el-table-column width="140" prop="arr"  label="明细数据超链接" align="center">
          <template scope="scope">
            <a @click="datailLinkClick" >日</a>
            <a @click="datailLinkClick" >月</a>
            <a @click="datailLinkClick" >年</a>
          </template>
        </el-table-column>
        <template v-for="(item,index) in tableColumns_mtsl00010">
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
    jump2NewPage,
    getUrlDate,
    formatTbousandth
  } from '../assets/js/commen.js';

  import {tableColumns_mtsl00010} from '../assets/js/MTSL_00010.js';

  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
    name: "mtsl00010",
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
        tableColumns_mtsl00010: tableColumns_mtsl00010,
        tableData21: [],
        //分页信息
        returnTotal: 0,
        returnN: 1,
        dataArrayAll: [],
        pageSize: 500,
        quStartdate:'',
        quEnddate:'',
        quNumberEnd:'',

        //日期初始化
        formValidate: {
          startdate: new Date(getUrlDate(1,initialDate())),
          enddate: new Date(getUrlDate(2,initialDate())),
          numberEnd:130,
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
          ],
          enddate:[
            {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
          ],
          // numberEnd:[
          //   {required: true, type: 'date', message: '请输入用户定义高风险维持担保比例', trigger: 'change'}
          // ]
        },
        t: '',
        //  子表格
        anchorTableModel: false,

        dayTableData1:[],
        dayTableData2:[],
        dayTableData3:[],
        tableData22_1: [],


        infoTableList1:'',


        titleTotalCount1:'',

        //  tab页
        activeName:'first',

        currentReportType:{
          trans:0,
        },
        //  显示更多
        moreIf:false,
      }
    },
    beforeUpdate() {
      // this.enddateChange();

    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'stat_end_date'){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      // 更多条件收缩
      MoreClick:function () {
        if(this.moreIf){
          this.moreIf = false
        }else {
          this.moreIf =true;
        }
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
      // 跳转 -- 明细数据超链接  scopes 参数是：日、月、年
      fnDatailLink:function (scopes) {
        let objData = [
          {"startDate":this.formValidate.startdate.format('yyyy-MM-dd')},
          {"endDate":this.formValidate.enddate.format('yyyy-MM-dd')},
          {"collaDuty":this.formValidate.numberEnd},
        ]
        if(scopes === '日'){
          jump2NewPage('MTSL_00010_day', {
            data:JSON.stringify(objData),
            title:'日超链接明细表',
          });
        }else if(scopes === '月'){
          jump2NewPage('MTSL_00010_month', {
            data:JSON.stringify(objData),
            title:'月超链接明细表'
          });
        }else if(scopes === '年'){
          jump2NewPage('MTSL_00010_year', {
            data:JSON.stringify(objData),
            title:'年超链接明细表'
          });
        }
      },
      // 日,月,年  row 参数是
      datailLinkClick:function (row) {
        this.fnDatailLink(row.target.innerText);
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
          var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
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
          };

          // if(this.formValidate.numberEnd.trim() == ''){
          //   this.$Message.error('用户定义高风险维持担保比例不能为空!');
          //   return
          // }else {

               var reg = /^\d{1,9}$|(^\d{1,9}\.+\d{1,9}$)/
            if(!reg.test(this.formValidate.numberEnd)){
              this.$Message.error('用户定义高风险维持担保比例，并且为数字和整数!');
              return
            }
          // }

          //验证
          if (valid) {
            //     this.$Message.success('提交成功!请等待~');
            //     if(!isPageClick) this.returnN = 1;
            //     this.publicPagination(this.returnN, this.pageSize, true);
            //   } else {
            //     this.$Message.error('必须项不能为空!');
            //   }
            // })

            if(enddateValue.getTime() - startdateValue.getTime() > 182.5*24*60*60*1000){
              this.$confirm('您选择的时间范围过长，查询数据量过大的情况下可能会导致耗时很长且后台服务性能下降甚至不可使用，建议选择时间范围在半年内。' ,'提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              }).then(()=>{
                this.$Message.success('提交成功!请等待~');
                if (!isPageClick) this.returnN = 1;
                this.publicPagination(this.returnN, this.pageSize, true);
              }).catch(()=>{
              })
            }else {
              this.$Message.success('提交成功!请等待~');
              if (!isPageClick) this.returnN = 1;
              this.publicPagination(this.returnN, this.pageSize, true);
            }
          } else {
            this.$Message.error('查询失败!');
          }
        })
      },
      /**
       * 分页、查询功能
       */
      publicPagination(pages, rows, statics) {
        // 没一次查询时先清空下载数据
        document.getElementById("exportCurrent").setAttribute("disabled",true);
        this.infoTableList1 = '';

        this.quStartdate = this.formValidate.startdate.format('yyyy-MM-dd');
        this.quEnddate = this.formValidate.enddate.format('yyyy-MM-dd');
        this.quNumberEnd = this.formValidate.numberEnd;

        //查询传送的参数
        this.searchParams = {
          "startDate": this.quStartdate,       // 开始时间
          "endDate": this.quEnddate,         // 结束时间
          "collaDuty": this.quNumberEnd,   // 用户定义高风险维持担保比例
          "pageSize": rows,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": pages,
          "businessId": "MTSL_l00010",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mtsl/mtsl00010';
        this.tableData21 = [];
        this.dealitems = 0;
        let _this = this;
        _this.returnTotal = 0;
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
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            let dataResponse1 = data.resData.data;
            let datalength1 = data.resData.totalCount;
            if (dataResponse1.length == 0) {
              $("#loadBox").addClass("hide");
              this.tableData21 = [];
              this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              this.dealitems1 = datalength1;
              this.tableData21 = dataResponse1;

              $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              this.infoTableList1 = "查询结果共 " + this.dealitems1 + " 条记录";
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
        //查询传送的参数
        let isIncludeBulk1 = this.formValidate.numberEnd;
        let downfileParams = "userId=" + srcUseridA +
          "&userName=" + srcUsernameA + "&signature=" + signatureA +
          "&Authorization=" + AuthorizationA +
          "&startDate=" + this.quStartdate +
          "&endDate=" + this.quEnddate +
          "&collaDuty=" + this.quNumberEnd;

        $("#exportCurrent").attr("disabled");
        setTimeout(function () {
          $('#exportCurrent').removeAttr('disabled');
        }, 5000);
        let dp = '/dw/download/mtsl00010export?';
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
      })
    },

  }
</script>

<style lang="less">
  .mtsl00010 .el-tabs__content{
    display: none;
  }
  .exportBtnBoxq {
    margin-top: 10px;
    width: 422px;
  }

  .moreBtns{
    color: #2db7f5;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 36px;
    margin-top: 1px;
  }
</style>
