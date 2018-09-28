<template>
    <section class="constWidth" @click="ready">
        <!--头部logo-->
        <header></header>
        <h2 class="infoTitle">庄股协查指标查询</h2>
        <div class="mainBox queryBox">
           <Row :gutter="gutterValue">
                <Col :span="leftPane">
                    <!--显示隐藏按钮-->
                    <span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>
                    <Card style="min-height:780px;">
                        <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
                            <Icon type="load-c" size=40 class="loadIcon"></Icon>
                            <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
                        </Spin>
                        <span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>
                        <Modal id="lookInfoPop" title="庄股协查指标查询  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
                            <h3>数据说明</h3>
                            <p>数据时间范围：数据时间范围：自2001年初至今 （应用上线初期只有2009年11月23日及以后的数据，之前的数据将按由近及远的顺序依次弥补加载）<br>
                            证券选择范围：A股、B股、封闭式基金、ETF基金、债券现券、债券回购<br>
                            交易平台范围：统计结果包含普通竞价系统和大宗交易系统<br>
                            </p>
                            <h3>指标说明</h3>
                            <p>买入均价＝买入金额÷买入数量<br>
                            卖出均价＝卖出金额÷卖出数量<br>
                            对于新质押式回购品种而言，本应用中的均价无业务含义。<br>
                            </p>
                            <h3>其他说明</h3>
                            <p>在统计时，“会员营业部名称”字段的值基于成交明细数据中的Stat_Seat_Code来确定。如果某一个股东账户在同一交易日内的成交明细数据中出现了不同的Stat_Seat_Code（这种情况比较少见，但存在），那么以该股东账户当天第一笔交易类申报记录对应的Stat_Seat_Code来作为其当天所有交易的Stat_Seat_Code。即对某一个股东账户而言，在同一交易日内所有交易数据的“会员营业部名称”都相同。
                            </p>
                        </Modal>
                        <!--切换表格-->
                        <div>
                            <Tabs type="card" :animated="false" class="noscrollTabs">
                                <Tab-pane label="每日交易、对倒、持仓汇总统计表">
                                    <p id="qiList1" class="redtext listlength"></p>
                                <!--    <Table height="516" @on-sort-change="infoTableSort" id="qiTable1" :context="self" :data="TableData3" :columns="qiTableColumns1"  ref="table" border stripe></Table>
                                    <Page :total="returnTotal" :current="returnN" :page-size="20" show-elevator show-total @on-change="tableChange"></Page> -->

                                   <fastTable  :width="1920" :bwidth="1920" :columns="qiTableColumns1" :data="TableData3"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal" :current="returnN" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>
                                </Tab-pane>
                                <Tab-pane label="持仓总体统计表">
                                    <p id="qiList2" class="redtext listlength"></p>
                              <!--      <Table height="516" @on-sort-change="infoTableSort" id="qiTable2" :context="self" :data="TableData4" :columns="qiTableColumns2"  ref="table" border stripe></Table>
                                    <Page :total="returnTotal2" :current="returnN2" :page-size="20" show-elevator show-total @on-change="tableChange2"></Page> -->

                 <fastTable  :width="950" :bwidth="940" :addWidth="0" :columns="qiTableColumns2" :data="TableData4"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal2" :current="returnN2" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page> </div>
                                </Tab-pane>
                                <Tab-pane label="交易总体统计表">
                                    <p id="qiList3" class="redtext listlength"></p>
                             <!--       <Table height="516" @on-sort-change="infoTableSort" id="qiTable3" :context="self" :data="TableData6" :columns="qiTableColumns3"  ref="table" border stripe></Table>
                                    <Page :total="returnTotal3" :current="returnN3" :page-size="20" show-elevator show-total @on-change="tableChange3"></Page>  -->
                 <fastTable  :width="950" :bwidth="933" :addWidth="0" :columns="qiTableColumns3" :data="TableData6"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal3" :current="returnN3" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer @on-page-size-change="tableChangeSize3" @on-change="tableChange3"></Page> </div>

                                </Tab-pane>
                                <Tab-pane label="对倒总体统计表">
                                    <p id="qiList4" class="redtext listlength"></p>
                        <!--            <Table height="516" @on-sort-change="infoTableSort" id="qiTable4" :context="self" :data="TableData2" :columns="qiTableColumns4"  ref="table" border stripe></Table>
                                    <Page :total="returnTotal4" :current="returnN4" :page-size="20" show-elevator show-total @on-change="tableChange4"></Page>  -->

                      <fastTable  :width="950" :bwidth="933" :addWidth="0" :columns="qiTableColumns4" :data="TableData2"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal4" :current="returnN4" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize4" @on-change="tableChange4"></Page> </div>
                                </Tab-pane>
                                <Tab-pane label="账户组连续二十个交易日交易占比超过30%统计表">
                                    <p id="qiList5" class="redtext listlength"></p>
                          <!--          <Table height="516" @on-sort-change="infoTableSort" id="qiTable5" :context="self" :data="TableData5" :columns="qiTableColumns5"  ref="table" border stripe></Table>
                                    <Page :total="returnTotal5" :current="returnN5" :page-size="20" show-elevator show-total @on-change="tableChange5"></Page>  -->

                      <fastTable  :width="950" :bwidth="933" :addWidth="0" :columns="qiTableColumns5" :data="TableData5"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal5" :current="returnN5" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer @on-page-size-change="tableChangeSize5" @on-change="tableChange5"></Page> </div>

                                </Tab-pane>
                                <Tab-pane label="账户组连续二十个交易日对倒占比超过20%统计表">
                                    <p id="qiList6" class="redtext listlength"></p>
                             <!--       <Table height="516" @on-sort-change="infoTableSort" id="qiTable6" :context="self" :data="TableData1" :columns="qiTableColumns6"  ref="table" border stripe></Table>
                                    <Page :total="returnTotal6" :current="returnN6" :page-size="20" show-elevator show-total @on-change="tableChange6"></Page>  -->

                         <fastTable  :width="950" :bwidth="933" :addWidth="0" :columns="qiTableColumns6" :data="TableData1"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal6" :current="returnN6" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize6" @on-change="tableChange6"></Page> </div>

                                </Tab-pane>
                            </Tabs>
                        </div>
                        <div style="text-align:right;margin-bottom:10px;">
                            <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
                        </div>

                    </Card>
                </Col>
               <Col :span="rightPane" class="infoRightCard">

                    <Card style="min-height:780px">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <b>开始日期</b>
                            <Form-item prop="startdate" id="startDateForm">
                                <Date-picker id="startDate" type="date"  placeholder="选择开始日期" v-model="formValidate.startdate"></Date-picker>
                            </Form-item>
                            <b>结束日期</b>
                            <Form-item prop="enddate" id="endDateForm">
                                <Date-picker id="endDate" type="date"  placeholder="选择结束日期" v-model="formValidate.enddate"></Date-picker>
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
                            <b>股东账户</b><label class="redtext fontsize12">（不超过2500个）</label>
                            <Row class="uploadBox">
                                <Upload action="/base-service/api/decode_upfile?uploadType=ACCID" :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                                    <Button id="importAccountBtn" type="ghost">导入</Button>
                                </Upload>
                                <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                            </Row>
                            <Row>
                                <p>已上传个数：<font id="infoUploadAccount" class="bluetext">{{accountList}}</font></p>
                                <Form-item prop="desc" id="AccountForm">
                                    <Input  id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea" :rows="10" placeholder="请输入股东账户"></Input>
                                </Form-item>
                            </Row>
                            <Form-item class="showrow" prop="showrow" id="AccountForm2">
                                在页面上显示前&nbsp;&nbsp;<Input-number id="showrowInput" @on-change="validNum" :max="1000" :min="1" v-model="formValidate.showrow" size="small" style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                                <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                                <p><label class="redtext fontsize12">(最多显示1000行)</label></p>
                            </Form-item>
                            <Form-item>
                                <div class="cxBox"><Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button></div>
                            </Form-item>

                        </Form>

                    </Card>
                </Col>
            </Row>

        </div>
    </section>
