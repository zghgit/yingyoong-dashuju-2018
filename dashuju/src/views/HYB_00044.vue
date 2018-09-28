<template>
  <section class="constWidth" id="fifteenCommon">
    <!--头部logo-->
    <header></header>
    <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <Collapse id="dealPanel" class="dealPanel" v-model="collapse">
      <Panel name="1">
        <p>股票质押业务场外质押数据上传
          <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          <span class="showButton" v-if="collapse.length>0">收起<i class="el-icon-arrow-up"></i></span>
          <span class="showButton" v-else>展开<i class="el-icon-arrow-down"></i></span>
        </p>
        <div slot="content">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="flexBox">
              <Form-item prop="startdate" id="startDateForm" label="交易日期">
                <Date-picker id="startDate" type="date" placeholder="选择交易日期"
                             v-model="formValidate.startdate" class="datePickerWidth"></Date-picker>
              </Form-item>
              <!--<div class="submitBtnBox">-->
              <!--<Button id="searchBtn" type="primary" @click="handleSubmit('formValidate');">查询</Button>-->
              <!--</div>-->
            </div>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Modal id="lookInfoPop" title="股票质押业务场外质押数据上传  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal"
           cancel-text>
      <br><b>一．	操作方式：</b>
      <br>1)	下载应用模板，并填写相关列数据，其中列头为绿色的列表示必填。未填全将会提示重新修正数据，不能导入。
      <br>2)	点击“浏览”选择待上传的数据文件，点击“数据检查”，即可对文档数据进行合规性校验，并回显不合规的行。鼠标移至不合规行的不合规单元格，即可显示不合规原因。
      <br>3)	数据校验至EXCL中有边框的行。
      <br>4)	仅当存在通过合规性校验的行，方可点击“上传数据”按钮。上传数据仅上传合规行。
      <br><b>二、容易出现的不合格情况及简单的调整要求</b>
      <br>1、日期使用中文描述或日期格式无法识别：
      <br>请校正为日期文本格式yyyy-mm-dd、yyyy/mm/dd、yyyymmdd

    </Modal>
    <div class="tableBox" id="tableData">
      <el-col :span="24">
        <Row class="dateBox">
          <div>
            <el-upload id="hyb00044" ref="upload" :on-error="onError" :on-change="onChange" accept=".xls,.xlsx"
                       :on-success="handleSuccessAccount" :data="uploadData" :headers="commonHeader" :action="uploadURL"
                       :before-upload="beforeUploadHandle" :auto-upload="false">
              <Button type="primary" style="margin-left: 15px" @click="downloadTempBtnClick">下载模板</Button>
              <Button slot="trigger" type="primary">浏览</Button>
              <Button size="small" type="primary" id="dataCheckBtn"  @click="dataCheck">数据检查</Button>
              <Button class="uploadExcel" id="uploadData" @click="uploadDataClick" type="primary" disabled>上传数据</Button>
              <Button id="operationBtn" type="primary" @click="operationBtnClick">操作记录</Button>
            </el-upload>
          </div>
          <div v-if="checkData">
            <div class="upload-list">上传行数：{{uploadLineTotal}}</div>
            <div class="upload-list">有效行数：{{validLine}}</div>
            <div class="upload-list">无效行数：<span class="upload-red">{{invalidLine}}</span></div>
          </div>
          <!--<div class="upload-list upload-green" v-if="uploadStatic">已上传成功！您可继续进行下一轮数据上传操作！</div>-->
          <div class="upload-list upload-red" v-if="uploadIsError">以下为无效数据，将鼠标移动至内容，可查看原因</div>
        </Row>
      </el-col>

    </div>

    <div class="tableTip"></div>
    <div class="dailyTableBox" id="showIviewTable">
      <el-table
        :data="failArray"
        v-if="rightArray.length == 0"
        :cell-class-name="cellClassHandle"
        @cell-mouse-enter="cellMouseEnterHandle"
        @cell-mouse-leave="cellMouseLeaveHandle"
        border
        style="width: 100%">
        <el-table-column :min-width="item.width" :formatter="formatterNumber" v-for="(item,index) in tableColumns1" :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </el-table>
      <el-table
        :data="rightArray"
        border
        v-if="rightArray.length > 0"
        id="hyb00044RightArray"
        style="width: 100%">
        <el-table-column :formatter="formatterNumber" v-for="(item,index) in tableColumns2" :key="Math.random()"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :width="item.width">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <span>确认上传{{formValidate.startdate.format('yyyy-MM-dd')}}的数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="dialogCertainClick">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible2">
      <span>上传成功,是否回显上传明细？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
         <el-button type="primary" @click="dialogCertainClick2">确定</el-button>
      </span>
    </el-dialog>


  </section>
