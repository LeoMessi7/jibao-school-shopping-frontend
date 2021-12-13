<template>
  <div id="bar" style="height: 60px;z-index: 100">
  <el-header class="head" style="height: 60px;min-width: 400px">
    <div style="margin: 0 auto; height: 60px; width: 1140px; min-width: 400px">
      <el-image style="height: 50px" :src="require('@/assets/logo2.png')"></el-image>
      <el-image style="top:-6px;margin-left:120px;height: 30px" :src="require('@/assets/title.png')"></el-image>
      <div class="search-bar-top">
        <div class="bar7">
          <form onsubmit="event.preventDefault()">
            <input type="text" placeholder="请输入您要搜索的物品..." v-model="keyWord" v-on:keyup="search">
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
             v-on:click="update"
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
                <span class="fl" style="margin-left:20px;">{{item.name}}</span>
                <span class="fl" style="color:red;margin-left:30px;" @click="deleteClick(index)">删除</span>
              </li>
            </ul>
            <div class="footer">
              <input type="checkbox" style="width: 20px;height: 20px" @click="totalClick" v-model="totalInt"/>全选
              <div class="goodsNum">
                已选商品 <span style="margin:0px 5px;">{{goodsNum}}</span>件 合计:
                <span style="margin:0px 5px;">{{totalNum}}</span>元
              </div>
              <div class="buy">
              <el-button type="primary" icon="el-icon-circle-check" v-on:click="buy">购买</el-button>
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
import {getPurchase, searchGoods} from "../api/goods/goods";
import {goodsList, setGoodsList} from "../js/global";
import {getShopcart, deleteShopcart,buyAll} from "../api/shopcart/selection";

export default {
  name: "bar",
  data(){
    return{
      keyWord: '',
      icolor:'color:black',
      icolor1:'color:black',
      icolor2:'color:black',
      drawer: false,
      num: null,
      list: [
      ],
      totalInt:false,
      goodsNum:0,
      totalNum:0,
      loginState: this.$cookies.isKey("user_name")
    }
  },
  mounted() {
  },

  methods:{


    update(){
      this.list = []
      getShopcart().then(res =>{
        console.log(res.data)
        let goodsInfolist = res.data.selection
        console.log(res.data.goodsInfoList)
        let length = res.data.length
        let f = 0
        for(let i = 0; i < length; i++){
          console.log(goodsInfolist[i].status)
          if(goodsInfolist[i].status !== "售卖中") {
            alert(goodsInfolist[i].goods_name + "已售出或下架，已经为您清除购物车!")
            deleteShopcart(goodsInfolist[i].goods_id).then(res =>{
            }).catch(function (error) {
              console.log(error)
            });

          }
          else {
            this.list.push({
              id: f,
              gid: goodsInfolist[i].goods_id,
              imgUrl: 'http://127.0.0.1:8081/' + goodsInfolist[i].goods_url,
              name: goodsInfolist[i].goods_name,
              price: goodsInfolist[i].price / 100,
              num: 1,
              pd: false,
              isActive: false
            })
            f = f + 1
          }
        }
      }).catch(function (error) {
        console.log(error)
      });
    },


    buy(){
      if(this.list.length === 0)
        this.$message.error("购物车为空")
      else {
        let gid_list = []
        for (let i = 0; i < this.list.length; i++)
          gid_list.push(this.list[i].gid)
        buyAll(gid_list, this.totalNum * 100).then(res => {
          if (res.data.code === 1)
            this.$message.error("余额不足")
          else if (res.data.code === 2) {
            this.$message.error("购买失败，已为您更新购物车")
            getShopcart().then(res => {
              this.list = []
              let goodsInfolist = res.data.selection
              console.log(res.data.goodsInfoList)
              let length = res.data.length
              let f = 0
              for (let i = 0; i < length; i++) {
                this.list.push({
                  id: f,
                  gid: goodsInfolist[i].goods_id,
                  imgUrl: 'http://127.0.0.1:8081/' + goodsInfolist[i].goods_url,
                  name: goodsInfolist[i].goods_name,
                  price: goodsInfolist[i].price / 100,
                  num: 1,
                  pd: false,
                  isActive: false
                })
                f = f + 1
              }
            }).catch(function (error) {
              console.log(error)
            });

          } else {
            this.$message.success("购买成功")
            this.list = []
          }
        }).catch(function (error) {
          console.log(error)
        });
      }
    },
    handleLogout(){
      this.$cookies.remove("user_name")
      this.$cookies.remove("avatar_url")
      this.$cookies.remove("balance")
      this.$router.push('/Login')
    },
    search(e){
      if(e.keyCode === 13){
        searchGoods(this.keyWord).then(res =>{
          setGoodsList(res.data)
          console.log(res.data)
          if (this.$route.name !== '物品') {
            this.$router.push({
              path: '/shop/item',
            })
          }
        }).catch(function (error) {
          console.log(error)
        });
      }
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
        console.log(this.list[index])
        deleteShopcart(this.list[index].gid).then(res =>{
          this.totalNum-=this.list[index].price*this.list[index].num;
          this.goodsNum-=this.list[index].num;
          this.list.splice(index,this.list[index].num);
        }).catch(function (error) {
          console.log(error)
        });

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
