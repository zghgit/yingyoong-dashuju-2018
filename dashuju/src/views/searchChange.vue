<template>
    <section class="constWidth">
        <!--头部logo-->
        <header></header>
        <h2 class="infoTitle">交易营业部变更查询</h2>
        <div class="mainBox changeBox">
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
                        <Modal id="lookInfoPop" title="交易营业部变更查询  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
                            <h3>数据说明</h3>
                            <p>数据时间范围：自2001年初至今</p>
                            <h3>指标说明</h3>
                            <p>无</p>
                            <h3>其他说明</h3>
                            <p>1．	“账户交易营业部变更情况”的查询结果基于该股东账户的成交明细数据（不含大宗交易）生成。如果该股东账户某一笔成交明细数据中的“统计PBU”字段（Stat_Seat_Code）对应的会员代码或营业部代码与前一笔成交记录不同，则在结果集内会按照该笔成交明细的会员营业部信息新增一条记录。
                            <br>
                            2．	“账户指定交易变动情况”的结果数据按照以下算法规则生成：
                            <br>
                            (1)	在新交易系统上线前（2009-11-20及以前），以“指定交易变动数据”中每条记录的“证券代码”（799999指定，799998撤销）为依据，来判断该账户的变动类型。在新交易系统上线后（2009-11-23及以后），以“指定交易变动数据”中每条记录的“业务代码”（DT指定，DC撤销）为依据，来判断该账户的变动类型。
                            <br>
                            (2)	查询结果数据中的“对应PBU”是指“指定交易变动数据” 中每条记录的“PBU代码”（或者“席位代码”），“对应营业部”是指根据“对应PBU”获取得到的“会员营业部名称”。
                            <br>
                            (3)	结果数据中，“变动类型”为“指定”的记录，其“对应PBU”和“对应营业部”为变动后的状态。“变动类型”为“撤销”的记录，其“对应PBU”和“对应营业部”为变动前的状态。
                        </p>
                        </Modal>
                        <!--头部logo-->
                        <Tabs type="card" :animated="false" v-model="scTabsValue">
                            <Tab-pane label="账户交易营业部变更情况" name="scTabs1">
                                <p id="infoTableList" class="redtext listlength"></p>
                            <!--    <Table height="600" @on-sort-change="infoTableSort" id="infoTable" :context="self" :data="tableData1" :columns="tableColumns1" size="small" ref="table" border stripe></Table> -->

                             <fastTable  :width="950" :bwidth="929" :addWidth="0" :columns="tableColumns1" :data="tableData1"  ></fastTable>

                <div style="padding-top:10px">
            <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] show-sizer placement="top"  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>


                            </Tab-pane>
                            <Tab-pane label="账户指定交易变动情况" name="scTabs2">
                                <p id="infoTableListTwo" class="redtext listlength"></p>
                        <!--          <Table height="600" @on-sort-change="infoTableSort" id="infoTableTwo" :context="self" :data="tableData2" :columns="tableColumns2" size="small" ref="table" border stripe></Table>
                                  <Page :total="returnTotal2" :current="returnN2" :page-size="20" show-elevator show-total @on-change="tableChange2"></Page> -->

                         <fastTable  :width="950" :bwidth="929" :addWidth="0" :columns="tableColumns2" :data="tableData2"  ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal2" :current="returnN2" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page> </div>


                            </Tab-pane>
                        </Tabs>
                        <div style="text-align:right;padding-top:5px">
                            <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
                        </div>

                    </Card>
                </Col>
                <Col :span="rightPane" class="infoRightCard">
                    <Card style="min-height:780px">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <b>股东账户</b><label class="redtext fontsize12">（不超过2500个）</label>
                            <Row class="uploadBox">
                                <Upload action="/base-service/api/decode_upfile?uploadType=ACCID" :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                                    <Button id="importAccountBtn" type="ghost">导入</Button>
                                </Upload>
                                <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                            </Row>
                            <Row>
                                <p style="margin: 10px 0 5px 0;">已上传个数：<font id="infoUploadAccount" class="bluetext">{{accountList}}</font></p>
                                <Form-item prop="desc" id="AccountForm">
                                    <Input  id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea" :rows="12" placeholder="请输入股东账户"></Input>
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
import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';
import {tableColumns1,tableColumns2} from '../assets/js/searchChange.js';

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
                pageSize:500,
                pageSize2:500,
                //显示隐藏输入条件
                changeArrow:'rightArrow',
                gutterValue:16,
                leftPane:19,
                rightPane:5,
                //选项卡切换值
                scTabsValue:'scTabs1',
                changeInfo:false,
                //查询参数初始化
                testParams:{},
                orderParams:{},
                urlParams:window.location.href,
                isHide:true,
                //文件解析参数
                upfileParams:this.upfileParamsValue,
                dealitems:0,
                dealitemsTwo:0,
                //上传股东账户条数
				accountList: 0,
                formValidate: {
                    showrow:1000,
                    desc: '',
                },
                ruleValidate: {
                    showrow: [
                        { required: true,type: 'number', message: '显示行数不能为空', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入股东账户', trigger: 'blur' },
                    ]
                },
                self: this,
                tableData1: [],
                tableData2: [],
                tableColumns1: tableColumns1,
                tableColumns2: tableColumns2,
                t: ''
            }
        },
        methods: {
            validNum:function(){//验证显示行数是否为小数
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
             tableChange2:function (page){
                this.returnN2=page;
                this.tableData2 =this.dataArrayAll2.slice((page-1)*this.pageSize2,page*this.pageSize2);
            },
              tableChangeSize2:function (pageSize){
                this.pageSize2=pageSize;
                this.returnN2=1;
                this.tableData2 =this.dataArrayAll2.slice(0,this.pageSize2);
            },
            hideRightBox:function(){//显示隐藏左右
                (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
                (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
                (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16;
                (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';
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
            //股东账户已上传条数
			accountListChange:function(e){
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

                this.dataArrayAll=[];
                this.dataArrayAll2=[];
                this.tableData1 = [];
                this.tableData2 = [];
                this.dealitems = 0;
                this.dealitemsTwo = 0;
                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录";
                document.getElementById("infoTableListTwo").innerHTML="查询结果共 "+this.dealitemsTwo+" 条记录";
                this.returnN=1;
                this.returnTotal=0;
                this.returnN2=1;
                this.returnTotal2=0;
                var _this=this;
                this.orderParams={};
                this.isHide=false;
                let url = '/dw/mktdt/br_trade_all';
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
                        this.dealitemsTwo = 0;

                        exportButton1.setAttribute("disabled",true);

                    }else{
                        if(dataResponse.length == 0){
                            this.isHide=true;
                            this.$Message.warning('查询无数据！');
                            this.tableData1 = [];
                            this.tableData2 = [];
                            this.dealitems = 0;
                            this.dealitemsTwo = 0;

                            exportButton1.setAttribute("disabled",true);
                        }else{
                            var dataArray1=[],dataArray2=[];
                            this.dealitems = dataResponse.tradeDepartmentUpdate.size;
                            this.dealitemsTwo =dataResponse.tradeDepartmentChange.size;
                             this.dataArrayAll=[];
                            this.dataArrayAll=dataResponse.tradeDepartmentUpdate.data;//保存所有数据
                            this.returnN=1;
                            this.returnTotal=dataResponse.tradeDepartmentUpdate.data.length;
                            var tmpLimit=this.pageSize;
                            if(tmpLimit>dataResponse.tradeDepartmentUpdate.data.length){
                            //如果加载数据少，全部返回
                                tmpLimit=dataResponse.tradeDepartmentUpdate.data.length;
                            }
                               this.tableData1=this.dataArrayAll.slice(0,tmpLimit);
                            this.dataArrayAll2=[];
                            this.dataArrayAll2=dataResponse.tradeDepartmentChange.data;//保存所有数据
                            this.returnN2=1;
                            this.returnTotal2=dataResponse.tradeDepartmentChange.data.length;
                            var tmpLimit=this.pageSize2;
                            if(tmpLimit>dataResponse.tradeDepartmentChange.data.length){
                            //如果加载数据少，全部返回
                                tmpLimit=dataResponse.tradeDepartmentChange.data.length;
                            }
                               this.tableData2=this.dataArrayAll2.slice(0,tmpLimit);
                            exportButton1.removeAttribute("disabled");

                            this.isHide=true;
                            //查询结果提示变化1
                            if(this.formValidate.showrow<this.dealitems){
                                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                            }else{
                                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录";
                            }
                            //查询结果提示变化2
                            if(this.formValidate.showrow<this.dealitemsTwo){
                                document.getElementById("infoTableListTwo").innerHTML="查询结果共 "+this.dealitemsTwo+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
                            }else{
                                document.getElementById("infoTableListTwo").innerHTML="查询结果共 "+this.dealitemsTwo+" 条记录";
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
                const { desc } = this.formValidate;
                var descValue = desc;
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
                        console.log(descArry);
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

                         //股东账户去空格，去空行
                        var descArry5 = [];
                         for(var i = 0; i < descValue.length; i++){
                             descArry5.push(descValue[i].replace(/(^\s*)|(\s*$)/g, ""));
                         }
                         console.log(descArry5);
                        for(var i = 0; i < descArry5.length; i++){
                             if(descArry5[i] == '' || typeof descArry5[i] == 'undefined'){
                                descArry5.splice(i, 1);
                                i = i-1;
                             }
                         }
                         console.log(descArry5);
                        //获取请求参数
                         //股东账户去重
                        let descArray2 = [];
                        descArry5.forEach(function(item,index){
                            if(descArray2.indexOf(item) ==-1){
                               descArray2.push(item)
                            }
                        })
                        this.testParams={
                            "accountId":descArray2,"limit":this.formValidate.showrow.toString(),
                            "userId":srcUseridA, "userName":srcUsernameA,
                            "dwSessonid":dwSessionidA,
                            "startDate":"20170620","endDate":"20170620","secCode":["123123"]
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
            exportData (type) {
                //导出参数
                var descValue = this.testParams.accountId,
                    descStr = descValue.join(",");
                // console.log(descStr,"---------------------导出股东账户");
                var downfileParams="&signature="+signatureA+
                "&userId="+srcUseridA+"&userName="+srcUsernameA
                +"&startDate=20170620&endDate=20170620&secCode=123123"+
                "&Authorization="+AuthorizationA;
                if (type === 1) {
                    document.getElementById("exportCurrent").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
                      void(window.open('/dw/download/dwapp_downfile?reportType=TRADECHANGE&fileType=xlsx'+downfileParams));
                }
            },
        }
    }
</script>
