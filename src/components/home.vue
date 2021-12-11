<template>
  <div id="home" style="height: 100%">
  <bar></bar>
  <el-container style="height: 650px">
    <sidebar></sidebar>
    <el-main style="height: 650px;background-color: #faeaea;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="float: left;height: 20px;margin-top:10px;width: 100%;">
        <el-breadcrumb-item to="/shop/item">商品</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in this.$route.query.currentPath"
                            :key="index"
        >{{item.name}}</el-breadcrumb-item>

      </el-breadcrumb><br>
      <router-view/>

    </el-main>
  </el-container>
  </div>
</template>

<script>
import bar from './bar'
import sidebar from './sidebar'
import shop from './shoptype/shop'
export default {
  name: "home",
  components: {
    bar,
    sidebar,
    shop
  },
  data() {
    return{
      isCollapse: false,
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
