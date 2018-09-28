<template>
  <section class="constWidth" id="fifteenCommon" @click="ready">
    <!--头部logo-->
    <header></header>
    <div id="objectAnalysis">
      <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
        <Panel name="1">
          <p>可疑对象分析
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
                <b>股东账户</b>
                <label class="redtext fontsize12">（不超过2500个）</label>
                <Row class="uploadBox">
                  <Upload action="/base-service/api/decode_upfile?uploadType=ACCID" :headers="upfileParams" accept=".txt" :on-success="handleSuccessAccount">
                    <Button id="importAccountBtn" type="ghost">导入</Button>
                  </Upload>
                  <Button id="clearAccountBtn" v-on:click="clearOne()">清空</Button>
                </Row>
                <Row class="uploadNumber">
                  <p>已上传个数：
                    <font id="infoUploadAccount" class="bluetext">{{accountList}}</font>
                  </p>
                  <Form-item prop="desc" id="AccountForm">
                    <Input id="AccountInput" v-model="formValidate.desc" @on-change="accountListChange" type="textarea" :rows="5" placeholder="请输入股东账户"></Input>
                  </Form-item>
                </Row>
              </div>
              <div class="teamC">
                <Form-item class="showrow" prop="showrow" id="AccountForm2">
                  在页面上显示前&nbsp;&nbsp;
                  <Input-number id="showrowInput" @on-change="validNum" :max="2000" :min="1" v-model="formValidate.showrow"  style="width: 70px;"></Input-number>&nbsp;&nbsp;行
                  <p><label class="redtext fontsize12">{{showrowTip}}</label></p>
                  <p>
                    <label class="redtext fontsize12">(最多显示2000行)</label>
                  </p>
                </Form-item>
                <Form-item>
                  <div class="cxBox">
                    <Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>
                  </div>
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
      <Modal id="lookInfoPop" title="可疑对象分析  统计口径说明" v-model="changeInfo" class-name="vertical-center-modal" cancel-text>
        <p>统计时按仅统计竞价和统计时包含大宗交易数据分别统计：</br>
          1. 持股数量：组内账户所持股数量。</br>
          2. 对倒数量：组内账户相互交易数量。</br>
          3. 对倒金额：组内账户相互交易金额。</br>
          4. 对倒均价：组内账户相互交易时平均金额。</br>
          5. 对倒数量占比：组内账户对倒交易数量占组内账户所有对倒交易数量的比重。</br>
          6. “账户组每日交易持股分析”页面只能查询新交易以后的数据。其他页面可以查询2005年以来的数据。</br>
        </p>
      </Modal>
      <div class="tabTitle">
        <!--切换表格-->
        <Tabs type="card" :animated="false" value='' v-model="tabsValue">
          <Tab-pane label="仅统计竞价交易数据" name='onlyData' >
            <Tabs type="card" :animated="false" class="noscrollTabs">
              <Tab-pane label="账户组每日交易持股分析" style="height:590px;">
                <p id="qiList1" class="redtext listlength"></p>
                <!--              <Table height="590" @on-sort-change="infoTableSort" id="qiTable1" :context="self" :data="qiTableData1" :columns="qiTableColumns1"  ref="tableOneExport" border stripe></Table>
                                  <Page :total="returnTotal" :current="returnN" :page-size="20" show-elevator show-total @on-change="tableChange"></Page> -->
                <fastTable  :width="5690" :bwidth="5662" :columns="qiTableColumns1" :data="qiTableData1"  ></fastTable>

                <div style="padding-top:10px">
                  <Page :total="returnTotal" :current="returnN" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page> </div>

                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent1" type="primary" size="large" @click="exportData(1)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="组内账户阶段交易持股分析" style="height:590px;">
                <p id="qiList2" class="redtext listlength"></p>
                <!--         <Table height="590" @on-sort-change="infoTableSort" id="qiTable2" :context="self" :data="qiTableData2" :columns="qiTableColumns2" size="small" ref="tableTwoExport" border stripe></Table>
                             <Page :total="returnTotal2" :current="returnN2" :page-size="20" show-elevator show-total @on-change="tableChange2"></Page> -->

                <fastTable  :width="2340" :bwidth="2321" :columns="qiTableColumns2" :data="qiTableData2"  ></fastTable>

                <div style="padding-top:10px">
                  <Page :total="returnTotal2" :current="returnN2" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize2" @on-change="tableChange2"></Page> </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent2" type="primary" size="large" @click="exportData(2)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="组内账户每日交易持股分析" style="height:590px;">
                <p id="qiList3" class="redtext listlength"></p>
                <!--        <Table height="590" @on-sort-change="infoTableSort" id="qiTable3" :context="self" :data="qiTableData3" :columns="qiTableColumns3" size="small" ref="tableThreeExport" border stripe></Table>
                            <Page :total="returnTotal3" :current="returnN3" :page-size="20" show-elevator show-total @on-change="tableChange3"></Page> -->

                <fastTable  :width="2280" :bwidth="2261" :columns="qiTableColumns3" :data="qiTableData3"  ></fastTable>

                <div style="padding-top:10px">
                  <Page :total="returnTotal3" :current="returnN3" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize3" @on-change="tableChange3"></Page> </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent3" type="primary" size="large" @click="exportData(3)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                  <Button id="exportCurrent32" type="primary" size="large" @click="exportData(9)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="组内账户每日对倒明细" style="height:590px;">
                <p id="qiList4" class="redtext listlength"></p>
                <!--      <Table height="590" @on-sort-change="infoTableSort" id="qiTable4" :context="self" :data="qiTableData4" :columns="qiTableColumns4" size="small" ref="tableFourExport" border stripe></Table>
                          <Page :total="returnTotal4" :current="returnN4" :page-size="20" show-elevator show-total @on-change="tableChange4"></Page> -->

                <fastTable  :width="1923" :bwidth="1904" :columns="qiTableColumns4" :data="qiTableData4"  ></fastTable>

                <div style="padding-top:10px">
                  <Page :total="returnTotal4" :current="returnN4" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize4" @on-change="tableChange4"></Page> </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent4" type="primary" size="large" @click="exportData(4)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                  <Button id="exportCurrent42" type="primary" size="large" @click="exportData(10)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="图1：股价、持股、买卖占比、对倒占比" style="text-align:center;height:590px;overflow-y: auto;">
                <div>
                  <p>证券代码：
                    <small style="color:blue;">{{titles}} &nbsp;&nbsp;&nbsp;</small>开始日期：
                    <small style="color:blue;">{{formValidate.startdate.format('yyyy-MM-dd')}}&nbsp;&nbsp;&nbsp;</small>结束日期：
                    <small style="color:blue;">{{formValidate.enddate.format('yyyy-MM-dd')}}</small>
                  </p>
                  <div style="display:flex;justify-content:center">
                    <v-linkage :data = "qiTableData11" @changeData="dataHandle"></v-linkage>
                  </div>
                </div>
              </Tab-pane>
              <Tab-pane label="图2：股价、持股" style="text-align:center;height:590px;">
                <p>证券代码：
                  <small style="color:blue;">{{titles}} &nbsp;&nbsp;&nbsp;</small>开始日期：
                  <small style="color:blue;">{{formValidate.startdate.format('yyyy-MM-dd')}}&nbsp;&nbsp;&nbsp;</small>结束日期：
                  <small style="color:blue;">{{formValidate.enddate.format('yyyy-MM-dd')}}</small>
                </p>
                <div style="display:flex;justify-content:center"> <v-linechart :data = "qiTableData11"></v-linechart></div>
              </Tab-pane>
              <Tab-pane label="图3：股价、交易占比" style="text-align:center;height:590px;">
                <p>证券代码：
                  <small style="color:blue;">{{titles}} &nbsp;&nbsp;&nbsp;</small>开始日期：
                  <small style="color:blue;">{{formValidate.startdate.format('yyyy-MM-dd')}}&nbsp;&nbsp;&nbsp;</small>结束日期：
                  <small style="color:blue;">{{formValidate.enddate.format('yyyy-MM-dd')}}</small>
                </p>
                <div style="display:flex;justify-content:center"> <v-linechartsec :data = "qiTableData11"></v-linechartsec></div>
              </Tab-pane>

            </Tabs>
          </Tab-pane>

          <Tab-pane label="统计时包含大宗交易数据" name='allData' >
            <Tabs type="card" :animated="false" class="noscrollTabs">
              <Tab-pane label="账户组每日交易持股分析" style="height:590px;">
                <p id="qiList8" class="redtext listlength"></p>
                <fastTable  :width="5690" :bwidth="5662" :columns="qiTableColumns5" :data="qiTableData5"  ></fastTable>
                <div style="padding-top:10px">
                  <Page :total="returnTotal5" :current="returnN5" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize5" @on-change="tableChange5"></Page>
                </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent5" type="primary" size="large" @click="exportData(5)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="组内账户阶段交易持股分析" style="height:590px;">
                <p id="qiList9" class="redtext listlength"></p>
                <fastTable  :width="2340" :bwidth="2321" :columns="qiTableColumns6" :data="qiTableData6"  ></fastTable>
                <div style="padding-top:10px">
                  <Page :total="returnTotal6" :current="returnN6" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize6" @on-change="tableChange6"></Page>
                </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent6" type="primary" size="large" @click="exportData(6)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="组内账户每日交易持股分析" style="height:590px;">
                <p id="qiList10" class="redtext listlength"></p>
                <fastTable  :width="2280" :bwidth="2261" :columns="qiTableColumns7" :data="qiTableData7"  ></fastTable>
                <div style="padding-top:10px">
                  <Page :total="returnTotal7" :current="returnN7" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize7" @on-change="tableChange7"></Page>
                </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent7" type="primary" size="large" @click="exportData(7)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                  <Button id="exportCurrent72" type="primary" size="large" @click="exportData(11)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="组内账户每日对倒明细" style="height:590px;">
                <p id="qiList11" class="redtext listlength"></p>
                <fastTable  :width="1923" :bwidth="1904" :columns="qiTableColumns8" :data="qiTableData8"  ></fastTable>
                <div style="padding-top:10px">
                  <Page :total="returnTotal8" :current="returnN8" :page-size="200" :page-size-opts=[200,500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize8" @on-change="tableChange8"></Page>
                </div>
                <div style="position:absolute; bottom:0px;right:3px; z-index:1;">
                  <Button id="exportCurrent8" type="primary" size="large" @click="exportData(8)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件
                  </Button>
                  <Button id="exportCurrent82" type="primary" size="large" @click="exportData(12)" disabled>
                    <Icon type="ios-download-outline"></Icon> 导出全部结果为DBF文件
                  </Button>
                </div>
              </Tab-pane>
              <Tab-pane label="图1：股价、持股、买卖占比、对倒占比" style="text-align:center; height:590px;overflow-y: auto;">
                <div>
                  <p>证券代码：
                    <small style="color:blue;">{{titles}} &nbsp;&nbsp;&nbsp;</small>开始日期：
                    <small style="color:blue;">{{formValidate.startdate.format('yyyy-MM-dd')}}&nbsp;&nbsp;&nbsp;</small>结束日期：
                    <small style="color:blue;">{{formValidate.enddate.format('yyyy-MM-dd')}}</small>
                  </p>
                  <div style="display:flex;justify-content:center"> <v-linkagesec :datas = "qiTableData12"></v-linkagesec></div>
                </div>
              </Tab-pane>
              <Tab-pane label="图2：股价、持股" style="text-align:center;height:590px;">
                <p>证券代码：
                  <small style="color:blue;">{{titles}} &nbsp;&nbsp;&nbsp;</small>开始日期：
                  <small style="color:blue;">{{formValidate.startdate.format('yyyy-MM-dd')}}&nbsp;&nbsp;&nbsp;</small>结束日期：
                  <small style="color:blue;">{{formValidate.enddate.format('yyyy-MM-dd')}}</small>
                </p>
                <div style="display:flex;justify-content:center"> <v-linecharttird :datas = "qiTableData12"></v-linecharttird></div>
              </Tab-pane>
              <Tab-pane label="图3：股价、交易占比" style="text-align:center;height:590px;">
                <p>证券代码：
                  <small style="color:blue;">{{titles}} &nbsp;&nbsp;&nbsp;</small>开始日期：
                  <small style="color:blue;">{{formValidate.startdate.format('yyyy-MM-dd')}}&nbsp;&nbsp;&nbsp;</small>结束日期：
                  <small style="color:blue;">{{formValidate.enddate.format('yyyy-MM-dd')}}</small>
                </p>
                <div style="display:flex;justify-content:center"> <v-linechartfor :datas = "qiTableData12"></v-linechartfor></div>
              </Tab-pane>
            </Tabs>
          </Tab-pane>
        </Tabs>
      </div>
    </div>
  </section>
</template>
<script>
  import 'whatwg-fetch';
  import vLinkage from '../components/linkage.vue';
  import vLinkagesec from '../components/linkage1.vue';
  import vLinechart from '../components/linechart1.vue';
  import vLinechartsec from '../components/linechart2.vue';
  import vLinecharttird from '../components/linechart3.vue';
  import vLinechartfor from '../components/linechart4.vue';
  import {qiTableColumns1,qiTableColumns2,qiTableColumns3,qiTableColumns4,qiTableColumns5,qiTableColumns6,qiTableColumns7,qiTableColumns8} from '../assets/js/objectAnalysis.js';
  import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  //日期初始值
  let lastTradeDate="";
  export default {
    //页面加载时执行
    mounted() {
      //获取URL地址参数
      var urlParams = window.location.href;
      var upfileParamsValue = {};
      upfileParamsValue.signature = signatureA;
      upfileParamsValue.Authorization=AuthorizationA;
      this.upfileParams=upfileParamsValue;
    },
    components:{
      vLinkage,vLinechart,vLinkagesec,vLinechartsec,vLinecharttird,vLinechartfor
    },
    data() {
      return {
        //输入行数为小数时提示文字
        collapse: '1',
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
        returnN7:1,
        returnTotal7:0,
        dataArrayAll7:[],
        returnN8:1,
        returnTotal8:0,
        dataArrayAll8:[],
        pageSize:200,
        pageSize2:200,
        pageSize3:200,
        pageSize4:200,
        pageSize5:200,
        pageSize6:200,
        pageSize7:200,
        pageSize8:200,
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
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        //结束日期
        endOption: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        zqCode1:'',
        formValidate: {
          showrow: 2000,
          startdate: new Date(this.initialDate()),
          enddate:new Date(this.initialDate()),
          desc: '',
          zqCode: '',
        },
        ruleValidate: {
          showrow: [
            { required: true, type: 'number', message: '显示行数不能为空', trigger: 'blur' }
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
        changeInfo: false,
        //查询参数初始化
        testParams: {},
        orderParams: {},
        urlParams: window.location.href,
        isHide: true,
        //文件解析参数
        upfileParams: this.upfileParamsValue,
        //上传股东账户条数
        accountList: 0,
        self: this,
        //表格数据
        dealitems1: 0,
        dealitems2: 0,
        dealitems3: 0,
        dealitems4: 0,
        dealitems5: 0,
        dealitems6: 0,
        dealitems7: 0,
        dealitems8: 0,
        dealitems9: 0,
        dealitems10: 0,
        dealitems11: 0,
        dealitems12: 0,
        dealitems13: 0,
        dealitems14: 0,
        tabsValue: 'onlyData',

        qiTableData1: [],
        qiTableData2: [],
        qiTableData3: [],
        qiTableData4: [],
        qiTableData5: [],
        qiTableData6: [],
        qiTableData7: [],
        qiTableData8: [],


        qiTableData9:[],
        qiTableData10:[],
        qiTableData11:{},
        qiTableData12:{},

        chartData1:[],
        chartData2:[],
        chartData3:[],
        chartData4:[],
        chartData5:[],
        chartData6:[],
        chartData7:[],
        chartData8:[],
        chartData9:[],
        chartData10:[],
        chartData11:[],
        chartData12:[],
        chartData13:[],
        chartData14:[],
        chartData15:[],
        chartData16:[],
        chartData17:[],
        chartData18:[],
        chartData19:[],
        chartData20:[],
        chartData21:[],
        chartData22:[],
        chartData23:[],
        chartData24:[],
        chartData25:[],
        chartData26:[],
        chartData27:[],
        chartData28:[],

        qiTableColumns1:qiTableColumns1 ,
        qiTableColumns2:qiTableColumns2,
        qiTableColumns3:qiTableColumns3,
        qiTableColumns4:qiTableColumns4,
        qiTableColumns5:qiTableColumns5,
        qiTableColumns6:qiTableColumns6,
        qiTableColumns7:qiTableColumns7,
        qiTableColumns8:qiTableColumns8,
        t: ''
      }
    },
    watch:{
      //this.zqCode1 = this.formValidate.zqCode;
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
        this.qiTableData1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
      },
      tableChangeSize:function (pageSize){
        this.pageSize=pageSize;
        this.returnN=1;
        this.qiTableData1 =this.dataArrayAll.slice(0,this.pageSize);
      },
      tableChange2:function (page){
        this.returnN2=page;
        this.qiTableData2 =this.dataArrayAll2.slice((page-1)*this.pageSize2,page*this.pageSize2);
      },
      tableChangeSize2:function (pageSize){
        this.pageSize2=pageSize;
        this.returnN2=1;
        this.qiTableData2 =this.dataArrayAll2.slice(0,this.pageSize2);
      },
      tableChange3:function (page){
        this.returnN3=page;
        this.qiTableData3 =this.dataArrayAll3.slice((page-1)*this.pageSize3,page*this.pageSize3);
      },
      tableChangeSize3:function (pageSize){
        this.pageSize3=pageSize;
        this.returnN3=1;
        this.qiTableData3 =this.dataArrayAll3.slice(0,this.pageSize3);
      },
      tableChange4:function (page){
        this.returnN4=page;
        this.qiTableData4 =this.dataArrayAll4.slice((page-1)*this.pageSize4,page*this.pageSize4);
      },
      tableChangeSize4:function (pageSize){
        this.pageSize4=pageSize;
        this.returnN4=1;
        this.qiTableData4 =this.dataArrayAll4.slice(0,this.pageSize4);
      },
      tableChange5:function (page){
        this.returnN5=page;
        this.qiTableData5 =this.dataArrayAll5.slice((page-1)*this.pageSize5,page*this.pageSize5);
      },
      tableChangeSize5:function (pageSize){
        this.pageSize5=pageSize;
        this.returnN5=1;
        this.qiTableData5 =this.dataArrayAll5.slice(0,this.pageSize5);
      },
      tableChange6:function (page){
        this.returnN6=page;
        this.qiTableData6 =this.dataArrayAll6.slice((page-1)*this.pageSize6,page*this.pageSize6);
      },
      tableChangeSize6:function (pageSize){
        this.pageSize6=pageSize;
        this.returnN6=1;
        this.qiTableData6 =this.dataArrayAll6.slice(0,this.pageSize6);
      },
      tableChange7:function (page){
        this.returnN7=page;
        this.qiTableData7 =this.dataArrayAll7.slice((page-1)*this.pageSize7,page*this.pageSize7);
      },
      tableChangeSize7:function (pageSize){
        this.pageSize7=pageSize;
        this.returnN7=1;
        this.qiTableData7 =this.dataArrayAll7.slice(0,this.pageSize7);
      },
      tableChange8:function (page){
        this.returnN8=page;
        this.qiTableData8 =this.dataArrayAll8.slice((page-1)*this.pageSize8,page*this.pageSize8);
      },
      tableChangeSize8:function (pageSize){
        this.pageSize8=pageSize;
        this.returnN8=1;
        this.qiTableData8 =this.dataArrayAll8.slice(0,this.pageSize8);
      },
      getTitleHandle(title){ //获取模糊查询选择框get的参数
        let _this = this;
        this.titles = title;
        setTimeout(function(){
          _this.listShow = false;
        },300);
      },
      showListHandle(){
        this.listShow = false;
      },
      searchInfo(){
        let _this = this;
        //证券代码联想
        _this._fetch(fetch('/dwapp/mktdt/seccode', {
          method: "POST",
          // body: JSON.stringify(upfileParamsValue),
          mode: 'cors',
          body: JSON.stringify({
            codeLike: _this.formValidate.zqCode
          }),
          headers: {
            "Content-Type": "application/json",
            "signature":signatureA,
            "Authorization":AuthorizationA
          }
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          let codeData = data.resData,
            zqCodeList = [];
          for(var i=0;i<codeData.length;i++){
            let zqRow = {};
            zqRow.value = codeData[i].secCode;
            zqRow.label = codeData[i].value;
            zqCodeList.push(zqRow);
          }
          this.zqCodeList = zqCodeList;

        })
      },
      hideRightBox:function(){//显示隐藏左右
        (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
        (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
        (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16;
        (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';
      },
      initialDate: function () {//请求初始日期
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
      getUrlParams: function (url) {//获取参数
        var urlArray = url.split("?")[1].split("&"),
          urlValue = {};
        for (var i = 0; i < urlArray.length; i++) {
          var urlRowArray = urlArray[i].split("=");
          urlValue[urlRowArray[0]] = urlRowArray[1];
        }
        return urlValue;
      },
      _fetch: function (fetch_promise, timeout) { //设置fetch请求超时方法
        var abort_fn = null;
        var abortInfo = this;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
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
      accountListChange: function (e) {//股东账户已上传条数
        const val = e.target.value;
        //const arr = val.trim().split("\n");
        const descStr = val.replace(/[\r\n]/g, ',');
        let arr = descStr.split(',');

        this.accountList = arr.length;
      },
      handleSuccessAccount(response, file, fileList) {//股东账户导入
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
          this.dataLookInfo = arryAll
          this.accountList = arryAll.length;
          str = arryAll.join('\n');
          this.formValidate.desc = str;
        }
      },
      hasClass: function (obj, cls) {//原声js写jquery方法
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
      infoTableSort: function (sort) {//传排序参数
        this.orderParams.field = sort.key;
        this.orderParams.sort = sort.order;
      },
      searchData: function () {//查询表单数据 查询数据
        this.isHide = false;
        var _this=this;
        var exportCurrent1 = document.getElementById("exportCurrent1");
        var exportCurrent2 = document.getElementById("exportCurrent2");
        var exportCurrent3 = document.getElementById("exportCurrent3");
        var exportCurrent32 = document.getElementById("exportCurrent32");
        var exportCurrent4 = document.getElementById("exportCurrent4");
        var exportCurrent42 = document.getElementById("exportCurrent42");
        var exportCurrent5 = document.getElementById("exportCurrent5");
        var exportCurrent6 = document.getElementById("exportCurrent6");
        var exportCurrent7 = document.getElementById("exportCurrent7");
        var exportCurrent72 = document.getElementById("exportCurrent72");
        var exportCurrent8 = document.getElementById("exportCurrent8");
        var exportCurrent82 = document.getElementById("exportCurrent82");
        //获取URL地址参数
        var urlParams = window.location.href;
        function getUrlParams(urlParams) {
          var urlArray = urlParams.split("?")[1].split("&"),
            urlValue = {};
          for (var i = 0; i < urlArray.length; i++) {
            var urlRowArray = urlArray[i].split("=");
            urlValue[urlRowArray[0]] = urlRowArray[1];
          }
          console.log(JSON.stringify(urlValue));
          return urlValue;
        }
        console.log(this.tabsValue)

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
        var descArry1 = [];
        for(var i = 0; i < descArry.length; i++){
          descArry1.push(descArry[i].replace(/(^\s*)|(\s*$)/g, ""));
        }
        console.log(descArry1);
        for(var i = 0; i < descArry1.length; i++){
          if(descArry1[i] == '' || typeof descArry1[i] == 'undefined'){
            descArry1.splice(i, 1);
            i = i-1;
          }
        }
        //股东账户去重
        let descArry3 = [];
        descArry1.forEach(function(item,index){
          if(descArry3.indexOf(item) ==-1){
            descArry3.push(item)
          }
        })
        let codelist=this.formValidate.zqCode.split(',');
        var testParams={
          "startDate":startdate,
          "endDate":endDate,
          "userId":srcUseridA,
          "userName":srcUsernameA,
          "accountId":descArry3,
          "secCode":[this.titles],
          "dwSessonid":dwSessionidA,
          "limit":this.formValidate.showrow
        }
        this.qiTableData1 = [];
        this.qiTableData2 = [];
        this.qiTableData3 = [];
        this.qiTableData4 = [];
        this.qiTableData5 = [];
        this.qiTableData6 = [];
        this.qiTableData7 = [];
        this.qiTableData8 = [];
        this.qiTableData9 = [];
        this.qiTableData10 = [];
        this.dealitems1=0;
        this.dealitems2=0;
        this.dealitems3=0;
        this.dealitems4=0;
        this.dealitems8=0;
        this.dealitems9=0;
        this.dealitems10=0;
        this.dealitems11=0;
        document.getElementById("qiList1").innerHTML="查询结果共 "+this.dealitems1+" 条记录";
        document.getElementById("qiList2").innerHTML="查询结果共 "+this.dealitems2+" 条记录";
        document.getElementById("qiList3").innerHTML="查询结果共 "+this.dealitems3+" 条记录";
        document.getElementById("qiList4").innerHTML="查询结果共 "+this.dealitems4+" 条记录";
        document.getElementById("qiList8").innerHTML="查询结果共 "+this.dealitems8+" 条记录";
        document.getElementById("qiList9").innerHTML="查询结果共 "+this.dealitems9+" 条记录";
        document.getElementById("qiList10").innerHTML="查询结果共 "+this.dealitems10+" 条记录";
        document.getElementById("qiList11").innerHTML="查询结果共 "+this.dealitems11+" 条记录";
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
        this.returnN7=1;
        this.returnTotal7=0;
        this.returnN8=1;
        this.returnTotal8=0;
        //获取数据
        const url = '/dwapp/mktdt/so_all';
        fetch(url, {
          method: "POST",
          body: JSON.stringify(testParams),
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            "signature":signatureA,
            "Authorization":AuthorizationA
          }
        }).then(function (response) {
          return response.json()
        }, function (error) {
          _this.isHide = true;
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          if(this.t != ''){
            clearTimeout(this.t);
          }
          var _this=this;
          if(typeof(data.resData)=="undefined" || data.resData == null){
            this.isHide = true;
            this.$Message.warning("查询出错"+data.message);
          }else{


            if(data.resData.tabList1.data.length>0){
              exportCurrent1.removeAttribute("disabled");
            }
            if(data.resData.tabList2.data.length>0){
              exportCurrent2.removeAttribute("disabled");
            }
            if(data.resData.tabList3.data.length>0){
              exportCurrent3.removeAttribute("disabled");
              exportCurrent32.removeAttribute("disabled");
            }
            if(data.resData.tabList4.data.length>0){
              exportCurrent4.removeAttribute("disabled");
              exportCurrent42.removeAttribute("disabled");
            }
            if(data.resData.tabList5.data.length>0){
              exportCurrent5.removeAttribute("disabled");
            }
            if(data.resData.tabList6.data.length>0){
              exportCurrent6.removeAttribute("disabled");
            }
            if(data.resData.tabList7.data.length>0){
              exportCurrent7.removeAttribute("disabled");
              exportCurrent72.removeAttribute("disabled");
            }
            if(data.resData.tabList8.data.length>0){
              exportCurrent8.removeAttribute("disabled");
              exportCurrent82.removeAttribute("disabled");
            }

            this.dealitems1=data.resData.tabList1.size;
            this.dealitems2=data.resData.tabList2.size;
            this.dealitems3=data.resData.tabList3.size;
            this.dealitems4=data.resData.tabList4.size;
            this.dealitems8=data.resData.tabList5.size;
            this.dealitems9=data.resData.tabList6.size;
            this.dealitems10=data.resData.tabList7.size;
            this.dealitems11=data.resData.tabList8.size;
            this.dataArrayAll=[];
            this.dataArrayAll=data.resData.tabList1.data;//保存所有数据
            this.returnN=1;
            this.returnTotal=data.resData.tabList1.data.length;
            var tmpLimit=this.pageSize;
            if(tmpLimit>data.resData.tabList1.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList1.data.length;
            }
            this.qiTableData1=this.dataArrayAll.slice(0,tmpLimit);

            this.dataArrayAll2=[];
            this.dataArrayAll2=data.resData.tabList2.data;//保存所有数据
            this.returnN2=1;
            this.returnTotal2=data.resData.tabList2.data.length;
            var tmpLimit=this.pageSize2;
            if(tmpLimit>data.resData.tabList2.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList2.data.length;
            }
            this.qiTableData2=this.dataArrayAll2.slice(0,tmpLimit);



            this.dataArrayAll3=[];
            this.dataArrayAll3=data.resData.tabList3.data;//保存所有数据
            this.returnN3=1;
            this.returnTotal3=data.resData.tabList3.data.length;
            var tmpLimit=this.pageSize3;
            if(tmpLimit>data.resData.tabList3.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList3.data.length;
            }
            this.qiTableData3=this.dataArrayAll3.slice(0,tmpLimit);



            this.dataArrayAll4=[];
            this.dataArrayAll4=data.resData.tabList4.data;//保存所有数据
            this.returnN4=1;
            this.returnTotal4=data.resData.tabList4.data.length;
            var tmpLimit=this.pageSize4;
            if(tmpLimit>data.resData.tabList4.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList4.data.length;
            }
            this.qiTableData4=this.dataArrayAll4.slice(0,tmpLimit);


            this.dataArrayAll5=[];
            this.dataArrayAll5=data.resData.tabList5.data;//保存所有数据
            this.returnN5=1;
            this.returnTotal5=data.resData.tabList5.data.length;
            var tmpLimit=this.pageSize5;
            if(tmpLimit>data.resData.tabList5.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList5.data.length;
            }
            this.qiTableData5=this.dataArrayAll5.slice(0,tmpLimit);


            this.dataArrayAll6=[];
            this.dataArrayAll6=data.resData.tabList6.data;//保存所有数据
            this.returnN6=1;
            this.returnTotal6=data.resData.tabList6.data.length;
            var tmpLimit=this.pageSize6;
            if(tmpLimit>data.resData.tabList6.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList6.data.length;
            }
            this.qiTableData6=this.dataArrayAll6.slice(0,tmpLimit);


            this.dataArrayAll7=[];
            this.dataArrayAll7=data.resData.tabList7.data;//保存所有数据
            this.returnN7=1;
            this.returnTotal7=data.resData.tabList7.data.length;
            var tmpLimit=this.pageSize7;
            if(tmpLimit>data.resData.tabList7.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList7.data.length;
            }
            this.qiTableData7=this.dataArrayAll7.slice(0,tmpLimit);


            this.dataArrayAll8=[];
            this.dataArrayAll8=data.resData.tabList8.data;//保存所有数据
            this.returnN8=1;
            this.returnTotal8=data.resData.tabList8.data.length;
            var tmpLimit=this.pageSize8;
            if(tmpLimit>data.resData.tabList8.data.length){
              //如果加载数据少，全部返回
              tmpLimit=data.resData.tabList8.data.length;
            }
            this.qiTableData8=this.dataArrayAll8.slice(0,tmpLimit);

            var dataResponse9= data.resData.tabList9.data;
            this.dealitems12=data.resData.tabList9.size;

            var dataResponse10= data.resData.tabList10.data;
            this.dealitems12=data.resData.tabList10.size;


            this.qiTableData9 = dataResponse9;
            this.qiTableData10 = dataResponse10;
            var  dataArray9=dataResponse9;
            var dataArray10=dataResponse10;

            _this.chartData1=[];
            _this.chartData2=[];
            _this.chartData3=[];
            _this.chartData4=[];
            _this.chartData5=[];
            _this.chartData6=[];
            _this.chartData7=[];
            _this.chartData8=[];
            _this.chartData9=[];
            _this.chartData10=[];
            _this.chartData11=[];
            _this.chartData12=[];
            _this.chartData13=[];
            _this.chartData14=[];
            _this.chartData15=[];
            _this.chartData16=[];
            _this.chartData17=[];
            _this.chartData18=[];
            _this.chartData19=[];
            _this.chartData20=[];
            _this.chartData21=[];
            _this.chartData22=[];
            _this.chartData23=[];
            _this.chartData24=[];
            _this.chartData25=[];
            _this.chartData26=[];
            _this.chartData27=[];
            _this.chartData28=[];

            dataArray9.forEach(function(item,index){
              _this.chartData1.push(item.tradeDate);//交易日期
              _this.chartData2.push(item.holdVol);//持股数量
              _this.chartData3.push(item.holdVolRatio);//市场交易总量
              _this.chartData4.push(item.ddVolRatio);//对倒数量占比
              _this.chartData5.push((item.tradeVol).toFixed(2));//市场成交总量
              _this.chartData6.push(item.tradeVolRatio);//交易阶段交易占比
              _this.chartData7.push(item.buyRatio);//买入占比
              _this.chartData8.push(item.sellRatio);//卖出占比
              _this.chartData9.push(item.currPrice);//该股收盘价
              _this.chartData10.push(item.preClosePrice);//昨日收盘价
              _this.chartData11.push(item.openPrice);//开盘价
              _this.chartData12.push(item.highPrice);//最高价格
              _this.chartData13.push(item.lowPrice);//最低价格
              _this.chartData14.push([item.openPrice,item.currPrice,item.lowPrice,item.highPrice]);//k线图合计
            })
            var obj = {};
            obj.tradeDate = _this.chartData1;
            obj.holdVol = _this.chartData2;
            obj.holdVolRatio = _this.chartData3;
            obj.ddVolRatio = _this.chartData4;
            obj.tradeVol = _this.chartData5;
            obj.tradeVolRatio = _this.chartData6;
            obj.buyRatio = _this.chartData7;
            obj.sellRatio = _this.chartData8;
            obj.currPrice = _this.chartData9;
            obj.preClosePrice = _this.chartData10;
            obj.openPrice = _this.chartData11;
            obj.highPrice = _this.chartData12;
            obj.lowPrice = _this.chartData13;
            obj.kChart = _this.chartData14;


            dataArray10.forEach(function(item,index){
              _this.chartData15.push(item.tradeDate);//交易日期
              _this.chartData16.push(item.holdVol);//持股数量
              _this.chartData17.push(item.holdVolRatio);//市场交易总量
              _this.chartData18.push(item.ddVolRatio);//对倒数量占比
              _this.chartData19.push((item.tradeVol).toFixed(2));//市场成交总量
              _this.chartData20.push(item.tradeVolRatio);//交易阶段交易占比
              _this.chartData21.push(item.buyRatio);//买入占比
              _this.chartData22.push(item.sellRatio);//卖出占比
              _this.chartData23.push(item.currPrice);//该股收盘价
              _this.chartData24.push(item.preClosePrice);//昨日收盘价
              _this.chartData25.push(item.openPrice);//开盘价
              _this.chartData26.push(item.highPrice);//最高价格
              _this.chartData27.push(item.lowPrice);//最低价格
              _this.chartData28.push([item.openPrice,item.currPrice,item.lowPrice,item.highPrice]);//k线图合计
            })
            var obj2 = {};
            obj2.tradeDate = _this.chartData15;
            obj2.holdVol = _this.chartData16;
            obj2.holdVolRatio = _this.chartData17;
            obj2.ddVolRatio = _this.chartData18;
            obj2.tradeVol = _this.chartData19;
            obj2.tradeVolRatio = _this.chartData20;
            obj2.buyRatio = _this.chartData21;
            obj2.sellRatio = _this.chartData22;
            obj2.currPrice = _this.chartData23;
            obj2.preClosePrice = _this.chartData24;
            obj2.openPrice = _this.chartData25;
            obj2.highPrice = _this.chartData26;
            obj2.lowPrice = _this.chartData27;
            obj2.kChart = _this.chartData28;

            _this.qiTableData11 = obj,
              _this.qiTableData12 = obj2,

              this.isHide = true;
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
            if(this.formValidate.showrow<this.dealitems8){
              document.getElementById("qiList8").innerHTML="查询结果共 "+this.dealitems8+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
            }else{
              document.getElementById("qiList8").innerHTML="查询结果共 "+this.dealitems8+" 条记录";
            }
            //查询结果提示变化6
            if(this.formValidate.showrow<this.dealitems9){
              document.getElementById("qiList9").innerHTML="查询结果共 "+this.dealitems9+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
            }else{
              document.getElementById("qiList9").innerHTML="查询结果共 "+this.dealitems9+" 条记录";
            }
            //查询结果提示变化7
            if(this.formValidate.showrow<this.dealitems10){
              document.getElementById("qiList10").innerHTML="查询结果共 "+this.dealitems10+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
            }else{
              document.getElementById("qiList10").innerHTML="查询结果共 "+this.dealitems10+" 条记录";
            }
            //查询结果提示变化8
            if(this.formValidate.showrow<this.dealitems11){
              document.getElementById("qiList11").innerHTML="查询结果共 "+this.dealitems11+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。此时点击字段排序只对当前页面记录有效，使用文件导出功能可获取完整的查询结果。";
            }else{
              document.getElementById("qiList11").innerHTML="查询结果共 "+this.dealitems11+" 条记录";
            }
          }
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if(this.isHide==false){
            return;
          }
          const { desc } = this.formValidate;
          var descValue = desc;

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
          //股东账户  10 一个大写字母  9个数字
          if (this.formValidate.desc) {
            const descStr = descValue.replace(/[\r\n]/g, ',');
            let descArry = descStr.split(',');
            let descStr2 = descValue.replace(/[\r\n]/g, "");
            if(descStr2.trim().length==0)
            {
              this.$Message.error('股东账户不能为空!！');
              return;
            }
            //判断上传股东账户不能超过2500
            if (descArry.length > 2500) {
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
            this.removeClass(document.getElementById('AccountForm'), 'ivu-form-item-error');
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
          //验证证券代码输入是否合法
          if(this.titles.length!=6 || !(/^[0-9]*$/).test(this.titles)){
            this.$Message.error('证券代码输入不合法');
            return;
          }
          if (valid) {
            this.$Message.success('提交成功!请等待~');
            //获取请求参数
            this.testParams = {
              "startDate":"20170101",
              "endDate":"20170101",
              "limit":this.formValidate.showrow.toString(),
              "accountId":["A111222133"],
              "secCode":this.titles,

              "userId": srcUseridA, "userName": srcUsernameA
            }
            console.log(this.testParams, "-----testParams111111111");
            // this.searchData(this.testParams);
            this.searchData();
          } else {
            this.$Message.error('股东账户不能为空!');
          }
        })
      },
      clearOne: function () {
        this.formValidate.desc = "";
        this.accountList = 0;
      },
      exportData : function(type) {
        //导出参数
        var startdateValue = this.formValidate.startdate;
        var startdate = startdateValue.format('yyyyMMdd');
        var enddateValue = this.formValidate.enddate;
        var endDate = enddateValue.format('yyyyMMdd');
        var descStr = this.formValidate.desc.replace(/[\r\n]/g,',');
        var downfileParams="&signature="+signatureA+
          "&userId="+srcUseridA+"&userName="+srcUsernameA+
          "&startDate="+startdate+"&endDate="+endDate+"&secCode="+this.formValidate.zqCode+"&Authorization="+AuthorizationA;
        if (type === 1) {
          document.getElementById("exportCurrent1").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent1').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTDAYTRADE&fileType=xlsx'+downfileParams));
        } else if (type === 2) {
          document.getElementById("exportCurrent2").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent2').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTGROUPTRADE&fileType=xlsx'+downfileParams));
        } else if (type === 3) {
          document.getElementById("exportCurrent3").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent3').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTGROUPDAY&fileType=xlsx'+downfileParams));
        } else if (type === 4) {
          document.getElementById("exportCurrent4").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent4').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTDAYBACK&fileType=xlsx'+downfileParams));
        } else if (type === 5) {
          document.getElementById("exportCurrent5").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent5').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTDAYTRADEBT&fileType=xlsx'+downfileParams));
        } else if (type === 6) {
          document.getElementById("exportCurrent6").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent6').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTGROUPTRADEBT&fileType=xlsx'+downfileParams));
        } else if (type === 7) {
          document.getElementById("exportCurrent7").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent7').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTGROUPDAYBT&fileType=xlsx'+downfileParams));
        } else if (type === 8) {
          document.getElementById("exportCurrent8").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent8').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTDAYBACKBT&fileType=xlsx'+downfileParams));
        }else if (type === 9) {
          document.getElementById("exportCurrent32").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent32').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTGROUPDAY&fileType=DBF'+downfileParams));
        }else if (type === 10) {
          document.getElementById("exportCurrent42").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent42').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTDAYBACK&fileType=DBF'+downfileParams));
        }else if (type === 11) {
          document.getElementById("exportCurrent72").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent72').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTGROUPDAYBT&fileType=DBF'+downfileParams));
        }else if (type === 12) {
          document.getElementById("exportCurrent82").setAttribute("disabled",true);
          setTimeout("document.getElementById('exportCurrent82').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=DOUBTDAYBACKBT&fileType=DBF'+downfileParams));
        }
      },
      exportTable: function () {
        var tabsValue = this.tabsValue
        if (this.tabsValue == 'onlyDate') {
          this.$refs.tableOneExport.exportCsv({
            filename: '账户组每日交易持股分析',
          })
          this.$refs.tableTwoExport.exportCsv({
            filename: '组内账户阶段交易持股分析'
          })
          this.$refs.tableThreeExport.exportCsv({
            filename: '组内账户每日交易持股分析'
          })
          this.$refs.tableFourExport.exportCsv({
            filename: '组内账户每日对倒明细'
          })
        }
        if (this.tabsValue == 'allDate') {
          this.$refs.tableFiveExport.exportCsv({
            filename: '账户组每日交易持股分析',
          })
          this.$refs.tableSixExport.exportCsv({
            filename: '组内账户阶段交易持股分析'
          })
          this.$refs.tableSevenExport.exportCsv({
            filename: '组内账户每日交易持股分析'
          })
          this.$refs.tableEightExport.exportCsv({
            filename: '组内账户每日对倒明细'
          })
        }
      },
    }
  }
</script>


<style lang="less">
  #objectAnalysis {
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
  /*.ivu-tabs-content{*/
    /*overflow:auto;*/
  /*}*/
</style>
