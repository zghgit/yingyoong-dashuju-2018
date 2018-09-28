<template>
  <!--债券持仓明细-->
      <div class="searchPosition_new" id="fifteenCommon">
        <!--头部logo-->
        <header></header>
        <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
          <Panel name="1">
            <p>债券持仓明细
              <span id="lookInfoLink" class="lookInfo"
                    @click.stop="changeInfo = true">查看统计口径</span>
              <span class="showButton">{{ collapse.length>0?'收起':'展开' }}
              <i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
            </p>
            <div slot="content"  >
              <Form ref="formValidate"
                    :model="formValidate" :rules="ruleValidate">
                <div class="flexBox">
                  <Form-item
                    prop="startdate"
                     id="startDateForm"
                     label="查询日期"
                     :label-width="80">
                    <Date-picker
                      :value="dataValue"
                       id="startDate" type="date"
                       placeholder="选择查询日期"
                       v-model="formValidate.startdate"
                       class="datePickerWidth">
                    </Date-picker>
                  </Form-item>
                  <div class="moreBtn">
                    <!--<div  @click="isShowMore = !isShowMore"><-->
                      <!--span>更多 ∨</span></div>-->
                    <div  @click="MoreClick">
                      <span>更多</span>
                      <i v-if="moreIf" class="el-icon-arrow-up"></i>
                      <i v-else class="el-icon-arrow-down"></i></a>
                    </div>
                  </div>
                  <div class="submitBtnBox">
                    <Button id="searchBtn" type="primary"
                            @click="handleSubmit('formValidate');">查询</Button>
                  </div>
                </div>
                <div class="exportBtnBox sr"
                     v-if="moreIf">
                  <Form-item
                    prop="cxtype"
                    label=""
                    :label-width="10">
                    <b>证券代码</b>
                    <Radio-group
                      v-model="formValidate.cxtype"
                      class="zqradio"
                      v-on:on-change="showzq">
                      <row>
                        <Radio id="codeRadio" label="输入证券代码"></Radio>
                        <div id="zqcode">
                          <section class="warp">
                            <div class="searchIpt clearFix">
                              <input @click="showListHandle" :value="titles" v-model="titles" placeholder="请输入/选择证券代码"
                                     class="select-input"/>
                              <div class="select-down dropDown" v-show="listShow">
                                <ul class="list">
                                  <li class="li-item" v-for="item in zqCodeList" @click="getTitleHandle(item.value)">{{
                                    item.label }}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </section>
                        </div>
                      </row>
                      <row>
                        <Radio id="allRadio" label="全部证券代码"></Radio>
                      </row>
                    </Radio-group>
                  </Form-item>
                  <Form-item
                    prop="cxtype"
                    label=""
                    :label-width="80">
                    <b>股东账户</b><label class="redtext fontsize12">（不超过2500个）</label>
                    <Row class="uploadBox">
                      <Upload action="/base-service/api/decode_upfile?uploadType=ACCID" :headers="upfileParams" accept=".txt"
                              :on-success="handleSuccessAccount">
                        <Button id="importAccountBtn" type="ghost">导入</Button>
                      </Upload>
                      <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                    </Row>
                    <Row>
                      <p class="numberUploads">已上传个数：<font id="infoUploadAccount" class="bluetext">{{accountList}}</font></p>
                      <Form-item prop="desc" id="AccountForm">
                        <Input id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea"
                               :rows="12" placeholder="请输入股东账户"></Input>
                      </Form-item>
                    </Row>
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
        <Modal id="lookInfoPop" title="债券持仓明细  统计口径说明" v-model="changeInfo"
               class-name="vertical-center-modal"
               cancel-text>
          <h3>数据说明</h3>
          <p>债券持仓明细包含清算后持仓与固定收益持仓，做 204回购、205回购的质押券还原持仓。<br>
            若输入了股东账户列表，则仅显示股东账户列表中所列账户的债券持仓明细记录。</p>
          <h3>指标说明</h3>
          <p>
            1. “持有量”包含非限售持仓及限售持仓，且包含已被质押入库的债券持仓（含204 回购质押库、205回购质押库）。<br>
            2. 对于同时在竞价系统和固定收益平台挂牌交易的债券，以其竞价系统的持仓数据为准。仅在固定收益平台挂牌交易的债券，以其固定收益平台的持仓数据为准。<br>
            3. 当账户对债券持有量大于0的情况才展示数据。<br>
            4. 由于质押券已经还原到投资者，因此排除登记公司质押专用账户的债券持仓。<br>
          </p>
          <h3>其他说明</h3>
          <p>无</p>
        </Modal>
        <div class="tableBox tab">
          <p id="infoTableList" class="redtext listlength"></p>
          <el-table
            :data="tableData1"
            border
            tooltip-effect="dark"

            style="width: 100%">
            <template v-for="(item,index) in tableColumns1">
              <el-table-column
                :key="item.field"
                :prop="item.field"
                :label="item.title"
                :align="item.align == null ? 'center' : item.align"
                :width="item.width">
              </el-table-column>
            </template>
          </el-table>
          <div style="padding-top:10px; float: right">
            <Page :total="returnTotal" :current="returnN"
                  :page-size="500" :page-size-opts=[500,1000]
                  placement="top" show-sizer
                  @on-page-size-change="tableChangeSize"
                  @on-change="tableChange"></Page>
          </div>
          <div class="exportBtn">
            <Button id="exportCurrent" type="primary"
                    size="large" @click="exportData(1)"
                    disabled>
              <Icon type="ios-download-outline"></Icon>
              导出全部结果为XLSX文件
            </Button>
          </div>
        </div>
      </div>
