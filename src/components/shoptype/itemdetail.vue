<template>
  <div class="detail">
    <p style="font-weight:bold">商品图片：</p>
    <img src='../../../static/item/jt1.jpg'>

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
      url:'../../../static/item/jt1.jpg',
      title:'奥利给',
      category:'小姐姐',
      description:'好吃不贵',
      provider:'小绿小绿',
      price:'100.00',
      finalmark:'3',
      comments:[
        {buyer:'哈哈哈',time:'2021-12-12',content:'wanglaoshi',mark:'4'},
        {buyer:'嘻嘻嘻',time:'2021-12-13',content:'aoneogewi',mark:'3'},
        {buyer:'啦啦啦',time:'2021-12-14',content:'owneog',mark:'1'},
      ]
    }
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
