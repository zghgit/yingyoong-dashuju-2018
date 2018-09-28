<template>
  <!--成交明细及对手方信息查询-->
    <div class="searchInfonew" id="fifteenCommon">
      <!--头部logo-->
      <header></header>
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>成交明细及对手方信息查询
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
                <div class="moreBtn">
                  <div  @click="isShowMore = !isShowMore"><span>更多 ∨</span></div>
                </div>
                <div class="submitBtnBox">
                  <Button id="searchBtn" type="primary"
                          @click="handleSubmit('formValidate');">查询</Button>
                </div>
              </div>
                <div class="exportBtnBox"
                     v-if="isShowMore">
                  <el-col>
                    <Form-item
                      prop="enddate"
                      id="endDateForm"
                      label="">
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
                          <Input  id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea" :rows="4" placeholder="请输入股东账户"></Input>
                        </Form-item>
                      </Row>
                    </Form-item>
                  </el-col>
                  <el-col :offset="1">
                    <Form-item
                      prop="enddate"
                      id="endDateForm"
                      label="统计对象">
                    <Radio-group v-model="formValidate.cxtype"
                                 class="zqradio" v-on:on-change="showzq">
                      <row>
                        <Radio id="codeRadio" label="按证券代码"></Radio><label class="redtext fontsize12">（不超过1000个）</label>
                        <div id="zqcode">
                          <Row class="uploadBox">
                            <Upload action="/base-service/api/decode_upfile?uploadType=SECCODE" :headers="upfileParams" accept=".txt" :on-success="handleSuccessCode">
                              <Button id="importcodeBtn" type="ghost">导入</Button>
                            </Upload>
                            <Button id="clearcodeBtn" v-on:click="clearTwo()">清空</Button>
                          </Row>
                          <Row>
                            <p>已上传个数：<font id="infoUploadCode" class="bluetext">{{codeList}}</font></p>
                            <Input id="codeInput" v-model="formValidate.zqdmRows" @on-change="codeListChange" type="textarea" :rows="4" placeholder="请输入证券代码"></Input>

                          </Row>
                          <p class="zqCodeTip">{{zqCodeTip}}</p>
                        </div>
                      </row>
                      <row>
                        <Radio  id="typeRadio" label="按证券大类"></Radio>
                        <div id="zqseries" class="hide">
                          <Checkbox-group v-model="formValidate.seriesList" @on-change="bondTypeCheckChange">
                            <Checkbox id="zqcheckbox" label="债券"></Checkbox><br>
                            <Checkbox id="jjcheckbox" label="基金"></Checkbox><br>
                            <Checkbox id="gpcheckbox" label="股票"></Checkbox><br>
                          </Checkbox-group>
                          <p class="zqCodeTip">{{zqTypeTip}}</p>
                        </div>
                      </row>
                      <row><Radio  id="allRadio" label="按所有证券"></Radio></row>
                    </Radio-group>
                    </Form-item>
                    <Form-item class="showrow" prop="showrow"  id="AccountForm2">
                      在页面上显示前&nbsp;&nbsp;<Input-number id="showrowInput" :max="2000" :min="1" v-model="formValidate.showrow" size="small" style="width: 70px;" @on-change="validNum"></Input-number>&nbsp;&nbsp;行
                      <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                      <p><label class="redtext fontsize12">(最多显示2000行)</label></p>
                    </Form-item>
                  </el-col>


                </div>

            </Form>
          </div>
        </Panel>
      </Collapse>
      <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
        <Icon type="load-c" size=40 class="loadIcon"></Icon>
        <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
      </Spin>
      <Modal id="lookInfoPop" title="成交明细及对手方信息查询  统计口径说明" v-model="changeInfo"
             class-name="vertical-center-modal"
             cancel-text>
        <h3>数据说明</h3>
        <p>本数据为综合业务平台成交明细记录，包含对手方信息。</p>
        <h3>指标说明</h3>
        <p>1. 本应用支持查询自2006-01-01至今的竞价系统成交明细数据。</p>
        <p>2. 按照“交易日期”、“成交时间”、“成交编号”相同的规则，将竞价系统中同一笔成交的买、卖成交记录合并为一条.</p>
        <p>3. 债券的成交数量为“手”，B股的成交价格和成交金额为“美元”。</p>
        <p>4. 在统计时，“买方（或卖方）会员营业部名称”字段的值基于成交明细数据中的Stat_Seat_Code来确定。如果某一个股东账户在同一交易日内的成交明细数据中出现了不同的Stat_Seat_Code（这种情况比较少见，但存在），那么以该股东账户当天第一笔交易类申报记录对应的Stat_Seat_Code来作为其当天所有交易的Stat_Seat_Code。即对某一个股东账户而言，在同一交易日内所有交易数据的“买入（或卖出）营业部名称”都相同。</p>
        <p>5. Stat_Seat_Code（统计席位代码/统计PBU代码）是数据仓库为了更准确、更方便地识别某条申报/成交记录来自于哪个营业部而设计的一个代码。其算法是根据该条申报/成交记录中券商填报的Branch_ID（2010-01-22以后）/内部订单编号的前两位（2010-01-21以前）对应的营业部，判断其是否属于这个券商。若是，则按其填报的营业部统计。若否，则按其下单的席位/PBU对应的主营业部统计。</p>
        <p>6. 根据“Stat_Seat_Code”获取得到的会员营业部信息包含基金及非会员（基金、非会员都不还原为出租PBU的会员）。这与市场监察部当前使用的“席位与会员营业部对应关系数据”的口径一致。</p>
        <p>7. 买方（或卖方）股东名称，取查询日期区间内最新的名称。</p>
        <p>8. 证券简称，取交易日期当天收盘行情文件show2003里该证券的证券简称。</p>
        <p>9. 用户参数界面中证券大类的识别规则如下：</p>
        <p>股票：证券代码为6*****或者900***或者3*****</p>
        <p>债券：证券代码为0*****或者1*****</p>
        <p>基金：证券代码为50****或者51****。</p>
        <p>（注：上述代码区间均不含目前分配给指数类品种的证券代码）</p>
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



        <div style="padding-top:10px; float: right">
          <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>
        <div style="text-align:left;padding-top: 15px;">
          <Button id="exportCurrent" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为CSV文件</Button>
          <Button id="exportAll" type="primary" size="large" @click="exportData(2)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
          <Button id="exportDbf" type="primary" size="large" @click="exportData(3)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件</Button>
        </div>
      </div>
    </div>
