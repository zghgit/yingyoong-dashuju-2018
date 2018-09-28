//获取URL地址参数
var urlParams = window.location.href;
var signatureA = getUrlParams(urlParams).signature;
var srcUsernameA = (getUrlParams(urlParams).srcUsername || '').replace(/\s+/g, "");
var srcUseridA = getUrlParams(urlParams).srcUserid;
var AuthorizationA = getUrlParams(urlParams).Authorization;
var dwSessionidA = (getUrlParams(urlParams).dwSessionid || '').replace(/\s+/g, "");
var username = getUrlParams(urlParams).username || '';
var role = getUrlParams(urlParams).role || '';
var startdate = getUrlParams(urlParams).startdate || '';
var enddate = getUrlParams(urlParams).enddate || '';

sessionStorage.setItem('signatureA',signatureA)
sessionStorage.setItem('srcUsernameA',srcUsernameA)
sessionStorage.setItem('srcUseridA',srcUseridA)
sessionStorage.setItem('AuthorizationA',AuthorizationA)
sessionStorage.setItem('dwSessionidA',dwSessionidA)
sessionStorage.setItem('username',username)
sessionStorage.setItem('role',role)

// 跳转域名
var IPName = '/static/IPconfig.json';

var threeReqPath = '/dw/mktdt/gdh'
// var threeReqPath = '/dw/gdh/gdh_00010'
var downloadReqPath = '/dw/download/excel_comm?';
// var downloadReqPath = '/fym/opt/opt_60023_export?';

// 验证日期正则（年、月、日）
// var dateReg = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
var dateReg = /((1[8-9]\d{2})|([2-9]\d{3}))([-/.]?)(((0[13578]|1[02])([-/.]?)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)([-/.]?)(0[1-9]|[12][0-9]|30))|(02([-/.]?)(0[1-9]|[1][0-9]|2[0-9])))/
// 验证年月
var monthReg = /^\d{4}([-/.]?)(0[1-9]|1[0-2])/

//  公共请求头
var commonHeader = {
  "Content-Type": "application/json",
  "signature": signatureA,
  "Authorization": AuthorizationA,
  'username': username,
  'role': role
}
// get请求公共参数
var commonGetReqParam = '&role=' + role + '&username=' + username


// 格式化千分位数字
function formatTbousandth(num) {
  if(isNaN(num) || num == null || num =='null') return num
  num+=''

  if(num.indexOf(',') > 0 || (num*1 <1000 && num*1 >0)) return num

  var startStr = ''
  if(num.indexOf('-') == 0){
    startStr = '-'
    num = num.slice(1)
  }
  var arr = num.split('.')
  var midStr = arr[0]
  var endStr = arr[1] ? '.'+arr[1] : ''
  var arr = midStr.split('').reverse()

  var s = ''
  for(var i=0;i<arr.length;i++){
    if(i!=0 && i%3==0){
      s+=','
    }
    s+=arr[i]
  }
  var r = ''
  s.split('').reverse().forEach((item,index)=>{
    r+=item
  })
  num = startStr + r + endStr
  return num
}
// console.log('>>',formatTbousandth())
// 获取url日期(应用跳转携带日期查询)
function getUrlDate(flag, defaultDate) {
  // console.log(defaultDate)
  //  开始
  if (flag == 1) {
    return startdate=='' ? defaultDate :startdate
  }else if(flag == 2){
    //  结束
    return enddate=='' ? defaultDate :enddate
  }else{
    return startdate !='' ? true : false
  }
}

// 超链接打开新页面
function jump2NewPage(url, data,flag) {
  var temp = []
  if (data) {
    sessionStorage.setItem( flag ? url : 'data', JSON.stringify(data))
    // console.log(sessionStorage.getItem(flag ? url : 'data'))
    var arr = url.split('')

    arr.forEach((item,index)=>{
      item+=Math.floor(Math.random()*10)
      temp.push(item)
    })
    console.log(temp.join(''))
  }
  // window.open('#/' + url + '?signature=' + signatureA + '&srcUserid=' + srcUseridA + '&srcUsername=' + srcUsernameA + '&dwSessionid=' + dwSessionidA + '&Authorization=' + AuthorizationA)
  window.open('#/commonNextPage'+'?tag='+temp.join(''))
}

