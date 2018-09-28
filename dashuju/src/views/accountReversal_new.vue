<template>
  <section class="constWidth" id="fifteenCommon" @click="ready">
    <!--头部logo-->
    <header></header>
    <div id="accountReversal">
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>两组账户对倒明细查询
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
            <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
          </p>
          <div slot="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
              <div class="flexBox">
                <b>开始日期</b>
                <Form-item prop="startdate" id="startDateForm">
                  <Date-picker id="startDate" type="date"  placeholder="选择开始日期" v-model="formValidate.startdate"></Date-picker>
                </Form-item>
                <b>结束日期</b>
                <Form-item prop="enddate" id="endDateForm">
                  <Date-picker id="endDate" type="date" placeholder="选择结束日期" v-model="formValidate.enddate"></Date-picker>
                </Form-item>
                <b>证券代码</b>
                <section class="warp">
                  <div class="searchIpt clearFix">
                    <input @click="showListHandle" :value="titles" v-model="titles" placeholder="请输入/选择证券代码" class="select-input"/>
                    <div class="select-down" style="width: 212px;transform-origin: center top 0px;position: absolute;left: 0px;top: 33px;" v-show="listShow">
                      <ul class="list">
                        <li class="li-item" v-for="item in zqCodeList" @click="getTitleHandle(item.value)">{{item.label}}</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
              <div class="teamA">
                <b>账户组A</b><label class="redtext fontsize12">(不超过1200个)</label>
                <Row class="uploadBox">
                  <Upload action="/base-service/api/decode_upfile?uploadType=ACCID&limit=1200" :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                    <Button id="importAccountBtn" type="ghost">导入</Button>
                  </Upload>
                  <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                </Row>
                <Row class="uploadNumber">
                  <p>已上传个数：<font id="infoUploadAccount" class="bluetext">{{accountList}}</font></p>
                  <Form-item prop="desc" id="AccountForm">
                    <Input  id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea" :rows="3" placeholder="请输入股东账户"></Input>
                  </Form-item>
                </Row>
              </div>
              <div class="teamB">
                <b>账户组B</b><label class="redtext fontsize12">（不超过1200个）</label>
                <Row class="uploadBox">
                  <Upload action="/base-service/api/decode_upfile?uploadType=ACCID&limit=1200" :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount2">
                    <Button id="importAccountBtn2" type="ghost">导入</Button>
                  </Upload>
                  <Button id="clearAccountBtn2" v-on:click="clearTwo()">清空</Button>
                </Row>
                <Row class="uploadNumber">
                  <p>已上传个数：<font id="infoUploadAccount2" class="bluetext">{{accountList2}}</font></p>
                  <Form-item prop="desc2" id="AccountForm2">
                    <Input  id="AccountInput2" v-model="formValidate.desc2" @on-change="accountListChange2" type="textarea" :rows="3" placeholder="请输入股东账户"></Input>
                  </Form-item>
                </Row>
              </div>
              <div class="teamC">
                <Form-item class="showrow" prop="showrow" id="AccountForm3">
                  在页面上显示前&nbsp;&nbsp;<Input-number id="showrowInput"  @on-change="validNum" :max="2000" :min="1" v-model="formValidate.showrow" size="small" style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                  <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                  <p><label class="redtext fontsize12">(最多显示2000行)</label></p>
                </Form-item>
                <Form-item>
                  <div class="cxBox"><Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button></div>
                </Form-item>
              </div>
              <div style="clear: both"></div>
            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="两组账户对倒明细查询  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
        <p>交易日期、成交时间、成交编号、股东账户、成交数量、成交金额取自每日成交日志（se001cjrzyyyymmdd001.log）文件。</br>
          根据交易日期、证券代码、交易时间和证券代码相等，买卖方向相反，取得每一笔交易的对手方信息。
        </p>
      </Modal>
      <div class="tabTitle">
        <Tabs type="card" :animated="false">
          <Tab-pane label="仅统计竞价交易数据">
            <p id="qiList1" class="redtext listlength"></p>
            <fastTable  :width="1880"  @on-sort-change="infoTableSort" :bwidth="1880" :columns="TableColumns1" :data="TableData1" class="inoutTable" ></fastTable>
            <div class="pageModule">
              <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
            </div>
            <div class="exportBtn">
              <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
              <Button id="exportCurrent2" type="primary" size="large" @click="exportData(2)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件</Button>
            </div>
          </Tab-pane>
          <Tab-pane label="统计时包含大宗交易数据">
            <p id="qiList2" class="redtext listlength"></p>
            <fastTable  :width="1880"  @on-sort-change="infoTableSort" :bwidth="1880" :columns="TableColumns2" :data="TableData2" class="inoutTable" ></fastTable>
            <div class="pageModule">
              <Page :total="returnTotal2" :current="returnN2" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page>
            </div>
            <div class="exportBtn">
              <Button id="exportCurrent3" type="primary" size="large" @click="exportData(3)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
              <Button id="exportCurrent4" type="primary" size="large" @click="exportData(4)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件</Button>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
    </div>
  </section>
