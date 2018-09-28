<template>
    <section class="constWidth">
       <!--头部logo-->
       <header></header>
       <!--标题框折叠面板-->
       <Collapse id="dealPanel" class="dealPanel" v-model="searchPanel" >
        <Panel name="1">
            账户证券交易情况查询
            <!--查询框-->
            <div slot="content" id="searchAccountBox" class="searchAccountBox">
                    <span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>
                    <Modal id="lookInfoPop" title="账户证券交易情况查询  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
                        <h3>数据说明</h3>
                        <p>数据时间范围：自2009年1月初至今 （如当前日期为2011年，则数据时间范围自2010年1月初至今，依此类推）</p>
                        <p>证券选择范围：A股、基金、债券</p>
                        <p>交易平台：竞价系统、大宗交易系统。不含固定收益平台</p>
                        <h3>指标说明</h3>
                        <p>1．     买入（或卖出）数量的单位：股票，股；基金，份；债券，手（10张）</p>
                        <p>2．     买入（或卖出）金额、均价的单位：元</p>
                        <p>3．     买入（或卖出）数量、金额包含大宗交易数据，不含固定收益平台数据</p>
                        <p>4．     买入（或卖出）均价 ＝ 买入（或卖出）金额 ÷ 买入（或卖出）数量（均价保四舍五入留小数点后3位）</p>
                        <p>5．     在明细结果中，“股东姓名”、“会员营业部”、“证券简称”按结果页面中“交易日期”当天的情况展示。“会员营业部”指该“股东账户”在“交易日期”当天闭市时的指定PBU对应的主营业部及会员。</p>
                        <p>6．     在汇总（钻取）结果中，“股东姓名”、“会员营业部”、“证券简称”按用户输入“结束日期”当天的情况展示。“会员营业部”指该“股东账户”在“结束日期”当天闭市时的指定PBU对应的主营业部及会员。</p>
                        <h3>其他说明</h3>
                        <p>如果用户点击明细结果中“交易日期”字段下任意一条记录，则按“股东账户”、“证券代码”汇总展示钻取结果。如果用户点击明细结果中“股东账户”字段下任意一条记录，则按“交易日期”、“证券代码”汇总展示钻取结果。如果用户点击明细结果中“证券代码”字段下任意一条记录，则按“交易日期”、“股东账户”汇总展示钻取结果。</p>
                        <p>本系统有审计功能，用户需严格控制使用范围和使用方式</p>
                        <p>出于性能考虑，建议用户一次不要上传太多记录。</p>
                        <p>本应用在数据仓库非加载时间（每日15:00以前）的典型运行时间大约在2分钟左右。加载时间（15:00-24:00）的运行时间会延长，可能要10分钟左右。</p>
                        <p>由于现有技术框架的限制，只有当用户同时选择交易日期和证券代码（或者证券名称）维度后，才会计算买成交占比和卖成交占比。</p>
                    </Modal>
                    <Form class="dealForm" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <Row class="dateBox">
                            <Col span="12">
                                <b>开始日期</b>
                                <Form-item prop="startdate" id="startDateForm">
                                    <Date-picker id="startDate" type="date"  placeholder="选择开始日期" v-model="formValidate.startdate" style="width: 360px"></Date-picker>
                                </Form-item>
                            </Col>
                            <Col span="12">
                                <b>结束日期</b>
                                <Form-item prop="enddate" id="endDateForm">
                                    <Date-picker id="endDate" type="date"  placeholder="选择结束日期" v-model="formValidate.enddate" style="width: 360px"></Date-picker>
                                </Form-item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                                <Row class="uploadBox uploadLeft">
                                    <b>股东账户</b>
                                    <Upload action="/base-service/api/decode_upfile?uploadType=ACCID" :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                                        <Button id="importAccountBtn" type="ghost">导入</Button>
                                    </Upload>
                                    <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                                    <span class="leftp">已导入&nbsp;<font id="dealUploadAccount" class="redtext">{{accountList}}</font>&nbsp;条</span>
                                    <label class="redtext fontsize12">（不超过2500个）</label>
                                </Row>
                                <Form-item prop="desc" class="inputAccount" id="AccountForm">
                                    <Input  id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea" :rows="6" placeholder="请输入股东账户" style="width:360px;"></Input>
                                </Form-item>
                                <Form-item class="showrow" prop="showrow" id="AccountForm2" style="display:none">
                                    在页面上显示前&nbsp;&nbsp;<Input-number id="showrowInput" :max="2000" :min="1" v-model="formValidate.showrow" size="small" style="width: 70px;"></Input-number>&nbsp;&nbsp;行&nbsp;&nbsp;<label class="redtext fontsize12">(最多显示2000行)</label>
                                </Form-item>

                            </Col>
                            <Col span="12">
                                <Row class="rightRadioBox">
                                    <b>统计对象</b>
                                    <Radio-group v-model="formValidate.cxtype" class="dealradio" v-on:on-change="showzq">
                                        <Radio id="codeRadio" label="按证券代码"></Radio>
                                        <Radio  id="typeRadio" label="按证券大类"></Radio>
                                        <Radio  id="allRadio" label="按所有证券"></Radio>
                                    </Radio-group>
                                </Row>
                                <div id="zqcode" style="margin-left:68px;margin-top:16px;">
                                    <Row class="uploadBox zqdmUpload">
                                        <Upload action="/base-service/api/decode_upfile?uploadType=SECCODE" :headers="upfileParams" accept=".txt" :on-success="handleSuccessCode">
                                            <Button id="importcodeBtn" type="ghost">导入</Button>
                                        </Upload>
                                        <Button id="clearcodeBtn" v-on:click="clearTwo()">清空</Button>
                                        <span class="rightp">已导入&nbsp;<font id="dealUploadCode" class="redtext">{{codeList}}</font>&nbsp;条</span>
                                        <label class="redtext fontsize12">（不超过1000个）</label>
                                    </Row>
                                    <Input id="codeInput" v-model="formValidate.zqdmRows" @on-change="codeListChange" type="textarea" :rows="4" placeholder="请输入证券代码"  style="width:360px;"></Input>
                                </div>
                                <div id="zqseries" class="hide" style="margin-left:68px;">
                                    <Checkbox-group v-model="formValidate.seriesList" class="dealCheckbox" @on-change="checkAllGroupChangeBond2">
                                        <Checkbox id="zqcheckbox" label="债券"></Checkbox>
                                        <Checkbox id="jjcheckbox" label="基金"></Checkbox>
                                        <Checkbox id="gpcheckbox" label="股票"></Checkbox>
                                        <p class="redtext">{{bondTypeTip}}</p>
                                    </Checkbox-group>
                                </div>

                            </Col>
                        </Row>
                        <Form-item>
                            <div class="cxBox"><Button class="searchDealBtn" id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查&nbsp;&nbsp;询</Button></div>
                        </Form-item>
                    </Form>
            </div>
        </Panel>
    </Collapse>

       <!--初始无数据提示图片-->
       <div id="sorryBox" class="sorryBox">
           <img src="../assets/img/sorry.png"  />
           <h3>还没有查询内容哦！</h3>
       </div>

       <!--维度运算和数据表格-->
       <div id="resultBox" class="hide">
            <!--维度运算-->
            <div class="wdcalBox">
                <Row>
                    <Col span="9">
                        <Card class="wdBox">
                            <p slot="title"><b class="redtext">*</b>&nbsp;维度</p>
                            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2">
                                <Form-item prop="wdCheck">
                                    <Checkbox-group v-model="formValidate2.wdCheck" @on-change="wdChange">
                                    <Checkbox id="wdCheck1" label="股东账户"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck2" label="股东名称"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck3" label="交易日期"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck4" label="会员营业部"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck5" label="会员"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck6" label="PBU"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck7" label="证券代码"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck8" label="证券简称"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck9" label="该证券当日总成交量（维度）"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck10" label="该证券当日总成交额（维度）"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck11" label="成交编号"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck12" label="订单编号"></Checkbox>
                                    <br>
                                    <Checkbox id="wdCheck13" label="成交时间"></Checkbox>
                                    <br>
                                </Checkbox-group>
                                </Form-item>
                            </Form>

                        </Card>
                    </Col>
                    <Col span="9">
                        <Card class="dlBox">
                            <p slot="title">度量</p>
                            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:10px;margin-bottom:10px;">
                                <Checkbox id="dlCheckAll" :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                            </div>
                            <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
                                <Checkbox id="dlCheck1" label="买成交数量（合计）"></Checkbox><br>
                                <Checkbox id="dlbuyVolumeRatio" label="买成交数量占比"></Checkbox><br>
                                <Checkbox id="dlCheck2" label="买成交金额（合计）"></Checkbox><br>
                                <Checkbox id="dlCheck3" label="卖成交数量（合计）"></Checkbox><br>
                                <Checkbox id="dlsellVolumeRatio" label="卖成交数量占比"></Checkbox><br>
                                <Checkbox id="dlCheck4" label="卖成交金额（合计）"></Checkbox><br>
                                <Checkbox id="dlCheck5" label="买成交数量（大宗）"></Checkbox><br>
                                <Checkbox id="dlCheck6" label="买成交金额（大宗）"></Checkbox><br>
                                <Checkbox id="dlCheck7" label="卖成交数量（大宗）"></Checkbox><br>
                                <Checkbox id="dlCheck8" label="卖成交金额（大宗）"></Checkbox><br>
                            </Checkbox-group>
                        </Card>
                    </Col>
                    <Col span="6">
                        <Card>
                            <p slot="title">操作</p>
                            显示行数&nbsp;&nbsp;<Input-number  id="wdCalRows" @on-change="validNum" :max="wdMax" :min="1" v-model="czrows" style="width: 80px"></Input-number>
                            <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                            <label class="redtext fontsize12" style="margin-top:10px;display:block;">（最多显示2000行）</label>
                        </Card>
                    </Col>
                </Row>

                <Row class="calbtnBox">
                    <Button class="wdcalBtn" id="wdCalBtn" type="primary" @click="handleSubmit2('formValidate2')">维度运算</Button>
                </Row>

            </div>

            <!--数据表格-->
            <div class="dataTable">
                <p id="dealTableList" class="redtext listlength">查询完毕&nbsp;!&nbsp;运算结果总记录数为:&nbsp;{{dealitems}}&nbsp;行&nbsp;显示前&nbsp;{{returnTotal}}&nbsp;行&nbsp;</p>
                <Spin id="loadBox" fix class="loadBox hide">
                    <Icon type="load-c" size=40 class="loadIcon"></Icon>
                    <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
                </Spin>
            <!--    <Table id="dealTable" border :columns="dealTable" :data="dealTableData" size="small" ref="table"></Table>
                  <Page :total="returnTotal" :current="returnN" :page-size="20" show-elevator show-total @on-change="tableChange"></Page>  -->

                    <fastTable  :width="tableWidth" :bwidth="tableWidth" :addWidth="addWidth"  :columns="dealTable" :data="dealTableData" ref="table" ></fastTable>

                <div style="padding-top:10px">
                            <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>

                <br>
                <div class="dealExport">
                    <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出当前表格数据（csv格式）</Button>
                    <Button id="exportListCsv" type="primary" size="large" @click="exportData(2)" disabled><Icon type="ios-download-outline"></Icon> 导出逐笔明细数据（csv格式）</Button>
                    <Button id="exportListExcel" type="primary" size="large" @click="exportData(3)" disabled><Icon type="ios-download-outline"></Icon> 导出逐笔明细数据（Excel格式）</Button>
                    <Button id="exportListDbf" type="primary" size="large" @click="exportData(4)" disabled><Icon type="ios-download-outline"></Icon> 导出逐笔明细数据（DBF格式）</Button>
                </div>

            </div>

       </div>

    </section>
