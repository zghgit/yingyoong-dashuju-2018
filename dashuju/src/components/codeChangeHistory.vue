<template>
    <div class="codeChangeHistory" v-if="closeIF">
        <grid-layout
          style="width: 80%;"
         :layout="layout"
         :auto-size="false"
         :col-num="0"
         :row-height="0"
         :max-rows="0"
         :is-draggable="true"
         :is-resizable="false"
         :vertical-compact="false"
         :margin="[10, 10]"
         :use-css-transforms="true">
          <grid-item
            v-for="item in layout"
            :key="item.i"
            style="width: 60%"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            @resize="resizeEvent"
            @move="moveEvent"
            @resized="resizedEvent"
            @moved="movedEvent">
            <p class="closeP">
              <span class="titleP">{{title}}</span>
              <span class="closeSpan"  @click="closePClick(1)">x</span>
            </p>
            <el-table
              :data="historyCodeTable"
              border toolip-eddect="dark"
              style="width: 100%">
              <template v-for="(item, index) in tablecolumms">
                <el-table-column
                  :key="item.field"
                  :prop="item.field"
                  :label="item.title"
                  :align="item.align == null ? 'center' : item.align"
                  :width="item.width">
                </el-table-column>
              </template>
            </el-table>
          </grid-item>
        </grid-layout>
    </div>
</template>

<script>
  import {tablecolumms} from '../assets/js/SSE_20002.js';
  import Vue from 'vue'
  import VueGridLayout from 'vue-grid-layout'
  Vue.use(VueGridLayout);
  var testLayout = [
    {"x":0,"y":0,"w":1,"h":1,"i":"0"},
    ];
  var GridLayout = VueGridLayout.GridLayout;
  var GridItem = VueGridLayout.GridItem;

    export default {
        name: "codeChangeHistory",
        props: [],
        components: {
          GridLayout,
          GridItem,
        },
        data() {
            return {
              layout: testLayout,
              newX:0,
              newY:0,

              title:'证券代码变更历史',
              closeIF:true,
              tablecolumms:tablecolumms,
              historyCodeTable:[
                {"a1":"2018-02-26", "a2":"601313", "a3":"601360", "a4":"三六零公司借壳江南嘉捷。证券代码由'601313'变动为'601360'，证券简称由'江南嘉捷'变动为三六零"},
                {"a1":"2010-03-05", "a2":"600849", "a3":"601607", "a4":" 上海医药（600849）吸收合并上实医药（600607）和中西医药（600842）。证券代码由'600849'变动为’601607'，证券简称不变"},
              ],
              historyCode:false,
            }
        },
        methods: {
          closePClick:function (val) {
          if(val){
            this.closeIF = false;
          }
          },


          moveEvent: function(i, newX, newY,e){
            //console.log(e)
            //console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
          },
          resizeEvent: function(i, newH, newW){
            //console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW);
          },
          movedEvent: function(i, newX, newY,e){
            //console.log(e)
            //console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
          },
          resizedEvent: function(i, newH, newW, newHPx, newWPx){
            //console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
          },

        },
        watch: {},
        mounted() {

        },

    }
</script>

<style lang="less">
    .codeChangeHistory {
      .closeP{
        text-align: right;
        padding: 7px 7px;
        /*background-color: #F5F8FA;*/
        background-color: #e7ebee;
      .titleP{
        float: left;
        font-size: 14px;
        color: black;
      }
        .closeSpan{
          font-size: 16px;
          color: #fff;
          padding: 0 5px;
          text-align: center;
          background-color: rgba(230, 75, 10, 0.56);
          border-radius: 4px;
        }
      }
    .el-table__body-wrapper {
      overflow: hidden !important;
    }
    }
    .el-button--danger.is-plain:focus, .el-button--danger.is-plain:hover {
      color: #fa5555;
      background: #fee;
      border-color: #fdbbbb;
    }
    .vue-grid-layout {
      z-index: 100;
       }
    .vue-grid-layout>div {
      position: absolute;
      /*background: indianred;*/
    }

</style>
