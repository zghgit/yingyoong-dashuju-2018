<template>
    <section class="constWidth">
        <!--头部logo-->
        <header></header>
        <h2 class="infoTitle">账面盈利计算</h2>
        <div class="mainBox">
             <Row :gutter="gutterValue">
                <Col :span="leftPane">
                    <!--显示隐藏按钮-->
                    <span class="showHideBar" @click="hideRightBox()"><i :class="changeArrow"></i></span>

                    <Card style="min-height:780px">
                        <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
                            <Icon type="load-c" size=40 class="loadIcon"></Icon>
                            <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
                        </Spin>
                        <span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>
                        <Modal id="lookInfoPop" title="账面盈利计算  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
                            <h3>数据说明</h3>
                            <p>证券选择范围：A股（暂不支持B股）、债券（不包括债券回购）、权证、基金<br>
                            A股时间范围：自1999-01-01至今<br>
                            B股时间范围：NULL<br>
                            债券时间范围：自1999-01-01至今<br>
                            权证时间范围：自1999-01-01至今<br>
                            基金时间范围：自1999-01-01至今<br>
                            </p>
                            <h3>指标说明</h3>
                            <p>新股申购：包括证券新股、证券增发、债券申购、债券配售<br>
                            累计买入、卖出：包括竞价系统、大宗交易系统的买卖，债券还包括固定收益平台的买卖数据<br>
                            印花税 = 买（卖）金额 * 买（卖）方向印花税率 ，历年印花税有所变化<br>
                            过户费 ：（A股）= 成交股数 / 1000  （B 股）=成交金额*0.05% ，其他品种=0<br>
                            佣金 = 成交金额 * 佣金费率 ，买卖方向皆收<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;注：债券佣金费率为0.02%，其他按前端输入费率，前端无输入则按缺省0.3%计算
                            累计派现金额：按税前金额计算，债券还包括付息
                            配股：包括配股以及增发的配售<br>
                            违法所得 = 期末持股市值 + 累计卖出金额 + 累计派现金额 + 股改送现金金额 – 期初持股市值 – 累计买入金额 – 印花税 – 过户费 – 交易佣金估算 – 配股金额 – 新股申购金额
                            校验 = 期末持股 + 累计卖出数量 + 非交易过户转出 – 期初持股 – 累计买入数量 – 非交易过户转入 – 新股申购数量 – 累计送股数量 – 配股数量 – 股改送股
                            </p>
                            <h3>其他说明</h3>
                            <p>无</p>
                        </Modal>
                        <p id="infoTableList" class="redtext listlength"></p>
                    <!--    <Table height="690" @on-sort-change="infoTableSort" id="infoTable" :context="self" :data="tableData1" :columns="tableColumns1" size="small" ref="table" border stripe></Table>
                           <Page :total="returnTotal" :current="returnN" :page-size="20" show-elevator show-total @on-change="tableChange"></Page> -->

                       <fastTable  :width="3600" @on-sort-change="infoTableSort" :bwidth="3580" :columns="tableColumns1" :data="tableData1"  ></fastTable> 

                   <div style="padding-top:10px">
                            <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>
                                  
                        <div style="text-align:right;padding-top:5px;">
                            <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
                        </div>
                        
                    </Card>
                </Col>
                <Col :span="rightPane" class="infoRightCard">

                    <Card style="min-height:780px">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <Row class="uploadBox proCalBtnBox">
                                <Upload action="/base-service/api/decode_upfile?uploadType=ZHYL" :headers="upfileParams" accept=".xls,.xlsx" :max-size="2048" :on-exceeded-size="handleMaxSize"  :on-success="handleSuccessAccount">
                                    <Button id="importAccountBtn" type="ghost" class="uploadExcel">Excel上传</Button>
                                </Upload>
                                <Button id="lookUploadBtn"  @click="lookUploadInfo = true">查看</Button>
                                <Modal v-model="lookUploadInfo" title="查看已上传的文件" width="884" class-name="vertical-center-modal" cancel-text>
                                   <Table height="300" id="lookInfoTable" border stripe :columns="columnsLookInfo" :data="dataLookInfo"></Table> 
                              
                                </Modal>
                                <Button id="templateBtn"  @click="modelexport()">模板</Button>
                                <Modal title="账面盈利计算文件模板" v-model="templateInfo" width="684" class-name="vertical-center-modal" cancel-text>
                                    <Table id="templateTable" border stripe :columns="columnsTemplate" :data="dataTemplate"></Table>
                                </Modal>
                            </Row>
                            <div class="procalList">
                                <p>已上传记录数：<font id="infoUploadAccount" class="bluetext">{{accountList}}</font></p>
                                <p>其中有效记录数：<font id="effectiveNumber" class="bluetext">{{effectiveList}}</font></p>
                            </div>
                            <br>
                            <Row>
                                <h4>佣金费率</h4>
                                <Form-item prop="comRate" id="commissionRate">
                                    <Input id="commissionRateValue" v-model="comRateValue" style="width:70%;"></Input>
                                    <label class="bluetext">&nbsp;&nbsp;%</label>
                                </Form-item>
                            </Row>
                            <Form-item class="showrow" prop="showrow" id="AccountForm2">
                                在页面上显示前&nbsp;&nbsp;<Input-number id="showrowInput" @on-change="validNum" :max="500" :min="1" v-model="formValidate.showrow" size="small" style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                                <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                                <p><label class="redtext fontsize12">(最多显示500行)</label></p>
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
import {columnsTemplate,dataTemplate,columnsLookInfo,tableColumns1} from '../assets/js/searchProfitCal.js';
import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';
    export default {
        mounted:function(){//页面加载时执行
            //获取URL地址参数
            var urlParams=window.location.href;
            var upfileParamsValue={};
            upfileParamsValue.signature=signatureA;
            upfileParamsValue.Authorization=AuthorizationA;
            this.upfileParams=upfileParamsValue;
        },
        data () {
            return {
                //输入行数为小数时提示文字
                showrowTip:'',
                returnN:1,
                returnTotal:0,
                dataArrayAll:[],
                 pageSize:500,
             //显示隐藏输入条件
                changeArrow:'rightArrow',
                gutterValue:16,
                leftPane:19,
                rightPane:5,
                columnsTemplate: columnsTemplate,
                dataTemplate: dataTemplate,
                columnsLookInfo: columnsLookInfo,
                dataLookInfo: [],
                dataLookEffective: [],
                lookUploadInfo:false,
                templateInfo:false,
                comRateValue:0.3,
                changeInfo:false,
                //查询参数初始化
                testParams:{},
                orderParams:{},
                urlParams:window.location.href,
                isHide:true,
                //文件解析参数
                upfileParams:this.upfileParamsValue,
                dealitems:0,
                //上传股东账户条数
                accountList: 0,
                effectiveList:0,
                formValidate: {
                    showrow:500,                  
                },
                ruleValidate: {
                    showrow: [
                        { required: true,type: 'number', message: '显示行数不能为空', trigger: 'blur' }
                    ],
                },
                self: this,
                tableData1: [],       
                tableColumns1: tableColumns1,
                t: ''
            }
        },
        watch:{
            comRateValue(){
             var _this = this;
                if(!(/^[0-9]+([.]{1}[0-9]+){0,1}$/).test(_this.comRateValue)){
                this.$Message.error('请输入合法参数!');
                }
            },
        },
        methods: {
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
                this.tableData1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
            },
            tableChangeSize:function (pageSize){
                this.pageSize=pageSize;
                this.returnN=1;
                this.tableData1 =this.dataArrayAll.slice(0,this.pageSize);
            },           
            hideRightBox:function(){//显示隐藏左右
                (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
                (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
                (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16; 
                (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';   
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
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
                const arr = val.trim().split("\n");
                const accountReg = /[A-z]\d$/g;
                let arrNew = [];
                
                for(var i = 0; i < arr.length; i++){
                   if(arr[i] == '' || typeof arr[i] == 'undefined'){
                      arr.splice(i, 1);
                      i= i-1;
                   }
                }
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
                        if(arry[i].isEffective == "true"){
                            arry[i].isBoolean = '是'
                        }else{
                            arry[i].isBoolean = '否'
                        }
                        arryAll.push(arry[i]);
                    }
                    console.log(arryAll)
                    this.dataLookInfo = arryAll;
                    this.accountList = arryAll.length;
                    //判断是否有效
                    let effectiveNum = 0;
                    this.dataLookEffective=[];
                    for(var i=0;i<arry.length;i++){
                        if(arry[i].isEffective == "true"){
                            effectiveNum ++;
                            this.dataLookEffective.push(arry[i]);
                        }
                    }
                    this.effectiveList = effectiveNum;

                    str = arryAll.join('\n');
                    this.formValidate.desc = str;
                }
            },      
            hasClass:function(obj, cls){  //原声js写jquery方法
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
                this.orderParams={};
                this.isHide=false;
                this.returnN=1;
                this.returnTotal=0;
                this.dataArrayAll=[];
                this.tableData1=[];
                this.dealitems = 0;
                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录";
               //const url = '/dwapp/mktdt/zm_acct_gain';
              const url = '/dwapp/mktdt/zm_acct_gain';
              var _this=this;

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
                    _this.$Message.error('系统繁忙，刷新页面!');
                    _this.isHide=true;
                }).then(data => {
                    if(this.t != ''){
                        clearTimeout(this.t);
                    }
                    var exportButton1 = document.getElementById("exportCurrent");

                    //取数据
                    var dataResponse=data.resData;
                    var dataError=data.message;
                    var datalength = data.respSize;

                    if(dataResponse == null){
                        this.isHide=true;
                        this.$Message.warning("查询出错"+dataError);
                        this.tableData1 = [];
                        this.tableData2 = [];
                        this.dealitems = 0;

                        exportButton1.setAttribute("disabled",true);

                    }else{
                        if(dataResponse.length == 0){
                            this.isHide=true;
                            this.$Message.warning('查询无数据！');
                            this.tableData1 = [];
                            this.tableData2 = [];
                            this.dealitems = 0;

                            exportButton1.setAttribute("disabled",true);
                        }else{
                            var dataArray=[];
                            this.dealitems = datalength;
                            console.log(dataResponse)

                            this.dataArrayAll=[];
                            this.dataArrayAll=dataResponse;//保存所有数据
                            this.returnN=1;
                            this.returnTotal=dataResponse.length;
                            var tmpLimit=this.pageSize;
                            if(tmpLimit>dataResponse.length){
                            //如果加载数据少，全部返回
                                tmpLimit=dataResponse.length;
                            }
                               this.tableData1=this.dataArrayAll.slice(0,tmpLimit);


                          
                            exportButton1.removeAttribute("disabled");

                            this.isHide=true;

                            //查询结果提示变化
                            if(this.formValidate.showrow<this.dealitems){
                                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                            }else{
                                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录";
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
                    if(this.comRateValue >=1 || this.comRateValue <=0 || !(/^[0-9]+([.]{1}[0-9]+){0,1}$/).test(this.comRateValue)){
                        this.$Message.error('请输入0-1之间的数!');
                        return;
                    }

                    if(this.dataLookEffective.length==0){
                        this.$Message.error('上传数据不能为空!');
                        return;
                    }
                    if (valid) {
                        this.$Message.success('提交成功!请等待~'); 
                            this.testParams={
                                "userId":srcUseridA,
                                "userName":srcUsernameA,
                                "commRate":this.comRateValue,
                                "dwSessonid":dwSessionidA,
                                "limit":this.formValidate.showrow,
                                "excelParams":this.dataLookEffective
                            };
                        console.log(this.testParams,"-----testParams111111111");
                        this.searchData(this.testParams);
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            clearOne:function(){
                this.formValidate.desc="";
                this.accountList=0;
            },
            modelexport:function(){
                void(window.open('/dwapp/download/downLoadFile?reportType=ACCTGAINMODULE'+"&signature="+signatureA+"&Authorization="+AuthorizationA));  
            },
            exportData (type) {
                //导出参数
                var downfileParams="&signature="+signatureA+
                "&userId="+srcUseridA+"&userName="+srcUsernameA+"&commRate="+this.comRateValue.toString()+"&Authorization="+AuthorizationA;
                if (type === 1) {
                   document.getElementById("exportCurrent").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
                        void(window.open('/dwapp/download/dwapp_downfile?fileType=xlsx&reportType=ACCTGAIN'+downfileParams));                     
                }
            },
        }
    }
</script>