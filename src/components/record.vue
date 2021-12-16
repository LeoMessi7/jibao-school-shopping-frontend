<template>
  <div id="record">
    <el-empty v-if="onItemList.length===0 " :image-size="300" description="还未购买任何物品"></el-empty>
    <div v-for="(item,index) in onItemList" :key="index">
      <el-dialog :visible.sync="item.showcomment" style="padding-top: 80px;margin:auto;width: 80%" @close="item.rate=null,item.content=''">
        <div style="margin-left: 5%">
          <span style="display: inline">评分：</span>
          <el-rate style="display: inline;" :colors="['#fcbdab','#fcbdab','#fcbdab']" v-model="item.rate"></el-rate>
        </div>
        <div style="padding-top: 20px;margin-left: 5%">
          <span >评价：</span><br>
          <el-input
            class="commit"
            type="textarea"
            :autosize="{minRows:3}"
            placeholder="请输入评价"
            v-model="item.comment"
            style="width:90%;margin-top: 10px"
            v-show="item.showcomment"
          />
        </div>
        <div class="reply" style="margin-top:20px;text-align: center" v-show="item.showcomment">
          <i class="el-icon-circle-check"
             :style="icolor"
             @mouseover="mouseOver(0)"
             @mouseleave="mouseLeave(0)"
             style=" font-size: 25px;transform: translateX(-15px)" @click="submitComment(item)"></i>
          <i class="el-icon-circle-close"
             :style="icolor1"
             @mouseover="mouseOver(1)"
             @mouseleave="mouseLeave(1)"
             style=" font-size: 25px;transform: translateX(15px)" @click="clickCancel(item)"></i>
        </div>
      </el-dialog>
      <el-container class="box" style="min-width: 500px">
        <el-aside class="img"
                  v-bind:style="{'background':'url('+item.url+')'}"></el-aside>
        <el-main class="text">
          <div style="position: relative;height: 80%;line-height: 25px;">
            <span style="color: #656565; font-weight: 600">商品：</span>
            <p style="color: #656565;">{{ item.name }}</p><br>
            <span style="color: #656565; font-weight: 600">标签：</span>
            <p style="color: #656565;">{{ item.title }}</p><br>
            <span style="color: #656565; font-weight: 600">说明：</span>
            <p style="color: #656565;">{{ item.content }}</p><br>
            <span style="color: #656565; font-weight: 600">购买时间：</span>
            <p style="color: #656565;">{{ item.purchase_time }}</p><br>
            <span style="color: #656565; font-weight: 600">价格：</span>
            <p style="color: #656565;">{{ item.price }}</p><br>
            <span style="color: #656565; font-weight: 600">卖家：</span>
            <p style="color: #656565;">{{ item.seller_name }}</p><br>
          </div>
          <el-footer style="float:right;height: 42px;">
            <div class="contact" style="">
              <el-button round icon="el-icon-edit" type="warning" @click="checkComment(item)">评价</el-button>
              <el-button round icon="el-icon-chat-dot-square" style="display: inline" type="success" @click="addUser(item)">卖家</el-button>
            </div>
          </el-footer>

        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
import {getPurchase, getUpload, uploadGoods} from '../api/goods/goods'
import {addChatUser} from "../js/global"
import {comment,commentCheck} from "../api/comment/comment";

export default {
  name: "record",
  data() {
    return {
      activeName: 'first',
      icolor:'color:grey' ,
      icolor1:'color:grey',
      onItemList: [],
    };
  },


  mounted:function() {
    if (!this.$cookies.isKey("user_name")) {
      this.$message({message: "请先登录！", type: 'warning', customClass: 'zZindex'})
      this.$router.push("/Login")
    }
    getPurchase().then(res =>{
      let purchase_list = res.data.goodsInfoList
        console.log(res.data.goodsInfoList)
      let length = res.data.length
      this.onItemList = []
      for(let i = 0; i < length; i++){
        this.onItemList.push({
          url: 'http://127.0.0.1:8081/' + purchase_list[i].goods_url,
          name: purchase_list[i].goods_name,
          title: purchase_list[i].category + "/" + purchase_list[i].sub_category,
          content: purchase_list[i].description,
          price: purchase_list[i].price / 100,
          purchase_time: purchase_list[i].date,
          seller_name: purchase_list[i].user_name,
          seller_avatar_url: purchase_list[i].avatar_url,
          showcomment: false,
          rate: null,
          comment: '',
        })
      }
    }).catch(function (error) {
      console.log(error)
    });
  },

  methods: {

    addUser(item){
      addChatUser(item.seller_name, item.seller_avatar_url)
      console.log(item)
      this.$router.push('/chat')
    },

    mouseOver(index) {
      if(index===0)
        this.icolor = 'color: #F56C6C';
      else if(index===1)
        this.icolor1=  'color: #F56C6C';

    },
    mouseLeave(index) {
      if(index===0)
        this.icolor = 'color: black';
      else if(index===1)
        this.icolor1=  'color: black';

    },
    checkComment(item){
      commentCheck(item.seller_name).then(res => {
        console.log(res.data)
        if(res.data.code===0)
          item.showcomment = true
        else
          this.$message.warning("你已提交过评论，请勿反复评论！！")
      }).catch(function (error) {
        console.log(error)
      });
    },
    submitComment(item) {
      console.log(item.rate,item.comment)
      if(item.rate!==null&&item.comment!==''){
        comment(item.seller_name,item.comment,item.rate).then(res => {
          this.$message.success("上传成功！")
          item.showcomment = false
        }).catch(function (error) {
          console.log(error)
        });
      }
      else{
        this.$message.warning("评分和评价内容不能为空！")
      }
    },

    clickCancel(item) {
      item.content='';
      item.rate=null;
      item.showcomment = !item.showcomment;
    },
  }

}
</script>

<style scoped>
.box {
  margin: auto;
  width: 60%;
  background-color: #fff;
  margin-bottom: 40px;
  height: 280px;
  perspective: 1000px;
  border-radius: 20px;
}

.img {
  height: 280px;
  width: 35% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px 0px 0px 20px;
  background-repeat:no-repeat!important;
  background-position:center!important;
  background-size:cover!important
}

.text span {
  margin-top: 10px;
  font-weight: bold;
}

.text p {
  margin-top: 10px;
  margin-right: 10px;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: justify;
  display: inline;
}
/deep/ .el-textarea__inner:focus {
  border: 1px solid rgb(252, 208, 195);
  box-shadow: 0 1px 3px rgb(252, 208, 195), 0 3px 3px rgb(243, 244, 246);
}
/deep/ .el-message{
  z-index: 1000;
}
</style>
