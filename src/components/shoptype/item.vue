<template>
<div id="item">
  <div class="wrapper">
    <div class="box" v-for="(item,index) in list" :key="index">
      <div class="front-face">
        <div class= "img" v-bind:style="{'background':'url('+item.url+')', 'background-repeat':'no-repeat','background-position':'center','background-size':'cover' }">
        </div>
        <span>{{item.title}}</span>
      </div>
      <div class="back-face">
        <span>{{item.title}}</span>
        <p>{{item.content}}</p>
      </div>
    </div>

  </div>
</div>
</template>

<script>

export default {
  name: "item",
  data(){
    return{
      list:[
        {url:'../../../static/item/jt1.jpg',title:'美女1',content:'1111111111111111111111111111111111111111111111111111111111111111111111111111111'},
        {url:'../../../static/item/jt2.jpg',title:'美女2',content:'22222222222222222222222222222222222222222222222222222222222222222'},
        {url:'../../../static/item/jt3.jpg',title:'美女3',content:'33333333333333333333333333333333333333333333333333333333333333333333333333333333'},
        {url:'../../../static/item/jt4.jpg',title:'美女3',content:'33333333333333333333333333333333333333333333333333333333333333333333333333333333'},
        {url:"../../../static/item/jt5.jpg",title:'美女3',content:'33333333333333333333333333333333333333333333333333333333333333333333333333333333'},
        {url:"../../../static/item/jt6.jpg",title:'美女3',content:'都擦无法无法无法恶法挖法啊啊啊啊啊啊啊啊我阿达伟大顶顶顶顶顶顶顶顶顶顶'},

      ]
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
  font-size: 22px;
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
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  word-wrap:break-word;
  white-space:pre-wrap;
  text-align: justify;
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