</template>


<script>
  import 'whatwg-fetch';
  import {TableColumns1,TableColumns2} from '../assets/js/accountReversal.js';
  import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  //日期初始值
  let lastTradeDate="";
  export default {
    mounted(){
      //获取URL地址参数
      var upfileParamsValue={};
      upfileParamsValue.signature=signatureA;
      upfileParamsValue.Authorization=AuthorizationA;
      this.upfileParams = upfileParamsValue;
    },
    data () {
      return {
        collapse: '1',
        //输入行数为小数时提示文字
        showrowTip:'',
        returnN:1,
        returnTotal:0,
        dataArrayAll:[],
        returnN2:1,
        returnTotal2:0,
        dataArrayAll2:[],
        pageSize:500,
        pageSize2:500,
        //模糊查询数据
        titles:'',
        listData:'',
        listShow:false,
        userInput:'',
        //显示隐藏输入条件
        changeArrow:'rightArrow',
        gutterValue:16,
        leftPane:19,
        rightPane:5,
        //日期参数
        startdateFormat:'',
        enddateFormat:'',
        descParam:[],
        descParam2:[],
        //表单
        zqCodeList: [],
        //开始日期
        startOption: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        //结束日期
        endOption: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        formValidate: {
          showrow:2000,
          startdate: new Date(this.initialDate()),
          enddate: new Date(this.initialDate()),
          desc: '',
          desc2: '',
          zqCode:'',
        },
        ruleValidate: {
          showrow: [
            { required: true,type: 'number', message: '显示行数不能为空', trigger: 'blur' }
          ],
          startdate: [
            { required: true, type: 'date', message: '请选择开始日期', trigger: 'change' }
          ],
          enddate: [
            { required: true, type: 'date', message: '请选择结束日期', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请输入账户组A', trigger: 'blur' },
          ],
          desc2: [
            { required: true, message: '请输入账户组B', trigger: 'blur' },
          ],
          zqCode: [
            { required: true, message: '请输入/选择证券代码', trigger: 'change' }
          ],
        },
        changeInfo:false,
        //查询参数初始化
        testParams:{},
        orderParams:{},
        urlParams:window.location.href,
        isHide:true,
        //文件解析参数
        upfileParams:this.upfileParamsValue,
        //上传股东账户条数
        accountList: 0,
        accountList2: 0,
        self: this,
        //表格数据
        dealitems1:0,
        dealitems2:0,
        TableData1: [],
        TableData2: [],
        TableColumns1:TableColumns1,
        TableColumns2:TableColumns2,
        t: ''
      }
    },
    watch:{
      titles:function(){
        let _this = this;
        if(this.titles.length >6 || !(/^[0-9]*$/).test(this.titles)){
          this.$Message.error('证券代码输入不合法');
        }
        //证券代码联想
        fetch('/dwapp/mktdt/seccode', {
          method: "POST",
          mode: 'cors',
          body: JSON.stringify({
            codeLike: _this.titles
          }),
          headers: {
            "Content-Type": "application/json",
            "signature":signatureA,
            "Authorization":AuthorizationA
          }
        }).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          var _this = this;
          if(data.resData.length >0){
            _this.listShow = true;
          }else{
            _this.listShow = false;
          }
          let codeData = data.resData,
            zqCodeList = [];
          for(var i=0;i<codeData.length;i++){
            let zqRow = {};
            zqRow.value = codeData[i].secCode;
            zqRow.label = codeData[i].value;
            zqCodeList.push(zqRow);
          }
          console.log(zqCodeList);
          this.zqCodeList = zqCodeList;
        })
      } //模糊匹配查询，当输入的证券代码发生改变时执行函数
    },
    methods: {
      ready(){//控制证券代码下拉框的点击隐藏
        var _this = this;
        document.addEventListener('click',(e) => {
          _this.listShow = false;
        })
      },
      validNum:function(){//验证显示行数是否为小数
        var r = /^[1-9]\d*$/;
        if(r.test(this.formValidate.showrow) == false){
          this.$Message.error('显示行数不能为小数！请输入整数！');
          this.showrowTip = '显示行数不能为小数！请输入整数！';
          this.addClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
          return;
        }
        this.removeClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
        this.showrowTip = '';
      },
      tableChange:function (page){//分页功能
        this.returnN=page;
        console.log(this.pageSize);
        this.TableData1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
      },
      tableChangeSize:function (pageSize){
        this.pageSize=pageSize;
        this.returnN=1;
        this.TableData1 =this.dataArrayAll.slice(0,this.pageSize);
      },

      tableChange2:function (page){
        this.returnN2=page;
        console.log(this.pageSize);
        this.TableData2 =this.dataArrayAll2.slice((page-1)*this.pageSize2,page*this.pageSize2);

      },
      tableChangeSize2:function (pageSize){
        this.pageSize2=pageSize;
        this.returnN2=1;
        this.TableData2 =this.dataArrayAll2.slice(0,this.pageSize2);
      },
      getTitleHandle(title){//获取模糊查询选择框get的参数
        let _this = this;
        this.titles = title;
        setTimeout(function(){
          _this.listShow = false;
        },300);
      },
      showListHandle(){
        this.listShow = false;
      },
      //显示隐藏左右
      hideRightBox:function(){
        (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
        (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
        (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16;
        (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';
      },
      initialDate:function(){//请求初始日期
        var obj=new XMLHttpRequest();
        obj.open('GET','/base-service/date/ptrdd',false);
        obj.setRequestHeader("signature",signatureA);
        obj.setRequestHeader("Authorization",AuthorizationA);
        obj.onreadystatechange=function(){
          if(obj.readyState == 4 && obj.status == 200){
            /*const responseData=JSON.parse(obj.responseText);
            //上一个交易日
            lastTradeDate = responseData.resData.lastTradeDate;
            lastTradeDate = lastTradeDate.slice(0,4)+"-"+lastTradeDate.slice(4,6)+"-"+lastTradeDate.slice(6,8);*/
            const responseData = JSON.parse(obj.responseText);
            //上一个交易日
            lastTradeDate = responseData.resData.tradeDate;
            lastTradeDate = new Date(lastTradeDate);
          }
        };
        obj.send(null);
        return lastTradeDate;
      },
      _fetch:function(fetch_promise, timeout) {//设置fetch请求超时方法
        var abort_fn = null;
        var abortInfo=this;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function(resolve, reject) {
          abort_fn = function() {
            console.log('查询超时abort promise');
            abortInfo.isHide=true;
            // abortInfo.$Message.warning('查询超时！请重试！');
          };
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        var abortable_promise = Promise.race([
          fetch_promise,
          abort_promise
        ]);
        abortInfo.t = setTimeout(function() {
          abort_fn();
        }, timeout);
        return abortable_promise;
      },

      accountListChange:function(e){//股东账户已上传条数
        const val = e.target.value;
        const descStr = val.replace(/[\r\n]/g, ',');
        let arr = descStr.split(',');

        this.accountList = arr.length;
      },
      accountListChange2:function(e){
        const val = e.target.value;
        const descStr = val.replace(/[\r\n]/g, ',');
        let arr = descStr.split(',');
        this.accountList2 = arr.length;
      },

      handleSuccessAccount(response, file, fileList){//股东账户导入
        if(response.message != null){
          this.$Message.warning(response.message);
        }
        if(response.resData){
          const arry = response.resData;
          console.log(arry)
          let str = '';
          let  arryAll= [];
          for(var i = 0; i < arry.length; i++){
            arryAll.push(arry[i]);
          }
          console.log(arryAll)
          this.dataLookInfo = arryAll
          this.accountList = arryAll.length;
          str = arryAll.join('\n');
          this.formValidate.desc = str;
        }
      },
      handleSuccessAccount2(response, file, fileList){
        if(response.message != null){
          this.$Message.warning(response.message);
        }
        if(response.resData){
          const arry1 = response.resData;
          console.log(arry1)
          let str2 = '';
          let  arryAll1= [];
          for(var i = 0; i < arry1.length; i++){
            arryAll1.push(arry1[i]);
          }
          console.log(arryAll1)
          this.dataLookInfo2 = arryAll1
          this.accountList2 = arryAll1.length;
          str2 = arryAll1.join('\n');
          this.formValidate.desc2 = str2;
        }
      },

      hasClass:function(obj, cls){ //原声js写jquery方法
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
      },
      addClass:function(obj, cls){
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
      },
      removeClass:function(obj, cls){
        if (this.hasClass(obj, cls)) {
          var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
          obj.className = obj.className.replace(reg, ' ');
        }
      },
      toggleClass:function(obj,cls){
        if(this.hasClass(obj,cls)){
          this.removeClass(obj, cls);
        }else{
          this.addClass(obj, cls);
        }
      },
      infoTableSort:function(sort){ //传排序参数
        this.orderParams.field=sort.key;
        this.orderParams.sort=sort.order;
      },
      searchData:function(requestParam){//查询表单数据
        this.dataArrayAll=[];//每次点击查询 初始化数据
        this.dataArrayAll2=[];
        this.TableData1 = [];
        this.TableData2 = [];
        this.dealitems1 = 0;
        this.dealitems2 = 0;
        document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录";
        document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录";
        this.orderParams={};
        this.isHide=false;
        this.returnN=1;
        this.returnTotal=0;
        this.returnN2=1;
        this.returnTotal2=0;
        var _this=this;
        const url = '/dwapp/mktdt/tw_back_detail';
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(requestParam),
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "signature":signatureA,
            "Authorization":AuthorizationA
          }
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          _this.isHide=true;
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          if(this.t != ''){
            clearTimeout(this.t);
          }
          var exportButton1 = document.getElementById("exportCurrent");
          var exportButton2 = document.getElementById("exportCurrent2");
          var exportButton3 = document.getElementById("exportCurrent3");
          var exportButton4 = document.getElementById("exportCurrent4");
          var _this = this;
          this.isHide=true;
          //取数据
          var dataResponse=data.resData;
          var dataError=data.message;
          var datalength = data.resData.list.size;
          if(dataResponse == null){
            this.isHide=true;
            this.$Message.warning("查询出错"+dataError);
            this.TableData1 = [];
            this.TableData2 = [];
            this.dealitems1 = 0;
            exportButton1.setAttribute("disabled",true);
            exportButton2.setAttribute("disabled",true);
            exportButton3.setAttribute("disabled",true);
            exportButton4.setAttribute("disabled",true);
          }else{
            if(datalength == 0){
              this.isHide=true;
              this.$Message.warning('查询无数据！');
              this.TableData1 = [];
              this.TableData2 = [];
              this.dealitems1 = 0;
              exportButton1.setAttribute("disabled",true);
              exportButton2.setAttribute("disabled",true);
              exportButton3.setAttribute("disabled",true);
              exportButton4.setAttribute("disabled",true);
            }else{
              this.dealitems1 = dataResponse.list.size;
              this.dealitems2 = dataResponse.listBt.size;
              this.dataArrayAll=[];
              this.dataArrayAll=dataResponse.list.data;//保存所有数据
              this.returnN=1;
              this.returnTotal=dataResponse.list.data.length;
              var tmpLimit=this.pageSize;
              if(tmpLimit>dataResponse.list.data.length){
                //如果加载数据少，全部返回
                tmpLimit=dataResponse.list.data.length;
              }
              _this.TableData1=this.dataArrayAll.slice(0,tmpLimit);
              this.dataArrayAll2=[];
              this.dataArrayAll2=dataResponse.listBt.data;//保存所有数据
              this.returnN2=1;
              this.returnTotal2=dataResponse.listBt.data.length;
              var tmpLimit=this.pageSize2;
              if(tmpLimit>dataResponse.listBt.data.length){
                //如果加载数据少，全部返回
                tmpLimit=dataResponse.listBt.data.length;
              }
              _this.TableData2=this.dataArrayAll2.slice(0,tmpLimit);
              exportButton1.removeAttribute("disabled");
              exportButton2.removeAttribute("disabled");
              exportButton3.removeAttribute("disabled");
              exportButton4.removeAttribute("disabled");
              this.isHide=true;
              //查询结果提示变化1
              if(this.formValidate.showrow<this.dealitems1){
                document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
              }else{
                document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录";
              }
              //查询结果提示变化2
              if(this.formValidate.showrow<this.dealitems2){
                document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对 当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
              }else{
                document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录";
              }

            }
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if(this.isHide==false){
            return;
          }
          const { startdate, enddate, desc, desc2,  } = this.formValidate;
          var descValue = desc,
            descValue2 = desc2;
          //日期格式验证
          //var r = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
          var r = /^\d{4}([-/.]?)\d{1,2}\1\d{1,2}$/;
          var startDateA= document.querySelectorAll('.ivu-date-picker-editor .ivu-input')[0].value;
          if(r.test(startDateA) == false){
            this.$Message.error('请输入正确开始日期！');
            this.addClass(document.getElementById('startDateForm'),'ivu-form-item-error');
            return;
          }
          this.removeClass(document.getElementById('startDateForm'),'ivu-form-item-error');
          var endDateA= document.querySelectorAll('.ivu-date-picker-editor .ivu-input')[1].value;
          if(r.test(endDateA) == false){
            this.$Message.error('请输入正确结束日期！');
            this.addClass(document.getElementById('endDateForm'),'ivu-form-item-error');
            return;
          }
          this.removeClass(document.getElementById('endDateForm'),'ivu-form-item-error');
          //手动输入不能大于当前日期
          if(new Date(startDateA) > new Date(Date.now())){
            this.$Message.error('开始日期不能大于当前日期！');
            this.addClass(document.getElementById('startDateForm'),'ivu-form-item-error');
            return;
          }
          this.removeClass(document.getElementById('startDateForm'),'ivu-form-item-error');
          if(new Date(endDateA) > new Date(Date.now())){
            this.$Message.error('结束日期不能大于当前日期！');
            this.addClass(document.getElementById('endDateForm'),'ivu-form-item-error');
            return;
          }
          this.removeClass(document.getElementById('endDateForm'),'ivu-form-item-error');
          //验证日期
          var startdateValue = this.formValidate.startdate,
            enddateValue = this.formValidate.enddate;
          if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
            document.getElementById('startDateForm').className += ' ivu-form-item-error';
            document.getElementById('endDateForm').className += ' ivu-form-item-error';
            this.$Message.error('开始日期不能大于结束日期!');
            return;
          };
          this.removeClass(document.getElementById('startDateForm'),'ivu-form-item-error');
          this.removeClass(document.getElementById('endDateForm'),'ivu-form-item-error');

          //验证证券代码输入是否合法
          if(this.titles.length!=6 || !(/^[0-9]*$/).test(this.titles)){
            this.$Message.error('证券代码输入不合法');
            return;
          }
          //股东账户A  10 一个大写字母  9个数字
          if(this.formValidate.desc){
            const descStr = descValue.replace(/[\r\n]/g,',');
            let descArry = descStr.split(',');
            let descStr2 = descValue.replace(/[\r\n]/g, "");
            if(descStr2.trim().length==0)
            {
              this.$Message.error('股东账户不能为空!！');
              return;
            }
            //判断上传股东账户不能超过1200
            if(descArry.length>1200){
              this.$Message.error('账户组A不能超过1200个!');
              return;
            }
            for(var i=0; i < descArry.length; i++){
              const descVal = descArry[i].trim();
              const descReg = /^[A-Z]{1}\d{9}/g;
              if(descVal.length != 0){
                if(!descReg.test(descVal) || descVal.length != 10){
                  this.$Message.error('股东账户由一个大写字母和9个数字组成!！');//AccountForm
                  this.addClass(document.getElementById('AccountForm'),'ivu-form-item-error');
                  return;
                }
              }
            }
            this.removeClass(document.getElementById('AccountForm'),'ivu-form-item-error');
            // descValue = descArry.join(',');
            descValue = descArry;
          }
          //股东账户B  10 一个大写字母  9个数字
          if(this.formValidate.desc2){
            const descStr = descValue2.replace(/[\r\n]/g,',');
            let descArry = descStr.split(',');
            let descStr2 = descValue2.replace(/[\r\n]/g, "");
            if(descStr2.trim().length==0)
            {
              this.$Message.error('股东账户不能为空!！');
              return;
            }
            //判断上传股东账户不能超过1200
            if(descArry.length>1200){
              this.$Message.error('账户组B不能超过1200个!');
              return;
            }
            for(var i=0; i < descArry.length; i++){
              const descVal = descArry[i].trim();
              const descReg = /^[A-Z]{1}\d{9}/g;
              if(descVal.length != 0){
                if(!descReg.test(descVal) || descVal.length != 10){
                  this.$Message.error('股东账户由一个大写字母和9个数字组成!！');//AccountForm
                  this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                  return;
                }
              }
            }
            this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
            // descValue = descArry.join(',');
            descValue2 = descArry;
            //判断账户AB是否相等
            var abArray = [];
            for(var x in descValue){
              for(var y in descValue2){
                if(descValue[x].trim() == descValue2[y].trim()){
                  abArray.push(descValue[x]);
                  this.$Message.error('账户组A和账户组B不能存在相同的账户！');
                  return;
                }
              }
            }
            console.log(abArray,"------------------AB相同");
          }
          //验证显示行数是否为整数
          if(this.formValidate.showrow){
            var r = /^[1-9]\d*$/;
            if(r.test(this.formValidate.showrow) == false){
              this.$Message.error('显示行数不能为小数！请输入整数！');
              this.showrowTip = '显示行数不能为小数！请输入整数！';
              this.addClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
              return;
            }
            this.removeClass(document.getElementById('AccountForm3'),'ivu-form-item-error');
            this.showrowTip = '';
          }
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            this.isHide = false;
            //获取请求参数
            // var startdateValue = this.formValidate.startdate;

            var startDate = startdateValue.format('yyyyMMdd');
            console.log(startdate);
            // var enddateValue = this.formValidate.enddate;

            var endDate = enddateValue.format('yyyyMMdd');
            console.log(endDate);

            console.log(this.formValidate.desc);

            console.log(this.formValidate.zqCode);

            const descStr = this.formValidate.desc.replace(/[\r\n]/g,',');
            let descArry = descStr.split(',');
            let codelist=this.formValidate.zqCode.split(',');
            const descStr2 = this.formValidate.desc2.replace(/[\r\n]/g,',');
            let descArry2 = descStr2.split(',');

            //股东账户去空格，去空行
            var descArry5 = [];
            for(var i = 0; i < descArry.length; i++){
              descArry5.push(descArry[i].replace(/(^\s*)|(\s*$)/g, ""));
            }
            console.log(descArry5);
            for(var i = 0; i < descArry5.length; i++){
              if(descArry5[i] == '' || typeof descArry5[i] == 'undefined'){
                descArry5.splice(i, 1);
                i = i-1;
              }
            }
            console.log(descArry5);

            var descArry6 = [];
            for(var i = 0; i < descArry2.length; i++){
              descArry6.push(descArry2[i].replace(/(^\s*)|(\s*$)/g, ""));
            }
            console.log(descArry6);
            for(var i = 0; i < descArry6.length; i++){
              if(descArry6[i] == '' || typeof descArry6[i] == 'undefined'){
                descArry6.splice(i, 1);
              }
            }
            console.log(descArry6);


            //股东账户去重
            let descArry3 = [];
            let descArry4 = [];
            descArry5.forEach(function(item,index){
              if(descArry3.indexOf(item) ==-1){
                descArry3.push(item)
              }
            })
            descArry6.forEach(function(item,index){
              if(descArry4.indexOf(item) ==-1){
                descArry4.push(item)
              }
            })
            //下载参数
            this.startdateFormat = startDate;
            this.enddateFormat = endDate;
            this.descParam = descArry3;
            this.descParam2 = descArry4;

            this.testParams={
              "startDate":startDate,
              "endDate":endDate,
              "accountId":descArry3,
              "accountId2":descArry4,
              "secCode":[this.titles],
              "limit":this.formValidate.showrow.toString(),
              "userId":srcUseridA,
              "commRate":"0.02",
              "dwSessonid":dwSessionidA,
              "userName":srcUsernameA
            }
            console.log(this.testParams,"-----testParams111111111");
            this.searchData(this.testParams);

          } else {
            this.$Message.error('股东账户不能为空!');
          }
        })
      },
      clearOne:function(){
        this.formValidate.desc="";
        this.accountList=0;
      },
      clearTwo:function(){
        this.formValidate.desc2="";
        this.accountList2=0;
      },
      exportData (type) {
        //导出参数
        var downfileParams="&signature="+signatureA+
          "&userId="+srcUseridA+"&userName="+srcUsernameA+
          "&commRate=0.02&startDate="+this.startdateFormat+"&endDate="+this.enddateFormat+"&Authorization="+AuthorizationA;
        if (type === 1) {
          document.getElementById("exportCurrent").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCTREV&fileType=xlsx'+downfileParams));
        } else if (type === 2) {
          document.getElementById("exportCurrent2").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent2').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCTREV&fileType=dbf'+downfileParams));
        }else if (type === 3) {
          document.getElementById("exportCurrent3").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent3').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCTREVBT&fileType=xlsx'+downfileParams));
        }else if (type === 4) {
          document.getElementById("exportCurrent4").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent4').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCTREVBT&fileType=dbf'+downfileParams));
        }
      },
    }
  }
