<template>
  <!--一码通关联账户查询-->
      <div class="searchAccount_new" id="fifteenCommon">
        <!--头部logo-->
        <header></header>
        <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
          <Panel name="1">
            <p>一码通关联账户查询
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
                  <Form-item prop="modelSel" id="startDateForm"
                             label="查询类别" :label-width="80">
                    <Select v-model="modelSel"
                            :label-in-value="true"
                            class="selectWidth" @on-change="thisChange">
                      <Option v-for="item in queryList" :key="item" :value="item.value">{{item.label}}</Option>
                    </Select>
                  </Form-item>
                  <div class="moreBtn">
                    <!--<div  @click="isShowMore = !isShowMore"-->
                    <!--&gt;<span>更多 ∨</span></div>-->
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
                    prop="desc"
                    id="endDateForm"
                    label="" :label-width="10">
                <b>查询信息</b><label class="redtext fontsize12">（不超过2500个）</label>
                <Row class="uploadBox">
                  <Upload v-if="importShow =='1'" action="/base-service/api/decode_upfile?uploadType=ACCID"
                          :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                    <Button id="importAccountBtn" type="ghost">导入</Button>
                  </Upload>
                  <Upload v-else-if="importShow =='2'" action="/base-service/api/decode_upfile?uploadType=PERSONID"
                          :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                    <Button id="importAccountBtn" type="ghost">导入</Button>
                  </Upload>
                  <Upload v-else-if="importShow =='3'" action="/base-service/api/decode_upfile?uploadType=YMTID"
                          :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                    <Button id="importAccountBtn" type="ghost">导入</Button>
                  </Upload>
                  <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                </Row>
                <Row>
                  <p class="numberUploads">已上传个数：<font id="infoUploadAccount" class="bluetext">{{accountList}}</font></p>
                  <Form-item prop="desc" id="AccountForm">
                    <Input id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea"
                           :rows="12" :placeholder="chooseLabel"></Input>
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
        <Modal id="lookInfoPop" title="一码通关联账户查询  统计口径说明" v-model="changeInfo"
               class-name="vertical-center-modal"
               cancel-text>
          <h3>数据说明</h3>
          <p>无</p>
          <h3>指标说明</h3>
          <p>
            （1）查询类别为一码通账户号：<br>
            a)一码通号：来自查询条件<br>
            b)账户类别：从“账户一码通关系文件”中查询出条件“一码通号”对应的所有证券账户的账户类别<br>
            c)账户代码：从“账户一码通关系文件”中查询出该一码通号对应的所有证券账户<br>
            d)账户名称：从“账户一码通关系文件”中查询出该一码通号对应的所有证券账户，再根据证券账户从“开户资料”中查出账户名称<br>
            e)账户证件号码：从“账户一码通关系文件”中查询出该一码通号对应的所有证券账户，再根据证券账户从“开户资料”中查出账户证件号码<br>

            （2）查询类别为证券账户：<br>
            a)一码通号：从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号）<br>
            b)账户类别：从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户的账户类别<br>
            c)账户代码：从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户<br>
            d)账户名称：从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户，再从“开户资料”中查出账户名称<br>
            e)账户证件号码：从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户，再从“开户资料”中查出账户证件号码<br>

            （3）查询类别为身份证号码：<br>
            a)一码通号：从“新开户资料”中查询出该身份证号（15位，18位换算为15位进行统一匹配）对应的所有证券账户，从“账户一码通关系文件”中查出证券账号对应的所有一码通号（理论上只对应一个一码通号）<br>
            b)账户类别：从“新开户资料”中查询出该身份证号（15位，18位换算为15位进行统一匹配）对应的所有证券账户，再从“账户一码通关系文件”中查出这些证券账户的账户类别<br>
            c)账户代码：从“新开户资料”中查询出该身份证号（15位，18位换算为15位进行统一匹配）对应的所有证券账户，再从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户<br>
            d)账户名称：从“新开户资料”中查询出该身份证号（15位，18位换算为15位进行统一匹配）对应的所有证券账户，再从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户，再从“开户资料”中查出账户名称<br>
            e)账户证件号码：从“新开户资料”中查询出该身份证号（15位，18位换算为15位进行统一匹配）对应的所有证券账户，再从“账户一码通关系文件”中查询出该证券账户对应的所有一码通号（理论上只对应一个一码通号），再查出该一码通号对应的所有证券账户，再从“开户资料”中查出账户证件号码<br>
            （4）本应用中账户类别展示“账户类别描述”，有如下取值：<br>
            11:沪市A股账户<br>
            12:沪市B股账户<br>
            13:沪市封闭式基金账户<br>
            14:沪市A股信用证券账户<br>
            15:沪市衍生品合约账户<br>
            A1:沪市结算参与人债券质押式报价回购质押专用账户<br>
            A2:沪市结算参与人约定购回式证券交易专用证券账户<br>
            A3:沪市结算参与人交收担保品账户<br>
            A4:沪市结算参与人债券回购质押处置账户<br>
            A5:沪市结算参与人债券回购质押专用账户<br>
            A6:沪市结算参与人证券处置账户<br>
            A7:沪市结算参与人证券待交收账户<br>
            A8:沪市结算参与人证券待清偿账户<br>
            A9:沪市结算参与人证券交收账户<br>
            AA:沪市结算参与人融券专用证券账户<br>
            AB:沪市结算参与人客户信用交易担保证券账户<br>
            AC:沪市结算参与人权证创设履约担保证券交收专用账户<br>
            AD:沪市结算参与人专用证券交收账户<br>
            AE:沪市结算参与人转融通担保证券明细账户<br>
            AF:沪市结算参与人质押挂账账户<br>
            AG:沪市发行人回购专户<br>
            AH:沪市发行人权证行权专用证券账户<br>
            AI:沪市发行人未确认持有人证券专用账户<br>
            AJ:沪市中国证券金融股份有限公司转融通担保证券账户<br>
            AK:沪市中国证券金融股份有限公司转融通专用证券账户<br>
            AL:沪市登记结算系统中国结算深圳分公司配售专用账户<br>
            AM:沪市登记结算系统未确认持有人证券专用挂账账户<br>
            AN:沪市登记结算系统未登记股份证券账户<br>
            AO:沪市登记结算系统证券集中交收账户<br>
            AQ:沪市登记结算系统B股冻结专用账户<br>
            AR:沪市登记结算系统信用交易担保挂账账户<br>
            AS:沪市登记结算系统担保品挂账账户<br>
            AT:沪市登记结算系统质押挂账账户<br>
            AW:沪市登记结算系统质押处置挂账账户<br>
            AX:沪市登记结算系统特别账户<br>
            AY:沪市登记结算系统债券回购质押专用账户<br>
            AZ:沪市登记结算系统国债期货专用证券交收账户<br>
            B1:沪市登记结算系统证券处置账户
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
            size="small"
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
  import {tableColumns1, queryList} from '../assets/js/searchAccount.js';


  export default {
      name: "searchAccount_new",
      props: [],
      components: {},
      data() {
      return {
        collapse: '1',
        //  显示更多
        moreIf:false,
        //选择查询类别
        chooseVal: "3",
        chooseLabel: "",
        onlyLabel: "一码通号",
        queryList: queryList,
        //输入行数为小数时提示文字
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
        modelSel: '3',
        formValidate: {
          desc: ''
        },
        ruleValidate: {
          desc: [
            {required: true, message: '请输入一码通号', trigger: 'blur'},
          ]
        },
        self: this,
        tableData1: [],
        tableColumns1: tableColumns1,
        //查询类别导入判断
        importShow: '3'
      }
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
      /* validNum:function(){//验证显示行数是否为小数
          var r = /^[1-9]\d*$/;
          if(r.test(this.formValidate.showrow) == false){
              this.$Message.error('显示行数不能为小数！请输入整数！');
              this.showrowTip = '显示行数不能为小数！请输入整数！';
              this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
              return;
          }
          this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
          this.showrowTip = '';
      }, */
      tableChange: function (page) {
        this.returnN = page;
        this.tableData1 = this.dataArrayAll.slice((page - 1) * this.pageSize, page * this.pageSize);
      },
      tableChangeSize: function (pageSize) {
        this.pageSize = pageSize;
        this.returnN = 1;
        this.tableData1 = this.dataArrayAll.slice(0, this.pageSize);
      },
      hideRightBox: function () {//显示隐藏左右
        (this.leftPane == '19') ? this.leftPane = '25' : this.leftPane = '19';
        (this.rightPane == '5') ? this.rightPane = '0' : this.rightPane = '5';
        (this.rightPane == 16) ? this.gutterValue = 0 : this.gutterValue = 16;
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
      thisChange: function (v) {
        this.chooseVal = v.value;
        this.onlyLabel = v.label;
        let thisVal = v.value;
        this.importShow = v.value;

        this.chooseLabel = '请输入' + this.onlyLabel;
        this.ruleValidate.desc[0].message = this.chooseLabel;
        if (document.getElementsByClassName("ivu-form-item-error-tip")[0] != undefined) {
          document.getElementsByClassName("ivu-form-item-error-tip")[0].innerHTML = this.chooseLabel;
        }

      },
      _fetch: function (fetch_promise, timeout) {//设置fetch请求超时方法
        var abort_fn = null;
        var abortInfo = this;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
            //console.log('查询超时abort promise');
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
      handleSuccessAccount(response, file, fileList) {//查询信息导入
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
          this.dataLookInfo = arryAll
          this.accountList = arryAll.length;
          str = arryAll.join('\n');
          this.formValidate.desc = str;
        }
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
        let url = '/dw/mktdt/one_way_link_acct';
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
          var pageSize = data.respSize;
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
              this.dealitems = pageSize;
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
              //this.tableData1 = dataResponse;
              exportButton1.removeAttribute("disabled");
              this.isHide = true;
              document.getElementById("infoTableList").innerHTML = "查询结果共 " + this.dealitems + " 条记录";
            }
          }
        })
      },
      //查询按钮事件执行
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (this.isHide == false) {
            return;
          }
          const {desc} = this.formValidate;
          var descValue = desc;
          //查询类别验证
          if (this.modelSel == "") {
            this.$Message.error('请选择查询类别，不能为空!');
            return;
          } else {
            let thisChoose = this.chooseVal;
            if (thisChoose == 1) {
              //证券账户  10 一个大写字母  9位数字
              if (this.formValidate.desc) {
                const descStr = descValue.replace(/[\r\n]/g, ',');
                let descArry = descStr.split(',');
                let descStr2 = descValue.replace(/[\r\n]/g, "");
                if (descStr2.trim().length == 0) {
                  this.$Message.error(this.onlyLabel + '不能为空!！');
                  return;
                }
                ;
                //判断上传证券账户不能超过2500
                if (descArry.length > 2500) {
                  this.$Message.error(this.onlyLabel + '不能超过2500个!');
                  return;
                }
                ;
                for (var i = 0; i < descArry.length; i++) {
                  const descVal = descArry[i].trim();
                  const descReg = /^[A-Z]{1}\d{9}/g;
                  if (descVal.length != 0) {
                    if (!descReg.test(descVal) || descVal.length != 10) {
                      this.$Message.error(this.onlyLabel + '由一个大写字母和9个数字组成!！');//AccountForm
                      this.addClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
                      return;
                    }
                  }
                }
                ;
                this.removeClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
                // descValue = descArry.join(',');
                descValue = descArry;
              }
            }
            ;
            //身份证号验证
            if (thisChoose == 2) {
              //身份证号
              if (this.formValidate.desc) {
                const descStr = descValue.replace(/[\r\n]/g, ',');
                let descArry = descStr.split(',');
                let descStr2 = descValue.replace(/[\r\n]/g, "");
                if (descStr2.trim().length == 0) {
                  this.$Message.error(this.onlyLabel + '不能为空!！');
                  return;
                }
                ;
                //判断上传身份证号不能超过2500
                if (descArry.length > 2500) {
                  this.$Message.error(this.onlyLabel + '不能超过2500个!');
                  return;
                }
                ;
                for (var i = 0; i < descArry.length; i++) {
                  const descVal = descArry[i].trim();
                }
                ;
                // descValue = descArry.join(',');
                descValue = descArry;
              }
            }
            ;
            //一码通验证
            if (thisChoose == 3) {
              //一码通账户  12位数字
              if (this.formValidate.desc) {
                const descStr = descValue.replace(/[\r\n]/g, ',');
                let descArry = descStr.split(',');
                let descStr2 = descValue.replace(/[\r\n]/g, "");
                if (descStr2.trim().length == 0) {
                  this.$Message.error(this.onlyLabel + '不能为空!！');
                  return;
                }
                ;
                //判断上传一码通账户不能超过2500
                if (descArry.length > 2500) {
                  this.$Message.error(this.onlyLabel + '不能超过2500个!');
                  return;
                }
                ;
                for (var i = 0; i < descArry.length; i++) {
                  const descVal = descArry[i].trim();
                  const descReg = /^\d{12}/g;
                  if (descVal.length != 0) {
                    if (!descReg.test(descVal) || descVal.length != 12) {
                      this.$Message.error(this.onlyLabel + '由12个数字组成!！');//AccountForm
                      this.addClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
                      return;
                    }
                  }
                }
                ;
                this.removeClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
                // descValue = descArry.join(',');
                descValue = descArry;
              }
            }
            ;
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
            ;
            for (var i = 0; i < descArry5.length; i++) {
              if (descArry5[i] == '' || typeof descArry5[i] == 'undefined') {
                descArry5.splice(i, 1);
                i = i - 1;
              }
            }
            ;
            //股东账户去重
            let descArray2 = [];
            descArry5.forEach(function (item, index) {
              if (descArray2.indexOf(item) == -1) {
                descArray2.push(item)
              }
            });
            //console.log(descArry5, "----descArry5");
            //获取请求参数
            this.testParams = {
              "userId": srcUseridA, "userName": srcUsernameA,
              "dwSessonid": dwSessionidA,
              "querInfo": descArry5, "querTyp": this.chooseVal
            };
            //console.log(this.testParams,"-----testParams111111111");
            this.searchData(this.testParams);
          } else {
            this.$Message.error(this.onlyLabel + '不能为空!');
          }
        });
      },
      clearOne: function () {
        this.formValidate.desc = "";
        this.accountList = 0;
      },
      exportData(type) {
        //导出参数
        var downfileParams = "type=oneWayLinkAcct&signature=" + signatureA + "&userId=" + srcUseridA + "&userName=" + srcUsernameA + "&Authorization=" + AuthorizationA;
        ;
        if (type === 1) {
          document.getElementById("exportCurrent").setAttribute("disabled", true);
          setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')", 5000);
          void(window.open('/dw/download/excel_comm?' + downfileParams));
        }
      }
    },
      watch: {},
      mounted: function () {
        //获取URL地址参数
        var urlParams = window.location.href;
        var upfileParamsValue = {};
        upfileParamsValue.signature = signatureA;
        upfileParamsValue.Authorization = AuthorizationA;
        this.upfileParams = upfileParamsValue;

      },

    }
</script>

<style>
    .searchAccount_new {

    }
    .sr .ivu-form-item{
      width: 500px;
    }
    .exportBtnBox {
      align-items: flex-start !important;
    }
    .ivu-modal-body {
      max-height: 400px;
      overflow-y: auto;
    }

    .ivu-select {
      margin: 0 0 10px 0;
    }

    .iviewCard {
      min-height: 780px;
    }

    .pageModule {
      padding-top: 10px;
    }

    .exportBtn {
      text-align: right;
      padding-top: 5px;
    }

    .selectWidth {
      width: 200px;
    }

    .numberUploads {
      margin: 10px 0 5px 0;
    }

    th.ivu-table-column-left {
      text-align: center;
    }

    th.ivu-table-column-right {
      text-align: center;
    }

    .ivu-table-header, .ivu-table-body {
      overflow-y: scroll;
    }
</style>
