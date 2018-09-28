<template>
  <section id="sixFiles">
    <!--头部logo-->
    <header></header>
    <!--查询条件收起与展示-->
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>融资融券信用交易
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
    <Modal id="lookInfoPop" title="融资融券信用交易  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
      <br><b>一．数据说明</b>
      <br>1)	本应用可查询时间起始范围为：2010/03/31-now
      <br>2)	本应用可查询T日数据的时点为：T日22:00后
      <br>3)	本应用限制最大查询时间区间为： 无限制
      <br>4)	证券查询范围：融资融券信用交易 （股票、债券、基金、权证）
      <br>5)	交易平台：竞价系统
      <br><b>二．	单指标算法</b>
      <br>序号	展示字段	展示字段算法或公式
      <br>1.	证券品种	固定分为A股、基金、债券和合计。
      <br>2.	融资买入金额	统计区间融资买入金额合计
      <br>3.	买券还款金额	统计区间买券还款金额合计
      <br>4.	融资平仓金额	统计区间融资平仓金额合计
      <br>5.	日均	以上三个指标除以交易天数
      <br>6.	融券卖出金额	统计区间融券卖出金额合计。
      <br>7.	买券还券金额	统计区间买券还券金额合计
      <br>8.	融券平仓金额	统计区间融券平仓金额合计
      <br>9.	日均	以上三个指标除以交易天数
      <br>10.	担保品买入金额	统计区间内担保品买入金额合计
      <br>11.	担保品卖出金额	统计区间内担保品卖出金额
      <br>12.	担保品交易金额	担保品买入金额+担保品卖出金额


    </Modal>
    <div class="tabTitle">
      <div class="noTab">
        <p class="returnTotal" v-if="returnTotal>0">查询结果共 {{ returnTotal }} 条记录</p>
        <el-table
          :data="tableDataList"
          border
          style="width: 100%"
          >
          <el-table-column align="center" label="明细数据超链接" min-width="200" :key="Math.random()">
            <template scope="scope">
              <el-button type="text" v-for="item in hrefList" :key="item.value" @click="jumpHref(item.flagDayMonYear, item.url, item.businessId, item.value, item.title, scope.row)">{{ item.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column :formatter="formatterNumber" v-for="(item,index) in tableColumns"
             :key="Math.random()"
             :prop="item.field"
             :label="item.title"
             :align="item.align"
             :min-width="item.minWidth">
            <el-table-column
              :formatter="formatterNumber"
              v-for="(itemChild,index) in item.children"
              :key="Math.random()"
              :prop="itemChild.field"
              :label="itemChild.title"
              :align="item.align"
              :min-width="itemChild.width"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <ul class="checkType">
        <li>
          <el-checkbox-group v-model="scaleType" @change="changeCheck">
            <el-checkbox v-for="typeItem in scaleTypeList" :label="typeItem.key" :key="typeItem.key">{{typeItem.name}}</el-checkbox>
          </el-checkbox-group>
        </li>
        <li>
          <span class="selectUnit">单位选择：</span>
          <el-radio-group v-model="unitType" @change="changeUnit">
            <el-radio v-for="unit in unitList" :label="unit.key" :key="unit.key">{{ unit.name }}</el-radio>
          </el-radio-group>
        </li>
      </ul>
      <div class="pageModule">
        <Page :total="returnTotal" :current="pageNumber" :page-size="pageSize" :page-size-opts=[500,1000] placement="top" show-sizer @on-page-size-change="pageChangeSize" @on-change="pageChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData()" :disabled="returnTotal<=0">
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
    getUrlDate,
    formatTbousandth
  } from '../assets/js/commen.js';
  import '../theme/sixCommon.less';
  // import '../theme/threeCommon.less';
  // import '../theme/fiveAppCommon.less';
  import {tableColumns_MTSL03, tableColumns_MTSL03_href} from '../assets/js/MTSL_00003.js';

  export default {
    name: "m-t-s-l_00003",
    data () {
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
        value = $(".ivu-input:eq(1)").val();
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
        collapse: '1',
        //日期初始化
        formValidate: {
          startdate: new Date(getUrlDate(1,initialDate())),
          enddate: new Date(getUrlDate(2,initialDate()))
        },
        // 保存查询条件
        submitValidate: {
          startdate: new Date(getUrlDate(1,initialDate())),
          enddate: new Date(getUrlDate(2,initialDate()))
        },
        // 查询条件验证
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', validator:startDate, trigger: 'change,blur'}
          ],
          enddate: [
            {required: true, type: 'date', validator:endDate, trigger: 'change,blur'}
          ]
        },
        // 加载图标是否显示
        loadingIcon: false,
        // 统计口径弹框是否显示
        changeInfo: false,
        // 表头数据
        tableColumns: [],
        hrefList: tableColumns_MTSL03_href,
        // 表格元数据
        tableDataList: [],
        // 日均、占比选择数据初始化
        scaleType: [],
        scaleTypeList: [{
          name: '展现占比指标',
          key: 'propor',
        }, {
          name: '展现日均指标',
          key: 'average',
        }],
        // 万元、亿元数据初始化
        unitType: 'hundredMillion',
        unitList: [{
          name: '万元',
          key: 'thousand'
        }, {
          name: '亿元',
          key: 'hundredMillion'
        }],
        isData: false,
        // 分页初始化
        returnTotal: 0,
        pageNumber: 1,
        pageSize: 500,
        timeout: '',
      }
    },
    mounted () {
      if(getUrlDate()){
        this.handleSubmit(this.formValidate)
      };
      // let jumpParam = window.location.href.split('?')[1].split('&');
      // if (jumpParam.length == 7) {
      //   this.formValidate.startdate = new Date(jumpParam[5].split('=')[1]);
      //   this.formValidate.enddate = new Date(jumpParam[6].split('=')[1]);
      //   this.handleSubmit(this.formValidate);
      // }
      this.changeCheck();
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'sec_code' || prop == 'stat_date' ){
          return cellValue
        }
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
            this.submitValidate = {
              startdate: data.startdate.format('yyyy-MM-dd'),
              enddate: data.enddate.format('yyyy-MM-dd')
            },
            this.$Message.success('提交成功!请等待~');
            this.pageChange(1);
          } else {
            return false;
          }
        })
      },
      jumpHref (flagDayMonYear, url, businessId, type, title, data) {
        // 表格超链接点击
        let param = {
          flagDayMonYear: flagDayMonYear,
          url: url,
          businessId: businessId,
          type: type,
          title: title,
          startdate: this.submitValidate.startdate,
          enddate: this.submitValidate.enddate,
          data: data,
        };
        sessionStorage.setItem('paramData',JSON.stringify(param));
        window.open('#/MTSL_00003_detail?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA);
      },
      changeCheck () {
        // 选中日均占比触发事件
        this.tableColumns = [];
        tableColumns_MTSL03.forEach((item, index) => {
          if (!item.children) {
            this.tableColumns.push(item)
          } else {
            this.tableColumns.push({field: item.field, title: item.title, minWidth: item.minWidth, align: item.align, children: []});
            item.children.forEach((childrenitem, key) => {
              if (childrenitem.type=== 'amount') {
                this.tableColumns[index].children.push(childrenitem);
              } else {
                this.scaleType.forEach(checkItem => {
                  this.scaleTypeList.forEach(typeItem => {
                    if (typeItem.key === checkItem) {
                      if (childrenitem.type === typeItem.key) {
                        this.tableColumns[index].children.push(childrenitem)
                      }
                    }
                  })
                })
              }
            })
          }
        })
      },
      changeUnit () {
       // 单位切换
        if (this.isData) {
          let arr = JSON.parse(localStorage.getItem('changeUnitData'));
          let unit = 1;
          if (this.unitType == 'thousand') {
            unit = 10000
          } else if (this.unitType == 'hundredMillion') {
            unit = 100000000
          }
          arr.forEach((item, index) => {
            item.margin_buy_amt_all = (item.margin_buy_amt_all/unit).toFixed(2);
            item.margin_buy_amt_avg = (item.margin_buy_amt_avg/unit).toFixed(2);
            item.margin_sell_amt_all = (item.margin_sell_amt_all/unit).toFixed(2);
            item.margin_sell_amt_avg = (item.margin_sell_amt_avg/unit).toFixed(2);
            item.forced_sell_amt_all = (item.forced_sell_amt_all/unit).toFixed(2);
            item.forced_sell_amt_avg = (item.forced_sell_amt_avg/unit).toFixed(2);
            item.short_sell_amt_all = (item.short_sell_amt_all/unit).toFixed(2);
            item.short_sell_amt_avg = (item.short_sell_amt_avg/unit).toFixed(2);
            item.short_buy_amt_all = (item.short_buy_amt_all/unit).toFixed(2);
            item.short_buy_amt_avg = (item.short_buy_amt_avg/unit).toFixed(2);
            item.forced_buy_amt_all = (item.forced_buy_amt_all/unit).toFixed(2);
            item.forced_buy_amt_avg = (item.forced_buy_amt_avg/unit).toFixed(2);
            item.credit_buy_amt_all = (item.credit_buy_amt_all/unit).toFixed(2);
            item.credit_buy_amt_avg = (item.credit_buy_amt_avg/unit).toFixed(2);
            item.credit_sell_amt_all = (item.credit_sell_amt_all/unit).toFixed(2);
            item.credit_sell_amt_avg = (item.credit_sell_amt_avg/unit).toFixed(2);
            item.credit_amt_all = (item.credit_amt_all/unit).toFixed(2);
            item.credit_amt_avg = (item.credit_amt_avg/unit).toFixed(2);
          })
          this.tableDataList = arr;
        }
      },
      exportData() {
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +
        "&endDate=" + this.submitValidate.enddate + '&startDate=' + this.submitValidate.startdate + '&unit=' + this.unitType + '&quality=' + this.scaleType.toString();
        void(window.open('/dw/download/mtsl00003export?' + downfileParams +commonGetReqParam));

      },
      pageChange (val) {
        // 翻页触发
        // 加载弹出层显示
        this.loadingIcon = true;
        // 当前页码
        this.pageNumber = val;
        // 传递参数
        let searchParams = {
          "startDate": this.submitValidate.startdate,
          "endDate": this.submitValidate.enddate,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          // "reQuery": statics,
          "pageNo": val,
          "pageSize": this.pageSize,
          "businessId": "mtsl00003"
        };
        this._fetch(fetch('/dw/mtsl/mtsl00003', {
          method: "POST",
          body: JSON.stringify(searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000)
          .then((res) => {
            if (res.ok === true) {
              return res.json()
            }
          }, function (err) {
            this.$Message.warning('系统繁忙，请稍后再试!');
            this.loadingIcon = false;
          })
          .then(data => {
            if (this.timeout != '') {
              clearTimeout(this.timeout);
            }
            // 获取数据
            if (data.success == true) {
              if (data.resData.data.length > 0) {
                // 判断单位
                // 原始数据保存（元为单位）
                localStorage.setItem('changeUnitData',JSON.stringify(data.resData.data));
                this.isData = true;
                // 转换单位
                this.changeUnit();
                this.returnTotal = data.resData.totalCount;
              } else {
                this.$Message.warning("查询无数据");
                this.tableDataList = [];
                this.isData = false;
                this.returnTotal = 0;
              }
              this.loadingIcon = false;
            } else {
              this.loadingIcon = false;
              this.tableDataList = [];
              this.returnTotal = 0;
              this.$alert("错误" + data.message,'错误',{
                confirmButtonText:'确定',
                type:'error'
              })
            }
          })
          .catch((err) => {
            console.log(err);
            this.loadingIcon = false;
            this.$Message.warning("系统繁忙，请稍后再试!");
          });
      },
      pageChangeSize (val) {
        // 改变每页数据量触发
        this.pageSize = val;
        this.pageChange(1);
      },
    }
  }
</script>

<style lang="less">
  /*.checkType {*/
    /*padding: 10px 10px;*/
    /*width: 100%;*/
    /*float: left;*/
    /*border: 1px solid #e6ebf5;*/
    /*border-top: none;*/
    /*li {*/
      /*!*width: 500px;*!*/
      /*float: left;*/
      /*.selectUnit {*/
        /*font-size: 14px;*/
        /*margin: 0 10px 0 30px;*/
      /*}*/
    /*}*/
  /*}*/
</style>
