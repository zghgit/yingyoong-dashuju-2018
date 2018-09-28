<template>
  <div class="afs00003_echarts">
    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
  </div>
</template>

<script>
  import echartsAFS from 'echarts';
  export default {
    name: "afs00003_echarts",
    props: ['echartsData', 'echartsNum'],
    components: {},
    data() {
      return {
      }
    },
    watch: {
      echartsData:function () {
        this.echartsDete()
      },
      echartsNum:function () {
        this.echartsDete()
      }
    },
    methods: {
      echartsDete(){
        const myChart13 = echartsAFS.init(document.getElementById('myChart'));
        let labelRight = {
          normal:{
            position:'left'
          }
        };
        let option = {
          backgroundColor:['rgba(66, 176, 172, 0.08)'],
          tooltip:{
            trigger:'axis',
            axisPointer:{
              type:'line'
              // type:'shadow'
            },
          },
          title:{
            show:true,
            text:'证监会行业资金流向-行业大类',
            top:'20px',
            x:'center',
            textStyle:{
              fontWeight:'normal',
              color:'rgba(6, 90, 86, 0.78)',
              fontSize:14,
            },

          },
          // legend:{
          //   data:['证监会行业资金流向-行业大类'],
          //   left:'left'
          // },
          grid:{
            left:'4%',
            right:'5%',
            bottom:'40%',
            width:'auto',
            height:'auto',
            containLabel:true,
          },

          xAxis: {
            name:'',
            left:'left',
            axisTick:{show:false},
            axisLabel:{   // 字体选择
              rotate:30,    // 字体倾斜角度
              interval:0,   // 间距
              // x 轴线条颜色
              axisLine: {
                lineStyle: {color: "red"}
              },
              textStyle:{
                margin:'10px',
                color:'rgba(6, 90, 86, 0.78)',
                fontSize:14
              }
            },
            type:'category',
            data:this.echartsData,
          },
          yAxis:{
            type:'value',
          },
          series:[
            {
              name:'证监会行业资金流向-行业大类',
                type:'bar',
                barWidth:25,   // 柱状图的宽度
              itemStyle:{
                normal:{
                  color:'rgba(130, 194, 247, 0.4)',
                }
              },
                label:{
                  normal:{
                    show:false,      // 数据显示
                   position:'insideTop',
                    // formatter:'{b}'
                    formatter:'{per|{d}%}'
                  },
                },
                data:this.echartsNum,
            }
          ]
        };
        myChart13.setOption(option);
      },
    },
    mounted() {
      this.echartsDete();
    },

  }
</script>

<style lang="less">
  .afs00003_echarts {
    /*margin: 0 31px;*/
    margin: 0 31px -100px 31px;
  }
</style>
