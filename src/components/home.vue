<template>
  <div id="home">
  <bar></bar>
  <el-container>
    <sidebar></sidebar>
    <el-main>

    </el-main>
  </el-container>
  </div>
</template>

<script>
import bar from './bar'
import sidebar from './sidebar'
export default {
  name: "home",
  components: {
    bar,
    sidebar
  },
  data() {
    return{
      isCollapse: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
