<template>
  <section class="constWidth" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>期权投资者参与权证交易情况
          <span id="lookInfoLink" class="lookInfo" @click.stop="modal10 = true">查看统计口径</span>
          <span class="showButton">{{ collapse.length>0?'收起':'展开' }}<i :class="collapse.length>0?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  v-bind:class="{ hide: hideInput }" :label-width="110">
            <div class="flexBox">
              <Form-item prop='desc' id="AccountForm" label="期权投资者账户">
                <Input id="AccountInput" v-model="formValidate.desc" placeholder="请输入..."></Input>
              </Form-item>
              <Form-item class="showrow" prop="showrow" id="AccountForm2" label="在页面上显示前">
                <Input-number id="showrowInput" :max="2000" :min="1" @on-change="validNum" v-model="formValidate.showrow" size="small"></Input-number>&nbsp;&nbsp;行
                <span class="redtext">{{showrowTip}}</span>
                <span class="redtext">(最多显示2000行)</span>
              </Form-item>
              <div class="submitBtnBox">
                <Button type="primary" @click="handleSubmit('formValidate')" style="float:right;width:80px;">查询</Button>
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
    <Modal class="modal overHeight" title="期权投资者参与权证交易情况 统计口径说明" v-model="modal10" class-name="vertical-center-modal" cancel-text  :scrollable="true" >
      <h3 class="text">
        <b>数据说明</b>
      </h3>
      <p class="textP">只统计期权投资者账户对权证的交易情况</p>
      <h3 class="text">
        <b>指标说明</b>
      </h3>
      <p class="textP">
        1.证券账户，即投资者衍生品账户对应的现货账户。<br>
        2.权证首笔交易日期，即期权投资者首笔权证的交易日期。<br>
        3.权证最后交易日期，即期权投资者最后一笔权证的交易日期。<br>
        4.权证日均交易金额，即（投资者所有权证交易金额合计值）/投资者权证总交易天数权证累计交易金额，即投资者对所有权证交易金额的合计。<br>
        5.权证盈亏情况 =卖出收入金额-买入支付金额+（行权时现货价格-行权价）*行权张数-（行权时现货价格-行权价）*被行权张数。<br>
      </p>
      <h3 class="text">
        <b>其他说明</b>
      </h3>
      <p class="textP">无</p>
    </Modal>
    <div class="tableBox">
      <p id="infoTableList" class="redtext"></p>
      <fastTable  :width="930" :bwidth="930" :addWidth="addWidth" :columns="columns1" :data="data1"  class="firstNew"></fastTable>
      <div class="pageModule">
        <Page :total="returnTotal" :current="returnN" :page-size="500" :page-size-opts=[500,1000] placement="top" show-sizer  @on-page-size-change="tableChangeSize" @on-change="tableChange"></Page>
      </div>
      <div class="exportBtn">
        <Button id="calExportBtn" type="primary" size="large" @click="exportData(1)" disabled><Icon type="ios-download-outline"></Icon> 导出全部结果为XLSX文件</Button>
      </div>
    </div>
  </section>
</template>

