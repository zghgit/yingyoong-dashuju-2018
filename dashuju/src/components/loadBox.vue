<template>
    <section class="constWidth">
        <!--加载中界面显示-->
        <Spin id="loadBox" fix class="loadBox" v-bind:class="{ hide: isHide }">
            <Icon type="load-c" size=40 class="loadIcon"></Icon>
            <div>&nbsp;&nbsp;&nbsp;数据加载中...</div>
        </Spin>
    </section>
   
</template>

<script>
export default {
    name:"loadBox",
    data () {
        return {
            isHide:true,
        }
    }
}
</script>


