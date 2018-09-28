<template>
    <div>
        <div id="myChart21" :style="{width: '930px', height: '480px'}" class="box-item"></div>
    </div>
</template>

<script>
    export default {
        props:['datas'],
        data (){
            return {
                color: ['#ffobob','#212FFF'],
                options14:{
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            /**dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},*/
                            saveAsImage: {show: true, name:'统计时包含大宗交易数据(图三)'}
                        },
                        itemSize:20
                    },
                   legend: {
                        bottom:"2%",
                        right:"80%",
                        data:['交易占比','股价']
                    }, 
                    xAxis: {
                            type: 'category',
                            data: [],
                        },
                    yAxis: [
                        {
                            type: 'value',
                            name: '交易占比',
                            /* min: 0,
                            max: 180,*/
                            axisLabel: {
                                formatter: '{value} '
                            },
                        },
                        {
                            type: 'value',
                            name: '股价',
                           /* min: -100,
                            max: 200,
                            axisLabel: {
                                formatter: '{value} '
                            },*/
                        }
                    ],
                    series: [
                        {
                            name:'交易占比',
                            type:'line',
                            yAxisIndex: 0,
                            data:[],
                        },
                          {
                            name:'股价',
                            type:'line',
                            yAxisIndex: 1,
                            data:[],
                        },
                    ]
                }

            }
        },
          watch:{
            datas:function(){
            var _this = this;
            _this.options14.xAxis.data = _this.datas.tradeDate;

            _this.options14.series[0].data = _this.datas.tradeVolRatio;//交易占比
            _this.options14.series[1].data = _this.datas.currPrice;//股价
            _this.request();

            }
        },
        methods: {
            request(){
                var _this = this;
                    // 基于准备好的dom，初始化echarts实例
                const myChart21 = _this.$echarts.init(document.getElementById('myChart21'));
                    myChart21.setOption(_this.options14,{notMerge:true});
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
