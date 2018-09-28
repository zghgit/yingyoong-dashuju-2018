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
  commonGetReqParam
} from './commen.js';

export default function (url,options,callback) {
  options.timeout = options.timeout || 600000
  options.mode = 'cors'
  if(!options.method){
    url= url+'?signature=' + signatureA + '&Authorization=' + AuthorizationA + commonGetReqParam
  }else{
    options.headers = options.headers || commonHeader
    options.method = 'POST'
    options.body = JSON.stringify(options.params || options.param) || ''
  }

  var fetch_promise = fetch(url,options).then((data)=>{return data.json()}).then((data)=>{
    clearTimeout(abortInfo.t)
    $("#loadBox").addClass("hide");
    abortInfo.isHide = true;
    callback(data)
  })
  var abort_fn = null;
  var abortInfo = this;

  //这是一个可以被reject的promise
  var abort_promise = new Promise(function (resolve, reject) {
    abort_fn = function () {
      clearTimeout(abortInfo.t)
      $("#loadBox").addClass("hide");
      abortInfo.isHide = true;
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
  }, options.timeout);

  return abortable_promise;
}