</template>

<script>
  import {tableColumns1} from '../assets/js/searchInfo.js';
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
  //日期初始值
  let lastTradeDate="";
  //查询参数初始化
  let testParams={};
  var upfileParamsValue={
    signature: signatureA,
    Authorization: AuthorizationA
  };
  let orderParams={};
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
    export default {
        name: "searchInfonew",
        props: [],
        components: {},
        data() {
            return {
              collapse: '1',
              //  显示更多
              isShowMore:false,
              //输入行数为小数时提示文字
              showrowTip:'',
              isHide:true,
              returnN:1,
              returnTotal:0,
              dataArrayAll:[],
              pageSize:500,
              //显示隐藏输入条件
              changeArrow:'rightArrow',
              gutterValue:16,
              leftPane:19,
              rightPane:5,
              changeInfo:false,
              //下载的查询参数
              exportSearchParams:'',
              //日期参数
              startdateFormat:'',
              enddateFormat:'',
              descParam:[],
              //文件解析参数
              upfileParams:upfileParamsValue,
              dealitems:0,
              //上传股东账户条数
              accountList: 0,
              //证券代码已上传条数
              codeList: 0,
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
              zqTypeTip:"",
              zqCodeTip:"",
              formValidate: {
                showrow:2000,
                startdate:new Date(this.initialDate()),
                enddate: new Date(this.initialDate()),
                desc: '',
                seriesList: ['债券','基金','股票'],
                cxtype: '按证券代码',
                zqdmRows:"",
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
              dmNumber:0,
              items:0,
              showLength:1000,
              uploadgdzh: '',
              self: this,
              tableData1: [],
              tableColumns1: tableColumns1,
              t: ''
            }
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
          console.log(this.pageSize);
          this.tableData1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
        },
        tableChangeSize:function (pageSize){
          this.pageSize=pageSize;
          this.returnN=1;
          this.tableData1 =this.dataArrayAll.slice(0,this.pageSize);
        },
        //显示隐藏左右
        hideRightBox:function(){
          (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
          (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
          (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16;
          (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';
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
        //证券代码已上传条数
        codeListChange:function(e){
          const val = e.target.value;
          const descStr = val.replace(/[\r\n]/g, ',');
          let arr = descStr.split(',');
          this.codeList = arr.length;
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
        //请求初始日期
        initialDate:function(){
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
        bondTypeCheckChange:function(data){//按证券大类单选中的多选选项变化
          if (data.length === 3) {
            this.zqTypeTip = '';
          } else if (data.length > 0) {
            this.zqTypeTip = '';
          } else {
            this.zqTypeTip = '请选择证券大类';
          }
        },
        infoTableSort:function(sort){//传排序参数
          orderParams.field=sort.key;
          orderParams.sort=sort.order;
        },
        searchData:function(requestParam){//查询表单数据
          this.isHide=false;
          this.dataArrayAll=[];
          this.tableData1 = [];
          this.dealitems = 0;
          document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dealitems+" 条记录";
          this.returnN=1;
          this.returnTotal=0;
          this.tableData1=[];
          orderParams={};
          var loadBox = document.getElementById("loadBox");
          this.removeClass(loadBox,"hide");
          const url = '/dwapp/mktdt/both_side_trd_details';
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
            // this.$Message.error('系统繁忙，刷新页面!');
            _this.addClass(loadBox,"hide");
            this.isHide=true;
          }).then(data => {
            if(this.t != ''){
              clearTimeout(this.t);
            }

            this.isHide=true;
            var exportButton1 = document.getElementById("exportCurrent"),
              exportButton2 = document.getElementById("exportAll"),
              exportButton3 = document.getElementById("exportDbf");

            //取数据
            var dataResponse=data.resData;
            var dataError=data.message;
            var datalength = data.respSize;

            if(dataResponse == null){
              this.addClass(loadBox,"hide");
              this.$Message.warning("查询出错!"+dataError);
              this.tableData1 = [];
              this.dealitems = 0;

              exportButton1.setAttribute("disabled",true);
              exportButton2.setAttribute("disabled",true);
              exportButton3.setAttribute("disabled",true);

            }else{
              if(dataResponse.length == 0){
                this.addClass(loadBox,"hide");
                this.$Message.warning('查询无数据！');
                this.tableData1 = [];
                this.dealitems = 0;

                exportButton1.setAttribute("disabled",true);
                exportButton2.setAttribute("disabled",true);
                exportButton3.setAttribute("disabled",true);
              }else{
                //  var dataArray=[];
                this.dealitems = datalength;


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
                exportButton2.removeAttribute("disabled");
                exportButton3.removeAttribute("disabled");

                this.addClass(loadBox,"hide");

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
            const { startdate, enddate, desc, cxtype, seriesList, zqdmRows } = this.formValidate;

            var cxtypeVaule = cxtype,
              descValue = desc,
              zqdmRowsValue = zqdmRows,
              seriesListArry = seriesList;

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

            //日期
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

            if(this.formValidate.desc == ''){
              this.$Message.error('股东账户不能为空!！');
              return;
            }

            //股东账户  10 一个大写字母  9个数字
            if(this.formValidate.desc){
              const descStr = descValue.replace(/[\r\n]/g,',');
              console.log(this.formValidate.desc,"--------------全部股东账户");
              console.log(descStr,"--------------descStr");

              let descArry = descStr.split(',');
              console.log(descArry,"--------------descArry");
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
              this.descParam = descArry.join("");
              console.log(this.descParam,"-------------------导出股东账户参数");
            }

            if(cxtypeVaule == '按证券代码'){
              var textareaBond1 = document.getElementById('codeInput'),
                textareaBond1Body = textareaBond1.getElementsByTagName('textarea')[0];
              this.formValidate.seriesList = [];
              if (textareaBond1Body.value == '') {
                this.addClass(textareaBond1, 'ivu-form-item-error');
                this.$Message.error('证券代码不能为空!！');
                this.zqCodeTip="请输入证券代码";
                return;
              };

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
              this.zqCodeTip="";

            }else if(cxtypeVaule == '按证券大类'){
              if(this.formValidate.seriesList.length == 0){
                this.zqTypeTip = '证券大类不能为空，请选择';
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

            if (valid) {
              this.zqTypeTip = '';
              this.$Message.success('提交成功!请等待~');

              //获取请求参数
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
              this.startdateFormat = startdateValue.format('yyyy-MM-dd');
              this.enddateFormat = enddateValue.format('yyyy-MM-dd');

              this.startdateFormat=this.startdateFormat.split("-").join("");
              this.enddateFormat=this.enddateFormat.split("-").join("");

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

              testParams={
                "startDate":this.startdateFormat,"endDate":this.enddateFormat,"accountId":descArray2,
                "limit":this.formValidate.showrow.toString(),
                "dwSessonid":dwSessionidA,
                "userId":srcUseridA, "userName":srcUsernameA
              }
              //下载参数 统计对象
              var tjParam1 = '',tjParam2 = '',tjParam3 = '';
              if(zqdmRowsValue){
                testParams.secCode=zqdmRowsValue;
                tjParam1 = zqdmRowsValue.join(",");
              }else if(bsfWord){
                testParams.secType=bsfWord;
                tjParam2 = bsfWord.join(",");
              }else{
                testParams.allType="ALL";
                tjParam3 = "ALL";
              }
              this.searchData(testParams);
              this.exportSearchParams = "&startDate="+this.startdateFormat+"&endDate="+this.enddateFormat+
                "&accountId="+descValue+"&secCode="+tjParam1+"&secType="+tjParam2+"&allType="+tjParam3;
              console.log(this.exportSearchParams,"-----testParams111111111");

            } else {
              this.$Message.error('提交失败,请检查查询条件是否有错!');
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
            this.zqTypeTip = '';
            this.codeList=0;
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
            this.zqTypeTip = '';
          }
        },
        checkUndefine:function(value){
          if(typeof(value)=="undefined"){
            return "";
          }else{
            return value;
          }
        },
        exportData (type) {

          //导出参数
          var downfileParams="&signature="+signatureA+
            "&userId="+srcUseridA+"&userName="+srcUsernameA+
            "&sortby="+this.checkUndefine(orderParams.field)+"&sort="+this.checkUndefine(orderParams.sort)+"&Authorization="+AuthorizationA;
          if (type === 1) {
            document.getElementById("exportCurrent").setAttribute("disabled",true);
            setTimeout("document.getElementById('exportCurrent').removeAttribute('disabled')",5000);
            // window.location.href='/dwapp/download/dwapp_downfile?reportType=TRADEBUYANDSALE&fileType=csv'+downfileParams;

            void(window.open('/dwapp/download/dwapp_downfile?reportType=TRADEBUYANDSALE&fileType=csv'+downfileParams));
          } else if (type === 2) {
            document.getElementById("exportAll").setAttribute("disabled",true);
            setTimeout("document.getElementById('exportAll').removeAttribute('disabled')",5000);
            //window.location.href='/dwapp/download/dwapp_downfile?reportType=TRADEBUYANDSALE&fileType=xlsx'+downfileParams;

            void(window.open('/dwapp/download/dwapp_downfile?reportType=TRADEBUYANDSALE&fileType=xlsx'+downfileParams));

          } else if (type === 3) {
            document.getElementById("exportDbf").setAttribute("disabled",true);
            setTimeout("document.getElementById('exportDbf').removeAttribute('disabled')",5000);
            //  window.location.href='/dwapp/download/dwapp_downfile?reportType=TRADEBUYANDSALE&fileType=dbf'+downfileParams;

            void(window.open('/dwapp/download/dwapp_downfile?reportType=TRADEBUYANDSALE&fileType=dbf'+downfileParams));
          }
        },
      },
        watch: {},
        mounted() {

        },

    }
</script>
<style lang="less">
    .searchInfonew {
    .exportBtnBox {
      align-items: flex-start !important;
    }
    }
</style>
