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
              <i class="el-icon-more-outline"></i> 全部
            </el-menu-item>
            <el-menu-item :index="item.value" v-for="(item,index) in this.category" :key="index">
              <i class="el-icon-more-outline"></i>{{ item.value }}
            </el-menu-item>
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
import {getCategory} from "../api/category/category";
import {getUpload, searchGoods} from "../api/goods/goods";
import {setGoodsList} from "../js/global";

export default {
  name: "sidebar",
  data() {
    return {
      isCollapse: true,
      foldwidth: 'width:65',
      currentPath: [],
      category: []
    }
  },
  mounted: function () {
    this.category = []
    getCategory().then(res => {
      let category = res.data.category
      let length = res.data.category.length
      for (let i = 0; i < length; i++) {
        this.category.push({
          value: category[i].category,
          children: []
        })
        let s = '';
        for (let j = 0; j < category[i].sub_category.length; j++) {
          if (category[i].sub_category[j] !== '[' && category[i].sub_category[j] !== ']' && category[i].sub_category[j] !== ',' && category[i].sub_category[j] !== ' ') {
            s += category[i].sub_category[j];
          } else if (category[i].sub_category[j] !== '[' && category[i].sub_category[j] !== ' ') {
            this.category[i].children.push({
              value: s
            })
            s = ''
          }
        }
      }
      console.log(this.category)
    }).catch(function (error) {
      console.log(error)
    });
    //得到上架的物品
    getUpload().then(res => {
      this.onItemList = []
      this.buyItemList = []
      let goodsList = res.data.goodsInfoList
      console.log(goodsList)
      for (let i = 0; i < res.data.goodsInfoList.length; i++) {
        if (goodsList[i].status === "售卖中") {
          this.onItemList.push({
            id: goodsList[i].goods_id,
            name: goodsList[i].goods_name,
            description: goodsList[i].description,
            category: [goodsList[i].category, goodsList[i].sub_category,],
            url: 'http://127.0.0.1:8081/' + goodsList[i].goods_url,
            price: goodsList[i].price,
            showonload: false,
          })
        } else if (goodsList[i].status === "已售出") {
          console.log(goodsList[i])
          this.buyItemList.push({
            id: goodsList[i].goods_id,
            price: goodsList[i].price,
            category: [goodsList[i].category, goodsList[i].sub_category,],
            name: goodsList[i].goods_name,
            date: goodsList[i].date,
            url: 'http://127.0.0.1:8081/' + goodsList[i].goods_url,
            customer: goodsList[i].user_name,
            avatar_url: goodsList[i].avatar_url
          })
        }
      }
    }).catch(function (error) {
      console.log(error)
    });
  },
  methods: {
    menuClick(index) {
      switch (index) {
        case '/shop': {
          searchGoods('').then(res => {
            setGoodsList(res.data)
            if (this.$route.name !== '物品') {
              this.$router.push({
                path: '/shop/item',
                query: {currentPath: '全部'},
              })
            }
          }).catch(function (error) {
            console.log(error)
          });
          break;
        }
        case '/record': {
          this.$router.push({
            path: '/record',
            query: {currentPath: '购买记录'},
          })
          break;
        }
        case '/upload': {
          this.$router.push({
            path: '/upload',
            query: {currentPath: '上传物品'},
          })
          break;
        }
        case '/feedback': {
          this.$router.push({
            path: '/feedback',
            query: {currentPath: '客服反馈'},
          })
          break;
        }
        case '/chat': {
          this.$router.push({
            path: '/chat',
            query: {currentPath: '在线聊天'},
          })
          break;
        }
        default: {
            searchGoods(index).then(res => {
              setGoodsList(res.data)
              if (this.$route.name !== '物品') {
                this.$router.push({
                  path: '/shop/item',
                  query: {currentPath: index},
                })
              }
            }).catch(function (error) {
              console.log(error)
            });
          }
        }
      }
    },
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
