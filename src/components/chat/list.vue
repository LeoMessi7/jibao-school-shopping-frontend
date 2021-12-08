<template>
  <div id="list">
  	<ul>
  		<li v-for="(item,i) in sessions" :key="i" :class="{ active: item.id === currentSessionId }" v-on:click="changeCurrentSessionId(item.id)"><!--   :class="[item.id === currentSessionId ? 'active':'']" -->
  			<img class="avatar" :src="item.user.img" >
  			<p class="name">{{item.user.name}}</p>
  		</li>
  	</ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'list',
  data () {
    return {

    }
  },
  computed: mapState([
  'sessions',
  'currentSessionId'
	]),
  methods:{
  	changeCurrentSessionId:function (id) {
  		this.$store.commit('changeCurrentSessionId',id)
  	}
  }
}
</script>

<style  scoped>
ul{
  padding: 0;
}
	li {
		padding: 3px 15px;
    list-style-type:none;
		border-bottom: 1px solid #292C33;
		cursor: pointer;

	}
li:hover {
     background-color: rgba(255, 255, 255, 0.03);
   }
li .active {/*注意这个是.不是冒号:*/
			background-color: rgba(255, 255, 255, 0.1);
	}
	.avatar {
		border-radius: 50px;
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
	.name {
		display: inline-block;
		margin-left: 15px;
	}
@font-face {
  font-family:SuCaiJiShiKangKangTi;
  src:url("../../font/SuCaiJiShiKangKangTi.ttf");
}
</style>
