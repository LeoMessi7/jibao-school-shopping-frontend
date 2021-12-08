<template>
  <div id="home" style="">
  <bar></bar>
  <el-container style="height: 600px ">
    <sidebar></sidebar>
    <el-main style="height: 100%;background-color: #f3f4f6">
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