</template>

<script>
  import 'whatwg-fetch';
  import {
    urlParams,
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    getUrlParams,
    validNum,
    commonGetReqParam,
    commonHeader,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1, tableColumns2} from '../assets/js/HYB_00044.js';
  import '../theme/threeCommon.less';
  import '../theme/fifteenCommon.less';

  export default {
    mounted: function () {//页面加载时执行
      // //获取URL地址参数
      // var urlParams = window.location.href;
      // var upfileParamsValue = {};
      // upfileParamsValue.signature = signatureA;
      // upfileParamsValue.Authorization = AuthorizationA;
      // this.upfileParams = upfileParamsValue;

      // console.log(this.$refs.haha.)
    },
    data() {
      return {
        // searchPanel: '1',
        collapse: '1',
        changeInfo: false,
        data1: [],
        returnN: 1,
        returnTotal: 0,
        tableData1: [],
        tableColumns1: tableColumns1,
        tableColumns2: tableColumns2,
        uploadArray: [],
        failArray: [],
        uploadData: {},
        successArray: [],
        uploadLineTotal: 0,
        validLine: 0,
        invalidLine: 0,
        uploadStatic: false,
        checkData: false,
        commonHeader: commonHeader,
        t: '',
        //文件解析参数
        // upfileParams: this.upfileParamsValue,
        uploadURL: '/dw/hyb/hyb_00044_check',
        uploadIsError: false,
        //  表格显示错误信息
        tableErrorIndexArr: [],
        tableErrorErrorArr: [],
        //日期初始化
        formValidate: {
          startdate: new Date()
        },
        ruleValidate: {
          startdate: [
            {required: true, type: 'date', message: '请选择查询日期', trigger: 'change'}
          ]
        },
        //  是否选择文件
        isUploadFile: '',
        uploadedFileObj: '',
        //  对话框
        dialogVisible: false,
        dialogVisible2: false,
        rightArray: [],
        tempArr: [],
        isHide: true,
      }
    },
    watch: {
      isUploadFile: function () {
        if (this.isUploadFile) {
          $('#dataCheckBtn').removeAttr('disabled')
        } else {
          $('#dataCheckBtn').attr('disabled', true)
        }
      }
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == '0'||prop=='index'||prop=='rowindex'||prop=='tradeDate'||prop=='secCode'){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      onError: function (err) {
        this.$alert("出错" + err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      },
      // 单元格className回调
      cellClassHandle: function (e) {
        if (e) {
          var rowArr = this.tableErrorIndexArr[e.rowIndex]
          if (rowArr) {
            for (var i = 0; i < rowArr.length; i++) {
              var obj = rowArr[i]
              for (var index in obj) {
                if (index == (e.columnIndex - 1)) {
                  return 'bgRed'
                }
              }
            }
          }
        }
        return ''
      },
      // 鼠标移入单元格
      cellMouseEnterHandle: function (row, col, cell, event) {
        this.cellMouseHandle(row, col, cell, event, 1)
      },
      //鼠标移出单元格
      cellMouseLeaveHandle: function (row, col, cell, event) {
        this.cellMouseHandle(row, col, cell, event, 2)
      },
      cellMouseHandle: function (row, col, cell, event, type) {
        var label = col.label
        var colIndex = ''
        for (var i = 0; i < this.tableColumns1.length; i++) {
          if (label == this.tableColumns1[i].title) {
            colIndex = i
          }
        }
        var rowIndex = this.failArray.indexOf(row)
        // console.log('rowIndex:', rowIndex, 'colIndex:', colIndex)
        var result = $(cell).hasClass('bgRed')
        if (result) {
          var erronMsgArr = this.tableErrorErrorArr[rowIndex]
          var erronIndexArr = this.tableErrorIndexArr[rowIndex]
          // console.log(erronIndexArr)
          var ind = ''
          erronIndexArr.forEach((ite, index) => {
            for (var k in ite) {
              if (parseInt(k) == (colIndex - 1)) ind = index
            }
          })
          // console.log(ind)
          var errorMsg = erronMsgArr[ind]

          $('.tableTip').css({
            'display': type == 1 ? 'block' : 'none',
            'left': type == 1 ? event.pageX + 15 + 'px' : '0',
            'top': type == 1 ? event.pageY + 15 + 'px' : '0',
          })
          $('.tableTip').html(errorMsg)
        }
      },
      //上传之前
      beforeUploadHandle: function (item) {
        var str = this.formValidate.startdate.format ? this.formValidate.startdate.format('yyyy-MM-dd') : this.formValidate.startdate
        this.uploadData.rptDte = str
        // this.commonHeader['Content-Type'] = '123'
        delete this.commonHeader['Content-Type']
        // return
      },
      // 下载模板
      downloadTempBtnClick: function () {
        window.open('/dw/hyb/hyb_00044_template?&signature=' + signatureA + '&userId=' + srcUseridA + '&userName=' + srcUsernameA + '&dwSessionid=' + dwSessionidA + '&Authorization=' + AuthorizationA)
      },
      /**
       * 上传Excel返回数据
       */
      handleSuccessAccount(response, file, fileList) {

        this.isHide = true
        this.rightArray = []
        // console.log(response, file)
        this.uploadIsError = false
        this.uploadStatic = true;
        this.failArray = []
        this.checkData = false;
        this.tableData1 = [];
        this.tableErrorIndexArr = []
        this.tableErrorErrorArr = []
        if (response.message != null) {
          this.$Message.warning(response.message);
          return;
        }
        ;
        this.uploadArray = [];
        if (response.resData) {
          this.uploadArray = response.resData;
        }
        this.uploadLineTotal = 0;
        this.validLine = 0;
        this.invalidLine = 0;
        this.tableData1 = [];
        if (this.uploadArray == '') {
          this.$Message.warning('请选择待上传文件！');
          return;
        }
        ;
        if (this.uploadArray) {
          this.checkData = true;
          let newArray = this.uploadArray;
          if (!(newArray.res == false)) {
            this.successArray = newArray.res;
            this.validLine = newArray.res.length;
            this.tableData1 = this.successArray;
            if (this.validLine > 0) {
              $("#uploadData").removeAttr('disabled');
            }
          }
          ;
          if (!(newArray.resErr == false)) {
            var self = this
            newArray.resErr.forEach((item, index) => {
              item['index'] = index + 1
            })
            this.failArray = newArray.resErr;
            this.invalidLine = newArray.resErr.length;
            this.uploadIsError = true
            setTimeout(function () {
              for (var i = 0; i < self.failArray.length; i++) {
                var obj = self.failArray[i]
                var temp = []
                var temp2 = []
                for (var key in obj) {
                  var v = obj[key]
                  var s = key.indexOf('-')
                  var k = parseInt(key.slice(s + 1))
                  if (s > 0) {
                    var oo = {}
                    oo[k] = k
                    temp2.push(v)
                    temp.push(oo)
                  }
                }
                self.tableErrorIndexArr.push(temp)
                self.tableErrorErrorArr.push(temp2)
              }
            }, 0)
          }
          ;
          this.uploadLineTotal = this.validLine + this.invalidLine;
        }
      },
      // 选择文件时
      onChange: function (file, fileList) {
        // console.log(111)

        // this.checkData = false
        this.isUploadFile = fileList.length > 0 ? true : false
      },
      // 确定上传数据
      dialogCertainClick: function () {
        this.isHide = false
        var _this = this;
        var obj = new FormData()
        obj.append('rptDte', this.uploadData.rptDte)   //日期
        obj.append('file', this.uploadedFileObj)       //文件
        this.dialogVisible = false
        this._fetch(fetch('/dw/hyb/hyb_00044_upload', {
          method: "POST",
          body: obj,
          mode: 'cors',
          headers: commonHeader
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
          _this.isHide = true
        }).then(data => {
          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          if (data.resData.res) {
            _this.$Message.success('上传数据成功!');
            _this.dialogVisible2 = true
            data.resData.res.forEach((item, index) => {
              item.isEff = '●'
            })
            _this.tempArr = data.resData.res
            // _this.rightArray = data.resData.res
          }
          _this.isHide = true
        });
      },
      // 回显，对话框
      dialogCertainClick2: function () {
        this.dialogVisible2 = false
        this.rightArray = this.tempArr
      },
      /**
       * 数据检查
       */
      dataCheck() {
        if($("input[name='file']")[0].files.length == 0){
          this.$Message.error('请选择待上传文件！')
          return
        }
        this.uploadedFileObj = $("input[name='file']")[0].files[0]
        if($("input[name='file']")[0].files.length > 0){
          this.isHide = false
        }
        this.uploadURL = '/dw/hyb/hyb_00044_check'
        this.$refs.upload.submit()
      },
      /**
       * 上传数据
       */
      uploadDataClick() {
        this.dialogVisible = true
      },
      /**
       * 设置fetch请求超时方法
       */
      _fetch: function (fetch_promise, timeout) {
        var abort_fn = null;
        var abortInfo = this;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
            $("#loadBox").addClass("hide");
            // abortInfo.$Message.warning('查询超时！请重试！');
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
      /**
       * 模版下载
       */
      // downloadModel: function () {
      //   void(window.open('/dw/download/template?type=HYB_00042&signature=' + signatureA + '&userId=' + srcUseridA + '&userName=' + srcUsernameA + '&dwSessionid=' + dwSessionidA + '&Authorization=' + AuthorizationA));
      // },
      //  操作记录
      operationBtnClick: function () {
        // var url ='#/HYB_00044_Operation_Detail'+'?signature=' + signatureA + '&userId=' + srcUseridA + '&userName=' + srcUsernameA + '&dwSessionid=' + dwSessionidA + '&Authorization=' + AuthorizationA
        // window.open(url,'_blank')
        // this.$router.push('/HYB_00044_Operation_Detail')
        jump2NewPage('HYB_00044_Operation_Detail', {
          // data:{},
          // title:'账户明细'
        })
      }
    },

  }
</script>

<style>
  #hyb00044RightArray table td:nth-child(2) {
    color: green;
  }

  #hyb00044 .el-upload-list {
    display: none;
  }

  #hyb00044 #startDateForm > div {
    display: flex;
    margin-left: 0 !important;
    margin: 20px 0;
  }

  /*.ivu-table-tbody tr:nth-last-child(1){*/
  /*display: none;*/
  /*}*/
  .tableTip {
    width: 120px;
    /*height: 30px;*/
    word-wrap: break-word;
    border: 1px solid #eeeeee;
    background-color: #29a7de;
    color: #eee;
    border-radius: 5px;
    text-align: center;
    /*line-height: 30px;*/
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    z-index: 2;
  }

  .ivu-modal-body {
    max-height: 400px;
    overflow-y: auto;
  }

  .dailyTableBox {
    /*width: 1000px;*/
    margin: 10px 30px;
    position: relative;
    clear: both;
  }

  .dailyContainer {
    width: 1000px;
    height: auto;
    margin: 20px auto;
    display: none;
  }

  .daily1, .dailyHandle {
    width: 1000px;
    margin: 0 auto;
    background-color: #e3e8ee;
    border-top: 1px solid #e3e8ee;
    border-left: 1px solid #e3e8ee;
  }

  .dailyHandle tr th {
    width: auto;
    height: 34px;
    line-height: 34px;
    background-color: #2baee9;
    color: #fff;
    text-align: center;
    border-right: 1px solid #e3e8ee;
    border-bottom: 1px solid #e3e8ee;
  }

  .dailyHandle tr td {
    width: auto;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    padding: 0 10px;
    border-right: 1px solid #e3e8ee;
    border-bottom: 1px solid #e3e8ee;
  }

  .daily1 tr th {
    width: 333px;
    height: 34px;
    line-height: 34px;
    background-color: #f5f7f9;
    text-align: center;
    border-right: 1px solid #e3e8ee;
    border-bottom: 1px solid #e3e8ee;
  }

  .daily1 tr td {
    width: 313px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    padding: 0 10px;
    border-right: 1px solid #e3e8ee;
    border-bottom: 1px solid #e3e8ee;
  }

  .dailyListTitle {
    width: auto;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 15px;
  }

  .ivu-collapse {
    border: none;
  }

  .dailyShowBox {
    width: 1000px;
    margin: 0 auto;
  }

  .searchAccountBox {
    padding: 0;
    min-height: 100px;
  }

  .searchDailyBtn {
    margin-right: 0;
  }

  .w150 {
    width: 150px;
  }

  .w699 {
    width: 699px;
  }

  .handleBtn {
    margin: 0 5px;
  }

  .pageModule {
    padding-top: 10px;
  }

  .datePickerWidth {
    width: 360px;
  }

  th.ivu-table-column-left {
    text-align: center;
  }

  th.ivu-table-column-right {
    text-align: center;
  }

  .uploadExcel {
    margin: 0 10px 0 0;
  }

  .upload-list {
    height: 24px;
    line-height: 24px;
    margin: 5px 0 0 0;
  }

  .upload-green {
    color: #00cc66;
  }

  .upload-red {
    color: #ff3300;
  }

  .ivu-table th {
    background-color: #29a7de;
    color: #fff;
  }

  .bgRed {
    background-color: red !important;
  }

  .searchAccountBox .ivu-upload {
    width: 135px;
  }

  .ivu-table-wrapper {
    height: auto !important;
  }

  #dataCheckBtn {
    margin: 0 10px;
  }

  #operationBtn {
    margin-left: 5px;
  }

  .infoTitle {
    margin-bottom: 10px;
  }
</style>
