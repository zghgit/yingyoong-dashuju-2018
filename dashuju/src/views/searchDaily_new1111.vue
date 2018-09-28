
  <!--股票质押回购交易业务日报下载-->
  <template>
    <div class="searchInfonew" id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>股票质押回购交易业务日报下载
            <span id="lookInfoLink" class="lookInfo"
                  @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}
              <i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
          </p>
          <div slot="content"  >
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate">
              <div class="flexBox">
                <Form-item prop="startdate" id="startDateForm"
                           label="开始日期" :label-width="85">
                  <Date-picker
                    id="startDate"
                    type="date"
                    placeholder="选择开始日期"
                    v-model="formValidate.startdate"
                    class="datePickerWidth">
                  </Date-picker>
                </Form-item>
                <Form-item
                  prop="enddate"
                  id="endDateForm"
                  label="结束日期"
                  :label-width="110">
                  <Date-picker
                    id="endDate"
                    type="date"
                    placeholder="选择结束日期"
                    v-model="formValidate.enddate"
                    class="datePickerWidth">
                  </Date-picker>
                </Form-item>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary"
                          @click="handleSubmited('formValidate');">查询</Button>
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
      <Modal id="lookInfoPop" title="股票质押回购交易业务日报下载  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <h3>数据说明</h3>
        <p>无</p>
        <h3>指标说明</h3>
        <p>表1：股票质押回购交易概括<br>
          1. 待购回余额指当日股票质押式业务待购回金额合计。<br>
          2. 客户数量指当日待购回的账户数量。<br>
          3. 质押股票市值，指当日已质押未购回的证券数量 * 当日收盘价，债券使用全价计算。<br>
          4.
          履约保障比例(%)=调整后标的证券市值/初始交易金额，其中调整后标的证券市值为调整后标的证券数量在查询指定日期的收盘市值，对于标的证券类型为债券时，收盘价需使用全价=行情中收盘净价+当日应计利息。<br>
          5. 平仓线以下指履约保障比例小于等于130%。<br>
          6. 当日违约处置金额指当日交易类型为违约处置的交易金额。客户数量指涉及到违约处置的账户数量。<br>
          表2：股票质押回购单一股票质押集中度最高前10名<br>
          1. 按质押集中度展示当天质押集中度排名前十的证券代码及证券名称。<br>
          2. 质押集中度比例（%） = 持有待购回证券数量 * 100.00000 / 持有待购回证券总股本。采用百分比表示，保留5位小数。<br>
          表3：股票质押回购融资方情况<br>
          1. 统计人数时，仅统计股票质押回购业务融资方的股东账户，若某股东持有某任一证券比例大于或等于5%，则该股东计入持股5%及以上股东的人数。<br>
          2. 其他股东 = 合计持股人数 – 上市公司持股5%及以上股东人数。<br>
          3. 持股比例（%） = 当日该股东持有该证券的流通和非流通股本 * 100.00 / 当日该证券总股本。<br>
          4. 统计待购回金额时，若某股东持有两个证券，其中一个持股比例超过5%，另外一个不超过5%，则超过5%部分计入持股5%以上的待购回金额，5%以下的待购回则计入其他股东的待购回金额中。<br>
          表4：股票质押回购当日交易情况<br>
          1. 初始交易金额，指当日交易类型为初始交易的交易金额。剔除交收失败的数据。<br>
          2. 购回交易金额，指当日交易类型为购回交易、部分解质和终止购回的交易金额。<br>
          表5：股票质押回购履约保障比例小于130％客户金额最大前10名情况<br>
          1.
          履约保障比例(%)=调整后标的证券市值/初始交易金额，其中调整后标的证券市值为调整后标的证券数量在查询指定日期的收盘市值，对于标的证券类型为债券时，收盘价需使用全价=行情中收盘净价+当日应计利息。<br>
          2. 按照待购回余额排序。剔除交收失败的数据。<br>
          表6：股票质押回购履约保障比例小于130％券商金额最大前10名情况<br>
          1.
          履约保障比例(%)=调整后标的证券市值/初始交易金额，其中调整后标的证券市值为调整后标的证券数量在查询指定日期的收盘市值，对于标的证券类型为债券时，收盘价需使用全价=行情中收盘净价+当日应计利息。<br>
          2. 按照待购回余额排序。剔除交收失败的数据。<br>
        </p>
        <h3>其他说明</h3>
        <p>无</p>
      </Modal>


      <div class="dailyTableBox" id="showIviewTable">
        <p id="infoTableList" class="redtext listlength"></p>
        <table class="dailyHandle" :width="1000"
               :border="0" :cellspacing="0"
               :cellpadding="0">
          <thead>
          <tr>
            <th class="w150">报表日期</th>
            <th class="w699">日报名称</th>
            <th class="w150">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="tfStr">
            <td colspan="3" align="center">暂无数据</td>
          </tr>
          <tr v-for="(item,index) in data1" :key="index">
            <td align="center">{{item.rptDte}}</td>
            <td align="left">{{item.rptNme}}</td>
            <td align="center">
              <Button class="handleBtn" type="primary" size="small" @click="handleLook(item.rptDte,item.rptNme)">查&nbsp;&nbsp;看</Button>
              <Button class="handleBtn" type="primary" size="small" @click="handleDownload(item.rptDte,item.rptNme)">下&nbsp;&nbsp;载</Button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="pageModule">
          <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top"
                show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
        </div>
      </div>
      <div class="dailyContainer" id="showDailyContainer">
        <div class="cxBox">
          <Button class="searchDailyBtn"
                  id="returnBtn" type="primary"
                  @click="returnSubmited">返&nbsp;&nbsp;回</Button>
        </div>
        <div class="dailyListTitle">股票质押回购交易概括</div>
        <table class="daily1" :width="1000" :border="0" :cellspacing="0" :cellpadding="0">
          <thead>
          <tr>
            <th>指标名称</th>
            <th>统计维度</th>
            <th>数值</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="3">待购回余额（亿元）</td>
            <td>证券公司出资</td>
            <td align="right">{{tradeAmtBond}}</td>
          </tr>
          <tr>
            <td>资管产品出资</td>
            <td align="right">{{tradeAmtIm}}</td>
          </tr>
          <tr>
            <td>合计</td>
            <td align="right">{{tradeAmt}}</td>
          </tr>
          <tr>
            <td>客户数量</td>
            <td></td>
            <td align="right">{{sellAcctIdCnt}}</td>
          </tr>
          <tr>
            <td rowspan="3">质押股票市值（亿元）</td>
            <td>证券公司出资</td>
            <td align="right">{{holdAmtBond}}</td>
          </tr>
          <tr>
            <td>资管产品出资</td>
            <td align="right">{{holdAmtIm}}</td>
          </tr>
          <tr>
            <td>合计</td>
            <td align="right">{{holdAmtL}}</td>
          </tr>
          <tr>
            <td rowspan="3">平均履约保障比例（%）</td>
            <td>证券公司出资</td>
            <td align="right">{{tradeRatioBond}}</td>
          </tr>
          <tr>
            <td>资管产品出资</td>
            <td align="right">{{tradeRatioIm}}</td>
          </tr>
          <tr>
            <td>合计</td>
            <td align="right">{{tradeRatio}}</td>
          </tr>
          <tr>
            <td>履约保障比例在平仓线以下待回购余额（亿元）</td>
            <td></td>
            <td align="right">{{umatureAmt}}</td>
          </tr>
          <tr>
            <td>履约保障比例在平仓线以下客户数量</td>
            <td></td>
            <td align="right">{{acctIdCnt}}</td>
          </tr>
          <tr>
            <td rowspan="3">当日违约处置金额（万元）</td>
            <td>证券公司出资</td>
            <td align="right">{{buyTradeAmtBond}}</td>
          </tr>
          <tr>
            <td>资管产品出资</td>
            <td align="right">{{buyTradeAmtIm}}</td>
          </tr>
          <tr>
            <td>合计</td>
            <td align="right">{{buyTradeAmt}}</td>
          </tr>
          <tr>
            <td>当日违约处置涉及客户数量</td>
            <td></td>
            <td align="right">{{buyAcctIdCnt}}</td>
          </tr>
          <tr>
            <td rowspan="3">履约保障比例涉及的待购回余额（亿元）</td>
            <td>小于等于130%</td>
            <td align="right">{{unmatureAmtLessTh}}</td>
          </tr>
          <tr>
            <td>大于130%且小于等于150%</td>
            <td align="right">{{unmatureAmtMid}}</td>
          </tr>
          <tr>
            <td>大于150%</td>
            <td align="right">{{unmatureAmtGreTh}}</td>
          </tr>
          </tbody>
        </table>

        <div class="dailyTableBox">
          <div class="dailyListTitle">股票质押回购单一股票质押集中度最高前10名</div>
          <i-table border :columns="columns3" :data="data3"></i-table>
        </div>
        <div class="dailyTableBox">
          <div class="dailyListTitle">股票质押回购融资方情况</div>
          <i-table border :columns="columns5" :data="data5"></i-table>
        </div>
        <div class="dailyTableBox">
          <div class="dailyListTitle">股票质押回购当日交易情况</div>
          <i-table border :columns="columns6" :data="data6"></i-table>
        </div>
        <div class="dailyTableBox">
          <div class="dailyListTitle">股票质押回购履约保障比例小于130％客户金额最大前10名情况</div>
          <i-table border :columns="columns2" :data="data2"></i-table>
        </div>
        <div class="dailyTableBox">
          <div class="dailyListTitle">股票质押回购履约保障比例小于130％券商金额最大前10名情况</div>
          <i-table border :columns="columns4" :data="data4"></i-table>
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
      validNum
    } from '../assets/js/commen.js';
    import {columns2, columns3, columns4, columns5, columns6} from '../assets/js/searchDaily.js';
    //导出参数
    var downfileParams = "&signature=" + signatureA + "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&Authorization=" + AuthorizationA;

    //日期初始值
    let lastTradeDate = "";
    //查询参数初始化
    var upfileParamsValue = {
      signature: signatureA,
      Authorization: AuthorizationA
    };
    import '../theme/threeCommon.less';
    import '../theme/fifteenCommon.less';
    import {tableColumns1} from '../assets/js/searchDaily_new.js';
    export default {
      name: "searchInfonew",
      props: [],
      components: {},
      data() {
        return {
          collapse: '1',
          //  显示更多
          isHide: true,
          searchPanel: '1',
          addWidth: 1,
          urlParams: window.location.href,
          changeInfo: false,
          //下载的查询参数
          exportSearchParams: '',
          //日期参数
          rptDate: "",
          rptName: "",
          startdateFormat: '',
          enddateFormat: '',
          czrows: 2000,
          dealitems: 0,
          dealTableData: [],
          returnN: 1,
          returnTotal: 0,
          dataArrayAll: [],
          pageSize: 500,
          //文件解析参数
          upfileParams: upfileParamsValue,
          //证券代码已上传条数
          //开始日期
          options3: {
            disabledDate(date) {
              return date && date.valueOf() > Date.now();
            }
          },
          //结束日期
          options4: {
            disabledDate(date) {
              return date && date.valueOf() > Date.now();
            }
          },
          formValidate: {
            startdate: new Date(this.initialStartDate()),
            enddate: new Date(this.initialDate()),
            desc: '',
            cxtype: '按证券代码',
            seriesList: ['债券', '基金', '股票'],
            zqdmRows: "",
            showrow: 2000,
          },
          ruleValidate: {
            showrow: [
              {required: true, type: 'number', message: '显示行数不能为空', trigger: 'blur'}
            ],
            startdate: [
              {required: true, type: 'date', message: '请选择开始日期', trigger: 'change'}
            ],
            enddate: [
              {required: true, type: 'date', message: '请选择结束日期', trigger: 'change'}
            ],
            desc: [
              {required: true, message: '请输入股东账户', trigger: 'blur'},
            ]
          },
          tfStr: true,
          data1: [],
          columns2: columns2,
          data2: [],
          columns3: columns3,
          data3: [],
          columns4: columns4,
          data4: [],
          columns5: columns5,
          data5: [
            {
              statType: '上市公司持股5％以上股东'
            }, {
              statType: '其他股东'
            }, {
              statType: '合计'
            }
          ],
          columns6: columns6,
          data6: [],
          tradeAmtBond: 0,
          tradeAmtIm: 0,
          tradeAmt: 0,
          sellAcctIdCnt: 0,
          holdAmtBond: 0,
          holdAmtIm: 0,
          holdAmtL: 0,
          tradeRatioBond: 0,
          tradeRatioIm: 0,
          tradeRatio: 0,
          umatureAmt: 0,
          acctIdCnt: 0,
          buyTradeAmtBond: 0,
          buyTradeAmtIm: 0,
          buyTradeAmt: 0,
          buyAcctIdCnt: 0,
          unmatureAmtLessTh: 0,
          unmatureAmtMid: 0,
          unmatureAmtGreTh: 0,
          acctCnt1: 0,
          acctCnt2: 0,
          acctCnt3: 0,
          unmatureAmt1: 0,
          unmatureAmt2: 0,
          unmatureAmt3: 0,
          lookParams: {},
          searchParams: {},
          tableData1:[],
          tableColumns1:tableColumns1
        }
      },
      methods: {
        //返回到查询和列表
        returnSubmited: function () {
          document.getElementById("showIviewTable").style.display = "block";
          document.getElementById("showDailyContainer").style.display = "none";
        },
        //下载word文件
        handleDownload: function (typeDate, typeName) {
          //导出参数
          var downfileParams = "type=stockPledge&userId=" + srcUseridA +
            "&dwSessonid=" + dwSessionidA + "&userName=" + srcUsernameA
            + "&date=" + typeDate + "&Authorization=" + AuthorizationA + "&signature=" + signatureA;
          void(window.open('/dw/download/word?' + downfileParams));
        },
        //显示查看结果
        handleLook: function (lookDate, lookTitle) {
          document.getElementById("showIviewTable").style.display = "none";
          document.getElementById("showDailyContainer").style.display = "block";
          this.tradeAmtBond = "";
          this.tradeAmtIm = "";
          this.tradeAmt = "";
          this.sellAcctIdCnt = "";
          this.holdAmtBond = "";
          this.holdAmtIm = "";
          this.holdAmtL = "";
          this.tradeRatioBond = "";
          this.tradeRatioIm = "";
          this.tradeRatio = "";
          this.umatureAmt = "";
          this.acctIdCnt = "";
          this.buyTradeAmtBond = "";
          this.buyTradeAmtIm = "";
          this.buyTradeAmt = "";
          this.buyAcctIdCnt = "";
          this.unmatureAmtLessTh = "";
          this.unmatureAmtMid = "";
          this.unmatureAmtGreTh = "";
          this.data3 = [];
          this.data5 = [];
          this.data6 = [];
          this.data2 = [];
          this.data4 = [];
          //this.removeClass(loadBox,"hide");
          this.lookParams = {
            "rptDte": lookDate,
            "userId": srcUseridA,
            "userName": srcUsernameA
          };
          //console.log(this.lookParams,"-----lookParams");
          //声明加载中
          var loadBox = document.getElementById("loadBox");
          //this.removeClass(loadBox,"hide");
          const url = '/dw/mktdt/stock_pleg_rep_tran_detail';
          this._fetch(fetch(url, {
            method: "POST",
            body: JSON.stringify(this.lookParams),
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
              "signature": signatureA,
              "Authorization": AuthorizationA
            }
          }), 600000).then(function (response) {
            return response.json()
          }, function (error) {
            _this.addClass(loadBox, "hide");
            _this.$Message.error('系统繁忙，刷新页面!');
            this.isHide = true;
            this.tfStr = true;
          }).then(data => {
            if (this.t != '') {
              clearTimeout(this.t);
            }
            this.isHide = true;

            //取数据
            var dataResponse = data.resData;
            if (dataResponse == null) {

            } else {

              if (dataResponse.length == 0) {

              } else {
                //表一获取
                var tableOne = dataResponse.outline;
                this.tradeAmtBond = tableOne[0];
                this.tradeAmtIm = tableOne[1];
                this.tradeAmt = tableOne[2];
                this.sellAcctIdCnt = tableOne[3];
                this.holdAmtBond = tableOne[4];
                this.holdAmtIm = tableOne[5];
                this.holdAmtL = tableOne[6];
                this.tradeRatioBond = tableOne[7];
                this.tradeRatioIm = tableOne[8];
                this.tradeRatio = tableOne[9];
                this.umatureAmt = tableOne[10];
                this.acctIdCnt = tableOne[11];
                this.buyTradeAmtBond = tableOne[12];
                this.buyTradeAmtIm = tableOne[13];
                this.buyTradeAmt = tableOne[14];
                this.buyAcctIdCnt = tableOne[15];
                this.unmatureAmtLessTh = tableOne[16];
                this.unmatureAmtMid = tableOne[17];
                this.unmatureAmtGreTh = tableOne[18];

                //表二获取
                this.data3 = dataResponse.simpShareTopTen;

                //表三获取
                this.data5 = dataResponse.financSide;

                //表四获取
                this.data6 = dataResponse.transacTheDay;

                //表五获取
                this.data2 = dataResponse.performCustm;

                //表六获取
                this.data4 = dataResponse.performBroker;
                //隐藏加载中
                this.addClass(loadBox, "hide");
              }
            }
          });
        },
        //获取url参数
        getUrlParams(url) {
          var urlArray = url.split("?")[1].split("&"),
            urlValue = {};
          for (var i = 0; i < urlArray.length; i++) {
            var urlRowArray = urlArray[i].split("=");
            urlValue[urlRowArray[0]] = urlRowArray[1];
          }
          return urlValue;
        },
        //设置fetch请求超时方法
        _fetch: function (fetch_promise, timeout) {
          var abort_fn = null;
          var abortInfo = this;
          //这是一个可以被reject的promise
          var abort_promise = new Promise(function (resolve, reject) {
            abort_fn = function () {
              abortInfo.addClass(loadBox, "hide");
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
        initialDate: function () {//请求初始结束日期
          var obj = new XMLHttpRequest();
          obj.open('GET', '/base-service/date/ptrdd', false);
          obj.setRequestHeader("signature", signatureA);
          obj.setRequestHeader("Authorization", AuthorizationA);
          obj.onreadystatechange = function () {
            if (obj.readyState == 4 && obj.status == 200) {
              const responseData = JSON.parse(obj.responseText);
              //上一个交易日
              lastTradeDate = responseData.resData.tradeDate;
              lastTradeDate = new Date(lastTradeDate);
            }
          };
          obj.send(null);
          return lastTradeDate;
        },
        initialStartDate: function () {//请求初始开始日期
          var objs = new XMLHttpRequest();
          objs.open('GET', '/base-service/date/pmtrdd', false);
          objs.setRequestHeader("signature", signatureA);
          objs.setRequestHeader("Authorization", AuthorizationA);
          objs.onreadystatechange = function () {
            if (objs.readyState == 4 && objs.status == 200) {
              const responseData = JSON.parse(objs.responseText);
              //上一个交易日
              lastTradeDate = responseData.resData.tradeDate;
              //lastTradeDate = lastTradeDate.slice(0, 4) + "-" + lastTradeDate.slice(4, 6) + "-" + lastTradeDate.slice(6, 8);
              lastTradeDate = new Date(lastTradeDate);
            }
          };
          objs.send(null);
          return lastTradeDate;
        },
        //分页展示
        tableChange: function (page) {
          this.returnN = page;
          this.data1 = this.dataArrayAll.slice((page - 1) * this.pageSize, page * this.pageSize);
        }
        ,
        //选择分页总条数
        tableChangeSize: function (pageSize) {
          this.pageSize = pageSize;
          this.returnN = 1;
          this.data1 = this.dataArrayAll.slice(0, this.pageSize);
        }
        ,
        hasClass: function (obj, cls) {
          return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
        ,
        addClass: function (obj, cls) {
          if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        }
        ,
        removeClass: function (obj, cls) {
          if (this.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
          }
        }
        ,
        toggleClass: function (obj, cls) {
          if (this.hasClass(obj, cls)) {
            this.removeClass(obj, cls);
          } else {
            this.addClass(obj, cls);
          }
        }
        ,
        handleSubmited(name) {
          document.getElementById("showIviewTable").style.display = "block";
          document.getElementById("showDailyContainer").style.display = "none";
          document.getElementById("infoTableList").innerHTML = "";
          this.$refs[name].validate((valid) => {
            if (this.isHide == false) {
              return;
            }
            const {startdate, enddate, desc, cxtype, seriesList, zqdmRows} = this.formValidate;
            var cxtypeVaule = cxtype,
              descValue = desc,
              zqdmRowsValue = zqdmRows,
              seriesListArry = seriesList;
            //日期格式验证
            var r = /^\d{4}([-/.]?)\d{1,2}\1\d{1,2}$/;
            var startDateA = document.querySelectorAll('.ivu-date-picker-editor .ivu-input')[0].value;

            if (r.test(startDateA) == false) {
              this.$Message.error('请输入正确开始日期！');
              this.addClass(document.getElementById('startDateForm'), 'ivu-form-item-error');
              return;
            }
            this.removeClass(document.getElementById('startDateForm'), 'ivu-form-item-error');
            var endDateA = document.querySelectorAll('.ivu-date-picker-editor .ivu-input')[1].value;
            if (r.test(endDateA) == false) {
              this.$Message.error('请输入正确结束日期！');
              this.addClass(document.getElementById('endDateForm'), 'ivu-form-item-error');
              return;
            }
            this.removeClass(document.getElementById('endDateForm'), 'ivu-form-item-error');
            //手动输入不能大于当前日期
            if (new Date(new Date(startDateA).format('yyyy-MM-dd')) >= new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
              this.$Message.error('开始日期不能大于等于当前日期！');
              this.addClass(document.getElementById('startDateForm'), 'ivu-form-item-error');
              return;
            }
            this.removeClass(document.getElementById('startDateForm'), 'ivu-form-item-error');
            if (new Date(new Date(endDateA).format('yyyy-MM-dd')) >= new Date(new Date(Date.now()).format('yyyy-MM-dd'))) {
              this.$Message.error('结束日期不能大于等于当前日期！');
              this.addClass(document.getElementById('endDateForm'), 'ivu-form-item-error');
              return;
            }
            this.removeClass(document.getElementById('endDateForm'), 'ivu-form-item-error');
            //开始日期不能大于结束日期（手动输入+选择日期）
            var startdateValue = this.formValidate.startdate,
              enddateValue = this.formValidate.enddate;
            if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
              document.getElementById('startDateForm').className += ' ivu-form-item-error';
              document.getElementById('endDateForm').className += ' ivu-form-item-error';
              this.$Message.error('开始日期不能大于结束日期!');
              return;
            }
            ;
            this.removeClass(document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-item")[0], "ivu-collapse-item-active");
            this.searchPanel = '';
            //验证
            if (valid) {
              this.$Message.success('提交成功!请等待~');
              this.removeClass(document.getElementById('startDateForm'), 'ivu-form-item-error');
              this.removeClass(document.getElementById('endDateForm'), 'ivu-form-item-error');
              //查询传送的参数
              this.searchParams = {
                "startDate": startdateValue.format('yyyy-MM-dd'),
                "endDate": enddateValue.format('yyyy-MM-dd'),
                "userId": srcUseridA,
                "userName": srcUsernameA
              };
              //console.log(this.searchParams,"-----searchParams");
              //声明加载中
              var loadBox = document.getElementById("loadBox");
              this.removeClass(loadBox, "hide");
              //接口请求处理
              const url = '/dw/mktdt/stock_pleg_rep_tran_list';

              this.data1 = [];
              this.dealitems = 0;
              var _this = this;
              this.returnN = 1;
              this.returnTotal = 0;
              this.dataArrayAll = [];
              this.isHide = false;
              this._fetch(fetch(url, {
                method: "POST",
                body: JSON.stringify(this.searchParams),
                mode: 'cors',
                headers: {
                  "Content-Type": "application/json",
                  "signature": signatureA,
                  "Authorization": AuthorizationA
                }
              }), 6000).then(function (response) {
                return response.json()
              }, function (error) {
                _this.addClass(loadBox, "hide");
                _this.$Message.error('系统繁忙，刷新页面!');
                this.isHide = true;
                this.tfStr = true;
              }).then(data => {
                if (this.t != '') {
                  clearTimeout(this.t);
                }
                this.isHide = true;
                //取数据
                var dataResponse = data.resData;
                //this.data1 = dataResponse;
                var dataError = data.message;
                var datalength = data.respSize;

                if (dataResponse == null) {
                  this.tfStr = true;
                  //展开查询框
                  this.addClass(document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-item")[0], "ivu-collapse-item-active");
                  this.searchPanel = '1';

                  this.addClass(loadBox, "hide");
                  this.$Message.warning("查询出错" + dataError);
                  this.data1 = [];
                  this.dealitems = 0;
                  this.showdealitems = 0;
                } else {
                  if (dataResponse.length == 0) {
                    this.tfStr = true;
                    this.addClass(loadBox, "hide");
                    this.data1 = [];
                    this.dealitems = 0;
                    this.showdealitems = 0;
                    this.$Message.warning('查询无数据！');
                  } else {
                    this.tfStr = false;
                    this.dealitems = datalength;
                    this.dataArrayAll = dataResponse;//保存所有数据
                    this.returnN = 1;
                    this.returnTotal = dataResponse.length;
                    var tmpLimit = this.pageSize;
                    if (tmpLimit > dataResponse.length) {
                      //如果加载数据少，全部返回
                      tmpLimit = dataResponse.length;
                    }
                    this.data1 = this.dataArrayAll.slice(0, tmpLimit);
                    this.tableData1 = dataResponse;
                    this.isHide = true;

                    //查询结果提示变化1
                    document.getElementById("infoTableList").innerHTML = "查询结果共 " + this.dealitems + " 条记录";
                    //隐藏加载中
                    this.addClass(loadBox, "hide");
                  }
                }
              });
            } else {
              this.$Message.error('表单验证失败!');
            }
            //this.addClass(document.getElementById("sorryBox"),"hide");
          })
        }
      },
      watch: {},
      mounted() {

      },

    }
  </script>

  <style lang="less">
    .searchInfonew {
    .dailyContainer {
      width: 1000px;
      height: auto;
      margin: 20px auto;
      display: none;
    }
    }
  </style>

