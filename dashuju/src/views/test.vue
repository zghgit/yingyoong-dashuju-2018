<template>
  <div class="box">
    <div class="box-item" v-for="item in reduceArr">{{item}}</div>
    <h2>哈哈</h2>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        dataArr:[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
        ],
        n:3,
        reduceArr:[]
      }
    },
    mounted(){
      var windowH = $(window).height()
      this.reduceArr = this.dataArr.slice(0,this.n)

      var self = this
      window.onscroll = function (ev) {
        var h1 = $(window).scrollTop()
        var h2 = $(document).height()

        if((h1 + windowH) >= h2){
          self.reduceArr = self.dataArr.slice(0,self.n+=3)
          console.log(self.reduceArr)
        }
      }
    },
    methods:{

    }
  }
</script>
<style scoped>
  h2{
    background-color: red;
  }
  .box{
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*width: 100%;*/
    /*justify-content: space-between;*/
  }
  .box-item{
    color:#fff;
    margin: 10px;
    width: 300px;
    height: 300px;
    background-color: #00cc66;
    display: flex;
    justify-content: center;;
    align-items: center;;
  }
</style>