</script>


<style lang="less">
  #accountReversal {
    b {
      line-height: 32px;
      margin: 0 15px;
    }
    .redtext {
      line-height: 32px;
    }
    .ivu-upload {
      width: 100px;
      float: left;
    }
    .ivu-btn {
      margin-left: 15px;
      float: left;
    }
    .flexBox {
      .ivu-form-item {
        margin-right: 30px;
      }
    }
    .teamA {
      float: left;
      width: 270px;
      margin-top: 20px;
    }
    .teamB {
      float: left;
      width: 270px;
      margin-top: 20px;
      margin-left: 30px;
    }
    .uploadNumber {
      margin-left: 15px;
      p {
        margin: 10px 0;
      }
    }
    .teamC {
      float: left;
      margin-top: 20px;
      margin-left: 30px;
      line-height: 181px;
      .ivu-btn {
        margin-top: 35%;
      }
    }
    .ivu-tabs-bar {
      border-bottom: 2px solid #d7dde4!important;
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
      border: none;
      background-color: #fff;
      margin-right: 25px;
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
      color: #3D83B5;
      border: none;
      border-bottom: 2px solid #3D83B5;
      padding: 0;
    }
    .ivu-tabs-nav .ivu-tabs-tab {
      padding: 0;
    }
    .ivu-tabs-bar {
      margin-bottom: 30px;
    }
    .tabTitle {
      margin-top: 30px;
    }
    .ivu-table th {
      background-color: #F5F8FA;
      color: #000;
    }
    .pageModule {
      width: 60%;
      .ivu-page {
        float: right;
      }
    }
    .exportBtn {
      width: 40%;
      .ivu-btn {
        float: left;
      }
    }
  }
  /*.searchIpt{*/
    /*display: inline-block;*/
    /*height: 32px;*/
    /*line-height: 32px;*/
    /*padding: 0 24px 0 8px;*/
    /*font-size: 12px;*/
    /*outline: 0;*/
    /*border: none;*/
    /*box-sizing: border-box;*/
    /*color: #657180;*/
    /*background-color: transparent;*/
    /*position: relative;*/
    /*cursor: pointer;*/
  /*}*/
  /*.clearFix:after{*/
    /*display: block;*/
    /*content:'';*/
    /*clear:both;*/
  /*}*/
  /*.select-down{*/
    /*width: inherit;*/
    /*max-height: 200px;*/
    /*overflow: auto;*/
    /*margin: 5px 0;*/
    /*padding: 5px 0;*/
    /*background-color: #ffffff;*/
    /*box-sizing: border-box;*/
    /*border-radius: 4px;*/
    /*box-shadow: 0 1px 6px rgba(0,0,0,.2);*/
    /*position: absolute;*/
    /*z-index: 900;*/
  /*}*/
  /*.warp{*/
    /*height: 32px;*/
    /*position: relative;*/
    /*display: block;*/
    /*box-sizing: border-box;*/
    /*outline: 0;*/
    /*-webkit-user-select: none;*/
    /*-moz-user-select: none;*/
    /*-ms-user-select: none;*/
    /*user-select: none;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*background-color: #fff;*/
    /*border-radius: 4px;*/
    /*margin-bottom:24px;*/
    /*border: 1px solid #d7dde4;*/
    /*transition: all .2s ease-in-out;*/
    /*margin-bottom:15px;*/
  /*}*/
  /*.select-input{*/
    /*width:100%;*/
    /*display: inline-block;*/
    /*height: 32px;*/
    /*line-height: 32px;*/
    /*padding: 0 24px 0 8px;*/
    /*font-size: 12px;*/
    /*outline: 0;*/
    /*border: none;*/
    /*box-sizing: border-box;*/
    /*color: #657180;*/
    /*background-color: transparent;*/
    /*position: relative;*/
    /*cursor: pointer;*/
  /*}*/
  /*.li-item {*/
    /*margin: 0;*/
    /*line-height: normal;*/
    /*padding: 7px 16px;*/
    /*clear: both;*/
    /*color: #657180;*/
    /*font-size: 12px!important;*/
    /*white-space: nowrap;*/
    /*list-style: none;*/
    /*cursor: pointer;*/
    /*transition: background .2s ease-in-out;*/
  /*}*/
</style>
