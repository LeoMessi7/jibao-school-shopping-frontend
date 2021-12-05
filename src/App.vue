<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script >
export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted(){
    new  this.$wow.WOW().init()
  },
  methods:{
    handleLogin() {
      this.$router.push('/usetool');
    },
    handleLogin1() {
      this.$router.push('/introduce');
    },
    handleLogin2() {
      this.$router.push('/Login');
    }
  }
}
</script>
<style>
html,body,#app{height:100%}


</style>
<body style="margin:0px;padding:0px;">
</body>
