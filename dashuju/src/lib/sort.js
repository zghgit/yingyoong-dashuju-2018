/**
 * 公共方法 用来排序
 */
let sort = {
    sortMethods(a,b,type){
     let newa = parseFloat(a),newb = parseFloat(b);
     if(type =="desc"){return newb-newa}
     if(type =="asc"){return newa-newb}
    }
}

export default {
    intall: function(vm){
      vm.prototype.$sort = sort
    }
}