<script>
  import {columns1,columns2,data2} from '../assets/js/searchOption.js';
  import {urlParams,signatureA,srcUsernameA,srcUseridA,AuthorizationA,dwSessionidA,getUrlParams,validNum} from '../assets/js/commen.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';
  export default {
    name: 'threeFour',
    //页面加载时执行
    mounted:function(){
      //获取URL地址参数
      var urlParams=window.location.href;
      var upfileParamsValue={};
      upfileParamsValue.signature=signatureA;
      upfileParamsValue.Authorization=AuthorizationA;
      this.upfileParams=upfileParamsValue;
    },
    data() {
      return {
        collapse: '1',
        addWidth:0,
        //输入行数为小数时提示文字
        showrowTip:'',
        returnN:1,
        returnTotal:0,
        dataArrayAll:[],
        dataLength:0,
        pageSize:500,
        //显示隐藏输入条件
        changeArrow:'rightArrow',
        gutterValue:16,
        leftPane:19,
        rightPane:5,
        hideText:'隐藏输入条件',
        hideInput:false,
        //下载参数期权账户
        qqParam:'',
        items: 0,
        modal10: false,
        isHide: true,
        formValidate: {
          desc: '',
          showrow:2000,
        },
        urlParams:window.location.href,
        upfileParams:this.upfileParamsValue,
        ruleValidate: {
          desc: [
            { message: '请输入账户...', trigger: 'blur' }
          ],
          showrow: [
            { required: true,type: 'number', message: '显示行数不能为空', trigger: 'blur' }
          ],

        },
        model11: '',
        columns1: columns1,
        data1: [],
        columns2: columns2,
        data2: data2,
        t: ''
      }
    },
    methods: {
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
        this.data1 =this.dataArrayAll.slice((page-1)*this.pageSize,page*this.pageSize);
        //document.body.scrollTop=0;
        // document.querySelector('.ivu-table-body').scrollTop=0;
      },
      tableChangeSize:function (pageSize){
        this.pageSize=pageSize;
        this.returnN=1;
        this.data1 =this.dataArrayAll.slice(0,this.pageSize);
      },
      //显示隐藏左右
      hideRightBox:function(){
        (this.leftPane == '19')?this.leftPane='25':this.leftPane='19';
        (this.rightPane == '5')?this.rightPane='0':this.rightPane='5';
        (this.gutterValue == 16)?this.gutterValue=0:this.gutterValue=16;
        (this.changeArrow == 'rightArrow')?this.changeArrow='leftArrow':this.changeArrow='rightArrow';
      },
      //获取参数
      getUrlParams:function(url){
        var urlArray=url.split("?")[1].split("&"),
          urlValue={};
        for(var i=0;i<urlArray.length;i++){
          var urlRowArray=urlArray[i].split("=");
          urlValue[urlRowArray[0]]=urlRowArray[1];
        }
        return urlValue;
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
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if(this.isHide==false){
            return;
          }
          const { desc } = this.formValidate;
          var descValue = desc.trim();
          //期权账号  10 一个大写字母  9个数字
          if(this.formValidate.desc){
            const descReg = /^[A-Z]{1}\d{9}/g;
            if(!descReg.test(descValue) || descValue.length != 10){
              this.$Message.error('期权投资者账户由一个大写字母和9个数字组成！');
              this.addClass(document.getElementById('AccountForm'),'ivu-form-item-error');
              return;
            }
            this.removeClass(document.getElementById('AccountForm'),'ivu-form-item-error');
            this.qqParam = descValue;
            descValue = [descValue];
          }else{
            descValue = ["ALL"];
            this.qqParam = "ALL";
          }
          var r = /^[1-9]\d*$/;
          if(r.test(this.formValidate.showrow) == false){
            this.$Message.error('显示行数不能为小数！请输入整数！');
            this.showrowTip = '显示行数不能为小数！请输入整数！';
            this.addClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
            return;
          }
          this.removeClass(document.getElementById('AccountForm2'),'ivu-form-item-error');
          this.showrowTip = '';

          if (valid) {
            this.$Message.success('提交成功!请等待~');
            var descArry5 = [];
            for(var i = 0; i < descValue.length; i++){
              descArry5.push(descValue[i].replace(/(^\s*)|(\s*$)/g, ""));
            }
            //股东账户去重
            let descArray2 = [];
            descArry5.forEach(function(item,index){
              if(descArray2.indexOf(item) ==-1){
                descArray2.push(item)
              }
            })
            this.testParams={
              "limit":this.formValidate.showrow.toString(),
              "userId":srcUseridA,
              "userName":srcUsernameA,
              "dwSessonid":dwSessionidA,
              "accountId":descArray2
            }
            this.searchDate(this.testParams);
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      searchDate: function (requestParam) {
        this.isHide=false;
        this.returnN=1;
        this.returnTotal=0;
        this.data1 = [];
        this.dataLength=0;
        this.dataArrayAll=[];
        document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dataLength+" 条记录";
        //获取数据 并传递数据
        const url = '/dwapp/mktdt/qq_warrant_trade';
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
        }).then(data => {
          if(this.t != ''){
            clearTimeout(this.t);
          }
          var  exportButton1  =document.getElementById('calExportBtn')

          var dataError = data.message;

          if(data.resData == null){
            this.isHide=true;
            this.$Message.warning("查询出错"+dataError);
            this.tableData1 = [];
            this.tableData2 = [];
            this.dealitems = 0;
            this.data1 = [];
            exportButton1.setAttribute("disabled",true);

          }else{
            var dataResponse = data.resData.optResultList.data;
            this.dataLength = data.resData.optResultList.size;
            if(this.dataLength == 0){
              this.isHide=true;
              this.$Message.warning('查询无数据！');
              this.tableData1 = [];
              this.tableData2 = [];
              this.dealitems = 0;

              this.data1 = [];
              exportButton1.setAttribute("disabled",true);
            }else{
              this.data1 = [];
              this.dataArrayAll=[];
              this.dataArrayAll=dataResponse;//保存所有数据
              this.returnN=1;
              this.returnTotal=dataResponse.length;
              var tmpLimit=this.pageSize;
              if(tmpLimit>dataResponse.length){
                //如果加载数据少，全部返回
                tmpLimit=dataResponse.length;
              }
              this.data1=this.dataArrayAll.slice(0,tmpLimit);
              exportButton1.removeAttribute("disabled");
              this.isHide=true;
              //查询结果提示变化
              if(this.formValidate.showrow<this.dataLength){
                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dataLength+" 条记录，当前页面只显示前"+this.formValidate.showrow+" 行。使用文件导出功能可获取完整的查询结果。";
              }else{
                document.getElementById("infoTableList").innerHTML="查询结果共 "+this.dataLength+" 条记录";
              }

            }
          }

        })
      },
      exportData (type) {
        //导出参数
        var downfileParams="&signature="+signatureA+
          "&userId="+srcUseridA+"&userName="+srcUsernameA
          +"&accountId="+this.qqParam+"&Authorization="+AuthorizationA;
        if (type === 1) {
          this.$Message.success('导出时间可能过长，请您耐心等待');
          document.getElementById("calExportBtn").setAttribute("disabled",true);
          setTimeout("document.getElementById('calExportBtn').removeAttribute('disabled')",5000);
          void(window.open('/dwapp/download/dwapp_downfile?reportType=QQTZ&fileType=xlsx'+downfileParams));
        }
      },
    }
  }
</script>

<style lang="less">
  .constWidth {
    .redtext {
      margin-bottom: 5px;
    }
  }
</style>

