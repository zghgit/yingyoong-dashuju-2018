<template>
  <div class="scrollTopBox" id="toTopId" @click="toTops">
    <img src="../assets/img/top.png" width="27" height="27"/>
  </div>
</template>
<script>
  export default {
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      //滚动置顶监控
      handleScroll() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 100) {
          if(!document.getElementById("toTopId")) return
          document.getElementById("toTopId").style.display = "block";
        } else {
          if(!document.getElementById("toTopId")) return
          document.getElementById("toTopId").style.display = "none";
        }
      },
      toTops() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
  }
</script>
<style>
  .scrollTopBox {
    width: 40px;
    height: 40px;
    background-color: #3399ff;
    color: #ffffff;
    text-align: center;
    font-size: 13px;
    position: fixed;
    right: 10px;
    bottom: 20px;
    cursor: pointer;
    display: none;
    box-shadow: 0 6px 10px 1px rgba(0, 0, 0, .2);
  }

  .scrollTopBox img {
    margin: 6px 0 0 0;
  }
</style>

