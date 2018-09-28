<template>
  <section id="sys31052">
    <!--头部logo-->
    <header></header>
    <!-- 折叠栏 -->
    <div class="dealPanel ivu-collapse" id="dealPanel">
      <div class="ivu-collapse-item ivu-collapse-item-active">
        <div class="ivu-collapse-header">
          <!-- 始终显示区域 -->
          <p>交易系统代码维护
            <span id="lookInfoLink" class="lookInfo" @click.stop="changeInfo = true">查看统计口径</span>
          </p>
        </div>
        <div class="ivu-collapse-content">
          <div class="ivu-collapse-content-box">
            <div class="flexBox">
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="addFlag = true">新增</Button>
              </div>
              <div class="submitBtnBox">
                <Button id="searchBtn" type="primary" @click="fetchCodeList">刷新</Button>
              </div>
            </div>
            <!-- 新增按钮弹出的选择输入悬浮框 -->
            <el-dialog title="新增" :visible.sync="addFlag">
              <p id="addError" class="redtext listlength"></p>
              <el-form label-position="left" status-icon :model="form" :rules="rules" ref="form">
                <div class="addDialogItem">
                  <el-form-item label="第1位:" prop="sec1" label-width="120px">
                    <div style="inputAddStyle">
                      <el-input v-model="form.sec_code_1"
                                :maxlength="9" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="第2-6位:" label-width="120px" prop="sec2">
                    <div style="inputAddStyle">
                      <el-input :maxlength="9"
                                v-model="form.sec_code_2_6" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="类别:" label-width="120px" prop="sec3">
                    <div style="inputAddStyle">
                      <el-input :maxlength="100"  v-model="form.biz_type" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="业务定义:" label-width="120px" prop="sec4">
                    <div style="inputAddStyle">
                      <el-input
                        :maxlength="100"  v-model="form.biz_desc" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="可分配数量:" label-width="120px" prop="sec5">
                    <div style="inputAddStyle">
                      <el-input  :maxlength="9" v-model="form.allot_num" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="代码生效日期:" label-width="120px" prop="sec6">

                    <Date-picker id="startDate" type="date" placeholder="选择开始日期"
                                 v-model="form.biz_eff_date" class="datePickerWidth"></Date-picker>

                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="变动展示:" label-width="120px" prop="sec7">
                    <Checkbox v-model="form.maint_type" id="maint_type" label=""></Checkbox>

                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="备注:" label-width="120px" prop="sec8">
                    <el-input  :maxlength="100"  v-model="form.note" :rows="4" type="textarea" auto-complete="off"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">

                <button class="ivu-btn ivu-btn-primary" type="primary" @click="addCode('form')">确定</button>
                <button class="ivu-btn " style="margin-left: 11px;" @click="addFlag=false">取消</button>

              </div>
            </el-dialog>
            <el-dialog title="编辑" :visible.sync="editFlag">
              <el-form label-position="left" :model="formEdit" :rules="rules1" ref="formEdit">

                <div class="addDialogItem">
                  <el-form-item label="第1位:" prop="seco1" label-width="120px">
                    <div style="inputAddStyle">
                      <el-input  :maxlength="9"  disabled v-model="formEdit.sec_code_1" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>

                </div>
                <div class="addDialogItem">
                  <el-form-item label="第2-6位:" label-width="120px" prop="seco2">
                    <div style="inputAddStyle">
                      <el-input  :maxlength="9"  disabled v-model="formEdit.sec_code_2_6" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="类别:" label-width="120px" prop="seco3">
                    <div style="inputAddStyle">
                      <el-input :maxlength="100"  v-model="formEdit.biz_type" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="业务定义:" label-width="120px" prop="seco4">
                    <div style="inputAddStyle">
                      <el-input :maxlength="100"  v-model="formEdit.biz_desc" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="可分配数量:" label-width="120px" prop="seco5">
                    <div style="inputAddStyle">
                      <el-input :maxlength="9"  v-model="formEdit.allot_num" size="small" auto-complete="off"></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="代码生效日期:" label-width="120px"  prop="seco6" >

                    <Date-picker id="editDate" type="date" placeholder="选择开始日期"
                                 v-model="formEdit.biz_eff_date" class="datePickerWidth"></Date-picker>

                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="变动展示:" label-width="120px"  prop="seco7">
                    <Checkbox v-model="formEdit.maint_type" id="maint_type" label=""></Checkbox>

                  </el-form-item>
                </div>
                <div class="addDialogItem">
                  <el-form-item label="备注:" label-width="120px"  prop="seco8">
                    <el-input  :maxlength="100" v-model="formEdit.note" :rows="4" type="textarea" auto-complete="off"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">

                <button class="ivu-btn ivu-btn-primary" type="primary" @click="editCode('formEdit')">确定</button>
                <button class="ivu-btn " style="margin-left: 11px;" @click="editFlag=false">取消</button>

              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <!-- 加载动画 -->
    <Spin id="loadBox" fix class="loadBox hide">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <!-- 查看统计路径悬浮框 -->
    <Modal id="lookInfoPop" title="交易系统代码维护  统计口径说明" v-model="changeInfo"
           class-name="vertical-center-modal" cancel-text>
     <b> 一．数据说明</b>
      <br>上海证券交易所交易系统使用的所有证券代码，包括辅助代码
      <br><b> 二．指标说明</b>
      <br>1.第2-6位根据实际的代码分配规则填写，可能为2位，也可能为6位
      <br>2.代码生效日期指该代码段的代码出现在行情，产品基础信息，固定收益平台基础信息，质押券对应信息，报价回购基本信息中的最早日期
      <br>3.所属区间：A,B,C
      <br>(1)A绿色区域：已使用代码数量少于可分配代码数量的60%，为正常状态；
      <br>(2)B橙色预警：已使用代码数量达到可分配代码数量的60%（含）至80% 之间，为轻微警告级别；
      <br>(3)C红色预警：已使用代码数量超过可分配代码数量的80%（含）以上，为严重警告级别；
      <br>4.变动标识：是/否。“是”表示在代码管理月报中“本期代码变动情况统计”中进行统计，“否”表示不统计
      <br><b> 三．其他说明</b>
      <br>每个月的代码段数据变更维护必须在每月最后一个交易日18:00之前完成，否则生成的“交易系统代码管理月报”将不包含未维护的代码段变更数据。
    </Modal>
    <!-- 数据表 -->
    <div class="tableBox">
      <p id="infoTableList" class="redtext listlength"></p>
      <el-table
        :data="tableData1"
        border
        v-loading="queryResLoadMain"
        element-loading-spinner="el-icon-loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-background="rgba(0,0,0,0.3)"
        style="width: 100%;">
        <!-- 表头 -->
        <el-table-column label="操作" align="center" :width="160">
          <template scope="scope">
            <button class="ivu-btn ivu-btn-primary" size="mini" @click="handleEdit(scope.$index,scope.row)">
              编辑
            </button>
            <button class="ivu-btn ivu-btn-primary" size="mini" @click="removeCode(scope.$index,scope.row)">
              删除
            </button>
          </template>
        </el-table-column>
        <el-table-column v-for="(item,index) in tableColumns1" :key="index"
                         :prop="item.key"
                         :label="item.title"
                         :align="item.align"
                         :formatter="fn_formatter"
                         :width="item.width">
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
  import 'whatwg-fetch';
  import {
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    commonHeader,
    commonGetReqParam,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns1} from '../assets/js/SYS_31051.js';
  import '../theme/threeCommon.less';

  export default {
    mounted: function () {//页面加载时执行
      this.fetchCodeList();

    },
    data() {
      // 新增
      // 第1位
      let checkSec1 = (rule, value, callback) => {
        let reg = new RegExp(/[^\d]/g,'');
        if(!this.form.sec_code_1){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.form.sec_code_1))) {
          return callback(new Error('请输入数字'));
        }else if (this.form.sec_code_1.length > 1) {
          return callback(new Error('只能输入一位数字'));
        }else {
          callback()
        }
      };
      // 第2-6位:
      let checkSec2 = (rule, value, callback) => {
        let reg = new RegExp(/[^\d]/g,'');
        if(!this.form.sec_code_2_6){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.form.sec_code_2_6))) {
          return callback(new Error('请输入数字'));
        }else if (this.form.sec_code_2_6.length > 5) {
          return callback(new Error('只能输入五位数字'));
        }else {
          callback()
        }
      };
      // 类别:
      let checkSec3 = (rule, value, callback) => {
        var reg = /(#|!|-|;|'|%|>|<|\\|\*|DROP|CREATE|INSERT|UPDATE|DELETE|ANALYZE|TRUNCATE)/;
        if(!this.form.biz_type){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.form.biz_type))) {
          return callback(new Error('不能为特殊字符'));
        }else if (this.form.biz_type.length > 120) {
          return callback(new Error('最多120字符'));
        }else {
          callback()
        }
      };
      // 业务定义:
      let checkSec4 = (rule, value, callback) => {
        var reg = /(#|!|-|;|'|%|>|<|\\|\*|DROP|CREATE|INSERT|UPDATE|DELETE|ANALYZE|TRUNCATE)/;
        if(!this.form.biz_desc){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.form.biz_desc))) {
          return callback(new Error('不能为特殊字符'));
        }else if (this.form.biz_desc.length > 500) {
          return callback(new Error('最多500字符'));
        }else {
          callback()
        }
      };
      // 可分配数量:
      let checkSec5 = (rule, value, callback) => {
        let reg = new RegExp(/[^\d]/g,'');
        if(!this.form.allot_num){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.form.allot_num))) {
          return callback(new Error('只能输入数字'));
        }else {
          callback()
        }
      };
      // 代码生效日期:
      let checkSec6 = (rule, value, callback) => {
        if(!this.form.biz_eff_date){
          return callback(new Error('不能为空'));
        }else {
          callback()
        }
      };
      // 备注:
      let checkSec8 = (rule, value, callback) => {
        var reg = /(#|!|-|;|'|%|>|<|\\|\*|DROP|CREATE|INSERT|UPDATE|DELETE|ANALYZE|TRUNCATE)/;
        if ((reg.test(this.form.note))) {
          return callback(new Error('不能为特殊字符'));
        }else if (this.form.note.length > 500) {
          return callback(new Error('最多500字符'));
        }else {
          callback()
        }
      };

      // 编辑
      // 类别:
      let checkSecs3 = (rule, value, callback) => {
        var reg = /(#|!|-|;|'|%|>|<|\\|\*|DROP|CREATE|INSERT|UPDATE|DELETE|ANALYZE|TRUNCATE)/;
        if(!this. formEdit.biz_type){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.formEdit.biz_type))) {
          return callback(new Error('不能为特殊字符'));
        }else if (this.formEdit.biz_type.length > 120) {
          return callback(new Error('最多120字符'));
        }else {
          callback()
        }
      };
      // 业务定义:
      let checkSecs4 = (rule, value, callback) => {
        var reg = /(#|!|-|;|'|%|>|<|\\|\*|DROP|CREATE|INSERT|UPDATE|DELETE|ANALYZE|TRUNCATE)/;
        if(!this.formEdit.biz_desc){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.formEdit.biz_desc))) {
          return callback(new Error('不能为特殊字符'));
        }else if (this.formEdit.biz_desc.length > 500) {
          return callback(new Error('最多500字符'));
        }else {
          callback()
        }
      };
      // 可分配数量:
      let checkSecs5 = (rule, value, callback) => {
        let reg = new RegExp(/[^\d]/g,'');
        if(!this.formEdit.allot_num){
          return callback(new Error('不能为空'));
        }else if ((reg.test(this.formEdit.allot_num))) {
          return callback(new Error('只能输入数字'));
        }else {
          callback()
        }
      };
      // 代码生效日期:
      let checkSecs6 = (rule, value, callback) => {
        if(!this.formEdit.biz_eff_date){
          return callback(new Error('不能为空'));
        }else {
          callback()
        }
      };
      // 备注:
      let checkSecs8 = (rule, value, callback) => {
        var reg = /(#|!|-|;|'|%|>|<|\\|\*|DROP|CREATE|INSERT|UPDATE|DELETE|ANALYZE|TRUNCATE)/;
        if ((reg.test(this.formEdit.note))) {
          return callback(new Error('不能为特殊字符'));
        }else if (this.formEdit.note.length > 500) {
          return callback(new Error('最多500字符'));
        }else {
          callback()
        }
      };

      return {
        queryResLoadMain:false,
        form: {
          sec_code_1: '',//第1位
          sec_code_2_6: '',//第2-6位
          biz_type: '',//类别
          biz_desc: '',//业务定义
          allot_num: '',//可分配数量
          maint_type: false,//变动标识
          note: '',//备注
          biz_eff_date: '',//代码生效日期
        },
        formEdit: {
          sec_code_1: '',//第1位
          sec_code_2_6: '',//第2-6位
          biz_type: '',//类别
          biz_desc: '',//业务定义
          allot_num: '',//可分配数量
          maint_type: false,//变动标识
          note: '',//备注
          biz_eff_date: '',//代码生效日期
        },
        rules: {
          sec1:[
            {validator:checkSec1, trigger:'blur'},
          ],
          sec2:[
            {validator:checkSec2, trigger:'blur'}
          ],
          sec3:[
            {validator:checkSec3, trigger:'blur'}
          ],
          sec4:[
            {validator:checkSec4, trigger:'blur'}
          ],
          sec5:[
            {validator:checkSec5, trigger:'blur'}
          ],
          sec6:[
            {validator:checkSec6, trigger:'blur'}
          ],
          sec8:[
            {validator:checkSec8, trigger:'blur'}
          ],
        },
        rules1: {
          seco3:[
            {validator:checkSecs3, trigger:'blur'}
          ],
          seco4:[
            {validator:checkSecs4, trigger:'blur'}
          ],
          seco5:[
            {validator:checkSecs5, trigger:'blur'}
          ],
          seco6:[
            {validator:checkSecs6, trigger:'blur'}
          ],
          seco8:[
            {validator:checkSecs8, trigger:'blur'}
          ],
        },
        collapse:'1',
        addFlag: false,
        editFlag: false,
        changeInfo: false,
        returnN: 1,
        returnTotal: 0,
        tableData1: [],
        tableColumns1: tableColumns1,

        t: '',

      }
    },

    methods: {
      // 列：格式化字符
      fn_formatter:function (row,col,cellValue) {
        let prop = col.property;
        // if(prop !=='date' || prop !== 'plate_name' ){   // 不被格式化千分位的字段

        // 需要格式化千分位的字段
        if(prop =='biz_desc' || prop == 'de_flag'){
          return formatTbousandth(cellValue)
        }else {
          return cellValue
        }
      },
      // 编辑
      handleEdit: function (index, row) {
        this.editFlag = true;
        this.formEdit.sec_code_1 = row.sec_code_1;
        this.formEdit.sec_code_2_6 = row.sec_code_2_6;
        this.formEdit.biz_type = row.biz_type;
        this.formEdit.biz_desc = row.biz_desc;
        this.formEdit.allot_num = row.allot_num;
        this.formEdit.note = row.note;
        this.formEdit.biz_eff_date = new Date(row.biz_eff_date);
        if (row.maint_type == "Y") {
          this.formEdit.maint_type = true;

        } else {
          this.formEdit.maint_type = false;
        }
      },

      /**
       * 获取list
       */
      fetchCodeList: function () {
        this.queryResLoadMain = true;
        this.searchParams = {
          "userId": srcUseridA,
          "userName": srcUsernameA,
        };
        var _this = this;
        this._fetch(fetch("/dw/sys/sys31051", {
          method: "POST",
          body: JSON.stringify(_this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {

          _this.$Message.error('系统繁忙，刷新页面!');
          _this.isHide = true;
        }).then(data => {
          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          ;
          this.queryResLoadMain = false;
          this.isHide = true;
          //取数据

          var rtnStatic = data.success;
          var dataError = data.message;
          if (rtnStatic == false) {
            $("#loadBox").addClass("hide");
            this.$alert("查询失败，" + dataError,'错误',{
              confirmButtonText:'确定',
              type: 'error'
            })
            _this.tableData1 = [];
            _this.dealitems = 0;
            // $("#exportCurrent").attr("disabled");
          } else {
            var dataResponse = data.resData.result[0].data;
            var datalength = data.resData.result[0].size;
            if (dataResponse.length == 0 || datalength == 0) {
              $("#loadBox").addClass("hide");
              _this.tableData1 = [];
              _this.dealitems = 0;
              _this.$Message.warning('查询无数据！');
              // $("#exportCurrent").attr("disabled");
            } else {
              _this.dealitems = datalength;
              _this.dataArrayAll = dataResponse;//保存所有数据
              _this.returnTotal = datalength;

              _this.tableData1 = _this.dataArrayAll;

              // $("#exportCurrent").removeAttr("disabled");
              _this.isHide = true;
              //查询结果提示变化1
              $("#infoTableList").html("查询结果共 " + this.dealitems + " 条记录");
              //隐藏加载中
              $("#loadBox").addClass("hide");
            }
          }
        });
      },
      /**
       *  add code
       */
      addCode: function (formName) {
        this.$refs[formName].validate(function (valid) {
          if(!valid){
            return;
          }else {
            //日期格式验证
            var r = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
            var startDateA = $("#startDate .ivu-input").val();
            if (r.test(startDateA) == false) {
              this.$Message.error('请输入正确日期！');
              $("#startDate").addClass("ivu-form-item-error");
              return;
            }
            $("#startDate").removeClass("ivu-form-item-error");

            this.searchParams = {
              "userId": srcUseridA,
              "userName": srcUsernameA,
              "secCode_1":this.form.sec_code_1,
              "secCode_2_6":this.form.sec_code_2_6,
              "bizType":this.form.biz_type,
              "bizDesc":this.form.biz_desc,
              "allotNum":this.form.allot_num,
              "maintType":this.form.maint_type==true?"Y":"N",
              "note":this.form.note,
              "bizEffDate":this.form.biz_eff_date!=""?this.form.biz_eff_date.format('yyyy-MM-dd'):""
            };
            var _this = this;
               //判断是否重复
             this._fetch(fetch("/dw/sys/sys31051unique", {
              method: "POST",
              body: JSON.stringify(_this.searchParams),
              mode: 'cors',
              headers: commonHeader
            }), 600000).then(function (response) {
              return response.json()
            }, function (error) {

              _this.$Message.error('系统繁忙，刷新页面!');
              _this.isHide = true;
            }).then(data => {
              if (_this.t != '') {
                clearTimeout(_this.t);
              }
              ;

              _this.isHide = true;
              var rtnStatic = data.success;
              var dataError = data.message;
              if(rtnStatic==true){

                _this._fetch(fetch("/dw/sys/sys31051insert", {
              method: "POST",
              body: JSON.stringify(_this.searchParams),
              mode: 'cors',
              headers: commonHeader
            }), 600000).then(function (response) {
              return response.json()
            }, function (error) {

              _this.$Message.error('系统繁忙，刷新页面!');
              _this.isHide = true;
            }).then(data => {
              if (_this.t != '') {
                clearTimeout(_this.t);
              }
              ;
              _this.fetchCodeList();
              _this.isHide = true;
              var rtnStatic = data.success;
              var dataError = data.message;
              if(data.resData!=null){
                if(data.resData.status==true){
                  _this.$Message.warning("新增成功！");
                }else {
                  $("#loadBox").addClass("hide");
                  _this.$Message.warning("出错" + dataError);
                }
              }else {
                _this.$Message.warning('新增出错！');
              }
            });

            _this.form={
              sec_code_1:'',//第1位
              sec_code_2_6:'',//第2-6位
              biz_type:'',//类别
              biz_desc:'',//业务定义
              allot_num:'',//可分配数量
              maint_type:false,//变动标识
              note:'',//备注
              biz_eff_date:'',//代码生效日期
            };

             this.addFlag=false;
             $("#addError").html('');

              }else {
                if(dataError=="1"){
                   $("#addError").html('第一位和第2-6位代码已存在！');
                   _this.$Message.warning('第一位和第2-6位代码已存在！');
                }else{
                    $("#addError").html('系统繁忙！');
                  _this.$Message.warning('系统繁忙！');
                }

              }
            });


          }
        }.bind(this));
      },

      /**
       *  edit code
       */
      editCode: function (formName) {
        this.$refs[formName].validate(function (valid) {
          if(!valid){
            return;
          }else {
            //日期格式验证
            var r =  /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
            var startDateA = $("#editDate .ivu-input").val();
            if (r.test(startDateA) == false) {
              this.$Message.error('请输入正确日期！');
              $("#editDate").addClass("ivu-form-item-error");
              return;
            }
            $("#editDate").removeClass("ivu-form-item-error");

            this.editFlag = false;

            this.searchParams = {
              "userId": srcUseridA,
              "userName": srcUsernameA,
              "secCode_1": this.formEdit.sec_code_1,
              "secCode_2_6": this.formEdit.sec_code_2_6,
              "bizType": this.formEdit.biz_type,
              "bizDesc": this.formEdit.biz_desc,
              "allotNum": this.formEdit.allot_num,
              "maintType": this.formEdit.maint_type == true ? "Y" : "N",
              "note": this.formEdit.note,
              "bizEffDate": this.formEdit.biz_eff_date != "" ? this.formEdit.biz_eff_date.format('yyyy-MM-dd') : ""
            };
            var _this = this;
            this._fetch(fetch("/dw/sys/sys31051update", {
              method: "POST",
              body: JSON.stringify(_this.searchParams),
              mode: 'cors',
              headers: commonHeader
            }), 600000).then(function (response) {
              return response.json()
            }, function (error) {

              _this.$Message.error('系统繁忙，刷新页面!');
              _this.isHide = true;
            }).then(data => {
              if (_this.t != '') {
                clearTimeout(_this.t);
              }
              ;

              _this.fetchCodeList();
              this.isHide = true;
              var rtnStatic = data.success;
              var dataError = data.message;
              if(data.resData!=null){
                if(data.resData.status==true){
                  _this.$Message.warning("更新成功！");
                }else {
                  $("#loadBox").addClass("hide");
                  _this.$Message.warning("出错" + dataError);
                }
              }else {
                _this.$Message.warning('更新出错！');
              }
            });
          }
        }.bind(this));
      },
      /**
       *  remove code
       */
      removeCode: function (index, row) {
        this.searchParams = {
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "secCode_1": row.sec_code_1,
          "secCode_2_6": row.sec_code_2_6,

        };
        var _this = this;
        this._fetch(fetch("/dw/sys/sys31051delete", {
          method: "POST",
          body: JSON.stringify(_this.searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000).then(function (response) {
          return response.json()
        }, function (error) {

          _this.$Message.error('系统繁忙，刷新页面!');
          _this.isHide = true;
        }).then(data => {
          if (_this.t != '') {
            clearTimeout(_this.t);
          }
          ;

          _this.fetchCodeList();
          this.isHide = true;
          var rtnStatic = data.success;
          var dataError = data.message;
          if(data.resData!=null){
            if(data.resData.status==true){
              _this.$Message.warning("删除成功！");
            }else {
              $("#loadBox").addClass("hide");
              _this.$Message.warning("出错" + dataError);
            }
          }else {
            _this.$Message.warning('删除出错！');
          }
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
            abortInfo.$Message.warning('查询超时！请重试！');
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

    }
  }
</script>
<style lang="less">
  .addDialogItem {
    margin: auto;
    position: relative;
    width: 370px;
  }
  .inputAddStyle {
    width: 250px;
  }

  #sys31052 {
    .ivu-collapse {
      border: none;
    }

    .el-table thead.has-gutter th {
    background-color: #F5F8FA;

  }
    .ivu-collapse-content {
      background: #F5F8FA;
      margin: 0 30px;
      padding: 15px 0 15px 0;
      .ivu-form-item {
        margin-bottom: 0;
      }
      .ivu-collapse-content-box {
        padding-top: 0;
      }
    }
    .ivu-collapse-header {
      padding: 20px 31px;
      border-bottom: none;
      .ivu-icon-arrow-right-b {
        display: none;
      }
      p {
        line-height: 30px;
        .lookInfo {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .showButton {
        float: right;
        font-weight: normal;
        font-size: 13px;
        color: #3D83B5;
        i {
          margin-left: 5px;
        }
      }
    }
    .el-table__empty-text {
      top: 50%;
    }
  }
  .tabTitle {
    margin-top: 16px;
    padding: 0 30px;
    .el-tabs__header {
      margin: 0;
    }
  }
  #tableData {
    padding: 27px 30px;
    .pageModule {
      float: right;
      width: inherit;
      .ivu-page-options-sizer {
        margin-right: 0;
      }
    }
    .exportBtn {
      float: left;
    }
  }
  .ivu-btn {
    padding: 6px 15px !important;
    border-radius: 4px !important;
  }
  .ivu-btn-primary {
    color: #fff;
    background-color: #3D83B5;
    border-color: #3D83B5;
    letter-spacing: 5px;
  }
</style>
