<template>
<div class="layout">
     <!--加载中界面显示-->
    <Spin id="show" fix class="load hide">
        <Icon type="load-c" size=56 class="demo-spin-icon-load"></Icon>
        <div style="font-size:16px;">数据加载中</div>
    </Spin>
</div>
   
</template>

<script>
export default {
    name:'spin'
}
</script>

<style>
    .layout .ivu-spin-fix {width: 100%;height: 100%; position: fixed; top: 0;left: 0;text-align: center;z-index: 6; background: rgba(0, 0, 0, .3);}
    .layout .hide {display: none;}
</style>  


