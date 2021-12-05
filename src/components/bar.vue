<template>
  <div id="bar" style="height: 60px">
  <el-header class="head" style="height: 60px;min-width: 400px">
    <div style="margin: 0 auto; height: 60px; width: 1140px; min-width: 400px">
      <el-image style="height: 50px" :src="require('@/assets/logo2.png')">
      </el-image>
      <div class="search-bar-top">
        <div class="bar7">
          <form>
            <input type="text" placeholder="请输入您要搜索的物品...">
              <i class="el-icon-search"
                 :style="icolor"
                 @mouseover="mouseOver(0)"
                 @mouseleave="mouseLeave(0)"></i>
          </form>
        </div>
      </div>
      <div style="display:inline;float: right;">
        <span class="s1">
          <i class="el-icon-shopping-cart-1"
             :style="icolor1"
             @mouseover="mouseOver(1)"
             @mouseleave="mouseLeave(1)"></i>
        </span>
        <el-dropdown trigger="click" @command="handleLogin2">
          <span class="s1">
            <i class="el-icon-user"
               :style="icolor2"
               @mouseover="mouseOver(2)"
               @mouseleave="mouseLeave(2)"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/Login">登录</el-dropdown-item>
            <el-dropdown-item command="/Infor">个人中心</el-dropdown-item>
            <el-dropdown-item command="/Login">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>
    <el-divider style="margin-top: 0px;margin-bottom: 0px;"></el-divider>
  </el-header>
  </div>
</template>

<script>
export default {
  name: "bar",
  data(){
    return{
      icolor:'color:black',
      icolor1:'color:black',
      icolor2:'color:black',
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
      else if(index==1)
        this.icolor1=  'color: #F56C6C';
      else
        this.icolor2=  'color: #F56C6C';
    },
    mouseLeave(index) {
      if(index==0)
        this.icolor = 'color: black';
      else if(index==1)
        this.icolor1=  'color: black';
      else
        this.icolor2=  'color: black';
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

.search-bar-top{
  height:60px;
  display: inline-block;
  width: 830px;
  min-width: 300px;
  text-align: right;

}
.bar7 {
  display: inline-block;
  line-height: 0px;

}
.bar7 form {
  margin-top: 6px;
  height: 42px;
}
.bar7 input {
  width: 250px;
  border-radius: 42px;
  border: 2px solid #E4E7ED;
  /*background: #F9F0DA;*/
  transition: .3s linear;
  float: right;
}
.bar7 input:focus {
  width: 300px;
  border: 2px solid #F56C6C;
}
.bar7 i {
  background: none;
  margin-right:10px;
  right: 0;
  line-height: 46px;
}
.s1{
  margin-left: 15px;
  margin-right:15px;
  height:60px;
}
form {
  position: relative;
  width: 300px;
  margin: 0 auto;
}
input{
  border: none;
  outline: none;
}
input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}
.bar7 i {
  cursor: pointer;
  position: absolute;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0 0;
}
</style>
