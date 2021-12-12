<template>
  <div class="itemdetail">
    <div style="background-color: #fff;width: 60%;margin: auto;border-radius: 20px;">
      <el-container style="background-color:#fff;padding-top:20px;margin: auto;border-radius: 20px">
        <el-aside class="side" style="width:40%">
          <div :style="{'background':'url('+url+')'}"
               style="display:flex;
               width: 260px;
               height: 260px;
               margin-top:20px;
                margin-left:40px;
               border-radius: 10px 10px 10px 10px;
               background-repeat: no-repeat!important;
               background-position: center!important;
               background-size: cover!important;"/>


        </el-aside>
        <el-main class="body">
          <el-container>
            <el-main>
              <span style="color: #656565; font-weight: 600">商品名称：</span>{{ title }}<br>
              <span style="color: #656565; font-weight: 600">商品描述：</span>{{ description }}<br>
              <span style="color: #656565; font-weight: 600">商品价格：</span>{{ price }}元<br>
              <span style="color: #656565; font-weight: 600">商品分类：</span>{{ category }}<br>
              <span style="color: #656565; font-weight: 600">商家：</span>{{ provider }}<br>
              <span style="color: #656565; font-weight: 600">综合评分：</span>
              <el-rate v-model="finalmark" style="display: inline;" disabled></el-rate>
            </el-main>
            <el-footer>
              <el-row class="collectbuy" span="24" style="position: relative;">
                <el-button type="primary" icon="el-icon-shopping-cart-2">加入购物车</el-button>
                <el-button type="success" icon="el-icon-goods" style="margin-left:15px;">购买</el-button>
                <el-button type="danger" icon="el-icon-user-solid" style="margin-left:15px;">联系商家</el-button>
              </el-row>
            </el-footer>
          </el-container>
        </el-main>
      </el-container>
      <div class="buyercomments" style="width: 80%;margin: auto;">
        <p style="font-weight:bold">买家评价：</p>
        <div class="content" v-for="(item,index) in comments" :key="index" style="line-height: 25px">
          <div class="title" style="display: inline">
            <span style="font-size:15px;color:red;">{{ item.buyer }}</span>
            <span style="font-size:10px;margin-left:5px;">{{ item.time }}</span>
            <el-rate v-model="item.mark" style="display: inline;margin-left:10px;" disabled></el-rate>
          </div>
          <el-input
            v-model="item.content"
            readonly
            class="input-border"
            style="margin-top:5px;margin-bottom: 20px"
          >
          </el-input>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "itemdetail",
  data() {
    return {
      id: this.$cookies.get("details_id"),
      url: this.$cookies.get("details_url"),
      title: this.$cookies.get("details_name"),
      category: this.$cookies.get("details_category"),
      description: this.$cookies.get("details_description"),
      provider: '小绿小绿',
      price: this.$cookies.get("details_price"),
      finalmark: '3',
      collecttype: '',
      collectionicon: 'el-icon-shopping-cart-2',
      comments: [
        {buyer: '哈哈哈', time: '2021-12-12', content: 'wanglaoshi', mark: '4'},
        {buyer: '嘻嘻嘻', time: '2021-12-13', content: 'aoneogewi', mark: '3'},
        {buyer: '啦啦啦', time: '2021-12-14', content: 'owneog', mark: '1'},
        {buyer: '啦啦啦', time: '2021-12-14', content: 'owneog', mark: '1'},
        {buyer: '啦啦啦', time: '2021-12-14', content: 'owneog', mark: '1'},
      ]
    }
  },
  mounted() {
    console.log(this.$cookies.get("details_url"))
  },
  methods: {}
}
</script>
<style>
.itemdetail {
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.body {
  line-height: 25px;
}

.none {
  height: 20px;
}

</style>
