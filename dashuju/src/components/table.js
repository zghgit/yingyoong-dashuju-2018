/**
 * Vue的插件，用来fast table
 **/

 import tableComponent from './fastTable.vue'

const fastTable={
    install:function(Vue){
            Vue.component('fastTable',tableComponent)
    }
};

export default fastTable;