</template>
<script>
import 'whatwg-fetch';
import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';
import {dataThead,dataTheadR,dataTheadS,dealTable,fenmuList,fenziList} from '../assets/js/searchDeal.js';

//导出参数
var downfileParams="&signature="+signatureA+"&userId="+srcUseridA+"&userName="+srcUsernameA+"&Authorization="+AuthorizationA;


    //维度运算表格数据
    var wdTableData;
    //日期初始值
    let lastTradeDate="";
    //查询参数初始化
    let searchParams={};
    var upfileParamsValue={
       signature: signatureA,
       Authorization: AuthorizationA
    };
    export default {
        data () {
            return {
                isHide:true,
                addWidth:1,
                urlParams:window.location.href,
                requestParam:'',//维度运算请求参数
                isChecked:[],//选中的数组
                descArray2:[],
            //输入行数为小数时提示文字
                showrowTip:'',

                tableWidth:1680,

                returnN:1,
                returnTotal:0,
                dataArrayAll:[],
                 pageSize:500,
                changeInfo:false,
                //下载的查询参数
                exportSearchParams:'',
                //日期参数
                startdateFormat:'',
                enddateFormat:'',
                descParam:[],
                wdMax:20,
                //文件解析参数
                upfileParams:upfileParamsValue,
                //上传股东账户条数
                accountList: 0,
                //证券代码已上传条数
                codeList: 0,
                //开始日期
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                //结束日期
                options4: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                bondTypeTip:'',
                formValidate2: {
                    wdCheck: ['股东账户','股东名称','交易日期','会员营业部','证券代码','证券简称'],
                },
                ruleValidate2: {
                    wdCheck: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个维度', trigger: 'change' },
                    ],
                },
                dealitems:0,
                showdealitems:0,
                dealTable: dealTable,
                dealTableData: [],
                fenmuList: fenmuList,
                blfenmu: '',
                fenziList: fenziList,
                blfenzi: '',
                blName:'比率名称',
                indeterminate3: false,
                checkAll3: false,
                checkAllGroup3: [],
                indeterminate2: false,
                checkAll2: false,
                checkAllGroup2: [],
                indeterminate: false,
                checkAll: false,
                checkAllGroup: ['买成交数量（合计）', '买成交数量占比','买成交金额（合计）','卖成交数量（合计）','卖成交数量占比','卖成交金额（合计）'],
                sumCheck:[],
                czrows:2000,
                lookysdl: false,
                searchPanel: '1',
                arrow:"︿",
                dmNumber:0,
                showLength:1000,
                uploadgdzh: '',
                self: this,
                formValidate: {
                    startdate: new Date(this.initialDate()),
                    enddate: new Date(this.initialDate()),
                    desc: '',
                    cxtype: '按证券代码',
                    seriesList: ['债券','基金','股票'],
                    zqdmRows:"",
                    showrow:2000,
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
                    ]
                },
                t: ''

            }
        },
        watch: {
          dealTable: {
              handler () {
               this.handleResize();
              },
              deep: true
          }
        },
        mounted () {
           this.handleResize();
        },
        methods: {
            //获取url参数
            getUrlParams(url){
                    var urlArray=url.split("?")[1].split("&"),
                    urlValue={};
                    for(var i=0;i<urlArray.length;i++){
                        var urlRowArray=urlArray[i].split("=");
                        urlValue[urlRowArray[0]]=urlRowArray[1];
                    }
                    return urlValue;
            },
            handleResize () {
             this.$nextTick(() => {
                     this.tableWidth = this.dealTable.map(cell => cell.width).reduce((a, b) => a + b);
                     console.log("this.tableWidth1333"+this.tableWidth);
                      this.addWidth=1;
                     if(this.tableWidth<1143){
                     this.addWidth=0;
                     }
              });

            },
            validNum:function(){//验证显示行数是否为小数
                var r = /^[1-9]\d*$/;
                if(r.test(this.czrows) == false){
                    this.$Message.error('显示行数不能为小数！请输入整数！');
                    this.showrowTip = '显示行数不能为小数！请输入整数！';
                    this.addClass(document.getElementById('wdCalRows'),'redborder');
                    return;
                }
                this.removeClass(document.getElementById('wdCalRows'),'redborder');
                this.showrowTip = '';
            },
            tableChange:function (page){
                this.returnN=page;
                this.dealTableData =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
            },
            tableChangeSize:function (pageSize){
                this.pageSize=pageSize;
                this.returnN=1;
                this.dealTableData =this.dataArrayAll.slice(0,this.pageSize);
            },
            //设置fetch请求超时方法
             _fetch:function(fetch_promise, timeout) {
                var abort_fn = null;
                var abortInfo=this;
                //这是一个可以被reject的promise
                var abort_promise = new Promise(function(resolve, reject) {
                        abort_fn = function() {
                            console.log('查询超时abort promise');
                             abortInfo.addClass(loadBox,"hide");
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
                //证券代码已上传条数
                codeListChange:function(e){
                    const val = e.target.value;
                const descStr = val.replace(/[\r\n]/g, ',');
                let arr = descStr.split(',');

                    this.codeList = arr.length;
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
                            lastTradeDate = lastTradeDate.slice(0,4)+"-"+lastTradeDate.slice(4,6)+"-"+lastTradeDate.slice(6,8);
                            lastTradeDate = new Date(lastTradeDate);*/
                            const responseData = JSON.parse(obj.responseText);
                            //上一个交易日
                            lastTradeDate = responseData.resData.tradeDate;
                            lastTradeDate = new Date(lastTradeDate);

                        }
                    };
                    obj.send(null);
                    return lastTradeDate;
                },
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
                wdChange:function(){
                    //判断是否禁用成交数量占比
                    let wdCheck=this.formValidate2.wdCheck;
                    var checkparent1=document.getElementById("dlbuyVolumeRatio"),
                        checkparent2=document.getElementById("dlsellVolumeRatio"),
                        check1=document.getElementById("dlbuyVolumeRatio").getElementsByTagName("input")[0],
                        check2=document.getElementById("dlsellVolumeRatio").getElementsByTagName("input")[0];
                    if(!(wdCheck.indexOf("交易日期")>=0&&(wdCheck.indexOf("证券代码")>=0||wdCheck.indexOf("证券简称")>=0))){
                        check1.setAttribute("disabled",true);
                        check2.setAttribute("disabled",true);
                        this.addClass(checkparent1,"ivu-checkbox-wrapper-disabled");
                        this.addClass(checkparent2,"ivu-checkbox-wrapper-disabled");
                    }else{
                        check1.removeAttribute("disabled");
                        check2.removeAttribute("disabled");
                        this.removeClass(checkparent1,"ivu-checkbox-wrapper-disabled");
                        this.removeClass(checkparent2,"ivu-checkbox-wrapper-disabled");
                    }
                },
                handleSubmit2 (name) {
                    this.$refs[name].validate((valid) => {
                           if(this.isHide==false){
                    return;
                }
                const { startdate, enddate, desc, cxtype, seriesList, zqdmRows } = this.formValidate;
                    var cxtypeVaule = cxtype,
                        descValue = desc,
                        zqdmRowsValue = zqdmRows,
                        seriesListArry = seriesList;
                //验证显示行数是否为整数
                    if(this.czrows){
                        var r = /^[1-9]\d*$/;
                        if(r.test(this.czrows) == false){
                            this.$Message.error('显示行数不能为小数！请输入整数！');
                            this.showrowTip = '显示行数不能为小数！请输入整数！';
                            this.addClass(document.getElementById('wdCalRows'),'redborder');
                            return;
                        }
                        this.removeClass(document.getElementById('wdCalRows'),'redborder');
                        this.showrowTip = '';
                    }
                    if (valid) {
                        this.$Message.success('提交成功!请等待~');
                        var wdCheck = [];
                        this.formValidate2.wdCheck.forEach(function(item){
                            for(var key in dataThead){
                               if(item == key){
                                  wdCheck.push(dataThead[key])
                               }
                            }
                        })
                        this.requestParam = {
                           "dimStr":(wdCheck).toString(),
                           "startDate":this.startdateFormat,
                           "endDate":this.enddateFormat,
                           "accountId":this.descArray2,
                          "limit":this.czrows.toString(),
                           "userId":srcUseridA,
                           "dwSessonid":dwSessionidA,
                           "userName":srcUsernameA
                        }
                        if(zqdmRowsValue){
                            const zqdmRowsStr = zqdmRowsValue.replace(/[\r\n]/g,',');
                            let zqdmRowsArry = zqdmRowsStr.split(',');
                             this.requestParam.secCode=zqdmRowsArry;
                           }else if(seriesListArry != null && seriesListArry != ''){
                            this.requestParam.secType=seriesListArry;
                           }else{
                             this.requestParam.secCode=["ALL"];
                        }

                        this.dimensionCal(this.requestParam);
                    } else {
                        this.$Message.error('至少选择一个维度!');
                    }
                })
            },
            exportData (type) {
                if (type === 1) {
               var rowSize = this.formValidate.showrow;
                    document.getElementById("exportCurrent").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
                    this.$refs.table.exportCsv({
                    data: this.dataArrayAll ,
                    columns:this.dealTable,
                        filename: '账户证券交易情况当前表格数据'
                    });
                } else if (type === 2) {
                    document.getElementById("exportListCsv").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportListCsv').removeAttribute('disabled')",5000);
                      void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCT&fileType=csv'+downfileParams+this.exportSearchParams));
                } else if (type === 3) {
                    document.getElementById("exportListExcel").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportListExcel').removeAttribute('disabled')",5000);
                    void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCT&fileType=xlsx'+downfileParams+this.exportSearchParams));
                } else if (type === 4) {
                    document.getElementById("exportListDbf").setAttribute("disabled",true);
                    setTimeout("document.getElementById('exportListDbf').removeAttribute('disabled')",5000);
                    void(window.open('/dwapp/download/dwapp_downfile?reportType=ACCT&fileType=dbf'+downfileParams+this.exportSearchParams));
                }
            },
            dimensionCal:function(requestParam){
                var _this = this;
                //提示维度运算中
                this.$Message.info("维度运算中");
                this.isHide = false;

                //度量排序
                var duArray=this.checkAllGroup;
                var duNumArray=[];
                var duArrayNew=[];
                  for(var i=0;i<duArray.length;i++){
                    duNumArray.push(dataTheadS[duArray[i]]);
                }
                console.log(duNumArray);
                duNumArray=duNumArray.sort(function(a,b){return a-b});
                console.log(duNumArray);

                for(var i=0;i<duNumArray.length;i++){
                    for(var x in dataTheadS){
                        if(dataTheadS[x]==duNumArray[i]){
                            duArrayNew.push(x);
                            continue;
                        }
                    }
                }

                var wdcalArray=this.formValidate2.wdCheck.concat(duArrayNew);

                //判断是否显示成交价格
               if(wdcalArray.indexOf("买成交数量（合计）")>=0&&wdcalArray.indexOf("买成交金额（合计）")>=0){
                    var index=wdcalArray.indexOf("买成交金额（合计）");
                    wdcalArray.splice(index+1, 0, "买成交价格（合计）");
                }
                if(wdcalArray.indexOf("卖成交数量（合计）")>=0&&wdcalArray.indexOf("卖成交金额（合计）")>=0){
                    var index=wdcalArray.indexOf("卖成交金额（合计）");
                    wdcalArray.splice(index+1, 0, "卖成交价格（合计）");
                }

                 if(wdcalArray.indexOf("买成交数量（大宗）")>=0&&wdcalArray.indexOf("买成交金额（大宗）")>=0){
                    var index=wdcalArray.indexOf("买成交金额（大宗）");
                    wdcalArray.splice(index+1, 0, "买成交价格（大宗）");
                }
                if(wdcalArray.indexOf("卖成交数量（大宗）")>=0&&wdcalArray.indexOf("卖成交金额（大宗）")>=0){
                    var index=wdcalArray.indexOf("卖成交金额（大宗）");
                    wdcalArray.splice(index+1, 0, "卖成交价格（大宗）");
                }


                 //判断是否禁用成交数量占比

                if(!(wdcalArray.indexOf("交易日期")>=0&&(wdcalArray.indexOf("证券代码")>=0||wdcalArray.indexOf("证券简称")>=0))){
                  var index1=wdcalArray.indexOf("买成交数量占比");
                  if(index1>0){
                  wdcalArray.splice(index1, 1);
                  }
                    var index2=wdcalArray.indexOf("卖成交数量占比");
                    if(index2>0){
                    wdcalArray.splice(index2, 1);
                    }

                }
                this.dealTable=[];
                this.dealitems=0;
                this.returnTotal=0;
                this.removeClass(loadBox,"hide");

                for(var i=0;i<wdcalArray.length;i++){
                    var title = {};
                    title.title = wdcalArray[i];
                    title.key = dataThead[wdcalArray[i]];
                    title.width = 150;
                    title.align=dataTheadR[wdcalArray[i]];
                    this.dealTable.push(title);
                }

               this.returnN=1;

               this.dealTableData=[];
               this.dataArrayAll=[];
                //发送AJAX数据
                const url = '/dwapp/mktdt/acct_trd_dim_details';
                this._fetch(fetch(url, {
                    method: "POST",
                    body: JSON.stringify(requestParam),
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "signature": signatureA,
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
                    var _this = this;
                    this.isHide=true;
                             var exportButton1 = document.getElementById("exportCurrent"),
                                 exportButton2 = document.getElementById("exportListCsv"),
                                 exportButton3 = document.getElementById("exportListExcel"),
                                 exportButton4 = document.getElementById("exportListDbf");

                            //取数据
                            var dataResponse=data.resData;
                            var dataError=data.message;
                            var datalength = data.respSize;

                            if(dataResponse == null){
                                //展开查询框
                                this.addClass(document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-item")[0],"ivu-collapse-item-active");
                                this.searchPanel = '1';

                                this.addClass(loadBox,"hide");
                                this.$Message.warning("查询出错"+dataError);
                                this.dealTableData = [];
                                this.dealitems = 0;
                                this.showdealitems = 0;

                                exportButton1.setAttribute("disabled",true);
                                exportButton2.setAttribute("disabled",true);
                                exportButton3.setAttribute("disabled",true);
                                exportButton4.setAttribute("disabled",true);

                            }else{
                                if(dataResponse.length == 0){
                                    this.addClass(loadBox,"hide");
                                    this.$Message.warning('查询无数据！');

                                    this.dealTableData = [];
                                    this.dealitems = 0;
                                    this.showdealitems = 0;

                                    exportButton1.setAttribute("disabled",true);
                                    exportButton2.setAttribute("disabled",true);
                                    exportButton3.setAttribute("disabled",true);
                                    exportButton4.setAttribute("disabled",true);
                                }else{
                                    var dataArray=[];
                                    this.dealitems = datalength;
                                    this.wdMax = this.formValidate.showrow;


                                    this.dataArrayAll=[];
                                    this.dataArrayAll=dataResponse;
                                    this.returnTotal=this.dataArrayAll.length;
                                    if(dataResponse.length>this.czrows){
                                        this.returnTotal=this.czrows;
                                    }

                                    //保存所有数据
                                    this.returnN=1;

                                    var tmpLimit=this.pageSize;
                                    if(tmpLimit>this.returnTotal){
                                    //如果加载数据少，全部返回
                                        tmpLimit=this.returnTotal;
                                    }
                                    this.dealTableData =this.dataArrayAll.slice(0,tmpLimit);
                                    //  wdTableData=dataResponse.slice(0,this.czrows);
                                    this.showdealitems = this.dealTableData.length;

                                    exportButton1.removeAttribute("disabled");
                                    exportButton2.removeAttribute("disabled");
                                    exportButton3.removeAttribute("disabled");
                                    exportButton4.removeAttribute("disabled");

                                    //隐藏加载中
                                    this.addClass(loadBox,"hide");
                                }
                            }
                })
            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['买成交数量（合计）', '买成交数量占比', '买成交金额（合计）','卖成交数量（合计）','卖成交数量占比','卖成交金额（合计）','买成交数量（大宗）','买成交金额（大宗）','卖成交数量（大宗）','卖成交金额（大宗）'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 10) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            checkAllGroupChangeBond2 (data) {
                if (data.length === 3) {
                    //this.indeterminate = false;
                    //this.checkAll = true;
                    this.bondTypeTip = '';
                } else if (data.length > 0) {
                    //this.indeterminate = true;
                    //this.checkAll = false;
                    this.bondTypeTip = '';
                } else {
                    //this.indeterminate = false;
                    //this.checkAll = false;
                    this.bondTypeTip = '证券大类不能为空，请选择';
                }
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                       if(this.isHide==false){
                             return;
                       }
                    const { startdate, enddate, desc, cxtype, seriesList, zqdmRows } = this.formValidate;
                    var cxtypeVaule = cxtype,
                        descValue = desc,
                        zqdmRowsValue = zqdmRows,
                        seriesListArry = seriesList;


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
                    //开始日期不能大于结束日期（手动输入+选择日期）
                    var  startdateValue = this.formValidate.startdate,
                         enddateValue = this.formValidate.enddate;
                    if (startdateValue.format('yyyyMMdd') > enddateValue.format('yyyyMMdd')) {
                        document.getElementById('startDateForm').className += ' ivu-form-item-error';
                        document.getElementById('endDateForm').className += ' ivu-form-item-error';
                        this.$Message.error('开始日期不能大于结束日期!');
                        return;
                    };
                    this.removeClass(document.getElementById('startDateForm'),'ivu-form-item-error');
                    this.removeClass(document.getElementById('endDateForm'),'ivu-form-item-error');

                    if(this.formValidate.desc == ''){
                       this.$Message.error('股东账户不能为空!！');
                       return;
                    }

                    //股东账户  长度10 一个大写字母  9个数字
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
                        descValue = descArry;
                        this.descParam = descArry.join("");
                    }

                    if(cxtypeVaule == '按证券代码'){
                        var textareaBond1 = document.getElementById('codeInput'),
                            textareaBond1Body = textareaBond1.getElementsByTagName('textarea')[0];
                        this.formValidate.seriesList = [];
                        if (textareaBond1Body.value == '') {
                           this.addClass(textareaBond1, 'ivu-form-item-error');
                           this.$Message.error('证券代码输入不能为空!！');
                           return;
                        };

                        if(this.formValidate.zqdmRows == ''){
                           this.$Message.error('证券代码输入不能为空!！');
                           return;
                        }
                        //证券代码由 6个数字组成
                        if(this.formValidate.zqdmRows){
                            //证券代码为 ALL
                            if(this.formValidate.zqdmRows == "ALL" || this.formValidate.zqdmRows == "all" || this.formValidate.zqdmRows == "All"){
                                zqdmRowsValue = ["ALL"];
                            }else{
                                const zqdmRowsStr = zqdmRowsValue.replace(/[\r\n]/g,',');
                                let zqdmRowsArry = zqdmRowsStr.split(',');
                                //判断上传证券代码不能超过1000
                                if(zqdmRowsArry.length>1000){
                                    this.$Message.error('证券代码不能超过1000个!');
                                    return;
                                }
                                for(var i=0; i < zqdmRowsArry.length; i++){
                                    const zqdmRowsVal = zqdmRowsArry[i].trim();
                                    const zqdmRowsReg = /\d{6}/g;
                                    if(zqdmRowsVal.length != 0){
                                    if(!zqdmRowsReg.test(zqdmRowsVal) || zqdmRowsVal.length != 6){
                                        this.$Message.error('证券代码由6个数字组成！！');
                                        this.addClass(textareaBond1,'ivu-form-item-error');
                                return;
                            }
                            }
                          }
                                this.removeClass(textareaBond1,'ivu-form-item-error');
                                zqdmRowsValue = zqdmRowsArry;
                            }
                        }
                        this.removeClass(textareaBond1, 'ivu-form-item-error');
                    }else if(cxtypeVaule == '按证券大类'){
                        if(this.formValidate.seriesList.length == 0){
                            this.bondTypeTip = '证券大类不能为空，请选择';
                            return;
                        }
                    } else if(cxtypeVaule == '按所有证券'){
                        this.formValidate.seriesList = [];
                    }
                    //验证显示行数是否为整数
                    if(this.formValidate.showrow){
                        var r = /^[1-9]\d*$/;
                        if(r.test(this.formValidate.showrow) == false){
                            this.$Message.error('显示行数不能为小数！请输入整数！');
                            this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                            return;
                        }
                        this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
                    }
                    //验证
                    if (valid) {
                        const  bsf = {'债券': 'BON','基金': 'FUN','股票': 'EQU'};
                        let bsfWord = '';
                        let arry = [];
                        if(cxtypeVaule == '按证券代码'){
                            this.formValidate.seriesList = [];
                        } else if(cxtypeVaule == '按证券大类'){
                            if(seriesList.length){
                                for (var i = 0; i < seriesList.length; i++) {
                                   arry.push(bsf[seriesList[i]])
                                }
                                bsfWord = arry;
                            }
                        } else if(cxtypeVaule == '按所有证券'){
                            this.formValidate.seriesList = [];
                        }
                        //日期格式
                        this.startdateFormat = startdateValue.format('yyyyMMdd');
                        this.enddateFormat = enddateValue.format('yyyyMMdd');
                        //证券大类提示
                        this.bondTypeTip = '';
                        //提交提示
                        this.$Message.success('提交成功!请等待~');
                        this.addClass(document.getElementById("sorryBox"),"hide");
                        this.addClass(document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-item-active")[0],"ivu-collapse-item");
                        document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-content")[0].style.display="none";
                        this.removeClass(document.getElementById("resultBox"),"hide");

                        //维度运算数据恢复初始值
                        this.formValidate2.wdCheck=['股东账户','股东名称','交易日期','会员营业部','证券代码','证券简称'];
                        this.checkAllGroup=['买成交数量（合计）', '买成交数量占比','买成交金额（合计）','卖成交数量（合计）','卖成交数量占比','卖成交金额（合计）'];
                        this.czrows=2000;
                        this.wdChange();
                        this.dealTable=[
                        {
                            "title": "股东账户",
                            "key": "acctId",
                            "fixed": "left",
                            "width": 200
                        },
                        {
                            "title": "股东名称",
                            "key": "acctName",
                            "width": 150,
                        },
                        {
                            "title": "交易日期",
                            "key": "tradeDate",
                            "width": 150,
                        },
                        {
                            "title": "会员营业部",
                            "key": "memBranchName",
                            "width": 150,
                        },
                        {
                            "title": "证券代码",
                            "key": "secCode",
                            "width": 150,
                        },
                        {
                            "title": "证券简称",
                            "key": "secName",
                            "width": 150,
                        },
                        {
                            "title": "买成交数量（合计）",
                            "key": "buyVol",
                            "width": 150,
                            align: 'right',

                        },
                        {
                            "title": "买成交数量占比",
                            "key": "buyRatio",
                            "width": 150,
                            align: 'right',
                        },
                        {
                            "title": "买成交金额（合计）",
                            "key": "buyAmt",
                            "width": 150,
                            align: 'right',

                        },
                        {
                            "title": "买成交价格（合计）",
                            "key": "buyPrice",
                            "width": 150,
                            align: 'right',

                        },
                        {
                            "title": "卖成交数量（合计）",
                            "key": "sellVol",
                            "width": 150,
                            align: 'right',

                        },
                         {
                            "title": "卖成交数量占比",
                            "key": "sellRatio",
                            "width": 150,
                            align: 'right',
                        },


                        {
                            "title": "卖成交金额（合计）",
                            "key": "sellAmt",
                            "width": 150,
                            align: 'right',

                        } ,
                        {
                            "title": "卖成交价格（合计）",
                            "key": "sellPrice",
                            "width": 150,
                            align: 'right',

                        }
                    ]

                        this.removeClass(document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-item")[0],"ivu-collapse-item-active");
                        this.searchPanel = '';

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

                         //股东账户去重
                        let descArray2 = [];
                        descArry5.forEach(function(item,index){
                            if(descArray2.indexOf(item) ==-1){
                               descArray2.push(item)
                            }
                        })
                        this.descArray2 = descArray2;


                         //seccode去空格，去空行
                         if(zqdmRowsValue){
                        var descArry6 = [];
                         for(var i = 0; i < zqdmRowsValue.length; i++){
                             descArry6.push(zqdmRowsValue[i].replace(/(^\s*)|(\s*$)/g, ""));
                         }
                         console.log("seccode1:"+descArry6);
                        for(var i = 0; i < descArry6.length; i++){
                             if(descArry6[i] == '' || typeof descArry6[i] == 'undefined'){
                                descArry6.splice(i, 1);
                                i = i-1;
                             }
                         }
                         console.log("seccode2:"+descArry6);

                         //seccode去重
                        let descArray7 = [];
                        descArry6.forEach(function(item,index){
                            if(descArray7.indexOf(item) ==-1){
                               descArray7.push(item)
                            }
                        })
                       zqdmRowsValue=descArray7;
                       console.log("seccode3:"+zqdmRowsValue);
                        }


                        searchParams={
                            "startDate":this.startdateFormat,"endDate":this.enddateFormat,"accountId":descArray2,
                           "limit":this.czrows.toString(),
                            "userId":srcUseridA,
                            "dwSessonid":dwSessionidA,
                            "userName":srcUsernameA
                        }
                        //下载参数 统计对象
                        var tjParam1 = '',tjParam2 = '',tjParam3 = '';
                        //instrument_id   //证券代码 //证券大类 //按所有证券
                        if(zqdmRowsValue){
                            searchParams.secCode=zqdmRowsValue;
                            tjParam1 = zqdmRowsValue.join(",");
                        }else if(bsfWord){
                            searchParams.secType=bsfWord;
                            tjParam2 = bsfWord.join(",");
                        }else{
                            searchParams.allType="ALL";
                            tjParam3 = "ALL";
                        }

                        this.exportSearchParams = "&startDate="+this.startdateFormat+"&endDate="+this.enddateFormat+
                        "&secType="+tjParam2+"&allType="+tjParam3;
                        console.log(this.exportSearchParams,"-----testParams111111111");

                        //声明加载中
                        var loadBox = document.getElementById("loadBox");
                        this.removeClass(loadBox,"hide");
                        //接口请求处理  dealTableData
                        const url = '/dwapp/mktdt/acct_trd_details';

                        this.dealTableData=[];
                        this.dealitems=0;

                        var _this=this;
                        this.returnN=1;
                        this.returnTotal=0;
                        this.dataArrayAll=[];
                            this.isHide=false;


                        this._fetch(fetch(url, {
                            method: "POST",
                            body: JSON.stringify(searchParams),
                            mode: 'cors',
                            headers: {
                                "Content-Type": "application/json",
                                "signature": signatureA,
                                "Authorization":AuthorizationA
                            }
                        }), 600000).then(function (response) {
                            return response.json()
                        }, function (error) {
                        _this.addClass(loadBox,"hide");
                            _this.$Message.error('系统繁忙，刷新页面!');
                            this.isHide=true;

                        }).then(data => {
                            if(this.t != ''){
                                clearTimeout(this.t);
                            }
                            this.isHide=true;

                            var exportButton1 = document.getElementById("exportCurrent"),
                                exportButton2 = document.getElementById("exportListCsv"),
                                exportButton3 = document.getElementById("exportListExcel"),
                                exportButton4 = document.getElementById("exportListDbf");

                            //取数据
                            var dataResponse=data.resData;
                            var dataError=data.message;
                            var datalength = data.respSize;

                            if(dataResponse == null){
                                //展开查询框
                                this.addClass(document.getElementById("dealPanel").getElementsByClassName("ivu-collapse-item")[0],"ivu-collapse-item-active");
                                this.searchPanel = '1';

                                this.addClass(loadBox,"hide");
                                this.$Message.warning("查询出错"+dataError);
                                this.dealTableData = [];
                                this.dealitems = 0;
                                this.showdealitems = 0;

                                exportButton1.setAttribute("disabled",true);
                                exportButton2.setAttribute("disabled",true);
                                exportButton3.setAttribute("disabled",true);
                                exportButton4.setAttribute("disabled",true);

                            }else{
                                if(dataResponse.length == 0){
                                    this.addClass(loadBox,"hide");
                                    this.$Message.warning('查询无数据！');

                                    this.dealTableData = [];
                                    this.dealitems = 0;
                                    this.showdealitems = 0;

                                    exportButton1.setAttribute("disabled",true);
                                    exportButton2.setAttribute("disabled",true);
                                    exportButton3.setAttribute("disabled",true);
                                    exportButton4.setAttribute("disabled",true);
                                }else{
                                    var dataArray=[];
                                    this.dealitems = datalength;
                                    this.wdMax = this.formValidate.showrow;


                          this.dataArrayAll=[];
                            this.dataArrayAll=dataResponse;
                             this.returnTotal=this.dataArrayAll.length;
                            if(dataResponse.length>this.czrows){
                                 this.returnTotal=this.czrows;
                            }

                            //保存所有数据
                            this.returnN=1;

                            var tmpLimit=this.pageSize;
                            if(tmpLimit>this.dataArrayAll.length){
                            //如果加载数据少，全部返回
                                tmpLimit=this.dataArrayAll.length;
                            }
                              this.dealTableData =this.dataArrayAll.slice(0,tmpLimit);
                              //  wdTableData=dataResponse.slice(0,this.czrows);
                                this.showdealitems = this.dealTableData.length;

                                    exportButton1.removeAttribute("disabled");
                                    exportButton2.removeAttribute("disabled");
                                    exportButton3.removeAttribute("disabled");
                                    exportButton4.removeAttribute("disabled");

                                    //隐藏加载中
                                    this.addClass(loadBox,"hide");

                                }

                            }

                        })

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            clearOne:function(){
                this.formValidate.desc="";
                this.accountList=0;
            },
            clearTwo:function(){
                this.formValidate.zqdmRows="";
                this.codeList=0;
            },
            showzq:function(){
                var zqseries = document.getElementById('zqseries'),
                zqcode = document.getElementById('zqcode');
                if(this.formValidate.cxtype=="按证券代码"){
                    this.addClass(zqseries, "hide");
                    this.removeClass(zqcode, "hide");
                    this.bondTypeTip = '';
                }
                if(this.formValidate.cxtype=="按证券大类"){
                    this.removeClass(zqseries, "hide");
                    this.addClass(zqcode, "hide");
                    this.formValidate.zqdmRows="";
                    this.formValidate.seriesList = ['债券','基金','股票'];
                }
                if(this.formValidate.cxtype=="按所有证券"){
                    this.addClass(zqseries, "hide");
                    this.addClass(zqcode, "hide");
                    this.formValidate.zqdmRows="";
                    this.bondTypeTip = '';
                }
            },
            //股东账户导入
            handleSuccessAccount(response, file, fileList){
             if(response.message != null){
                    this.$Message.warning(response.message);
                }
                if(response.resData){
                    const arry = response.resData;
                    let str = '';
                    let  arryAll= [];
                    for(var i = 0; i < arry.length; i++){
                        arryAll.push(arry[i]);
                    }
                    this.accountList = arryAll.length;
                    str = arryAll.join('\n');
                    this.formValidate.desc = str;
                }
            },
            //证券代码导入
            handleSuccessCode(response, file, fileList){
                if(response.message != null){
                    this.$Message.warning(response.message);
                }
                if(response.resData){
                    const arry = response.resData;
                    let str = '';
                    let  arryAll= [];
                    for(var i = 0; i < arry.length; i++){
                        arryAll.push(arry[i]);
                    }
                    this.codeList = arryAll.length
                    str = arryAll.join('\n');
                    this.formValidate.zqdmRows = str;
                }
            },
        }
    }
</script>
