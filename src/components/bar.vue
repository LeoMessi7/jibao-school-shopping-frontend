<template>
  <div id="bar" style="height: 60px;z-index: -1">
  <el-header class="head" style="height: 60px;min-width: 400px">
    <div style="margin: 0 auto; height: 60px; width: 1140px; min-width: 400px">
      <el-image style="height: 50px" :src="require('@/assets/logo2.png')"></el-image>
      <el-image style="top:-6px;margin-left:120px;height: 30px" :src="require('@/assets/title.png')"></el-image>
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
             @mouseleave="mouseLeave(1)"
             @click="drawer = true"></i>
        </span>
        <el-drawer
          title="购物车"
          :visible.sync="drawer"
          direction="rtl"
          z-index="1"
          style="text-align: center"
        >
          <div class="car" style="">
            <ul>
              <li class="clearfix" v-for="(item,index) in list" :key="item.id">
                <input type="checkbox" class="fl minInput" v-model="item.pd" @click="itemClick(index)"/>
                <img :src="item.imgUrl" class="fl" :class="{active:item.isActive}"/>
                <span class="fl" style="margin-left: 10px">{{item.price.toFixed(2)}} 元</span>
                <span class="fl" style="color:red;margin-left:30px;" @click="deleteClick(index)">删除</span>
              </li>
            </ul>
            <div class="footer">
              <input type="checkbox" style="width: 20px;height: 20px" @click="totalClick" v-model="totalInt"/>全选
              <div class="goodsNum">
                已选商品 <span style="margin:0px 5px;">{{goodsNum}}</span>件 合计:
                <span style="margin:0px 5px;">{{totalNum}}</span>元
              </div>
            </div>
          </div>
        </el-drawer>
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
      newList:[],
      goodsNum:0,
      totalNum:0,
    }
  },
  methods:{
    search(){
      this.$router.push('/Login');
    },
    filters: {
      priceNum: function(val) {
        return val.toFixed(2)
      }
    },
    computed:{
      totalNum:function(){
        var total=0;
        for(var i in this.newList){
          if(this.newList[i].pd){
            total+=this.newList[i].price*this.newList[i].num
          }else{
            total=0
          }
        }
        return total.toFixed(2)
      },
      goodsNum:function(){
        var goods=0;
        for(var i in this.newList){
          if(this.newList[i].pd){
            goods+=this.newList[i].num;
          }
        }
        return goods
      }
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
        this.list.splice(index,1);
        this.newList.splice(index,1)
      }else{
        alert('请先选择删除的选项')
      }
    },
    totalClick(){
      this.totalInt=!this.totalInt
      if(this.totalInt){
        for(let i in this.list){
          this.list[i].pd=true;
          this.list[i].isActive=true
          if(this.list[i].pd){
            this.newList.push(this.list[i]);
          }
        for(let j in this.list){
          this.goodsNum+=this.list[j].num;
          console.log(this.list[j].num)
        }
        }

      }else{
        for(var i in this.list){
          this.list[i].pd=false;
          this.newList=[];
          this.list[i].isActive=false
          this.goodsNum=0;
        }
      }
    },
    itemClick(index){
      this.list[index].pd=!this.list[index].pd
      if(this.list[index].pd){
        this.newList.push(this.list[index]);
        this.goodsNum+=this.list[index].num;
        this.list[index].isActive=true;
      }else{
        for(var i in this.newList){
          if(this.newList[i].pd==false){
            this.newList.splice(i,1)
          }
        }
        this.list[index].isActive=false;
        this.goodsNum-=this.list[index].num;
      }
      if(this.newList.length==this.list.length){
        this.totalInt=true;
      }else{
        this.totalInt=false;
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
.car .clearfix:after {
  display: block;
  content: '';
  clear: both;
}

.car .fl {
  float: left;
  margin-left: 20px;
}

.car .fr {
  float: right;
}

.car li {
  list-style: none;
  line-height: 100px;
  margin-top: 10px;
}


.car .minInput {
  margin-top: 50px;
  height: 20px;
  width: 20px;
}

.car img {
  width: 100px;
  height: 100px;
  vertical-align: middle;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid #fff;
  margin: 0px 10px;
}

.car .priceFrom {
  display: inline-block;
  border: 1px solid pink;
  border-radius: 5px;
  margin: 40px 10px 0px 10px;
}

.car .priceFrom input {
  width: 30px;
  height: 18px;
  border: none;
  padding-left: 5px;
}

.car .priceFrom span {
  width: 20px;
  height: 20px;
  background: pink;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
}

.car input:focus {
  outline: -webkit-focus-ring-color auto 0px;
}

.car .footer {
  margin-left: 40px;
  margin-top: 10px;
  font-size: 14px;
}

.car .footer input {
  margin-right: 5px;
}

.car .goodsNum {
  display: inline-block;
  margin-left: 20px;
}

.car .goodsNum span {
  color: red;
}
.car .active{
  border:1px solid #A52A2A;
}
.search-bar-top{
  height:60px;
  display: inline-block;
  width: 500px;
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
