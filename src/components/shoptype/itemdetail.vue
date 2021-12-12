<template>
  <div class="detail">
    <p style="font-weight:bold">商品图片：</p>
    <img :src = url>

    <p>
      <span style="font-weight:bold">商品名称：</span>{{title}}
    </p>
    <p>
      <span style="font-weight:bold">商品描述：</span>{{description}}
    </p>
    <p>
      <span style="font-weight:bold">商品价格：</span>{{price}}元
    </p>
    <p>
      <span style="font-weight:bold">商品分类：</span>{{category}}
    </p>
    &nbsp;&nbsp;
    <p>
      <span style="font-weight:bold">商家：</span>{{provider}}
    </p>
    <p>
      <span style="font-weight:bold">综合评分：</span>
      <el-rate v-model="finalmark" style="display: inline;" disabled></el-rate>
    </p>
    &nbsp;

    <el-row class="collectbuy" span="24">
      <el-button type="primary" icon="el-icon-shopping-cart-2">加入购物车</el-button>
      <el-button type="success" icon="el-icon-goods" style="margin-left:15px;">购买</el-button>
      <el-button type="danger" icon="el-icon-user-solid" style="margin-left:15px;">联系商家</el-button>
    </el-row>

    &nbsp;
    &nbsp;
    <div class="buyercomments">
      <p style="font-weight:bold">买家评价：</p>
      <div class="content" v-for="(item,index) in comments" :key="index">
        <div class="title" style="display: inline">
          <span style="font-size:15px;color:red;">{{item.buyer}}</span>
          <span style="font-size:10px;margin-left:5px;">{{item.time}}</span>
          <el-rate v-model="item.mark" style="display: inline;margin-left:10px;" disabled></el-rate>
        </div>
        <el-input
          v-model="item.content"
          readonly
          class="input-border"
          style="margin-top:5px;width:80%;"
        >
        </el-input>
        <div class="none"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "itemdetail",
  data() {
    return{
      id: this.$cookies.get("details_id"),
      url: this.$cookies.get("details_url"),
      title: this.$cookies.get("details_name"),
      category: this.$cookies.get("details_category"),
      description: this.$cookies.get("details_description"),
      provider:'小绿小绿',
      price: this.$cookies.get("details_price"),
      finalmark:'3',
      collecttype:'',
      collectionicon:'el-icon-shopping-cart-2',
      comments:[
        {buyer:'哈哈哈',time:'2021-12-12',content:'wanglaoshi',mark:'4'},
        {buyer:'嘻嘻嘻',time:'2021-12-13',content:'aoneogewi',mark:'3'},
        {buyer:'啦啦啦',time:'2021-12-14',content:'owneog',mark:'1'},
      ]
    }
  },
  mounted(){
    console.log(this.$cookies.get("details_url"))
  },
  methods: {

  }
}
</script>
<style>
.detail{
  position:absolute;
  left:500px;
  width:600px;
}
.none{
  height:20px;
}
</style>
