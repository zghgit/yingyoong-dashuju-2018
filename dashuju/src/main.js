// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import Vuelidate from 'vuelidate'
import 'iview/dist/styles/iview.css';
import 'vue-awesome/icons';
import './theme/index.less';
import Icon from 'vue-awesome';
import fastTable from './components/table.js';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import toTop from './components/toTop.vue';
import 'babel-polyfill';
import table_60074 from './components/table_60074.vue';
import httpRuquest from  './assets/js/request.js'
import util from  './assets/js/util.js'

Vue.use(elementUI);
Vue.use(fastTable);
Vue.use(toTop);
Vue.use(table_60074);


Vue.component('totop', toTop);
Vue.component('table_60074', table_60074);


//导入jquery
import jQuery from 'jquery';

 //格式化日期
        Date.prototype.format = function(format) {

        var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S+": this.getMilliseconds()
        };

        if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
        }
        return format;
        }
Vue.prototype.$ = jQuery
Vue.prototype.jQuery = jQuery
Vue.prototype.$http = httpRuquest
Vue.prototype.goNextPage =util.goNextPage
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(iView);
Vue.use(Vuelidate)

Vue.component('icon', Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
var v = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})








