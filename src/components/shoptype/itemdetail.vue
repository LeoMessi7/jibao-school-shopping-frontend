<template>
  <div class="itemdetail">
    <div style="background-color: #fff;width: 60%;margin: auto;border-radius: 20px;">
      <el-container style="background-color:#fff;padding-top:20px;margin: auto;border-radius: 20px">
        <el-aside class="side" style="width:40%">
          <div class="img" v-bind:style="{'background':'url('+url+')'}"
               style="display:flex;
               width: 260px;
               height: 260px;
               margin-top:20px;
                margin-left:40px;
               border-radius: 10px 10px 10px 10px;"/>


        </el-aside>
        <el-main class="body">
          <el-container>
            <el-main>
              <span style="color: #656565; font-weight: 600">商品名称：</span>
              <p style="color: #656565;display: inline">{{ title }}</p><br>
              <span style="color: #656565; font-weight: 600">商品描述：</span>
              <p style="color: #656565;display: inline">{{ description }}</p><br>
              <span style="color: #656565; font-weight: 600">商品价格：</span>
              <p style="color: #656565;display: inline">{{ price }}元</p><br>
              <span style="color: #656565; font-weight: 600">商品分类：</span>
              <p style="color: #656565;display: inline">{{ category }}</p><br>
              <span style="color: #656565; font-weight: 600">商家：</span>
              <p style="color: #656565;display: inline">{{ provider }}</p><br>
              <span style="color: #656565; font-weight: 600">综合评分：</span>
              <el-rate style="display: inline;" :colors="['#fcbdab','#fcbdab','#fcbdab']" disabled
                       v-model="finalmark"></el-rate>
            </el-main>
            <el-footer>
              <el-row class="collectbuy" span="24" style="position: relative;">

                <button class="button" @click="addCar">
                  <span>添加购物车</span>
                  <div class="cart">
                    <svg viewBox="0 0 36 26">
                      <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                      <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                    </svg>
                  </div>
                </button>

                <el-button type="success" icon="el-icon-goods" style="margin-left:15px;">购买</el-button>
                <el-button type="danger" icon="el-icon-user-solid" style="margin-left:15px;" v-on:click="addUser">联系商家</el-button>
              </el-row>
            </el-footer>
          </el-container>
        </el-main>
      </el-container>
      <div class="buyercomments" style="width: 80%;margin: auto;">
        <p style="font-weight:bold">买家评价：</p>
        <div class="content" v-for="(item,index) in comments" :key="index" style="line-height: 25px">
          <div class="title" style="display: inline">
            <span style="font-size:15px;font-weight:600;color:#656565;">{{ item.buyer }}</span>
            <span style="font-size:10px;margin-left:5px;">{{ item.time }}</span>
            <el-rate v-model="item.mark" :colors="['#fcbdab','#fcbdab','#fcbdab']"
                     style="display: inline;margin-left:10px;" disabled></el-rate>
          </div>
          <br>
          <textarea
            v-model="item.content"
            rows="4"
            disabled
            class="input-border"
            style="margin-top:5px;margin-bottom: 20px;width: 80%;resize:none">
          </textarea>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getDetail} from "../../api/comment/comment";
import {deleteShopcart, getShopcart} from "../../api/shopcart/selection";
import {addChatUser} from "../../js/global";
export default {
  name: "itemdetail",
  data() {
    return {
      id: this.$router.currentRoute.query.details_id,
      url: this.$router.currentRoute.query.details_url,
      title: this.$router.currentRoute.query.details_name,
      category: this.$router.currentRoute.query.details_category,
      avatar_url: '',
      description: this.$router.currentRoute.query.details_description,
      provider: "",
      price: this.$router.currentRoute.query.details_price,
      finalmark: '3',
      collecttype: '',
      collectionicon: 'el-icon-shopping-cart-2',
      comments: [
      ]
    }
  },
  mounted() {
    getDetail(this.$router.currentRoute.query.details_id).then(res =>{
      this.provider = res.data.seller_name
      this.avatar_url = res.data.avatar_url
      let comments = res.data.comments
      console.log(res.data)
      let comment_time = res.data.comment_time
      let avg_mark = res.data.avg_mark
      let marks = res.data.marks
      this.finalmark = avg_mark
      for(let i = 0; i < comments.length; i++){
        this.comments.push({
          buyer: "用户" + (i + 1),
          time: comment_time[i],
          content: comments[i],
          mark: marks[i]
        })
      }
    }).catch(function (error) {
      console.log(error)
    });
    console.log(this.$cookies.get("details_url"))

  },
  methods: {

    addUser(){
      alert(this.avatar_url)
      addChatUser(this.provider, this.avatar_url)
      this.$router.push('/chat')
    },



    addCar() {
      if (!this.$cookies.isKey("user_name")) {
        this.$message({message: "请先登录！", type: 'warning', customClass: 'zZindex'})
        this.$router.push("/Login")
      }
      select(this.id).then(res => {
        this.$message({message: "加入成功！", type: 'success', customClass: 'zZindex'})
      }).catch(function (error) {
        console.log(error)
      })
      document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
        if (!button.classList.contains('loading')) {
          button.classList.add('loading');
          setTimeout(() => button.classList.remove('loading'), 3700);
        }
        e.preventDefault();
      }))
    }


}
}
</script>
<style>
@import "../../css/button.css";
.itemdetail {
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.body {
  line-height: 29px;
}

.none {
  height: 20px;
}

.img {
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
}

textarea:disabled {
  cursor: default;
  border-color: rgb(239, 217, 217);
  border-radius: 8px;
}
</style>
