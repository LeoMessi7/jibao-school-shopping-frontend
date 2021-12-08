<template>
  <div id="card">
  	<header>
  		<img class="avatar" :src="user.img" >
  		<p class="name">{{user.name}}</p>
  	</header>
  	<footer>
  		<input class="search" type="text"  placeholder="search user...">
  	</footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
      user: {
      	name: 'Li-yiwei',
      	img: '../../../static/touxiang/1.jpg'
      }
    }
  }
}
</script>

<style  scoped>
#card {
  padding: 12px;
}
#card img{
  border-radius: 50px;
}
#card .avatar{
  	width: 40px;
  	height: 40px;
  	vertical-align: middle;/*这个是图片和文字居中对齐*/
  }
#card .name {
  	display: inline-block;
  	padding: 10px;
  	margin-bottom: 15px;
  	font-size: 16px;
  }
#card .search {
  	background: #26292E;
  	height: 30px;
  	line-height: 30px;
  	padding: 0 6px;
  	border: 1px solid #3a3a3a;
  	border-radius: 10px;
  	outline: none;/*鼠标点击后不会出现蓝色边框*/
    color: #FFF;
  }
@font-face {
  font-family:SuCaiJiShiKangKangTi;
  src:url("../../font/SuCaiJiShiKangKangTi.ttf");
}
</style>