</template>



<script>
import 'whatwg-fetch';
import {qiTableColumns1,qiTableColumns2,qiTableColumns3,qiTableColumns4,qiTableColumns5,qiTableColumns6} from '../assets/js/queryIndex.js';
import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';

//日期初始值
let lastTradeDate="";
  export default {
        //页面加载时执行
        mounted:function(){
            //获取URL地址参数
            var urlParams=window.location.href;
            var upfileParamsValue={};
            upfileParamsValue.signature=signatureA;
            upfileParamsValue.Authorization=AuthorizationA;
            this.upfileParams = upfileParamsValue;
        },
        data () {
            return {
            //输入行数为小数时提示文字
                showrowTip:'',
                returnN:1,
                returnTotal:0,
                dataArrayAll:[],
                returnN2:1,
                returnTotal2:0,
                dataArrayAll2:[],
                returnN3:1,
                returnTotal3:0,
                dataArrayAll3:[],
                returnN4:1,
                returnTotal4:0,
                dataArrayAll4:[],
                returnN5:1,
                returnTotal5:0,
                dataArrayAll5:[],
                returnN6:1,
                returnTotal6:0,
                dataArrayAll6:[],
                pageSize:200,
                pageSize2:200,
                pageSize3:200,
                pageSize4:200,
                pageSize5:200,
                pageSize6:200,
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
                    showrow:1000,
                    startdate:new Date(this.initialDate()),
                    enddate: new Date(this.initialDate()),
                    desc: '',
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
                        { required: true, message: '请输入股东账户', trigger: 'blur' },
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
                self: this,
                //表格数据
                dealitems1:0,
                dealitems2:0,
                dealitems3:0,
                dealitems4:0,
                dealitems5:0,
                dealitems6:0,
                TableData1: [],
                TableData2: [],
                TableData3: [],
                TableData4: [],
                TableData5: [],
                TableData6: [],
                qiTableColumns1: qiTableColumns1,
                qiTableColumns2: qiTableColumns2,
                qiTableColumns3: qiTableColumns3,
                qiTableColumns4: qiTableColumns4,
                qiTableColumns5: qiTableColumns5,
                qiTableColumns6: qiTableColumns6,
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
                    // body: JSON.stringify(upfileParamsValue),
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
         }
        },
        methods: {
        ready(){
          var _this = this;
          document.addEventListener('click',(e) => {
               _this.listShow = false;
          })
        },
        //验证日期是否合法
        checkData(){
         const q = /^(\d{4})-(\d{2})$/;
         if(q.test(document.querySelectorAll('.ivu-date-picker-editor .ivu-input')[0].value) == false){
            this.$Message.error('请输入正确的日期格式！');
            return;
         }
        },
        //验证显示行数是否为小数
        validNum:function(){
            var r = /^[1-9]\d*$/;
            if(r.test(this.formValidate.showrow) == false){
                this.$Message.error('显示行数不能为小数！请输入整数！');
                this.showrowTip = '显示行数不能为小数！请输入整数！';
                this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                return;
            }
            this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
            this.showrowTip = '';
        },
         tableChange:function (page){
            this.returnN=page;
            this.TableData3 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
        },
          tableChangeSize:function (pageSize){
            this.pageSize=pageSize;
            this.returnN=1;
            this.TableData3 =this.dataArrayAll.slice(0,this.pageSize);
        },
         tableChange2:function (page){
            this.returnN2=page;
            this.TableData4=this.dataArrayAll2.slice((page-1)*this.pageSize2,page*this.pageSize2);
        },
          tableChangeSize2:function (pageSize){
            this.pageSize2=pageSize;
            this.returnN2=1;
            this.TableData4 =this.dataArrayAll2.slice(0,this.pageSize2);
        },
        tableChange3:function (page){
            this.returnN3=page;
            this.TableData6=this.dataArrayAll3.slice((page-1)*this.pageSize3,page*this.pageSize3);
        },
          tableChangeSize3:function (pageSize){
            this.pageSize3=pageSize;
            this.returnN3=1;
            this.TableData6 =this.dataArrayAll3.slice(0,this.pageSize3);
        },
          tableChange4:function (page){
            this.returnN4=page;
            this.TableData2=this.dataArrayAll4.slice((page-1)*this.pageSize4,page*this.pageSize4);
        },
          tableChangeSize4:function (pageSize){
            this.pageSize4=pageSize;
            this.returnN4=1;
            this.TableData2 =this.dataArrayAll4.slice(0,this.pageSize4);
        },
         tableChange5:function (page){
            this.returnN5=page;
            this.TableData5=this.dataArrayAll5.slice((page-1)*this.pageSize5,page*this.pageSize5);
        },
          tableChangeSize5:function (pageSize){
            this.pageSize5=pageSize;
            this.returnN5=1;
            this.TableData5 =this.dataArrayAll5.slice(0,this.pageSize5);
        },
          tableChange6:function (page){
            this.returnN6=page;
            this.TableData1=this.dataArrayAll6.slice((page-1)*this.pageSize6,page*this.pageSize6);
        },
          tableChangeSize6:function (pageSize){
            this.pageSize6=pageSize;
            this.returnN6=1;
            this.TableData1 =this.dataArrayAll6.slice(0,this.pageSize6);
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
        hideRightBox:function(){//显示隐藏左右
            (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
            (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
            (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16;
            (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';
        },
        selectCode:function(value){//证券代码模糊查询截取字段
            console.log(value,"------------------------zqcode",this.zqCodeList[0].value);
            var selectValue = value;
            for(var i=0;i<this.zqCodeList;i++){
                if(selectValue == this.zqCodeList[i].value){
                    this.zqCodeList[i].label.split(".",1);
                    console.log(selectValue,"------------------------zqcode1111111111");
                }
            }
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
        getUrlParams:function(url){//获取参数
            var urlArray=url.split("?")[1].split("&"),
                urlValue={};
            for(var i=0;i<urlArray.length;i++){
                var urlRowArray=urlArray[i].split("=");
                urlValue[urlRowArray[0]]=urlRowArray[1];
            }
            return urlValue;
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
        //原声js写jquery方法
        hasClass:function(obj, cls){
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
        //传排序参数
        infoTableSort:function(sort){
            this.orderParams.field=sort.key;
            this.orderParams.sort=sort.order;
        },
        //查询表单数据
        searchData:function(requestParam){


            this.dataArrayAll=[];
            this.dataArrayAll2=[];
            this.dataArrayAll3=[];
            this.dataArrayAll4=[];
            this.dataArrayAll5=[];
            this.dataArrayAll6=[];

            this.TableData1 = [];
            this.TableData2 = [];
            this.TableData3 = [];
            this.TableData4 = [];
            this.TableData5 = [];
            this.TableData6 = [];
            this.dealitems1 = 0;
            this.dealitems2 = 0;
            this.dealitems3 = 0;
            this.dealitems4 = 0;
            this.dealitems5 = 0;
            this.dealitems6 = 0;
            document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录";
            document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录";
            document.getElementById("qiList3").innerHTML="查询结果共 "+this.dealitems3+" 条记录";
            document.getElementById("qiList4").innerHTML="查询结果共 "+this.dealitems4+" 条记录";
            document.getElementById("qiList5").innerHTML="查询结果共 "+this.dealitems5+" 条记录";
            document.getElementById("qiList6").innerHTML="查询结果共 "+this.dealitems6+" 条记录";

            this.orderParams={};
            this.isHide=false;
            this.returnN=1;
            this.returnTotal=0;
            this.returnN2=1;
            this.returnTotal2=0;
            this.returnN3=1;
            this.returnTotal3=0;
            this.returnN4=1;
            this.returnTotal4=0;
            this.returnN5=1;
            this.returnTotal5=0;
            this.returnN6=1;
            this.returnTotal6=0;

            var _this=this;
            const url = '/dwapp/mktdt/zg_every_sum';

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
                var _this = this;
                 this.isHide=true;
                //取数据
                var dataResponse=data.resData;
                var dataError=data.message;
                var datalength1 = data.resData.zgEverySumList.size;
                var datalength2 = data.resData.zgBackSumList.size;
                var datalength3 = data.resData.zgTradeSumList.size;
                var datalength4 = data.resData.zgPositionSumList.size;
                var datalength5 = data.resData.zgTradePropList.size;
                var datalength6 = data.resData.zgBackPropList.size;

                if(dataResponse == null){
                    this.isHide=true;
                    this.$Message.warning("查询出错"+dataError);
                    this.TableData1 = [];
                    this.TableData2 = [];
                    this.TableData3 = [];
                    this.TableData4 = [];
                    this.TableData5 = [];
                    this.TableData6 = [];
                    this.dealitems1 = datalength1;
                    this.dealitems2 = datalength2;
                    this.dealitems3 = datalength3;
                    this.dealitems4 = datalength4;
                    this.dealitems5 = datalength5;
                    this.dealitems6 = datalength6;

                    exportButton1.setAttribute("disabled",true);

                }else{
                    if(dataResponse.length == 0){
                        this.isHide=true;
                        this.$Message.warning('查询无数据！');
                        this.TableData1 = [];
                        this.TableData2 = [];
                        this.TableData3 = [];
                        this.TableData4 = [];
                        this.TableData5 = [];
                        this.TableData6 = [];
                        this.dealitems1 = datalength1;
                        this.dealitems2 = datalength2;
                        this.dealitems3 = datalength3;
                        this.dealitems4 = datalength4;
                        this.dealitems5 = datalength5;
                        this.dealitems6 = datalength6;

                        exportButton1.setAttribute("disabled",true);
                    }else{
                        var dataArray1=[];
                        var dataArray2=[];
                        var dataArray3=[];
                        var dataArray4=[];
                        var dataArray5=[];
                        var dataArray6=[];
                        this.dealitems1 = datalength1;
                        this.dealitems2 = datalength2;
                        this.dealitems3 = datalength3;
                        this.dealitems4 = datalength4;
                        this.dealitems5 = datalength5;
                        this.dealitems6 = datalength6;

                        this.dataArrayAll6=[];
                        this.dataArrayAll6=dataResponse.zgBackPropList.data;//保存所有数据
                        this.returnN6=1;
                        this.returnTotal6=dataResponse.zgBackPropList.data.length;
                        var tmpLimit=this.pageSize6;
                        if(tmpLimit>dataResponse.zgBackPropList.data.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.zgBackPropList.data.length;
                        }
                          _this.TableData1=this.dataArrayAll6.slice(0,tmpLimit);
                       this.dataArrayAll4=[];
                        this.dataArrayAll4=dataResponse.zgBackSumList.data;//保存所有数据
                        this.returnN4=1;
                        this.returnTotal4=dataResponse.zgBackSumList.data.length;
                        var tmpLimit=this.pageSize4;
                        if(tmpLimit>dataResponse.zgBackSumList.data.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.zgBackSumList.data.length;
                        }
                          _this.TableData2=this.dataArrayAll4.slice(0,tmpLimit);

                            this.dataArrayAll=[];
                        this.dataArrayAll=dataResponse.zgEverySumList.data;//保存所有数据
                        this.returnN=1;
                        this.returnTotal=dataResponse.zgEverySumList.data.length;
                        var tmpLimit=this.pageSize;
                        if(tmpLimit>dataResponse.zgEverySumList.data.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.zgEverySumList.data.length;
                        }
                          _this.TableData3=this.dataArrayAll.slice(0,tmpLimit);

                        this.dataArrayAll2=[];
                        this.dataArrayAll2=dataResponse.zgPositionSumList.data;//保存所有数据
                        this.returnN2=1;
                        this.returnTotal2=dataResponse.zgPositionSumList.data.length;
                        var tmpLimit=this.pageSize2;
                        if(tmpLimit>dataResponse.zgPositionSumList.data.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.zgPositionSumList.data.length;
                        }
                          _this.TableData4=this.dataArrayAll2.slice(0,tmpLimit);


                           this.dataArrayAll5=[];
                        this.dataArrayAll5=dataResponse.zgTradePropList.data;//保存所有数据
                        this.returnN5=1;
                        this.returnTotal5=dataResponse.zgTradePropList.data.length;
                        var tmpLimit=this.pageSize5;
                        if(tmpLimit>dataResponse.zgTradePropList.data.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.zgTradePropList.data.length;
                        }
                          _this.TableData5=this.dataArrayAll5.slice(0,tmpLimit);

                            this.dataArrayAll3=[];
                        this.dataArrayAll3=dataResponse.zgTradeSumList.data;//保存所有数据
                        this.returnN3=1;
                        this.returnTotal3=dataResponse.zgTradeSumList.data.length;
                        var tmpLimit=this.pageSize3;
                        if(tmpLimit>dataResponse.zgTradeSumList.data.length){
                        //如果加载数据少，全部返回
                            tmpLimit=dataResponse.zgTradeSumList.data.length;
                        }
                          _this.TableData6=this.dataArrayAll3.slice(0,tmpLimit);

                        exportButton1.removeAttribute("disabled");

                        this.isHide=true;
                        //查询结果提示变化1
                        if(this.formValidate.showrow<this.dealitems1){
                            document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录";
                        }
                        //查询结果提示变化2
                        if(this.formValidate.showrow<this.dealitems2){
                            document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录";
                        }
                        //查询结果提示变化3
                        if(this.formValidate.showrow<this.dealitems3){
                            document.getElementById("qiList3").innerHTML="查询结果共 "+this.dealitems3+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("qiList3").innerHTML="查询结果共 "+this.dealitems3+" 条记录";
                        }
                        //查询结果提示变化4
                        if(this.formValidate.showrow<this.dealitems4){
                            document.getElementById("qiList4").innerHTML="查询结果共 "+this.dealitems4+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("qiList4").innerHTML="查询结果共 "+this.dealitems4+" 条记录";
                        }
                        //查询结果提示变化5
                        if(this.formValidate.showrow<this.dealitems5){
                            document.getElementById("qiList5").innerHTML="查询结果共 "+this.dealitems5+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("qiList5").innerHTML="查询结果共 "+this.dealitems5+" 条记录";
                        }
                        //查询结果提示变化6
                        if(this.formValidate.showrow<this.dealitems6){
                            document.getElementById("qiList6").innerHTML="查询结果共 "+this.dealitems6+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                        }else{
                            document.getElementById("qiList6").innerHTML="查询结果共 "+this.dealitems6+" 条记录";
                        }

                    }
                }
            })
        },
        handleSubmit (name) {
             if(this.isHide==false){
                return;
             }
             this.$refs[name].validate((valid) => {
                    const { desc } = this.formValidate;
                    var descValue = desc;

                            //日期格式验证
            // var r = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
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
                        //股东账户  10 一个大写字母  9个数字
    					if(this.formValidate.desc){
    						const descStr = descValue.replace(/[\r\n]/g,',');
    						let descArry = descStr.split(',');
                            let descStr2 = descValue.replace(/[\r\n]/g, "");
                             if(descStr2.trim().length==0)
                             {
                               this.$Message.error('股东账户不能为空!！');
                               return;
                             }
                            //判断上传股东账户不能超过2500
                            if(descArry.length>2500){
                                this.$Message.error('股东账户不能超过2500个!');
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
                         //验证显示行数是否为整数
                        if(this.formValidate.showrow){
                            var r = /^[1-9]\d*$/;
                            if(r.test(this.formValidate.showrow) == false){
                                this.$Message.error('显示行数不能为小数！请输入整数！');
                                this.showrowTip = '显示行数不能为小数！请输入整数！';
                                this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                                return;
                            }
                            this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                            this.showrowTip = '';
                        }

                        if (valid) {
                            this.$Message.success('提交成功!请等待~');
                        var startdateValue = this.formValidate.startdate;

                        var startdate = startdateValue.format('yyyyMMdd');
                        console.log(startdate);
                        var enddateValue = this.formValidate.enddate;

                        var endDate = enddateValue.format('yyyyMMdd');
                        console.log(endDate);

                        console.log(this.formValidate.desc);

                        console.log(this.formValidate.zqCode);

                        const descStr = this.formValidate.desc.replace(/[\r\n]/g,',');
                        let descArry = descStr.split(',');
                        let codelist=this.formValidate.zqCode.split(',');


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

                                //股东账户去重
                                let descArray2 = [];
                                descArry5.forEach(function(item,index){
                                    if(descArray2.indexOf(item) ==-1){
                                       descArray2.push(item)
                                    }
                                })

                            this.testParams= {
                                "startDate":startdate,
                                "endDate":endDate,
                                "userId":srcUseridA,
                                "limit":this.formValidate.showrow,
                                "userName":srcUsernameA,
                                "accountId":descArray2,
                                "dwSessonid":dwSessionidA,
                                "secCode":[this.titles]
                            },
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
        exportData (type) {
            var startdateValue = this.formValidate.startdate;
            var startdate = startdateValue.format('yyyyMMdd');
            var enddateValue = this.formValidate.enddate;
            var endDate = enddateValue.format('yyyyMMdd');
            var descStr = this.formValidate.desc.replace(/[\r\n]/g,',');
                //导出参数
                var downfileParams="&signature="+signatureA+
                "&userId="+srcUseridA+"&userName="+srcUsernameA+
                "&startDate="+startdate+"&endDate="+endDate+"&secCode="+this.formValidate.zqCode+"&Authorization="+AuthorizationA;
                if (type === 1) {
                    document.getElementById("exportCurrent").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
                    void(window.open('/dwapp/download/dwapp_downfile?reportType=ZGEVERYSUM&fileType=xlsx'+downfileParams));
                }
            },
        }
        }
</script>



<style scoped>
  .searchIpt{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }
  .clearFix:after{
    display: block;
    content:'';
    clear:both;
  }
  .select-down{
    width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    z-index: 900;
  }
  .warp{
    height: 32px;
    position: relative;
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom:24px;
    border: 1px solid #d7dde4;
    transition: all .2s ease-in-out;
  }
  .select-input{
    width:100%;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 24px 0 8px;
    font-size: 12px;
    outline: 0;
    border: none;
    box-sizing: border-box;
    color: #657180;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }
  .li-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #657180;
    font-size: 12px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
}
</style>
