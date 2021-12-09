<template>
  <div id="home" style="height: 100%">
  <bar></bar>
  <el-container style="height: 650px">
    <sidebar></sidebar>
    <el-main style="height: 650px;background-color: #faeaea;">
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
