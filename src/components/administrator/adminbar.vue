<template>
  <div id="bar" style="height: 60px;z-index: 100">
    <el-header class="head" style="height: 60px;min-width: 400px">
      <div style="margin: 0 auto; height: 60px; width: 1140px; min-width: 400px">
        <el-image style="height: 50px" :src="require('@/assets/logo2.png')"></el-image>
        <el-image style="top:-6px;margin-left:120px;height: 30px" :src="require('@/assets/title.png')"></el-image>
        <div style="display:inline;float: right;">
          <el-tooltip class="item" effect="dark" content="管理类别" placement="bottom">
          <span class="s1">
            <i class="el-icon-edit"
               :style="icolor1"
               @mouseover="mouseOver(1)"
               @mouseleave="mouseLeave(1)"
               @click="gotoCategory"></i>
          </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="反馈处理" placement="bottom">
          <span class="s1">
            <i class="el-icon-tickets"
               :style="icolor2"
               @mouseover="mouseOver(2)"
               @mouseleave="mouseLeave(2)"
               @click="gotoFeedback"></i>
          </span>
          </el-tooltip>
        </div>
      </div>
      <el-divider style="margin-top: 0px;margin-bottom: 0px;"></el-divider>
    </el-header>
  </div>
</template>
<script>
export default {
  name: "adminbar",
  data(){
    return{
      icolor:'color:black',
      icolor1:'color:black',
      icolor2:'color:black',
      drawer: false,
      num: null,
      loginState: this.$cookies.isKey("user_name")
    }
  },
  methods:{
    handleLogout(){
      this.$cookies.remove("user_name")
      this.$cookies.remove("avatar_url")
      this.$cookies.remove("balance")
      this.$router.push('/Login')
    },
    search(){
      this.$router.push('/Login');
    },
    gotoCategory(){
      this.$router.push('/dealcategory')
    },
    gotoFeedback(){
      this.$router.push('/dealfeedback')
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

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0 0;
}
</style>
