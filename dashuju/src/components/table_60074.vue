<template>
  <div class="container">
    <p style="text-align:center;height: 550px;" v-if="dataArr.length <1">无数据</p>
    <div v-for="item in dataArr" v-if="dataArr.length>0">
      <table border="1">
        <tr>
          <td colspan="6">基本情况：</td>
        </tr>
        <tr>
          <td>债券名称：</td>
          <td colspan="5">{{item.sec_name}}</td>
        </tr>
        <tr>
          <td>代码：</td>
          <td colspan="5">{{item.sec_code}}</td>
        </tr>
        <tr>
          <td>收盘价：</td>
          <td colspan="5">{{item.curr_price}}</td>
        </tr>
        <tr>
          <td>总体预警：</td>
          <td colspan="5">{{item.result}}</td>
        </tr>
        <tr>
          <td>风险情况：</td>
          <td colspan="5">{{formatDate}}</td>
        </tr>
        <tr>
          <td>警示指标类别</td>
          <td>指标名称</td>
          <td>数值</td>
          <td>三级预警</td>
          <td>二级预警</td>
          <td>一级预警</td>
        </tr>
        <tr>
          <td rowspan="3">价格</td>
          <td>最大跌幅%</td>
          <td>{{item.down_ratio}}</td>
          <td>4%</td>
          <td>6%</td>
          <td>8%</td>
        </tr>
        <tr>
          <td>最大涨幅%</td>
          <td>{{item.up_ratio}}</td>
          <td>3%</td>
          <td>5%</td>
          <td>7%</td>
        </tr>
        <tr>
          <td>价格最大偏离度%</td>
          <td>{{item.price_departure}}</td>
          <td>6%</td>
          <td>9%</td>
          <td>11%</td>
        </tr>
        <tr>
          <td>流动性</td>
          <td>日均换手率%</td>
          <td>{{item.exchange_ratio}}</td>
          <td>10%</td>
          <td>20%</td>
          <td>30%</td>
        </tr>
        <tr>
          <td>持有比例</td>
          <td>个人投资者最大持有比例%</td>
          <td>{{item.phold_ratio}}</td>
          <td>30%</td>
          <td>40%</td>
          <td>50%</td>
        </tr>
      </table>
    </div>
  </div>

</template>
<script>
  export default {
    props:['dataArr','date'],
    data(){
      return{
        formatDate:'时间：'+ new Date(this.date).getFullYear()+'年 '+(new Date(this.date).getMonth()+1) +'月 '
      }
    },
    methods:{

    },
    mounted(){

    },

  }
</script>
<style scoped type="less">
.container{
  width: 100%;
  border:1px solid #e6ebf5;
  max-height: 600px;
  overflow: scroll;
}

  .container table{
    font-size: 14px;
    border-spacing: 0;
    border-collapse: collapse;
    margin:20px 0 ;
  }
.container td{
  padding: 5px;
}


</style>
