<template>
  <section class="constWidth">
    <!--头部logo-->
    <header></header>
    <!--标题框折叠面板-->
    <Collapse id="dealPanel" class="dealPanel" v-model="searchPanel"  >
      <Panel name="1">
        股票质押利率数据上传
        <span id="lookInfoLink" class="lookInfo" @click="changeInfo = true">查看统计口径</span>
        <div slot="content" class="searchAccountBox">
          <Row>
            <Col>
            <div class="dailyShowBox">
              <div slot="content" class="searchAccountBox">

                <Modal id="lookInfoPop" title="股票质押利率数据上传  统计口径说明" v-model="changeInfo"
                       class-name="vertical-center-modal" cancel-text>
                  <h3>操作方式</h3>
                  <p>
                    1.下载应用模板，并填写相关列数据，其中列头为绿色的列表示必填。<br>
                    2.点击“浏览”选择待上传的数据文件，点击“数据检查”，即可对文档数据进行合规性校验，<br>
                    并回显不合规的行。鼠标移至不合规行的不合规单元格，即可显示不合规原因。<br>
                    3.仅当存在通过合规性校验的行，方可点击“上传数据”按钮。上传数据仅上传合规行。<br>
                  </p>
                  <h3>容易出现的不合格情况及简单的调整要求</h3>
                  <p> 1.日期使用中文描述或日期格式无法识别：
                    请校正为日期文本格式yyyy-mm-dd、yyyy/mm/dd、yyyymmdd<br>
                    2、是否属于限售股份，直接使用“流通股”等文字，请先判定后改为“是”/“否”。<br>
                  </p>
                </Modal>
                <Row class="dateBox">
                  <div>
                    <Upload :action="uploadURL" :headers="upfileParams"
                            accept=".xls" :max-size="2048"
                            :on-success="handleSuccessAccount" :before-upload="beforeUploadHandle">
                      <Button id="importAccountBtn" type="primary" class="uploadExcel">请选择待上传文件</Button>
                    </Upload>
                    <Button class="uploadExcel" type="primary" @click="dataCheck">数据检查</Button>
                    <Button class="uploadExcel" id="uploadData" @click="uploadDataClick" type="primary" disabled>上传数据
                    </Button>
                    <Button id="templateBtn" type="primary" @click="downloadModel()">模板下载</Button>
                  </div>
                  <div v-if="checkData">
                    <div class="upload-list">上传行数：{{uploadLineTotal}}</div>
                    <div class="upload-list">有效行数：{{validLine}}</div>
                    <div class="upload-list">无效行数：<span class="upload-red">{{invalidLine}}</span></div>
                  </div>
                  <div class="upload-list upload-green" v-if="uploadStatic">已上传成功！您可继续进行下一轮数据上传操作！</div>
                  <div class="upload-list upload-red" v-if="uploadIsError">以下为无效数据，将鼠标移动至内容，可查看原因</div>
                </Row>
              </div>
            </div>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <!--置顶按钮-->
    <totop></totop>

    <!--数据表格-->
    <Spin id="loadBox" fix class="loadBox hide">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>

    <div class="tableTip"></div>
    <div class="dailyTableBox" id="showIviewTable">

      <fastTable :width="3500" :bwidth="3462" :columns="tableColumns1" :data="failArray"></fastTable>
      <!--<el-table-->
      <!--:data="failArray"-->
      <!--border-->
      <!--style="width: 100%">-->
      <!--<el-table-column v-for="(item,index) in tableColumns1" :key="index"-->
      <!--:prop="item.key"-->
      <!--:label="item.title"-->
      <!--:align="item.align"-->
      <!--:width="item.width">-->
      <!--</el-table-column>-->
      <!--</el-table>-->
    </div>
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
    commonHeader
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/HYB_00042.js';
  import '../theme/threeCommon.less';

  export default {
    mounted: function () {//页面加载时执行
      //获取URL地址参数
      var urlParams = window.location.href;
      var upfileParamsValue = {};
      upfileParamsValue.signature = signatureA;
      upfileParamsValue.Authorization = AuthorizationA;
      this.upfileParams = upfileParamsValue;
      var length = $('.ivu-table-tbody tr.ivu-table-cell').length

      if (length == 1) {
        $('.ivu-table-tbody tr.ivu-table-cell').css('display', 'none')
      }
      var str = $('.ivu-table-tbody tr.ivu-table-cell td:nth-child(1) span').text()
      if (str == '暂无数据') {
        $('.ivu-table-tbody tr.ivu-table-cell td:nth-child(1)').css({'background': '#fff'})
      }
    },
    data() {
      return {
        searchPanel: '1',
        changeInfo: false,
        data1: [],
        returnN: 1,
        returnTotal: 0,
        tableData1: [],
        tableColumns1: tableColumns1,
        uploadArray: [],
        failArray: [],
        successArray: [],
        uploadLineTotal: 0,
        validLine: 0,
        invalidLine: 0,
        uploadStatic: false,
        checkData: false,
        t: '',
        //文件解析参数
        upfileParams: this.upfileParamsValue,
        uploadURL: '/dw/upload/excel?uploadType=HYB_00042',
        uploadIsError: false
      }
    },

    methods: {
      //上传之前
      beforeUploadHandle: function (item) {
        console.log(item)
        this.uploadFileName = item.name
        // return
      },
      /**
       * 上传Excel返回数据
       */
      handleSuccessAccount(response, file, fileList) {

        console.log(response, file, fileList)
        $("#uploadData").attr('disabled', 'disabled');
        this.uploadIsError = false
        this.uploadStatic = true;
        this.failArray = []
        this.checkData = false;
        this.tableData1 = [];
        if (response.message != null) {
          this.$Message.warning(response.message);
          return;
        }
        ;
        this.uploadArray = [];
        if (response.resData) {
          this.uploadArray = response.resData;
        }
      },
      /**
       * 数据检查
       */
      dataCheck() {
        this.uploadLineTotal = 0;
        this.validLine = 0;
        this.invalidLine = 0;
        this.tableData1 = [];
        if (this.uploadArray == '') {
          this.$Message.error('请选择待上传文件！');
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
            this.failArray = newArray.resErr;
            this.invalidLine = newArray.resErr.length;
            this.uploadIsError = true
            var self = this
            setTimeout(function () {
              var indexArr = []
              var errorArr = []
              for (var j = 0; j < $('.ivu-table-tbody tr.ivu-table-cell').length - 2; j++) {
                var tdArr = $('.ivu-table-tbody tr.ivu-table-cell')[j]
                tdArr = $(tdArr).children()
                for (var i = 0; i < self.failArray.length; i++) {
                  var obj = self.failArray[i]
                  var temp = []
                  var temp2 = []
                  for (var key in obj) {
                    var v = obj[key]
                    var s = key.indexOf('-')
                    var k = parseInt(key.slice(s + 1))
                    if (s > 0) {
                      temp2.push(v)
                      temp.push(k)
                    }
                  }
                  indexArr.push(temp)
                  errorArr.push(temp2)
                }
              }
              for (var i = 0; i < indexArr.length; i++) {
                var bigArr = indexArr[i]
                var bigArr2 = errorArr[i]
                var tdArr = $('.ivu-table-tbody tr.ivu-table-cell')[i]
                tdArr = $(tdArr).children()
                for(var j = 0; j < bigArr.length; j++){
                  (function (j) {
                    var index = bigArr[j]
                    var error = bigArr2[j]
                    var td = tdArr[index]
                    $(td).addClass('bg-red')
                    td.addEventListener('mousemove',function (e) {
                      var x = e.pageX+15
                      var y = e.pageY+15
                      $('.tableTip').css({
                        'display':'block',
                        'left':x+'px',
                        'top':y+'px',
                      })
                      $('.tableTip').html(error)
                    })
                    td.addEventListener('mouseleave',function (e) {
                      $('.tableTip').css({
                        'display':'none',
                            'left':'0',
                            'top':'0',
                      })
                      $('.tableTip').html('')
                    })
                  })(j)
                }
              }
            }, 0)
          }
          ;
          this.uploadLineTotal = this.validLine + this.invalidLine;
        }
      },
      /**
       * 上传数据
       */
      uploadDataClick() {
        var r = confirm('确定要上传数据吗？')
        if (!r) return
        var _this = this;
        //接口请求处理
        const url = '/dw/upload/data';
        //查询传送的参数
        console.log('正确数据：', this.tableData1)
        this.searchParams = {
          "data": this.tableData1,
          "uploadType": 'HYB_00042',
          "userId": srcUseridA,
          "userName": srcUsernameA
        };
        _this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(_this.searchParams),
          mode: 'cors',
          headers:commonHeader
        }), 6000).then(function (response) {
          return response.json()
        }, function (error) {
          $("#loadBox").addClass("hide");
          _this.$Message.error('系统繁忙，刷新页面!');
        }).then(data => {
          console.log(data)
          if (data.success) {
            this.$Message.success('上传数据成功！');
          }
          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          ;
          //取数据
          var dataResponse = data;
          if (dataResponse.success) {
            _this.uploadStatic = true;
          }
          ;
        });
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
      downloadModel: function () {
        void(window.open('/dw/download/template?type=HYB_00042&signature=' + signatureA + '&userId=' + srcUseridA + '&userName=' + srcUsernameA + '&dwSessionid=' + dwSessionidA + '&Authorization=' + AuthorizationA + commonGetReqParam));
      }
    }
  }
</script>

<style>
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
    width: 1000px;
    margin: 10px auto;
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
    min-height: 50px;
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

  .bg-red {
    background-color: red !important;
  }

  .searchAccountBox .ivu-upload {
    width: 135px;
  }

  .ivu-table-wrapper {
    height: auto !important;
  }
</style>
