<template>
  <div id="sidebar">
    <el-aside :style="foldwidth">
      <div style="margin: 20px 0 0px 25px">
        <i class="el-icon-s-unfold"
           style="color:#F56C6C;"
           v-if="isCollapse===true"
           v-on:click="isCollapse=false,foldwidth='width:201px'"></i>
        <i class="el-icon-s-fold"
           style="color:#F56C6C"
           v-if="isCollapse===false"
           v-on:click="isCollapse=true,foldwidth='width:65px'"></i>
      </div>
      <div style="margin-top:20px">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="#ffffff"
                 text-color="black"
                 active-text-color="#F56C6C">
          <el-menu-item index="1">
            <i class="el-icon-school"></i>
            <span slot="title">全部商品</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-sell"></i>
            <span slot="title">我的物品</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-time"></i>
            <span slot="title">购买记录</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">在线聊天</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">客服反聩</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return{
      isCollapse: true,
      foldwidth:'width:65'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
