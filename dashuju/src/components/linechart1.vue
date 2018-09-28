<template>
    <div>
        <div id="myChart18" :style="{width: '930px', height: '480px'}" class="box-item"></div>
    </div>
</template>

<script>
    export default {
        props:['data'],
        data (){
            return {
                color: ['#ffobob','#212FFF'],
                options11:{
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            /**dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},*/
                            saveAsImage: {show: true, name:'仅统计竞价交易数据(图二)'}
                        },
                        itemSize:20
                    },
                   legend: {
                        bottom:"2%",
                        right:"80%",
                        data:['持股量','收盘价']
                    }, 
                    xAxis: {
                            type: 'category',
                            data: [],
                        },
                    yAxis: [
                        {
                            type: 'value',
                            name: '持股量',
                            /*min: 0,
                            max: 180,
                            axisLabel: {
                                formatter: '{value} '
                            }*/
                        },
                        {
                            type: 'value',
                            name: '收盘价',
                            /*min: -100,
                            max: 200,
                            axisLabel: {
                                formatter: '{value} '
                            }*/
                        }
                    ],
                    series: [
                        {
                            name:'持股量',
                            type:'line',
                            yAxisIndex: 0,
                            data:[],
                        },
                          {
                            name:'收盘价',
                            type:'line',
                            yAxisIndex: 1,
                            data:[],
                        },
                    ]
                }

            }
        },
          watch:{
            data:function(){
            var _this = this;
            _this.options11.xAxis.data=[];
            _this.options11.series[0].data=[];
            _this.options11.series[1].data=[];
            _this.options11.xAxis.data = _this.data.tradeDate;

            _this.options11.series[0].data = _this.data.holdVol;//持股数量
            _this.options11.series[1].data = _this.data.currPrice;//收盘价
           _this.request();

            }
        },
        methods: {
            request(){
                var _this = this;
                    // 基于准备好的dom，初始化echarts实例
                const myChart18 = _this.$echarts.init(document.getElementById('myChart18'));
                    myChart18.setOption(_this.options11,{notMerge:true,
                    lazyUpdate:false,
                    silent:false});
                }
        }
    }
</script>

<style scoped>
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }

</style>
