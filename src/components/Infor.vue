<template>
  <div id="Infor">
    <bar></bar>
    <el-container>
      <sidebar></sidebar>
      <el-main>
        gerenxinxi
      </el-main>
    </el-container>


  </div>
</template>

<script>
import bar from './bar'
import sidebar from './sidebar'
export default {
  name: "Infor",
  components: {
    bar,
    sidebar
  },
}
</script>

<style scoped>

</style>
