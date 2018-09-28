<template>
  <section id="sixFiles" class="demandQuery">
    <!--头部logo-->
    <header></header>
    <!--查询条件收起与展示-->
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse" >
      <Panel name="1">
        <p>质押式回购日内特定时间段供需情况查询
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
            <div class="flexBox">
              <Form-item prop="tradeDate" label="交易日期">
                <Date-picker id="tradeDate" type="date" placeholder="选择交易日期" v-model="formValidate.tradeDate"></Date-picker>
              </Form-item>
              <Form-item prop="startTime" label="起始时间">
                <TimePicker id="startTime" type="time" format="HH:mm" placeholder="选择起始时间" :disabled-hours="[0,1,2,3,4,5,6,7,8,12,16,17,18,19,20,21,22,23]" v-model="formValidate.startTime"></TimePicker>
              </Form-item>
              <Form-item prop="endTime" label="结束时间">
                <TimePicker id="endTime" type="time" format="HH:mm" placeholder="选择结束时间" :disabled-hours="[0,1,2,3,4,5,6,7,8,12,16,17,18,19,20,21,22,23]" v-model="formValidate.endTime"></TimePicker>
              </Form-item>
              <Form-item prop="secCode" label="债券代码">
                <Select placeholder="选择债券代码" v-model="formValidate.secCode" id="code">
                  <Option v-for="item in codeList" :value="item.sec_code" :key="item.sec_code">{{ item.sec_code }}</Option>
                </Select>
              </Form-item>
              <Form-item label="利率阈值" prop="rateValue">
                <Input :maxlength=9 placeholder="输入利率阈值"  v-model="formValidate.rateValue" id="rateValue" :min="0"></Input> %及以上
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
    <Modal id="lookInfoPop" title="质押式回购日内特定时间段供需情况查询  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
      <b>一．	整体说明</b>
      <br>1	本应用可查询时间起始范围为：20091123 – 至今
      <br>2	本应用可查询T日数据的时点为：T日17:00后
      <br>3	本应用限制最大查询时间区间为：单个交易日中的某一连续时段
      <br>4	超过利率阈值指大于或等于该值。
      <br><b>二．	单指标算法</b>
      <br>1	一码通号	以证券账户T日对应的一码通号为准，按一码通号识别单一投资者
      <br>2	证券账户	在指定时段、指定回购品种的条件下，查询同一码通号名下买入成交价格大于或等于利率阈值（有过一笔即算）的所有证券账户
      <br>3	证券账户名称	证券账户的名称
      <br>4	最高成交价格	在指定时段、指定回购品种的条件下，查询该证券账户的最高买入成交价格
      <br>5	加权平均价	在指定时段、指定回购品种的条件下，查询该证券账户的加权平均买入成交价格。不限于是否超过利率阈值
      公式：SUM( 每笔买入成交价格 * 每笔买入成交数量 ) / SUM( 每笔买入成交数量 )
      <br>6	超过利率阈值的成交金额（万元）	在指定时段、指定回购品种的条件下，查询该证券账户买入成交价格大于或等于利率阈值的成交金额汇总
      <br>7	全天加权平均价	在指定回购品种的条件下，查询该证券账户T日全天的加权平均买入成交价格。不限于是否超过利率阈值
      公式：SUM( 每笔买入成交价格 * 每笔买入成交数量 ) / SUM( 每笔买入成交数量 )
      <br>8	全天成交金额（万元）	在指定回购品种的条件下，查询该证券账户T日全天买入成交金额汇总
      <br>9	一码通号	在指定时段、指定回购品种的条件下，查询买入成交价格大于或等于利率阈值（有过一笔即算）的证券账户对应的一码通号
      <br>10	证券账户	显示为“一码通汇总”
      <br>11	证券账户名称	显示为“一码通汇总”
      <br>12	最高成交价格	在指定时段、指定回购品种的条件下，查询该一码通名下所有证券账户的最高买入成交价格
      <br>13	加权平均价	在指定时段、指定回购品种的条件下，查询该一码通名下所有证券账户的加权平均买入成交价格。不限于是否超过利率阈值
      公式：SUM( 每笔买入成交价格 * 每笔买入成交数量 ) / SUM( 每笔买入成交数量 )
      <br>14	超过利率阈值的成交金额（万元）	在指定时段、指定回购品种的条件下，查询该一码通名下所有证券账户买入成交价格大于或等于利率阈值的成交金额汇总
      <br>15	全天加权平均价	在指定回购品种的条件下，查询该一码通名下所有证券账户T日全天的加权平均买入成交价格。不限于是否超过利率阈值
      公式：SUM( 每笔买入成交价格 * 每笔买入成交数量 ) / SUM( 每笔买入成交数量 )
      <br>16	全天成交金额（万元）	在指定回购品种的条件下，查询该一码通名下所有证券账户T日全天买入成交金额汇总

    </Modal>
    <div class="tabTitle">
      <div class="noTab">
        <p class="returnTotal" v-if="returnTotal>0">查询结果共 {{ returnTotal }} 条记录</p>
        <el-table
          :data="tableDataList"
          border
          style="width: 100%"
        >
          <el-table-column v-for="(item,index) in tableColumns"
                           :formatter="formatterNumber"
             :key="item.field"
             :prop="item.field"
             :label="item.title"
             :align="item.align"
             :min-width="item.minWidth">
          </el-table-column>
        </el-table>
      </div>
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
      formatTbousandth
    } from '../assets/js/commen.js';
    import '../theme/sixCommon.less';
    import {tableColumns} from '../assets/js/demandQuery.js';
    export default {
      name: "demand-query",
      data () {
        var tradeDate = (rule, value, callback) => {
          // 交易日期验证
          value = $("#tradeDate .ivu-input").val();
          let tradeDate = this.formValidate.tradeDate;
          let nowDate = new Date();
          if (!value) {
            return callback(new Error('请选择交易日期！'))
          } else if (!((/^((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-8])))/).test(value))) {
            return callback(new Error('请输入正确的交易日期！'))
          } else if (tradeDate.format('yyyyMMdd') > nowDate.format('yyyyMMdd')) {
            return callback(Error('交易日期不能大于当前日期！'));
          }else {
            callback();
          }
        };
        var endTime = (rule, value, callback) => {
          // 结束时间验证
          value = $("#endTime .ivu-input").val();
          let startdateValue = $("#startTime .ivu-input").val();
          let enddateValue = $("#endTime .ivu-input").val();
          if (!value) {
            return callback(new Error('请选择结束时间！'))
          } else if (!((/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/).test(value))) {
            return callback(new Error('请输入正确的结束时间！'))
          } else if (startdateValue> enddateValue) {
            return callback(new Error('结束时间不能小于起始时间！'))
          } else {
            callback();
          }
        };
        var startTime = (rule, value, callback) => {
          // 起始时间验证
          value = $("#startTime .ivu-input").val();
          let startdateValue = $("#startTime .ivu-input").val();
          let enddateValue = $("#endTime .ivu-input").val();
          if (!value) {
            return callback(new Error('请选择起始时间！'))
          } else if (!((/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/).test(value))) {
            return callback(new Error('请输入正确的起始时间！'))
          }else if (startdateValue > enddateValue) {
            return callback(new Error('起始时间不能大于结束时间！'))
          } else {
            callback();
          }
        };
        var rateValue = (rule, value, callback) => {
          // 利率阈值验证
          var reg = /^\d{1,9}$|(^\d{1,9}\.+\d{1,9}$)/
          if (!value) {
            return callback(new Error('请输入利率阈值！'))
          } else if (!reg.test(value)) {
            return callback('利率阈值为纯数字！');
          } else {
            callback();
          }
        };
        return {
          // 查询日期选择范围
          dateRange: {
            disabledDate(date) {
              return date.valueOf() > Date.now();
            }
          },
          collapse: '1',
          //日期初始化
          formValidate: {
            tradeDate: new Date(initialDate()),
            startTime: '09:00',
            endTime: '15:00',
            secCode: '204001',
            rateValue: 10
          },
          // 保存查询条件
          submitValidate: {
            tradeDate: new Date(initialDate()),
            startTime: '09:00',
            endTime: '15:00',
            secCode: '204001',
            rateValue: 10
          },
          codeList: [],
          // 查询条件验证
          ruleValidate: {
            tradeDate: [
              {required: true, validator: tradeDate, trigger: 'change'}
            ],
            secCode: [
              {required: true, message: '请选择债券代码', trigger: 'change'}
            ],
            startTime: [
              {required: true, validator: startTime, trigger: 'change'}
            ],
            endTime: [
              {required: true, validator: endTime, trigger: 'change'}
            ],
            rateValue: [
              {required: true, validator: rateValue, trigger: 'change'}
            ]
          },
          // 加载图标是否显示
          loadingIcon: false,
          // 统计口径弹框是否显示
          changeInfo: false,
          // table数据
          tableDataList: [],
          tableColumns: tableColumns,
          // 分页初始化
          returnTotal: 0,
          pageNumber: 1,
          pageSize: 500,
          timeout: '',
        }
      },
      mounted () {
        this.getSecCode();
      },
      methods: {
        // 列：格式化字符
        formatterNumber:function (row,col,cellValue) {
          var prop = col.property
          if(prop == 'ccrc_acct_id'  ||prop=='acct_id' ){
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
        getSecCode () {
          this._fetch(fetch('/dw/pr/secde', {
            method: "GET",
            // body: JSON.stringify(),
            mode: 'cors',
            headers: commonHeader
          }), 600000)
            .then((res) => {
              if (res.ok === true) {
                return res.json()
              }
            })
            .then(data => {
              if (this.timeout != '') {
                clearTimeout(this.timeout);
              }
              // 获取数据
              if (data.success == true) {
                  this.codeList = data.resData.result[0].data;
              } else {
                this.codeList = [];
                this.returnTotal = 0;
                this.$alert("债券代码获取失败，" + data.message,'错误',{
                  confirmButtonText:'确定',
                  type: 'error'
                })
              }
            })
            .catch((err) => {
              console.log(err);
              this.loadingIcon = false;
              this.$Message.warning("系统繁忙，请稍后再试!");
            });
        },
        handleSubmit (data) {
          // 查询功能
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              this.submitValidate = {
                tradeDate: data.tradeDate.format('yyyy-MM-dd'),
                startTime: $("#startTime .ivu-input").val(),
                endTime: $("#endTime .ivu-input").val(),
                secCode: data.secCode,
                rateValue: data.rateValue,
              },
              this.$Message.success('提交成功!请等待~');
              this.pageChange(1);
            } else {
              return false;
            }
          })
        },
        exportData() {
          var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +
            '&tradeDate=' + this.submitValidate.tradeDate  + '&startTime=' + this.submitValidate.startTime + '&endTime=' + this.submitValidate.endTime + '&rateValue=' + this.submitValidate.rateValue + '&secCode=' + this.submitValidate.secCode;
          void(window.open('/dw/pr/pidsexport?' + downfileParams +commonGetReqParam));

        },
        pageChange (val) {
          // 翻页触发
          // 加载弹出层显示
          this.loadingIcon = true;
          // 当前页码
          this.pageNumber = val;
          // 传递参数
          let searchParams = {
            "tradeDate": this.submitValidate.tradeDate,
            "startTime": this.submitValidate.startTime,
            "endTime": this.submitValidate.endTime,
            "rateValue": this.submitValidate.rateValue,
            "secCode": this.submitValidate.secCode,
            "userId": srcUseridA,
            "userName": srcUsernameA,
            // "reQuery": statics,
            "pageNo": val,
            "pageSize": this.pageSize,
            // "businessId": "mtsl00003"
          };
          this._fetch(fetch('/dw/pr/pids', {
            method: "POST",
            body: JSON.stringify(searchParams),
            mode: 'cors',
            headers: commonHeader
          }), 600000)
            .then((res) => {
              if (res.ok === true) {
                return res.json()
              }
            })
            .then(data => {
              if (this.timeout != '') {
                clearTimeout(this.timeout);
              }
              // 获取数据
              if (data.success == true) {
                if (data.resData.data.length > 0) {
                  this.tableDataList = data.resData.data;
                  this.returnTotal = data.resData.totalCount;
                } else {
                  this.$Message.warning("查询无数据");
                  this.tableDataList = [];
                  this.returnTotal = 0;
                }
                this.loadingIcon = false;
              } else {
                this.loadingIcon = false;
                this.tableDataList = [];
                this.returnTotal = 0;
                this.$alert("查询出错，" + data.message,'错误',{
                  confirmButtonText:'确定',
                  type: 'error'
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

<style lang="less" scoped>
  .demandQuery {
    .ivu-form-item {
      margin: 15px 0!important;
    }
    .submitBtnBox {
      margin-top: 15px;
    }
    #code {
      width: 187px;
    }
    #rateValue {
      width: 187px;
    }
  }
</style>
