<template>
  <div id="bar" style="height: 60px; z-index:1000">
    <el-header class="head" style="height: 60px;min-width: 400px">
      <div style="margin: 0 auto; height: 60px; width: 1140px; min-width: 400px">
        <el-image style="height: 50px" :src="require('@/assets/logo2.png')">
        </el-image>
        <div style="display:inline;float: right;">
          <el-dropdown trigger="click" @command="handleLogin2">
          <span class="s1">
            <i class="el-icon-user"
               :style="icolor1"
               @mouseover="mouseOver(2)"
               @mouseleave="mouseLeave(2)"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/Infor">个人中心</el-dropdown-item>
              <el-dropdown-item command="/Login">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-divider style="margin-top: 0px;margin-bottom: 0px;padding: 0;"></el-divider>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "AdminBar",
  data(){
    return{
      icolor:'color:black',
      icolor1:'color:black',
    }
  },
  methods:{
    search(){
      this.$router.push('/Login');
    },
    handleLogin() {
      this.$router.replace('/');
    },
    handleLogin2(command) {
      this.$router.push(command);
    },
    mouseOver(index) {
      if(index==0)
        this.icolor = 'color: #F56C6C';
      else
        this.icolor1=  'color: #F56C6C';
    },
    mouseLeave(index) {
      if(index==0)
        this.icolor = 'color: black';
      else
        this.icolor1=  'color: black';
    },
  }
}
</script>

<style scoped>
.head{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: #ffffff;
  line-height: 60px;
  height: 60px;
  white-space: nowrap;
  padding: 0;
  margin: 0 auto;
}
.s1{
  margin-left: 15px;
  margin-right:15px;
  height:100px;
}
.el-divider--horizontal {
  margin: 0;
}
</style>