// 获取url参数
function getUrlParams(url) {
  var urlArray = url.split("?")[1].split("&"),
    urlValue = {};
  for (var i = 0; i < urlArray.length; i++) {
    var urlRowArray = urlArray[i].split("=");
    urlValue[urlRowArray[0]] = urlRowArray[1];
  }
  return urlValue;
};

/**
 * 请求初始日期
 */
let lastTradeDate = "", lastTradeDateTwo = "";

// T-1 日
function initialDate() {
  var obj = new XMLHttpRequest();
  obj.open('GET', '/base-service/date/ptrdd', false);
  obj.setRequestHeader("signature", signatureA);
  obj.setRequestHeader("Authorization", AuthorizationA);
  obj.setRequestHeader("role", role);
  obj.setRequestHeader("username", username);
  obj.onreadystatechange = function () {
    if (obj.readyState == 4 && obj.status == 200) {
      const responseData = JSON.parse(obj.responseText);
      //上一个交易日
      lastTradeDate = responseData.resData.tradeDate;
      //lastTradeDate = lastTradeDate.slice(0, 4) + "-" + lastTradeDate.slice(4, 6) + "-" + lastTradeDate.slice(6, 8);
      lastTradeDate = new Date(lastTradeDate);
    }
  };
  obj.send(null);
  return lastTradeDate;
};

// T-2 日
function initialDateTwo() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/pntrdd?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=2' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);
      //上一个交易日
      lastTradeDateTwo = responseData.resData.tradeDate;
      //lastTradeDate = lastTradeDate.slice(0, 4) + "-" + lastTradeDate.slice(4, 6) + "-" + lastTradeDate.slice(6, 8);
      lastTradeDateTwo = new Date(lastTradeDateTwo);
    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

// T-1 年

function initialYear() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/ptrdy?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=1' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);
      //上一个交易年
      lastTradeDateTwo = responseData.resData;
      //lastTradeDate = lastTradeDate.slice(0, 4) + "-" + lastTradeDate.slice(4, 6) + "-" + lastTradeDate.slice(6, 8);
    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

// T-1 月

function initialMonth() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/ptrdm?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=1' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);
      //上一个交易月

      lastTradeDateTwo = responseData.resData;
      //lastTradeDate = lastTradeDate.slice(0, 4) + "-" + lastTradeDate.slice(4, 6) + "-" + lastTradeDate.slice(6, 8);
    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

// T-12 月

function initialMonth12() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/ptrdm?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=12' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);
      //上一个交易月

      lastTradeDateTwo = responseData.resData;

    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

// T 月

function initialMonthNow() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/ptrdm?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=0' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);
      //上一个交易月

      lastTradeDateTwo = responseData.resData;

    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

// T-1的上月之前的最近交易日
function lastMonthDay() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/ptrddm?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=0' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);

      lastTradeDateTwo = responseData.resData.tradeDate;

    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

// 上月第一个交易日和上月最后一个交易日
function lastMonthFirstAndLastDay() {
  var obj1 = new XMLHttpRequest();
  obj1.open('GET', '/base-service/date/pmfaltd?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&userName=user&userId=111&n=0' + commonGetReqParam, false);
  obj1.onreadystatechange = function () {
    if (obj1.readyState == 4 && obj1.status == 200) {
      const responseData = JSON.parse(obj1.responseText);
      lastTradeDateTwo = responseData.resData;
      // console.log('>>>>   ',responseData)
    }
  };
  obj1.send(null);
  return lastTradeDateTwo;
};

//

export {
  urlParams,
  signatureA,
  srcUsernameA,
  srcUseridA,
  AuthorizationA,
  dwSessionidA,
  getUrlParams,
  initialDate,
  initialDateTwo,
  IPName,
  threeReqPath,
  downloadReqPath,
  initialYear,
  initialMonth,
  commonHeader,
  initialMonth12,
  initialMonthNow,
  commonGetReqParam,
  lastMonthDay,
  dateReg,
  lastMonthFirstAndLastDay,
  jump2NewPage,
  monthReg,
  getUrlDate,
  formatTbousandth
}
