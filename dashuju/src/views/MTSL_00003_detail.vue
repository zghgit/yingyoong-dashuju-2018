<template>
  <div id="sixFiles">
    <!--全屏加载图标-->
    <Spin id="loadBox" fix class="loadBox" v-if="loadingIcon">
      <Icon type="load-c" size=40 class="loadIcon"></Icon>
      <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
    </Spin>
    <!--表内容-->
    <div class="detailContent">
      <p class="detailTitle">{{ detailTitle }}</p>
      <p class="returnTotal" v-if="returnTotal>0">查询结果共 {{ returnTotal }} 条记录</p>
      <el-table
        :data="detailData"
        border
        style="width: 100%">
        <el-table-column :formatter="formatterNumber" v-for="(item,index) in tableColumns"
           v-if="isShowCol(item.isShow)"
           :key="Math.random()"
           :prop="item.field"
           :label="item.title"
           :align="item.align"
           :min-width="item.minWidth">
          <el-table-column :formatter="formatterNumber" v-for="(itemChild,index) in item.children"
             :key="Math.random()"
             :prop="itemChild.field"
             :label="itemChild.title"
             :align="itemChild.align"
             :min-width="itemChild.width"
             >
          </el-table-column>
        </el-table-column>
      </el-table>
      <ul class="checkType">
        <li>
          <el-checkbox-group v-model="scaleType" @change="changeCheck">
            <el-checkbox v-for="typeItem in scaleTypeList" :label="typeItem.key" :key="typeItem.key" v-if="dateDetail(typeItem.key)">{{typeItem.name}}</el-checkbox>
          </el-checkbox-group>
        </li>
        <li>
          <span class="selectUnit">单位选择：</span>
          <el-radio-group v-model="unitType" @change="changeUnit">
            <el-radio v-for="unit in unitList" :label="unit.key" :key="unit.key">{{ unit.name }}</el-radio>
          </el-radio-group>
        </li>
      </ul>
      <!--分页-->
      <div class="pageModule">
        <Page :total="returnTotal" :current="pageNumber" :page-size="pageSize" :page-size-opts=[500,1000] placement="top" show-sizer @on-page-size-change="pageChangeSize" @on-change="pageChange"></Page>
      </div>
      <!--导出-->
      <div class="exportBtn">
        <Button id="exportCurrent" type="primary" size="large" @click="exportData" :disabled="returnTotal<=0">
          <Icon type="ios-download-outline"></Icon>
          导出全部结果为XLSX文件
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    urlParams,
    signatureA,
    srcUsernameA,
    srcUseridA,
    AuthorizationA,
    dwSessionidA,
    getUrlParams,
    initialDate,
    threeReqPath,
    downloadReqPath,
    commonHeader,
    initialMonth,
    commonGetReqParam,
    jump2NewPage,
    formatTbousandth
  } from '../assets/js/commen.js';
  import {tableColumns_MTSL03_details} from '../assets/js/MTSL_00003.js';
  import '../theme/sixCommon.less';
  export default {
    name: "m-t-s-l_00003_detail",
    data () {
      return {
        // 表头
        tableColumns: tableColumns_MTSL03_details,
        // 表数据
        detailData: [],
        // 详情页标题
        detailParamData: JSON.parse(sessionStorage.getItem('paramData')),
        detailTitle: JSON.parse(sessionStorage.getItem('paramData')).title,
        detailType: JSON.parse(sessionStorage.getItem('paramData')).type,
        // 加载图标是否显示
        loadingIcon: false,
        // 万元、亿元数据初始化
        hundredMillion: false,
        thousand: false,
        // 日均、占比选择数据初始化
        scaleType: [],
        scaleTypeList: [{
          name: '展现占比指标',
          key: 'propor',
        }, {
          name: '展现日均指标',
          key: 'average',
        }],
        // 万元、亿元数据初始化
        unitType: 'hundredMillion',
        unitList: [{
          name: '万元',
          key: 'thousand'
        }, {
          name: '亿元',
          key: 'hundredMillion'
        }],
        isData: false,
        // 分页初始化
        returnTotal: 0,
        pageNumber: 1,
        pageSize: 500,
        timeout: '',
      }
    },
    mounted () {
      // 动态表头
      this.changeCheck();
      // 获取详情数据
      this.pageChange(1);
    },
    methods: {
      // 列：格式化字符
      formatterNumber:function (row,col,cellValue) {
        var prop = col.property
        if(prop == 'sec_code' || prop == 'stat_date' ){
          return cellValue
        }
        return formatTbousandth(cellValue)
      },
      _fetch (fetch_promise, timeout) {
        // 请求超时方法
        let abort_fn = null;
        // let abortInfo = this;
        //这是一个可以被reject的promise
        let abort_promise = new Promise(function (resolve, reject) {
          abort_fn = function () {
            this.loadingIcon = false;
            this.$Message.warning('查询超时！请重试！');
          };
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        let abortable_promise = Promise.race([
          fetch_promise,
          abort_promise
        ]);
        this.timeout = setTimeout(function () {
          abort_fn();
        }, timeout);
        return abortable_promise;
      },
      isShowCol (data) {
        // 列是否显示
        if (this.detailType === 'vouchers'){
          if (data === 'code'|| data === 'abbr' || data === 'show') {
            return true
          } else {
            return false
          }
        } else if (this.detailType === 'vip') {
          if (data === 'type'|| data === 'vipname' || data === 'show') {
            return true
          } else {
            return false
          }
        } else if (this.detailType === 'day' || this.detailType === 'mounth' || this.detailType === 'year') {
          if ( data === 'type'|| data === 'date' || data === 'show') {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      },
      dateDetail (data) {
        // 日明细无日均
        if ((this.detailType == 'day' && data == 'average') || (this.detailType == 'vip' && data == 'propor')) {
          return false
        } else {
          return true
        }
      },
      exportData() {
        // 导出
        var downfileParams = "userId=" + srcUseridA + "&userName=" + srcUsernameA + "&signature=" + signatureA + "&Authorization=" + AuthorizationA +  "&startDate=" + this.detailParamData.startdate +
          "&endDate=" + this.detailParamData.enddate + "&flagDayMonYear=" + this.detailParamData.flagDayMonYear + "&secTypeName=" + this.detailParamData.data.sec_type + '&unit=' + this.unitType + '&quality=' + this.scaleType.toString();
        void(window.open('/dw/download/' + this.detailParamData.businessId + 'export?' + downfileParams +commonGetReqParam));
      },
      changeUnit () {
        // 单位切换
        if (this.isData) {
          // 获取元数据
          let arr = JSON.parse(localStorage.getItem('changeUnitDetailData'));
          // 转换单位
          let unit = 1;
          if (this.unitType == 'thousand') {
            unit = 10000
          } else if (this.unitType == 'hundredMillion') {
            unit = 100000000
          }
          arr.forEach((item, index) => {
            item.margin_buy_amt_all = (item.margin_buy_amt_all/unit).toFixed(2);
            item.margin_buy_amt_avg = (item.margin_buy_amt_avg/unit).toFixed(2);
            item.margin_sell_amt_all = (item.margin_sell_amt_all/unit).toFixed(2);
            item.margin_sell_amt_avg = (item.margin_sell_amt_avg/unit).toFixed(2);
            item.forced_sell_amt_all = (item.forced_sell_amt_all/unit).toFixed(2);
            item.forced_sell_amt_avg = (item.forced_sell_amt_avg/unit).toFixed(2);
            item.short_sell_amt_all = (item.short_sell_amt_all/unit).toFixed(2);
            item.short_sell_amt_avg = (item.short_sell_amt_avg/unit).toFixed(2);
            item.short_buy_amt_all = (item.short_buy_amt_all/unit).toFixed(2);
            item.short_buy_amt_avg = (item.short_buy_amt_avg/unit).toFixed(2);
            item.forced_buy_amt_all = (item.forced_buy_amt_all/unit).toFixed(2);
            item.forced_buy_amt_avg = (item.forced_buy_amt_avg/unit).toFixed(2);
            item.credit_buy_amt_all = (item.credit_buy_amt_all/unit).toFixed(2);
            item.credit_buy_amt_avg = (item.credit_buy_amt_avg/unit).toFixed(2);
            item.credit_sell_amt_all = (item.credit_sell_amt_all/unit).toFixed(2);
            item.credit_sell_amt_avg = (item.credit_sell_amt_avg/unit).toFixed(2);
            item.credit_amt_all = (item.credit_amt_all/unit).toFixed(2);
            item.credit_amt_avg = (item.credit_amt_avg/unit).toFixed(2);
          })
          this.detailData = arr;
        }
      },
      changeCheck () {
        // 改变选中项出发事件
        this.tableColumns = [];
        tableColumns_MTSL03_details.forEach((item, index) => {
          if (!item.children) {
            this.tableColumns.push(item)
          } else {
            this.tableColumns.push({field: item.field, title: item.title, minWidth: item.minWidth, align: item.align, isShow: 'show', children: []});
            item.children.forEach((childrenitem, key) => {
              if (childrenitem.type=== 'amount') {
                this.tableColumns[index].children.push(childrenitem);
              } else {
                this.scaleType.forEach(checkItem => {
                  this.scaleTypeList.forEach(typeItem => {
                    if (typeItem.key === checkItem) {
                      if (childrenitem.type === typeItem.key) {
                        this.tableColumns[index].children.push(childrenitem)
                      }
                    }
                  })
                })
              }
            })
          }
        })
      },
      pageChange (val) {
        // 翻页触发
        // 加载弹出层显示
        this.loadingIcon = true;
        // 当前页码
        this.pageNumber = val;
        // 传递参数
        let url = this.detailParamData.url;
        let searchParams = {
          "startDate": this.detailParamData.startdate,
          "endDate": this.detailParamData.enddate,
          "userId": srcUseridA,
          "userName": srcUsernameA,
          "pageNo": val,
          "pageSize": this.pageSize,
          "flagDayMonYear": this.detailParamData.flagDayMonYear,
          "businessId": this.detailParamData.businessId,
          "secTypeName": this.detailParamData.data.sec_type,
        };
        this._fetch(fetch(url, {
          method: "POST",
          body: JSON.stringify(searchParams),
          mode: 'cors',
          headers: commonHeader
        }), 600000)
          .then((res) => {
            if (res.ok === true) {
              return res.json()
            }
          }, function (err) {
            this.loadingIcon = false;
            this.$Message.warning('系统繁忙，请稍后再试!');
          })
          .then(data => {
            if (this.timeout != '') {
              clearTimeout(this.timeout);
            }
            // 获取数据
            if (data.success == true) {
              if (data.resData.data.length > 0) {
                // 原始数据保存（元为单位）
                localStorage.setItem('changeUnitDetailData',JSON.stringify(data.resData.data));
                this.isData = true;
                // 转换单位
                this.changeUnit();
                this.returnTotal = data.resData.totalCount;
              } else {
                // 无数据提示
                this.$Message.warning("查询无数据");
                this.isData = false;
                this.detailData = [];
                this.returnTotal = 0;
              }
              // 获取数据总数
              this.loadingIcon = false;
            } else {
              this.loadingIcon = false;
              this.detailData = [];
              this.returnTotal = 0;
              this.$alert("错误" + data.message,'错误',{
                confirmButtonText:'确定',
                type:'error'
              })
            }
          })
          .catch((err) => {
            this.loadingIcon = false;
            this.$Message.warning("系统繁忙，请稍后再试!");
          });
      },
      pageChangeSize (val) {
        // 改变每页数据量触发
        this.pageSize = val;
        this.pageChange(1);
      },
    }
  }
</script>

<style>

</style>
