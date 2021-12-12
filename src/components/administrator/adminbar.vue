<template>
  <div id="bar" style="height: 60px;z-index: 100">
    <el-header class="head" style="height: 60px;min-width: 400px">
      <div style="margin: 0 auto; height: 60px; width: 1140px; min-width: 400px">
        <el-image style="height: 50px" :src="require('@/assets/logo2.png')"></el-image>
        <el-image style="top:-6px;margin-left:120px;height: 30px" :src="require('@/assets/title.png')"></el-image>
        <div style="display:inline;float: right;">
          <el-dropdown trigger="click" @command="handleLogin2">
          <span class="s1">
            <i class="el-icon-user"
               :style="icolor2"
               @mouseover="mouseOver(2)"
               @mouseleave="mouseLeave(2)"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/Login" v-show=!this.loginState>登录</el-dropdown-item>
              <el-dropdown-item command="/Infor" v-show=this.loginState>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout" v-show=this.loginState>注销</el-dropdown-item>
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
  name: "adminbar",
  data(){
    return{
      icolor:'color:black',
      icolor1:'color:black',
      icolor2:'color:black',
      drawer: false,
      num: null,
      list: [
        { id: 0, imgUrl:'./image/jt1.jpg',price: 2,num: 1, pd: false,isActive:false },
        { id: 1, imgUrl:'./image/jt2.jpg',price: 4,num: 1, pd: false,isActive:false },
        { id: 2, imgUrl:'./image/jt3.jpg',price: 5,num: 1, pd: false,isActive:false },
        { id: 3, imgUrl:'./image/jt4.jpg',price: 3,num: 1, pd: false,isActive:false },
        { id: 4, imgUrl:'./image/jt5.jpg',price: 6,num: 1, pd: false,isActive:false }
      ],
      totalInt:false,
      goodsNum:0,
      totalNum:0,
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
    filters: {
      priceNum: function(val) {
        return val.toFixed(2);
      }
    },
    computed:{

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
    deleteClick(index) {
      if(this.list[index].pd){
        this.totalNum-=this.list[index].price*this.list[index].num;
        this.goodsNum-=this.list[index].num;
        this.list.splice(index,this.list[index].num);
      }else{
        alert('请先选择删除的选项')
      }
    },
    totalClick(){
      this.totalInt=!this.totalInt;
      if(this.totalInt){
        for(let i in this.list) {
          this.list[i].pd = true;
          this.list[i].isActive = true;
        }
        this.goodsNum=0;
        this.totalNum=0;
        for(let j in this.list){
          this.goodsNum+=this.list[j].num;
          this.totalNum+=this.list[j].num*this.list[j].price;
          console.log(this.list[j].num);
        }
      }else{
        for(var i in this.list){
          this.list[i].pd=false;
          this.list[i].isActive=false;
          this.goodsNum=0;
          this.totalNum=0;
        }
      }
    },
    itemClick(index){
      this.list[index].pd=!this.list[index].pd;
      if(this.list[index].pd){
        this.list[index].isActive=true;
        this.goodsNum+=this.list[index].num;
        this.totalNum+=this.list[index].num*this.list[index].price;
      }else{
        this.list[index].isActive=false;
        this.totalInt=false;
        this.totalNum-=this.list[index].num*this.list[index].price;
        this.goodsNum-=this.list[index].num;
      }
    }
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
