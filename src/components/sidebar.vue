<template>
  <div id="sidebar" style="float: left">
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
        <el-menu
                 default-active="2"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="#ffffff"
                 text-color="black"
                 active-text-color="#F56C6C"
                 @select="menuClick">
          <el-submenu index="/shop" name="全部">
            <template slot="title">
              <i class="el-icon-school"></i>
              <span slot="title"> 二手好物</span>
            </template>
            <el-menu-item index="/shop" name="全部">
              <i class="el-icon-more-outline"></i> 全部</el-menu-item>
            <el-menu-item index="/eshop" >
              <i class="el-icon-mobile-phone"></i> 电子产品</el-menu-item>
            <el-menu-item index="/cloches">
              <i class="el-icon-mobile-phone"></i> 衣服裤子</el-menu-item>
            <el-menu-item index="/food" >
              <i class="el-icon-sugar"></i> 零食小吃</el-menu-item>
            <el-menu-item index="/sport" >
              <i class="el-icon-basketball"></i> 体育用品</el-menu-item>
            <el-menu-item index="/beauty" >
              <i class="el-icon-mobile-phone"></i> 美容化妆</el-menu-item>
            <el-menu-item index="/book">
              <i class="el-icon-notebook-1"></i> 书籍资料</el-menu-item>
          </el-submenu>
          <el-menu-item index="/upload">
            <i class="el-icon-sell"></i>
            <span slot="title">上传物品</span>
          </el-menu-item>
          <el-menu-item index="/record">
            <i class="el-icon-time"></i>
            <span slot="title">购买记录</span>
          </el-menu-item>
          <el-menu-item index="/chat">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">在线聊天</span>
          </el-menu-item>
          <el-menu-item index="/feedback">
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
      foldwidth:'width:65',
      currentPath:[]
    }
  },
  methods: {
    menuClick(index){
      switch (index){
        case '/shop':this.currentPath.splice(0,this.currentPath.length);this.$router.replace('/shop/item');return
        case '/eshop':this.currentPath.pop();this.currentPath.push({name:'电子产品',url:'/shop/eshop'});break
        case '/cloches':this.currentPath.pop();this.currentPath.push({name:'衣服',url:'/shop/cloches'});break
        case '/sport':this.currentPath.pop();this.currentPath.push({name:'体育',url:'/shop/sport'});break
        case '/book':this.currentPath.pop();this.currentPath.push({name:'书籍',url:'/shop/book'});break
        case '/beauty':this.currentPath.pop();this.currentPath.push({name:'化妆品',url:'/shop/beauty'});break
        case '/food':this.currentPath.pop();this.currentPath.push({name:'食物',url:'/shop/food'});break

        default: this.$router.push(index);return
      }
      this.$router.push({
        path:'/shop/item',
        query:{currentPath:this.currentPath},
      })
    },
  },
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
