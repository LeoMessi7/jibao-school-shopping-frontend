<template>
  <div id="shop">
    <el-container style="margin-left: 20px;height: 100%">
      <el-header class="relate" style="height:70px;margin-top: 8px;width: 100%">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="float: left">
          <el-breadcrumb-item to="/shop/item">全部</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in this.$route.query.currentPath"
                              :key="index"
                              >{{item.name}}</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,index) in currentPath"
                              :key="index"
          >{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ul-1">
            <span style="font-size: medium;display: inline"> 类别：</span>
          <div
               v-for="(item,i) in typelist"
               :key="i" style="display: inline">
            <el-link :underline="false" style="margin-right: 10px " @click="handleType(i)">{{item.name}}</el-link>
          </div>

        </div>
      </el-header>
      <el-main style="height: 600px">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "shop",
  data(){
    return{
      currentPath:[],
      typelist:[
        {name:'书籍',url:'/shop/book'},
        {name:'运动',url:'/shop/sport'},
        {name:'食品',url:'/shop/food'},
        {name:'化妆',url:'/shop/beauty'},
        {name:'电子产品',url:'/shop/eshop'}
      ]
    }
  },
  methods:{
    handle(){
      this.$router.push('/eshop')
    },
    handleType(index){
      this.currentPath.push({name:this.typelist[index].name,url:this.typelist[index].url})
      this.$router.push(this.typelist[index].url)

    }
  }
}
</script>

<style scoped>

.ul-1{
  float: left;
  display:inline;
  width: 100%;
  text-align: left;
  margin-top: 20px;
}
.ul-1 el-link{
  padding-left: 0;
  margin-top: 0;
}
el-link{
  margin-left: 10px;
}
.el-link.el-link--default:hover{
  color: #fcbdab;
}
</style>
