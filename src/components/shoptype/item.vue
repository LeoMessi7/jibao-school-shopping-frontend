<template>
<div id="item">
  <div class="wrapper">
    <div class="box" v-for="(item,index) in list" :key="index">
      <div class="front-face">
        <div class= "img" v-bind:style="{'background':'url('+item.url+')'}">
        </div>
        <span>{{item.title}}</span>
      </div>
      <div class="back-face">
        <span>{{item.title}}</span>
        <p>描述：{{item.description}}</p>
        <p>类别：{{item.category}}</p>
        <p>校区：{{item.campus}}</p>
        <p>价格：{{item.price}}</p>
        <el-row class="collectbuy">
          <el-button :type="item.collecttype" :icon="item.collectionicon" circle v-on:click="addShoppingCart(item)"></el-button>
          <el-button type="success" icon="el-icon-goods" circle @click="purchaseGoods(item)"></el-button>
          <el-button type="danger" icon="el-icon-view" circle @click="detail(item)"></el-button>
        </el-row>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import {goodsList, message, setGoodsList} from "../../js/global";
import {getPurchase, select, searchRandomGoods} from "../../api/goods/goods";
import {purchase} from "../../api/user/purchase";
export default {
  name: "item",
  data(){
    return{
      goods_list: goodsList,
      list:[],

    }
  },
  mounted() {
    if(goodsList === null){
        searchRandomGoods().then(res =>{
          console.log(res.data)
        setGoodsList(res.data)
      }).catch(function (error) {
        console.log(error)
      });
    }
  },
  created: function () {
    setInterval(this.timer, 1000);
  },
  methods:{

    purchaseGoods(item){
      purchase(item.goods_id).then(res =>{
        let code = res.data.code
        if(code === 0)
        this.$message.success("购买成功")
        else if(code === 1)
          this.$message.error("余额不足")
        else
          this.$message.error("商品已经被别人抢走啦")
      }).catch(function (error) {
        this.$message.error("购买失败")
        console.log(error)
      });
    },

    addShoppingCart(item){
      if (!this.$cookies.isKey("user_name")) {
        this.$message({message: "请先登录！", type: 'warning', customClass: 'zZindex'})
        this.$router.push("/Login")
      }
      this.changecolor(item)
      select(item.goods_id).then(res =>{
        this.$message.success("加入成功")
      }).catch(function (error) {
        this.$message.error("加入失败")
        console.log(error)
      });
    },


    timer:function (){
      this.goods_list = goodsList
      this.list = []
      let goodsInfoList = goodsList.goodsInfoList;
      for(let i = 0; i<goodsInfoList.length;i++){
        this.list.push({
          url:'http://127.0.0.1:8081/' + goodsInfoList[i].goods_url,
          title:goodsInfoList[i].goods_name,
          description: goodsInfoList[i].description,
          category: goodsInfoList[i].sub_category,
          price: goodsInfoList[i].price,
          campus:goodsInfoList[i].campus,
          goods_id: goodsInfoList[i].goods_id,
          collecttype:"",
          collectionicon:"el-icon-shopping-cart-2"
        })
      }
    },

    changecolor:function(item){
      if(item.collecttype===""){
        item.collecttype="primary";
      }else{
        item.collecttype="";
      }
      if(item.collectionicon==="el-icon-shopping-cart-2"){
        item.collectionicon="el-icon-shopping-cart-full";
      }else{
        item.collectionicon="el-icon-shopping-cart-2";
      }
    },

    detail(item){
      this.$router.push({
        path: "/itemdetail",
        query: {
          "details_id": item.goods_id,
          "details_name": item.title,
          "details_category": item.category,
          "details_campus":item.campus,
          "details_description": item.description,
          "details_price": item.price,
          "details_url": item.url
        }
      })
    }

  }
}
</script>

<style scoped>


.wrapper{
  font-family: SuCaiJiShiKangKangTi;
  display: grid;
  margin: 0px 90px auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
}
.wrapper .box{
  width: 350px;
  margin-bottom: 20px;
  height: 250px;
  position: relative;
  perspective: 1000px;
  border-radius: 10px;
}
.wrapper .box .front-face{
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 5px 20px 0px rgba(252,189,171,0.5);
}
.box .front-face .img{
  height: 250px;
  border-radius: 20px 20px 0px 0px;
  background-repeat:no-repeat!important;
  background-position:center!important;
  background-size:cover!important;
}
.box .back-face span,
.box .front-face span{
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-background-clip: text;
  text-align: center;
  color: #fac1b1;
  font-family: baotuxiaobai;
}
.box .front-face{
  position: absolute;
  top: 0;
  left:0;
  background: #fff;
  z-index:1;
  height:220px;
  width: 100%;
  display: none;
  border-radius: 20px;
  transition: all 0.5s ease;
}
.box .back-face span{
  font-size: 30px;
  font-weight: 600;
  color: #4d2419;
  -webkit-background-clip: text;
}
.box .back-face{
  text-align: center;
  position: absolute;
  top: 0;
  left:0;
  background: #fff;
  z-index:1;
  height:250px;
  width: 100%;
  padding: 5px;
  color: #4d2419;
  border-radius: 20px;
  opacity: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;

  transform: translateY(110px) rotateX(-90deg);
  transition: all 0.5s ease;
}
.box:hover .front-face {
  opacity: 0;
  transform: translateY(-110px) rotateX(90deg);
}
.box:hover .back-face {
  opacity: 1;
  transform: rotateX(0deg);
  box-shadow: 0px 5px 20px 0px rgba(252,189,171,0.5);
}
.box .back-face p{
  font-size:20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  word-wrap:break-word;
  white-space:pre-wrap;
  text-align: justify;
}
.collectbuy{
  float: right;
  bottom: 10px;
  right:10px;
}

@font-face {
  font-family:SetoFont;
  src:url("../../font/SetoFont.ttf");
}
@font-face {
  font-family:SuCaiJiShiKangKangTi;
  src:url("../../font/SuCaiJiShiKangKangTi.ttf");
}
@font-face {
  font-family:baotuxiaobai;
  src:url("../../font/baotuxiaobai.ttf");
}
</style>
