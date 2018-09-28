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

export default {
//  vue 跳转页面
  goNextPage: function (url) {
    this.$router.push(url + '?signature=' + signatureA + '&Authorization=' + AuthorizationA + '&srcUserid=' + srcUseridA + '&srcUsername=' + srcUsernameA + 'dwSessionid=' + dwSessionidA)
  }
}
