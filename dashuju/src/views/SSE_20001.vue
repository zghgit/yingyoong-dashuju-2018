<template>
  <section class="constWidth" id="sse20001">
    <div id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>市场概貌
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i
              :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>

          </p>
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
                <div class="moreBtn">
                  <div @click="isShowMore = !isShowMore"><span v-show="isShowMore">收起 ∧</span><span v-show="!isShowMore">更多 ∨</span></div>
                </div>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </div>
              <div class="exportBtnBox" v-if="isShowMore" style="margin-top: 15px">
                <el-radio-group v-model="currentSelectRadio">
                  <el-radio :label="1">含大宗</el-radio>
                  <el-radio :label="2">不含大宗</el-radio>
                  <el-radio :label="3">大宗单平台</el-radio>
                </el-radio-group>
              </div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }" style="z-index:999999999999999999;">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="市场概貌  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
      </Modal>

      <Modal id="dayTableModel" width="1024" height="1200" :closable="false" v-model="dayTableModel"
             class-name="vertical-center-modal" cancel-text>
        <!--表格弹窗-->
        <el-table
          :data="dayTableData"
          border

          style="width: 100%;">
          <template v-for="(item,index) in dayTableColumns">
            <el-table-column sortable :key="Math.random()"
                             :prop="item.key"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
            </el-table-column>
          </template>
        </el-table>
        <!--<div class="pageModule">-->
        <!--<Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"-->
        <!--show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>-->
        <!--</div>-->
        <div class="exportBtn">
          <Button id="exportCurrent2" type="primary" size="large" @click="exportData()" disabled>
            <Icon type="ios-download-outline"></Icon>
            导出全部结果为XLSX文件
          </Button>
        </div>
      </Modal>
      <!--头部logo-->
      <div class="tableBox">
        <p id="infoTableList" class="redtext listlength"></p>
        <el-table
          :data="tableData1"
          border
          style="width: 100%">
          <template v-for="(item,index) in tableColumns1">
            <el-table-column v-if="item.hasAnchor" :key="Math.random()"
                             :prop="item.key"
                             :label="item.title"
                             :align="item.align"
                             :width="item.width">
              <template scope="scope">
                <a @click="anchorClick(scope,ite,i)"
                   v-for="(ite,i) in scope.row.arr">{{ite}}<span
                  v-if=" i < scope.row.arr.length - 1">、
              </span></a>
              </template>
            </el-table-column>
            <el-table-column v-else :key="Math.random()"
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
          <Button id="exportCurrent" type="primary" size="large" @click="exportData('exportCurrent','sse20001export')"
                  disabled>
            <Icon type="ios-download-outline"></Icon>
            导出全部结果为XLSX文件
          </Button>
        </div>
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
    IPName
  } from '../assets/js/commen.js';
  import {
    tableColumns1, tableColumns2, dayTableColumnsSource, monthTableColumns, aTableColumns, bTableColumns, jjTableColumns
  } from '../assets/js/SSE_20001.js';
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
        dayTableColumns: dayTableColumnsSource,
        monthTableColumns: monthTableColumns,
        aTableColumns: aTableColumns,
        bTableColumns: bTableColumns,
        jjTableColumns: jjTableColumns,
        // 排序
        defaultSort: {prop: 'sec_type_name', order: 'descending'},
        //  日。月、年数据源数组
        dayTableData: [],
        monthTableData: [],
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
        //单选框
        currentSelectRadio: 1,
        //  显示更多
        isShowMore: false,
        //  日、月 表格model
        dayTableModel: false,
        showDayOrMonthTable: 0,
        //  是否是单日
        isSingleDay: false,
        //  保存钻取页面的查询数据
        paramsFromModelPage: '',
        // 跳转域名
        IPConfig: ''
      }
    },
    mounted() {
      this.getIPConfig();
    },
    methods: {
      tableCheckIsDeal: function (oldArr, otherObj) {
        // 过滤为-的对象
        var temp = []
        for (var key in otherObj) {
          if (otherObj[key] == '-') {
            tableColumns1.forEach((item, index) => {
              if (item.key == key) {
                temp.push(item.title)
              }
            })
          }
        }

        var n = oldArr.length

        var arr = []
        for (var i = 0; i < n; i++) {
          var o = oldArr[i]

          if (!o) break
          if (temp.indexOf(o.title) < 0) {
            arr.push(o)
          }
        }
        if (this.currentSelectRadio != 2) return arr

        var newArr = []
        arr.forEach((item, index) => {
          if (!item.isDeal) {
            newArr.push(item)
          }
        })
        return newArr
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
      // 日表格排序
      daySortMethod: function (a, b) {
      },
      // 日、月、年。个券点击
      anchorClick: function (scope, item, i) {
        var self = this;
        this.paramsFromModelPage = '';
        var dataObj = {
          secTypeName: scope.row.sec_type_name,
          dzFlag: this.currentSelectRadio,
          endDate: this.formValidate.enddate.format('yyyy-MM-dd'),
          startDate: this.formValidate.startdate.format('yyyy-MM-dd')
        }
        var url = '/dw/mktdt/sse_20001_day'
        if (item == '个券') {
          url = '/dw/mktdt/sse_20001_a_b'
          if (scope.row.sec_type_name == 'A股') {
            dataObj.type = 1
            this.dayTableColumns = this.tableCheckIsDeal(aTableColumns, scope.row)
            this.defaultSort.prop = 'sec_code'
          }
          if (scope.row.sec_type_name == 'B股') {
            dataObj.type = 2
            this.dayTableColumns = this.tableCheckIsDeal(bTableColumns, scope.row)
            this.defaultSort.prop = 'sec_code'
          }
          if (scope.row.sec_type_name == '债券合计' || scope.row.sec_type_name == '政府债' || scope.row.sec_type_name == '公司债') {
            // window.href = ''
            // window.open('#/'+url+'?signature='+signatureA+'&srcUserid='+srcUseridA+'&srcUsername='+srcUsernameA+'&dwSessionid='+dwSessionidA+'&Authorization='+AuthorizationA+'&startdate='+this.submitValidate.startdate+'&enddate='+this.submitValidate.enddate)
            alert('跳转页面ZJB_60012债券交易行情')
            return
          }
          if (scope.row.sec_type_name == '债券回购') {
            // window.href = ''
            alert('跳转页面ZJB_60045回购定盘利率')
            return
          }
          if (scope.row.sec_type_name == '基金合计' || scope.row.sec_type_name == '封闭基金' || scope.row.sec_type_name == 'ETF' || scope.row.sec_type_name == 'LOF' || scope.row.sec_type_name == '交易型货币基金') {
            url = '/dw/mktdt/sse_20001_fund'
            if (scope.row.sec_type_name == '基金合计') dataObj.foundType = 'ALL'
            if (scope.row.sec_type_name == '封闭基金') dataObj.foundType = '31'
            if (scope.row.sec_type_name == 'ETF') dataObj.foundType = '32'
            if (scope.row.sec_type_name == 'LOF') dataObj.foundType = '3c'
            if (scope.row.sec_type_name == '交易型货币基金') dataObj.foundType = '3b'
            this.dayTableColumns = this.tableCheckIsDeal(jjTableColumns, scope.row)
            this.defaultSort.prop = 'sec_code'
          }
        } else {
          if (item == '月' || item == '年') {
            this.dayTableColumns = this.tableCheckIsDeal(monthTableColumns, scope.row)
            url = '/dw/mktdt/sse_20001_month_year'
            dataObj.secTypeFlag = item == '月' ? 7 : 4
            this.defaultSort.prop = 'trade_month'
          } else {
            this.dayTableColumns = this.tableCheckIsDeal(dayTableColumnsSource, scope.row)
            this.defaultSort.prop = 'substr'
          }
        }
        this.isHide = false
        this.dayTableModel = true
        this.dayTableData = []

        this.paramsFromModelPage = dataObj
        $("#exportCurrent2").attr("disabled");

        $.ajax({
          type: 'POST',
          timeout: 600000,
          headers: commonHeader,
          url: url,
          data: JSON.stringify(dataObj),
          success: function (res) {
            self.isHide = true
            if (res.success === false) {
              self.$Message.error('查询出错：', res.message);
              return
            }
            if (res.resData.data.length < 1) {
              self.$Message.warning('查询无数据！');
              return
            }
            $("#exportCurrent2").removeAttr("disabled");
            self.dayTableData = res.resData.data
            res.resData.data.forEach((item, index) => {
              var i = 0
              for (var key in item) {
                i++
                if (i > 2) {
                  var s = 2
                  if (key == 'lst_vol_cnt') s = -1
                  item[key] = self.formatAnchorNumber(item[key], s)
                }
              }
            })
            setTimeout(() => {
              var dom = $('.ivu-modal-wrap .ivu-modal-body')[1]
              $(dom).css({'max-height': '900px'})
            }, 20)
          },
          error: function (err) {
            self.$Message.error('查询出错：', err);
          }
        })
      },
      // 格式化子表格列的数字
      formatAnchorNumber: function (value, restN) {
        var n = restN > 0 ? parseFloat(value).toFixed(restN) : parseInt(value)
        n = isNaN(n) ? '' : n
        return n
      },
      //更多按钮点击
      moreBtnClick: function () {

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
      publicPagination(pages, rows, statics) {

        this.searchParams = {
          "startDate": this.formValidate.startdate.format('yyyy-MM-dd'),
          "endDate": this.formValidate.enddate.format('yyyy-MM-dd'),
          "dzFlag": this.currentSelectRadio,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "reQuery": statics,
          "pageNo": pages,
          "pageSize": rows,
          "businessId": "BND_15023",
        };
        //声明加载中
        $("#loadBox").removeClass("hide");
        //接口请求处理
        const url = '/dw/mktdt/sse_20001';
        this.tableData1 = [];
        this.dealitems = 0;
        let _this = this;
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
            this.$alert("查询出错" + dataError,'提示',{
              confirmButtonText:'确定'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData;
            var datalength = data.resData.length;
            if (dataResponse.length == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              $("#exportCurrent").attr("disabled");
            } else {
              _this.isSingleDay =data.message == '1' ? true : false
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              // 添加超链接
              _this.dataArrayAll.forEach((item, index) => {
                item.arr = ['日', '月', '年']
                // if ((index != 0 && index != 3 && index != 11) && index <= 12) {
                if ((index != 0 && index != 3) && index <= 12) {
                  item.arr.push('个券')
                }
              })
              //是否是单日
              this.tableColumns1 = this.isSingleDay ? tableColumns2 : tableColumns1
              //是否展示交易类指标、换手率指标
              if (this.currentSelectRadio == 2) {
                this.tableColumns1 = tableColumns1.slice(0, 7)
                this.tableColumns1.push(tableColumns1[tableColumns1.length - 1])
              }
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
      exportData(i_d, url) {
        var params = ''
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA + "&startDate=" + this.formValidate.startdate.format('yyyy-MM-dd') + "&endDate=" + this.formValidate.enddate.format('yyyy-MM-dd') + '&dzFlag=' + this.currentSelectRadio;
        if (!i_d || i_d == '') {
          if (this.paramsFromModelPage != '') {
            i_d = 'exportCurrent2'
            //  A股/B股

            if ((this.paramsFromModelPage.secTypeName == 'A股' || this.paramsFromModelPage.secTypeName == 'B股') && this.paramsFromModelPage.type) {
              url = 'sse20001aorbsharesexport'
              params = '&type=' + this.paramsFromModelPage.type
            } else if (this.paramsFromModelPage.secTypeFlag) {
              //  月/年
              url = 'sse20001monthyearexport'
              params = '&secTypeFlag=' + this.paramsFromModelPage.secTypeFlag + '&secTypeName=' + this.paramsFromModelPage.secTypeName
            } else if (this.paramsFromModelPage.foundType) {
              //  个券
              url = 'sse20001_fund_export'
              params = '&foundType=' + this.paramsFromModelPage.foundType
            } else {
              //  日
              url = 'sse20001dayexport'
              params = '&secTypeName='+this.paramsFromModelPage.secTypeName
            }
          }
        }
        $("#" + i_d).attr("disabled");
        setTimeout(function () {
          $('#' + i_d).removeAttr('disabled');
        }, 5000);
        var dp = '/dw/mktdt/' + url + '?'
        window.open(dp + downfileParams + params + commonGetReqParam)
      },
      getIPConfig () {
        this._fetch(fetch(IPName))
          .then((res) => {
            if (res.ok === true) {
              return res.json()
            }
          })
          .then(data => {
            this.IPConfig = data.configUrl
          });
      }
    }
  }
</script>
<style>

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

  .exportBtnBox {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    margin: 10px;
  }

  #lookInfoLink {
    color: gray;
    border: 1px solid gray;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin-left: 30px;
  }

  .checkAllBtn {
    margin-right: 30px;
  }

  .moreBtn {
    color: #2db7f5;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
</style>
