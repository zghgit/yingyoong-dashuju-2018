<template>
  <iframe class="box" :src="aSrc" frameborder="0"></iframe>
</template>
<script>
  // import {getUrlParams} from '../assets/js/commen.js';
  export default {
    data() {
      return {
        aSrc: '',
        signatureA: '',
        srcUsernameA: "",
        srcUseridA: '',
        AuthorizationA: '',
        dwSessionidA: '',
        username: '',
        role: ''
      }
    },
    mounted() {

      var appUrl =window.location.href.slice(window.location.href.indexOf('tag=')+4)
      var url = ''
      for(var i=0;i<appUrl.length;i++){
        if(i%2==0){
          url+=appUrl[i]
        }
      }
      console.log(appUrl)
      this.signatureA = sessionStorage.getItem('signatureA')
      this.srcUsernameA = sessionStorage.getItem('srcUsernameA')
      this.srcUseridA = sessionStorage.getItem('srcUseridA')
      this.AuthorizationA = sessionStorage.getItem('AuthorizationA')
      this.dwSessionidA = sessionStorage.getItem('dwSessionidA')
      this.username = sessionStorage.getItem('username')
      this.role = sessionStorage.getItem('role')
      this.aSrc ='#/' + url + '?signature=' + this.signatureA + '&srcUserid=' + this.srcUseridA + '&srcUsername=' + this.srcUsernameA + '&dwSessionid=' + this.dwSessionidA + '&Authorization=' + this.AuthorizationA
      $('.box').height($(window).height())
    },
    methods: {}
  }
</script>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
  }
</style>