</template>

<script>
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
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
  import {tableColumns1} from '../assets/js/searchPosition.js';
  //日期初始值
  let lastTradeDate = "";
  //查询参数初始化
  let searchParams = {};
  var upfileParamsValue = {
    signature: signatureA,
    Authorization: AuthorizationA
  };
  export default {
        name: "searchPosition_new",
        props: [],
        components: {},
        data() {
            return {
              collapse: '1',
              //  显示更多
              moreIf:false,
              //输入行数为小数时提示文字
              dataValue: this.initialDate(),
              showrowTip: '',
              returnN: 1,
              returnTotal: 0,
              dataArrayAll: [],
              pageSize: 500,
              //显示隐藏输入条件
              changeArrow: 'rightArrow',
              gutterValue: 16,
              leftPane: 19,
              rightPane: 5,
              //统计口径
              changeInfo: false,
              //查询参数初始化
              testParams: {},
              orderParams: {},
              urlParams: window.location.href,
              isHide: true,
              //文件解析参数
              upfileParams: this.upfileParamsValue,
              dealitems: 0,
              //上传股东账户条数
              accountList: 0,
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
              zqTypeTip: true,
              zqCode1: '',
              formValidate: {
                startdate: new Date(this.initialDate()),
                desc: '',
                cxtype: '输入证券代码',
                zqdmRows: "single",
                zqCode: ''
              },
              ruleValidate: {
                startdate: [
                  {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
                ],
                desc: [
                  {required: true, message: '请输入股东账户', trigger: 'blur'},
                ],
                zqCode: [
                  {required: true, message: '请输入/选择证券代码', trigger: 'change'}
                ]
              },
              self: this,
              tableData1: [],
              tableColumns1: tableColumns1,
              //模糊查询数据
              titles: '',
              listShow: false,
              //表单
              zqCodeList: []
            }
        },
    watch: {

      //this.zqCode1 = this.formValidate.zqCode;
      titles: function () {
        let _this = this;
        if (this.titles.length > 6 || !(/^[0-9]*$/).test(this.titles)) {
          this.$Message.error('证券代码输入不合法');
        }
        //证券代码联想
        fetch('/dw/mktdt/get_sec_code', {
          method: "POST",
          //body: JSON.stringify(upfileParamsValue),
          mode: 'cors',
          body: JSON.stringify({
            secCode: _this.titles
          }),
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
        }).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          var _this = this;
          if (data.resData.length > 0) {
            this.listShow = true;
          } else {
            _this.listShow = false;
          }
          let codeData = data.resData,
            zqCodeList = [];
          for (var i = 0; i < codeData.length; i++) {
            let zqRow = {};
            zqRow.value = codeData[i];
            zqRow.label = codeData[i];
            zqCodeList.push(zqRow);
          }
          this.zqCodeList = zqCodeList;
        })
      }
    },
    //页面加载时执行
    mounted: function () {
      //获取URL地址参数
      var urlParams = window.location.href;
      var upfileParamsValue = {};
      upfileParamsValue.signature = signatureA;
      upfileParamsValue.Authorization = AuthorizationA;
      this.upfileParams = upfileParamsValue;
    },
    methods: {
      // 更多条件收缩
      MoreClick:function () {
        if(this.moreIf){
          this.moreIf = false
        }else {
          this.moreIf =true;
        }
      },
      ready() {
        var _this = this;
        document.addEventListener('click', (e) => {
          _this.listShow = false;
        })
      },
      initialDate: function () {//请求初始日期
        var obj = new XMLHttpRequest();
        obj.open('GET', '/base-service/date/ptrdd', false);
        obj.setRequestHeader("signature", signatureA);
        obj.setRequestHeader("Authorization", AuthorizationA);
        obj.onreadystatechange = function () {
          if (obj.readyState == 4 && obj.status == 200) {
            const responseData = JSON.parse(obj.responseText);
            //上一个交易日
            lastTradeDate = responseData.resData.tradeDate;
            //lastTradeDate = lastTradeDate.slice(0, 4) + "-" + lastTradeDate.slice(4, 6) + "-" + lastTradeDate.slice(6, 8);
            lastTradeDate = new Date(lastTradeDate);
          }
        };
        obj.send(null);
        return lastTradeDate;
      },
      validNum: function () {//验证显示行数是否为小数
        var r = /^[1-9]\d*$/;
        /*if (r.test(this.formValidate.showrow) == false) {
          this.$Message.error('显示行数不能为小数！请输入整数！');
          this.showrowTip = '显示行数不能为小数！请输入整数！';
          this.addClass(document.getElementById('AccountForm2'), 'ivu-form-item-error');
          return;
        }*/
        this.removeClass(document.getElementById('AccountForm2'), 'ivu-form-item-error');
        this.showrowTip = '';
      },
      tableChange: function (page) {
        this.returnN = page;
        this.tableData1 = this.dataArrayAll.slice((page - 1) * this.pageSize, page * this.pageSize);
      },
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.tableData1 = this.dataArrayAll.slice(0, this.pageSize);
      },
      searchInfo() {
        let _this = this;
        //证券代码联想
        _this._fetch(fetch('/dw/mktdt/get_sec_code', {
          method: "POST",
          // body: JSON.stringify(upfileParamsValue),
          mode: 'cors',
          body: JSON.stringify({
            secCode: _this.formValidate.zqCode
          }),
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          let codeData = data.resData,
            zqCodeList = [];
          for (var i = 0; i < codeData.length; i++) {
            let zqRow = {};
            zqRow.value = codeData[i];
            zqRow.label = codeData[i];
            zqCodeList.push(zqRow);
          }
          ;
          this.zqCodeList = zqCodeList;
        })
      },
      hideRightBox: function () {//显示隐藏左右
        (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
        (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
        (this.gutterValue == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
        (this.changeArrow == 'rightArrow') ? this.changeArrow = 'leftArrow' : this.changeArrow = 'rightArrow';
        document.getElementsByClassName("ivu-table-header")[0].children[0].style.width = "100%";
        document.getElementsByClassName("ivu-table-body")[0].children[0].style.width = "100%";
      },
      getUrlParams: function (url) {//获取参数
        var urlArray = url.split("?")[1].split("&"),
          urlValue = {};
        for (var i = 0; i < urlArray.length; i++) {
          var urlRowArray = urlArray[i].split("=");
          urlValue[urlRowArray[0]] = urlRowArray[1];
        }
        return urlValue;
      },
      _fetch: function (fetch_promise, timeout) {//设置fetch请求超时方法
        var abort_fn = null;
        var abortInfo = this;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
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
      //股东账户已上传条数
      accountListChange: function (e) {
        const val = e.target.value;
        const descStr = val.replace(/[\r\n]/g, ',');
        let arr = descStr.split(',');
        if (arr[0] == '' && arr.length == 1) {
          arr.length = 0;
        }
        ;
        this.accountList = arr.length;
      },
      handleSuccessAccount(response, file, fileList) {//股东账户导入
        if (response.message != null) {
          this.$Message.warning(response.message, 7);
        }
        if (response.resData) {
          const arry = response.resData;
          let str = '';
          let arryAll = [];
          for (var i = 0; i < arry.length; i++) {
            arryAll.push(arry[i]);
          }
          this.dataLookInfo = arryAll;
          this.accountList = arryAll.length;
          str = arryAll.join('\n');
          this.formValidate.desc = str;
        }
      },
      getTitleHandle(title) { //获取模糊查询选择框get的参数
        let _this = this;
        this.titles = title;
        setTimeout(function () {
          _this.listShow = false;
        }, 300);
      },
      showListHandle() {
        this.listShow = false;
      },
      hasClass: function (obj, cls) {  //原声js写jquery方法
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
      },
      addClass: function (obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
      },
      removeClass: function (obj, cls) {
        if (this.hasClass(obj, cls)) {
          var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
          obj.className = obj.className.replace(reg, ' ');
        }
      },
      toggleClass: function (obj, cls) {
        if (this.hasClass(obj, cls)) {
          this.removeClass(obj, cls);
        } else {
          this.addClass(obj, cls);
        }
      },
      //传排序参数
      infoTableSort: function (sort) {
        this.orderParams.field = sort.key;
        this.orderParams.sort = sort.order;
      },
      //查询表单数据
      searchData: function (requestParam) {
        this.dataArrayAll = [];
        this.tableData1 = [];
        this.dealitems = 0;
        document.getElementById("infoTableList").innerHTML = "查询结果共 " + this.dealitems + " 条记录";
        this.returnN = 1;
        this.returnTotal = 0;
        var _this = this;
        this.orderParams = {};
        this.isHide = false;
        let url = '/dw/mktdt/detail_bond_posit';
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(requestParam),
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "signature": signatureA,
            "Authorization": AuthorizationA
          }
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          _this.isHide = true;
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          if (this.t != '') {
            clearTimeout(this.t);
          }
          var exportButton1 = document.getElementById("exportCurrent");

          //取数据
          var dataResponse = data.resData;
          var dataError = data.message;
          //var datalength = data.respSize;
          if (dataResponse == null) {
            this.isHide = true;
            this.$Message.warning("查询出错" + dataError);
            this.tableData1 = [];
            this.dealitems = 0;
            exportButton1.setAttribute("disabled", true);
          } else {
            if (dataResponse.length == 0) {
              this.isHide = true;
              this.$Message.warning('查询无数据！');
              this.tableData1 = [];
              this.dealitems = 0;
              exportButton1.setAttribute("disabled", true);
            } else {
              this.dealitems = data.respSize;
              this.dataArrayAll = [];
              this.dataArrayAll = dataResponse;//保存所有数据
              this.returnN = 1;
              this.returnTotal = dataResponse.length;
              var tmpLimit = this.pageSize;
              if (tmpLimit > dataResponse.length) {
                //如果加载数据少，全部返回
                tmpLimit = dataResponse.length;
              }
              this.tableData1 = this.dataArrayAll.slice(0, tmpLimit);
              //this.tableData1=dataResponse;
              exportButton1.removeAttribute("disabled");

              this.isHide = true;
              //查询结果提示变化1
              document.getElementById("infoTableList").innerHTML = "查询结果共 " + this.dealitems + " 条记录";

            }
          }
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {desc} = this.formValidate;
          var descValue = desc;

          //日期格式验证
          var r = /^\d{4}([-/.]?)\d{1,2}\1\d{1,2}$/;
          var startDateA = document.querySelectorAll('.ivu-date-picker-editor .ivu-input')[0].value;

          if (r.test(startDateA) == false) {
            this.$Message.error('请输入查询日期！');
            this.addClass(document.getElementById('startDateForm'), 'ivu-form-item-error');
            return;
          }
          //证券代码验证
          if (this.zqTypeTip) {
            if (this.titles == "") {
              this.$Message.error('请输入证券代码！');
              return;
            }
          }
          //股东账户  10 一个大写字母  9个数字
          if (this.formValidate.desc) {
            const descStr = descValue.replace(/[\r\n]/g, ',');
            let descArry = descStr.split(',');
            let descStr2 = descValue.replace(/[\r\n]/g, "");
            if (descStr2.trim().length == 0) {
              this.$Message.error('股东账户不能为空!！');
              return;
            }
            //判断上传股东账户不能超过2500
            if (descArry.length > 2500) {
              this.$Message.error('股东账户不能超过2500个!');
              return;
            }
            for (var i = 0; i < descArry.length; i++) {
              const descVal = descArry[i].trim();
              const descReg = /^[A-Z]{1}\d{9}/g;
              if (descVal.length != 0) {
                if (!descReg.test(descVal) || descVal.length != 10) {
                  this.$Message.error('股东账户由一个大写字母和9个数字组成!！');//AccountForm
                  this.addClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
                  return;
                }
              }
            }
            this.removeClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
            // descValue = descArry.join(',');
            descValue = descArry;
          }
          //验证显示行数是否为整数
          /* if(this.formValidate.showrow){
              var r = /^[1-9]\d*$/;
              if(r.test(this.formValidate.showrow) == false){
                  this.$Message.error('显示行数不能为小数！请输入整数！');
                  this.showrowTip = '显示行数不能为小数！请输入整数！';
                  this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                  return;
              }
              this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
              this.showrowTip = '';
          } */
          if (valid) {
            this.$Message.success('提交成功!请等待~');

            //股东账户去空格，去空行
            var descArry5 = [];
            for (var i = 0; i < descValue.length; i++) {
              descArry5.push(descValue[i].replace(/(^\s*)|(\s*$)/g, ""));
            }
            for (var i = 0; i < descArry5.length; i++) {
              if (descArry5[i] == '' || typeof descArry5[i] == 'undefined') {
                descArry5.splice(i, 1);
                i = i - 1;
              }
            }
            //获取请求参数
            //股东账户去重
            let descArray2 = [];
            descArry5.forEach(function (item, index) {
              if (descArray2.indexOf(item) == -1) {
                descArray2.push(item)
              }
            });
            let thisRadioVal = "";
            if (this.formValidate.zqdmRows == "ALL") {
              thisRadioVal = "ALL";
            } else {
              thisRadioVal = this.titles;
            }

            this.testParams = {
              "secCode": thisRadioVal,
              "querDte": this.formValidate.startdate.format('yyyy-MM-dd'),
              "accountId": descArry5,
              "userId": srcUseridA,
              "userName": srcUsernameA
            };
            //console.log(this.testParams, "-----testParams111111111");
            this.searchData(this.testParams);

          } else {
            this.$Message.error('股东账户不能为空!');
          }
        });
      },
      //选中全部证券代码设置all
      showzq: function () {
        var zqseries = document.getElementById('zqseries'),
          zqcode = document.getElementById('zqcode');
        if (this.formValidate.cxtype == "输入证券代码") {
          this.removeClass(zqcode, "hide");
          this.zqTypeTip = true;
          this.formValidate.zqdmRows = "noAll";
        }
        if (this.formValidate.cxtype == "全部证券代码") {
          this.addClass(zqcode, "hide");
          this.zqTypeTip = false;
          this.formValidate.zqdmRows = "ALL";
        }
      },
      clearOne: function () {
        this.formValidate.desc = "";
        this.accountList = 0;
      },
      exportData(type) {
        //导出参数
        // console.log(descStr,"---------------------导出股东账户");
        var downfileParams = "type=detailBondPosit&signature=" + signatureA + "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&Authorization=" + AuthorizationA;
        if (type === 1) {
          document.getElementById("exportCurrent").setAttribute("disabled", true);
          setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')", 5000);
          void(window.open('/dw/download/excel_comm?' + downfileParams));
        }
      }
    }

    }
</script>

<style lang="less">
    .searchPosition_new {

    }
    .sr .ivu-form-item{
      width: 500px;
    }
    .exportBtnBox {
      align-items: flex-start !important;
    }
</style>
