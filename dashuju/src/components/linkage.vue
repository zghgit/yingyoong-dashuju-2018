<template>
    <div class="for-top">
        <div id="myChart8" :style="{width: '930px', height: '200px'}"></div>
        <div id="myChart9" :style="{width: '930px', height: '200px'}"></div>
        <div id="myChart10" :style="{width: '930px', height: '200px'}"></div>
        <div id="myChart11" :style="{width: '930px', height: '200px'}"></div>
        <div id="myChart12" :style="{width: '930px', height: '200px'}"></div>


    </div>
</template>

<script>
    export default {
        props:['data'],
        name: 'hello',
        data (){
            return {
                dataLength:'',
                option1:{
                    title : {
                        text: '日K线',
                        textStyle:{
                         fontSize:"9"
                        },
                        right:"93%",
                        top:"0%"
                    },
                    tooltip : {
                        trigger: 'axis',
                        showDelay: 0,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        formatter: function (params) {
                            var res = params[0].name;
                            //res += '<br/>' + params[0].seriesName;
                            res += '<br/>  开盘 : ' + params[0].value[1];
                            res += '<br/>  收盘 : ' + params[0].value[2];
                            res += '<br/>  最低 : ' + params[0].value[3];
                            res += '<br/>  最高 : ' + params[0].value[4];

                            return res;
                        },
                        axisPointer:{
                           lineStyle:{
                              color:"#DB3E03"
                           }
                        }
                    },
                   /*  legend: {
                        y : -30,
                        data:['日K线','市场成交量(万股)','持股量','买入占比、卖出占比','对倒占比']
                    },*/
                    toolbox: {
                        show : true,
                        feature : {
                          /*  mark : {show: true},
                            dataZoom : {show: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},*/
                            saveAsImage : {show: true, name:'仅统计竞价交易数据(图一)'}
                        },
                        itemSize:20
                    },
                   /* dataZoom : {
                        y: 250,
                        show : true,
                        realtime: true,
                        start : 50,
                        end : 100
                    },*/
                    grid: {
                        x: 70,
                        y: 30,
                        x2:20,
                        y2:25
                    },
                    xAxis :{
                            type : 'category',
                            boundaryGap : true,
                            axisTick: {onGap:false},
                            splitLine: {show:false},
                            data : [],
                            axisLine:{
                               lineStyle:{
                                  color:"#DB3E03"
                               }
                            },
                            axisLabel:{
                              interval:4
                            }        
                        },
                    yAxis : [
                        {
                            type : 'value',
                            scale:true,
                            boundaryGap: [0.05, 0.05],
                            //splitArea : {show : true},
                            splitLine:{
                              lineStyle:{
                                 color:"#DB3E03"
                              }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'日K线',
                            type:'k',
                            data:[ // 开盘，收盘，最低，最高
                            ],
                            itemStyle:{
                              normal:{
                                color:'#db1323',
                                color0:'#00DB20'
                              }
                            },
                        },
                        {
                            name:'市场交易量',
                            type:'line',
                            symbol: 'none',
                            data:[]
                        },
                        {
                            name:'持股量',
                            type:'bar',data:[]
                        }

                    ]
                },
                option2:{
                      title : {
                        text: '市场成交量(万股)',
                        textStyle:{
                         fontSize:"9"
                        },
                        right:"88%",
                        top:"0%"
                    },
                    color: ['#1403db'],
                    tooltip : {
                        trigger: 'axis',
                        showDelay: 0,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        axisPointer:{
                           lineStyle:{
                              color:"#DB3E03"
                           }
                        }
                    },
                  /*  legend: {
                        y : -30,
                        data:['日K线','市场成交量(万股)','持股量','买入占比、卖出占比','对倒占比']
                    },*/
                    toolbox: {
                        y : -30,
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataZoom : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                   /* dataZoom : {
                        y:200,
                        show : true,
                        realtime: true,
                        start : 50,
                        end : 100
                    },*/
                   grid: {
                        x: 70,
                        y: 30,
                        x2:20,
                        y2:25
                    },
                    xAxis :{
                            type : 'category',
                            position:'bottom',
                            boundaryGap : true,
                            axisTick: {onGap:false},
                            axisLabel:{show:false},
                            splitLine: {show:false},
                            data : [],
                            axisLine:{
                               lineStyle:{
                                  color:"#DB3E03"
                               }
                            },
                            axisTick:{
                               show:false
                            }
                        },
                    yAxis : [
                        {
                            type : 'value',
                            scale:true,
                            splitNumber:3,
                            boundaryGap: [0.05, 0.05],
                            /*axisLabel: {
                                formatter: function (v) {
                                    return Math.round(v/10000) + ' 万'
                                }
                            },*/
                            //splitArea : {show : true},
                            splitLine:{
                              lineStyle:{
                                 color:"#DB3E03"
                              }
                            }
                        }
                    ],
                    series :  {
                            name:'成交量',
                            type:'bar',
                            symbol: 'none',
                            data:[
                                560434, 226738, 696370, 249697, 248563,
                                620504, 555496, 525337
                            ],
                            markLine : {
                                symbol : 'none',
                                itemStyle : {
                                    normal : {
                                        color:'#1e90ff',
                                        label : {
                                            show:false
                                        }
                                    }
                                },
                                /*data : [
                                    {type : 'average', name: '平均值'}
                                ]*/
                            }
                        }
                },
                option3:{
                     title : {
                        text: '持股量',
                        textStyle:{
                         fontSize:"9"
                        },
                        right:"93%",
                        top:"0%"
                    },
                    color: ['#000000'],
                    tooltip : {
                        trigger: 'axis',
                        showDelay: 0,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        axisPointer:{
                           lineStyle:{
                              color:"#DB3E03"
                           }
                        }
                    },
                   /*  legend: {
                        y : -30,
                        data:['日K线','市场成交量(万股)','持股量','买入占比、卖出占比','对倒占比']
                    },*/
                    toolbox: {
                        y : -30,
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataZoom : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                   /* dataZoom : {
                        show : true,
                        realtime: true,
                        start : 50,
                        end : 100
                    },*/
                     grid: {
                        x: 70,
                        y: 30,
                        x2:20,
                        y2:25
                    },
                    xAxis :{
                            type : 'category',
                            position:'top',
                            boundaryGap : true,
                            axisLabel:{show:false},
                            axisTick: {onGap:false},
                            splitLine: {show:false},
                            data : [],
                            axisLine:{
                               lineStyle:{
                                  color:"#DB3E03"
                               }
                            },
                            axisTick:{
                               show:false
                            }
                        },
                    yAxis : [
                        {
                            type : 'value',
                            scale:true,
                            splitNumber: 3,
                            boundaryGap: [0.05, 0.05],
                            /*axisLabel: {
                                formatter: function (v) {
                                    return Math.round(v/10000)
                                }
                            },*/
                            //splitArea : {show : true},
                            splitLine:{
                              lineStyle:{
                                 color:"#DB3E03"
                              }
                            }
                        }
                    ],
                    series : {
                            name:'持股量',
                            type:'line',
                            symbol: 'none',
                            data:[
                                13560434, 8026738.5, 11691637, 12491697, 12485603,
                                11620504, 12555496, 15253370
                            ],
                            markLine : {
                                symbol : 'none',
                                itemStyle : {
                                    normal : {
                                        color:'#1e90ff',
                                        label : {
                                            show:false
                                        }
                                    }
                                },
                                /*data : [
                                    {type : 'average', name: '平均值'}
                                ]*/
                            }
                        }
                },
                option4:{
                      title : {
                        text: '买入占比，卖出占比',
                        textStyle:{
                         fontSize:"9"
                        },
                        right:"87%",
                        top:"0%"
                    },
                    color: ['#db1323','#00DB20'],
                    tooltip : {
                        trigger: 'axis',
                        showDelay: 0,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        axisPointer:{
                           lineStyle:{
                              color:"#DB3E03"
                           }
                        }
                    },
                     /*  legend: {
                        y : -30,
                        data:['日K线','市场成交量(万股)','持股量','买入占比、卖出占比','对倒占比']
                    },*/
                    toolbox: {
                        y : -30,
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataZoom : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    /*dataZoom : {
                        y:200,
                        show : true,
                        realtime: true,
                        start : 50,
                        end : 100
                    },*/
                     grid: {
                        x: 70,
                        y: 30,
                        x2:20,
                        y2:25
                    },
                    xAxis : {
                            type : 'category',
                            position:'bottom',
                            boundaryGap : true,
                            axisTick: {onGap:false},
                            splitLine: {show:false},
                            axisLabel:{show:false},
                            data : [],
                            axisLine:{
                               lineStyle:{
                                  color:"#DB3E03"
                               }
                            },
                            axisTick:{
                               show:false
                            }
                        },
                    yAxis : [
                        {
                            type : 'value',
                            scale:true,
                            splitNumber:3,
                            boundaryGap: [0.05, 0.05],
                            /*axisLabel: {
                                formatter: function (v) {
                                    return Math.round(v/10000) + ' 万'
                                }
                            },*/
                            //splitArea : {show : true},
                            splitLine:{
                              lineStyle:{
                                 color:"#DB3E03"
                              }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'买入占比',
                            type:'bar',
                            stack:'one',
                            symbol: 'none',
                            data:[
                                560434, 226738, 696370, 249697, 248563,
                                620504, 555496, 525337
                            ],
                            markLine : {
                                symbol : 'none',
                                itemStyle : {
                                    normal : {
                                        color:'#6e7074',
                                        label : {
                                            show:false
                                        }
                                    }
                                },
                                /*data : [
                                    {type : 'average', name: '平均值'}
                                ]*/
                            }
                        },
                        {
                            name:'卖出占比',
                            type:'bar',
                            stack:'one',
                            symbol: 'none',
                            data:[
                                -560434, -226738, -696370, -249697, -248563,
                                -620504, -555496, -525337
                            ],
                            markLine : {
                                symbol : 'none',
                                itemStyle : {
                                    normal : {
                                        color:'#6e7074',
                                        label : {
                                            show:false
                                        }
                                    }
                                },
                                /*data : [
                                    {type : 'average', name: '平均值'}
                                ]*/
                            }
                        }
                    ]
                },
                option5:{
                     title : {
                        text: '对倒占比',
                        textStyle:{
                         fontSize:"9"
                        },
                        right:"93%",
                        top:"0%"
                    },
                    tooltip : {
                        trigger: 'axis',
                        showDelay: 0,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        axisPointer:{
                           lineStyle:{
                              color:"#DB3E03"
                           }
                        }
                    },
                    color: ['rgb(25, 183, 207)'],
                  /*  legend: {
                        y : -30,
                        data:['日K线','市场成交量(万股)','持股量','买入占比、卖出占比','对倒占比']
                    },*/
                    toolbox: {
                        y : -30,
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataZoom : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                  /*  dataZoom : {
                        y:200,
                        show : true,
                        realtime: true,
                        start : 50,
                        end : 100
                    },*/
                     grid: {
                        x: 70,
                        y: 30,
                        x2:20,
                        y2:25
                    },
                    xAxis :{
                            type : 'category',
                            position:'bottom',
                            boundaryGap : true,
                            axisTick: {onGap:false},
                            axisLabel:{show:false},
                            splitLine: {show:false},
                            data : [],
                            axisLine:{
                               lineStyle:{
                                  color:"#DB3E03"
                               }
                            },
                            axisTick:{
                               show:false
                            }
                        },
                    yAxis : [
                        {
                            type : 'value',
                            scale:true,
                            splitNumber:3,
                            boundaryGap: [0.05, 0.05],
                            /*axisLabel: {
                                formatter: function (v) {
                                    return Math.round(v/10000) + ' 万'
                                }
                            },*/
                            //splitArea : {show : true},
                            splitLine:{
                              lineStyle:{
                                 color:"#DB3E03"
                              }
                            }
                        }
                    ],
                    series : {
                            name:'对倒占比',
                            type:'bar',
                            symbol: 'none',
                            data:[
                                560434, 226738, 696370, 249697, 248563,
                                620504, 555496, 525337
                            ],
                            markLine : {
                                symbol : 'none',
                                itemStyle : {
                                    normal : {
                                        color:'#1e90ff',
                                        label : {
                                            show:false
                                        }
                                    }
                                },
                                /*data : [
                                    {type : 'average', name: '平均值'}
                                ]*/
                            }
                        }
                    
                },

            }
        },
     /* mounted (){
                this.request();
        },*/
        watch:{
            data:function(){
            var _this = this;
            _this.option1.xAxis.data = _this.data.tradeDate;
            if(_this.option1.xAxis.data.length > 40){
                   _this.option1.xAxis.axisLabel.interval = parseInt(_this.option1.xAxis.data.length/10);
              }else{
                   _this.option1.xAxis.axisLabel.interval = 4
              }
              console.log(_this.option1.xAxis.axisLabel.interval);
            _this.option2.xAxis.data = _this.data.tradeDate;
            _this.option3.xAxis.data = _this.data.tradeDate;
            _this.option4.xAxis.data = _this.data.tradeDate;
            _this.option5.xAxis.data = _this.data.tradeDate;

            _this.option3.series.data = _this.data.holdVol;//持股数量
            _this.option5.series.data = _this.data.ddVolRatio;//数量占比
            _this.option4.series[0].data = _this.data.buyRatio;//买入占比
            _this.option4.series[1].data = _this.data.sellRatio;//卖出占比
             _this.option2.series.data = _this.data.tradeVol;//成交总量
             _this.option1.series[0].data = _this.data.kChart//日K线

           _this.request();

            }
        },
       /* computed:{
           xAxisInterval1(){
              let _this = this;
              if(_this.xAxisInterval1.length > 110){
                   _this.xAxisInterval = parseInt(_this.option1.xAxis.data/25);
              }
           }
        },*/
        methods: {
            request(){

                const _this = this;
                    // 基于准备好的dom，初始化echarts实例
                    const myChart8 = _this.$echarts.init(document.getElementById('myChart8'));
                    const myChart9 = _this.$echarts.init(document.getElementById('myChart9'));
                    const myChart10 = _this.$echarts.init(document.getElementById('myChart10'));
                    const myChart11 = _this.$echarts.init(document.getElementById('myChart11'));
                    const myChart12 = _this.$echarts.init(document.getElementById('myChart12'));


                  // 绘制图表
                console.log(myChart8);
                    myChart8.setOption(_this.option1,{notMerge:true});
                    myChart9.setOption(_this.option2,{notMerge:true});
                    myChart10.setOption(_this.option3,{notMerge:true});
                    myChart11.setOption(_this.option4,{notMerge:true});
                    myChart12.setOption(_this.option5,{notMerge:true});



                _this.$echarts.connect([myChart8,myChart9, myChart10,myChart11,myChart12]);
                    setTimeout(function (){
                        window.onresize = function () {
                            myChart8.resize();
                            myChart9.resize();
                            myChart10.resize();
                            myChart11.resize();
                            myChart12.resize();
                        }
                    },200)
            },


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
    .for-top{
       margin-top: 30px;
    }

</style>
